import { PricingHero } from "./pricing-hero";
import { PricingTable } from "./pricing-table";
import { PricingGuarantee } from "./pricing-guarantee";

export function PricingView() {
  return (
    <div className="flex flex-col">
      <PricingHero />
      <PricingTable />
      <PricingGuarantee />
    </div>
  );
}
