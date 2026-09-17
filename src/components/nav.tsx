"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { LogoMark } from "@/components/logo-mark";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/menu", label: "Aaj Ka Khana" },
  { href: "/chefs", label: "Home Chefs" },
  { href: "/story", label: "Hamari Kahani" },
];

export function Nav() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-ink-900/10 bg-cream-50/85 py-2 pl-3 pr-2 shadow-card backdrop-blur-xl">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="transition-transform duration-300 group-hover:rotate-[-8deg]">
            <LogoMark size={42} />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-black tracking-tight">
              Maa<span className="text-flame-500">&rsquo;s</span>{" "}
              <span className="italic text-flame-500">Magic</span>
            </span>
            <span className="mt-1 block font-hindi text-[11px] leading-none text-ink-500">
              माँ के हाथ का खाना
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-bold transition",
                  active
                    ? "text-flame-600"
                    : "text-ink-600 hover:bg-cream-200 hover:text-ink-900"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-flame-500"
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/story#chef-bano"
            className="ml-1 rounded-full border border-ink-900/15 px-4 py-2 text-sm font-bold text-ink-700 transition hover:border-flame-400 hover:bg-flame-50 hover:text-flame-600"
          >
            Chef Bano
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 rounded-full bg-ink-900 py-2.5 pl-4 pr-4 text-sm font-bold text-cream-50 transition hover:bg-flame-600"
          >
            <ShoppingBag size={17} />
            <span className="hidden sm:inline">Dabba</span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full border-2 border-cream-50 bg-marigold-400 text-[11px] font-black text-ink-900"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="grid size-10 place-items-center rounded-full border border-ink-900/15 text-ink-700 md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl border border-ink-900/10 bg-cream-50 p-3 shadow-warm md:hidden"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-3 font-display text-lg font-semibold text-ink-800 transition hover:bg-cream-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/story#chef-bano"
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl bg-flame-50 px-4 py-3 font-bold text-flame-600"
            >
              Ghar ka chef bano — kamaai + izzat
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
