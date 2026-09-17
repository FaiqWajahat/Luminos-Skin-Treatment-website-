import { BookingHero } from "./booking-hero";
import { BookingForm } from "./booking-form";

export function BookingView() {
  return (
    <div className="flex flex-col">
      <BookingHero />
      <BookingForm />
    </div>
  );
}
