"use client";

import { useState, useRef } from "react";
import { Track, MOODS } from "@/lib/catalog";
import { formatPlays } from "@/lib/utils";
import Waveform from "./Waveform";

interface TrackCardProps {
  track: Track;
  onLicense?: (track: Track) => void;
  onRequest?: (track: Track) => void;
}

export default function TrackCard({ track, onLicense, onRequest }: TrackCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mood = MOODS.find((m) => m.name === track.mood);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 1) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return p + 0.003;
        });
      }, 50);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white hover:bg-zinc-50 transition-colors duration-200">
      {/* Mood + duration */}
      <div className="flex items-center justify-between px-6 pt-6 pb-3">
        <span
          className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {mood?.name}
        </span>
        <span className="text-[11px] text-zinc-300" style={{ fontFamily: "var(--font-inter)" }}>
          {track.duration}
        </span>
      </div>

      {/* Title */}
      <div className="px-6 pb-4">
        <h3
          className="text-[26px] font-bold leading-tight italic"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {track.title}
        </h3>
        <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
          {track.description}
        </p>
      </div>

      {/* Waveform */}
      <div className="px-6 py-3 flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-8 h-8 border border-zinc-300 hover:border-black flex items-center justify-center shrink-0 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <rect x="1" y="0" width="3" height="10" />
              <rect x="6" y="0" width="3" height="10" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" style={{ marginLeft: 1 }}>
              <path d="M1 0L10 5L1 10V0Z" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <Waveform data={track.waveform} color="#111" isPlaying={isPlaying} progress={progress} height={28} />
        </div>
      </div>

      {/* Meta */}
      <div
        className="px-6 py-3 flex items-center gap-5 text-[11px] text-zinc-400 border-t border-zinc-100"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span className="text-black font-semibold">{track.bpm} BPM</span>
        <span>{track.key}</span>
        <span className="ml-auto">{formatPlays(track.plays)} plays</span>
      </div>

      {/* Tags */}
      <div className="px-6 py-3 flex flex-wrap gap-1.5">
        {track.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-wider text-zinc-400 border border-zinc-200 px-2 py-0.5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-auto flex border-t border-zinc-200">
        <button
          onClick={() => onLicense?.(track)}
          className="flex-1 py-3.5 text-[10px] uppercase tracking-[0.25em] font-bold bg-black text-white hover:bg-zinc-900 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          License
        </button>
        <button
          onClick={() => onRequest?.(track)}
          className="flex-1 py-3.5 text-[10px] uppercase tracking-[0.25em] font-medium text-zinc-500 hover:text-black border-l border-zinc-200 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Request Custom
        </button>
      </div>
    </div>
  );
}
