"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FEED = [
  "Rekha Aunty ne abhi rajma ka tadka lagaya",
  "Shanta Mummy ki thali — 14 tiffins nikal gaye",
  "Fatima Khala ki degh band ho gayi, dum pe hai",
  "Lakshmi Amma ke 60 doson ka batch ready",
  "Usha Tai ka poha batch #3 chala gaya",
  "Gita Mummy ne raaste ke liye extra thepla rakha",
  "Aman ne Kota se gulab jamun order kiya — mom approved",
];

export function LiveRasoi() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % FEED.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex max-w-full items-center gap-2.5 overflow-hidden rounded-full border border-ink-900/10 bg-cream-50/85 px-4 py-2.5 shadow-card backdrop-blur-md">
      <span className="relative flex shrink-0">
        <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-red-600" />
      </span>
      <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.22em] text-red-600">
        Live rasoi
      </span>
      <span className="h-4 w-px shrink-0 bg-ink-900/15" />
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="truncate text-xs font-bold text-ink-700 sm:text-[13px]"
        >
          {FEED[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
