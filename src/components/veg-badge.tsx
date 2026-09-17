import { cn } from "@/lib/utils";

/** The classic Indian veg / non-veg square-dot mark. */
export function VegBadge({ isVeg, className }: { isVeg: boolean; className?: string }) {
  return (
    <span
      title={isVeg ? "Shakahari" : "Maansahari"}
      className={cn(
        "grid size-[18px] shrink-0 place-items-center rounded-[4px] border-2 bg-cream-50",
        isVeg ? "border-mehendi-500" : "border-[#8E2A20]",
        className
      )}
    >
      <span
        className={cn(
          "size-[7px] rounded-full",
          isVeg ? "bg-mehendi-500" : "bg-[#8E2A20]"
        )}
      />
    </span>
  );
}
