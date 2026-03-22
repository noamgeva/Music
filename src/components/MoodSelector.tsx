"use client";

import { Mood, MOODS } from "@/lib/catalog";

interface MoodSelectorProps {
  selected: Mood | null;
  onSelect: (mood: Mood | null) => void;
  dark?: boolean;
}

export default function MoodSelector({ selected, onSelect, dark = false }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {MOODS.map((mood) => {
        const isSelected = selected === mood.name;
        return (
          <button
            key={mood.name}
            onClick={() => onSelect(isSelected ? null : mood.name)}
            className="text-xs px-4 py-2 transition-all duration-200 uppercase tracking-[0.15em] font-medium"
            style={{
              fontFamily: "var(--font-barlow)",
              background: isSelected ? "#fff" : dark ? "rgba(255,255,255,0.08)" : "#f4f4f4",
              color: isSelected ? "#111" : dark ? "rgba(255,255,255,0.5)" : "#888",
            }}
          >
            {mood.name}
          </button>
        );
      })}
      {selected && (
        <button
          onClick={() => onSelect(null)}
          className="text-xs uppercase tracking-[0.15em] transition-colors ml-1"
          style={{ fontFamily: "var(--font-barlow)", color: dark ? "rgba(255,255,255,0.3)" : "#aaa" }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
