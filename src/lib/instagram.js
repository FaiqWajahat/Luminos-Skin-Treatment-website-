import { connectToDatabase } from "@/lib/mongodb";
import { InstagramPost } from "@/models";
import cloudinary from "@/lib/cloudinary";
import fs from "fs";

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/luminouss_skin_clinic/";
const POSTS_TO_SHOW = 4;
// Feed is considered stale after 30 minutes and refreshed in the background
const STALE_AFTER_MS = 30 * 60 * 1000;

// Only one sync may run at a time (the scraper launches a full browser)
let activeSync = null;

/**
 * Fetch posts from the official Meta Instagram Graph API
 */
async function fetchFromMetaGraphApi(accessToken) {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=10&access_token=${accessToken}`;
  const res = await fetch(url, { cache: "no-store" });
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
    // Reels return a video file as media_url, so use their cover image instead
    mediaUrl: item.media_type === "VIDEO" ? item.thumbnail_url || item.media_url : item.media_url,
    caption: item.caption || "",
    dateStr: item.timestamp
      ? new Date(item.timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
      : "",
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

    const selected4 = candidatePosts.slice(0, POSTS_TO_SHOW);
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
 * Copy an Instagram image to Cloudinary. Instagram CDN links expire after a few
 * days and often refuse to load on other sites, so the website serves a copy.
 */
async function mirrorToCloudinary(post, existing) {
  if (!/^https?:\/\//.test(post.mediaUrl || "")) return post.mediaUrl;
  if (existing?.mediaUrl?.includes("res.cloudinary.com")) return existing.mediaUrl;
  if (!process.env.CLOUDINARY_CLOUD_NAME) return post.mediaUrl;

  try {
    const upload = await cloudinary.uploader.upload(post.mediaUrl, {
      folder: "luminous_clinic/instagram",
      public_id: post.postId,
      overwrite: true,
      resource_type: "image",
    });
    return upload.secure_url;
  } catch (err) {
    console.warn(`[Instagram Sync] Cloudinary mirror failed for ${post.postId}:`, err.message);
    return post.mediaUrl;
  }
}

/**
 * Synchronize latest Instagram posts into MongoDB.
 * Concurrent callers share the same in-progress sync.
 */
export function syncInstagramPosts() {
  if (!activeSync) {
    activeSync = runInstagramSync().finally(() => {
      activeSync = null;
    });
  }
  return activeSync;
}

async function runInstagramSync() {
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
    const top4 = newPosts.slice(0, POSTS_TO_SHOW);
    const ids = top4.map((p) => p.postId);
    const existing = await InstagramPost.find({ postId: { $in: ids } }).lean();
    const existingById = new Map(existing.map((p) => [p.postId, p]));

    for (let i = 0; i < top4.length; i++) {
      const p = top4[i];
      const mediaUrl = await mirrorToCloudinary(p, existingById.get(p.postId));
      await InstagramPost.findOneAndUpdate(
        { postId: p.postId },
        {
          permalink: p.permalink,
          mediaUrl,
          caption: p.caption,
          // The scraper can miss the date on a retry; keep the one we already have
          dateStr: p.dateStr || existingById.get(p.postId)?.dateStr || "",
          mediaType: p.mediaType,
          timestamp: p.timestamp,
          order: i,
        },
        { upsert: true, new: true }
      );
    }

    // Drop older posts so only the latest set is ever shown
    const removed = await InstagramPost.find({ postId: { $nin: ids } }).lean();
    if (removed.length > 0) {
      await InstagramPost.deleteMany({ postId: { $nin: ids } });
      await Promise.allSettled(
        removed
          .filter((p) => p.mediaUrl?.includes("res.cloudinary.com"))
          .map((p) => cloudinary.uploader.destroy(`luminous_clinic/instagram/${p.postId}`))
      );
    }

    console.log(`[Instagram Sync] Successfully synced ${top4.length} posts to MongoDB.`);
    return { success: true, count: top4.length, posts: top4 };
  }

  return { success: false, message: "Could not fetch new posts from Instagram" };
}

function serializePost(post) {
  return {
    postId: post.postId,
    permalink: post.permalink,
    mediaUrl: post.mediaUrl,
    caption: post.caption || "",
    dateStr: post.dateStr || "",
    mediaType: post.mediaType || "IMAGE",
    timestamp: post.timestamp ? new Date(post.timestamp).toISOString() : null,
    syncedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : null,
  };
}

/**
 * Read the stored Instagram feed without waiting on Instagram.
 * `isStale` tells the caller to refresh it in the background (e.g. with `after()`).
 */
export async function getInstagramFeed() {
  let posts = [];
  try {
    await connectToDatabase();
    const stored = await InstagramPost.find()
      .sort({ order: 1, updatedAt: -1 })
      .limit(POSTS_TO_SHOW)
      .lean();
    posts = stored.map(serializePost);
  } catch (err) {
    console.warn("[Instagram] Could not read stored feed:", err.message);
  }

  const newestSync = Math.max(0, ...posts.map((p) => new Date(p.syncedAt || 0).getTime()));
  const isStale = posts.length === 0 || Date.now() - newestSync > STALE_AFTER_MS;

  return {
    posts: posts.length > 0 ? posts : FALLBACK_POSTS,
    isStale,
    lastSyncedAt: newestSync ? new Date(newestSync).toISOString() : null,
  };
}

/**
 * Retrieve the latest Instagram posts, syncing first when forced
 */
export async function getLatestInstagramPosts(forceSync = false) {
  if (forceSync) {
    try {
      await syncInstagramPosts();
    } catch (e) {
      console.error("[Instagram] Sync error:", e.message);
    }
  }
  const { posts } = await getInstagramFeed();
  return posts;
}

// Shown until the first successful sync
const FALLBACK_POSTS = [
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
