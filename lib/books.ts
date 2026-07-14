export type Book = {
  title: string;
  titleMl: string;
  subtitleMl?: string;
  image: string;
  description: string;
};

export const books: Book[] = [
  {
    title: "Visha Chikitsa Agadam Amrutham",
    titleMl: "വിഷ ചികിത്സ അഗദം അമൃതം",
    image: "/images/book-visha.jpg",
    description:
      "A classical Malayalam treatise on Agada Tantra — Ayurvedic toxicology. Written so that hereditary knowledge of treating snakebite, scorpion sting, spider and insect venom is preserved and made accessible. A practical guide for emergencies and a reference for students of Visha Chikitsa.",
  },
  {
    title: "Vaidyayanam — Experience. Knowledge. Practice.",
    titleMl: "വൈദ്യായനം",
    subtitleMl: "അനുഭവം. അറിവ്. പ്രയോഗം.",
    image: "/images/book-vaidya.jpg",
    description:
      "A reflective work drawing together a lifetime of clinical experience, classical knowledge and hands-on practice — distilling the principles that guide authentic parampara Ayurvedic care.",
  },
];
