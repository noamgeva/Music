"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOODS, Mood, Track } from "@/lib/catalog";
import { loadTracks } from "@/lib/trackStore";
import MoodSelector from "@/components/MoodSelector";
import TrackCard from "@/components/TrackCard";
import VisualSyncPreview from "@/components/VisualSyncPreview";
import BespokeForm from "@/components/BespokeForm";
import LicenseModal from "@/components/LicenseModal";
import Link from "next/link";

type Section = "catalog" | "sync" | "bespoke";

const SECTION_LABELS: Record<Section, [string, string]> = {
  catalog: ["THE", "CATALOG"],
  sync:    ["VISUAL", "SYNC"],
  bespoke: ["BESPOKE", "SCORE"],
};

export default function HomePage() {
  const [selectedMood, setSelectedMood]   = useState<Mood | null>(null);
  const [licenseTrack, setLicenseTrack]   = useState<Track | null>(null);
  const [section, setSection]             = useState<Section>("catalog");
  const [prevSection, setPrevSection]     = useState<Section>("catalog");
  const [allTracks, setAllTracks]         = useState<Track[]>(() => loadTracks());
  const contentRef = useRef<HTMLDivElement>(null);

  /* Re-sync from localStorage whenever the tab gets focus (Studio may have changed tracks) */
  useEffect(() => {
    const sync = () => setAllTracks(loadTracks());
    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("focus", sync); window.removeEventListener("storage", sync); };
  }, []);

  const filteredTracks = selectedMood ? allTracks.filter((t) => t.mood === selectedMood) : allTracks;

  const goToSection = (s: Section) => {
    setPrevSection(section);
    setSection(s);
    // Small delay so the section switch animates first, then scroll
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <LicenseModal track={licenseTrack} onClose={() => setLicenseTrack(null)} />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
        <div className="max-w-screen-xl mx-auto px-10 h-16 flex items-center justify-between">
          <Link href="/" className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
            Noam Geva
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {(["catalog","sync","bespoke"] as Section[]).map((s) => (
              <button key={s} onClick={() => goToSection(s)}
                className="relative text-xs tracking-[0.2em] uppercase font-semibold transition-colors py-1"
                style={{ fontFamily: "var(--font-barlow)", color: section === s ? "#111" : "#aaa" }}>
                {s === "catalog" ? "Catalog" : s === "sync" ? "Visual Sync" : "Bespoke"}
                {/* Underline indicator */}
                {section === s && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-black"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <Link href="/bio"
              className="text-xs tracking-[0.2em] uppercase font-medium text-zinc-400 hover:text-black transition-colors"
              style={{ fontFamily: "var(--font-barlow)" }}>
              About
            </Link>
          </div>

          <Link href="/studio"
            className="text-xs tracking-[0.2em] uppercase font-semibold text-zinc-400 hover:text-black transition-colors"
            style={{ fontFamily: "var(--font-barlow)" }}>
            Studio
          </Link>
        </div>
      </nav>

      {/* ── HERO ── compressed to ~70vh so content shows below */}
      <section className="relative flex flex-col justify-center pt-16 bg-white"
        style={{ minHeight: "72vh" }}>
        {/* Vertical labels */}
        <div className="absolute left-5 bottom-10 hidden lg:flex flex-col items-center gap-3">
          <div className="w-px h-8 bg-zinc-200" />
          <span className="vertical-text text-[9px] tracking-[0.3em] uppercase text-zinc-300" style={{ fontFamily: "var(--font-barlow)" }}>
            © Noam Geva
          </span>
        </div>
        <div className="absolute right-5 bottom-10 hidden lg:flex flex-col items-center gap-3">
          <span className="vertical-text text-[9px] tracking-[0.3em] uppercase text-zinc-300" style={{ fontFamily: "var(--font-barlow)" }}>
            Film Music
          </span>
          <div className="w-px h-8 bg-zinc-200" />
        </div>

        <div className="max-w-screen-xl mx-auto px-10 lg:px-20 w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-6"
            style={{ fontFamily: "var(--font-barlow)" }}>
            Cinematic Music for Independent Film
          </motion.p>

          {/* Giant headline */}
          <h1 className="display select-none" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
            {[
              { text: "FILM",  weight: "font-black",  size: "19vw" },
              { text: "& SONIC", weight: "font-black", size: "13vw" },
              { text: "SCORE", weight: "font-thin",   size: "17vw" },
              { text: "MUSIC", weight: "font-black",  size: "20vw" },
            ].map((line, i) => (
              <motion.div key={line.text}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`${line.weight} leading-none uppercase tracking-tight`}
                style={{ fontSize: `clamp(52px, ${line.size}, 240px)`, lineHeight: 0.87 }}>
                {line.text}
              </motion.div>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-8 flex items-end justify-between flex-wrap gap-5">
            <div className="flex gap-5 flex-wrap">
              {[
                { label: "Explore Catalog", fn: () => goToSection("catalog"), primary: true },
                { label: "Commission Score", fn: () => goToSection("bespoke"), primary: false },
              ].map((btn) => (
                <motion.button key={btn.label} onClick={btn.fn}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-xs tracking-[0.2em] uppercase font-bold pb-0.5 transition-colors"
                  style={{
                    fontFamily: "var(--font-barlow)",
                    borderBottom: `2px solid ${btn.primary ? "#111" : "#ddd"}`,
                    color: btn.primary ? "#111" : "#aaa",
                  }}>
                  {btn.label}
                </motion.button>
              ))}
            </div>
            <p className="text-xs font-light text-zinc-400 text-right uppercase tracking-wider leading-snug"
              style={{ fontFamily: "var(--font-barlow)" }}>
              Atmospheric music<br />for independent film
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DARK SECTION ── scroll target */}
      <section ref={contentRef} className="bg-[#0a0a0a] text-white">

        {/* Split mega header — animates when section changes */}
        <div className="max-w-screen-xl mx-auto px-10 lg:px-16 pt-16 pb-0">
          <div className="flex items-end justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2 key={`left-${section}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="display font-black text-white"
                style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(56px, 11vw, 150px)", lineHeight: 1 }}>
                {SECTION_LABELS[section][0]}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.h2 key={`right-${section}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="display font-black text-white"
                style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(56px, 11vw, 150px)", lineHeight: 1 }}>
                {SECTION_LABELS[section][1]}
              </motion.h2>
            </AnimatePresence>
          </div>
          <motion.div className="w-full h-px bg-white/10 mt-4" layoutId="section-divider" />
        </div>

        {/* Section tabs */}
        <div className="max-w-screen-xl mx-auto px-10 lg:px-16 flex items-center gap-8 h-14 border-b border-white/5">
          {(["catalog","sync","bespoke"] as Section[]).map((s) => (
            <button key={s} onClick={() => goToSection(s)}
              className="relative text-[10px] uppercase tracking-[0.25em] font-semibold h-full flex items-center transition-colors"
              style={{
                fontFamily: "var(--font-barlow)",
                color: section === s ? "#fff" : "rgba(255,255,255,0.3)",
              }}>
              {s === "catalog" ? "Catalog" : s === "sync" ? "Visual Sync" : "Bespoke"}
              {section === s && (
                <motion.div
                  layoutId="section-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "#E04020" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content with AnimatePresence for section switching */}
        <div className="max-w-screen-xl mx-auto px-10 lg:px-16 py-14 min-h-[60vh]">
          <AnimatePresence mode="wait">
            {section === "catalog" && (
              <motion.div key="catalog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}>
                <div className="mb-10">
                  <MoodSelector selected={selectedMood} onSelect={setSelectedMood} dark />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                  {filteredTracks.map((track, i) => (
                    <motion.div key={track.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.35, ease: "easeOut" }}>
                      <TrackCard track={track} onLicense={setLicenseTrack} onRequest={() => goToSection("bespoke")} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {section === "sync" && (
              <motion.div key="sync"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}>
                <p className="text-sm text-white/40 mb-12 max-w-md" style={{ fontFamily: "var(--font-barlow)" }}>
                  Upload a silent cut of your scene and audition tracks against it in real time before licensing.
                </p>
                <VisualSyncPreview />
              </motion.div>
            )}

            {section === "bespoke" && (
              <motion.div key="bespoke"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}>
                <div className="grid lg:grid-cols-2 gap-20">
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="display font-black text-white mb-8 leading-none uppercase"
                      style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(48px, 7vw, 96px)" }}>
                      EVERY<br />
                      <span className="font-thin">FILM HAS</span><br />
                      A SOUL.
                    </motion.h3>
                    <p className="text-sm text-white/50 leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-barlow)" }}>
                      Describe your project and Noam will craft a score built only for your film.
                    </p>
                  </div>
                  <BespokeForm dark />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer stats */}
        <div className="border-t border-white/5 max-w-screen-xl mx-auto px-10 lg:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex gap-12 flex-wrap">
            {[
              { v:"12", l:"Tracks" },
              { v:"89", l:"Licenses issued" },
              { v:"6",  l:"Sonic moods" },
            ].map((s) => (
              <div key={s.l}>
                <div className="display text-5xl font-black text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>{s.v}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1" style={{ fontFamily: "var(--font-barlow)" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30 flex-wrap" style={{ fontFamily: "var(--font-barlow)" }}>
            {(["catalog","sync","bespoke"] as Section[]).map((s) => (
              <button key={s} onClick={() => goToSection(s)} className="hover:text-white transition-colors">
                {s === "sync" ? "Visual Sync" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <Link href="/bio" className="hover:text-white transition-colors">About</Link>
            <Link href="/studio" className="hover:text-white transition-colors">Studio</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
