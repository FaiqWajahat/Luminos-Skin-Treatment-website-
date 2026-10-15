import { HeroSection } from "./hero-section";
import { SkinConcerns } from "./skin-concerns";
import { DiscoverTreatments } from "./discover-treatments";
import { ClinicVideos } from "./clinic-videos";
import { ReviewsStrip } from "./reviews-strip";
import { InstagramFeed } from "./instagram-feed";

// Introduction → concerns → treatments → results → reviews → social
export function HomeView({ data = {}, categories = [], instagramPosts = [] }) {
  return (
    <div className="flex flex-col">
      <HeroSection image={data.heroImage} />
      <SkinConcerns />
      <DiscoverTreatments categories={categories} />
      <ClinicVideos videos={data.videos} />
      <ReviewsStrip />
      <InstagramFeed initialPosts={instagramPosts} />
    </div>
  );
}
