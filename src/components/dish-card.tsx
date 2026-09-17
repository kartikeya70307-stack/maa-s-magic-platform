"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Minus, Plus, Star, X, ZoomIn } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { VegBadge } from "@/components/veg-badge";
import type { DishWithChef } from "@/lib/data";
import { inr } from "@/lib/utils";

export function DishCard({
  dish,
  priority = false,
}: {
  dish: DishWithChef;
  priority?: boolean;
}) {
  const { add, setQty, qtyOf } = useCart();
  const qty = qtyOf(dish.id);
  const [zoomed, setZoomed] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-ink-900/10 bg-cream-50 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm"
    >
      <div className="relative overflow-hidden">
        <button
          onClick={() => setZoomed(true)}
          aria-label={`${dish.name} ko zoom karke dekho`}
          className="block w-full cursor-zoom-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dish.image}
            alt={dish.name}
            loading={priority ? "eager" : "lazy"}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <span className="absolute inset-0 grid place-items-center bg-ink-950/0 opacity-0 transition-all duration-300 group-hover:bg-ink-950/25 group-hover:opacity-100">
            <span className="grid size-12 place-items-center rounded-full bg-cream-50/95 text-ink-900 shadow-warm transition-transform duration-300 group-hover:scale-100 scale-75">
              <ZoomIn size={20} />
            </span>
          </span>
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/25 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <VegBadge isVeg={dish.isVeg} className="shadow-sm" />
          {dish.spiceLevel === "Teekha" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-ink-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-marigold-300 backdrop-blur-sm">
              <Flame size={10} /> Teekha
            </span>
          )}
        </div>
        {dish.isBestseller && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-marigold-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-ink-900 shadow-md">
            <Star size={11} fill="currentColor" /> Bestseller
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-cream-50/95 px-2.5 py-1 text-[11px] font-bold text-ink-700 shadow-sm backdrop-blur-sm">
          ★ {dish.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="font-hindi text-xs italic text-flame-600">{dish.hindiName}</p>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug">
          {dish.name}
        </h3>
        <Link
          href={`/chefs/${dish.chefSlug}`}
          className="mt-1.5 text-xs font-bold text-ink-500 transition hover:text-flame-600"
        >
          {dish.chefAunty} · {dish.chefCity}
        </Link>
        <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-ink-500">
          {dish.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">
              {dish.serves}
            </p>
            <p className="font-display text-xl font-black">{inr(dish.price)}</p>
          </div>
          {qty === 0 ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() =>
                add({
                  dishId: dish.id,
                  name: dish.name,
                  aunty: dish.chefAunty,
                  chefSlug: dish.chefSlug,
                  price: dish.price,
                  image: dish.image,
                })
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-flame-500 px-5 py-2.5 text-sm font-bold text-cream-50 shadow-flame transition hover:bg-flame-600"
            >
              Add <Plus size={15} strokeWidth={3} />
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-3 rounded-full bg-ink-900 px-2.5 py-2 text-cream-50"
            >
              <button
                onClick={() => setQty(dish.id, qty - 1)}
                aria-label="Ek kam"
                className="transition hover:text-marigold-300"
              >
                <Minus size={14} strokeWidth={3} />
              </button>
              <span className="w-4 text-center text-sm font-black">{qty}</span>
              <button
                onClick={() => setQty(dish.id, qty + 1)}
                aria-label="Ek aur"
                className="transition hover:text-marigold-300"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* ————— click-to-zoom lightbox ————— */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-[90] grid cursor-zoom-out place-items-center bg-ink-950/85 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.figure
              initial={{ scale: 0.6, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl cursor-default"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dish.image}
                alt={dish.name}
                className="max-h-[70vh] w-full rounded-[28px] border-4 border-cream-50/10 object-cover shadow-2xl"
              />
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-cream-50/10 px-5 py-4 text-cream-50 backdrop-blur-md">
                <div>
                  <p className="font-hindi text-sm italic text-marigold-300">
                    {dish.hindiName}
                  </p>
                  <p className="font-display text-xl font-bold">{dish.name}</p>
                  <p className="text-xs font-semibold text-cream-300/70">
                    {dish.chefAunty} ke haath se · {dish.serves}
                  </p>
                </div>
                <p className="font-display text-2xl font-black text-marigold-300">
                  {inr(dish.price)}
                </p>
              </figcaption>
              <button
                onClick={() => setZoomed(false)}
                aria-label="Zoom band karo"
                className="absolute -right-2 -top-2 grid size-10 place-items-center rounded-full bg-cream-50 text-ink-900 shadow-lg transition hover:rotate-90 hover:bg-marigold-300"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
