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
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "LocalBusiness"],
  name: "Sree Kayakalpam Vaidyashala",
  alternateName: ["ശ്രീ കായകൽപ്പം വൈദ്യശാല", "Kayakalpam Vaidyashala"],
  description:
    "Traditional Kerala Ayurvedic clinic specialising in Visha Chikitsa, Kayakalpa Chikitsa and Panchakarma. Founded by Vaidyar Shine Bhaskar, published Ayurveda author. Mampoyil, Malappuram.",
  medicalSpecialty: ["Ayurvedic", "Toxicology"],
  founder: {
    "@type": "Person",
    name: "Vaidyar Shine Bhaskar",
    alternateName: "വൈദ്യർ ഷൈൻ ഭാസ്കർ",
    jobTitle: "Ayurvedic Practitioner",
    knowsAbout: ["Ayurveda", "Visha Chikitsa", "Agada Tantra", "Kayakalpa Chikitsa"],
  },
  telephone: "+919447412319",
  url: "https://kayakalpamvaidyasala.com",
  openingHours: "Mo-Sa 08:00-18:00",
  geo: { "@type": "GeoCoordinates", latitude: "11.0760", longitude: "76.1330" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mampoyil, Chunkathara",
    addressLocality: "Malappuram",
    postalCode: "676505",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  sameAs: ["https://www.facebook.com/kaayakalpam"],
  hasMap: "https://maps.google.com/?q=11.0760,76.1330",
  image: "https://kayakalpamvaidyasala.com/images/hero.jpg",
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Bank Transfer, UPI",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "7" },
  availableService: [
    { "@type": "MedicalTherapy", name: "Visha Chikitsa" },
    { "@type": "MedicalTherapy", name: "Kayakalpa Chikitsa" },
    { "@type": "MedicalTherapy", name: "Panchakarma" },
    { "@type": "MedicalTherapy", name: "Shirodhara" },
    { "@type": "MedicalTherapy", name: "Njavara Kizhi" },
    { "@type": "MedicalTherapy", name: "Pizhichil" },
    { "@type": "MedicalTherapy", name: "Online Consultation" },
  ],
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
