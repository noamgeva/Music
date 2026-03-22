"use client";

import { useState } from "react";
import { TRACKS, MOODS, Mood } from "@/lib/catalog";
import MoodSelector from "@/components/MoodSelector";
import TrackCard from "@/components/TrackCard";
import VisualSyncPreview from "@/components/VisualSyncPreview";
import BespokeForm from "@/components/BespokeForm";
import LicenseModal from "@/components/LicenseModal";
import { Track } from "@/lib/catalog";
import Link from "next/link";

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [licenseTrack, setLicenseTrack] = useState<Track | null>(null);
  const [activeSection, setActiveSection] = useState<"catalog" | "sync" | "bespoke">("catalog");

  const filteredTracks = selectedMood
    ? TRACKS.filter((t) => t.mood === selectedMood)
    : TRACKS;

  const activeMood = selectedMood ? MOODS.find((m) => m.name === selectedMood) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* License modal */}
      <LicenseModal track={licenseTrack} onClose={() => setLicenseTrack(null)} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div>
          <span className="text-white font-semibold tracking-tight text-lg">Noam Geva</span>
          <span className="text-white/30 text-xs ml-2 tracking-widest uppercase">Composer</span>
        </div>
        <div className="flex items-center gap-1">
          {(["catalog", "sync", "bespoke"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize"
              style={{
                background: activeSection === s ? "rgba(255,255,255,0.08)" : "transparent",
                color: activeSection === s ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              }}
            >
              {s === "catalog" ? "Catalog" : s === "sync" ? "Visual Sync" : "Bespoke"}
            </button>
          ))}
          <Link
            href="/studio"
            className="ml-3 px-4 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all"
          >
            Studio ↗
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header
        className="relative pt-32 pb-20 px-6 text-center overflow-hidden"
        style={{
          background: activeMood
            ? `linear-gradient(180deg, ${activeMood.color}12 0%, transparent 60%)`
            : "linear-gradient(180deg, rgba(212,168,83,0.06) 0%, transparent 60%)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-20 transition-all duration-1000 pointer-events-none"
          style={{ background: activeMood?.color ?? "#D4A853" }}
        />

        <div className="relative">
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">
            Cinematic Music for Independent Film
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-white/90 leading-tight mb-6">
            Sound that lives
            <br />
            <em className="italic" style={{ color: activeMood?.color ?? "#D4A853" }}>
              inside the frame
            </em>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto leading-relaxed text-base mb-10">
            Atmospheric, world-influenced compositions for directors who treat silence as a canvas.
            License instantly or commission something entirely your own.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => setActiveSection("catalog")}
              className="px-8 py-3.5 rounded-2xl font-medium text-sm text-black transition-all duration-300 hover:opacity-90"
              style={{ background: activeMood?.color ?? "#D4A853" }}
            >
              Explore Catalog
            </button>
            <button
              onClick={() => setActiveSection("bespoke")}
              className="px-8 py-3.5 rounded-2xl font-medium text-sm border border-white/10 text-white/60 hover:text-white/90 hover:border-white/25 transition-all duration-300"
            >
              Commission Original Score
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mt-16 flex items-center justify-center gap-12 text-center flex-wrap">
          {[
            { value: "12+", label: "Catalog Tracks" },
            { value: "89", label: "Licenses Issued" },
            { value: "6", label: "Sonic Moods" },
            { value: "24h", label: "Response Time" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-light" style={{ color: activeMood?.color ?? "#D4A85380" }}>
                {stat.value}
              </div>
              <div className="text-xs text-white/25 mt-1 tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeSection === "catalog" && (
          <>
            <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
            <section className="px-6 pb-20">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl text-white/80 font-light">
                      {selectedMood ? selectedMood : "All Tracks"}
                    </h2>
                    <p className="text-white/30 text-sm mt-1">{filteredTracks.length} tracks available</p>
                  </div>
                  {selectedMood && (
                    <button
                      onClick={() => setSelectedMood(null)}
                      className="text-xs text-white/30 hover:text-white/60 border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTracks.map((track) => (
                    <TrackCard
                      key={track.id}
                      track={track}
                      onLicense={setLicenseTrack}
                      onRequest={() => setActiveSection("bespoke")}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === "sync" && <VisualSyncPreview />}

        {activeSection === "bespoke" && (
          <section className="py-20 px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-white/30 text-sm tracking-[0.3em] uppercase mb-3">Bespoke Scoring</p>
                <h2 className="text-3xl text-white/90 font-light mb-4">
                  Commission an Original Score
                </h2>
                <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto">
                  Every film has a unique sonic soul. Describe your vision and Noam will craft something made only for your project.
                </p>
              </div>
              <BespokeForm />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white/50 font-medium">Noam Geva</p>
            <p className="text-white/20 text-xs mt-1">Composer · Film Music · Tel Aviv</p>
          </div>
          <div className="flex gap-6 text-xs text-white/25">
            <button onClick={() => setActiveSection("catalog")} className="hover:text-white/50 transition-colors">Catalog</button>
            <button onClick={() => setActiveSection("sync")} className="hover:text-white/50 transition-colors">Visual Sync</button>
            <button onClick={() => setActiveSection("bespoke")} className="hover:text-white/50 transition-colors">Commission</button>
            <Link href="/studio" className="hover:text-white/50 transition-colors">Studio Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
