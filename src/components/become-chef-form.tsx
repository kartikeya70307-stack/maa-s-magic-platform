"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

export function BecomeChefForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    specialty: "",
    story: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const inputCls =
    "w-full rounded-xl border border-ink-300/60 bg-cream-100 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-flame-400";

  async function submit() {
    setError("");
    if (form.name.trim().length < 2) return setError("Naam toh batayiye.");
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      return setError("10-digit phone number chahiye — baat karni hai.");
    if (form.city.trim().length < 2) return setError("Sheher ka naam likhiye.");
    if (form.specialty.trim().length < 3)
      return setError("Aapki signature dish kya hai? Wohi toh jaanna hai.");
    setSubmitting(true);
    try {
      const res = await fetch("/api/chef-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.replace(/\s/g, ""),
          city: form.city.trim(),
          specialty: form.specialty.trim(),
          story: form.story.trim(),
        }),
      });
      const data = (await res.json()) as { ok: boolean };
      if (!res.ok || !data.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Kuch gadbad ho gayi — phir se try kariye.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full flex-col items-center justify-center rounded-[28px] border border-mehendi-400/50 bg-mehendi-100/60 p-10 text-center"
      >
        <span className="rounded-full bg-cream-50 p-5 text-flame-500 shadow-card">
          <Heart size={36} fill="currentColor" />
        </span>
        <p className="mt-5 font-display text-2xl font-black">
          Aapki kahani hum tak pahunch gayi
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-600">
          48 ghante ke andar humari team call karegi — chai ke saath, dheere se,
          aapki rasoi ki baat karne. Shukriya,{" "}
          <span className="font-bold">{form.name}</span>.
        </p>
        <p className="mt-4 font-hindi text-base italic text-flame-600">
          &ldquo;हर रसोई में एक कहानी होती है&rdquo;
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-[28px] border border-ink-900/10 bg-cream-50 p-6 shadow-warm sm:p-8">
      <p className="font-display text-2xl font-black">Home chef ki entry-form</p>
      <p className="mt-1 text-sm text-ink-500">
        2 minute lagenge. Baaki ka safar hum saath chalenge.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-ink-500">
              Aapka naam
            </label>
            <input
              className={inputCls}
              placeholder="जैसे मोहल्ला पुकारता है"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-ink-500">
              Phone
            </label>
            <input
              className={inputCls}
              inputMode="numeric"
              placeholder="10-digit mobile"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value.replace(/[^\d\s]/g, "").slice(0, 11),
                })
              }
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-ink-500">
              Sheher
            </label>
            <input
              className={inputCls}
              placeholder="Delhi, Pune, Jaipur..."
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-ink-500">
              Signature dish
            </label>
            <input
              className={inputCls}
              placeholder="Aap sabse best kya banati hain?"
              value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-ink-500">
            Aapki kahani{" "}
            <span className="font-normal normal-case text-ink-400">(optional)</span>
          </label>
          <textarea
            className={`${inputCls} min-h-24 resize-none`}
            placeholder="Rasoi se aapka rishta kab se hai? Kiska khana sabse miss karte hain log aapka?"
            value={form.story}
            onChange={(e) => setForm({ ...form, story: e.target.value })}
          />
        </div>
        {error && (
          <p className="rounded-xl bg-flame-50 px-4 py-3 text-sm font-semibold text-flame-700">
            {error}
          </p>
        )}
        <button
          onClick={submit}
          disabled={submitting}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-flame-500 py-4 font-bold text-cream-50 shadow-flame transition hover:bg-flame-600 disabled:opacity-60"
        >
          {submitting ? (
            "Bhej rahe hain..."
          ) : (
            <>
              Kahani bhejo <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-ink-400">
          Hamari team har application khud padhti hai — algorithm nahi, insaan.
        </p>
      </div>
    </div>
  );
}
