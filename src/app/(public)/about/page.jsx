import { AboutView } from "@/components/modules/about";
import { SiteClosing } from "@/components/shared/site-closing";
import { getContent } from "@/lib/db-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "About | Luminous Skin Clinic Leeds | Madi",
  description:
    "Meet Madi, certified beauty therapist and facialist in Leeds, and Luminous Skin Clinic — personalised, results-driven treatments in a calming, welcoming space.",
};

export default async function AboutPage() {
  const content = await getContent("aboutpage");

  return (
    <>
      <AboutView data={content?.data || {}} />
      <SiteClosing />
    </>
  );
}
