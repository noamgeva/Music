"use client";

import { useState, useRef } from "react";
import { Track } from "@/lib/catalog";
import { MOODS } from "@/lib/catalog";
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
      // Simulate playback progress
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
    <div
      className="group relative rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden p-5 cursor-default"
      style={{ boxShadow: isPlaying ? `0 0 30px ${mood?.color}22` : undefined }}
    >
      {/* Mood accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${mood?.color}88, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-base leading-snug">{track.title}</h3>
          <span
            className="text-xs mt-1 inline-block px-2 py-0.5 rounded-full border"
            style={{ color: mood?.color, borderColor: `${mood?.color}44`, background: `${mood?.color}11` }}
          >
            {mood?.icon} {track.mood}
          </span>
        </div>
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-white/30 transition-all duration-200 shrink-0 ml-3"
          style={{ background: isPlaying ? mood?.color : "rgba(255,255,255,0.05)" }}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="4" height="12" rx="1"/>
              <rect x="8" y="1" width="4" height="12" rx="1"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" style={{ marginLeft: 2 }}>
              <path d="M3 1.5L13 7L3 12.5V1.5Z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Waveform */}
      <div className="mb-3">
        <Waveform data={track.waveform} color={mood?.color} isPlaying={isPlaying} progress={progress} height={36} />
      </div>

      {/* Description */}
      <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">{track.description}</p>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-xs text-white/30 mb-4">
        <span>{track.duration}</span>
        <span>{track.bpm} BPM</span>
        <span>{track.key}</span>
        <span className="ml-auto">{formatPlays(track.plays)} plays</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {track.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onLicense?.(track)}
          className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border"
          style={{
            background: `${mood?.color}22`,
            borderColor: `${mood?.color}44`,
            color: mood?.color,
          }}
        >
          License Track
        </button>
        <button
          onClick={() => onRequest?.(track)}
          className="flex-1 py-2 rounded-xl text-xs font-semibold border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all duration-200"
        >
          Request Custom
        </button>
      </div>
    </div>
  );
}
