"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TRACKS, MOODS, Track } from "@/lib/catalog";
import { formatPlays } from "@/lib/utils";
import { loadTracks, saveTracks } from "@/lib/trackStore";
import Waveform from "@/components/Waveform";
import Link from "next/link";

/* ── AUTH ── */
const AUTH_EMAIL    = "noam.milly@gmail.com";
const AUTH_PASSWORD = "Moraggeva5";
const AUTH_KEY      = "studio_authed";

/* ── MOCK DATA ── */
const LEADS = [
  { id:"l1", director:"Aria Chen",    project:"Dust & Meridian",  stage:"Post-Production", festival:"Sundance 2026", match:"Desert Mysticism", score:94, status:"draft",
    email:`Hi Aria,\n\nI came across "Dust & Meridian" in the Sundance 2026 selections and the story of displacement across arid landscapes resonated deeply.\n\nI'm Noam Geva, a Berlin-based composer. My track "Sinai at Dawn" — oud and frame drum over a desert drone — might be the sonic texture your cut is looking for.\n\nI'd love to send you a preview against your latest assembly cut.\n\nWarm regards,\nNoam` },
  { id:"l2", director:"Marcus Webb",  project:"Neon Psalms",      stage:"Picture Lock",    festival:"SXSW 2026",    match:"Neon Melancholy",  score:88, status:"sent",
    email:`Hi Marcus,\n\nCongratulations on "Neon Psalms" reaching picture lock.\n\nMy track "Glass City" was composed for exactly the fluorescent urban loneliness your film explores.\n\nWould you be open to a 15-minute listening session?\n\nBest,\nNoam` },
  { id:"l3", director:"Priya Nair",   project:"The Tribunal",     stage:"Final Mix",       festival:"Berlin 2026",  match:"Ancient Tension",  score:91, status:"replied",
    email:`Dear Priya,\n\nMy orchestral piece "The Tribunal" — built from slow string clusters and distant voices — was written for exactly the gravity your film carries.\n\nI'd be honored to send you the stems.\n\nRespectfully,\nNoam` },
  { id:"l4", director:"James Ortega", project:"Signal/Noise",     stage:"Post-Production", festival:"Tribeca 2026", match:"Cosmic Drift",     score:85, status:"draft",
    email:`Hi James,\n\n"Pale Blue Signal" — a radio transmission from the edge of the solar system — might be exactly what your cut needs.\n\nHappy to send you the full track for your audition.\n\nBest,\nNoam` },
];

type Tab = "assets" | "scout" | "analytics";

interface ProcessingItem {
  id: string;
  name: string;
  status: "processing" | "done" | "error";
  errorMsg?: string;
}

/* ── AUDIO UTILS ── */
async function audioDataFromFile(file: File): Promise<{ waveform: number[]; duration: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioCtx = window.AudioContext ?? (window as any).webkitAudioContext;
    const ctx = new AudioCtx() as AudioContext;
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

    /* Downsample to 40 amplitude bars */
    const channelData = audioBuffer.getChannelData(0);
    const samples   = 40;
    const blockSize = Math.floor(channelData.length / samples);
    const waveform: number[] = [];
    for (let i = 0; i < samples; i++) {
      let sum = 0;
      for (let j = 0; j < blockSize; j++) sum += Math.abs(channelData[i * blockSize + j]);
      waveform.push(sum / blockSize);
    }
    const peak = Math.max(...waveform, 0.001);
    const normalized = waveform.map((v) => v / peak);

    const totalSec = Math.round(audioBuffer.duration);
    await ctx.close();
    return {
      waveform: normalized,
      duration: `${Math.floor(totalSec / 60)}:${String(totalSec % 60).padStart(2, "0")}`,
    };
  } catch {
    return {
      waveform: Array.from({ length: 40 }, () => Math.random() * 0.7 + 0.3),
      duration: "0:00",
    };
  }
}

function titleFromFile(name: string) {
  return name
    .replace(/\.[^.]+$/, "")        // strip extension
    .replace(/[-_]+/g, " ")          // dashes → spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Title Case
}

