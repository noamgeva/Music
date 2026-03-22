import Link from "next/link";

export default function BioPage() {
  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "var(--font-inter)" }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-tight">Noam Geva</Link>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <Link href="/" className="hover:text-black transition-colors">Catalog</Link>
            <span className="text-black font-medium">Bio</span>
            <Link href="/studio" className="hover:text-black transition-colors">Studio</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-36 pb-16 border-b border-zinc-100">
        <p className="text-xs text-zinc-400 mb-6 tracking-widest uppercase">Biography</p>
        <h1 className="text-[72px] lg:text-[96px] font-bold italic leading-[0.9] tracking-tight mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Noam<br />Geva
        </h1>
        <p className="text-xs text-zinc-400 tracking-widest uppercase mb-10">
          Designer — Entrepreneur — Composer
        </p>
        {/* Stats */}
        <div className="flex gap-10 flex-wrap">
          {[
            { value: "25+",    label: "years experience" },
            { value: "225k",   label: "patients reached" },
            { value: "Berlin", label: "based in" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold italic" style={{ fontFamily: "var(--font-playfair)" }}>{s.value}</span>
              <span className="text-xs text-zinc-400">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Lead */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-zinc-100">
        <div className="max-w-2xl">
          <p className="text-xl lg:text-2xl font-light italic leading-relaxed text-zinc-700"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Noam Geva is a designer, entrepreneur, and product expert with over 25 years
            of experience building groundbreaking digital experiences. Based in Berlin,
            he now creates narrative-driven instrumental music — utilizing unique ethnic
            string instruments to bridge the gap between structured design and sonic storytelling.
          </p>
        </div>
      </section>

      {/* Career */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        {[
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
        ].map((item) => (
          <div key={item.company} className="grid lg:grid-cols-4 gap-6 py-10 border-b border-zinc-100 last:border-0">
            <div>
              <p className="text-xs text-zinc-400 mb-1 uppercase tracking-wider">{item.category}</p>
              <p className="text-xs text-zinc-300">{item.period}</p>
            </div>
            <div className="lg:col-span-3">
              <h2 className="text-xl font-semibold italic mb-0.5" style={{ fontFamily: "var(--font-playfair)" }}>
                {item.role}
              </h2>
              <p className="text-xs text-zinc-400 mb-5">{item.company}</p>
              <ul className="space-y-2.5">
                {item.body.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="text-zinc-300 mt-1.5 text-xs shrink-0">—</span>
                    <p className="text-sm text-zinc-600 leading-relaxed">{line}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Current focus */}
      <section className="border-t border-zinc-100 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-zinc-400 mb-1 uppercase tracking-wider">Current Focus</p>
              <p className="text-xs text-zinc-300">2023 — Present</p>
            </div>
            <div className="lg:col-span-3">
              <h2 className="text-xl font-semibold italic mb-5" style={{ fontFamily: "var(--font-playfair)" }}>
                Instrumental Storytelling, Berlin
              </h2>
              <div className="space-y-4 max-w-2xl">
                <p className="text-sm text-zinc-600 leading-relaxed">
                  After years of leading multi-disciplinary teams and bridging AI with
                  human-centered design, Noam applies his production precision to music.
                  Operating from his studio in Berlin, he creates instrumental music
                  characterised by strong narrative structure.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  His work features rare ethnic instruments — most notably the{" "}
                  <em className="font-semibold text-black" style={{ fontFamily: "var(--font-playfair)" }}>Bulbul Tarang</em>{" "}
                  and the{" "}
                  <em className="font-semibold text-black" style={{ fontFamily: "var(--font-playfair)" }}>6-string Bouzouki</em>.
                  By stripping away artistic jargon in favour of execution and structure,
                  Noam translates the complexity of his tech background into a specific,
                  evocative sound.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  The result:{" "}
                  <em style={{ fontFamily: "var(--font-playfair)" }}>"movies for the ears"</em> —
                  traditional strings shaped by modern production thinking.
                </p>
              </div>
              <div className="flex gap-3 mt-8">
                <Link href="/"
                  className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors">
                  Explore catalog
                </Link>
                <Link href="/"
                  className="px-5 py-2.5 border border-zinc-200 hover:border-zinc-400 text-sm text-zinc-600 hover:text-black rounded-full transition-colors">
                  Commission a score
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold mb-0.5">Noam Geva</p>
            <p className="text-xs text-zinc-400">Composer · Film Music · Berlin</p>
          </div>
          <div className="flex gap-6 text-xs text-zinc-400">
            <Link href="/" className="hover:text-black transition-colors">Catalog</Link>
            <Link href="/bio" className="hover:text-black transition-colors">Bio</Link>
            <Link href="/studio" className="hover:text-black transition-colors">Studio</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
