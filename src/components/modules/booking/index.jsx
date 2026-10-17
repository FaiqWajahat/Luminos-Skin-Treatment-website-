import { BookingForm } from "./booking-form";

export function BookingView({ initialTreatment = "" }) {
  return <BookingForm initialTreatment={initialTreatment} />;
}