/* ── DROP ZONE ── */
function DropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave")  setDragActive(false);
    if (e.type === "drop") {
      setDragActive(false);
      const files = Array.from(e.dataTransfer.files).filter(
        (f) => f.type.startsWith("audio/") || /\.(mp3|wav|flac|aiff|aac|ogg|m4a)$/i.test(f.name)
      );
      if (files.length) onFiles(files);
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onFiles(files);
    e.target.value = "";
  };

  return (
    <motion.div
      onDragEnter={onDrag} onDragOver={onDrag} onDragLeave={onDrag} onDrop={onDrag}
      onClick={() => inputRef.current?.click()}
      animate={{
        borderColor: dragActive ? "#E04020"                : "rgba(255,255,255,0.08)",
        background:  dragActive ? "rgba(224,64,32,0.06)"  : "rgba(255,255,255,0.01)",
      }}
      transition={{ duration: 0.15 }}
      className="relative border-2 border-dashed flex flex-col items-center justify-center gap-5 py-14 cursor-pointer mb-10 select-none"
    >
      <input ref={inputRef} type="file" multiple
        accept="audio/*,.mp3,.wav,.flac,.aiff,.aac,.ogg,.m4a"
        onChange={onInput} className="hidden" />

      {/* Arrow icon */}
      <motion.div animate={{ y: dragActive ? -6 : 0 }} transition={{ duration: 0.2 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <motion.path
            d="M18 26V10M10 18L18 10L26 18"
            stroke={dragActive ? "#E04020" : "rgba(255,255,255,0.2)"}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            animate={{ stroke: dragActive ? "#E04020" : "rgba(255,255,255,0.2)" }}
          />
          <motion.path
            d="M7 29H29"
            stroke={dragActive ? "#E04020" : "rgba(255,255,255,0.1)"}
            strokeWidth="1.5" strokeLinecap="round"
            animate={{ stroke: dragActive ? "#E04020" : "rgba(255,255,255,0.1)" }}
          />
        </svg>
      </motion.div>

      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em]"
          style={{ color: dragActive ? "#E04020" : "rgba(255,255,255,0.35)", fontFamily: "var(--font-barlow)" }}>
          {dragActive ? "Release to upload" : "Drop your audio files here"}
        </p>
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/20 mt-1.5"
          style={{ fontFamily: "var(--font-barlow)" }}>
          MP3 · WAV · FLAC · AIFF · multiple files at once
        </p>
      </div>

      <AnimatePresence>
        {!dragActive && (
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-[10px] uppercase tracking-[0.25em] border border-white/10 px-4 py-2 text-white/30 hover:text-white/60 hover:border-white/20 transition-colors"
            style={{ fontFamily: "var(--font-barlow)" }}>
            or browse files
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── TRACK FORM ── */
function TrackForm({
  initial, onSave, onCancel,
}: {
  initial?: Partial<Track>;
  onSave: (data: Partial<Track>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    title:    initial?.title    ?? "",
    mood:     initial?.mood     ?? "Desert Mysticism",
    duration: initial?.duration ?? "",
    bpm:      String(initial?.bpm ?? ""),
    key:      initial?.key      ?? "",
  });

  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const MOOD_NAMES = MOODS.map((m) => m.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-md p-8" style={{ background: "#111" }}>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6"
          style={{ fontFamily: "var(--font-barlow)" }}>
          {initial?.title ? "Edit Track" : "Add Track"}
        </p>

        <div className="space-y-4">
          {[
            { key: "title",    label: "Title",    type: "text"   },
            { key: "duration", label: "Duration", type: "text",  placeholder: "3:42" },
            { key: "bpm",      label: "BPM",      type: "number" },
            { key: "key",      label: "Key",      type: "text",  placeholder: "Am" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 block mb-1.5"
                style={{ fontFamily: "var(--font-barlow)" }}>{field.label}</label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                placeholder={(field as { placeholder?: string }).placeholder}
                onChange={f(field.key)}
                className="w-full px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-white/20"
                style={{ background: "rgba(255,255,255,0.07)", fontFamily: "var(--font-barlow)" }}
              />
            </div>
          ))}

          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 block mb-1.5"
              style={{ fontFamily: "var(--font-barlow)" }}>Mood</label>
            <select value={form.mood} onChange={f("mood")}
              className="w-full px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-white/20"
              style={{ background: "rgba(255,255,255,0.07)", fontFamily: "var(--font-barlow)" }}>
              {MOOD_NAMES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onCancel}
            className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-barlow)" }}>Cancel</button>
          <button
            onClick={() => onSave({
              title:    form.title,
              mood:     form.mood as Track["mood"],
              duration: form.duration,
              bpm:      parseInt(form.bpm) || 0,
              key:      form.key,
            })}
            className="flex-1 py-3 text-sm font-bold uppercase tracking-[0.2em]"
            style={{ background: "#E04020", color: "#fff", fontFamily: "var(--font-barlow)" }}>
            Save Track
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── LOGIN GATE ── */
function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(false);
  const [shake, setShake]       = useState(false);

  const submit = () => {
    if (email.trim() === AUTH_EMAIL && password === AUTH_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "1");
      onAuth();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm">

        <h1 className="display font-black text-white mb-2 uppercase"
          style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(48px, 10vw, 96px)", lineHeight: 1 }}>
          STUDIO
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-12"
          style={{ fontFamily: "var(--font-barlow)" }}>Private access</p>

        <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.4 }}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 block mb-1.5"
                style={{ fontFamily: "var(--font-barlow)" }}>Email</label>
              <input type="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="w-full px-3 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-white/20"
                style={{ background: "rgba(255,255,255,0.06)", fontFamily: "var(--font-barlow)" }} />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 block mb-1.5"
                style={{ fontFamily: "var(--font-barlow)" }}>Password</label>
              <input type="password" value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="w-full px-3 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-white/20"
                style={{ background: "rgba(255,255,255,0.06)", fontFamily: "var(--font-barlow)" }} />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-xs text-red-400 mb-4" style={{ fontFamily: "var(--font-barlow)" }}>
                Invalid credentials
              </motion.p>
            )}
          </AnimatePresence>

          <button onClick={submit}
            className="w-full py-3.5 text-sm font-bold uppercase tracking-[0.2em]"
            style={{ background: "#E04020", color: "#fff", fontFamily: "var(--font-barlow)" }}>
            Enter Studio
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function StudioPage() {
  const [authed, setAuthed]             = useState<boolean | null>(null);
  const [tab, setTab]                   = useState<Tab>("assets");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [leadStatuses, setLeadStatuses] = useState<Record<string, string>>(
    Object.fromEntries(LEADS.map((l) => [l.id, l.status]))
  );
  const [tracks, setTracks]             = useState<Track[]>(TRACKS);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [addingTrack, setAddingTrack]   = useState(false);
  const [processing, setProcessing]     = useState<ProcessingItem[]>([]);

  /* Auth + hydration */
  useEffect(() => {
    setAuthed(localStorage.getItem(AUTH_KEY) === "1");
    setTracks(loadTracks());
  }, []);

  /* Persist whenever tracks change */
  useEffect(() => {
    if (authed) saveTracks(tracks);
  }, [tracks, authed]);

  const ANALYTICS = tracks.map((t) => ({
    ...t,
    weekPlays:   Math.floor((t.plays % 200) + 20),
    locations:   ["Berlin","New York","Los Angeles","London","Tel Aviv"].slice(0, (t.plays % 3) + 2),
    avgDuration: `${Math.floor((t.plays % 2) + 1)}:${String(Math.floor(t.plays % 59)).padStart(2, "0")}`,
    trend:       t.plays % 3 !== 0 ? "up" : "down",
  }));

  const totalPlays    = tracks.reduce((s, t) => s + t.plays, 0);
  const totalLicenses = tracks.reduce((s, t) => s + t.licensed, 0);

  /* Track CRUD */
  const saveTrack = (data: Partial<Track>) => {
    if (editingTrack) {
      setTracks(tracks.map((t) => t.id === editingTrack.id ? { ...t, ...data } : t));
      setEditingTrack(null);
    }
  };

  const addTrackManual = (data: Partial<Track>) => {
    const newTrack: Track = {
      id:          `t${Date.now()}`,
      title:       data.title       || "Untitled",
      mood:        data.mood        || "Desert Mysticism",
      duration:    data.duration    || "0:00",
      bpm:         data.bpm         || 0,
      key:         data.key         || "",
      description: "",
      tags:        [],
      plays:       0,
      licensed:    0,
      waveform:    Array.from({ length: 40 }, () => Math.random() * 0.8 + 0.2),
    };
    setTracks((prev) => [...prev, newTrack]);
    setAddingTrack(false);
  };

  const deleteTrack = (id: string) => {
    if (confirm("Delete this track?")) {
      setTracks(tracks.filter((t) => t.id !== id));
    }
  };

  /* ── Drop processing — upload to Vercel Blob ── */
  const processFiles = async (files: File[]) => {
    const items: ProcessingItem[] = files.map((f) => ({
      id:     `proc-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name:   f.name,
      status: "processing" as const,
    }));
    setProcessing((prev) => [...prev, ...items]);

    await Promise.all(
      files.map(async (file, i) => {
        const item = items[i];
        try {
          /* 1. Analyse waveform + duration from audio data */
          const { waveform, duration } = await audioDataFromFile(file);

          /* 2. Upload file to Vercel Blob via API route */
          const res = await fetch(
            `/api/upload?filename=${encodeURIComponent(file.name)}`,
            { method: "POST", body: file, headers: { "content-type": file.type || "audio/mpeg" } }
          );
          const json = await res.json() as { url?: string; error?: string };
          if (!res.ok || !json.url) throw new Error(json.error ?? `HTTP ${res.status}`);
          const audioSrc = json.url;

          /* 3. Create track with the public cloud URL */
          const newTrack: Track = {
            id:          `t${Date.now()}-${i}-${Math.random().toString(36).slice(2)}`,
            title:       titleFromFile(file.name),
            mood:        "Desert Mysticism",
            duration,
            bpm:         0,
            key:         "",
            description: "",
            tags:        [],
            plays:       0,
            licensed:    0,
            waveform,
            audioSrc,   /* ← permanent public URL, works on any device */
          };
          setTracks((prev) => [...prev, newTrack]);
          setProcessing((prev) => prev.map((p) => p.id === item.id ? { ...p, status: "done" } : p));
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : "Upload failed";
          console.error("Upload failed:", errorMsg);
          setProcessing((prev) => prev.map((p) =>
            p.id === item.id ? { ...p, status: "error", errorMsg } : p
          ));
          /* Keep errors visible longer so user can read them */
          setTimeout(() => {
            setProcessing((prev) => prev.filter((p) => p.id !== item.id));
          }, 8000);
          return;
        }
        setTimeout(() => {
          setProcessing((prev) => prev.filter((p) => p.id !== item.id));
        }, 2500);
      })
    );
  };

  /* Loading / auth states */
  if (authed === null) return <div className="min-h-screen bg-[#0a0a0a]" />;
  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Modals */}
      <AnimatePresence>
        {editingTrack && (
          <TrackForm initial={editingTrack} onSave={saveTrack} onCancel={() => setEditingTrack(null)} />
        )}
        {addingTrack && (
          <TrackForm onSave={addTrackManual} onCancel={() => setAddingTrack(false)} />
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-10 h-16 flex items-center justify-between">
          <Link href="/" className="text-xs font-semibold tracking-[0.25em] uppercase text-white hover:text-white/60 transition-colors"
            style={{ fontFamily: "var(--font-barlow)" }}>
            ← Noam Geva
          </Link>
          <div className="flex items-center gap-8">
            {(["assets","scout","analytics"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="relative text-xs tracking-[0.2em] uppercase font-semibold h-16 flex items-center transition-colors"
                style={{ fontFamily: "var(--font-barlow)", color: tab === t ? "#fff" : "rgba(255,255,255,0.3)" }}>
                {t === "assets" ? "Assets" : t === "scout" ? "AI Scout" : "Analytics"}
                {tab === t && (
                  <motion.div layoutId="studio-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: "#E04020" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => { localStorage.removeItem(AUTH_KEY); setAuthed(false); }}
            className="text-[10px] uppercase tracking-[0.2em] text-white/25 border border-white/10 px-2 py-1 hover:text-white/60 transition-colors"
            style={{ fontFamily: "var(--font-barlow)" }}>
            Sign out
          </button>
        </div>
      </nav>

      {/* Split mega header */}
      <div className="max-w-screen-xl mx-auto px-10 lg:px-16 pt-28 pb-0">
        <div className="flex items-end justify-between overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1 key={`left-${tab}`}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="display font-black text-white"
              style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(60px,12vw,160px)", lineHeight: 1 }}>
              {tab === "assets" ? "THE" : tab === "scout" ? "AI" : "THE"}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.h1 key={`right-${tab}`}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="display font-black text-white"
              style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(60px,12vw,160px)", lineHeight: 1 }}>
              {tab === "assets" ? "STUDIO" : tab === "scout" ? "SCOUT" : "DATA"}
            </motion.h1>
          </AnimatePresence>
        </div>
        <div className="w-full h-px bg-white/10 mt-4" />
      </div>

      {/* Summary stats */}
      <div className="max-w-screen-xl mx-auto px-10 lg:px-16 py-10 flex items-center gap-12 border-b border-white/5 flex-wrap">
        {[
          { v: tracks.length,           l: "Tracks" },
          { v: formatPlays(totalPlays), l: "Total Plays" },
          { v: totalLicenses,           l: "Licensed" },
          { v: LEADS.filter((l) => leadStatuses[l.id] !== "replied").length, l: "Active Leads" },
        ].map((s) => (
          <div key={s.l}>
            <div className="display text-5xl font-black text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>{s.v}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1" style={{ fontFamily: "var(--font-barlow)" }}>{s.l}</div>
          </div>
        ))}
      </div>

      <main className="max-w-screen-xl mx-auto px-10 lg:px-16 py-14">
        <AnimatePresence mode="wait">

          {/* ── ASSETS ── */}
          {tab === "assets" && (
            <motion.div key="assets"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}>

              {/* Drop zone */}
              <DropZone onFiles={processFiles} />

              {/* Processing queue */}
              <AnimatePresence>
                {processing.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 overflow-hidden">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-3"
                      style={{ fontFamily: "var(--font-barlow)" }}>
                      Processing {processing.length} file{processing.length > 1 ? "s" : ""}
                    </p>
                    <div className="space-y-1">
                      <AnimatePresence>
                        {processing.map((item) => (
                          <motion.div key={item.id}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col gap-1 px-4 py-3"
                            style={{
                              background: item.status === "error"
                                ? "rgba(248,113,113,0.06)"
                                : "rgba(255,255,255,0.03)",
                            }}>

                            <div className="flex items-center gap-4">
                              {/* Status icon */}
                              {item.status === "processing" && (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                                  className="w-4 h-4 rounded-full shrink-0"
                                  style={{ border: "1.5px solid rgba(255,255,255,0.15)", borderTopColor: "rgba(255,255,255,0.7)" }}
                                />
                              )}
                              {item.status === "done" && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                  className="w-4 h-4 flex items-center justify-center text-xs shrink-0"
                                  style={{ color: "#4ade80" }}>✓</motion.div>
                              )}
                              {item.status === "error" && (
                                <div className="w-4 h-4 flex items-center justify-center text-xs shrink-0"
                                  style={{ color: "#f87171" }}>✗</div>
                              )}

                              <p className="text-xs text-white/50 truncate flex-1"
                                style={{ fontFamily: "var(--font-barlow)" }}>{item.name}</p>

                              <p className="text-[10px] uppercase tracking-[0.15em] shrink-0"
                                style={{
                                  fontFamily: "var(--font-barlow)",
                                  color: item.status === "done" ? "#4ade80" : item.status === "error" ? "#f87171" : "rgba(255,255,255,0.3)",
                                }}>
                                {item.status === "processing" ? "Uploading…" : item.status === "done" ? "Added" : "Failed"}
                              </p>
                            </div>

                            {/* Error message — full text so user knows what to fix */}
                            {item.status === "error" && item.errorMsg && (
                              <p className="text-[11px] leading-relaxed ml-8"
                                style={{ color: "#fca5a5", fontFamily: "var(--font-barlow)" }}>
                                {item.errorMsg}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40"
                  style={{ fontFamily: "var(--font-barlow)" }}>
                  {tracks.length} tracks
                </p>
                <motion.button onClick={() => setAddingTrack(true)}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2.5 flex items-center gap-2"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-barlow)" }}>
                  Add manually
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </div>

              {/* Track list */}
              <div className="space-y-0">
                {tracks.map((track, i) => (
                  <motion.div key={track.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.35, ease: "easeOut" }}
                    className="flex items-center gap-6 py-5 border-t border-white/5 hover:bg-white/[0.02] transition-colors group px-2">

                    <span className="text-xs text-white/20 w-6 shrink-0 text-right"
                      style={{ fontFamily: "var(--font-barlow)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(255,255,255,0.06)" }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="rgba(255,255,255,0.5)" style={{ marginLeft: 1 }}>
                        <path d="M0 0L8 4L0 8Z"/>
                      </svg>
                    </div>

                    <div className="w-48 shrink-0">
                      <p className="text-sm font-bold uppercase text-white"
                        style={{ fontFamily: "var(--font-barlow-condensed)" }}>{track.title}</p>
                      <p className="text-[10px] uppercase tracking-wider text-white/30 mt-0.5"
                        style={{ fontFamily: "var(--font-barlow)" }}>{track.mood}</p>
                    </div>

                    <div className="flex-1 min-w-0">
                      <Waveform data={track.waveform} color="#E04020" height={24} />
                    </div>

                    <div className="flex items-center gap-8 text-xs text-white/30 shrink-0"
                      style={{ fontFamily: "var(--font-barlow)" }}>
                      <span>{track.duration}</span>
                      {track.bpm > 0 && <span className="font-semibold text-white/60">{track.bpm} BPM</span>}
                      {track.key && <span>{track.key}</span>}
                      <span>{formatPlays(track.plays)} plays</span>
                      <span style={{ color: "#4ade80" }}>{track.licensed}×</span>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button onClick={() => setEditingTrack(track)}
                        className="px-3 py-1.5 text-[10px] uppercase tracking-wider hover:bg-white/10 transition-colors"
                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-barlow)" }}>
                        Edit
                      </button>
                      <button onClick={() => deleteTrack(track.id)}
                        className="px-3 py-1.5 text-[10px] uppercase tracking-wider hover:bg-red-900/30 transition-colors"
                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,100,80,0.6)", fontFamily: "var(--font-barlow)" }}>
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
                <div className="border-t border-white/5" />
              </div>
            </motion.div>
          )}

          {/* ── AI SCOUT ── */}
          {tab === "scout" && (
            <motion.div key="scout"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}>

              <div className="flex items-center justify-between mb-10">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40" style={{ fontFamily: "var(--font-barlow)" }}>
                  {LEADS.length} active leads
                </p>
                <button className="text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2.5"
                  style={{ background: "#E04020", color: "#fff", fontFamily: "var(--font-barlow)" }}>
                  Scan Projects
                </button>
              </div>

              <div className="space-y-3">
                {LEADS.map((lead, i) => {
                  const isExpanded = expandedLead === lead.id;
                  const status = leadStatuses[lead.id];
                  return (
                    <motion.div key={lead.id}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.35 }}
                      style={{ background: "rgba(255,255,255,0.03)" }}>

                      <div className="flex items-center gap-5 px-6 py-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setExpandedLead(isExpanded ? null : lead.id)}>
                        <div className="display w-12 h-12 flex items-center justify-center font-black text-sm shrink-0"
                          style={{ background: "#E04020", fontFamily: "var(--font-barlow-condensed)" }}>{lead.score}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-bold text-sm text-white" style={{ fontFamily: "var(--font-barlow)" }}>{lead.director}</span>
                            <span className="text-white/20">—</span>
                            <span className="text-sm text-white/50 uppercase font-semibold" style={{ fontFamily: "var(--font-barlow-condensed)" }}>{lead.project}</span>
                          </div>
                          <div className="flex gap-4 text-[10px] uppercase tracking-wider text-white/30 mt-1 flex-wrap" style={{ fontFamily: "var(--font-barlow)" }}>
                            <span>{lead.stage}</span><span>·</span><span>{lead.festival}</span><span>·</span><span>{lead.match}</span>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-1 shrink-0"
                          style={{
                            fontFamily: "var(--font-barlow)",
                            background: status === "replied" ? "rgba(74,222,128,0.1)" : status === "sent" ? "rgba(96,165,250,0.1)" : "rgba(224,64,32,0.15)",
                            color:      status === "replied" ? "#4ade80"              : status === "sent" ? "#60a5fa"              : "#E04020",
                          }}>
                          {status === "replied" ? "Replied" : status === "sent" ? "Sent" : "Draft"}
                        </span>
                        <span className="text-white/20 text-xs">{isExpanded ? "▲" : "▼"}</span>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                            className="overflow-hidden">
                            <div className="px-6 pb-6 pt-4 border-t border-white/5">
                              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3" style={{ fontFamily: "var(--font-barlow)" }}>Generated Email</p>
                              <pre className="text-sm text-white/50 whitespace-pre-wrap leading-relaxed p-5 mb-5 font-sans"
                                style={{ background: "rgba(255,255,255,0.03)" }}>{lead.email}</pre>
                              <div className="flex gap-3">
                                {status === "draft" && <>
                                  <button onClick={() => setLeadStatuses({ ...leadStatuses, [lead.id]: "sent" })}
                                    className="text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2.5"
                                    style={{ background: "#E04020", color: "#fff", fontFamily: "var(--font-barlow)" }}>Send Email</button>
                                  <button className="text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 text-white/40 hover:text-white transition-colors"
                                    style={{ background: "rgba(255,255,255,0.06)", fontFamily: "var(--font-barlow)" }}>Edit Draft</button>
                                </>}
                                {status === "sent" && (
                                  <button onClick={() => setLeadStatuses({ ...leadStatuses, [lead.id]: "replied" })}
                                    className="text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 text-white/40 hover:text-white transition-colors"
                                    style={{ background: "rgba(255,255,255,0.06)", fontFamily: "var(--font-barlow)" }}>Mark Replied</button>
                                )}
                                {status === "replied" && (
                                  <p className="text-sm py-2" style={{ color: "#4ade80", fontFamily: "var(--font-barlow)" }}>
                                    This lead responded — follow up directly.
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── ANALYTICS ── */}
          {tab === "analytics" && (
            <motion.div key="analytics"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}>

              <div className="grid grid-cols-3 gap-4 mb-14">
                {[...ANALYTICS].sort((a, b) => b.weekPlays - a.weekPlays).slice(0, 3).map((t, i) => (
                  <motion.div key={t.id}
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="p-7" style={{ background: "rgba(255,255,255,0.03)" }}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4" style={{ fontFamily: "var(--font-barlow)" }}>No. {i + 1} This Week</p>
                    <p className="display text-2xl font-black text-white mb-1" style={{ fontFamily: "var(--font-barlow-condensed)" }}>{t.title}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/30 mb-5" style={{ fontFamily: "var(--font-barlow)" }}>{t.mood}</p>
                    <div className="display text-6xl font-black" style={{ fontFamily: "var(--font-barlow-condensed)", color: "#E04020" }}>{t.weekPlays}</div>
                    <div className="text-[10px] uppercase tracking-wider text-white/30 mt-1 mb-4" style={{ fontFamily: "var(--font-barlow)" }}>plays</div>
                    <div className="flex flex-wrap gap-1">
                      {t.locations.map((loc) => (
                        <span key={loc} className="text-[10px] uppercase tracking-wider px-2 py-0.5 text-white/30"
                          style={{ background: "rgba(255,255,255,0.06)", fontFamily: "var(--font-barlow)" }}>{loc}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <table className="w-full" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr className="border-b border-white/5">
                    {["Track","Mood","Total","This Week","Avg","Licensed",""].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold"
                        style={{ fontFamily: "var(--font-barlow)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ANALYTICS.map((t, i) => (
                    <motion.tr key={t.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 text-sm font-bold uppercase text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>{t.title}</td>
                      <td className="py-4 px-4 text-[10px] uppercase tracking-wider text-white/40" style={{ fontFamily: "var(--font-barlow)" }}>{t.mood}</td>
                      <td className="py-4 px-4 text-sm text-white/60" style={{ fontFamily: "var(--font-barlow)" }}>{formatPlays(t.plays)}</td>
                      <td className="py-4 px-4 text-sm font-bold text-white" style={{ fontFamily: "var(--font-barlow)" }}>{t.weekPlays}</td>
                      <td className="py-4 px-4 text-sm text-white/40" style={{ fontFamily: "var(--font-barlow)" }}>{t.avgDuration}</td>
                      <td className="py-4 px-4 text-sm font-bold" style={{ color: "#4ade80", fontFamily: "var(--font-barlow)" }}>{t.licensed}</td>
                      <td className="py-4 px-4 text-sm font-bold"
                        style={{ color: t.trend === "up" ? "#4ade80" : "rgba(255,255,255,0.2)", fontFamily: "var(--font-barlow)" }}>
                        {t.trend === "up" ? "↑" : "↓"}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
