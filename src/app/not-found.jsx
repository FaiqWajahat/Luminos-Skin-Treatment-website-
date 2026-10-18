import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloralDivider } from "@/components/shared/floral-accent";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 lg:py-28">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <p className="font-serif text-7xl sm:text-8xl font-bold tracking-tight text-[#EC9C9D]">404</p>
          <FloralDivider className="justify-center" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Sorry, the page you’re looking for doesn’t exist or may have been moved. Let’s get you back to
            something beautiful.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] shadow-md hover:shadow-lg hover:brightness-105 transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#D97E80] bg-white border border-[#EC9C9D]/50 hover:bg-[#EC9C9D] hover:text-white hover:border-[#EC9C9D] transition-all"
            >
              View Treatments
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
