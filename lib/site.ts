export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || "919447412319";

export const site = {
  name: "Sree Kayakalpam Vaidyashala",
  nameMl: "ശ്രീ കായകൽപ്പം വൈദ്യശാല",
  vaidyar: "Vaidyar Shine Bhaskar",
  vaidyarMl: "വൈദ്യർ ഷൈൻ ഭാസ്കർ",
  tagline: "Where Ancient Wisdom Meets Authentic Healing",
  taglineMl: "പാരമ്പര്യ ചികിത്സയുടെ ശ്രേഷ്ഠ കേന്ദ്രം",
  phone: "+91 9447412319",
  phoneRaw: "+919447412319",
  facebook: "https://www.facebook.com/kaayakalpam",
  hours: "Mon–Sat: 8:00 AM – 6:00 PM",
  rating: "4.5",
  reviewCount: "7",
  address: {
    line: "Mampoyil, Chunkathara",
    locality: "Malappuram",
    region: "Kerala",
    postalCode: "676505",
    country: "IN",
    full: "Mampoyil, Chunkathara, Malappuram, Kerala – 676505",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kayakalpamvaidyasala.com",
} as const;

export function waLink(
  text = "I'd like to book a consultation at Sree Kayakalpam Vaidyashala",
) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/conditions", label: "Conditions" },
  { href: "/telemedicine", label: "Telemedicine" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/books", label: "Books" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavItem = {
  label: string;
  href?: string;
  children?: { href: string; label: string }[];
};

export const navGroups: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    children: [
      { href: "/treatments", label: "Treatments" },
      { href: "/conditions", label: "Conditions" },
      { href: "/telemedicine", label: "Telemedicine" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  {
    label: "More",
    children: [
      { href: "/books", label: "Books" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
