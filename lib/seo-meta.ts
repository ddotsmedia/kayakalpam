import type { Metadata } from "next";
import { readData } from "./admin-data";

interface SeoEntry {
  title?: string;
  description?: string;
}

const SITE = "https://kayakalpamvaidyasala.com";

const defaults: Record<string, SeoEntry> = {
  "/": {
    title:
      "Sree Kayakalpam Vaidyashala | Vaidyar Shine Bhaskar | Traditional & Visha Chikitsa, Malappuram Kerala",
    description:
      "Traditional Kerala Ayurveda by Vaidyar Shine Bhaskar at Sree Kayakalpam Vaidyashala, Mampoyil, Malappuram. Specialist in Visha Chikitsa (snakebite, scorpion), Kayakalpa, Panchakarma. Call +91 9447412319.",
  },
  "/about": {
    title:
      "About Vaidyar Shine Bhaskar | Published Ayurveda Author | Sree Kayakalpam Vaidyashala Malappuram",
    description:
      "Vaidyar Shine Bhaskar — hereditary Ayurvedic practitioner, Visha Chikitsa specialist and author of two Malayalam books. Sree Kayakalpam Vaidyashala, Mampoyil, Malappuram, Kerala.",
  },
  "/treatments": {
    title:
      "Ayurvedic Treatments | Visha Chikitsa, Kayakalpa, Panchakarma | Sree Kayakalpam Malappuram",
    description:
      "Traditional Kerala Ayurvedic treatments: Visha Chikitsa (snakebite/venom), Kayakalpa Chikitsa, Panchakarma, Shirodhara, Njavara Kizhi, Pizhichil. Vaidyar Shine Bhaskar, Malappuram.",
  },
  "/conditions": {
    title:
      "Conditions Treated | Snakebite, Arthritis, Paralysis, Psoriasis | Sree Kayakalpam Vaidyashala",
    description:
      "Ayurvedic treatment for snakebite, scorpion sting, arthritis, spondylitis, paralysis, psoriasis, migraine, stress, digestive disorders. Vaidyar Shine Bhaskar, Malappuram Kerala.",
  },
  "/contact": {
    title:
      "Book Consultation | +91 9447412319 | Sree Kayakalpam Vaidyashala Mampoyil Malappuram",
    description:
      "Contact Sree Kayakalpam Vaidyashala, Mampoyil, Chunkathara, Malappuram 676505. Call or WhatsApp Vaidyar Shine Bhaskar: +91 9447412319. Mon–Sat 8AM–6PM.",
  },
  "/faq": {
    title: "FAQs | Visha Chikitsa & Ayurveda | Sree Kayakalpam Vaidyashala Malappuram",
    description:
      "Frequently asked questions about Visha Chikitsa, snakebite treatment, Kayakalpa, Panchakarma and online consultations at Sree Kayakalpam Vaidyashala, Malappuram.",
  },
  "/books": {
    title:
      "Published Books | Vaidyar Shine Bhaskar | Visha Chikitsa Agadam Amrutham | Vaidyayanam",
    description:
      "Books by Vaidyar Shine Bhaskar: Visha Chikitsa Agadam Amrutham (snake & venom treatment) and Vaidyayanam — Experience, Knowledge, Practice. Malayalam Ayurveda books.",
  },
  "/gallery": {
    title: "Gallery | Sree Kayakalpam Vaidyashala | Clinic & Medicine Preparation Photos",
    description:
      "Photos of Sree Kayakalpam Vaidyashala — traditional medicine preparation, herbal pharmacy, consultation room and Vaidyar Shine Bhaskar at work. Mampoyil, Malappuram, Kerala.",
  },
  "/blog": {
    title: "Health Articles & Ayurveda Tips | Vaidyar Shine Bhaskar | Sree Kayakalpam",
    description:
      "Ayurveda health articles by Vaidyar Shine Bhaskar: Visha Chikitsa, Karkidaka season, Panchakarma, Prakriti and traditional Kerala medicine. Malayalam and English.",
  },
  "/telemedicine": {
    title: "Online Ayurvedic Consultation | Vaidyar Shine Bhaskar | NRI Patients | Worldwide",
    description:
      "Book an online Ayurvedic consultation with Vaidyar Shine Bhaskar from UAE, Qatar, Kuwait, Saudi Arabia or anywhere worldwide. WhatsApp video or Google Meet. +91 9447412319.",
  },
  "/prakriti": {
    title: "Prakriti Quiz | Discover Your Dosha | Sree Kayakalpam Vaidyashala",
    description:
      "Find your Ayurvedic body type (Prakriti) with our free Vata-Pitta-Kapha quiz. Get personalised treatment recommendations from Vaidyar Shine Bhaskar.",
  },
  "/karkidaka": {
    title:
      "Karkidaka Chikitsa Malappuram | Monsoon Ayurveda | Sree Kayakalpam Vaidyashala",
    description:
      "Karkidaka Chikitsa (monsoon Ayurvedic detox) at Sree Kayakalpam Vaidyashala, Malappuram. July–August packages by Vaidyar Shine Bhaskar. +91 9447412319.",
  },
  "/visha-chikitsa": {
    title:
      "Visha Chikitsa | Snakebite & Venom Treatment Kerala | Vaidyar Shine Bhaskar Malappuram",
    description:
      "Traditional Visha Chikitsa (Agada Tantra) by Vaidyar Shine Bhaskar at Sree Kayakalpam Vaidyashala, Malappuram. Snakebite, scorpion sting, insect venom treatment. Emergency: +91 9447412319.",
  },
};

export function seoMeta(pathname: string): SeoEntry {
  const overrides = readData<Record<string, SeoEntry>>("seo", {});
  const override = overrides[pathname] ?? {};
  const def = defaults[pathname] ?? {};
  return {
    title: override.title ?? def.title,
    description: override.description ?? def.description,
  };
}

/** Full Metadata (title/description/OG/twitter/canonical) for a page path. */
export function buildMetadata(pathname: string): Metadata {
  const { title, description } = seoMeta(pathname);
  const canonical = pathname === "/" ? SITE : `${SITE}${pathname}`;
  return {
    title: title ? { absolute: title } : undefined,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: "Sree Kayakalpam Vaidyashala",
      locale: "en_IN",
      alternateLocale: ["ml_IN"],
      images: [
        { url: "/images/hero.jpg", width: 1200, height: 630, alt: "Sree Kayakalpam Vaidyashala" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero.jpg"],
    },
    alternates: { canonical },
  };
}

/** BreadcrumbList JSON-LD from [name, relativePath] pairs. */
export function breadcrumbLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: path === "/" ? SITE : `${SITE}${path}`,
    })),
  };
}
