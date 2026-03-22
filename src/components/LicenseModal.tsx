"use client";

import { useState } from "react";
import { Track } from "@/lib/catalog";
import { MOODS } from "@/lib/catalog";

interface LicenseModalProps {
  track: Track | null;
  onClose: () => void;
}

const TIERS = [
  { id: "indie", label: "Indie Film", price: "$299", desc: "Festival & limited theatrical. Up to $50k budget." },
  { id: "commercial", label: "Commercial", price: "$799", desc: "Broadcast & streaming. Unlimited budget." },
  { id: "exclusive", label: "Exclusive", price: "Custom", desc: "Full buyout. One film only. Includes custom edit." },
];

export default function LicenseModal({ track, onClose }: LicenseModalProps) {
  const [selected, setSelected] = useState("indie");
  const [step, setStep] = useState<"select" | "form" | "done">("select");
  const [form, setForm] = useState({ name: "", email: "", project: "", notes: "" });

  if (!track) return null;
  const mood = MOODS.find((m) => m.name === track.mood);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl"
        style={{ boxShadow: `0 0 80px ${mood?.color}20` }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
        >
          ×
        </button>

        {step === "select" && (
          <>
            <div className="mb-6">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">License</p>
              <h2 className="text-white text-xl font-semibold">{track.title}</h2>
              <p className="text-white/30 text-sm mt-1">{track.mood} · {track.duration} · {track.key}</p>
            </div>
            <div className="space-y-3 mb-6">
              {TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelected(tier.id)}
                  className="w-full text-left p-4 rounded-xl border transition-all duration-200"
                  style={{
                    borderColor: selected === tier.id ? `${mood?.color}66` : "rgba(255,255,255,0.06)",
                    background: selected === tier.id ? `${mood?.color}10` : "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/80 text-sm font-medium">{tier.label}</span>
                    <span className="font-bold text-sm" style={{ color: mood?.color }}>{tier.price}</span>
                  </div>
                  <p className="text-white/30 text-xs">{tier.desc}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep("form")}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{ background: mood?.color, color: "#000" }}
            >
              Continue →
            </button>
          </>
        )}

        {step === "form" && (
          <>
            <div className="mb-6">
              <button onClick={() => setStep("select")} className="text-white/30 text-xs hover:text-white/60 mb-4 block">← Back</button>
              <h2 className="text-white text-xl font-semibold">Your Details</h2>
            </div>
            <div className="space-y-3 mb-6">
              {[
                { key: "name", label: "Your Name", type: "text" },
                { key: "email", label: "Email", type: "email" },
                { key: "project", label: "Film / Project Title", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-white/40 mb-1 block">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-white/40 mb-1 block">Notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors resize-none"
                  placeholder="Scene description, usage notes..."
                />
              </div>
            </div>
            <button
              onClick={() => setStep("done")}
              className="w-full py-3 rounded-xl font-semibold text-sm"
              style={{ background: mood?.color, color: "#000" }}
            >
              Submit License Request
            </button>
          </>
        )}

        {step === "done" && (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-white text-xl font-semibold mb-2">Request Received</h2>
            <p className="text-white/40 text-sm leading-relaxed">
              Noam will review your request and reach out within 24 hours with your license agreement.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-3 rounded-xl font-semibold text-sm"
              style={{ background: mood?.color, color: "#000" }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
