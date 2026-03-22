"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CAREER = [
  {
    period: "2018 — Present",
    role: "Founder & VP of Product",
    company: "Leal Health",
    category: "Health Tech",
    body: [
      "Led the creation of an AI-powered platform supporting over 225,000 cancer patients.",
      "Defined product vision and UX strategy from the ground up.",
      "Collaborated with Pfizer and Eli Lilly to translate complex clinical data into intuitive, human-centered digital experiences.",
    ],
  },
  {
    period: "2015 — 2018",
    role: "Head of Product Design",
    company: "Wix.com",
    category: "Product Design",
    body: [
      "Led design and product definition for internal HR and recruiting applications.",
      "Scaled hiring operations through modular UX patterns.",
      "Brought the Wix design language into enterprise-level tooling.",
    ],
  },
  {
    period: "2000 — 2010",
    role: "Head of Product Design",
    company: "Noga Communications & CoolVision",
    category: "Digital Innovation",
    body: [
      "Served as Head of Product Design for Israel's The Children's Channel.",
      "Pioneered interactive media — fused live TV broadcasts with digital communities.",
      "Managed platforms with hundreds of thousands of active users before modern social media.",
    ],
  },
  {
    period: "1996 — 2000",
    role: "Graphic Design",
    company: "Wizo College",
    category: "Education",
    body: [
      "A deep foundation in graphic design that evolved into over two decades of product leadership, UX strategy, and digital experience design.",
    ],
  },
];

