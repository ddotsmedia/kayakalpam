export default function SectionHeading({
  eyebrow,
  title,
  titleMl,
  light = false,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  titleMl?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "text-center" : ""} mb-8`}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">{eyebrow}</p>
      )}
      {titleMl && (
        <p className={`font-ml text-sm tracking-[0.02em] text-secondary ${eyebrow ? "mt-1" : ""}`}>
          {titleMl}
        </p>
      )}
      <h2
        className={`mt-2 font-heading text-[22px] font-medium leading-tight sm:text-[28px] ${
          light ? "text-white" : "text-[#1a3a2a]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
