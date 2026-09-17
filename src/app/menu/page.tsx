import { getAllDishesWithChef } from "@/lib/data";
import { MenuBrowser } from "@/app/menu/menu-browser";
import { Marquee } from "@/components/marquee";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Aaj Ka Menu — Maa's Magic",
  description:
    "Roz subah fresh banta hua ghar ka khana — nashta, lunch, dinner, snacks aur mithai, seedha verified home chefs ki rasoi se.",
};

export default async function MenuPage() {
  const dishes = await getAllDishesWithChef();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <section className="px-5 pb-8 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-flame-600">
            Aaj ka fresh menu
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display text-5xl font-black tracking-tight sm:text-6xl">
              Ghar ki rasoi,{" "}
              <span className="italic text-flame-500">aapke order pe.</span>
            </h1>
            <p className="rounded-full border border-ink-900/10 bg-cream-50 px-5 py-2.5 text-sm font-bold text-ink-600 shadow-card">
              {today} · subah fresh bana hua
            </p>
          </div>
          <p className="mt-4 max-w-2xl font-hindi text-lg italic text-ink-500">
            जो dish खत्म हो जाए, वो कल ही मिलेगी — क्योंकि ये रसोई है, कोई store
            room नहीं।
          </p>
        </div>
      </section>

      <MenuBrowser dishes={dishes} />

      <div className="mt-16">
        <Marquee
          items={[
            "Subah 11 se pehle order = dopahar delivery",
            "Meetha mat bhoolna",
            "₹299+ pe free delivery",
            "Aunty ko note likh sakte ho",
          ]}
        />
      </div>
    </>
  );
}
