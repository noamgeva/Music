"use client";

interface WaveformProps {
  data: number[];
  color?: string;
  isPlaying?: boolean;
  progress?: number; // 0-1
  height?: number;
}

export default function Waveform({
  data,
  color = "#D4A853",
  isPlaying = false,
  progress = 0,
  height = 40,
}: WaveformProps) {
  const filled = Math.round(data.length * progress);

  return (
    <div
      className="flex items-center gap-[2px] w-full"
      style={{ height }}
    >
      {data.map((amp, i) => {
        const barHeight = Math.max(3, amp * height);
        const isPast = i < filled;
        const isActive = isPlaying && Math.abs(i - filled) < 3;
        return (
          <div
            key={i}
            className={`flex-1 rounded-full transition-all duration-75 ${isActive ? "waveform-bar-active" : ""}`}
            style={{
              height: barHeight,
              background: isPast ? color : "rgba(255,255,255,0.15)",
              opacity: isActive ? 1 : isPast ? 0.9 : 0.4,
            }}
          />
        );
      })}
    </div>
  );
}
