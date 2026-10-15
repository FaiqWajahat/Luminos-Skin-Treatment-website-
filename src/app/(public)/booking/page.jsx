import { BookingView } from "@/components/modules/booking";

export const metadata = {
  title: "Book Appointment",
  description:
    "Schedule your one-to-one clinical skin or facial treatment online at Luminous Skin Clinic Leeds.",
};

export default async function BookingPage({ searchParams }) {
  const { treatment } = await searchParams;

  return <BookingView initialTreatment={typeof treatment === "string" ? treatment : ""} />;
}
