import { after } from "next/server";
import { HomeView } from "@/components/modules/home";
import { getContent } from "@/lib/db-store";
import { getPublicTreatments, groupByCategory } from "@/lib/treatments";
import { getInstagramFeed, syncInstagramPosts } from "@/lib/instagram";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: { absolute: "Luminous Skin Clinic Leeds | Where Your Natural Radiance Comes First" },
  description:
    "Personalised skin treatments and relaxing facial experiences in Leeds, created to help your skin look and feel beautifully renewed.",
};

export default async function HomePage() {
  const [content, treatments, instagram] = await Promise.all([
    getContent("homepage"),
    getPublicTreatments(),
    getInstagramFeed(),
  ]);
  const data = content?.data || {};

  // Never block the page on Instagram; refresh a stale feed once the response is sent
  if (instagram.isStale) after(() => syncInstagramPosts().catch(() => {}));

  return (
    <HomeView
      data={data}
      categories={groupByCategory(treatments)}
      instagramPosts={instagram.posts}
    />
  );
}
