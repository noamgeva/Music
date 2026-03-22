"use client";

import { useState } from "react";
import { TRACKS, MOODS } from "@/lib/catalog";
import { formatPlays } from "@/lib/utils";
import Waveform from "@/components/Waveform";
import Link from "next/link";

const LEADS = [
  {
    id: "l1", director: "Aria Chen", project: "Dust & Meridian",
    stage: "Post-Production", festival: "Sundance 2026", match: "Desert Mysticism", score: 94, status: "draft",
    email: `Hi Aria,\n\nI came across "Dust & Meridian" in the Sundance 2026 selections and the story of displacement across arid landscapes resonated deeply.\n\nI'm Noam Geva, a Tel Aviv-based composer. My track "Sinai at Dawn" — oud and frame drum over a desert drone — might be the sonic texture your cut is looking for.\n\nI'd love to send you a preview against your latest assembly cut.\n\nWarm regards,\nNoam`,
  },
  {
    id: "l2", director: "Marcus Webb", project: "Neon Psalms",
    stage: "Picture Lock", festival: "SXSW 2026", match: "Neon Melancholy", score: 88, status: "sent",
    email: `Hi Marcus,\n\nCongratulations on "Neon Psalms" reaching picture lock.\n\nI noticed the film's visual language leans into fluorescent urban loneliness. My track "Glass City" was composed for exactly that register.\n\nWould you be open to a 15-minute listening session?\n\nBest,\nNoam`,
  },
  {
    id: "l3", director: "Priya Nair", project: "The Tribunal",
    stage: "Final Mix", festival: "Berlin 2026", match: "Ancient Tension", score: 91, status: "replied",
    email: `Dear Priya,\n\nI've been following "The Tribunal" — the weight of historical judgment you're navigating is remarkable.\n\nMy orchestral piece "The Tribunal" — built from slow string clusters and distant voices — was written for exactly this gravity.\n\nI'd be honored to send you the stems.\n\nRespectfully,\nNoam`,
  },
  {
    id: "l4", director: "James Ortega", project: "Signal/Noise",
    stage: "Post-Production", festival: "Tribeca 2026", match: "Cosmic Drift", score: 85, status: "draft",
    email: `Hi James,\n\nYour sci-fi project "Signal/Noise" caught my attention. "Pale Blue Signal" — a radio transmission from the edge of the solar system — might be exactly what your cut needs.\n\nHappy to send you the full track for your audition.\n\nBest,\nNoam`,
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
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "var(--font-inter)" }}>

      {/* Nav */}
      <nav className="border-b border-zinc-200 flex items-stretch h-12 sticky top-0 bg-white z-40">
        <Link
          href="/"
          className="px-6 flex items-center border-r border-zinc-200 text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-400 hover:text-black hover:bg-zinc-50 transition-colors shrink-0"
        >
          Back to Site
        </Link>
        <div className="px-6 flex items-center border-r border-zinc-200">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold">Artist Studio</span>
        </div>
        <div className="flex flex-1 items-stretch">
          {(["assets", "scout", "analytics"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 text-[10px] uppercase tracking-[0.25em] font-semibold border-r border-zinc-200 transition-colors ${
                tab === t ? "bg-black text-white" : "hover:bg-zinc-50 text-zinc-500"
              }`}
            >
              {t === "assets" ? "Assets" : t === "scout" ? "AI Scout" : "Analytics"}
            </button>
          ))}
        </div>
        <div className="px-5 flex items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 border border-zinc-200 px-2 py-1">
            Private
          </span>
        </div>
      </nav>

      {/* Summary stats */}
      <div className="grid grid-cols-4 border-b border-zinc-200 divide-x divide-zinc-200">
        {[
          { label: "Total Tracks",    value: TRACKS.length },
          { label: "Total Plays",     value: formatPlays(totalPlays) },
          { label: "Licensed",        value: totalLicenses },
          { label: "Active Leads",    value: LEADS.filter((l) => leadStatuses[l.id] !== "replied").length },
        ].map((s) => (
          <div key={s.label} className="px-8 py-7">
            <div
              className="text-4xl font-bold italic mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {s.value}
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <main className="px-8 py-10">

        {/* ── ASSETS ── */}
        {tab === "assets" && (
          <div>
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-2xl font-bold italic" style={{ fontFamily: "var(--font-playfair)" }}>
                Track Catalog
              </h2>
              <button className="px-5 py-2.5 border border-zinc-300 hover:border-black text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors">
                Upload Track
              </button>
            </div>

            <div className="border border-zinc-200 divide-y divide-zinc-100">
              {TRACKS.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center gap-5 px-5 py-4 hover:bg-zinc-50 transition-colors group"
                >
                  <button className="w-8 h-8 border border-zinc-300 hover:border-black flex items-center justify-center shrink-0 hover:bg-black hover:text-white transition-colors">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor" style={{ marginLeft: 1 }}>
                      <path d="M0 0L9 4.5L0 9V0Z" />
                    </svg>
                  </button>
                  <div className="w-44 shrink-0">
                    <p className="text-sm font-bold italic" style={{ fontFamily: "var(--font-playfair)" }}>
                      {track.title}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 mt-0.5">
                      {track.mood}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Waveform data={track.waveform} color="#111" height={22} />
                  </div>
                  <div className="flex items-center gap-6 text-xs text-zinc-400 shrink-0">
                    <span>{track.duration}</span>
                    <span className="font-semibold text-black">{track.bpm} BPM</span>
                    <span>{track.key}</span>
                    <span>{formatPlays(track.plays)} plays</span>
                    <span className="text-green-700 font-semibold">{track.licensed} licensed</span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button className="px-3 py-1.5 border border-zinc-200 hover:border-black text-[10px] uppercase tracking-wider transition-colors">Edit</button>
                    <button className="px-3 py-1.5 border border-zinc-200 hover:border-black text-[10px] uppercase tracking-wider transition-colors">Tags</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── AI SCOUT ── */}
        {tab === "scout" && (
          <div>
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="text-2xl font-bold italic" style={{ fontFamily: "var(--font-playfair)" }}>
                  AI Scout
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Personalised outreach matched to films currently in post-production.
                </p>
              </div>
              <button className="px-5 py-2.5 border border-zinc-300 hover:border-black text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors">
                Scan New Projects
              </button>
            </div>

            <div className="border border-zinc-200 divide-y divide-zinc-200">
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
                      <div className="w-11 h-11 border border-zinc-200 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold">{lead.score}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-sm">{lead.director}</span>
                          <span className="text-zinc-300 text-xs">—</span>
                          <span className="text-sm italic text-zinc-600" style={{ fontFamily: "var(--font-playfair)" }}>
                            {lead.project}
                          </span>
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-400 mt-1 flex gap-3">
                          <span>{lead.stage}</span>
                          <span>·</span>
                          <span>{lead.festival}</span>
                          <span>·</span>
                          <span>Match: {lead.match}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <span
                          className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 border ${
                            status === "replied"
                              ? "border-green-200 text-green-700"
                              : status === "sent"
                              ? "border-blue-200 text-blue-600"
                              : "border-zinc-200 text-zinc-500"
                          }`}
                        >
                          {status === "replied" ? "Replied" : status === "sent" ? "Sent" : "Draft"}
                        </span>
                        <span className="text-zinc-300 text-xs">{isExpanded ? "▲" : "▼"}</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-6 pt-4 border-t border-zinc-100 bg-zinc-50">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-3">
                          Generated Email
                        </p>
                        <pre className="text-sm text-zinc-600 whitespace-pre-wrap font-sans leading-relaxed border border-zinc-200 bg-white p-5 mb-4">
                          {lead.email}
                        </pre>
                        <div className="flex gap-3">
                          {status === "draft" && (
                            <>
                              <button
                                onClick={() => setLeadStatuses({ ...leadStatuses, [lead.id]: "sent" })}
                                className="px-5 py-2.5 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-zinc-900 transition-colors"
                              >
                                Send Email
                              </button>
                              <button className="px-5 py-2.5 border border-zinc-300 hover:border-black text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors">
                                Edit Draft
                              </button>
                            </>
                          )}
                          {status === "sent" && (
                            <button
                              onClick={() => setLeadStatuses({ ...leadStatuses, [lead.id]: "replied" })}
                              className="px-5 py-2.5 border border-zinc-300 hover:border-black text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors"
                            >
                              Mark as Replied
                            </button>
                          )}
                          {status === "replied" && (
                            <p className="text-sm text-green-700 py-2">
                              This lead responded — follow up directly.
                            </p>
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
              <p className="text-xs text-zinc-400">Real-time track performance. Use to prioritise follow-ups.</p>
            </div>

            {/* Top 3 */}
            <div className="grid grid-cols-3 border border-zinc-200 divide-x divide-zinc-200 mb-8">
              {[...ANALYTICS].sort((a, b) => b.weekPlays - a.weekPlays).slice(0, 3).map((t, i) => (
                <div key={t.id} className="px-7 py-7">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-4">
                    No. {i + 1} This Week
                  </p>
                  <p className="text-xl font-bold italic mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                    {t.title}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-4">{t.mood}</p>
                  <div className="text-5xl font-bold italic" style={{ fontFamily: "var(--font-playfair)" }}>
                    {t.weekPlays}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-400 mt-1 mb-4">Plays</div>
                  <div className="flex flex-wrap gap-1">
                    {t.locations.map((loc) => (
                      <span key={loc} className="text-[10px] border border-zinc-200 px-2 py-0.5 text-zinc-500">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="border border-zinc-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    {["Track", "Mood", "Total Plays", "This Week", "Avg Listen", "Licensed", ""].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-semibold"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {ANALYTICS.map((t) => (
                    <tr key={t.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-5 py-3.5 font-bold italic text-sm" style={{ fontFamily: "var(--font-playfair)" }}>
                        {t.title}
                      </td>
                      <td className="px-5 py-3.5 text-[10px] uppercase tracking-wider text-zinc-500">{t.mood}</td>
                      <td className="px-5 py-3.5 text-sm">{formatPlays(t.plays)}</td>
                      <td className="px-5 py-3.5 text-sm font-bold">{t.weekPlays}</td>
                      <td className="px-5 py-3.5 text-sm text-zinc-400">{t.avgDuration}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-green-700">{t.licensed}</td>
                      <td className="px-5 py-3.5 text-sm font-bold">
                        <span className={t.trend === "up" ? "text-green-600" : "text-zinc-300"}>
                          {t.trend === "up" ? "↑" : "↓"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
