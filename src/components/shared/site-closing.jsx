import { getContent, getResults } from "@/lib/db-store";
import { ResultsPreview } from "./results-preview";
import { ReviewsStrip } from "./reviews-strip";

// Before & after photo pairs from the admin Results page (images only)
async function getBeforeAfterPairs() {
  const results = await getResults();
  return (Array.isArray(results) ? results : [])
    .filter((r) => r.imageBefore && r.imageAfter && r.featured !== false)
    .slice(0, 6)
    .map((r) => ({ id: r._id, before: r.imageBefore, after: r.imageAfter }));
}

// Results (before & after photos + video) and client reviews, identical at the end of all main pages.
export async function SiteClosing() {
  const [content, pairs] = await Promise.all([getContent("homepage"), getBeforeAfterPairs()]);
  return (
    <>
      <ResultsPreview videos={content?.data?.videos} beforeAfter={pairs} />
      <ReviewsStrip />
    </>
  );
}
