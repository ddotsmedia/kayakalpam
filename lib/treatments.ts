export type Treatment = {
  slug: string;
  name: string;
  nameMl: string;
  icon: string;
  short: string;
  description: string;
  benefits: string[];
  duration: string;
  highlight?: boolean;
};

export const treatments: Treatment[] = [
  {
    slug: "visha-chikitsa",
    name: "Visha Chikitsa (Agada Tantra)",
    nameMl: "വിഷ ചികിത്സ",
    icon: "Shield",
    short: "Classical toxicology — snakebite, scorpion, spider & insect venom.",
    description:
      "A rare hereditary specialty of Sree Kayakalpam Vaidyashala. Agada Tantra is the classical Ayurvedic science of toxicology, treating envenomation from snakebite, scorpion sting, spider bite and insect venom, as well as accumulated and food-borne toxins. Vaidyar Shine Bhaskar has authored a Malayalam reference text on this very subject.",
    benefits: [
      "Emergency and follow-up care for venomous bites",
      "Neutralisation of accumulated toxins (Gara/Dushi Visha)",
      "Traditional first-aid guidance for envenomation",
      "Backed by a published Malayalam treatise",
    ],
    duration: "Varies by case — immediate to multi-week",
    highlight: true,
  },
  {
    slug: "kayakalpa",
    name: "Kayakalpa Chikitsa",
    nameMl: "കായകൽപ ചികിത്സ",
    icon: "Leaf",
    short: "Deep rejuvenation therapy that renews body and mind.",
    description:
      "Kayakalpa is the classical rejuvenation (Rasayana) regimen that restores vitality, slows ageing and strengthens immunity through curated diet, classical medicines and lifestyle discipline.",
    benefits: ["Renewed vitality & stamina", "Stronger immunity", "Better sleep & clarity", "Healthy ageing"],
    duration: "21–45 days",
  },
  {
    slug: "panchakarma",
    name: "Panchakarma",
    nameMl: "പഞ്ചകർമ്മം",
    icon: "Droplets",
    short: "Five-fold classical detoxification and purification.",
    description:
      "The five classical bio-purification procedures that remove deep-seated toxins and rebalance the doshas, customised to each patient's prakriti and condition.",
    benefits: ["Deep detoxification", "Dosha rebalancing", "Relief from chronic conditions", "Restored metabolism"],
    duration: "7–28 days",
  },
  {
    slug: "shirodhara",
    name: "Shirodhara",
    nameMl: "ശിരോധാര",
    icon: "Waves",
    short: "Continuous medicated-oil stream over the forehead.",
    description:
      "A steady stream of warm medicated oil poured over the forehead to calm the nervous system, relieving stress, insomnia and disorders of the head and mind.",
    benefits: ["Deep relaxation", "Relief from insomnia", "Reduced anxiety", "Mental clarity"],
    duration: "30–45 min per session",
  },
  {
    slug: "njavara-kizhi",
    name: "Njavara Kizhi",
    nameMl: "ഞവര കിഴി",
    icon: "Hand",
    short: "Medicated rice-bolus massage that nourishes tissues.",
    description:
      "Warm boluses of Njavara rice cooked in herbal milk are massaged over the body to strengthen muscles, nourish tissues and rejuvenate the skin.",
    benefits: ["Muscle nourishment", "Improved circulation", "Skin rejuvenation", "Relief from weakness"],
    duration: "45–60 min per session",
  },
  {
    slug: "pizhichil",
    name: "Pizhichil",
    nameMl: "പിഴിച്ചിൽ",
    icon: "Thermometer",
    short: "Warm-oil bath therapy for joints and nerves.",
    description:
      "A luxurious therapy where warm medicated oil is poured and massaged continuously over the body — highly effective for rheumatic and neurological conditions.",
    benefits: ["Relief from joint pain", "Nervous-system support", "Improved mobility", "Deep nourishment"],
    duration: "45–75 min per session",
  },
  {
    slug: "classical-medicines",
    name: "Classical Medicines",
    nameMl: "ക്ലാസിക്കൽ ഔഷധങ്ങൾ",
    icon: "FlaskConical",
    short: "100+ in-house formulations, wood-fire prepared.",
    description:
      "An extensive in-house pharmacy of over 100 classical formulations, prepared personally by Vaidyar using the traditional wood-fire cauldron method — ensuring authenticity and potency.",
    benefits: ["Authentic preparation", "No commercial fillers", "Personally supervised", "Time-tested formulations"],
    duration: "As prescribed",
  },
];
