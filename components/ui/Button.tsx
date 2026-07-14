import Link from "next/link";

type Variant = "gold" | "green" | "outlineLight" | "outlineDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors";

const variants: Record<Variant, string> = {
  gold: "bg-secondary text-white hover:bg-accent",
  green: "bg-primary text-white hover:bg-primary-dark",
  outlineLight: "border-2 border-white text-white hover:bg-white hover:text-primary",
  outlineDark: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
};

export default function Button({
  href,
  children,
  variant = "gold",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
