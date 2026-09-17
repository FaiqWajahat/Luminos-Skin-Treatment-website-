import { ReviewsHero } from "./reviews-hero";
import { ReviewStats } from "./review-stats";
import { ReviewsGrid } from "./reviews-grid";

export function ReviewsView() {
  return (
    <div className="flex flex-col">
      <ReviewsHero />
      <ReviewStats />
      <ReviewsGrid />
    </div>
  );
}
