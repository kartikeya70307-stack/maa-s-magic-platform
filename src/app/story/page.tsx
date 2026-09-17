import Link from "next/link";
import {
  ArrowRight,
  Heart,
  IndianRupee,
  Package,
  Scale,
  ShieldCheck,
  Sunrise,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { BecomeChefForm } from "@/components/become-chef-form";
import { PEXELS, wideImg } from "@/lib/images";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hamari Kahani — Maa's Magic",
  description:
    "Ek hostel ke kamre se shuru hui kahani — kaise humne gharon ki rasoi ko sheher ke students se joda. Maa ka pyaar, ab delivery mein.",
};

const SLOGANS = [
  { hindi: "हर बाइट में माँ का प्यार", roman: "Har bite mein maa ka pyaar" },
  { hindi: "घर से दूर, घर के स्वाद के पास", roman: "Ghar se door, ghar ke swad ke paas" },
  { hindi: "भूख पेट की नहीं, दिल की भी होती है", roman: "Bhookh pet ki nahi, dil ki bhi hoti hai" },
  { hindi: "माँ की रेसिपी, आंटी के हाथ, आपके दरवाज़े तक", roman: "Maa ki recipe, aunty ke haath, aapke darwaze tak" },
  { hindi: "जहाँ डब्बा खुले, वही घर", roman: "Jahan dabba khule, wahi ghar" },
  { hindi: "मैस का खाना पेट भरता है,\nमाँ का खाना दिल", roman: "Mess ka khana pet bharta hai, maa ka khana dil" },
];

const VALUES = [
  {
    icon: Heart,
    title: "Pyaar",
    hindi: "प्यार",
    body: "Har chef ko hum ek sawaal poochte hain — 'kya aap ye apne bachche ko khilayengi?' Agar jhijhak hai, toh wo dish platform pe nahi jaati.",
  },
  {
    icon: Sunrise,
    title: "Tazgi",
    hindi: "ताज़गी",
    body: "Koi refrigerator economics nahi. Subah ka samaan, dopahar tak aapke dibbe mein. Kal ka khana yahan exist hi nahi karta.",
  },
  {
    icon: Scale,
    title: "Imaandari",
    hindi: "ईमानदारी",
    body: "Jo daam aapkeghar ke samaan par lagta — usi mein aunty ki mehnat, humari delivery, aur thodi si bachat, sab manage hota hai.",
  },
];

