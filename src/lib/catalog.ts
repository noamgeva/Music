export type Mood =
  | "Desert Mysticism"
  | "Urban Solitude"
  | "Ancient Tension"
  | "Cosmic Drift"
  | "Primal Ritual"
  | "Neon Melancholy";

export interface Track {
  id: string;
  title: string;
  mood: Mood;
  bpm: number;
  key: string;
  duration: string; // mm:ss
  description: string;
  tags: string[];
  waveform: number[]; // normalized 0-1 amplitudes for visual
  audioSrc?: string;
  plays: number;
  licensed: number;
}

export const MOODS: { name: Mood; description: string }[] = [
  {
    name: "Desert Mysticism",
    description: "Vast, ancient, spiritual. Oud drones and sand-worn percussion.",
  },
  {
    name: "Urban Solitude",
    description: "Midnight city hum. Electronic pulse beneath human stillness.",
  },
  {
    name: "Ancient Tension",
    description: "Ritual dread. Strings that remember. Brass that forgets nothing.",
  },
  {
    name: "Cosmic Drift",
    description: "Infinite and weightless. Synthetic textures dissolving into void.",
  },
  {
    name: "Primal Ritual",
    description: "Earth percussion. Chant and fire. Pre-language sonic memory.",
  },
  {
    name: "Neon Melancholy",
    description: "Beautiful sadness under fluorescent lights. Cinematic longing.",
  },
];

