"use client";

import { useState } from "react";
import { TRACKS, MOODS, Mood, Track } from "@/lib/catalog";
import MoodSelector from "@/components/MoodSelector";
import TrackCard from "@/components/TrackCard";
import VisualSyncPreview from "@/components/VisualSyncPreview";
import BespokeForm from "@/components/BespokeForm";
import LicenseModal from "@/components/LicenseModal";
import Link from "next/link";

type Section = "catalog" | "sync" | "bespoke";

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [licenseTrack, setLicenseTrack] = useState<Track | null>(null);
  const [section, setSection] = useState<Section>("catalog");

  const filteredTracks = selectedMood ? TRACKS.filter((t) => t.mood === selectedMood) : TRACKS;

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <LicenseModal track={licenseTrack} onClose={() => setLicenseTrack(null)} />

      {/* ── NAV ── white, centered links */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-10 h-16 flex items-center justify-between">
          <Link href="/" className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
            Noam Geva
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: "Catalog",     fn: () => setSection("catalog") },
              { label: "Visual Sync", fn: () => setSection("sync") },
              { label: "Bespoke",     fn: () => setSection("bespoke") },
            ].map((item) => (
              <button key={item.label} onClick={item.fn}
                className="text-xs tracking-[0.2em] uppercase font-medium text-zinc-500 hover:text-black transition-colors"
                style={{ fontFamily: "var(--font-barlow)" }}>
                {item.label}
              </button>
            ))}
            <Link href="/bio" className="text-xs tracking-[0.2em] uppercase font-medium text-zinc-500 hover:text-black transition-colors"
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

      {/* ── HERO ── white background, massive bold type */}
      <section className="relative min-h-screen flex flex-col justify-center pt-16 bg-white">
        {/* Left vertical label */}
        <div className="absolute left-5 bottom-20 hidden lg:flex flex-col items-center gap-3">
          <div className="w-px h-10 bg-zinc-300" />
          <span className="vertical-text text-[9px] tracking-[0.3em] uppercase text-zinc-400" style={{ fontFamily: "var(--font-barlow)" }}>
            © Noam Geva
          </span>
        </div>
        {/* Right vertical label */}
        <div className="absolute right-5 bottom-20 hidden lg:flex flex-col items-center gap-3">
          <span className="vertical-text text-[9px] tracking-[0.3em] uppercase text-zinc-400" style={{ fontFamily: "var(--font-barlow)" }}>
            Film Music
          </span>
          <div className="w-px h-10 bg-zinc-300" />
        </div>

        <div className="max-w-screen-xl mx-auto px-10 lg:px-20 w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-8" style={{ fontFamily: "var(--font-barlow)" }}>
            Cinematic Music for Independent Film
          </p>

          {/* Giant headline — mixed weights */}
          <h1 className="display leading-none select-none" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
            <div className="text-[20vw] font-black" style={{ lineHeight: 0.85 }}>
              FILM
            </div>
            <div className="flex items-baseline" style={{ fontSize: "13vw", lineHeight: 0.85 }}>
              <span className="font-black">&amp;&nbsp;SONIC</span>
            </div>
            <div className="font-thin" style={{ fontSize: "17vw", lineHeight: 0.85 }}>
              SCORE
            </div>
            <div className="font-black" style={{ fontSize: "20vw", lineHeight: 0.85 }}>
              MUSIC
            </div>
          </h1>

          {/* Bottom row */}
          <div className="mt-10 flex items-end justify-between flex-wrap gap-6">
            <div className="flex gap-5 flex-wrap">
              <button onClick={() => setSection("catalog")}
                className="text-xs tracking-[0.2em] uppercase font-bold border-b-2 border-black pb-0.5 hover:text-zinc-500 hover:border-zinc-400 transition-all"
                style={{ fontFamily: "var(--font-barlow)" }}>
                Explore Catalog
              </button>
              <button onClick={() => setSection("bespoke")}
                className="text-xs tracking-[0.2em] uppercase font-medium border-b border-zinc-300 pb-0.5 text-zinc-400 hover:text-black hover:border-black transition-all"
                style={{ fontFamily: "var(--font-barlow)" }}>
                Commission Score
              </button>
            </div>
            <p className="text-xs font-light text-zinc-500 text-right uppercase tracking-wider leading-snug"
              style={{ fontFamily: "var(--font-barlow)" }}>
              Atmospheric music<br />for independent film
            </p>
          </div>
        </div>

        {/* Down arrow */}
        <div className="flex justify-center mt-16 mb-8">
          <svg width="18" height="26" viewBox="0 0 18 26" fill="none" className="opacity-25">
            <path d="M9 0V22M1 15L9 23L17 15" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </section>

      {/* ── CATALOG / SYNC / BESPOKE — dark section ── */}
      <section className="bg-[#0a0a0a] text-white">

        {/* Split mega-header */}
        <div className="max-w-screen-xl mx-auto px-10 lg:px-16 pt-20 pb-0">
          <div className="flex items-end justify-between">
            <h2 className="display font-black text-white" style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(60px, 12vw, 160px)", lineHeight: 1 }}>
              {section === "catalog" ? "THE" : section === "sync" ? "VISUAL" : "BESPOKE"}
            </h2>
            <h2 className="display font-black text-white" style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(60px, 12vw, 160px)", lineHeight: 1 }}>
              {section === "catalog" ? "CATALOG" : section === "sync" ? "SYNC" : "SCORE"}
            </h2>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mt-4 mb-0" />
        </div>

        {/* Section nav */}
        <div className="max-w-screen-xl mx-auto px-10 lg:px-16 flex items-center gap-8 h-14 border-b border-white/8">
          {(["catalog", "sync", "bespoke"] as Section[]).map((s) => (
            <button key={s} onClick={() => setSection(s)}
              className="text-[10px] uppercase tracking-[0.25em] font-semibold h-full border-b-2 flex items-center transition-colors"
              style={{
                fontFamily: "var(--font-barlow)",
                borderColor: section === s ? "#E04020" : "transparent",
                color: section === s ? "#fff" : "rgba(255,255,255,0.3)",
              }}>
              {s === "catalog" ? "Catalog" : s === "sync" ? "Visual Sync" : "Bespoke"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-screen-xl mx-auto px-10 lg:px-16 py-16">

          {/* CATALOG */}
          {section === "catalog" && (
            <>
              <div className="mb-12">
                <MoodSelector selected={selectedMood} onSelect={setSelectedMood} dark />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                {filteredTracks.map((track) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    onLicense={setLicenseTrack}
                    onRequest={() => setSection("bespoke")}
                  />
                ))}
              </div>
            </>
          )}

          {/* VISUAL SYNC */}
          {section === "sync" && (
            <div>
              <p className="text-sm text-white/40 mb-12 max-w-md" style={{ fontFamily: "var(--font-barlow)" }}>
                Upload a silent cut of your scene and audition tracks against it in real time before licensing.
              </p>
              <VisualSyncPreview />
            </div>
          )}

          {/* BESPOKE */}
          {section === "bespoke" && (
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h3 className="display font-black text-white mb-8 leading-none"
                  style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(48px, 7vw, 96px)" }}>
                  EVERY<br />
                  <span className="font-thin">FILM HAS</span><br />
                  A SOUL.
                </h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-barlow)" }}>
                  Describe your project and Noam will craft a score built only for your film — from a single cue to a full soundtrack.
                </p>
              </div>
              <BespokeForm dark />
            </div>
          )}
        </div>

        {/* Stats footer */}
        <div className="border-t border-white/8 max-w-screen-xl mx-auto px-10 lg:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex gap-12 flex-wrap">
            {[
              { v: "12", l: "Tracks in catalog" },
              { v: "89", l: "Licenses issued" },
              { v: "6",  l: "Sonic moods" },
            ].map((s) => (
              <div key={s.l}>
                <div className="display text-5xl font-black text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>{s.v}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1" style={{ fontFamily: "var(--font-barlow)" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30 flex-wrap" style={{ fontFamily: "var(--font-barlow)" }}>
            {(["catalog", "sync", "bespoke"] as Section[]).map((s) => (
              <button key={s} onClick={() => setSection(s)} className="hover:text-white transition-colors">
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
