import type { LucideIcon } from "lucide-react";
import {
  Shield,
  Leaf,
  Droplets,
  Droplet,
  Waves,
  Hand,
  Thermometer,
  FlaskConical,
  Bug,
  Bone,
  Brain,
  PersonStanding,
  Flower2,
  Flower,
  Wind,
  Moon,
  Scale,
} from "lucide-react";

const REGISTRY: Record<string, LucideIcon> = {
  Shield,
  Leaf,
  Droplets,
  Droplet,
  Waves,
  Hand,
  Thermometer,
  FlaskConical,
  Bug,
  Bone,
  Brain,
  PersonStanding,
  Flower2,
  Flower,
  Wind,
  Moon,
  Scale,
};

export default function Icon({
  name,
  className,
  size = 24,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Cmp = REGISTRY[name] ?? Leaf;
  return <Cmp className={className} size={size} aria-hidden />;
}
