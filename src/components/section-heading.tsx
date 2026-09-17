import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  hindi,
  center = false,
  dark = false,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  hindi: string;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        center && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em]",
          dark ? "text-marigold-300" : "text-flame-600"
        )}
      >
        <span
          className={cn(
            "h-px w-8",
            dark ? "bg-marigold-300/60" : "bg-flame-500/60"
          )}
        />
        {eyebrow}
        {center && (
          <span
            className={cn(
              "h-px w-8",
              dark ? "bg-marigold-300/60" : "bg-flame-500/60"
            )}
          />
        )}
      </p>
      <h2
        className={cn(
          "mt-3 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl",
          dark ? "text-cream-50" : "text-ink-900"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-3 font-hindi text-lg italic",
          dark ? "text-cream-300/80" : "text-ink-500"
        )}
      >
        {hindi}
      </p>
    </Reveal>
  );
}
