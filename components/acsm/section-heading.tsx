type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#d6a15d]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#f5f2ea] md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[#a7a29a] md:text-lg">{description}</p>
    </div>
  );
}
