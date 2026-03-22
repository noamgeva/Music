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
    <div className="border border-black group transition-colors hover:bg-zinc-50">
      {/* Top: mood tag + duration */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-black/10">
        <span
          className="text-[10px] uppercase tracking-[0.25em] font-semibold"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {mood?.icon} {track.mood}
        </span>
        <span className="text-[11px] text-zinc-400">{track.duration}</span>
      </div>

      {/* Title */}
      <div className="px-5 pt-4 pb-2">
        <h3
          className="text-2xl font-bold leading-tight mb-1"
          style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
        >
          {track.title}
        </h3>
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{track.description}</p>
      </div>

      {/* Waveform + play */}
      <div className="px-5 py-3 flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full border border-black flex items-center justify-center shrink-0 hover:bg-black hover:text-white transition-colors"
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="1" width="3" height="10" rx="0.5"/>
              <rect x="7" y="1" width="3" height="10" rx="0.5"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: 1 }}>
              <path d="M2 1.5L11 6L2 10.5V1.5Z"/>
            </svg>
          )}
        </button>
        <div className="flex-1">
          <Waveform data={track.waveform} color="#0a0a0a" isPlaying={isPlaying} progress={progress} height={32} />
        </div>
      </div>

      {/* Meta row */}
      <div
        className="px-5 py-2 flex items-center gap-4 text-[11px] text-zinc-400 border-t border-black/10"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span className="font-medium text-black">{track.bpm} BPM</span>
        <span>{track.key}</span>
        <span className="ml-auto">{formatPlays(track.plays)} plays</span>
        <span className="text-green-700 font-medium">{track.licensed}× licensed</span>
      </div>

      {/* Tags */}
      <div className="px-5 py-3 flex flex-wrap gap-1.5">
        {track.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-wider px-2.5 py-1 border border-black/15 text-zinc-500"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex border-t border-black">
        <button
          onClick={() => onLicense?.(track)}
          className="flex-1 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold bg-black text-white hover:bg-zinc-800 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          License
        </button>
        <button
          onClick={() => onRequest?.(track)}
          className="flex-1 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium border-l border-white/20 text-white/80 hover:bg-zinc-700 transition-colors"
          style={{ fontFamily: "var(--font-inter)", background: "#1a1a1a" }}
        >
          Request Custom
        </button>
      </div>
    </div>
  );
}
