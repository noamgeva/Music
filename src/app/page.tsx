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

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-zinc-200 flex items-stretch h-12"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <div className="px-8 flex items-center border-r border-zinc-200 shrink-0">
          <span className="text-sm font-bold tracking-tight">Noam Geva</span>
        </div>

        <div className="flex flex-1 items-stretch">
          {(["catalog", "sync", "bespoke"] as Section[]).map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`px-6 text-[10px] uppercase tracking-[0.25em] font-semibold border-r border-zinc-200 transition-colors ${
                section === s ? "bg-black text-white" : "hover:bg-zinc-50 text-zinc-500"
              }`}
            >
              {s === "catalog" ? "Catalog" : s === "sync" ? "Visual Sync" : "Bespoke"}
            </button>
          ))}
        </div>

        <Link
          href="/bio"
          className="px-6 flex items-center border-l border-zinc-200 text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-400 hover:bg-black hover:text-white transition-colors"
        >
          Bio
        </Link>
        <Link
          href="/studio"
          className="px-6 flex items-center border-l border-zinc-200 text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-400 hover:bg-black hover:text-white transition-colors"
        >
          Studio
        </Link>
      </nav>

      {/* ── HERO ── */}
      <header className="pt-12 border-b border-zinc-200">

        {/* Ticker */}
        <div className="border-b border-zinc-200 py-2.5 overflow-hidden">
          <div className="marquee-inner">
            {Array(6).fill("Film Music — Licensing — Original Scoring — Tel Aviv — ").map((t, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mr-12"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Hero grid */}
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">

          {/* Left — Headline */}
          <div className="px-8 py-16 lg:py-24 flex flex-col justify-between min-h-[380px]">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 mb-10"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Cinematic Music for Independent Film
              </p>
              <h1
                className="text-[80px] lg:text-[104px] font-bold leading-[0.88] italic tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Sound<br />
                <span className="font-light not-italic">that</span><br />
                lives.
              </h1>
            </div>
            <div className="flex gap-3 mt-10 flex-wrap" style={{ fontFamily: "var(--font-inter)" }}>
              <button
                onClick={() => setSection("catalog")}
                className="px-6 py-3 bg-black text-white text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-zinc-900 transition-colors"
              >
                Explore Catalog
              </button>
              <button
                onClick={() => setSection("bespoke")}
                className="px-6 py-3 border border-zinc-300 hover:border-black text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-600 hover:text-black transition-colors"
              >
                Commission Score
              </button>
            </div>
          </div>

          {/* Right — Stats + intro */}
          <div className="flex flex-col divide-y divide-zinc-200">
            <div className="grid grid-cols-2 divide-x divide-zinc-200">
              {[
                { value: "12",  label: "Catalog Tracks" },
                { value: "89",  label: "Licenses Issued" },
                { value: "6",   label: "Sonic Moods" },
                { value: "24h", label: "Response Time" },
              ].map((s, i) => (
                <div key={s.label} className={`px-8 py-8 ${i < 2 ? "border-b border-zinc-200" : ""}`}>
                  <div
                    className="text-5xl font-bold italic mb-1 leading-none"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mt-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-8 py-8 flex-1 flex flex-col justify-between">
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                Atmospheric, world-influenced compositions for directors who treat silence as a canvas.
                License instantly or commission something entirely your own.
              </p>
              <div className="mt-6 flex flex-wrap gap-2" style={{ fontFamily: "var(--font-inter)" }}>
                {MOODS.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => { setSelectedMood(m.name); setSection("catalog"); }}
                    className="text-[10px] uppercase tracking-wider px-3 py-1.5 border border-zinc-200 hover:border-black text-zinc-500 hover:text-black transition-colors"
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main>

        {/* Catalog */}
        {section === "catalog" && (
          <>
            <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />

            <div
              className="px-8 py-4 border-b border-zinc-100 flex items-center justify-between"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <div>
                <span className="text-sm font-semibold">
                  {selectedMood ?? "All Tracks"}
                </span>
                <span className="text-xs text-zinc-400 ml-3">
                  {filteredTracks.length} available
                </span>
              </div>
              {selectedMood && (
                <button
                  onClick={() => setSelectedMood(null)}
                  className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 border-b border-zinc-200">
              {filteredTracks.map((track, i) => (
                <div
                  key={track.id}
                  className={`border-zinc-200 ${
                    i % 3 < 2 ? "border-r" : ""
                  } border-b`}
                >
                  <TrackCard
                    track={track}
                    onLicense={setLicenseTrack}
                    onRequest={() => setSection("bespoke")}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Visual Sync */}
        {section === "sync" && <VisualSyncPreview />}

        {/* Bespoke */}
        {section === "bespoke" && (
          <div>
            <div
              className="px-8 py-4 border-b border-zinc-200 flex items-center justify-between"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">Bespoke Scoring</span>
              <span className="text-xs text-zinc-400">Commission an original score</span>
            </div>

            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
              <div className="px-8 py-16">
                <h2
                  className="text-[72px] font-bold leading-[0.9] italic"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Every<br />
                  <span className="font-light not-italic">film has</span><br />
                  a soul.
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed mt-8 max-w-xs">
                  Describe your vision and Noam will craft a score made only for your project —
                  from a single cue to a full soundtrack.
                </p>
              </div>
              <div className="px-8 py-16">
                <BespokeForm />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── THREE COLUMNS ── */}
      <div
        className="grid grid-cols-3 divide-x divide-zinc-200 border-t border-b border-zinc-200"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {[
          {
            label: "World-Influenced",
            body: "Oud, frame drum, and instruments that carry memory. Music rooted in place and time.",
          },
          {
            label: "Cinema First",
            body: "Every track is composed with picture in mind. Built for sync, scoring, and silence.",
          },
          {
            label: "Fast Licensing",
            body: "License in minutes. Custom scoring in 48 hours. Direct line to the composer.",
          },
        ].map((item) => (
          <div key={item.label} className="px-8 py-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4">{item.label}</p>
            <p className="text-sm text-zinc-600 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer
        className="border-t border-zinc-200"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200">
          <div className="px-8 py-10 lg:col-span-2">
            <h2
              className="text-3xl font-bold italic mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Noam Geva
            </h2>
            <p className="text-xs text-zinc-400">Composer. Film Music. Tel Aviv.</p>
          </div>
          <div className="px-8 py-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4">Navigate</p>
            <div className="space-y-2">
              {(["catalog", "sync", "bespoke"] as Section[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSection(s)}
                  className="block text-sm text-zinc-600 hover:text-black transition-colors text-left capitalize"
                >
                  {s === "sync" ? "Visual Sync" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
              <Link href="/bio" className="block text-sm text-zinc-600 hover:text-black transition-colors">
                Bio
              </Link>
              <Link href="/studio" className="block text-sm text-zinc-600 hover:text-black transition-colors">
                Studio
              </Link>
            </div>
          </div>
          <div className="px-8 py-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4">Contact</p>
            <p className="text-sm text-zinc-600">noam@noamgeva.com</p>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Licensing enquiries welcome</p>
          </div>
        </div>
        <div className="px-8 py-4 flex items-center justify-between">
          <p className="text-[10px] text-zinc-400">
            &copy; {new Date().getFullYear()} Noam Geva. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-300">noamgeva.com</p>
        </div>
      </footer>
    </div>
  );
}
