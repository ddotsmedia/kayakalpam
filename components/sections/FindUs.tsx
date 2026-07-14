import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const MAPS_EMBED =
  process.env.NEXT_PUBLIC_MAPS_EMBED ||
  "https://maps.google.com/maps?q=11.0760,76.1330&z=15&output=embed";

export default function FindUs() {
  return (
    <section className="bg-bg py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Find Us" titleMl="ഞങ്ങളെ കണ്ടെത്തുക" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl bg-white p-8 shadow-sm">
            <div>
              <h3 className="font-heading text-lg font-bold text-accent">Address</h3>
              <p className="mt-1 text-muted">{site.address.full}</p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-accent">Phone / WhatsApp</h3>
              <a href={`tel:${site.phoneRaw}`} className="mt-1 block text-primary hover:text-secondary">
                {site.phone}
              </a>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-accent">Hours</h3>
              <p className="mt-1 text-muted">{site.hours}</p>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-accent">Follow</h3>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-primary hover:text-secondary"
              >
                facebook.com/kaayakalpam
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <iframe
              title="Map to Sree Kayakalpam Vaidyashala"
              src={MAPS_EMBED}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[300px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
