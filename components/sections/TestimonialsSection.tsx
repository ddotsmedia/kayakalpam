import { readData } from "@/lib/data";
import { testimonials as fallback, type Testimonial } from "@/lib/testimonials";
import TestimonialsCarousel from "@/components/sections/Testimonials";

type Stored = {
  id: string;
  name: string;
  district: string;
  text: string;
  rating: number;
  active: boolean;
  createdAt: string;
};

export default function TestimonialsSection() {
  const stored = readData<Stored[]>("testimonials", []);
  const active: Testimonial[] = stored
    .filter((t) => t.active)
    .map((t) => ({ name: t.name, district: t.district, text: t.text }));
  const items = active.length ? active : fallback;
  return <TestimonialsCarousel items={items} />;
}
