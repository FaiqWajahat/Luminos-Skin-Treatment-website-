import { notFound } from "next/navigation";
import { TreatmentDetail } from "@/components/modules/services/treatment-detail";
import { getPublicTreatment, getPublicTreatments } from "@/lib/treatments";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const treatment = await getPublicTreatment(slug);
  if (!treatment) return { title: "Treatment not found" };

  return {
    title: treatment.title,
    description: treatment.shortDescription,
    openGraph: {
      title: `${treatment.title} | Luminous Skin Clinic Leeds`,
      description: treatment.shortDescription,
      ...(treatment.image?.startsWith("http") || treatment.image?.startsWith("/")
        ? { images: [treatment.image] }
        : {}),
    },
  };
}

export default async function TreatmentPage({ params }) {
  const { slug } = await params;
  const treatments = await getPublicTreatments();
  const treatment = treatments.find((t) => t.slug === slug);
  if (!treatment) notFound();

  // Up to 3 others from the same category, starting after this one so each page differs
  const siblings = treatments.filter((t) => t.category === treatment.category);
  const start = siblings.findIndex((t) => t.slug === slug);
  const related = [...siblings.slice(start + 1), ...siblings.slice(0, start)].slice(0, 3);

  return <TreatmentDetail treatment={treatment} related={related} />;
}
