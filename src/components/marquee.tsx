import { Flower2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Marquee({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap font-display text-sm font-black uppercase tracking-[0.25em] sm:text-base">
            {item}
          </span>
          <Flower2
            size={18}
            className={cn(
              "mx-6 shrink-0",
              dark ? "text-marigold-300" : "text-cream-50/70"
            )}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden py-4",
        dark ? "bg-ink-950 text-cream-100" : "bg-flame-500 text-cream-50"
      )}
    >
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
