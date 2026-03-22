"use client";

import { useState, useRef } from "react";
import { TRACKS } from "@/lib/catalog";
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
      setIsPlaying(false); videoRef.current?.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true); videoRef.current?.play();
      intervalRef.current = setInterval(() => {
        const v = videoRef.current;
        if (v) setProgress(v.currentTime / (v.duration || 1));
      }, 100);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      {/* Video */}
      <div>
        {!videoUrl ? (
          <div
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => document.getElementById("vsync-upload")?.click()}
            className="aspect-video flex flex-col items-center justify-center cursor-pointer transition-colors border-2 border-dashed"
            style={{ borderColor: isDragging ? "#E04020" : "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
          >
            <input id="vsync-upload" type="file" accept="video/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <p className="text-sm font-semibold text-white/50 mb-1 uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-barlow)" }}>
              Drop your silent clip here
            </p>
            <p className="text-xs text-white/20" style={{ fontFamily: "var(--font-barlow)" }}>or click to browse — MP4, MOV, WebM</p>
          </div>
        ) : (
          <div className="relative aspect-video bg-black overflow-hidden">
            <video ref={videoRef} src={videoUrl} className="w-full h-full object-contain"
              onEnded={() => { setIsPlaying(false); setProgress(0); }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <button onClick={togglePlay}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                style={{ background: "#E04020" }}>
                {isPlaying ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="white"><rect x="0" y="0" width="4" height="12"/><rect x="8" y="0" width="4" height="12"/></svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="white" style={{ marginLeft: 2 }}><path d="M0 0L12 6L0 12Z"/></svg>
                )}
              </button>
            </div>
            <button onClick={() => { setVideoUrl(null); setIsPlaying(false); setProgress(0); }}
              className="absolute top-3 right-3 w-7 h-7 bg-white/10 hover:bg-white/20 text-white text-sm font-bold flex items-center justify-center transition-colors">
              &times;
            </button>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
              <div className="h-full transition-all" style={{ width: `${progress * 100}%`, background: "#E04020" }} />
            </div>
          </div>
        )}

        <div className="mt-5 pt-5 border-t border-white/8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1" style={{ fontFamily: "var(--font-barlow)" }}>Now Auditioning</p>
          <p className="text-lg font-bold uppercase tracking-wide text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>{selectedTrack.title}</p>
          <p className="text-xs text-white/30 mt-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-barlow)" }}>
            {selectedTrack.bpm} BPM · {selectedTrack.key} · {selectedTrack.duration}
          </p>
        </div>
      </div>

      {/* Track list */}
      <div className="space-y-1 max-h-[520px] overflow-y-auto">
        {TRACKS.map((track) => {
          const isSelected = selectedTrack.id === track.id;
          return (
            <button key={track.id} onClick={() => setSelectedTrack(track)}
              className="w-full text-left px-4 py-4 transition-colors flex items-start justify-between gap-4"
              style={{ background: isSelected ? "rgba(224,64,32,0.12)" : "rgba(255,255,255,0.03)" }}>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold uppercase text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>{track.title}</p>
                <p className="text-[10px] uppercase tracking-wider text-white/30 mt-0.5" style={{ fontFamily: "var(--font-barlow)" }}>{track.mood}</p>
                {isSelected && (
                  <div className="mt-2.5">
                    <Waveform data={track.waveform} color="#E04020" isPlaying={isPlaying} progress={progress} height={20} />
                  </div>
                )}
              </div>
              <span className="text-xs text-white/30 shrink-0 mt-0.5" style={{ fontFamily: "var(--font-barlow)" }}>{track.duration}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
