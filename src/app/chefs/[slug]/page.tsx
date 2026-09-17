import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Quote,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import {
  getAllChefs,
  getChefBySlug,
  getDishesByChef,
  type DishWithChef,
} from "@/lib/data";
import { ChefCard } from "@/components/chef-card";
import { DishCard } from "@/components/dish-card";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { compactCount } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const chef = await getChefBySlug(slug);
  if (!chef) return { title: "Home Chef — Maa's Magic" };
  return {
    title: `${chef.aunty} — ${chef.cuisine} | Maa's Magic`,
    description: chef.tagline,
  };
}

export default async function ChefProfilePage({ params }: { params: Params }) {
  const { slug } = await params;
  const chef = await getChefBySlug(slug);
  if (!chef) notFound();

  const [dishRows, allChefs] = await Promise.all([
    getDishesByChef(chef.id),
    getAllChefs(),
  ]);
  const dishes: DishWithChef[] = dishRows.map((d) => ({
    ...d,
    chefAunty: chef.aunty,
    chefSlug: chef.slug,
    chefCity: chef.city,
  }));
  const others = allChefs.filter((c) => c.slug !== chef.slug).slice(0, 3);

  return (
    <>
      {/* hero */}
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <nav className="flex items-center gap-1.5 text-sm font-semibold text-ink-500">
            <Link href="/chefs" className="transition hover:text-flame-600">
              Home Chefs
            </Link>
            <ChevronRight size={14} />
            <span className="text-flame-600">{chef.aunty}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            {/* portrait */}
            <Reveal className="relative">
              <div className="arch relative overflow-hidden border-[8px] border-cream-50 shadow-warm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={chef.image}
                  alt={`${chef.aunty} apni rasoi mein`}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-mehendi-500/95 px-3.5 py-2 text-[11px] font-black uppercase tracking-wider text-cream-50 shadow-md">
                  <BadgeCheck size={14} /> {chef.badge}
                </span>
              </div>
              <div
                aria-hidden
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink-950 px-6 py-3 font-hindi text-sm italic text-marigold-300 shadow-warm"
              >
                {chef.tagline}
              </div>
            </Reveal>

            {/* details */}
            <div>
              <Reveal delay={0.05}>
                <p className="font-hindi text-lg italic text-flame-600">
                  {chef.cuisine}
                </p>
                <h1 className="mt-1 font-display text-5xl font-black tracking-tight sm:text-6xl">
                  {chef.aunty}
                </h1>
                <p className="mt-3 inline-flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm font-bold text-ink-600">
                  <span className="inline-flex items-center gap-1.5">
                    <Star size={15} className="text-marigold-400" fill="currentColor" />
                    {chef.rating.toFixed(1)} rating
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <UtensilsCrossed size={15} />
                    {compactCount(chef.ordersServed)} tiffins bheje
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={15} />
                    {chef.area}, {chef.city}
                  </span>
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { k: "Rasoi since", v: String(chef.since) },
                    { k: "Kitchen", v: chef.kitchenType },
                    { k: "Delivery", v: chef.deliveryTime },
                    { k: "Timing", v: chef.timings },
                  ].map((fact) => (
                    <div
                      key={fact.k}
                      className="rounded-2xl border border-ink-900/10 bg-cream-50 p-4 shadow-card"
                    >
                      <p className="text-[10px] font-black uppercase tracking-wider text-ink-400">
                        {fact.k}
                      </p>
                      <p className="mt-1 text-sm font-bold leading-tight text-ink-800">
                        {fact.v}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="relative mt-7 rounded-[26px] border border-flame-200/70 bg-flame-50 p-7">
                  <Quote
                    size={34}
                    className="absolute -top-4 left-6 rounded-full bg-flame-500 p-1.5 text-cream-50"
                    fill="currentColor"
                  />
                  <p className="pt-2 text-[15px] leading-relaxed text-ink-700">
                    {chef.story}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 font-hindi text-sm italic text-flame-600">
                    <Heart size={13} fill="currentColor" />
                    yeh sirf khana nahi, zimmedari hai
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* menu */}
      <section className="bg-cream-200/60 py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-flame-600">
                Aaj ki rasoi se
              </p>
              <h2 className="mt-2 font-display text-4xl font-black tracking-tight sm:text-5xl">
                {chef.aunty} ka menu{" "}
                <span className="font-hindi text-2xl italic font-normal text-ink-500">
                  ({dishes.length} dishes)
                </span>
              </h2>
            </div>
            <p className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-5 py-2.5 text-sm font-bold text-ink-600 shadow-card">
              <Clock size={15} className="text-flame-500" />
              Jo khatam, wo kal — fresh promise
            </p>
          </div>

          {dishes.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dishes.map((dish, i) => (
                <Reveal key={dish.id} delay={(i % 3) * 0.08}>
                  <DishCard dish={dish} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-10 rounded-3xl border border-dashed border-ink-300 bg-cream-50 p-10 text-center text-ink-500">
              Aaj aunty ne chhutti li hai — kal pakka menu milega.
            </p>
          )}
        </div>
      </section>

      {/* other chefs */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
          Aur bhi <span className="italic text-flame-500">maas</span> intezar mein hain
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <ChefCard chef={c} />
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee
        items={[
          `${chef.aunty} ke haath se`,
          "Garam-garam guarantee",
          "Ghar jaisa, ghar se better nahi",
          "Order karo, yaad karo",
        ]}
      />
    </>
  );
}
