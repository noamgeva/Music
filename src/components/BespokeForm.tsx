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
      <div className="border border-black p-12 text-center">
        <div className="text-5xl mb-6">✓</div>
        <h3
          className="text-3xl font-bold italic mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Score Request Received
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
          Noam will study your project and reach out within 48 hours with a creative brief and quote.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 px-8 py-3 border border-black text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="border border-black"
    >
      {/* Fields grid */}
      <div className="divide-y divide-zinc-100">
        <div className="grid grid-cols-2 divide-x divide-zinc-100">
          {[
            { key: "name", label: "Director Name", type: "text" },
            { key: "email", label: "Email", type: "email" },
          ].map((f) => (
            <div key={f.key} className="p-6">
              <label
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-2 block"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {f.label}
              </label>
              <input
                required
                type={f.type}
                value={form[f.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full text-sm border-b border-zinc-200 focus:border-black pb-1.5 outline-none bg-transparent transition-colors"
              />
            </div>
          ))}
        </div>

        <div className="p-6">
          <label
            className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-2 block"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Film / Project Title
          </label>
          <input
            required
            type="text"
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            className="w-full text-sm border-b border-zinc-200 focus:border-black pb-1.5 outline-none bg-transparent transition-colors"
            placeholder="Working title or description"
          />
        </div>

        {/* Mood selector */}
        <div className="p-6">
          <label
            className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4 block"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Primary Sonic Mood
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MOODS.map((mood) => (
              <button
                key={mood.name}
                type="button"
                onClick={() => setForm({ ...form, mood: mood.name })}
                className={`py-2.5 px-3 text-xs font-medium border transition-colors text-left ${
                  form.mood === mood.name
                    ? "bg-black text-white border-black"
                    : "border-zinc-200 hover:border-black text-zinc-600"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {mood.icon} {mood.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-zinc-100">
          {[
            { key: "duration", label: "Duration", placeholder: "e.g. 3:30" },
            { key: "deadline", label: "Delivery", placeholder: "e.g. 6 weeks" },
            { key: "budget", label: "Budget", placeholder: "e.g. $2,000" },
          ].map((f) => (
            <div key={f.key} className="p-6">
              <label
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-2 block"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {f.label}
              </label>
              <input
                type="text"
                value={form[f.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full text-sm border-b border-zinc-200 focus:border-black pb-1.5 outline-none bg-transparent transition-colors placeholder-zinc-300"
              />
            </div>
          ))}
        </div>

        <div className="p-6">
          <label
            className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-2 block"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Reference Films / Composers
          </label>
          <input
            type="text"
            value={form.reference}
            onChange={(e) => setForm({ ...form, reference: e.target.value })}
            className="w-full text-sm border-b border-zinc-200 focus:border-black pb-1.5 outline-none bg-transparent transition-colors"
            placeholder="Works that inspire this project"
          />
        </div>

        <div className="p-6">
          <label
            className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-2 block"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Scene Description & Notes
          </label>
          <textarea
            rows={4}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full text-sm border border-zinc-200 focus:border-black p-3 outline-none resize-none transition-colors placeholder-zinc-300"
            placeholder="Emotional arc, specific requirements, scene context..."
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-5 bg-black text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-zinc-800 transition-colors border-t border-black"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Submit Bespoke Request →
      </button>
    </form>
  );
}
