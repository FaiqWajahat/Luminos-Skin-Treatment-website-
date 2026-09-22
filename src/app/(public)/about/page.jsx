import { AboutView } from "@/components/modules/about";
import { getContent } from "@/lib/db-store";

export const metadata = {
  title: "About Us | Luminous Skin Clinic Leeds | Founder Madiha Naz",
  description:
    "Welcome to Luminous Skin Clinic Leeds, where beauty meets serenity. Founded by certified Beauty Therapist & Leeds Lead Facialist Madiha Naz (Madi).",
};

export default async function AboutPage() {
  const content = await getContent("aboutpage");
  const data = content?.data || {};

  return <AboutView data={data} />;
}
