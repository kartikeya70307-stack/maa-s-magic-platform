"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { MoveDiagonal2 } from "lucide-react";
import { PEXELS, dishImg } from "@/lib/images";

type Slide = { src: string; name: string; sub: string };

const SLIDES: Slide[] = [
  {
    src: dishImg(PEXELS.rajmaChawal),
    name: "Rajma Chawal",
    sub: "इतने क़रीब कि स्टीम महसूस होगी",
  },
  {
    src: dishImg(PEXELS.chickenBiryani),
    name: "Degh Wali Biryani",
    sub: "दम की खुशबू — स्क्रीन के उस पार",
  },
  {
    src: dishImg(PEXELS.gulabJamun),
    name: "Garam Gulab Jamun",
    sub: "अब और ज़ूम मत करो — रोक नहीं पाओगे",
  },
];

function ZoomSlide({
  progress,
  index,
  total,
  slide,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  slide: Slide;
}) {
  const seg = 1 / total;
  const s0 = index * seg;
  const s1 = (index + 1) * seg;
  const last = index === total - 1;

  const scale = useTransform(
    progress,
    [s0, s0 + 0.55 * seg, s1 - 0.1 * seg, s1],
    [0.45, 1, 1.06, 1.6]
  );
  const opacity = useTransform(
    progress,
    last
      ? [s0 + 0.04 * seg, s0 + 0.2 * seg, 0.985, 1]
      : [s0 + 0.04 * seg, s0 + 0.2 * seg, s1 - 0.16 * seg, s1 - 0.03 * seg],
    [0, 1, 1, 0]
  );
  const captionY = useTransform(
    progress,
    [s0 + 0.12 * seg, s0 + 0.45 * seg],
    [70, 0]
  );
  const captionO = useTransform(
    progress,
    [s0 + 0.1 * seg, s0 + 0.35 * seg],
    [0, 1]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 grid place-items-center"
    >
      <motion.div
        style={{ scale }}
        className="relative w-[min(86vw,760px)] overflow-hidden rounded-[30px] border border-cream-100/15 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] sm:rounded-[40px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.src}
          alt={slide.name}
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: captionY, opacity: captionO }}
        className="absolute inset-x-0 bottom-[8%] text-center"
      >
        <p className="font-hindi text-sm italic text-marigold-300 sm:text-base">
          {slide.sub}
        </p>
        <p className="mt-1 font-display text-4xl font-black italic tracking-tight text-cream-50 sm:text-6xl">
          {slide.name}
        </p>
      </motion.div>

      <motion.span
        style={{ opacity: captionO }}
        className="absolute right-6 top-24 font-mono text-xs font-bold tracking-[0.3em] text-cream-300/70 sm:right-10"
      >
        0{index + 1} / 0{total}
      </motion.span>
    </motion.div>
  );
}

export function ZoomShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-[340svh] bg-ink-950">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame-600/10 blur-3xl"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-24 text-center sm:pt-28">
          <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-cream-300/60 sm:text-[11px]">
            <MoveDiagonal2 size={13} className="text-marigold-300" />
            Zoom in · Zoom out — khana aur kareeb se
          </p>
          <p className="mt-2 font-display text-xl italic text-cream-100/90 sm:text-2xl">
            scroll karte jao, plate paas aati jaayegi…
          </p>
        </div>

        {SLIDES.map((slide, i) => (
          <ZoomSlide
            key={slide.name}
            progress={scrollYProgress}
            index={i}
            total={SLIDES.length}
            slide={slide}
          />
        ))}
      </div>
    </section>
  );
}
