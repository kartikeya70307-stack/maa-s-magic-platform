import Link from "next/link";
import {
  ArrowRight,
  Bike,
  CalendarHeart,
  Check,
  CookingPot,
  Heart,
  Leaf,
  MapPin,
  Quote,
  ShieldCheck,
  Star,
  Sunrise,
  UtensilsCrossed,
} from "lucide-react";
import { getBestsellers, getFeaturedChefs } from "@/lib/data";
import { Marquee } from "@/components/marquee";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ChefCard } from "@/components/chef-card";
import { DishCard } from "@/components/dish-card";
import { AdFilm } from "@/components/ad-film";
import { LiveRasoi } from "@/components/live-rasoi";
import { ZoomShowcase } from "@/components/zoom-showcase";
import { chefImg, LOCAL, PEXELS, wideImg } from "@/lib/images";
import { inr } from "@/lib/utils";

export const dynamic = "force-dynamic";

const MARQUEE_ITEMS = [
  "Ghar ka khana",
  "Maa ka pyaar",
  "Daily fresh",
  "No preservatives",
  "Steel-kitchen hygiene",
  "Aunty approved",
  "Hostel door delivery",
];

const STEPS = [
  {
    icon: UtensilsCrossed,
    title: "Apni aunty chuno",
    hindi: "अपनी आंटी चुनो",
    body: "Punjabi aunty, Tamil amma, Hyderabadi khala — jiske haath ka khana aapke ghar jaisa lage, unhe apna rasoi-partner banao.",
  },
  {
    icon: CalendarHeart,
    title: "Aaj ka fresh menu",
    hindi: "रोज़ नया, रोज़ ताज़ा",
    body: "Har subah rasoi se naya menu. Chhote batches, limited thalis — jo milta hai, bilkul taaza milta hai.",
  },
  {
    icon: Bike,
    title: "Garam dabbi, seedha gate tak",
    hindi: "गरम खाना, 45 मिनट में",
    body: "Kadhai se utar ke seedha aapke hostel/PG ke gate. Saath mein aunty ka handwritten note bhi milta hai, kabhi kabhi.",
  },
];

const PROMISES = [
  {
    icon: Leaf,
    title: "Zero preservatives",
    body: "Kuch stored nahi, kuch frozen nahi. Jo bana, aaj bana.",
  },
  {
    icon: Sunrise,
    title: "Subah ki rasoi",
    body: "Har chef subah 5–8 baje cook karti hai — restaurant nahi, ghar ka schedule.",
  },
  {
    icon: ShieldCheck,
    title: "Maa's Verified kitchens",
    body: "FSSAI-registered, humare team ne khud khake verify kiya hai.",
  },
  {
    icon: Heart,
    title: "Bachchon ka khana",
    body: "Rule simple hai — jo khana unke apne bachon ke layak nahi, aap tak kabhi nahi pahunchega.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Mess ka khana chhod diya tha maine. Pehli baar Rekha Aunty ka rajma khaya toh aankhen bhar aayi — hotspot pe mummy ko video call kiya aur bola, mili gayi dilli mein bhi maa.",
    name: "Ananya S.",
    detail: "2nd year · Lajpat Nagar PG, Delhi",
  },
  {
    quote:
      "Kota mein sabse mushkil Sunday hota tha. Ab Gharwali Thali order karta hoon, photo mummy ko bhejta hoon. Wo khush, main khush. 169 rupay mein mental health zinda hai.",
    name: "Aman V.",
    detail: "JEE drop year · Kota se order, Kanpur se pyaar",
  },
  {
    quote:
      "Floor ke saare ladke ab Fatima Khala ko 'Khala' bulate hain. Birthday biryani, exam jeetne ka korma — sab unhi se chalta hai. Gratitude nahi, family hai ye.",
    name: "Zoya K.",
    detail: "Final year · Tolichowki hostel, Hyderabad",
  },
];

