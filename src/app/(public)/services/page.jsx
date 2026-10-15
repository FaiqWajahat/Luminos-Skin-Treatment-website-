import { ServicesView } from "@/components/modules/services";
import { getPublicTreatments, groupByCategory } from "@/lib/treatments";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Services",
  description:
    "Advanced facial treatments, ritual facials, facial massage, relaxation therapies and more at Luminous Skin Clinic, Leeds.",
};

export default async function ServicesPage() {
  const treatments = await getPublicTreatments();

  return <ServicesView categories={groupByCategory(treatments)} />;
}
