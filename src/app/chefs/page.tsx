import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getAllChefs } from "@/lib/data";
import { ChefCard } from "@/components/chef-card";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Hamari Home Chefs — Maa's Magic",
  description:
    "Maa-grade haath, ghar ki rasoi aur 20+ saal ka experience — milo hamari verified home chefs se.",
};

export default async function ChefsPage() {
  const chefs = await getAllChefs();

  return (
    <>
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-flame-600">
            Hamari home chefs
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl">
            Restaurant ke chefs toh recipes follow karte hain.{" "}
            <span className="italic text-flame-500">
              Yeh log dil banati hain.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-600">
            Har home chef ko hum personally jaake, unki rasoi mein baith ke, unka
            khana kha chuke hain. FSSAI registration, kitchen hygiene, aur sabse
            important —{" "}
            <span className="font-bold text-ink-900">
              &ldquo;kya aap apne bachche ko ye khilayengi?&rdquo;
            </span>{" "}
            — jiska jawab bina ruke &ldquo;haan&rdquo; ho. Bas wahi chuni jaati hain.
          </p>
          <p className="mt-4 font-hindi text-lg italic text-flame-600">
            जिनके हाथ में माँ वाला जादू
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {chefs.map((chef, i) => (
              <Reveal key={chef.slug} delay={(i % 3) * 0.1}>
                <ChefCard chef={chef} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* become a chef band */}
      <section className="px-5 pb-24 sm:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[36px] border border-marigold-300/70 bg-gradient-to-br from-marigold-200 via-cream-50 to-flame-100 p-8 shadow-card sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full border-[22px] border-marigold-300/50"
            />
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-flame-600">
                  <Sparkles size={13} />
                  Kya aapke haath mein bhi woh jaadu hai?
                </p>
                <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl">
                  Apni rasoi ko sheher ki{" "}
                  <span className="italic text-flame-500">sabse khaas rasoi</span>{" "}
                  banao.
                </h2>
                <p className="mt-3 text-ink-600">
                  Packaging, delivery, payments — sab hum sambhalte hain. Aap bas
                  woh karo jo aap 20 saal se kar rahi hain: pyaar se khana banao.
                  Kamaai + izzat, dono ghar baithe.
                </p>
              </div>
              <Link
                href="/story#chef-bano"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-950 px-8 py-4 font-bold text-cream-50 transition hover:bg-flame-600"
              >
                Chef banne ki kahani shuru karo
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Marquee
        items={[
          "Maa's verified rasoi",
          "FSSAI registered homes",
          "Pyaar > profit",
          "Chhote batches, bade dil",
        ]}
      />
    </>
  );
}