export default async function HomePage() {
  const [featuredChefs, bestsellers] = await Promise.all([
    getFeaturedChefs(3),
    getBestsellers(4),
  ]);
  const heroDish = bestsellers[0];

  return (
    <>
      {/* ————————— HERO ————————— */}
      <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-10%] size-[520px] rounded-full bg-marigold-300/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-20%] left-[-8%] size-[420px] rounded-full bg-flame-200/40 blur-3xl"
        />

        <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-flame-300/60 bg-flame-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-flame-700">
                <MapPin size={13} />
                Ghar se door bachon ke liye
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-[13.5vw] font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.2rem]">
                Maa ke haath
                <br />
                ka{" "}
                <span className="relative inline-block italic text-flame-500">
                  khana
                  <svg
                    viewBox="0 0 220 14"
                    aria-hidden
                    className="absolute -bottom-2 left-0 w-full text-marigold-400"
                  >
                    <path
                      d="M4 10 C 60 2, 160 2, 216 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                , ab aapke sheher mein.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-600 sm:text-lg">
                Food delivery platforms restaurants ke liye hain.{" "}
                <span className="font-bold text-ink-900">
                  Maa&rsquo;s Magic gharon ke liye hai.
                </span>{" "}
                Verified home chefs — aunties, ammas, khalas — jo roz subah apni
                rasoi mein wohi khana banati hain jo aapko sabse zyada yaad aata
                hai. Fresh, garam, aur pyaar se.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-4 font-hindi text-xl italic text-flame-600 sm:text-2xl">
                &ldquo;हर बाइट में माँ का प्यार&rdquo;
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/menu"
                  className="group inline-flex items-center gap-2 rounded-full bg-flame-500 px-7 py-4 font-bold text-cream-50 shadow-flame transition hover:bg-flame-600"
                >
                  Aaj ka khana dekho
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/chefs"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-ink-900/15 px-7 py-[14px] font-bold text-ink-800 transition hover:border-flame-400 hover:bg-flame-50 hover:text-flame-600"
                >
                  <CookingPot size={18} />
                  Apni aunty chuno
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-6">
                <LiveRasoi />
              </div>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                {[
                  { v: "120+", l: "home chefs" },
                  { v: "50k+", l: "tiffins delivered" },
                  { v: "4.8", l: "avg. aunty rating" },
                  { v: "0", l: "preservatives" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-3xl font-black text-ink-900">
                      {s.v}
                    </p>
                    <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-ink-500">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* hero visual */}
          <Reveal delay={0.2} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div className="arch relative overflow-hidden border-[10px] border-cream-50 shadow-warm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={LOCAL.heroMaa}
                  alt="Ek maa apni rasoi mein roti belte hue"
                  className="aspect-[4/5] w-full animate-kenburns object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 to-transparent" />
              </div>

              {/* steam */}
              <span aria-hidden className="steam-wisp left-[18%]" />
              <span aria-hidden className="steam-wisp left-[24%] [animation-delay:0.9s]" />
              <span aria-hidden className="steam-wisp left-[30%] [animation-delay:1.7s]" />

              {/* floating dish card */}
              {heroDish && (
                <Link
                  href="/menu"
                  className="absolute -left-4 bottom-8 hidden w-56 animate-float items-center gap-3 rounded-2xl border border-ink-900/10 bg-cream-50/95 p-3 shadow-warm backdrop-blur-md sm:flex"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroDish.image}
                    alt={heroDish.name}
                    className="size-14 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-bold">
                      {heroDish.hindiName}
                    </p>
                    <p className="truncate text-[11px] font-semibold text-flame-600">
                      {heroDish.chefAunty}
                    </p>
                    <p className="mt-0.5 text-xs font-black">{inr(heroDish.price)}</p>
                  </div>
                </Link>
              )}

              {/* rotating badge */}
              <div className="absolute -right-3 -top-6 grid size-28 animate-float-slow place-items-center rounded-full bg-flame-500 text-cream-50 shadow-flame sm:size-32">
                <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slower">
                  <defs>
                    <path
                      id="badge-circle"
                      d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                    />
                  </defs>
                  <text className="fill-cream-50 text-[8.5px] font-bold tracking-[0.22em]">
                    <textPath href="#badge-circle">
                      MAA KA PYAAR • HAR BITE MEIN • MAA KA PYAAR •
                    </textPath>
                  </text>
                </svg>
                <Heart size={26} fill="currentColor" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={MARQUEE_ITEMS} />

      {/* ————————— DIL KI BAAT ————————— */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="arch-sm mt-10 overflow-hidden shadow-warm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wideImg(PEXELS.naniWithChild)}
                  alt="Maa apni beti ke saath rasoi mein"
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="arch-sm overflow-hidden shadow-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={wideImg(PEXELS.prarthanaMeal)}
                    alt="Ghar ke khaane se pehle shukriya"
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-3xl bg-ink-900 p-5 text-cream-50 shadow-card">
                  <p className="font-hindi text-lg italic leading-snug text-marigold-300">
                    &ldquo;भूख पेट की नहीं, दिल की भी होती है&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Dil ki baat"
              hindi="miss call pe 'खा लिया?' — हम उसी सवाल का जवाब हैं"
              title={
                <>
                  Mess ka khana pet bharta hai.{" "}
                  <span className="italic text-flame-500">Maa ka khana dil.</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-ink-600">
                Hostel room ki chhat dukhti nahi, par 9 baje ki bhookh dukhti hai
                — kyunki wo bhookh sirf pet ki nahi hoti. Maa&rsquo;s Magic ek
                food app kam, ek{" "}
                <span className="font-bold text-ink-900">
                  ghar-door delivery service
                </span>{" "}
                zyada hai. Hum verified home chefs ke network se aapko wohi
                khilate hain jo 18 saal aapki maa ne khilaya.
              </p>
            </Reveal>
            <div className="mt-8 space-y-4">
              {[
                "Roz subah 5 baje shuru hoti hai asli rasoi — koi factory line nahi",
                "Wohi sarson, wohi ghee, wohi sabudana — aapke ghar wale samaan jaise",
                "Chhote batches mein banta hai — kyunki pyaar mass-produce nahi hota",
              ].map((point, i) => (
                <Reveal key={point} delay={0.15 + i * 0.08}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mehendi-100 text-mehendi-500">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <p className="text-[15px] font-semibold text-ink-800">{point}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.4}>
              <Link
                href="/story"
                className="mt-8 inline-flex items-center gap-2 font-bold text-flame-600 transition hover:gap-3"
              >
                Hamari poori kahani padho <ArrowRight size={17} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————————— HOW IT WORKS ————————— */}
      <section className="relative bg-cream-200/60 py-20 sm:py-28">
        <div className="saree-border absolute inset-x-0 top-0 opacity-60" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            center
            eyebrow="Kaise kaam karta hai"
            hindi="तीन स्टेप — और गरम-गरम घर"
            title={
              <>
                Bhookh se maa ka swad tak,{" "}
                <span className="italic text-flame-500">sirf 3 kadam</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.12}>
                <div className="group relative h-full rounded-[28px] border border-ink-900/10 bg-cream-50 p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm">
                  <span className="absolute right-6 top-5 font-display text-5xl font-black text-cream-300 transition-colors group-hover:text-marigold-300">
                    0{i + 1}
                  </span>
                  <span className="grid size-14 place-items-center rounded-2xl bg-flame-500 text-cream-50 shadow-flame">
                    <step.icon size={24} strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-hindi text-sm italic text-flame-600">
                    {step.hindi}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————————— FEATURED CHEFS ————————— */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Hamari home chefs"
            hindi="जिनके हाथ में माँ वाला जादू"
            title={
              <>
                Yeh aunties hain,{" "}
                <span className="italic text-flame-500">chefs nahi.</span>
                <br />
                Aur isi mein magic hai.
              </>
            }
          />
          <Reveal delay={0.15}>
            <Link
              href="/chefs"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-ink-900/15 px-6 py-3 font-bold text-ink-800 transition hover:border-flame-400 hover:bg-flame-50 hover:text-flame-600"
            >
              Saari home chefs dekho
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredChefs.map((chef, i) => (
            <Reveal key={chef.slug} delay={i * 0.1}>
              <ChefCard chef={chef} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————————— BESTSELLERS ————————— */}
      <section className="relative overflow-hidden bg-ink-950 py-20 text-cream-100 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 size-[420px] rounded-full bg-flame-600/20 blur-3xl"
        />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              dark
              eyebrow="Students ki favourites"
              hindi="जो सबसे ज़्यादा order होता है"
              title={
                <>
                  Aaj ka sabse zyada{" "}
                  <span className="italic text-marigold-300">maa-yaad</span> khana
                </>
              }
            />
            <Reveal delay={0.15}>
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-cream-50 px-6 py-3 font-bold text-ink-900 transition hover:bg-marigold-300"
              >
                Poora menu dekho
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((dish, i) => (
              <Reveal key={dish.id} delay={i * 0.08} className="[.group:hover_&]:shadow-none">
                <DishCard dish={dish} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————————— ZOOM SHOWCASE ————————— */}
      <ZoomShowcase />

      <Marquee
        dark
        items={[
          "Kadhai se seedha gate tak",
          "Chhote batches",
          "Sunday specials",
          "Aunty ka handwritten note",
          "Steel-grade hygiene",
        ]}
      />

      {/* ————————— PROMISE ————————— */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          center
          eyebrow="Quality pe koi samjhauta nahi"
          hindi="हमारा वादा — माँ के नाम"
          title={
            <>
              Maa-grade quality,{" "}
              <span className="italic text-flame-500">roz, bina fail</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="h-full rounded-[26px] border border-flame-200/70 bg-gradient-to-b from-flame-50 to-cream-50 p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-flame">
                <span className="mx-auto grid size-13 place-items-center rounded-full bg-cream-50 p-4 text-flame-500 shadow-inner">
                  <p.icon size={22} strokeWidth={2} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————————— TESTIMONIALS ————————— */}
      <section className="bg-cream-200/60 py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <SectionHeading
            center
            eyebrow="Students ki zubaani"
            hindi="सीधे हॉस्टल के दिलों से"
            title={
              <>
                Ghar se door,{" "}
                <span className="italic text-flame-500">par ghar ke paas</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <figure className="flex h-full flex-col rounded-[26px] border border-ink-900/10 bg-cream-50 p-7 shadow-card">
                  <Quote size={26} className="text-flame-300" fill="currentColor" />
                  <blockquote className="mt-4 flex-1 font-display text-[15px] font-medium italic leading-relaxed text-ink-800">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-ink-900/10 pt-4">
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs font-semibold text-ink-500">{t.detail}</p>
                    <span className="mt-2 inline-flex gap-0.5 text-marigold-400">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={13} fill="currentColor" />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————————— AD FILM ————————— */}
      <AdFilm />

      {/* ————————— CTA ————————— */}
      <section className="px-5 pb-24 pt-4 sm:px-8">
        <Reveal className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-flame-600 via-flame-500 to-marigold-400 px-6 py-16 text-center shadow-flame sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full border-[28px] border-cream-50/10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -right-16 size-72 rounded-full border-[36px] border-ink-950/10"
            />
            <p className="font-hindi text-lg italic text-cream-100/90 sm:text-xl">
              &ldquo;बेटा, खाना खा लिया?&rdquo;
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-black leading-tight text-cream-50 sm:text-5xl">
              Ab maa ke is sawaal ka jawab hamesha{" "}
              <span className="text-ink-950">&ldquo;haan&rdquo;</span> hoga.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-100/90">
              Aaj ka order karo — aur kal mummy ko batana ki aapko bhi yahan
              &ldquo;maa ke haath ka khana&rdquo; mil gaya.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-950 px-8 py-4 font-bold text-cream-50 transition hover:bg-ink-900"
              >
                Abhi order karo
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/story#chef-bano"
                className="inline-flex items-center gap-2 rounded-full border-2 border-cream-50/60 px-8 py-[14px] font-bold text-cream-50 transition hover:bg-cream-50/10"
              >
                Ghar ka chef bano
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
