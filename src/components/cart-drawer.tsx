"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bike,
  Flame,
  Heart,
  Minus,
  Plus,
  Soup,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { inr } from "@/lib/utils";

type Step = "cart" | "checkout" | "success";

const FREE_DELIVERY_ABOVE = 299;
const DELIVERY_FEE = 25;

export function CartDrawer() {
  const { items, subtotal, count, isOpen, closeCart, setQty, remove, clear } =
    useCart();
  const [step, setStep] = useState<Step>("cart");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    noteForAunty: "",
    paymentMethod: "online" as "online" | "cod",
  });

  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window === "undefined") return resolve(false);
      if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  function resetAndClose() {
    closeCart();
    setTimeout(() => {
      setStep("cart");
      setError("");
      setOrderNumber("");
    }, 350);
  }

  async function placeOrder() {
    setError("");
    if (form.customerName.trim().length < 2) {
      setError("Apna naam toh bata do, baccha.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
      setError("Sahi 10-digit phone number daalo — aunty call karengi.");
      return;
    }
    if (form.address.trim().length < 10) {
      setError("Hostel/PG ka poora pata likho, taaki khana bhatke nahi.");
      return;
    }
    setPlacing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName.trim(),
          phone: form.phone.replace(/\s/g, ""),
          address: form.address.trim(),
          noteForAunty: form.noteForAunty.trim(),
          paymentMethod: form.paymentMethod,
          items: items.map(({ dishId, name, aunty, chefSlug, price, qty, image }) => ({
            dishId,
            name,
            aunty,
            chefSlug,
            price,
            qty,
            image,
          })),
          subtotal,
          deliveryFee,
          total,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        orderNumber?: string;
        error?: string;
        razorpayOrderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
      };
      if (!res.ok || !data.ok || !data.orderNumber) {
        throw new Error(data.error || "order failed");
      }

      // Cash on delivery — order is already placed, nothing more to do.
      if (form.paymentMethod === "cod" || !data.razorpayOrderId) {
        setOrderNumber(data.orderNumber);
        setStep("success");
        clear();
        return;
      }

      // Online payment — open Razorpay checkout.
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !data.keyId) {
        setError(
          "Payment gateway load nahi hua — internet check karo ya Cash on Delivery try karo."
        );
        return;
      }

      const orderNumberForVerify = data.orderNumber;

      type RazorpayResponse = {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      };

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "Maa's Magic",
        description: `Order ${orderNumberForVerify}`,
        order_id: data.razorpayOrderId,
        prefill: {
          name: form.customerName.trim(),
          contact: form.phone.replace(/\s/g, ""),
        },
        theme: { color: "#ea580c" },
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch("/api/orders/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderNumber: orderNumberForVerify,
                ...response,
              }),
            });
            const verifyData = (await verifyRes.json()) as { ok: boolean };
            if (!verifyRes.ok || !verifyData.ok) {
              throw new Error("verify failed");
            }
            setOrderNumber(orderNumberForVerify);
            setStep("success");
            clear();
          } catch {
            setError(
              "Payment ho gaya lekin confirm karne mein dikkat aayi — humein call karo order number ke saath: " +
                orderNumberForVerify
            );
          } finally {
            setPlacing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setPlacing(false);
          },
        },
      };

      const RazorpayCtor = (
        window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }
      ).Razorpay;
      const rzp = new RazorpayCtor(options);
      rzp.open();
      return;
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "order failed"
          ? err.message
          : "Network hiccup ho gaya — ek baar aur try karo."
      );
    } finally {
      // For the online-payment path, `placing` is cleared by the Razorpay
      // handler/ondismiss callbacks instead, once the modal actually closes.
      if (form.paymentMethod !== "online") {
        setPlacing(false);
      }
    }
  }

  const inputCls =
    "w-full rounded-xl border border-ink-300/60 bg-cream-50 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-flame-400";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 z-[70] bg-ink-950/55 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-cream-100 shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-ink-900/10 px-6 py-5">
              <div>
                <p className="font-display text-2xl font-semibold">
                  {step === "cart" && "Aapka Dabba"}
                  {step === "checkout" && "Kahan bhejein?"}
                  {step === "success" && "Shukriya, baccha"}
                </p>
                <p className="font-hindi text-sm italic text-flame-600">
                  {step === "cart" && `${count} cheezein — maa ki yaad ke saath`}
                  {step === "checkout" && "hostel ya PG ka pata likh do"}
                  {step === "success" && "खाना कढ़ाही पर चढ़ गया है"}
                </p>
              </div>
              <button
                onClick={resetAndClose}
                aria-label="Close cart"
                className="rounded-full border border-ink-900/15 p-2 transition hover:rotate-90 hover:bg-cream-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* CART STEP */}
            {step === "cart" && (
              <>
                {items.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                    <div className="rounded-full bg-flame-100 p-6 text-flame-500">
                      <Soup size={40} strokeWidth={1.5} />
                    </div>
                    <p className="font-display text-xl font-medium">
                      Dabba khaali hai...
                    </p>
                    <p className="font-hindi italic text-ink-500">
                      bhookh lagi nahi kya, baccha?
                    </p>
                    <Link
                      href="/menu"
                      onClick={resetAndClose}
                      className="mt-2 rounded-full bg-flame-500 px-6 py-3 text-sm font-bold text-cream-50 shadow-flame transition hover:bg-flame-600"
                    >
                      Aaj ka khana dekho
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                      {items.map((item) => (
                        <motion.div
                          layout
                          key={item.dishId}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex gap-4 rounded-2xl border border-ink-900/10 bg-cream-50 p-3 shadow-card"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 shrink-0 rounded-xl object-cover"
                          />
                          <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate font-display text-[15px] font-semibold leading-tight">
                                  {item.name}
                                </p>
                                <p className="mt-0.5 truncate text-xs font-semibold text-flame-600">
                                  {item.aunty} ke haath se
                                </p>
                              </div>
                              <button
                                onClick={() => remove(item.dishId)}
                                aria-label="Remove"
                                className="rounded-full p-1.5 text-ink-400 transition hover:bg-flame-50 hover:text-flame-600"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-display text-[15px] font-bold">
                                {inr(item.price * item.qty)}
                              </span>
                              <div className="flex items-center gap-3 rounded-full border border-ink-900/15 bg-cream-100 px-2 py-1">
                                <button
                                  onClick={() => setQty(item.dishId, item.qty - 1)}
                                  aria-label="Less"
                                  className="text-ink-600 transition hover:text-flame-600"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-4 text-center text-sm font-bold">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => setQty(item.dishId, item.qty + 1)}
                                  aria-label="More"
                                  className="text-ink-600 transition hover:text-flame-600"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="border-t border-ink-900/10 bg-cream-50 px-6 py-5">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-ink-600">
                          <span>Khana</span>
                          <span>{inr(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-ink-600">
                          <span>Delivery</span>
                          <span>
                            {deliveryFee === 0 ? (
                              <span className="font-bold text-mehendi-500">FREE</span>
                            ) : (
                              inr(deliveryFee)
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between italic text-flame-600">
                          <span className="inline-flex items-center gap-1.5">
                            Maa ka pyaar <Heart size={12} fill="currentColor" />
                          </span>
                          <span className="font-bold">ALWAYS FREE</span>
                        </div>
                        <div className="dashed-line my-3" />
                        <div className="flex justify-between font-display text-lg font-bold">
                          <span>Total</span>
                          <span>{inr(total)}</span>
                        </div>
                      </div>
                      {subtotal < FREE_DELIVERY_ABOVE && (
                        <p className="mt-2 text-center text-xs text-ink-500">
                          {inr(FREE_DELIVERY_ABOVE - subtotal)} aur add karo — delivery
                          free ho jaayegi
                        </p>
                      )}
                      <button
                        onClick={() => setStep("checkout")}
                        className="group mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-flame-500 py-4 font-bold text-cream-50 shadow-flame transition hover:bg-flame-600"
                      >
                        Aunty ko order bhejo
                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </button>
                      <p className="mt-3 text-center text-[11px] text-ink-400">
                        Pay online (UPI / Card) ya Cash on Delivery — pyaar dono mein same.
                      </p>
                    </div>
                  </>
                )}
              </>
            )}

            {/* CHECKOUT STEP */}
            {step === "checkout" && (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  <button
                    onClick={() => setStep("cart")}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 transition hover:text-flame-600"
                  >
                    <ArrowLeft size={15} /> dabba wapas dekho
                  </button>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-500">
                      Aapka naam
                    </label>
                    <input
                      className={inputCls}
                      placeholder="जिस naam se maa bulaati hai"
                      value={form.customerName}
                      onChange={(e) =>
                        setForm({ ...form, customerName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-500">
                      Phone number
                    </label>
                    <input
                      className={inputCls}
                      placeholder="10-digit mobile"
                      inputMode="numeric"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/[^\d\s]/g, "").slice(0, 11),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-500">
                      Hostel / PG / Flat ka poora pata
                    </label>
                    <textarea
                      className={`${inputCls} min-h-20 resize-none`}
                      placeholder="Room no., hostel no., gate pe kaise aana hai..."
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-500">
                      Aunty ke liye note{" "}
                      <span className="font-normal normal-case text-ink-400">
                        (optional, par accha lagta hai)
                      </span>
                    </label>
                    <textarea
                      className={`${inputCls} min-h-16 resize-none`}
                      placeholder="kam teekha, ek extra roti, exam chal raha hai..."
                      value={form.noteForAunty}
                      onChange={(e) =>
                        setForm({ ...form, noteForAunty: e.target.value })
                      }
                    />
                  </div>
                  {error && (
                    <p className="rounded-xl bg-flame-50 px-4 py-3 text-sm font-semibold text-flame-700">
                      {error}
                    </p>
                  )}
                </div>
                <div className="border-t border-ink-900/10 bg-cream-50 px-6 py-5">
                  <div className="mb-3 flex justify-between font-display text-lg font-bold">
                    <span>Total</span>
                    <span>{inr(total)}</span>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: "online" })}
                      className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                        form.paymentMethod === "online"
                          ? "border-flame-500 bg-flame-50 text-flame-700"
                          : "border-ink-300/60 bg-cream-50 text-ink-500"
                      }`}
                    >
                      Pay Online
                      <div className="mt-0.5 text-[10px] font-normal normal-case text-ink-400">
                        UPI / Card / Netbanking
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: "cod" })}
                      className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                        form.paymentMethod === "cod"
                          ? "border-flame-500 bg-flame-50 text-flame-700"
                          : "border-ink-300/60 bg-cream-50 text-ink-500"
                      }`}
                    >
                      Cash on Delivery
                      <div className="mt-0.5 text-[10px] font-normal normal-case text-ink-400">
                        Pay when it arrives
                      </div>
                    </button>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={placing}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-flame-500 py-4 font-bold text-cream-50 shadow-flame transition hover:bg-flame-600 disabled:opacity-60"
                  >
                    {placing ? (
                      "Aunty ko awaaz lag rahi hai..."
                    ) : form.paymentMethod === "online" ? (
                      <>
                        {inr(total)} pay karo <ArrowRight size={18} />
                      </>
                    ) : (
                      <>
                        Order pakka karo <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* SUCCESS STEP */}
            {step === "success" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="rounded-full bg-mehendi-100 p-6 text-mehendi-500"
                >
                  <Flame size={44} strokeWidth={1.5} />
                </motion.div>
                <div>
                  <p className="font-display text-2xl font-bold">
                    Order aunty tak pahunch gaya
                  </p>
                  <p className="mt-1 font-mono text-sm font-bold tracking-widest text-flame-600">
                    {orderNumber}
                  </p>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-ink-600">
                  Kadhai pe khana chadh gaya hai. Aunty ne kaha —{" "}
                  <span className="font-hindi italic text-flame-600">
                    "बच्चे को गरम-गरम ही देना।"
                  </span>
                </p>
                <div className="flex items-center gap-2 rounded-full border border-ink-900/15 bg-cream-50 px-5 py-3 text-sm font-bold">
                  <Bike size={18} className="text-flame-500" />
                  30–45 min mein aapke gate pe
                </div>
                <button
                  onClick={resetAndClose}
                  className="mt-2 rounded-full bg-ink-900 px-8 py-3.5 font-bold text-cream-50 transition hover:bg-ink-800"
                >
                  Theek hai maa, intezaar karega
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
