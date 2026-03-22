"use client";

import { useState } from "react";
import { Track } from "@/lib/catalog";

const TIERS = [
  { id:"indie",      label:"Indie Film",      price:"$299",   desc:"Festival & limited theatrical. Up to $50k budget." },
  { id:"commercial", label:"Commercial",       price:"$799",   desc:"Broadcast & streaming. Unlimited budget." },
  { id:"exclusive",  label:"Exclusive Buyout", price:"Custom", desc:"One film only. Full ownership. Includes custom edit." },
];

export default function LicenseModal({ track, onClose }: { track:Track|null; onClose:()=>void }) {
  const [selected, setSelected] = useState("indie");
  const [step, setStep] = useState<"select"|"form"|"done">("select");
  const [form, setForm] = useState({ name:"", email:"", project:"", notes:"" });

  if (!track) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm overflow-hidden" style={{ background:"#111" }}>

        {/* Header */}
        <div className="px-7 pt-7 pb-5 flex items-start justify-between border-b border-white/8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1" style={{ fontFamily:"var(--font-barlow)" }}>Licensing</p>
            <h2 className="display text-2xl font-black text-white" style={{ fontFamily:"var(--font-barlow-condensed)" }}>{track.title}</h2>
            <p className="text-xs text-white/30 mt-0.5" style={{ fontFamily:"var(--font-barlow)" }}>{track.mood} · {track.duration}</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white text-xl leading-none mt-1 transition-colors">&times;</button>
        </div>

        {step==="select" && (
          <div className="px-7 py-6">
            <div className="space-y-2 mb-6">
              {TIERS.map((tier) => (
                <button key={tier.id} onClick={() => setSelected(tier.id)}
                  className="w-full text-left px-4 py-4 transition-colors"
                  style={{ background: selected===tier.id ? "#E04020" : "rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold uppercase text-white" style={{ fontFamily:"var(--font-barlow)" }}>{tier.label}</span>
                    <span className="display text-sm font-black text-white" style={{ fontFamily:"var(--font-barlow-condensed)" }}>{tier.price}</span>
                  </div>
                  <p className="text-xs text-white/50" style={{ fontFamily:"var(--font-barlow)" }}>{tier.desc}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setStep("form")}
              className="w-full py-3.5 text-sm font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2"
              style={{ background:"#E04020", color:"#fff", fontFamily:"var(--font-barlow)" }}>
              Continue
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          </div>
        )}

        {step==="form" && (
          <div className="px-7 py-6">
            <div className="space-y-4 mb-6">
              {[
                { key:"name",    label:"Your name",    type:"text" },
                { key:"email",   label:"Email",        type:"email" },
                { key:"project", label:"Project title", type:"text" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 block mb-1.5" style={{ fontFamily:"var(--font-barlow)" }}>{f.label}</label>
                  <input type={f.type} value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({...form,[f.key]:e.target.value})}
                    className="w-full px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-white/20"
                    style={{ background:"rgba(255,255,255,0.07)", fontFamily:"var(--font-barlow)" }} />
                </div>
              ))}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 block mb-1.5" style={{ fontFamily:"var(--font-barlow)" }}>Notes</label>
                <textarea rows={3} value={form.notes} onChange={(e) => setForm({...form,notes:e.target.value})}
                  className="w-full px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-white/20 resize-none"
                  style={{ background:"rgba(255,255,255,0.07)", fontFamily:"var(--font-barlow)" }} />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep("select")}
                className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors"
                style={{ fontFamily:"var(--font-barlow)" }}>Back</button>
              <button onClick={() => setStep("done")}
                className="flex-1 py-3 text-sm font-bold uppercase tracking-[0.2em]"
                style={{ background:"#E04020", color:"#fff", fontFamily:"var(--font-barlow)" }}>Submit</button>
            </div>
          </div>
        )}

        {step==="done" && (
          <div className="px-7 py-14 text-center">
            <p className="display text-5xl font-black text-white mb-3" style={{ fontFamily:"var(--font-barlow-condensed)" }}>DONE.</p>
            <p className="text-sm text-white/40 mb-8" style={{ fontFamily:"var(--font-barlow)" }}>Noam will be in touch within 24 hours.</p>
            <button onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ background:"#E04020", color:"#fff", fontFamily:"var(--font-barlow)" }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
