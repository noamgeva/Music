"use client";

import { useState } from "react";
import { TRACKS, MOODS } from "@/lib/catalog";
import { formatPlays } from "@/lib/utils";
import Waveform from "@/components/Waveform";
import Link from "next/link";

// ── Mock AI outreach leads ──────────────────────────────────────────────────
const LEADS = [
  {
    id: "l1",
    director: "Aria Chen",
    project: "Dust & Meridian",
    stage: "Post-Production",
    genre: "Desert Drama",
    festival: "Sundance 2026",
    match: "Desert Mysticism",
    score: 94,
    email: `Hi Aria,\n\nI came across "Dust & Meridian" in the Sundance 2026 selections and the story of displacement across arid landscapes resonated deeply.\n\nI'm Noam Geva, a Tel Aviv-based composer specializing in world-influenced cinematic music. My track "Sinai at Dawn" — oud and frame drum over a desert drone — might be the sonic texture your cut is looking for.\n\nI'd love to send you a preview against your latest assembly cut. No commitment, just a conversation about sound.\n\nWarm regards,\nNoam`,
    status: "draft",
  },
  {
    id: "l2",
    director: "Marcus Webb",
    project: "Neon Psalms",
    stage: "Picture Lock",
    genre: "Urban Noir",
    festival: "SXSW 2026",
    match: "Neon Melancholy",
    score: 88,
    email: `Hi Marcus,\n\nCongratulations on "Neon Psalms" reaching picture lock — that's a significant milestone.\n\nI noticed the film's visual language leans into the fluorescent loneliness of modern cities. My track "Glass City" — shimmering synth pads beneath a fractured guitar motif — was composed precisely for that emotional register.\n\nWould you be open to a 15-minute listening session? I have a full sync preview tool where you can drop in your cut and audition the track live.\n\nBest,\nNoam`,
    status: "sent",
  },
  {
    id: "l3",
    director: "Priya Nair",
    project: "The Tribunal",
    stage: "Final Mix",
    genre: "Historical Drama",
    festival: "Berlin 2026",
    match: "Ancient Tension",
    score: 91,
    email: `Dear Priya,\n\nI've been following the development of "The Tribunal" and the weight of historical judgment you're navigating is remarkable.\n\nMy orchestral piece — also called "The Tribunal" — built from slow string clusters and distant voices, was written for exactly this: the gravity of justice, memory, and consequence.\n\nI believe there's a genuine resonance here worth exploring. I'd be honored to send you the stems.\n\nRespectfully,\nNoam`,
    status: "replied",
  },
  {
    id: "l4",
    director: "James Ortega",
    project: "Signal/Noise",
    stage: "Post-Production",
    genre: "Sci-Fi",
    festival: "Tribeca 2026",
    match: "Cosmic Drift",
    score: 85,
    email: `Hi James,\n\nYour sci-fi project "Signal/Noise" caught my attention — the premise of communication across impossible distances is one I've been exploring in sound.\n\n"Pale Blue Signal" is a track I composed for this exact emotional space: a radio transmission from the edge of the solar system, hauntingly human in its isolation.\n\nHappy to send you the full track and a sync-ready version at no cost for your audition.\n\nBest,\nNoam`,
    status: "draft",
  },
];

// ── Mock analytics ──────────────────────────────────────────────────────────
const ANALYTICS = TRACKS.map((t) => ({
  ...t,
  weekPlays: Math.floor(Math.random() * 200 + 20),
  locations: ["Tel Aviv", "New York", "Los Angeles", "London", "Berlin"].slice(0, Math.floor(Math.random() * 3 + 2)),
  avgDuration: `${Math.floor(Math.random() * 2 + 1)}:${String(Math.floor(Math.random() * 59)).padStart(2, "0")}`,
  trend: Math.random() > 0.4 ? "up" : "down",
}));

type Tab = "assets" | "scout" | "analytics";

