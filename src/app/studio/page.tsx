"use client";

import { useState } from "react";
import { TRACKS, MOODS } from "@/lib/catalog";
import { formatPlays } from "@/lib/utils";
import Waveform from "@/components/Waveform";
import Link from "next/link";

const LEADS = [
  {
    id: "l1", director: "Aria Chen", project: "Dust & Meridian", stage: "Post-Production",
    festival: "Sundance 2026", match: "Desert Mysticism", score: 94, status: "draft",
    email: `Hi Aria,\n\nI came across "Dust & Meridian" in the Sundance 2026 selections and the story of displacement across arid landscapes resonated deeply.\n\nI'm Noam Geva, a Tel Aviv-based composer. My track "Sinai at Dawn" — oud and frame drum over a desert drone — might be the sonic texture your cut is looking for.\n\nI'd love to send you a preview against your latest assembly cut.\n\nWarm regards,\nNoam`,
  },
  {
    id: "l2", director: "Marcus Webb", project: "Neon Psalms", stage: "Picture Lock",
    festival: "SXSW 2026", match: "Neon Melancholy", score: 88, status: "sent",
    email: `Hi Marcus,\n\nCongratulations on "Neon Psalms" reaching picture lock.\n\nI noticed the film's visual language leans into fluorescent urban loneliness. My track "Glass City" was composed for exactly that register.\n\nWould you be open to a 15-minute listening session?\n\nBest,\nNoam`,
  },
  {
    id: "l3", director: "Priya Nair", project: "The Tribunal", stage: "Final Mix",
    festival: "Berlin 2026", match: "Ancient Tension", score: 91, status: "replied",
    email: `Dear Priya,\n\nI've been following "The Tribunal" — the weight of historical judgment you're navigating is remarkable.\n\nMy orchestral piece "The Tribunal" — built from slow string clusters and distant voices — was written for exactly this gravity.\n\nI'd be honored to send you the stems.\n\nRespectfully,\nNoam`,
  },
  {
    id: "l4", director: "James Ortega", project: "Signal/Noise", stage: "Post-Production",
    festival: "Tribeca 2026", match: "Cosmic Drift", score: 85, status: "draft",
    email: `Hi James,\n\nYour sci-fi project "Signal/Noise" caught my attention — communication across impossible distances is something I've explored in sound.\n\n"Pale Blue Signal" — a radio transmission from the edge of the solar system — might be exactly what your cut needs.\n\nBest,\nNoam`,
  },
];

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

  const totalPlays = TRACKS.reduce((s, t) => s + t.plays, 0);
  const totalLicenses = TRACKS.reduce((s, t) => s + t.licensed, 0);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Nav */}
      <nav className="border-b border-black flex items-stretch h-14 sticky top-0 bg-white z-40">
        <Link
          href="/"
          className="px-6 flex items-center border-r border-black text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-zinc-50 transition-colors shrink-0"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          ← Public Site
        </Link>
        <div className="px-6 flex items-center border-r border-black">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold" style={{ fontFamily: "var(--font-inter)" }}>
            Artist Studio
          </span>
        </div>
        <div className="flex flex-1 items-stretch">
          {(["assets", "scout", "analytics"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 text-[11px] uppercase tracking-[0.25em] font-semibold border-r border-black transition-colors ${
                tab === t ? "bg-black text-white" : "hover:bg-zinc-50"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t === "assets" ? "Assets" : t === "scout" ? "AI Scout" : "Analytics"}
            </button>
          ))}
        </div>
        <div className="px-4 flex items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] border border-black/20 px-2 py-1 text-zinc-400"
            style={{ fontFamily: "var(--font-inter)" }}>
            Private
          </span>
        </div>
      </nav>

      {/* Summary stats */}
      <div className="grid grid-cols-4 border-b border-black divide-x divide-black">
        {[
          { label: "Total Tracks", value: TRACKS.length },
          { label: "Total Plays", value: formatPlays(totalPlays) },
          { label: "Licenses Issued", value: totalLicenses },
          { label: "Active Leads", value: LEADS.filter((l) => leadStatuses[l.id] !== "replied").length },
        ].map((s) => (
          <div key={s.label} className="px-8 py-6">
            <div
              className="text-4xl font-bold italic mb-1"
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

      <main className="px-6 py-8">

        {/* ── ASSETS ── */}
        {tab === "assets" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold italic" style={{ fontFamily: "var(--font-playfair)" }}>
                Track Catalog
              </h2>
              <button
                className="px-5 py-2.5 border border-black text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-black hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                + Upload Track
              </button>
            </div>
            <div className="border border-black divide-y divide-zinc-100">
              {TRACKS.map((track) => {
                const mood = MOODS.find((m) => m.name === track.mood);
                return (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-zinc-50 transition-colors group"
                  >
                    <button className="w-9 h-9 border border-black flex items-center justify-center shrink-0 hover:bg-black hover:text-white transition-colors">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: 1 }}>
                        <path d="M2 1.5L11 6L2 10.5V1.5Z"/>
                      </svg>
                    </button>
                    <div className="w-44 shrink-0">
                      <p className="text-sm font-bold italic" style={{ fontFamily: "var(--font-playfair)" }}>{track.title}</p>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                        {mood?.icon} {track.mood}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Waveform data={track.waveform} color="#0a0a0a" height={24} />
                    </div>
                    <div className="flex items-center gap-6 text-xs text-zinc-400 shrink-0" style={{ fontFamily: "var(--font-inter)" }}>
                      <span>{track.duration}</span>
                      <span className="font-semibold text-black">{track.bpm} BPM</span>
                      <span>{track.key}</span>
                      <span>{formatPlays(track.plays)} plays</span>
                      <span className="text-green-700 font-semibold">{track.licensed}× licensed</span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button className="px-3 py-1.5 border border-zinc-200 hover:border-black text-xs transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Edit</button>
                      <button className="px-3 py-1.5 border border-zinc-200 hover:border-black text-xs transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Tags</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── AI SCOUT ── */}
        {tab === "scout" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold italic" style={{ fontFamily: "var(--font-playfair)" }}>
                  AI Scout — Active Leads
                </h2>
                <p className="text-xs text-zinc-400 mt-1">Personalized outreach matched to films in post-production.</p>
              </div>
              <button
                className="px-5 py-2.5 border border-black text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-black hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Scan New Projects
              </button>
            </div>
            <div className="border border-black divide-y divide-black">
              {LEADS.map((lead) => {
                const isExpanded = expandedLead === lead.id;
                const status = leadStatuses[lead.id];
                return (
                  <div key={lead.id}>
                    <div
                      className="flex items-center gap-5 px-5 py-5 cursor-pointer hover:bg-zinc-50 transition-colors"
                      onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                    >
                      {/* Score */}
                      <div className="w-12 h-12 border border-black flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold" style={{ fontFamily: "var(--font-inter)" }}>{lead.score}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-sm">{lead.director}</span>
                          <span className="text-zinc-300">·</span>
                          <span className="text-sm italic text-zinc-600" style={{ fontFamily: "var(--font-playfair)" }}>{lead.project}</span>
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-1 flex gap-3" style={{ fontFamily: "var(--font-inter)" }}>
                          <span className="uppercase tracking-wider">{lead.stage}</span>
                          <span>·</span>
                          <span>{lead.festival}</span>
                          <span>·</span>
                          <span>Match: {lead.match}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <span
                          className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1 border font-semibold ${
                            status === "replied"
                              ? "border-green-300 text-green-700 bg-green-50"
                              : status === "sent"
                              ? "border-blue-200 text-blue-600"
                              : "border-zinc-200 text-zinc-500"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {status === "replied" ? "✓ Replied" : status === "sent" ? "Sent" : "Draft"}
                        </span>
                        <span className="text-zinc-300 text-xs">{isExpanded ? "▲" : "▼"}</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-zinc-100 pt-4 bg-zinc-50">
                        <p
                          className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-3"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          Generated Email
                        </p>
                        <pre className="text-sm text-zinc-600 whitespace-pre-wrap font-sans leading-relaxed border border-zinc-200 bg-white p-4 mb-4">
                          {lead.email}
                        </pre>
                        <div className="flex gap-3">
                          {status === "draft" && (
                            <>
                              <button
                                onClick={() => setLeadStatuses({ ...leadStatuses, [lead.id]: "sent" })}
                                className="px-5 py-2.5 bg-black text-white text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-zinc-800 transition-colors"
                                style={{ fontFamily: "var(--font-inter)" }}
                              >
                                Send Email
                              </button>
                              <button
                                className="px-5 py-2.5 border border-black text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-black hover:text-white transition-colors"
                                style={{ fontFamily: "var(--font-inter)" }}
                              >
                                Edit Draft
                              </button>
                            </>
                          )}
                          {status === "sent" && (
                            <button
                              onClick={() => setLeadStatuses({ ...leadStatuses, [lead.id]: "replied" })}
                              className="px-5 py-2.5 border border-black text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-black hover:text-white transition-colors"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              Mark as Replied
                            </button>
                          )}
                          {status === "replied" && (
                            <p className="text-sm text-green-700 py-2">✓ This lead responded — follow up in your inbox.</p>
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

        {/* ── ANALYTICS ── */}
        {tab === "analytics" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold italic mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                Engagement Analytics
              </h2>
              <p className="text-xs text-zinc-400">Real-time track performance. Use this to prioritize follow-ups.</p>
            </div>

            {/* Top 3 */}
            <div className="grid grid-cols-3 gap-0 border border-black divide-x divide-black mb-8">
              {[...ANALYTICS].sort((a, b) => b.weekPlays - a.weekPlays).slice(0, 3).map((t, i) => {
                const mood = MOODS.find((m) => m.name === t.mood);
                return (
                  <div key={t.id} className="px-8 py-6">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-inter)" }}>
                      <span>#{i + 1} This Week</span>
                    </div>
                    <p className="text-xl font-bold italic mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{t.title}</p>
                    <p className="text-[11px] text-zinc-400 mb-4" style={{ fontFamily: "var(--font-inter)" }}>{mood?.icon} {t.mood}</p>
                    <div className="text-5xl font-bold italic" style={{ fontFamily: "var(--font-playfair)" }}>{t.weekPlays}</div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-400 mt-1" style={{ fontFamily: "var(--font-inter)" }}>plays this week</div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {t.locations.map((loc) => (
                        <span key={loc} className="text-[10px] border border-zinc-200 px-2 py-0.5 text-zinc-500">{loc}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table */}
            <div className="border border-black overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black bg-zinc-50">
                    {["Track", "Mood", "Total Plays", "This Week", "Avg Listen", "Licensed", ""].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-semibold"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {ANALYTICS.map((t) => {
                    const mood = MOODS.find((m) => m.name === t.mood);
                    return (
                      <tr key={t.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="px-5 py-3.5 font-bold italic text-sm" style={{ fontFamily: "var(--font-playfair)" }}>{t.title}</td>
                        <td className="px-5 py-3.5 text-xs text-zinc-500">{mood?.icon} {t.mood}</td>
                        <td className="px-5 py-3.5 text-sm font-medium">{formatPlays(t.plays)}</td>
                        <td className="px-5 py-3.5 text-sm font-bold">{t.weekPlays}</td>
                        <td className="px-5 py-3.5 text-sm text-zinc-400">{t.avgDuration}</td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-green-700">{t.licensed}×</td>
                        <td className="px-5 py-3.5 text-sm font-bold">
                          <span className={t.trend === "up" ? "text-green-600" : "text-red-500"}>
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
