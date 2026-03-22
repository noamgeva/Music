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

  const filteredTracks = selectedMood
    ? TRACKS.filter((t) => t.mood === selectedMood)
    : TRACKS;

  return (
    <div className="min-h-screen bg-white text-black">
      <LicenseModal track={licenseTrack} onClose={() => setLicenseTrack(null)} />

      {/* ── TOP NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-black flex items-stretch h-14">
        {/* Logo */}
        <div className="px-6 flex items-center border-r border-black shrink-0">
          <span
            className="text-base font-bold tracking-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            NOAM GEVA
          </span>
        </div>

        {/* Nav links */}
        <div className="flex flex-1 items-stretch">
          {(["catalog", "sync", "bespoke"] as Section[]).map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`px-6 text-[11px] uppercase tracking-[0.25em] font-semibold border-r border-black transition-colors ${
                section === s ? "bg-black text-white" : "hover:bg-zinc-50"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {s === "catalog" ? "Catalog" : s === "sync" ? "Visual Sync" : "Bespoke"}
            </button>
          ))}
        </div>

        {/* Studio link */}
        <Link
          href="/studio"
          className="px-6 flex items-center border-l border-black text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-black hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Studio ↗
        </Link>
      </nav>

      {/* ── HERO ── */}
      <header className="pt-14 border-b border-black">
        {/* Marquee ticker */}
        <div className="border-b border-black py-2.5 overflow-hidden bg-black text-white">
          <div className="marquee-inner">
            {Array(4).fill("ATMOSPHERIC CINEMA · WORLD MUSIC · INDEPENDENT FILM · ORIGINAL SCORING · ").map((t, i) => (
              <span key={i} className="text-[11px] uppercase tracking-[0.3em] mr-8 opacity-80" style={{ fontFamily: "var(--font-inter)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Main hero content */}
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black">
          {/* Left — Big headline */}
          <div className="px-8 py-16 lg:py-24 flex flex-col justify-between min-h-[420px]">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-8"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Film Music Licensing — Tel Aviv
              </p>
              <h1
                className="text-[72px] lg:text-[96px] font-bold leading-[0.9] italic tracking-tight mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Sound
                <br />
                <span className="not-italic font-light">that</span>
                <br />
                lives.
              </h1>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                Atmospheric, world-influenced compositions for directors who treat silence as a canvas.
              </p>
            </div>
            <div className="flex gap-3 mt-10">
              <button
                onClick={() => setSection("catalog")}
                className="px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-zinc-800 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Explore Catalog
              </button>
              <button
                onClick={() => setSection("bespoke")}
                className="px-6 py-3 border border-black text-xs uppercase tracking-[0.25em] font-semibold hover:bg-black hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Commission Score
              </button>
            </div>
          </div>

          {/* Right — Stats + mood preview */}
          <div className="flex flex-col divide-y divide-black">
            {/* Stats row */}
            <div className="grid grid-cols-2 divide-x divide-black">
              {[
                { value: "12+", label: "Catalog Tracks" },
                { value: "89", label: "Licenses Issued" },
                { value: "6", label: "Sonic Moods" },
                { value: "24h", label: "Response Time" },
              ].map((s, i) => (
                <div key={s.label} className={`px-8 py-8 ${i < 2 ? "border-b border-black" : ""}`}>
                  <div
                    className="text-5xl font-bold italic mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-[0.3em] text-zinc-400"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Featured moods */}
            <div className="flex-1 px-8 py-8">
              <p
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Six Sonic Worlds
              </p>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => { setSelectedMood(m.name); setSection("catalog"); }}
                    className="px-4 py-2 border border-zinc-200 hover:border-black text-sm transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {m.icon} {m.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main>

        {/* CATALOG */}
        {section === "catalog" && (
          <>
            <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />

            {/* Catalog header */}
            <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h2
                  className="text-2xl font-bold italic"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {selectedMood ?? "All Tracks"}
                </h2>
                <p
                  className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 mt-1"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {filteredTracks.length} tracks available for licensing
                </p>
              </div>
              {selectedMood && (
                <button
                  onClick={() => setSelectedMood(null)}
                  className="text-[11px] uppercase tracking-[0.2em] border border-zinc-200 hover:border-black px-4 py-2 transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Clear ×
                </button>
              )}
            </div>

            {/* Track grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-b border-black">
              {filteredTracks.map((track, i) => {
                const col = i % 3;
                const row = Math.floor(i / 3);
                return (
                  <div
                    key={track.id}
                    className={`border-black ${col < 2 ? "border-r" : ""} ${row > 0 ? "border-t" : "border-t"}`}
                  >
                    <TrackCard
                      track={track}
                      onLicense={setLicenseTrack}
                      onRequest={() => setSection("bespoke")}
                    />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* VISUAL SYNC */}
        {section === "sync" && <VisualSyncPreview />}

        {/* BESPOKE */}
        {section === "bespoke" && (
          <div>
            <div className="px-6 py-4 border-b border-black flex items-center justify-between">
              <span
                className="text-[10px] uppercase tracking-[0.25em] font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Bespoke Scoring
              </span>
              <span className="text-xs text-zinc-400">Commission an original score for your film</span>
            </div>

            {/* Big headline */}
            <div className="grid lg:grid-cols-2 border-b border-black divide-y lg:divide-y-0 lg:divide-x divide-black">
              <div className="px-8 py-16">
                <h2
                  className="text-[64px] lg:text-[80px] font-bold leading-[0.9] italic tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Every
                  <br />
                  <span className="font-light not-italic">film has</span>
                  <br />
                  a soul.
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed mt-6 max-w-xs">
                  Describe your vision and Noam will craft a score made only for your project — from a single theme to a full soundtrack.
                </p>
              </div>
              <div className="px-8 py-16">
                <BespokeForm />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── EDITORIAL STRIP ── */}
      <div className="border-t border-black border-b grid grid-cols-3 divide-x divide-black">
        {[
          { icon: "🌵", title: "World-Influenced", desc: "Oud, frame drum, and instruments that carry memory." },
          { icon: "🎬", title: "Cinema First", desc: "Every track is composed with picture in mind." },
          { icon: "⚡", title: "Fast Licensing", desc: "License in minutes. Custom in 48 hours." },
        ].map((item) => (
          <div key={item.title} className="px-8 py-10">
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3
              className="text-lg font-bold italic mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {item.title}
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-black">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-black border-b border-black">
          {/* Brand */}
          <div className="px-8 py-10 lg:col-span-2">
            <h2
              className="text-4xl font-bold italic mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Noam Geva
            </h2>
            <p className="text-sm text-zinc-500">
              Composer. Film Music. Tel Aviv.
            </p>
          </div>
          {/* Links */}
          <div className="px-8 py-10">
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Navigate
            </p>
            <div className="space-y-2">
              {(["catalog", "sync", "bespoke"] as Section[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSection(s)}
                  className="block text-sm hover:underline underline-offset-2 capitalize text-left"
                >
                  {s === "sync" ? "Visual Sync" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
              <Link href="/studio" className="block text-sm hover:underline underline-offset-2">Studio</Link>
            </div>
          </div>
          {/* Contact */}
          <div className="px-8 py-10">
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contact
            </p>
            <p className="text-sm text-zinc-600">noam@noamgeva.com</p>
            <p className="text-xs text-zinc-400 mt-1">Licensing enquiries welcome</p>
          </div>
        </div>
        <div className="px-8 py-4 flex items-center justify-between">
          <p className="text-[11px] text-zinc-400" style={{ fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} Noam Geva. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-300" style={{ fontFamily: "var(--font-inter)" }}>
            Film Music · Tel Aviv
          </p>
        </div>
      </footer>
    </div>
  );
}
