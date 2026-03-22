"use client";

import { useState } from "react";
import { Track } from "@/lib/catalog";

interface LicenseModalProps {
  track: Track | null;
  onClose: () => void;
}

const TIERS = [
  { id: "indie", label: "Indie Film", price: "$299", desc: "Festival & limited theatrical. Up to $50k budget." },
  { id: "commercial", label: "Commercial", price: "$799", desc: "Broadcast & streaming. Unlimited budget." },
  { id: "exclusive", label: "Exclusive Buyout", price: "Custom", desc: "One film only. Full ownership. Includes custom edit." },
];

export default function LicenseModal({ track, onClose }: LicenseModalProps) {
  const [selected, setSelected] = useState("indie");
  const [step, setStep] = useState<"select" | "form" | "done">("select");
  const [form, setForm] = useState({ name: "", email: "", project: "", notes: "" });

  if (!track) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white border border-black shadow-2xl">
        {/* Header */}
        <div className="border-b border-black px-6 py-4 flex items-center justify-between">
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-semibold"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            License Track
          </span>
          <button onClick={onClose} className="text-lg leading-none text-zinc-400 hover:text-black transition-colors">×</button>
        </div>

        <div className="px-6 py-4 border-b border-zinc-100">
          <h2
            className="text-2xl font-bold italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {track.title}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">{track.mood} · {track.duration} · {track.key}</p>
        </div>

        {step === "select" && (
          <>
            <div className="divide-y divide-zinc-100">
              {TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelected(tier.id)}
                  className={`w-full text-left px-6 py-4 flex items-center justify-between transition-colors ${
                    selected === tier.id ? "bg-black text-white" : "hover:bg-zinc-50"
                  }`}
                >
                  <div>
                    <div
                      className="text-sm font-bold uppercase tracking-wider mb-0.5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {tier.label}
                    </div>
                    <div className={`text-xs ${selected === tier.id ? "text-white/60" : "text-zinc-400"}`}>{tier.desc}</div>
                  </div>
                  <div
                    className={`text-lg font-bold ml-4 shrink-0 ${selected === tier.id ? "text-white" : "text-black"}`}
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {tier.price}
                  </div>
                </button>
              ))}
            </div>
            <div className="px-6 py-5 border-t border-black">
              <button
                onClick={() => setStep("form")}
                className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-zinc-800 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Continue →
              </button>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <div className="px-6 pt-5 pb-4 space-y-4">
              <button
                onClick={() => setStep("select")}
                className="text-xs text-zinc-400 hover:text-black transition-colors uppercase tracking-wider"
              >
                ← Back
              </button>
              {[
                { key: "name", label: "Director Name", type: "text" },
                { key: "email", label: "Email Address", type: "email" },
                { key: "project", label: "Film / Project Title", type: "text" },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-1 block"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-zinc-200 focus:border-black px-4 py-2.5 text-sm outline-none transition-colors"
                  />
                </div>
              ))}
              <div>
                <label
                  className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-1 block"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Notes
                </label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full border border-zinc-200 focus:border-black px-4 py-2.5 text-sm outline-none resize-none transition-colors"
                />
              </div>
            </div>
            <div className="px-6 py-5 border-t border-black">
              <button
                onClick={() => setStep("done")}
                className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-zinc-800 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Submit Request
              </button>
            </div>
          </>
        )}

        {step === "done" && (
          <div className="px-6 py-12 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h3
              className="text-2xl font-bold italic mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Request Received
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Noam will review and reach out within 24 hours with your license agreement.
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 border border-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-black hover:text-white transition-colors"
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
