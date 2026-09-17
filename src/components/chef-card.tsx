import Link from "next/link";
import { BadgeCheck, Clock, MapPin, Star } from "lucide-react";
import type { Chef } from "@/lib/data";
import { compactCount } from "@/lib/utils";

export function ChefCard({ chef }: { chef: Chef }) {
  return (
    <Link
      href={`/chefs/${chef.slug}`}
      className="group block overflow-hidden rounded-[28px] border border-ink-900/10 bg-cream-50 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm"
    >
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chef.image}
          alt={chef.aunty}
          loading="lazy"
          className="aspect-[4/4.3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-mehendi-500/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-cream-50 shadow-sm backdrop-blur-sm">
          <BadgeCheck size={12} /> {chef.badge}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-hindi text-sm italic text-marigold-200">
            {chef.cuisine}
          </p>
          <h3 className="font-display text-2xl font-black text-cream-50">
            {chef.aunty}
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <p className="font-display text-[15px] font-medium italic leading-snug text-ink-700">
          &ldquo;{chef.tagline}&rdquo;
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-ink-500">
          <span className="inline-flex items-center gap-1">
            <Star size={13} className="text-marigold-400" fill="currentColor" />
            {chef.rating.toFixed(1)} · {compactCount(chef.ordersServed)} tiffins
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={13} /> {chef.deliveryTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={13} /> {chef.area}, {chef.city}
          </span>
        </div>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-flame-600">
          Aunty ka menu dekho
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
