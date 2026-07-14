import Button from "@/components/ui/Button";
import { site, waLink } from "@/lib/site";

export default function CtaBanner() {
  return (
    <section className="border-t-4 border-secondary bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-accent">Begin your journey to authentic healing</h2>
          <p className="mt-2 text-muted">
            Consult {site.vaidyar} at Sree Kayakalpam Vaidyashala — {site.address.full}.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-4">
          <Button href={waLink()} external variant="green">
            WhatsApp Us
          </Button>
          <Button href={`tel:${site.phoneRaw}`} external variant="outlineDark">
            Call {site.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
