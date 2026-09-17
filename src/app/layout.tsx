import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Tiro_Devanagari_Hindi, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-tiro",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Maa's Magic — Maa Ke Haath Ka Khana, Seedha Aapke Door Tak",
  description:
    "Ghar se door rehne wale students ke liye — verified home chefs (aunties, ammas, khalas) ka daily fresh, preservative-free ghar ka khana. Har bite mein maa ka pyaar.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${tiro.variable} ${dmSans.variable} grain bg-cream-100 font-sans text-ink-900 antialiased`}
      >
        <CartProvider>
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
