import { Geist, Geist_Mono } from "next/font/google";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Luminous Skin Clinic Leeds | Personalised Skin & Wellness",
    template: "%s | Luminous Skin Clinic Leeds",
  },
  description:
    "Personalised skin, facial and wellness treatments in Leeds. Explore clinical treatments, targeted skin concerns, transparent pricing, and instant online booking at Luminous Skin Clinic.",
  keywords: [
    "Luminous Skin Clinic",
    "Leeds Skin Clinic",
    "Facial Treatments Leeds",
    "Dermaplaning Leeds",
    "Microneedling Leeds",
    "HydraFacial Leeds",
    "Skin Care Leeds",
    "Facial Massage Leeds",
  ],
  authors: [{ name: "Luminous Skin Clinic" }],
  creator: "Luminous Skin Clinic",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Luminous Skin Clinic Leeds | Personalised Skin & Wellness",
    description: "Bespoke skin, facial and wellness treatments in Leeds. Instant online booking.",
    siteName: "Luminous Skin Clinic Leeds",
    images: [
      {
        url: "/home-hero-secimg.png",
        width: 1200,
        height: 630,
        alt: "Luminous Skin Clinic Leeds",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luminous Skin Clinic Leeds",
    description: "Bespoke skin, facial and wellness treatments in Leeds.",
    images: ["/home-hero-secimg.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
