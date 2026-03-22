"use client";

import { Mood, MOODS } from "@/lib/catalog";

interface MoodSelectorProps {
  selected: Mood | null;
  onSelect: (mood: Mood | null) => void;
}

export default function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <section className="border-b border-black">
      {/* Section label */}
      <div className="px-6 py-4 border-b border-black flex items-center justify-between">
        <span
          className="text-[10px] uppercase tracking-[0.25em] font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Filter by Mood
        </span>
        {selected && (
          <button
            onClick={() => onSelect(null)}
            className="text-[10px] uppercase tracking-[0.2em] underline underline-offset-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Mood buttons — horizontal scroll on mobile */}
      <div className="flex overflow-x-auto">
        {MOODS.map((mood, i) => {
          const isSelected = selected === mood.name;
          const isLast = i === MOODS.length - 1;
          return (
            <button
              key={mood.name}
              onClick={() => onSelect(isSelected ? null : mood.name)}
              className={`group flex-1 min-w-[160px] px-6 py-8 text-left transition-colors duration-150 ${
                !isLast ? "border-r border-black" : ""
              } ${isSelected ? "bg-black text-white" : "bg-white text-black hover:bg-zinc-50"}`}
            >
              <div className="text-2xl mb-4">{mood.icon}</div>
              <div
                className="text-sm font-bold uppercase tracking-wider mb-2 leading-tight"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {mood.name}
              </div>
              <div className="text-[11px] leading-relaxed opacity-60">{mood.description}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
