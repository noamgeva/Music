"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Track } from "@/lib/catalog";
import { formatPlays } from "@/lib/utils";
import { getAudioBlob } from "@/lib/trackStore";
import Waveform from "./Waveform";

interface TrackCardProps {
  track: Track;
  onLicense?: (track: Track) => void;
  onRequest?: (track: Track) => void;
}

export default function TrackCard({ track, onLicense, onRequest }: TrackCardProps) {
  const [isPlaying, setIsPlaying]   = useState(false);
  const [progress, setProgress]     = useState(0);
  const [hovered, setHovered]       = useState(false);
  const [hasAudio, setHasAudio]     = useState<boolean | null>(null); // null = not checked yet
  const [noAudioMsg, setNoAudioMsg] = useState(false);

  const audioRef   = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  /* Check if audio exists for this track (quick metadata lookup) */
  useEffect(() => {
    let cancelled = false;
    getAudioBlob(track.id)
      .then((blob) => { if (!cancelled) setHasAudio(!!blob); })
      .catch(() => { if (!cancelled) setHasAudio(false); });
    return () => { cancelled = true; };
  }, [track.id]);

  /* Cleanup audio on unmount or track change */
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
      audioRef.current = null;
    };
  }, [track.id]);

  const togglePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();

    /* Pause */
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    /* Build audio element on first play */
    if (!audioRef.current) {
      const blob = await getAudioBlob(track.id);
      if (!blob) {
        /* No audio stored — brief flash message */
        setNoAudioMsg(true);
        setTimeout(() => setNoAudioMsg(false), 2000);
        return;
      }
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      const audio       = new Audio(url);
      audioRef.current  = audio;

      audio.addEventListener("timeupdate", () => {
        if (audio.duration > 0) setProgress(audio.currentTime / audio.duration);
      });
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
      });
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch { /* autoplay blocked */ }
  };

  return (
    <motion.div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Visual block */}
      <motion.div
        className="relative w-full aspect-[4/3] flex flex-col justify-end p-6 overflow-hidden"
        animate={{ background: hovered ? "#1a1a1a" : "#111" }}
        transition={{ duration: 0.2 }}
      >
        {/* BPM + Key */}
        <div className="absolute top-5 right-5 text-right">
          {track.bpm > 0 && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30"
              style={{ fontFamily: "var(--font-barlow)" }}>{track.bpm} BPM</p>
          )}
          {track.key && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30"
              style={{ fontFamily: "var(--font-barlow)" }}>{track.key}</p>
          )}
        </div>

        {/* Play button */}
        <motion.button
          onClick={togglePlay}
          className="absolute top-5 left-5 w-9 h-9 rounded-full flex items-center justify-center"
          animate={{
            background: isPlaying
              ? "#E04020"
              : hasAudio === false
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.1)",
          }}
          whileHover={{ scale: hasAudio === false ? 1 : 1.1 }}
          whileTap={{ scale: hasAudio === false ? 1 : 0.92 }}
          transition={{ duration: 0.15 }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="9" height="9" viewBox="0 0 9 9" fill="white">
              <rect x="0" y="0" width="3" height="9"/>
              <rect x="6" y="0" width="3" height="9"/>
            </svg>
          ) : (
            <svg width="9" height="9" viewBox="0 0 9 9"
              fill={hasAudio === false ? "rgba(255,255,255,0.2)" : "white"}
              style={{ marginLeft: 1 }}>
              <path d="M0 0L9 4.5L0 9Z"/>
            </svg>
          )}
        </motion.button>

        {/* "No audio" flash */}
        {noAudioMsg && (
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute top-5 left-16 text-[10px] uppercase tracking-[0.15em] text-white/40"
            style={{ fontFamily: "var(--font-barlow)" }}>
            No audio uploaded
          </motion.div>
        )}

        {/* Waveform */}
        <div className="w-full">
          <Waveform data={track.waveform} color="#E04020" isPlaying={isPlaying} progress={progress} height={56} />
        </div>

        {/* Duration */}
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-3"
          style={{ fontFamily: "var(--font-barlow)" }}>
          {track.duration}
        </p>
      </motion.div>

      {/* Info */}
      <div className="pt-4 pb-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white leading-snug mb-1 group-hover:text-white/80 transition-colors"
              style={{ fontFamily: "var(--font-barlow)" }}>
              {track.title}
            </h3>
          </div>
          <motion.button
            onClick={() => onLicense?.(track)}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#E04020" }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.15 }}
            aria-label="License track">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9"
                stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>

        <div className="w-full h-px bg-white/10 my-3" />

        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-barlow)" }}>{track.mood}</span>
          <span className="text-xs text-white/30 uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-barlow)" }}>{formatPlays(track.plays)} plays</span>
        </div>

        <motion.button
          onClick={() => onRequest?.(track)}
          className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/25"
          style={{ fontFamily: "var(--font-barlow)" }}
          whileHover={{ color: "rgba(255,255,255,0.6)" }}
          transition={{ duration: 0.15 }}>
          Request custom
        </motion.button>
      </div>
    </motion.div>
  );
}
