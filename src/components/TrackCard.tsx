"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
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
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 1) { setIsPlaying(false); if (intervalRef.current) clearInterval(intervalRef.current); return 0; }
          return p + 0.003;
        });
      }, 50);
    }
  };

  return (
    <motion.div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Visual block — waveform as "image" */}
      <motion.div
        className="relative w-full aspect-[4/3] flex flex-col justify-end p-6 overflow-hidden"
        animate={{ background: hovered ? "#1a1a1a" : "#111" }}
        transition={{ duration: 0.2 }}
      >
        {/* BPM + Key top-right */}
        <div className="absolute top-5 right-5 text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "var(--font-barlow)" }}>
            {track.bpm} BPM
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "var(--font-barlow)" }}>
            {track.key}
          </p>
        </div>

        {/* Play button top-left */}
        <button
          onClick={togglePlay}
          className="absolute top-5 left-5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: isPlaying ? "#E04020" : "rgba(255,255,255,0.1)" }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="9" height="9" viewBox="0 0 9 9" fill="white">
              <rect x="0" y="0" width="3" height="9"/><rect x="6" y="0" width="3" height="9"/>
            </svg>
          ) : (
            <svg width="9" height="9" viewBox="0 0 9 9" fill="white" style={{ marginLeft: 1 }}>
              <path d="M0 0L9 4.5L0 9Z"/>
            </svg>
          )}
        </button>

        {/* Waveform */}
        <div className="w-full">
          <Waveform data={track.waveform} color="#E04020" isPlaying={isPlaying} progress={progress} height={56} />
        </div>

        {/* Duration */}
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-3" style={{ fontFamily: "var(--font-barlow)" }}>
          {track.duration}
        </p>
      </motion.div>

      {/* Info block below image */}
      <div className="pt-4 pb-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-semibold text-white leading-snug mb-1 group-hover:text-white/80 transition-colors"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              {track.title}
            </h3>
          </div>
          {/* Orange arrow button */}
          <motion.button
            onClick={() => onLicense?.(track)}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#E04020" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.15 }}
            aria-label="License track"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>

        {/* Category + plays row */}
        <div className="flex items-center justify-between mt-1">
          <div className="w-full h-px bg-white/10 mb-3" />
        </div>
        <div className="flex items-center justify-between">
          <span
            className="text-xs text-white/40 uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            {track.mood}
          </span>
          <span
            className="text-xs text-white/30 uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            {formatPlays(track.plays)} plays
          </span>
        </div>

        {/* Request custom */}
        <motion.button
          onClick={() => onRequest?.(track)}
          className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/25"
          style={{ fontFamily: "var(--font-barlow)" }}
          whileHover={{ color: "rgba(255,255,255,0.6)" }}
          transition={{ duration: 0.15 }}
        >
          Request custom
        </motion.button>
      </div>
    </motion.div>
  );
}