export const TRACKS: Track[] = [
  {
    id: "t1",
    title: "Sinai at Dawn",
    mood: "Desert Mysticism",
    bpm: 72,
    key: "D Minor",
    duration: "4:18",
    description: "Oud and frame drum open into a vast cinematic horizon. Perfect for wide establishing shots in arid landscapes.",
    tags: ["oud", "frame-drum", "ambient", "spiritual", "world"],
    waveform: [0.2,0.3,0.5,0.4,0.6,0.8,0.7,0.9,0.6,0.5,0.7,0.8,0.6,0.4,0.5,0.3,0.6,0.7,0.8,0.5,0.4,0.3,0.5,0.6,0.7,0.4,0.3,0.5,0.6,0.4],
    plays: 1243,
    licensed: 8,
  },
  {
    id: "t2",
    title: "Wadi Rum Silence",
    mood: "Desert Mysticism",
    bpm: 58,
    key: "A Phrygian",
    duration: "5:02",
    description: "Stretched tones and whispered vocals drift across a minimal drone. Time disappears.",
    tags: ["drone", "vocal", "minimal", "hypnotic"],
    waveform: [0.1,0.2,0.3,0.2,0.4,0.3,0.5,0.4,0.3,0.5,0.4,0.6,0.5,0.4,0.3,0.5,0.4,0.3,0.4,0.5,0.3,0.2,0.4,0.5,0.3,0.4,0.2,0.3,0.4,0.2],
    plays: 876,
    licensed: 5,
  },
  {
    id: "t3",
    title: "3AM Platform",
    mood: "Urban Solitude",
    bpm: 90,
    key: "F Minor",
    duration: "3:44",
    description: "Sparse piano over a barely-there electronic pulse. The loneliness of the modern city.",
    tags: ["piano", "electronic", "minimal", "cinematic"],
    waveform: [0.4,0.5,0.3,0.6,0.7,0.5,0.4,0.6,0.8,0.7,0.5,0.6,0.4,0.5,0.7,0.6,0.4,0.5,0.6,0.7,0.5,0.4,0.6,0.7,0.5,0.6,0.4,0.5,0.6,0.4],
    plays: 2109,
    licensed: 14,
  },
  {
    id: "t4",
    title: "Fluorescent Rain",
    mood: "Urban Solitude",
    bpm: 85,
    key: "G Minor",
    duration: "4:30",
    description: "Wet streets, muted trumpet, synthesizer fog. A film noir protagonist walks.",
    tags: ["trumpet", "synth", "noir", "atmospheric"],
    waveform: [0.5,0.6,0.7,0.5,0.6,0.8,0.7,0.6,0.5,0.7,0.8,0.6,0.5,0.7,0.6,0.5,0.7,0.8,0.6,0.5,0.7,0.6,0.5,0.6,0.7,0.5,0.6,0.7,0.5,0.6],
    plays: 1580,
    licensed: 11,
  },
  {
    id: "t5",
    title: "Before the Battle",
    mood: "Ancient Tension",
    bpm: 105,
    key: "B Minor",
    duration: "3:55",
    description: "Low brass and taiko build an inevitable march. Used in three festival award-winners.",
    tags: ["brass", "taiko", "orchestral", "tension", "epic"],
    waveform: [0.3,0.4,0.5,0.6,0.7,0.8,0.9,0.8,0.7,0.9,0.8,0.7,0.9,1.0,0.9,0.8,0.7,0.9,0.8,0.7,0.6,0.8,0.9,0.8,0.7,0.9,0.8,0.9,0.7,0.8],
    plays: 3201,
    licensed: 22,
  },
  {
    id: "t6",
    title: "The Tribunal",
    mood: "Ancient Tension",
    bpm: 68,
    key: "E Phrygian",
    duration: "4:10",
    description: "Slow-building string clusters and distant voices. Justice, judgment, gravity.",
    tags: ["strings", "choir", "dramatic", "slow-burn"],
    waveform: [0.2,0.3,0.4,0.5,0.4,0.5,0.6,0.7,0.6,0.7,0.8,0.7,0.8,0.9,0.8,0.7,0.8,0.9,0.8,0.7,0.6,0.7,0.8,0.7,0.6,0.7,0.8,0.6,0.5,0.6],
    plays: 1876,
    licensed: 13,
  },
  {
    id: "t7",
    title: "Event Horizon",
    mood: "Cosmic Drift",
    bpm: 62,
    key: "C Lydian",
    duration: "6:14",
    description: "Slowly evolving synthesizer textures for space, existential sci-fi, or the sublime unknown.",
    tags: ["synth", "ambient", "space", "evolving", "long-form"],
    waveform: [0.1,0.2,0.2,0.3,0.3,0.4,0.4,0.5,0.5,0.4,0.5,0.6,0.5,0.4,0.5,0.6,0.5,0.6,0.5,0.4,0.5,0.4,0.3,0.4,0.5,0.4,0.3,0.4,0.3,0.2],
    plays: 987,
    licensed: 6,
  },
  {
    id: "t8",
    title: "Pale Blue Signal",
    mood: "Cosmic Drift",
    bpm: 70,
    key: "A Dorian",
    duration: "5:30",
    description: "A radio transmission from the edge of the solar system. Hauntingly human.",
    tags: ["electronic", "space", "melancholic", "sci-fi"],
    waveform: [0.3,0.3,0.4,0.4,0.5,0.5,0.4,0.5,0.6,0.5,0.4,0.5,0.4,0.5,0.6,0.5,0.4,0.5,0.4,0.3,0.4,0.5,0.4,0.3,0.4,0.3,0.4,0.5,0.3,0.4],
    plays: 743,
    licensed: 4,
  },
  {
    id: "t9",
    title: "Bloodline Ceremony",
    mood: "Primal Ritual",
    bpm: 120,
    key: "D Dorian",
    duration: "4:45",
    description: "Layered hand drums and chant fragments. The body remembers what the mind forgets.",
    tags: ["percussion", "chant", "tribal", "rhythm", "ceremony"],
    waveform: [0.6,0.7,0.8,0.9,0.8,0.9,1.0,0.9,0.8,0.9,0.8,0.9,1.0,0.9,0.8,0.9,0.8,0.7,0.8,0.9,0.8,0.9,0.8,0.7,0.8,0.9,0.8,0.7,0.8,0.7],
    plays: 2654,
    licensed: 18,
  },
  {
    id: "t10",
    title: "First Fire",
    mood: "Primal Ritual",
    bpm: 96,
    key: "G Minor",
    duration: "3:58",
    description: "Stone percussion and elemental bass frequencies. Origin myth energy.",
    tags: ["percussion", "bass", "primal", "elemental"],
    waveform: [0.5,0.6,0.7,0.8,0.7,0.8,0.9,0.8,0.7,0.8,0.9,0.8,0.7,0.8,0.7,0.6,0.7,0.8,0.7,0.6,0.7,0.8,0.7,0.8,0.7,0.6,0.7,0.6,0.7,0.6],
    plays: 1432,
    licensed: 9,
  },
  {
    id: "t11",
    title: "Glass City",
    mood: "Neon Melancholy",
    bpm: 88,
    key: "F# Minor",
    duration: "4:22",
    description: "Shimmering synth pads and a fractured guitar motif. Loss made beautiful.",
    tags: ["synth", "guitar", "melancholic", "cinematic", "modern"],
    waveform: [0.4,0.5,0.6,0.5,0.6,0.7,0.6,0.7,0.8,0.7,0.6,0.7,0.8,0.7,0.6,0.7,0.6,0.7,0.8,0.7,0.6,0.5,0.6,0.7,0.6,0.5,0.6,0.7,0.6,0.5],
    plays: 3450,
    licensed: 24,
  },
  {
    id: "t12",
    title: "Last Call",
    mood: "Neon Melancholy",
    bpm: 76,
    key: "Bb Minor",
    duration: "3:33",
    description: "Tender piano and lush string pads. The quiet devastation of almost.",
    tags: ["piano", "strings", "tender", "emotional"],
    waveform: [0.3,0.4,0.5,0.6,0.5,0.6,0.7,0.6,0.7,0.8,0.7,0.6,0.7,0.8,0.7,0.6,0.7,0.6,0.5,0.6,0.7,0.6,0.5,0.6,0.5,0.6,0.7,0.5,0.4,0.5],
    plays: 2876,
    licensed: 19,
  },
];
