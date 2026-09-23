import { HomeView } from "@/components/modules/home";
import { getContent } from "@/lib/db-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Luminous Skin Clinic Leeds | Personalised Skin & Wellness",
  description:
    "Professional, personalised skin, facial and wellness treatments in Leeds. Explore treatments, skin concerns, transparent pricing, and online booking.",
};

export default async function HomePage() {
  const content = await getContent("homepage");
  const data = content?.data || {};

  return <HomeView data={data} />;
}
