"use client";

import { useState } from "react";
import { MOODS, Mood } from "@/lib/catalog";

export default function BespokeForm() {
  const [form, setForm] = useState({
    name: "", email: "", project: "", mood: "" as Mood | "",
    reference: "", duration: "", deadline: "", budget: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">🎬</div>
        <h3 className="text-white text-2xl font-light mb-3">Score Request Received</h3>
        <p className="text-white/40 max-w-sm mx-auto leading-relaxed">
          Noam will study your project and reach out within 48 hours with a creative brief and quote.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 px-6 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white/80 text-sm transition-colors"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {[
          { key: "name", label: "Director Name", type: "text" },
          { key: "email", label: "Email", type: "email" },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">{f.label}</label>
            <input
              required
              type={f.type}
              value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Film / Project Title</label>
        <input
          required
          type="text"
          value={form.project}
          onChange={(e) => setForm({ ...form, project: e.target.value })}
          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
          placeholder="Working title or description"
        />
      </div>

      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Primary Sonic Mood</label>
        <div className="grid grid-cols-3 gap-2">
          {MOODS.map((mood) => (
            <button
              key={mood.name}
              type="button"
              onClick={() => setForm({ ...form, mood: mood.name })}
              className="py-2.5 px-3 rounded-xl border text-xs font-medium transition-all duration-200 text-left"
              style={{
                borderColor: form.mood === mood.name ? `${mood.color}66` : "rgba(255,255,255,0.06)",
                background: form.mood === mood.name ? `${mood.color}15` : "rgba(255,255,255,0.02)",
                color: form.mood === mood.name ? mood.color : "rgba(255,255,255,0.5)",
              }}
            >
              {mood.icon} {mood.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { key: "duration", label: "Track Duration", placeholder: "e.g. 3:30" },
          { key: "deadline", label: "Delivery Deadline", placeholder: "e.g. 6 weeks" },
          { key: "budget", label: "Budget Range", placeholder: "e.g. $1,500–3,000" },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">{f.label}</label>
            <input
              type="text"
              value={form[f.key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Reference Tracks / Films</label>
        <input
          type="text"
          value={form.reference}
          onChange={(e) => setForm({ ...form, reference: e.target.value })}
          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
          placeholder="Films, composers, or tracks that inspire this project"
        />
      </div>

      <div>
        <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Scene Description & Notes</label>
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
          placeholder="Describe the scene, emotional arc, or any specific requirements..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl font-semibold text-sm text-black transition-all duration-300 hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #D4A853, #8B6A2E)" }}
      >
        Submit Bespoke Request
      </button>
    </form>
  );
}
