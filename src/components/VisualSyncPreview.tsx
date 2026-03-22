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
  const videoRef = useRef<HTMLVideoElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const mood = MOODS.find((m) => m.name === selectedTrack.mood);

  const handleFile = (file: File) => {
    if (file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
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
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-white/30 text-sm tracking-[0.3em] uppercase mb-3">Visual Sync</p>
          <h2 className="text-3xl text-white/90 font-light mb-4">
            Test the Vibe Before You License
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-sm leading-relaxed">
            Upload a silent cut of your scene and audition Noam&apos;s tracks against it in real time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Video Drop Zone */}
          <div>
            {!videoUrl ? (
              <div
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => document.getElementById("video-upload")?.click()}
                className="relative border-2 border-dashed rounded-2xl aspect-video flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                style={{
                  borderColor: isDragging ? mood?.color : "rgba(255,255,255,0.1)",
                  background: isDragging ? `${mood?.color}08` : "rgba(255,255,255,0.02)",
                }}
              >
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <div className="text-4xl mb-3">🎬</div>
                <p className="text-white/50 text-sm font-medium mb-1">Drop your silent clip here</p>
                <p className="text-white/25 text-xs">or click to browse · MP4, MOV, WebM</p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-contain"
                  onEnded={() => { setIsPlaying(false); setProgress(0); }}
                />
                {/* Controls overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all"
                  >
                    {isPlaying ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                        <rect x="3" y="2" width="4" height="12" rx="1"/>
                        <rect x="9" y="2" width="4" height="12" rx="1"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="white" style={{ marginLeft: 2 }}>
                        <path d="M4 2L14 8L4 14V2Z"/>
                      </svg>
                    )}
                  </button>
                </div>
                <button
                  onClick={() => { setVideoUrl(null); setVideoFile(null); setIsPlaying(false); }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 text-white/60 hover:text-white text-xs flex items-center justify-center"
                >
                  ×
                </button>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${progress * 100}%`, background: mood?.color }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Track Selector */}
          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
            {TRACKS.map((track) => {
              const tm = MOODS.find((m) => m.name === track.mood);
              const isSelected = selectedTrack.id === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track)}
                  className="w-full text-left p-3.5 rounded-xl border transition-all duration-200"
                  style={{
                    borderColor: isSelected ? `${tm?.color}55` : "rgba(255,255,255,0.05)",
                    background: isSelected ? `${tm?.color}10` : "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-white/80 text-sm font-medium block">{track.title}</span>
                      <span className="text-xs" style={{ color: tm?.color }}>{tm?.icon} {track.mood}</span>
                    </div>
                    <span className="text-white/30 text-xs">{track.duration}</span>
                  </div>
                  {isSelected && (
                    <Waveform data={track.waveform} color={tm?.color} isPlaying={isPlaying} progress={progress} height={24} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Currently selected info */}
        <div
          className="mt-8 p-5 rounded-2xl border"
          style={{ borderColor: `${mood?.color}22`, background: `${mood?.color}08` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/30 mb-1">Now Auditioning</p>
              <h3 className="text-white font-semibold">{selectedTrack.title}</h3>
              <p className="text-white/40 text-xs mt-1">{selectedTrack.description}</p>
            </div>
            <div className="text-right text-xs text-white/30">
              <div>{selectedTrack.bpm} BPM</div>
              <div>{selectedTrack.key}</div>
              <div>{selectedTrack.duration}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
