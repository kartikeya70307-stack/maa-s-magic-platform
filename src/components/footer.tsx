import Link from "next/link";
import { Heart, MapPin, Phone } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";

const CITIES = ["Delhi", "Kanpur", "Chennai", "Hyderabad", "Jaipur", "Pune"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-cream-100">
      <div className="saree-border-flame opacity-80" />
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark size={44} />
              <span className="font-display text-2xl font-black tracking-tight">
                Maa&rsquo;s <span className="italic text-flame-400">Magic</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-300/80">
              Ghar se door rehne wale har bachche ke liye — verified home chefs
              ka daily-fresh, preservative-free khana. Hum restaurant nahi hain.
              Hum gharon ka network hain.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-cream-100/15 px-4 py-2 text-xs text-cream-300/80">
              Made with maa ka pyaar in India
              <Heart size={12} className="text-flame-400" fill="currentColor" />
            </p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-flame-300">
              Khana
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-300/80">
              <li>
                <Link href="/menu" className="transition hover:text-flame-300">
                  Aaj ka menu
                </Link>
              </li>
              <li>
                <Link href="/chefs" className="transition hover:text-flame-300">
                  Hamari home chefs
                </Link>
              </li>
              <li>
                <Link href="/story" className="transition hover:text-flame-300">
                  Hamari kahani
                </Link>
              </li>
              <li>
                <Link
                  href="/story#chef-bano"
                  className="transition hover:text-flame-300"
                >
                  Home chef bano
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-flame-300">
              Sheher
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-300/80">
              {CITIES.map((city) => (
                <li key={city} className="inline-flex items-center gap-1.5">
                  <MapPin size={12} className="text-flame-400/70" /> {city}
                </li>
              ))}
              <li className="text-cream-300/50">
                Kota, Indore, Lucknow — jald aa rahe hain
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-flame-300">
              Bhookh lagi?
            </p>
            <p className="mt-4 text-sm text-cream-300/80">
              Order ya bas baat — direct line pe:
            </p>
            <div className="mt-3 space-y-2">
              {[
                { label: "+91 70118 67857", tel: "+917011867857" },
                { label: "+91 98917 20590", tel: "+919891720590" },
                { label: "+91 99901 28900", tel: "+919990128900" },
              ].map((n) => (
                <a
                  key={n.tel}
                  href={`tel:${n.tel}`}
                  className="flex items-center gap-2 font-display text-lg font-bold text-cream-50 transition hover:text-flame-300"
                >
                  <Phone size={15} className="shrink-0 text-flame-400" />
                  {n.label}
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-cream-300/60">
              Roz subah 8 — raat 9 · Sunday bhi
            </p>
            <p className="mt-4 rounded-2xl border border-cream-100/10 bg-ink-900/60 p-4 font-hindi text-sm italic leading-relaxed text-cream-200/90">
              &ldquo;बेटा, खाना खा लिया?&rdquo; — ab iska jawab hamesha
              &lsquo;haan&rsquo; hoga.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-cream-100/10 pt-8 text-center">
          <p className="font-hindi text-3xl italic text-flame-300/90 sm:text-4xl">
            हर बाइट में माँ का प्यार
          </p>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-[11px] uppercase tracking-widest text-cream-300/50 sm:flex-row">
            <span>© 2026 Maa&rsquo;s Magic Foods Pvt. Ltd.</span>
            <span>No preservatives. No shortcuts. Sirf pyaar.</span>
            <span>Ghar se door bachon ke liye, maa ke haath se</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
