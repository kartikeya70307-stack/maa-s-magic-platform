"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Leaf, Search, Soup } from "lucide-react";
import { DishCard } from "@/components/dish-card";
import type { DishWithChef } from "@/lib/data";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { key: "sab", label: "Sab Kuch" },
  { key: "nashta", label: "Nashta" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "snacks", label: "Shaam Ka" },
  { key: "mithai", label: "Mithai" },
] as const;

const SORTS = [
  { key: "popular", label: "Aunty's recommendation" },
  { key: "sasta", label: "Sasta pehle" },
  { key: "mehenga", label: "Mehenga pehle" },
  { key: "rating", label: "Best rated" },
] as const;

export function MenuBrowser({ dishes }: { dishes: DishWithChef[] }) {
  const [category, setCategory] = useState<string>("sab");
  const [vegOnly, setVegOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<string>("popular");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of dishes) map.set(d.category, (map.get(d.category) ?? 0) + 1);
    return map;
  }, [dishes]);

  const filtered = useMemo(() => {
    let list = dishes.filter((d) => {
      if (category !== "sab" && d.category !== category) return false;
      if (vegOnly && !d.isVeg) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const hay = `${d.name} ${d.hindiName} ${d.description} ${d.chefAunty} ${d.chefCity}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    switch (sort) {
      case "sasta":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "mehenga":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [dishes, category, vegOnly, query, sort]);

  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* controls */}
      <div className="sticky top-[76px] z-30 -mx-2 rounded-3xl border border-ink-900/10 bg-cream-100/90 p-3 backdrop-blur-xl sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="rajma, dosa, biryani... ya apni aunty ka naam"
              className="w-full rounded-full border border-ink-900/10 bg-cream-50 py-3 pl-11 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-flame-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVegOnly((v) => !v)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-bold transition",
                vegOnly
                  ? "border-mehendi-500 bg-mehendi-100 text-mehendi-600"
                  : "border-ink-900/10 bg-cream-50 text-ink-500 hover:border-mehendi-400"
              )}
              aria-pressed={vegOnly}
            >
              <Leaf size={15} />
              Sirf shakahari
              <span
                className={cn(
                  "relative h-[18px] w-8 rounded-full transition",
                  vegOnly ? "bg-mehendi-500" : "bg-ink-300/60"
                )}
              >
                <span
                  className={cn(
                    "absolute top-[3px] size-3 rounded-full bg-cream-50 transition-all",
                    vegOnly ? "left-[16px]" : "left-[3px]"
                  )}
                />
              </span>
            </button>
            <div className="relative">
              <ArrowUpDown
                size={14}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-full border border-ink-900/10 bg-cream-50 py-3 pl-9 pr-5 text-sm font-bold text-ink-700 focus:border-flame-400"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => {
            const active = category === c.key;
            const count =
              c.key === "sab" ? dishes.length : (counts.get(c.key) ?? 0);
            return (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition",
                  active
                    ? "border-flame-500 bg-flame-500 text-cream-50 shadow-flame"
                    : "border-ink-900/10 bg-cream-50 text-ink-600 hover:border-flame-300 hover:text-flame-600"
                )}
              >
                {c.label}{" "}
                <span className={active ? "opacity-80" : "text-ink-400"}>
                  · {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* result meta */}
      <p className="mt-6 text-sm font-semibold text-ink-500">
        <span className="font-display text-lg font-black text-ink-900">
          {filtered.length}
        </span>{" "}
        dishes — {filtered.length === 0 ? "aunty haath jod rahi hain" : "kadhai garam hai"}
      </p>

      {/* grid */}
      {filtered.length > 0 ? (
        <motion.div layout className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-5 flex flex-col items-center gap-4 rounded-[28px] border border-dashed border-ink-300 bg-cream-50 px-6 py-16 text-center">
          <span className="rounded-full bg-flame-100 p-5 text-flame-500">
            <Soup size={36} strokeWidth={1.5} />
          </span>
          <p className="font-display text-xl font-bold">
            Aaj aisa kuch nahi bana...
          </p>
          <p className="max-w-sm text-sm text-ink-500">
            Thoda aur khao-dhundo — ya filter hatado. Aunty log roz kuch naya
            banati hain, kal zaroor milega.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("sab");
              setVegOnly(false);
            }}
            className="rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-cream-50 transition hover:bg-flame-600"
          >
            Saare filters hatao
          </button>
        </div>
      )}
    </section>
  );
}
