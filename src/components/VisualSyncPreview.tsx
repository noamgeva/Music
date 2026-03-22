"use client";

import { useState, useRef } from "react";
import { TRACKS, MOODS } from "@/lib/catalog";
import Waveform from "./Waveform";

export default function VisualSyncPreview() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleFile = (file: File) => {
    if (file.type.startsWith("video/")) {
      setVideoFile(file);
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
      {/* Header row */}
      <div className="border-b border-black px-6 py-4 flex items-center justify-between">
        <span
          className="text-[10px] uppercase tracking-[0.25em] font-semibold"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Visual Sync Preview
        </span>
        <span className="text-xs text-zinc-400">Upload your silent cut · Audition tracks live</span>
      </div>

      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black">
        {/* Left: Video */}
        <div className="p-6">
          {!videoUrl ? (
            <div
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => document.getElementById("vsync-upload")?.click()}
              className={`aspect-video border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragging ? "border-black bg-zinc-50" : "border-zinc-300 hover:border-black"
              }`}
            >
              <input
                id="vsync-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <div className="text-4xl mb-3">🎬</div>
              <p
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Drop silent clip here
              </p>
              <p className="text-[11px] text-zinc-400">or click to browse · MP4, MOV, WebM</p>
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
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="black">
                      <rect x="2" y="1" width="4" height="12" rx="0.5"/>
                      <rect x="8" y="1" width="4" height="12" rx="0.5"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="black" style={{ marginLeft: 2 }}>
                      <path d="M3 1.5L13 7L3 12.5V1.5Z"/>
                    </svg>
                  )}
                </button>
              </div>
              <button
                onClick={() => { setVideoUrl(null); setVideoFile(null); setIsPlaying(false); setProgress(0); }}
                className="absolute top-3 right-3 w-7 h-7 bg-white text-black text-sm font-bold flex items-center justify-center hover:bg-zinc-100"
              >
                ×
              </button>
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full bg-white transition-all" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
          )}

          {/* Currently auditioning */}
          <div className="mt-4 p-4 border border-zinc-200">
            <p
              className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Auditioning
            </p>
            <p
              className="text-xl font-bold italic"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {selectedTrack.title}
            </p>
            <p className="text-xs text-zinc-400 mt-1">{selectedTrack.bpm} BPM · {selectedTrack.key} · {selectedTrack.duration}</p>
          </div>
        </div>

        {/* Right: Track list */}
        <div className="divide-y divide-zinc-100 max-h-[560px] overflow-y-auto">
          {TRACKS.map((track) => {
            const tm = MOODS.find((m) => m.name === track.mood);
            const isSelected = selectedTrack.id === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track)}
                className={`w-full text-left px-5 py-4 transition-colors ${
                  isSelected ? "bg-black text-white" : "hover:bg-zinc-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p
                      className={`text-sm font-bold italic ${isSelected ? "text-white" : "text-black"}`}
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {track.title}
                    </p>
                    <p className={`text-[10px] uppercase tracking-wider mt-0.5 ${isSelected ? "text-white/60" : "text-zinc-400"}`}
                      style={{ fontFamily: "var(--font-inter)" }}>
                      {tm?.icon} {track.mood}
                    </p>
                  </div>
                  <span className={`text-xs ${isSelected ? "text-white/50" : "text-zinc-400"}`}>{track.duration}</span>
                </div>
                {isSelected && (
                  <Waveform
                    data={track.waveform}
                    color="#ffffff"
                    isPlaying={isPlaying}
                    progress={progress}
                    height={20}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
