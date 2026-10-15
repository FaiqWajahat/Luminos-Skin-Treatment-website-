import { BookingHero } from "./booking-hero";
import { BookingForm } from "./booking-form";

export function BookingView({ initialTreatment = "" }) {
  return (
    <div className="flex flex-col">
      <BookingHero />
      <BookingForm initialTreatment={initialTreatment} />
    </div>
  );
}
