"use client";

interface WaveformProps {
  data: number[];
  color?: string;
  isPlaying?: boolean;
  progress?: number;
  height?: number;
}

export default function Waveform({
  data,
  color = "#0a0a0a",
  isPlaying = false,
  progress = 0,
  height = 40,
}: WaveformProps) {
  const filled = Math.round(data.length * progress);

  return (
    <div className="flex items-center gap-[2px] w-full" style={{ height }}>
      {data.map((amp, i) => {
        const barH = Math.max(2, amp * height);
        const isPast = i < filled;
        const isActive = isPlaying && Math.abs(i - filled) < 3;
        return (
          <div
            key={i}
            className={`flex-1 rounded-sm ${isActive ? "waveform-bar-active" : ""}`}
            style={{
              height: barH,
              background: isPast ? color : "#e0e0e0",
              opacity: isActive ? 1 : isPast ? 0.85 : 1,
              transition: "background 0.1s",
            }}
          />
        );
      })}
    </div>
  );
}
