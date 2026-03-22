"use client";

interface WaveformProps {
  data: number[];
  color?: string;
  isPlaying?: boolean;
  progress?: number;
  height?: number;
}

export default function Waveform({ data, color = "#111", isPlaying = false, progress = 0, height = 36 }: WaveformProps) {
  const filled = Math.round(data.length * progress);
  return (
    <div className="flex items-center gap-[2px] w-full" style={{ height }}>
      {data.map((amp, i) => {
        const h = Math.max(2, amp * height);
        const isPast = i < filled;
        const isActive = isPlaying && Math.abs(i - filled) < 3;
        return (
          <div
            key={i}
            className={`flex-1 rounded-full ${isActive ? "waveform-bar-active" : ""}`}
            style={{
              height: h,
              background: isPast ? color : "#e8e8e8",
              transition: "background 0.1s",
            }}
          />
        );
      })}
    </div>
  );
}
