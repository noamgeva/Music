"use client";

import { useState } from "react";
import { TRACKS, MOODS } from "@/lib/catalog";
import { formatPlays } from "@/lib/utils";
import Waveform from "@/components/Waveform";
import Link from "next/link";

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

const ANALYTICS = TRACKS.map((t) => ({
  ...t,
  weekPlays: Math.floor(Math.random() * 200 + 20),
  locations: ["Berlin","New York","Los Angeles","London","Tel Aviv"].slice(0, Math.floor(Math.random()*3+2)),
  avgDuration: `${Math.floor(Math.random()*2+1)}:${String(Math.floor(Math.random()*59)).padStart(2,"0")}`,
  trend: Math.random() > 0.4 ? "up" : "down",
}));

type Tab = "assets" | "scout" | "analytics";

export default function StudioPage() {
  const [tab, setTab] = useState<Tab>("assets");
  const [expandedLead, setExpandedLead] = useState<string|null>(null);
  const [leadStatuses, setLeadStatuses] = useState<Record<string,string>>(
    Object.fromEntries(LEADS.map((l) => [l.id, l.status]))
  );

  const totalPlays    = TRACKS.reduce((s,t)=>s+t.plays,0);
  const totalLicenses = TRACKS.reduce((s,t)=>s+t.licensed,0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

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
                className="text-xs tracking-[0.2em] uppercase font-semibold transition-colors"
                style={{ fontFamily: "var(--font-barlow)", color: tab===t ? "#fff" : "rgba(255,255,255,0.3)" }}>
                {t==="assets"?"Assets":t==="scout"?"AI Scout":"Analytics"}
              </button>
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 border border-white/10 px-2 py-1"
            style={{ fontFamily: "var(--font-barlow)" }}>Private</span>
        </div>
      </nav>

      {/* Split mega header */}
      <div className="max-w-screen-xl mx-auto px-10 lg:px-16 pt-28 pb-0">
        <div className="flex items-end justify-between">
          <h1 className="display font-black text-white" style={{ fontFamily:"var(--font-barlow-condensed)", fontSize:"clamp(60px,12vw,160px)", lineHeight:1 }}>
            {tab==="assets"?"THE":tab==="scout"?"AI":"THE"}
          </h1>
          <h1 className="display font-black text-white" style={{ fontFamily:"var(--font-barlow-condensed)", fontSize:"clamp(60px,12vw,160px)", lineHeight:1 }}>
            {tab==="assets"?"STUDIO":tab==="scout"?"SCOUT":"DATA"}
          </h1>
        </div>
        <div className="w-full h-px bg-white/10 mt-4" />
      </div>

      {/* Summary stats */}
      <div className="max-w-screen-xl mx-auto px-10 lg:px-16 py-10 flex items-center gap-12 border-b border-white/5 flex-wrap">
        {[
          { v:TRACKS.length,            l:"Tracks" },
          { v:formatPlays(totalPlays),  l:"Total Plays" },
          { v:totalLicenses,            l:"Licensed" },
          { v:LEADS.filter(l=>leadStatuses[l.id]!=="replied").length, l:"Active Leads" },
        ].map((s) => (
          <div key={s.l}>
            <div className="display text-5xl font-black text-white" style={{ fontFamily:"var(--font-barlow-condensed)" }}>{s.v}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1" style={{ fontFamily:"var(--font-barlow)" }}>{s.l}</div>
          </div>
        ))}
      </div>

      <main className="max-w-screen-xl mx-auto px-10 lg:px-16 py-14">

        {/* ── ASSETS ── */}
        {tab==="assets" && (
          <div>
            <div className="flex items-center justify-between mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40" style={{ fontFamily:"var(--font-barlow)" }}>
                {TRACKS.length} tracks
              </p>
              <button className="text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2.5 flex items-center gap-2 transition-colors"
                style={{ background:"#E04020", color:"#fff", fontFamily:"var(--font-barlow)" }}>
                Upload Track
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1V9M2 5L6 1L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>

            {/* Track list */}
            <div className="space-y-0">
              {TRACKS.map((track, i) => (
                <div key={track.id}
                  className="flex items-center gap-6 py-5 border-t border-white/5 hover:bg-white/[0.02] transition-colors group px-2">
                  {/* Number */}
                  <span className="text-xs text-white/20 w-6 shrink-0 text-right" style={{ fontFamily:"var(--font-barlow)" }}>
                    {String(i+1).padStart(2,"0")}
                  </span>

                  {/* Play */}
                  <button className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    style={{ background:"rgba(255,255,255,0.06)" }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="rgba(255,255,255,0.5)" style={{ marginLeft:1 }}>
                      <path d="M0 0L8 4L0 8Z"/>
                    </svg>
                  </button>

                  {/* Title */}
                  <div className="w-48 shrink-0">
                    <p className="text-sm font-bold uppercase text-white" style={{ fontFamily:"var(--font-barlow-condensed)" }}>{track.title}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/30 mt-0.5" style={{ fontFamily:"var(--font-barlow)" }}>{track.mood}</p>
                  </div>

                  {/* Waveform */}
                  <div className="flex-1 min-w-0">
                    <Waveform data={track.waveform} color="#E04020" height={24} />
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-8 text-xs text-white/30 shrink-0" style={{ fontFamily:"var(--font-barlow)" }}>
                    <span>{track.duration}</span>
                    <span className="font-semibold text-white/60">{track.bpm} BPM</span>
                    <span>{track.key}</span>
                    <span>{formatPlays(track.plays)} plays</span>
                    <span style={{ color:"#4ade80" }}>{track.licensed}×</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    {["Edit","Tags"].map((a) => (
                      <button key={a} className="px-3 py-1.5 text-[10px] uppercase tracking-wider transition-colors"
                        style={{ background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.5)", fontFamily:"var(--font-barlow)" }}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="border-t border-white/5" />
            </div>
          </div>
        )}

        {/* ── AI SCOUT ── */}
        {tab==="scout" && (
          <div>
            <div className="flex items-center justify-between mb-10">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40" style={{ fontFamily:"var(--font-barlow)" }}>
                {LEADS.length} active leads
              </p>
              <button className="text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2.5 flex items-center gap-2"
                style={{ background:"#E04020", color:"#fff", fontFamily:"var(--font-barlow)" }}>
                Scan Projects
              </button>
            </div>

            <div className="space-y-3">
              {LEADS.map((lead) => {
                const isExpanded = expandedLead===lead.id;
                const status = leadStatuses[lead.id];
                return (
                  <div key={lead.id} style={{ background:"rgba(255,255,255,0.03)" }}>
                    <div className="flex items-center gap-5 px-6 py-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                      onClick={() => setExpandedLead(isExpanded?null:lead.id)}>

                      {/* Score */}
                      <div className="display w-12 h-12 flex items-center justify-center font-black text-sm shrink-0"
                        style={{ background:"#E04020", fontFamily:"var(--font-barlow-condensed)" }}>
                        {lead.score}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="font-bold text-sm text-white" style={{ fontFamily:"var(--font-barlow)" }}>{lead.director}</span>
                          <span className="text-white/20">—</span>
                          <span className="text-sm text-white/50 uppercase font-semibold" style={{ fontFamily:"var(--font-barlow-condensed)" }}>{lead.project}</span>
                        </div>
                        <div className="flex gap-4 text-[10px] uppercase tracking-wider text-white/30 mt-1 flex-wrap" style={{ fontFamily:"var(--font-barlow)" }}>
                          <span>{lead.stage}</span><span>·</span><span>{lead.festival}</span><span>·</span><span>{lead.match}</span>
                        </div>
                      </div>

                      <span className="text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-1 shrink-0"
                        style={{
                          fontFamily:"var(--font-barlow)",
                          background: status==="replied"?"rgba(74,222,128,0.1)":status==="sent"?"rgba(96,165,250,0.1)":"rgba(224,64,32,0.15)",
                          color: status==="replied"?"#4ade80":status==="sent"?"#60a5fa":"#E04020",
                        }}>
                        {status==="replied"?"Replied":status==="sent"?"Sent":"Draft"}
                      </span>
                      <span className="text-white/20 text-xs">{isExpanded?"▲":"▼"}</span>
                    </div>

                    {isExpanded && (
                      <div className="px-6 pb-6 pt-4 border-t border-white/5">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3" style={{ fontFamily:"var(--font-barlow)" }}>Generated Email</p>
                        <pre className="text-sm text-white/50 whitespace-pre-wrap leading-relaxed p-5 mb-5 font-sans"
                          style={{ background:"rgba(255,255,255,0.03)" }}>
                          {lead.email}
                        </pre>
                        <div className="flex gap-3">
                          {status==="draft" && <>
                            <button onClick={() => setLeadStatuses({...leadStatuses,[lead.id]:"sent"})}
                              className="text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-2.5"
                              style={{ background:"#E04020", color:"#fff", fontFamily:"var(--font-barlow)" }}>
                              Send Email
                            </button>
                            <button className="text-[10px] uppercase tracking-[0.2em] font-semibold px-5 py-2.5 text-white/40 hover:text-white transition-colors"
                              style={{ background:"rgba(255,255,255,0.06)", fontFamily:"var(--font-barlow)" }}>
                              Edit Draft
                            </button>
                          </>}
                          {status==="sent" && (
                            <button onClick={() => setLeadStatuses({...leadStatuses,[lead.id]:"replied"})}
                              className="text-[10px] uppercase tracking-[0.2em] font-semibold px-5 py-2.5 text-white/40 hover:text-white transition-colors"
                              style={{ background:"rgba(255,255,255,0.06)", fontFamily:"var(--font-barlow)" }}>
                              Mark Replied
                            </button>
                          )}
                          {status==="replied" && (
                            <p className="text-sm py-2" style={{ color:"#4ade80", fontFamily:"var(--font-barlow)" }}>
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
        {tab==="analytics" && (
          <div>
            {/* Top 3 */}
            <div className="grid grid-cols-3 gap-4 mb-14">
              {[...ANALYTICS].sort((a,b)=>b.weekPlays-a.weekPlays).slice(0,3).map((t,i) => (
                <div key={t.id} className="p-7" style={{ background:"rgba(255,255,255,0.03)" }}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4" style={{ fontFamily:"var(--font-barlow)" }}>
                    No. {i+1} This Week
                  </p>
                  <p className="display text-2xl font-black text-white mb-1" style={{ fontFamily:"var(--font-barlow-condensed)" }}>{t.title}</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/30 mb-5" style={{ fontFamily:"var(--font-barlow)" }}>{t.mood}</p>
                  <div className="display text-6xl font-black" style={{ fontFamily:"var(--font-barlow-condensed)", color:"#E04020" }}>{t.weekPlays}</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/30 mt-1 mb-4" style={{ fontFamily:"var(--font-barlow)" }}>plays</div>
                  <div className="flex flex-wrap gap-1">
                    {t.locations.map((loc) => (
                      <span key={loc} className="text-[10px] uppercase tracking-wider px-2 py-0.5 text-white/30"
                        style={{ background:"rgba(255,255,255,0.06)", fontFamily:"var(--font-barlow)" }}>{loc}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <table className="w-full" style={{ borderCollapse:"collapse" }}>
              <thead>
                <tr className="border-b border-white/5">
                  {["Track","Mood","Total","This Week","Avg","Licensed",""].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold"
                      style={{ fontFamily:"var(--font-barlow)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ANALYTICS.map((t) => (
                  <tr key={t.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 text-sm font-bold uppercase text-white" style={{ fontFamily:"var(--font-barlow-condensed)" }}>{t.title}</td>
                    <td className="py-4 px-4 text-[10px] uppercase tracking-wider text-white/40" style={{ fontFamily:"var(--font-barlow)" }}>{t.mood}</td>
                    <td className="py-4 px-4 text-sm text-white/60" style={{ fontFamily:"var(--font-barlow)" }}>{formatPlays(t.plays)}</td>
                    <td className="py-4 px-4 text-sm font-bold text-white" style={{ fontFamily:"var(--font-barlow)" }}>{t.weekPlays}</td>
                    <td className="py-4 px-4 text-sm text-white/40" style={{ fontFamily:"var(--font-barlow)" }}>{t.avgDuration}</td>
                    <td className="py-4 px-4 text-sm font-bold" style={{ color:"#4ade80", fontFamily:"var(--font-barlow)" }}>{t.licensed}</td>
                    <td className="py-4 px-4 text-sm font-bold"
                      style={{ color: t.trend==="up"?"#4ade80":"rgba(255,255,255,0.2)", fontFamily:"var(--font-barlow)" }}>
                      {t.trend==="up"?"↑":"↓"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
