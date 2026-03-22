"use client";

import { useState } from "react";
import { MOODS, Mood } from "@/lib/catalog";

export default function BespokeForm({ dark = false }: { dark?: boolean }) {
  const [form, setForm] = useState({
    name: "", email: "", project: "", mood: "" as Mood | "",
    reference: "", duration: "", deadline: "", budget: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const bg    = dark ? "rgba(255,255,255,0.06)" : "#f4f4f4";
  const text  = dark ? "text-white"              : "text-black";
  const label = dark ? "text-white/40"           : "text-zinc-400";
  const ring  = dark ? "focus:ring-white/20"     : "focus:ring-black";

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <p className={`display text-6xl font-black mb-4 ${text}`} style={{ fontFamily: "var(--font-barlow-condensed)" }}>
          RECEIVED.
        </p>
        <p className={`text-sm ${dark ? "text-white/40" : "text-zinc-500"} leading-relaxed mb-8`} style={{ fontFamily: "var(--font-barlow)" }}>
          Noam will study your project and reach out within 48 hours.
        </p>
        <button onClick={() => setSubmitted(false)}
          className={`text-xs uppercase tracking-[0.2em] underline underline-offset-4 transition-colors ${dark ? "text-white/30 hover:text-white" : "text-zinc-400 hover:text-black"}`}
          style={{ fontFamily: "var(--font-barlow)" }}>
          Submit another
        </button>
      </div>
    );
  }

  const inputCls = `w-full rounded px-3 py-2.5 text-sm outline-none focus:ring-1 transition-all ${ring} ${text}`;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        {[
          { key: "name",  label: "Your name", type: "text" },
          { key: "email", label: "Email",     type: "email" },
        ].map((f) => (
          <div key={f.key}>
            <label className={`text-[10px] uppercase tracking-[0.2em] block mb-1.5 ${label}`} style={{ fontFamily: "var(--font-barlow)" }}>{f.label}</label>
            <input required type={f.type}
              value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className={inputCls} style={{ background: bg, fontFamily: "var(--font-barlow)" }} />
          </div>
        ))}
      </div>

      <div>
        <label className={`text-[10px] uppercase tracking-[0.2em] block mb-1.5 ${label}`} style={{ fontFamily: "var(--font-barlow)" }}>Film / project title</label>
        <input required type="text" value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
          className={inputCls} style={{ background: bg, fontFamily: "var(--font-barlow)" }}
          placeholder="Working title or description" />
      </div>

      <div>
        <label className={`text-[10px] uppercase tracking-[0.2em] block mb-2 ${label}`} style={{ fontFamily: "var(--font-barlow)" }}>Sonic mood</label>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((mood) => (
            <button key={mood.name} type="button"
              onClick={() => setForm({ ...form, mood: mood.name })}
              className="text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 font-medium transition-colors"
              style={{
                fontFamily: "var(--font-barlow)",
                background: form.mood === mood.name ? "#E04020" : bg,
                color: form.mood === mood.name ? "#fff" : dark ? "rgba(255,255,255,0.5)" : "#888",
              }}>
              {mood.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { key: "duration", label: "Duration",  placeholder: "e.g. 3:30" },
          { key: "deadline", label: "Deadline",  placeholder: "e.g. 6 weeks" },
          { key: "budget",   label: "Budget",    placeholder: "e.g. $2,000" },
        ].map((f) => (
          <div key={f.key}>
            <label className={`text-[10px] uppercase tracking-[0.2em] block mb-1.5 ${label}`} style={{ fontFamily: "var(--font-barlow)" }}>{f.label}</label>
            <input type="text" value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder} className={inputCls}
              style={{ background: bg, fontFamily: "var(--font-barlow)" }} />
          </div>
        ))}
      </div>

      <div>
        <label className={`text-[10px] uppercase tracking-[0.2em] block mb-1.5 ${label}`} style={{ fontFamily: "var(--font-barlow)" }}>Notes</label>
        <textarea rows={4} value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className={inputCls + " resize-none"}
          style={{ background: bg, fontFamily: "var(--font-barlow)" }}
          placeholder="Scene description, emotional arc, anything useful..." />
      </div>

      <button type="submit"
        className="w-full py-3.5 text-sm font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-3"
        style={{ background: "#E04020", color: "#fff", fontFamily: "var(--font-barlow)" }}>
        Submit Request
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  );
}
