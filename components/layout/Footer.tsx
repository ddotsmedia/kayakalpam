import { MapPin, Phone, Clock } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2">
        {/* Brand */}
        <div>
          <h3 className="font-heading text-lg font-bold text-white">{site.name}</h3>
          <p className="font-ml mt-1 text-sm text-secondary">{site.nameMl}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{site.tagline}</p>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-white/45">
            Information on this site is for general awareness and does not replace professional
            medical advice. For any venomous bite or medical emergency, seek immediate hospital care.
            Treatment outcomes vary by individual.
          </p>
          <p className="mt-4 text-xs text-white/50">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>

        {/* Contact */}
        <div className="sm:justify-self-end">
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-3 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
              <span>{site.address.full}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-secondary" aria-hidden />
              <a href={`tel:${site.phoneRaw}`} className="hover:text-secondary">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="shrink-0 text-secondary" aria-hidden />
              <span>{site.hours}</span>
            </li>
          </ul>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-white/75 hover:text-secondary"
          >
            Facebook: /kaayakalpam
          </a>
        </div>
      </div>
    </footer>
  );
}
