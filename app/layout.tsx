import type { Metadata } from "next";
import { Playfair_Display, Nunito_Sans, Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SeasonalBanner from "@/components/layout/SeasonalBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import PageTracker from "@/components/analytics/PageTracker";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const nunito = Nunito_Sans({ variable: "--font-nunito", subsets: ["latin"], display: "swap" });
const notoMl = Noto_Sans_Malayalam({
  variable: "--font-noto-ml",
  subsets: ["malayalam"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Sree Kayakalpam Vaidyashala | Vaidyar Shine Bhaskar | Traditional & Visha Chikitsa, Malappuram Kerala",
    template: "%s | Sree Kayakalpam Vaidyashala",
  },
  description:
    "Parampara Kerala Traditional by Vaidyar Shine Bhaskar — rare Visha Chikitsa (toxicology) specialist, published author, in-house wood-fire medicine preparation. Mampoyil, Chunkathara, Malappuram.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: "ml_IN",
    siteName: site.name,
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: site.name }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "LocalBusiness"],
  name: site.name,
  alternateName: site.nameMl,
  url: site.url,
  image: `${site.url}/images/hero.jpg`,
  medicalSpecialty: ["Ayurvedic", "Toxicology"],
  founder: { "@type": "Person", name: site.vaidyar },
  telephone: site.phoneRaw,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line,
    addressLocality: site.address.locality,
    postalCode: site.address.postalCode,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  sameAs: [site.facebook],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating,
    reviewCount: site.reviewCount,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${nunito.variable} ${notoMl.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PageTracker />
        <SeasonalBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