export default function StudioPage() {
  const [tab, setTab] = useState<Tab>("assets");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [leadStatuses, setLeadStatuses] = useState<Record<string, string>>(
    Object.fromEntries(LEADS.map((l) => [l.id, l.status]))
  );

  const totalPlays = TRACKS.reduce((sum, t) => sum + t.plays, 0);
  const totalLicenses = TRACKS.reduce((sum, t) => sum + t.licensed, 0);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Studio Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">
            ← Public Site
          </Link>
          <span className="text-white/10">|</span>
          <span className="text-white/70 font-semibold text-sm">Artist Studio</span>
          <span
            className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
          >
            Private
          </span>
        </div>
        <div className="flex items-center gap-1">
          {(["assets", "scout", "analytics"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize"
              style={{
                background: tab === t ? "rgba(255,255,255,0.08)" : "transparent",
                color: tab === t ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              }}
            >
              {t === "assets" ? "📁 Assets" : t === "scout" ? "🎯 AI Scout" : "📊 Analytics"}
            </button>
          ))}
        </div>
      </nav>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 px-6 py-6 border-b border-white/5">
        {[
          { label: "Total Tracks", value: TRACKS.length, color: "#D4A853" },
          { label: "Total Plays", value: formatPlays(totalPlays), color: "#6B8CAE" },
          { label: "Licenses Issued", value: totalLicenses, color: "#5C7A3E" },
          { label: "Active Leads", value: LEADS.filter((l) => leadStatuses[l.id] !== "replied").length, color: "#9B5DE5" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
          >
            <p className="text-xs text-white/30 uppercase tracking-wider mb-2">{s.label}</p>
            <p className="text-3xl font-light" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <main className="px-6 py-8">
        {/* ── ASSETS TAB ── */}
        {tab === "assets" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white/70 font-light text-xl">Track Catalog</h2>
              <button className="px-4 py-2 rounded-xl border border-white/10 text-xs text-white/40 hover:text-white/70 hover:border-white/20 transition-all">
                + Upload Track
              </button>
            </div>
            <div className="space-y-2">
              {TRACKS.map((track) => {
                const mood = MOODS.find((m) => m.name === track.mood);
                return (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
                  >
                    {/* Play button */}
                    <button
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0 hover:border-white/25 transition-all"
                      style={{ background: `${mood?.color}11` }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill={mood?.color} style={{ marginLeft: 1 }}>
                        <path d="M2 1L11 6L2 11V1Z" />
                      </svg>
                    </button>

                    {/* Title + mood */}
                    <div className="w-44 shrink-0">
                      <p className="text-white/80 text-sm font-medium">{track.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: mood?.color }}>{mood?.icon} {track.mood}</p>
                    </div>

                    {/* Waveform */}
                    <div className="flex-1 min-w-0">
                      <Waveform data={track.waveform} color={mood?.color} height={28} />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-xs text-white/30 shrink-0">
                      <span>{track.duration}</span>
                      <span>{track.bpm} BPM</span>
                      <span>{track.key}</span>
                      <span>{formatPlays(track.plays)} plays</span>
                      <span className="text-green-400/70">{track.licensed} licensed</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1 rounded-lg bg-white/5 text-xs text-white/40 hover:text-white/70 transition-colors">Edit</button>
                      <button className="px-3 py-1 rounded-lg bg-white/5 text-xs text-white/40 hover:text-white/70 transition-colors">Tags</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── AI SCOUT TAB ── */}
        {tab === "scout" && (
          <div>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-white/70 font-light text-xl">AI Scout — Active Leads</h2>
                <button className="px-4 py-2 rounded-xl border border-white/10 text-xs text-white/40 hover:text-white/70 transition-all">
                  🔄 Scan New Projects
                </button>
              </div>
              <p className="text-white/30 text-sm">
                AI-generated outreach emails matched to films currently in post-production. Review, edit, and send.
              </p>
            </div>

            <div className="space-y-4">
              {LEADS.map((lead) => {
                const mood = MOODS.find((m) => m.name === lead.match);
                const status = leadStatuses[lead.id];
                const isExpanded = expandedLead === lead.id;

                return (
                  <div
                    key={lead.id}
                    className="rounded-2xl border overflow-hidden transition-all duration-300"
                    style={{
                      borderColor: status === "replied" ? "rgba(74,222,128,0.2)" : "rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.015)",
                    }}
                  >
                    {/* Lead header */}
                    <div
                      className="flex items-center gap-4 p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                      onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                    >
                      {/* Match score */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border"
                        style={{ color: mood?.color, borderColor: `${mood?.color}44`, background: `${mood?.color}10` }}
                      >
                        {lead.score}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white/80 font-medium text-sm">{lead.director}</p>
                          <span className="text-white/20">·</span>
                          <p className="text-white/50 text-sm italic">{lead.project}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-white/30">
                          <span>{lead.stage}</span>
                          <span>·</span>
                          <span>{lead.festival}</span>
                          <span>·</span>
                          <span>Matched: </span>
                          <span style={{ color: mood?.color }}>{mood?.icon} {lead.match}</span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className="text-xs px-3 py-1 rounded-full border"
                          style={{
                            color: status === "replied" ? "#4ade80" : status === "sent" ? "#60a5fa" : "#D4A853",
                            borderColor: status === "replied" ? "#4ade8033" : status === "sent" ? "#60a5fa33" : "#D4A85333",
                            background: status === "replied" ? "#4ade8010" : status === "sent" ? "#60a5fa10" : "#D4A85310",
                          }}
                        >
                          {status === "replied" ? "✓ Replied" : status === "sent" ? "Sent" : "Draft"}
                        </span>
                        <span className="text-white/20 text-xs">{isExpanded ? "▲" : "▼"}</span>
                      </div>
                    </div>

                    {/* Expanded email */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-white/5 pt-4">
                        <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Generated Email</p>
                        <div className="bg-white/[0.03] rounded-xl p-4 mb-4">
                          <pre className="text-sm text-white/60 whitespace-pre-wrap font-sans leading-relaxed">
                            {lead.email}
                          </pre>
                        </div>
                        <div className="flex gap-3">
                          {status === "draft" && (
                            <>
                              <button
                                onClick={() => setLeadStatuses({ ...leadStatuses, [lead.id]: "sent" })}
                                className="px-5 py-2 rounded-xl text-xs font-semibold text-black transition-all"
                                style={{ background: mood?.color }}
                              >
                                Send Email
                              </button>
                              <button className="px-5 py-2 rounded-xl text-xs border border-white/10 text-white/40 hover:text-white/70 transition-colors">
                                Edit Draft
                              </button>
                            </>
                          )}
                          {status === "sent" && (
                            <button
                              onClick={() => setLeadStatuses({ ...leadStatuses, [lead.id]: "replied" })}
                              className="px-5 py-2 rounded-xl text-xs border border-white/10 text-white/40 hover:text-white/70 transition-colors"
                            >
                              Mark as Replied
                            </button>
                          )}
                          {status === "replied" && (
                            <span className="text-xs text-green-400/70 py-2">✓ This lead responded — follow up in your inbox.</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ANALYTICS TAB ── */}
        {tab === "analytics" && (
          <div>
            <div className="mb-8">
              <h2 className="text-white/70 font-light text-xl mb-2">Engagement Analytics</h2>
              <p className="text-white/30 text-sm">Real-time track performance. Use this data to prioritize follow-ups.</p>
            </div>

            {/* Top performers */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {ANALYTICS.sort((a, b) => b.weekPlays - a.weekPlays)
                .slice(0, 3)
                .map((t, i) => {
                  const mood = MOODS.find((m) => m.name === t.mood);
                  return (
                    <div
                      key={t.id}
                      className="rounded-2xl border border-white/5 p-5"
                      style={{ background: `${mood?.color}08` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-white/20 text-xs">#{i + 1}</span>
                        <span className="text-white/60 text-sm font-medium">{t.title}</span>
                      </div>
                      <div className="text-3xl font-light mb-1" style={{ color: mood?.color }}>
                        {t.weekPlays}
                      </div>
                      <div className="text-xs text-white/30">plays this week</div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {t.locations.map((loc) => (
                          <span key={loc} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Full table */}
            <div className="rounded-2xl border border-white/5 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-xs text-white/30 uppercase tracking-wider">
                    <th className="text-left px-5 py-3">Track</th>
                    <th className="text-left px-5 py-3">Mood</th>
                    <th className="text-right px-5 py-3">Total Plays</th>
                    <th className="text-right px-5 py-3">This Week</th>
                    <th className="text-right px-5 py-3">Avg Listen</th>
                    <th className="text-right px-5 py-3">Licensed</th>
                    <th className="text-right px-5 py-3">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {ANALYTICS.map((t) => {
                    const mood = MOODS.find((m) => m.name === t.mood);
                    return (
                      <tr
                        key={t.id}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-5 py-3.5 text-white/70 font-medium">{t.title}</td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs" style={{ color: mood?.color }}>{mood?.icon} {t.mood}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right text-white/50">{formatPlays(t.plays)}</td>
                        <td className="px-5 py-3.5 text-right text-white/70">{t.weekPlays}</td>
                        <td className="px-5 py-3.5 text-right text-white/40">{t.avgDuration}</td>
                        <td className="px-5 py-3.5 text-right text-green-400/70">{t.licensed}</td>
                        <td className="px-5 py-3.5 text-right">
                          <span className={t.trend === "up" ? "text-green-400" : "text-red-400/70"}>
                            {t.trend === "up" ? "↑" : "↓"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
