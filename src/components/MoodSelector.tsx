"use client";

import { Mood, MOODS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  selected: Mood | null;
  onSelect: (mood: Mood | null) => void;
}

export default function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-white/30 text-sm tracking-[0.3em] uppercase mb-3">
          Find Your Sound By Feeling
        </p>
        <h2 className="text-center text-3xl text-white/90 mb-12 font-light">
          What does your scene need?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MOODS.map((mood) => {
            const isSelected = selected === mood.name;
            return (
              <button
                key={mood.name}
                onClick={() => onSelect(isSelected ? null : mood.name)}
                className={cn(
                  "relative group rounded-2xl p-6 text-left border transition-all duration-500 overflow-hidden",
                  isSelected
                    ? "border-white/20"
                    : "border-white/5 hover:border-white/10"
                )}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${mood.color}15, ${mood.color}05)`
                    : "rgba(255,255,255,0.02)",
                  boxShadow: isSelected ? `0 0 40px ${mood.color}15, inset 0 0 30px ${mood.color}05` : undefined,
                }}
              >
                {/* Active indicator */}
                {isSelected && (
                  <div
                    className="absolute inset-0 opacity-10 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${mood.color}, transparent 70%)` }}
                  />
                )}

                <span className="text-3xl mb-3 block">{mood.icon}</span>
                <h3
                  className="font-semibold text-sm mb-1 transition-colors duration-300"
                  style={{ color: isSelected ? mood.color : "rgba(255,255,255,0.7)" }}
                >
                  {mood.name}
                </h3>
                <p className="text-xs text-white/30 leading-relaxed">{mood.description}</p>

                {isSelected && (
                  <div
                    className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: mood.color }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
