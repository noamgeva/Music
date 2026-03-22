"use client";

import { useState, useRef } from "react";
import { TRACKS, MOODS } from "@/lib/catalog";
import Waveform from "./Waveform";

export default function VisualSyncPreview() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleFile = (file: File) => {
    if (file.type.startsWith("video/")) {
      setVideoUrl(URL.createObjectURL(file));
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const togglePlay = () => {
    if (!videoUrl) return;
    if (isPlaying) {
      setIsPlaying(false);
      videoRef.current?.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      videoRef.current?.play();
      intervalRef.current = setInterval(() => {
        const vid = videoRef.current;
        if (vid) setProgress(vid.currentTime / (vid.duration || 1));
      }, 100);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="px-8 py-4 border-b border-zinc-200 flex items-center justify-between">
        <span
          className="text-[10px] uppercase tracking-[0.25em] text-zinc-400"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Visual Sync
        </span>
        <span className="text-xs text-zinc-400">
          Upload a silent cut and audition tracks in real time
        </span>
      </div>

      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">

        {/* Left: Video */}
        <div className="p-8">
          {!videoUrl ? (
            <div
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const f = e.dataTransfer.files[0];
                if (f) handleFile(f);
              }}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => document.getElementById("vsync-upload")?.click()}
              className={`aspect-video border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragging ? "border-black bg-zinc-50" : "border-zinc-200 hover:border-zinc-400"
              }`}
            >
              <input
                id="vsync-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <p
                className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-500 mb-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Drop silent clip here
              </p>
              <p className="text-[11px] text-zinc-300">or click to browse — MP4, MOV, WebM</p>
            </div>
          ) : (
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-contain"
                onEnded={() => { setIsPlaying(false); setProgress(0); }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-11 h-11 bg-white flex items-center justify-center hover:bg-zinc-100 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="black">
                      <rect x="1" y="0" width="4" height="12" />
                      <rect x="7" y="0" width="4" height="12" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="black" style={{ marginLeft: 2 }}>
                      <path d="M1 0L12 6L1 12V0Z" />
                    </svg>
                  )}
                </button>
              </div>
              <button
                onClick={() => { setVideoUrl(null); setIsPlaying(false); setProgress(0); }}
                className="absolute top-3 right-3 w-7 h-7 bg-white text-black text-xs font-bold flex items-center justify-center hover:bg-zinc-100"
              >
                &times;
              </button>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
                <div className="h-full bg-white transition-all" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
          )}

          {/* Currently auditioning */}
          <div className="mt-6 pt-6 border-t border-zinc-100">
            <p
              className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Now Auditioning
            </p>
            <p
              className="text-2xl font-bold italic"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {selectedTrack.title}
            </p>
            <p
              className="text-xs text-zinc-400 mt-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {selectedTrack.bpm} BPM &middot; {selectedTrack.key} &middot; {selectedTrack.duration}
            </p>
          </div>
        </div>

        {/* Right: Track list */}
        <div className="divide-y divide-zinc-100 max-h-[600px] overflow-y-auto">
          {TRACKS.map((track) => {
            const isSelected = selectedTrack.id === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track)}
                className={`w-full text-left px-7 py-5 transition-colors ${
                  isSelected ? "bg-black text-white" : "hover:bg-zinc-50"
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <p
                    className={`text-sm font-bold italic ${isSelected ? "text-white" : "text-black"}`}
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {track.title}
                  </p>
                  <span
                    className={`text-[11px] ml-4 shrink-0 ${isSelected ? "text-white/50" : "text-zinc-400"}`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {track.duration}
                  </span>
                </div>
                <p
                  className={`text-[10px] uppercase tracking-wider ${isSelected ? "text-white/50" : "text-zinc-400"}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {track.mood}
                </p>
                {isSelected && (
                  <div className="mt-3">
                    <Waveform data={track.waveform} color="#ffffff" isPlaying={isPlaying} progress={progress} height={18} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
