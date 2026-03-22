"use client";

import { useState } from "react";
import { Track } from "@/lib/catalog";

interface LicenseModalProps {
  track: Track | null;
  onClose: () => void;
}

const TIERS = [
  { id: "indie",      label: "Indie Film",      price: "$299",   desc: "Festival & limited theatrical. Up to $50k budget." },
  { id: "commercial", label: "Commercial",       price: "$799",   desc: "Broadcast & streaming. Unlimited budget." },
  { id: "exclusive",  label: "Exclusive Buyout", price: "Custom", desc: "One film only. Full ownership. Includes custom edit." },
];

export default function LicenseModal({ track, onClose }: LicenseModalProps) {
  const [selected, setSelected] = useState("indie");
  const [step, setStep] = useState<"select" | "form" | "done">("select");
  const [form, setForm] = useState({ name: "", email: "", project: "", notes: "" });

  if (!track) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white border border-zinc-200 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-zinc-100">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-1" style={{ fontFamily: "var(--font-inter)" }}>
              License Track
            </p>
            <h2 className="text-xl font-bold italic" style={{ fontFamily: "var(--font-playfair)" }}>
              {track.title}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
              {track.mood} &middot; {track.duration} &middot; {track.key}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-300 hover:text-black text-xl leading-none transition-colors ml-4"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {step === "select" && (
          <>
            <div className="divide-y divide-zinc-100">
              {TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelected(tier.id)}
                  className={`w-full text-left px-7 py-5 flex items-center justify-between transition-colors ${
                    selected === tier.id ? "bg-black text-white" : "hover:bg-zinc-50"
                  }`}
                >
                  <div>
                    <div
                      className="text-xs font-semibold uppercase tracking-[0.2em] mb-1"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {tier.label}
                    </div>
                    <div className={`text-xs ${selected === tier.id ? "text-white/50" : "text-zinc-400"}`}>
                      {tier.desc}
                    </div>
                  </div>
                  <div
                    className="text-lg font-bold ml-6 shrink-0"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {tier.price}
                  </div>
                </button>
              ))}
            </div>
            <div className="px-7 py-5 border-t border-zinc-100">
              <button
                onClick={() => setStep("form")}
                className="w-full py-3 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-zinc-900 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Continue
              </button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <div className="px-7 pt-6 pb-4 space-y-5">
              <button
                onClick={() => setStep("select")}
                className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Back
              </button>
              {[
                { key: "name",    label: "Director Name",       type: "text" },
                { key: "email",   label: "Email Address",       type: "email" },
                { key: "project", label: "Film / Project Title", type: "text" },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-1.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border-b border-zinc-200 focus:border-black pb-2 text-sm outline-none transition-colors bg-white"
                  />
                </div>
              ))}
              <div>
                <label
                  className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full border-b border-zinc-200 focus:border-black pb-2 text-sm outline-none resize-none bg-white transition-colors"
                />
              </div>
            </div>
            <div className="px-7 py-5 border-t border-zinc-100">
              <button
                onClick={() => setStep("done")}
                className="w-full py-3 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-zinc-900 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Submit Request
              </button>
            </div>
          </>
        )}

        {step === "done" && (
          <div className="px-7 py-14 text-center">
            <p
              className="text-4xl font-bold italic mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Received.
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Noam will review and reach out within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-8 py-2.5 border border-zinc-200 hover:border-black text-[10px] uppercase tracking-[0.25em] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
