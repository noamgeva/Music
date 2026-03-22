"use client";

import { Mood, MOODS } from "@/lib/catalog";

interface MoodSelectorProps {
  selected: Mood | null;
  onSelect: (mood: Mood | null) => void;
}

export default function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <section className="border-b border-zinc-200">
      <div className="px-8 py-3 border-b border-zinc-200 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400" style={{ fontFamily: "var(--font-inter)" }}>
          Filter by mood
        </span>
        {selected && (
          <button
            onClick={() => onSelect(null)}
            className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex overflow-x-auto">
        {MOODS.map((mood, i) => {
          const isSelected = selected === mood.name;
          const isLast = i === MOODS.length - 1;
          return (
            <button
              key={mood.name}
              onClick={() => onSelect(isSelected ? null : mood.name)}
              className={`flex-1 min-w-[180px] px-7 py-7 text-left transition-colors duration-150 ${
                !isLast ? "border-r border-zinc-200" : ""
              } ${isSelected ? "bg-black text-white" : "bg-white text-black hover:bg-zinc-50"}`}
            >
              <div
                className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {mood.name}
              </div>
              <div className={`text-xs leading-relaxed ${isSelected ? "text-white/60" : "text-zinc-400"}`}>
                {mood.description}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
