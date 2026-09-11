import { cn } from "@/lib/utils";
import { SectionHeadingProps } from "@/types/types";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "flex items-center gap-2.5 mb-3 text-xs font-semibold tracking-[0.18em] uppercase text-gold-800",
            align === "center" && "justify-center",
          )}
        >
          <span className="inline-block w-6 h-[1.5px] bg-gold-800" />
          {eyebrow}
          {align === "center" && (
            <span className="inline-block w-6 h-[1.5px] bg-gold-800" />
          )}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl text-forest leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm md:text-base text-ink-soft/80 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
