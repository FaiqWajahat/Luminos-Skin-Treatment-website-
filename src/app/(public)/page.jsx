import { HomeView } from "@/components/modules/home";
import { SiteClosing } from "@/components/shared/site-closing";
import { getContent } from "@/lib/db-store";
import { getPublicTreatments, groupByCategory } from "@/lib/treatments";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: { absolute: "Luminous Skin Clinic Leeds | Where Your Natural Radiance Comes First" },
  description:
    "Personalised skin treatments and relaxing facial experiences in Leeds, created to help your skin look and feel beautifully renewed.",
};

export default async function HomePage() {
  const [content, treatments] = await Promise.all([getContent("homepage"), getPublicTreatments()]);

  return (
    <>
      <HomeView data={content?.data || {}} categories={groupByCategory(treatments)} />
      <SiteClosing />
    </>
  );
}