export default function StoryPage() {
  return (
    <>
      {/* hero */}
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-flame-600">
                Hamari kahani
              </p>
              <h1 className="mt-3 font-display text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl">
                Yeh company nahi.{" "}
                <span className="italic text-flame-500">
                  2 baje raat ki bhookh se bana ek waada hai.
                </span>
              </h1>
              <div className="mt-7 space-y-5 leading-relaxed text-ink-600">
                <p>
                  2019. Kota ka ek hostel room. Mains ki tayyari ke beech 2 baje
                  raat ko humare founder ko {" "}
                  <span className="font-bold text-ink-900">
                    maa ke haath ki dal
                  </span>{" "}
                  itni yaad aayi ki phone utha ke bola — &ldquo;maa, bas ek
                  spoonful chahiye.&rdquo; Maa ne bhi utni hi emotional awaaz
                  mein kaha — &ldquo;beta, ghar aa ja abhi.&rdquo;
                </p>
                <p>
                  Ghar toh nahi aa sakta tha. Par us raat ek sawaal reh gaya:{" "}
                  <span className="font-bold text-ink-900">
                    India mein lakhon maa/behen/aunty roz itna accha khana banati
                    hain — aur lakhon bachche roz mess ka khana sehte hain. Yeh
                    dono ek doosre se kyun nahi milte?
                  </span>
                </p>
                <p>
                  Bas wahi se Maa&rsquo;s Magic shuru hui — restaurants ka
                  marketplace nahi,{" "}
                  <span className="font-bold text-ink-900">
                    gharon ki rasoi ka network
                  </span>
                  . Aaj har order ke saath do logon ka din ban jata hai: ek
                  bachche ka, jo ghar ka khana paata hai; aur ek aunty ka, jinki
                  rasoi ko izzat milti hai.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                {[
                  { v: "6", l: "sheher" },
                  { v: "120+", l: "home chefs" },
                  { v: "50k+", l: "tiffins" },
                  { v: "36%", l: "students roz order karte hain" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-3xl font-black">{s.v}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-500">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Reveal delay={0.15} className="relative">
              <div className="arch overflow-hidden border-[8px] border-cream-50 shadow-warm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wideImg(PEXELS.steelMeal)}
                  alt="Steel ke banton mein ghar ka khana"
                  className="aspect-[4/4.6] w-full object-cover"
                />
              </div>
              <div className="absolute -left-3 bottom-8 max-w-[220px] -rotate-3 rounded-2xl bg-cream-50 p-4 shadow-warm sm:-left-8">
                <p className="font-hindi text-sm italic leading-snug text-flame-600">
                  &ldquo;बच्चे ने खाया नहीं कुछ दिनों से शायद... तुम खिला दो ना।&rdquo;
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                  — ek maa ki request jo humari founding brief bani
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Ghar se door bachche",
          "Rasoi se seedha rishta",
          "Maa ka pyaar, delivered",
          "Izzat bhi, income bhi",
        ]}
      />

      {/* emotions collage */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          center
          eyebrow="Humare dono parivaar"
          hindi="एक तरफ़ रसोई, दूसरी तरफ़ हॉस्टल"
          title={
            <>
              Do dilon ka connection:{" "}
              <span className="italic text-flame-500">kadhai aur kalam</span>
            </>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            {
              img: wideImg(PEXELS.naniWithChild),
              label: "Rasoi wali maa",
              sub: "jinke haath mein 30 saal ka jaadu",
            },
            {
              img: wideImg(PEXELS.prarthanaMeal),
              label: "Woh lamha",
              sub: "jab pehli bite pe sari doori mit jaati hai",
            },
            {
              img: wideImg(PEXELS.studentEating),
              label: "Hostel ka baccha",
              sub: "jo ab phone pe maa se 'haan kha liya' sach mein kehta hai",
            },
          ].map((card, i) => (
            <Reveal key={card.label} delay={i * 0.1}>
              <figure className="group overflow-hidden rounded-[26px] border border-ink-900/10 bg-cream-50 shadow-card">
                <div className="arch-sm overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.img}
                    alt={card.label}
                    loading="lazy"
                    className="aspect-[4/3.4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <p className="font-display text-lg font-bold">{card.label}</p>
                  <p className="mt-1 text-sm text-ink-500">{card.sub}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* slogan wall */}
      <section className="bg-ink-950 py-20 text-cream-100 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            dark
            center
            eyebrow="Jin lafzon pe hum chalte hain"
            hindi="हमारे दिल के नारे"
            title={
              <>
                Slogan nahi,{" "}
                <span className="italic text-marigold-300">dhaage hain</span> — jo
                ghar se bandhte hain
              </>
            }
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SLOGANS.map((s, i) => (
              <Reveal key={s.hindi} delay={(i % 3) * 0.1}>
                <div className="group flex h-full flex-col justify-between rounded-[26px] border border-cream-100/10 bg-ink-900/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-marigold-300/40 hover:bg-ink-900">
                  <p className="whitespace-pre-line font-hindi text-2xl italic leading-snug text-cream-50 transition-colors group-hover:text-marigold-200">
                    &ldquo;{s.hindi}&rdquo;
                  </p>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-cream-300/50">
                    {s.roman}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          center
          eyebrow="Teen usool, zero compromise"
          hindi="जिन पर हम ठहरे हैं"
          title={
            <>
              Quality sirf checklist nahi —{" "}
              <span className="italic text-flame-500">sanskar hai</span>
            </>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.12}>
              <div className="h-full rounded-[28px] border border-ink-900/10 bg-cream-50 p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-flame-500 text-cream-50 shadow-flame">
                    <v.icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-black">{v.title}</h3>
                    <p className="font-hindi text-sm italic text-flame-600">{v.hindi}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-ink-600">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* become a chef */}
      <section id="chef-bano" className="scroll-mt-28 bg-cream-200/60 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-flame-600">
              Home chef bano
            </p>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Aapki rasoi,{" "}
              <span className="italic text-flame-500">sheher ki raunaq.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-ink-600">
              Agar mohalle mein aapka khana famous hai, agar bete-beti door padhne
              gaye hain aur aap roz sochti hain — &ldquo;kaash kisi ko khila
              paati&rdquo; — toh aap bilkul sahi jagah hain.
            </p>
            <div className="mt-8 space-y-4">
              {[
                {
                  icon: IndianRupee,
                  text: "Kamaai ghar baithe — apne daam, apne schedule, apni rasoi",
                },
                {
                  icon: Package,
                  text: "Packaging, delivery rider, payments — yeh sab humara sar-dard",
                },
                {
                  icon: ShieldCheck,
                  text: "FSSAI registration mein hum madad karte hain — free mein",
                },
                {
                  icon: Users,
                  text: "Aapke 'bachche' badhenge — students roz aapka naam lenge",
                },
              ].map((row) => (
                <Reveal key={row.text}>
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-cream-50 text-flame-500 shadow-card">
                      <row.icon size={17} />
                    </span>
                    <p className="text-[15px] font-semibold text-ink-800">{row.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 font-hindi text-lg italic text-flame-600">
              &ldquo;आपके घर के चूल्हे से, अब हज़ारों घर लौटेंगे&rdquo;
            </p>
          </div>
          <Reveal delay={0.1}>
            <BecomeChefForm />
          </Reveal>
        </div>
      </section>

      {/* final cta */}
      <section className="px-5 pb-24 pt-4 sm:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-flame-600 via-flame-500 to-marigold-400 px-6 py-16 text-center shadow-flame sm:px-16 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full border-[28px] border-cream-50/10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -right-16 size-72 rounded-full border-[36px] border-ink-950/10"
            />
            <p className="font-hindi text-xl italic text-cream-100/90">
              kahani ka agla chapter aapki thali hai
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-black leading-tight text-cream-50 sm:text-4xl">
              Aaj se mess wali dal ka bahana khatam.
            </h2>
            <Link
              href="/menu"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink-950 px-8 py-4 font-bold text-cream-50 transition hover:bg-ink-900"
            >
              Pehla ghar-wala order karo
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
