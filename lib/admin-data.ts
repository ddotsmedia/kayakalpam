import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export function readData<T>(file: string, fallback: T): T {
  try {
    const p = path.join(DATA_DIR, file + ".json");
    if (!fs.existsSync(p)) return fallback;
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

export function writeData<T>(file: string, data: T): void {
  const p = path.join(DATA_DIR, file + ".json");
  const tmp = p + ".tmp";
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, p);
}

// ---- default fallbacks for missing files ----

export type TreatmentItem = {
  id: string;
  nameEn: string;
  nameMl: string;
  description: string;
  benefits: string;
  duration: string;
};

export type FaqItem = { id: string; question: string; answer: string };

export type BookItem = {
  titleMl: string;
  titleEn: string;
  author: string;
  description: string;
};

export type SiteContent = {
  hero: {
    titleMl?: string;
    titleEn?: string;
    subtitle?: string;
    subtitleMl?: string;
  };
  about: {
    vaidyarNameMl?: string;
    vaidyarNameEn?: string;
    bio?: string;
    established?: string;
    hours?: string;
    address?: string;
  };
  treatments: TreatmentItem[];
  faq: FaqItem[];
  books: BookItem[];
};

export const defaultContent: SiteContent = {
  hero: {},
  about: {},
  treatments: [],
  faq: [],
  books: [],
};

export type Analytics = {
  pageViews: Record<string, number>;
  dailyViews: Record<string, number>;
  events: Record<string, number>;
};

export const defaultAnalytics: Analytics = {
  pageViews: {},
  dailyViews: {},
  events: {},
};

export type Submission = {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatmentInterest: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: string;
  country?: string;
};

export type SeoEntry = { title?: string; description?: string };
export type SeoMap = Record<string, SeoEntry>;

export type Testimonial = {
  id: string;
  name: string;
  district: string;
  text: string;
  rating: number;
  active: boolean;
  createdAt: string;
};
