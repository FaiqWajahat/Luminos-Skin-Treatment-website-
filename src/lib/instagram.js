import { connectToDatabase } from "@/lib/mongodb";
import { InstagramPost } from "@/models";
import fs from "fs";

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/luminouss_skin_clinic/";

/**
 * Fetch posts from the official Meta Instagram Graph API
 */
async function fetchFromMetaGraphApi(accessToken) {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=10&access_token=${accessToken}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Instagram Graph API returned ${res.status}: ${errorText}`);
  }
  const data = await res.json();
  if (!data.data || !Array.isArray(data.data)) {
    throw new Error("Invalid response format from Instagram Graph API");
  }

  return data.data.map((item, index) => ({
    postId: item.id,
    permalink: item.permalink || `https://www.instagram.com/p/${item.id}/`,
    mediaUrl: item.media_url || item.thumbnail_url,
    caption: item.caption || "",
    mediaType: item.media_type || "IMAGE",
    timestamp: item.timestamp ? new Date(item.timestamp) : new Date(),
    order: index,
  }));
}

/**
 * Automated server-side scraper to fetch live posts directly from public Instagram profile
 */
async function fetchFromLiveInstagramScraper() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  if (!fs.existsSync(chromePath)) {
    throw new Error("Chrome not found for live scraping");
  }

  const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    defaultViewport: { width: 1280, height: 1600 },
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36");
    await page.goto(INSTAGRAM_PROFILE_URL, { waitUntil: "networkidle2", timeout: 25000 });

    await new Promise((r) => setTimeout(r, 2000));

    await page.evaluate(() => {
      document.querySelectorAll('div[role="dialog"]').forEach((d) => d.remove());
      document.querySelectorAll('div[role="presentation"]').forEach((o) => {
        if (o.innerText.includes("Log In") || o.innerText.includes("Sign up")) o.remove();
      });
      document.body.style.overflow = "auto";
    });

    const posts = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]'));
      return links.map((link) => {
        const img = link.querySelector("img");
        const href = link.getAttribute("href") || "";
        const alt = img ? img.getAttribute("alt") || "" : "";
        const src = img ? img.getAttribute("src") || "" : "";
        const hasReel = !!link.querySelector('svg[aria-label="Clip"], svg[aria-label="Reel"]');
        const hasCarousel = !!link.querySelector('svg[aria-label="Carousel"], svg[aria-label="Sidecar"]');
        return { href, alt, src, hasReel, hasCarousel };
      }).filter((p) => p.src && p.src.startsWith("http"));
    });

    if (!posts || posts.length === 0) {
      throw new Error("No posts found on Instagram profile");
    }

    let candidatePosts = posts;
    if (candidatePosts.length > 0 && candidatePosts[0].alt.toLowerCase().includes("welcome to luminous")) {
      candidatePosts = candidatePosts.slice(1);
    }

    const selected4 = candidatePosts.slice(0, 4);
    const enriched = [];

    for (let index = 0; index < selected4.length; index++) {
      const p = selected4[index];
      const idMatch = p.href.match(/\/(p|reel)\/([A-Za-z0-9_-]+)/);
      const shortcode = idMatch ? idMatch[2] : `post_${Date.now()}_${index}`;
      const permalink = p.href.startsWith("http") ? p.href : `https://www.instagram.com${p.href}`;

      let caption = p.alt || "";
      let dateStr = "";

      try {
        await page.goto(permalink, { waitUntil: "domcontentloaded", timeout: 10000 });
        const meta = await page.evaluate(() => {
          const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute("content") || "";
          const timeEl = document.querySelector("time");
          const date = timeEl ? (timeEl.getAttribute("title") || timeEl.getAttribute("datetime") || timeEl.innerText) : "";
          const quoteMatch = ogDesc.match(/["“]([\s\S]+)["”]/);
          return { caption: quoteMatch ? quoteMatch[1].trim() : ogDesc, date };
        });
        if (meta.caption) caption = meta.caption;
        if (meta.date) dateStr = meta.date;
      } catch (e) {
        // Fall back to clean alt caption
      }

      enriched.push({
        postId: shortcode,
        permalink,
        mediaUrl: p.src,
        caption,
        dateStr,
        mediaType: p.hasReel ? "VIDEO" : p.hasCarousel ? "CAROUSEL_ALBUM" : "IMAGE",
        timestamp: new Date(),
        order: index,
      });
    }

    return enriched;
  } finally {
    await browser.close();
  }
}

