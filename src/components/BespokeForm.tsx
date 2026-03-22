"use client";

import { useState } from "react";
import { MOODS, Mood } from "@/lib/catalog";

export default function BespokeForm() {
  const [form, setForm] = useState({
    name: "", email: "", project: "", mood: "" as Mood | "",
    reference: "", duration: "", deadline: "", budget: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="py-20 text-center">
        <p
          className="text-5xl font-bold italic mb-5"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Received.
        </p>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">
          Noam will study your project and reach out within 48 hours with a creative brief and quote.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-[10px] uppercase tracking-[0.25em] text-zinc-400 hover:text-black underline underline-offset-4 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Submit another
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full border-b border-zinc-200 focus:border-black pb-2 text-sm outline-none bg-transparent transition-colors placeholder-zinc-300";
  const labelClass =
    "text-[10px] uppercase tracking-[0.25em] text-zinc-400 block mb-2";

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">

      <div className="grid grid-cols-2 gap-8">
        {[
          { key: "name",  label: "Director Name", type: "text" },
          { key: "email", label: "Email",          type: "email" },
        ].map((f) => (
          <div key={f.key}>
            <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>{f.label}</label>
            <input
              required type={f.type}
              value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <div>
        <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Film / Project Title</label>
        <input
          required type="text"
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
          className={inputClass}
          placeholder="Working title or description"
        />
      </div>

      <div>
        <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Primary Sonic Mood</label>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {MOODS.map((mood) => (
            <button
              key={mood.name}
              type="button"
              onClick={() => setForm({ ...form, mood: mood.name })}
              className={`py-2.5 px-3 text-[10px] uppercase tracking-wider border font-semibold transition-colors text-left ${
                form.mood === mood.name
                  ? "bg-black text-white border-black"
                  : "border-zinc-200 hover:border-zinc-400 text-zinc-500"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {mood.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {[
          { key: "duration", label: "Duration",  placeholder: "e.g. 3:30" },
          { key: "deadline", label: "Delivery",  placeholder: "e.g. 6 weeks" },
          { key: "budget",   label: "Budget",    placeholder: "e.g. $2,000" },
        ].map((f) => (
          <div key={f.key}>
            <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>{f.label}</label>
            <input
              type="text"
              value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <div>
        <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Reference Films / Composers</label>
        <input
          type="text"
          value={form.reference}
          onChange={(e) => setForm({ ...form, reference: e.target.value })}
          className={inputClass}
          placeholder="Works that inspire this project"
        />
      </div>

      <div>
        <label className={labelClass} style={{ fontFamily: "var(--font-inter)" }}>Scene Description & Notes</label>
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full border border-zinc-200 focus:border-black p-3 text-sm outline-none resize-none bg-white transition-colors placeholder-zinc-300"
          placeholder="Emotional arc, specific requirements, scene context..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-black text-white text-[10px] uppercase tracking-[0.35em] font-bold hover:bg-zinc-900 transition-colors"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Submit Request
      </button>
    </form>
  );
}
