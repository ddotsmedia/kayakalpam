import Image from "next/image";

export default function PageHeader({
  image,
  alt,
  title,
  titleMl,
  subtitle,
}: {
  image: string;
  alt: string;
  title: string;
  titleMl?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[42vh] items-center">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/50" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 text-white">
        {titleMl && <p className="font-ml text-lg text-secondary">{titleMl}</p>}
        <h1 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-white/85">{subtitle}</p>}
      </div>
    </section>
  );
}
