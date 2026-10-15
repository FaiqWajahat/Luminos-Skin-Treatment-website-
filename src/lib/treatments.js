import { getTreatments } from "@/lib/db-store";
import {
  CATALOG_TREATMENTS,
  TREATMENT_CATEGORIES,
  getCategoryByTitle,
} from "@/constants/treatment-catalog";

const catalogIndex = (slug) => {
  const idx = CATALOG_TREATMENTS.findIndex((t) => t.slug === slug);
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
};

const categoryIndex = (title) =>
  TREATMENT_CATEGORIES.findIndex((c) => c.title === getCategoryByTitle(title)?.title);

function normalise(t) {
  return {
    ...t,
    category: getCategoryByTitle(t.category)?.title || t.category,
    priceOptions: t.priceOptions || [],
    journey: t.journey || [],
    benefits: t.benefits || [],
    aftercare: t.aftercare || [],
    duration: t.duration && t.duration !== "0" && t.duration !== 0 ? String(t.duration) : "",
  };
}

/**
 * Treatments shown on the public site, in menu order.
 *
 * The database is the source of truth once it holds treatments in the five
 * service categories (see scripts/migrate-treatments.mjs). Until then the
 * built-in catalogue is shown, so the site never renders an empty menu.
 */
export async function getPublicTreatments() {
  let dbList = [];
  try {
    const result = await getTreatments();
    dbList = (Array.isArray(result) ? result : result.treatments || []).filter(
      (t) => t.active !== false && getCategoryByTitle(t.category),
    );
  } catch (err) {
    console.warn("Treatments unavailable, using built-in catalogue:", err.message);
  }

  const source = dbList.length > 0 ? dbList : CATALOG_TREATMENTS;

  return source
    .map(normalise)
    .sort(
      (a, b) =>
        categoryIndex(a.category) - categoryIndex(b.category) ||
        (a.order || 0) - (b.order || 0) ||
        catalogIndex(a.slug) - catalogIndex(b.slug) ||
        a.title.localeCompare(b.title),
    );
}

export async function getPublicTreatment(slug) {
  const list = await getPublicTreatments();
  return list.find((t) => t.slug === slug) || null;
}

/** [{ ...category, treatments: [] }] in menu order */
export function groupByCategory(treatments) {
  return TREATMENT_CATEGORIES.map((category) => ({
    ...category,
    treatments: treatments.filter((t) => t.category === category.title),
  }));
}