export default function BioPage() {
  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "var(--font-barlow)" }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
        <div className="max-w-screen-xl mx-auto px-10 h-16 flex items-center justify-between">
          <Link href="/" className="text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-barlow)" }}>
            Noam Geva
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-xs tracking-[0.2em] uppercase font-medium text-zinc-400 hover:text-black transition-colors"
              style={{ fontFamily: "var(--font-barlow)" }}>Catalog</Link>
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-black"
              style={{ fontFamily: "var(--font-barlow)" }}>About</span>
          </div>
          <Link href="/studio" className="text-xs tracking-[0.2em] uppercase font-semibold text-zinc-400 hover:text-black transition-colors"
            style={{ fontFamily: "var(--font-barlow)" }}>Studio</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-screen-xl mx-auto px-10 lg:px-16 pt-36 pb-16 border-b border-zinc-100">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 mb-6"
          style={{ fontFamily: "var(--font-barlow)" }}>
          Biography
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="display font-black leading-none uppercase mb-6"
          style={{ fontFamily: "var(--font-barlow-condensed)", fontSize: "clamp(72px, 14vw, 180px)" }}>
          Noam<br />
          <span className="font-thin">Geva</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-10"
          style={{ fontFamily: "var(--font-barlow)" }}>
          Designer — Entrepreneur — Composer
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex gap-12 flex-wrap">
          {[
            { value: "25+",    label: "years experience" },
            { value: "225k",   label: "patients reached" },
            { value: "Berlin", label: "based in" },
          ].map((s) => (
            <div key={s.label}>
              <div className="display text-4xl font-black text-black" style={{ fontFamily: "var(--font-barlow-condensed)" }}>{s.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-1" style={{ fontFamily: "var(--font-barlow)" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Lead paragraph */}
      <section className="max-w-screen-xl mx-auto px-10 lg:px-16 py-16 border-b border-zinc-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl">
          <p className="text-lg lg:text-xl font-light leading-relaxed text-zinc-600"
            style={{ fontFamily: "var(--font-barlow)" }}>
            Noam Geva is a designer, entrepreneur, and product expert with over 25 years
            of experience building groundbreaking digital experiences. Based in Berlin,
            he now creates narrative-driven instrumental music — utilizing unique ethnic
            string instruments to bridge the gap between structured design and sonic storytelling.
          </p>
        </motion.div>
      </section>

      {/* Career */}
      <section className="max-w-screen-xl mx-auto px-10 lg:px-16 py-6">
        {CAREER.map((item, i) => (
          <motion.div
            key={item.company}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
            className="grid lg:grid-cols-4 gap-6 py-10 border-b border-zinc-100 last:border-0">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-1"
                style={{ fontFamily: "var(--font-barlow)" }}>{item.category}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-300"
                style={{ fontFamily: "var(--font-barlow)" }}>{item.period}</p>
            </div>
            <div className="lg:col-span-3">
              <h2 className="display text-2xl font-black uppercase leading-none mb-1"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                {item.role}
              </h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-5"
                style={{ fontFamily: "var(--font-barlow)" }}>{item.company}</p>
              <ul className="space-y-2.5">
                {item.body.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="text-zinc-300 mt-0.5 text-xs shrink-0">—</span>
                    <p className="text-sm text-zinc-600 leading-relaxed"
                      style={{ fontFamily: "var(--font-barlow)" }}>{line}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Current focus — dark band */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="max-w-screen-xl mx-auto px-10 lg:px-16 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="grid lg:grid-cols-4 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-1"
                style={{ fontFamily: "var(--font-barlow)" }}>Current Focus</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/25"
                style={{ fontFamily: "var(--font-barlow)" }}>2023 — Present</p>
            </div>
            <div className="lg:col-span-3">
              <h2 className="display text-2xl font-black uppercase leading-none mb-6 text-white"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                Instrumental Storytelling, Berlin
              </h2>
              <div className="space-y-4 max-w-2xl">
                <p className="text-sm text-white/50 leading-relaxed"
                  style={{ fontFamily: "var(--font-barlow)" }}>
                  After years of leading multi-disciplinary teams and bridging AI with
                  human-centered design, Noam applies his production precision to music.
                  Operating from his studio in Berlin, he creates instrumental music
                  characterised by strong narrative structure.
                </p>
                <p className="text-sm text-white/50 leading-relaxed"
                  style={{ fontFamily: "var(--font-barlow)" }}>
                  His work features rare ethnic instruments — most notably the{" "}
                  <em className="font-bold text-white not-italic">Bulbul Tarang</em>{" "}
                  and the{" "}
                  <em className="font-bold text-white not-italic">6-string Bouzouki</em>.
                  By stripping away artistic jargon in favour of execution and structure,
                  Noam translates the complexity of his tech background into a specific,
                  evocative sound.
                </p>
                <p className="text-sm text-white/50 leading-relaxed"
                  style={{ fontFamily: "var(--font-barlow)" }}>
                  The result:{" "}
                  <em className="text-white/80 not-italic">"movies for the ears"</em> —
                  traditional strings shaped by modern production thinking.
                </p>
              </div>
              <div className="flex gap-4 mt-10">
                <Link href="/"
                  className="text-xs tracking-[0.2em] uppercase font-bold pb-0.5 transition-colors text-white"
                  style={{ fontFamily: "var(--font-barlow)", borderBottom: "2px solid #fff" }}>
                  Explore catalog
                </Link>
                <Link href="/?section=bespoke"
                  className="text-xs tracking-[0.2em] uppercase font-bold pb-0.5 transition-colors text-white/40 hover:text-white"
                  style={{ fontFamily: "var(--font-barlow)", borderBottom: "2px solid rgba(255,255,255,0.15)" }}>
                  Commission a score
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100">
        <div className="max-w-screen-xl mx-auto px-10 py-10 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-0.5"
              style={{ fontFamily: "var(--font-barlow)" }}>Noam Geva</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-400"
              style={{ fontFamily: "var(--font-barlow)" }}>Composer · Film Music · Berlin</p>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-zinc-400"
            style={{ fontFamily: "var(--font-barlow)" }}>
            <Link href="/" className="hover:text-black transition-colors">Catalog</Link>
            <Link href="/bio" className="text-black font-semibold">Bio</Link>
            <Link href="/studio" className="hover:text-black transition-colors">Studio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