/**
 * Synchronize latest Instagram posts into MongoDB
 */
export async function syncInstagramPosts() {
  await connectToDatabase();

  let newPosts = [];
  const metaToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (metaToken) {
    try {
      console.log("[Instagram Sync] Attempting sync via Meta Graph API...");
      newPosts = await fetchFromMetaGraphApi(metaToken);
    } catch (err) {
      console.warn("[Instagram Sync] Meta Graph API failed:", err.message);
    }
  }

  if (!newPosts || newPosts.length === 0) {
    try {
      console.log("[Instagram Sync] Attempting live server sync from profile...");
      newPosts = await fetchFromLiveInstagramScraper();
    } catch (err) {
      console.warn("[Instagram Sync] Live scraper failed:", err.message);
    }
  }

  if (newPosts && newPosts.length > 0) {
    const top4 = newPosts.slice(0, 4);

    for (let i = 0; i < top4.length; i++) {
      const p = top4[i];
      await InstagramPost.findOneAndUpdate(
        { postId: p.postId },
        {
          permalink: p.permalink,
          mediaUrl: p.mediaUrl,
          caption: p.caption,
          dateStr: p.dateStr || "",
          mediaType: p.mediaType,
          timestamp: p.timestamp,
          order: i,
        },
        { upsert: true, new: true }
      );
    }

    console.log(`[Instagram Sync] Successfully synced ${top4.length} posts to MongoDB.`);
    return { success: true, count: top4.length, posts: top4 };
  }

  return { success: false, message: "Could not fetch new posts from Instagram" };
}

/**
 * Retrieve the latest 4 Instagram posts from MongoDB (or trigger auto-sync if empty/stale)
 */
export async function getLatestInstagramPosts(forceSync = false) {
  await connectToDatabase();

  let posts = await InstagramPost.find().sort({ order: 1, createdAt: -1 }).limit(4);

  const isStale = posts.length === 0 || (Date.now() - new Date(posts[0].updatedAt).getTime() > 2 * 60 * 60 * 1000);

  if (forceSync || isStale) {
    try {
      const syncResult = await syncInstagramPosts();
      if (syncResult.success) {
        posts = await InstagramPost.find().sort({ order: 1, createdAt: -1 }).limit(4);
      }
    } catch (e) {
      console.error("[Instagram] Auto-sync error:", e.message);
    }
  }

  if (posts.length === 0) {
    return [
      {
        postId: "DdXKa63MbrW",
        permalink: "https://www.instagram.com/reel/DdXKa63MbrW/",
        mediaUrl: "/instagram/ig-post-1.jpg",
        caption: "Luminous Ultimate Skin Rejuvenation: HydraFacial + Microneedling + Cold Therapy + LED Light Therapy (£99 Special Offer) ✨",
        mediaType: "VIDEO",
        order: 0,
      },
      {
        postId: "DdUjfhFss1P",
        permalink: "https://www.instagram.com/p/DdUjfhFss1P/",
        mediaUrl: "/instagram/ig-post-2.jpg",
        caption: "September is the perfect time to reset your skin. Tailored clinical treatments for a healthy, glowing complexion 🌿",
        mediaType: "IMAGE",
        order: 1,
      },
      {
        postId: "DdOaaKUMJa2",
        permalink: "https://www.instagram.com/reel/DdOaaKUMJa2/",
        mediaUrl: "/instagram/ig-post-3.jpg",
        caption: "Clinical precision with bespoke skincare therapies for immediate radiance & hydration 🤍",
        mediaType: "VIDEO",
        order: 2,
      },
      {
        postId: "DdM7RytMORw",
        permalink: "https://www.instagram.com/p/DdM7RytMORw/",
        mediaUrl: "/instagram/ig-post-4.jpg",
        caption: "RF Skin Tightening Treatment — visible skin tightening and contour improvement after 2 sessions ✨",
        mediaType: "IMAGE",
        order: 3,
      },
    ];
  }

  return posts;
}
