import Link from "next/link";

export default function BioPage() {
  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "var(--font-inter)" }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-zinc-200 flex items-stretch h-12">
        <Link
          href="/"
          className="px-8 flex items-center border-r border-zinc-200 text-sm font-bold tracking-tight hover:bg-zinc-50 transition-colors shrink-0"
        >
          Noam Geva
        </Link>
        <div className="flex flex-1 items-stretch">
          {[
            { href: "/", label: "Catalog" },
            { href: "/bio", label: "Bio", active: true },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-6 flex items-center text-[10px] uppercase tracking-[0.25em] font-semibold border-r border-zinc-200 transition-colors ${
                item.active ? "bg-black text-white" : "text-zinc-500 hover:bg-zinc-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/studio"
          className="px-6 flex items-center border-l border-zinc-200 text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-400 hover:bg-black hover:text-white transition-colors"
        >
          Studio
        </Link>
      </nav>

      {/* Hero */}
      <header className="pt-12 border-b border-zinc-200">
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">

          {/* Left — Name & title */}
          <div className="px-8 py-16 lg:py-24 flex flex-col justify-between min-h-[360px]">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 mb-10"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Biography
              </p>
              <h1
                className="text-[72px] lg:text-[96px] font-bold leading-[0.88] italic tracking-tight mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Noam<br />
                Geva
              </h1>
              <p
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Designer — Entrepreneur — Composer
              </p>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mt-10">
              Based in Berlin. Over 25 years building digital experiences —
              now applied to narrative-driven instrumental music.
            </p>
          </div>

          {/* Right — Summary block */}
          <div className="flex flex-col divide-y divide-zinc-200">
            <div className="grid grid-cols-2 divide-x divide-zinc-200">
              {[
                { value: "25+", label: "Years Experience" },
                { value: "225k", label: "Patients Reached" },
                { value: "Berlin", label: "Based In" },
                { value: "2", label: "Signature Instruments" },
              ].map((s, i) => (
                <div key={s.label} className={`px-8 py-8 ${i < 2 ? "border-b border-zinc-200" : ""}`}>
                  <div
                    className="text-4xl font-bold italic mb-1 leading-none"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-8 py-8 flex-1">
              <p
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Instruments
              </p>
              <div className="space-y-2">
                {["Bulbul Tarang", "6-string Bouzouki"].map((inst) => (
                  <div key={inst} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-black rounded-full shrink-0" />
                    <span
                      className="text-sm italic font-semibold"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {inst}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>

        {/* Lead paragraph */}
        <section className="border-b border-zinc-200">
          <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
            <div className="lg:col-span-1 px-8 py-12 flex items-start">
              <span
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 lg:rotate-180 lg:[writing-mode:vertical-rl] mt-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Overview
              </span>
            </div>
            <div className="lg:col-span-11 px-8 py-12">
              <p
                className="text-2xl lg:text-3xl font-light leading-relaxed text-zinc-700 max-w-3xl"
                style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
              >
                Noam Geva is a designer, entrepreneur, and product expert with over 25 years
                of experience building groundbreaking digital experiences. Based in Berlin,
                he now creates narrative-driven instrumental music — utilizing unique ethnic
                string instruments to bridge the gap between structured design and sonic storytelling.
              </p>
            </div>
          </div>
        </section>

        {/* Career sections */}
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
              "Served as Head of Product Design for Israel's The Children's Channel in the early 2000s.",
              "A pioneer in interactive media — fused live TV broadcasts with digital communities.",
              "Managed platforms with hundreds of thousands of active users before the rise of modern social media.",
            ],
          },
        ].map((item) => (
          <section key={item.company} className="border-b border-zinc-200">
            <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">

              {/* Sidebar */}
              <div className="lg:col-span-3 px-8 py-10 flex flex-col justify-between">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-3"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.category}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] text-zinc-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.period}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-9 px-8 py-10">
                <h2
                  className="text-2xl font-bold italic mb-1 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.role}
                </h2>
                <p
                  className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-6"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.company}
                </p>
                <ul className="space-y-3">
                  {item.body.map((line) => (
                    <li key={line} className="flex items-start gap-4">
                      <div className="w-px h-4 bg-zinc-300 shrink-0 mt-1" />
                      <p className="text-sm text-zinc-600 leading-relaxed">{line}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* Education */}
        <section className="border-b border-zinc-200">
          <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
            <div className="lg:col-span-3 px-8 py-10">
              <p
                className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-3"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Education
              </p>
              <p
                className="text-[10px] uppercase tracking-[0.2em] text-zinc-300"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                1996 — 2000
              </p>
            </div>
            <div className="lg:col-span-9 px-8 py-10">
              <h2
                className="text-2xl font-bold italic mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Graphic Design
              </h2>
              <p
                className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Wizo College
              </p>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-xl">
                A deep foundation in graphic design that evolved into over two decades of
                product leadership, UX strategy, and digital experience design across
                health tech, enterprise software, and interactive media.
              </p>
            </div>
          </div>
        </section>

        {/* Current focus — music */}
        <section className="border-b border-zinc-200">
          <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
            <div className="lg:col-span-3 px-8 py-10">
              <p
                className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-3"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Current Focus
              </p>
              <p
                className="text-[10px] uppercase tracking-[0.2em] text-zinc-300"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                2023 — Present
              </p>
            </div>
            <div className="lg:col-span-9 px-8 py-10">
              <h2
                className="text-2xl font-bold italic mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Instrumental Storytelling
              </h2>
              <p
                className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-6"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Berlin Studio
              </p>
              <div className="space-y-4 max-w-2xl">
                <p className="text-sm text-zinc-600 leading-relaxed">
                  After years of leading multi-disciplinary teams and bridging AI with
                  human-centered design, Noam applies his production precision to music.
                  Operating from his studio in Berlin, he creates instrumental music
                  characterized by a strong narrative structure.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  His work features rare ethnic instruments — most notably the{" "}
                  <span className="italic font-semibold text-black" style={{ fontFamily: "var(--font-playfair)" }}>
                    Bulbul Tarang
                  </span>{" "}
                  and the{" "}
                  <span className="italic font-semibold text-black" style={{ fontFamily: "var(--font-playfair)" }}>
                    6-string Bouzouki
                  </span>
                  . By stripping away artistic jargon in favour of execution and structure,
                  Noam translates the complexity of his tech background into a specific,
                  evocative sound.
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  The result: <span className="italic" style={{ fontFamily: "var(--font-playfair)" }}>"movies for the ears"</span> —
                  traditional strings shaped by modern production thinking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 border-b border-zinc-200">
          <div className="px-8 py-12">
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              License Music
            </p>
            <p
              className="text-xl font-bold italic mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Explore the catalog and find the right track for your film.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-black text-white text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-zinc-900 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              View Catalog
            </Link>
          </div>
          <div className="px-8 py-12">
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Commission
            </p>
            <p
              className="text-xl font-bold italic mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Commission an original score built for your project.
            </p>
            <Link
              href="/?section=bespoke"
              className="inline-block px-6 py-3 border border-zinc-300 hover:border-black text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-600 hover:text-black transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200" style={{ fontFamily: "var(--font-inter)" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-zinc-200 border-b border-zinc-200">
          <div className="px-8 py-10 lg:col-span-2">
            <h2
              className="text-3xl font-bold italic mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Noam Geva
            </h2>
            <p className="text-xs text-zinc-400">Composer. Film Music. Berlin.</p>
          </div>
          <div className="px-8 py-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4">Navigate</p>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-zinc-600 hover:text-black transition-colors">Catalog</Link>
              <Link href="/bio" className="block text-sm text-zinc-600 hover:text-black transition-colors">Bio</Link>
              <Link href="/studio" className="block text-sm text-zinc-600 hover:text-black transition-colors">Studio</Link>
            </div>
          </div>
          <div className="px-8 py-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-4">Contact</p>
            <p className="text-sm text-zinc-600">noam@noamgeva.com</p>
            <p className="text-xs text-zinc-400 mt-1">Licensing enquiries welcome</p>
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
