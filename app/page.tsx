import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-900/20 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/50 px-3 py-1 text-[11px] uppercase tracking-wider text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Content-ready FM challenges
        </div>

        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight">
          Stop overthinking your next save.
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          FM Companion generates a club, rules, objectives and a wildcard — plus a clean PNG export
          you can drop straight into a thumbnail, overlay or Discord post.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/generate"
            className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 shadow-[0_0_0_2px_rgba(245,158,11,0.15)]"
          >
            Random Generator
          </Link>

          <Link
            href="/presets"
            className="rounded-lg border border-zinc-700 bg-zinc-950/30 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-zinc-900"
          >
            Preset Challenges
          </Link>
        </div>

        <div className="mt-6 text-xs text-zinc-500">
          Tip: Presets are the “classic” FM challenges (Youth Only, Build a Nation, etc.).
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="text-sm font-semibold text-zinc-100">Random Generator</div>
          <p className="mt-2 text-sm text-zinc-300">
            Pick Region, Difficulty, Chaos and Time Horizon — then generate a clean challenge card.
          </p>
          <div className="mt-4">
            <Link className="text-sm font-semibold text-amber-300 hover:text-amber-200" href="/generate">
              Generate a challenge →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="text-sm font-semibold text-zinc-100">Preset Challenges</div>
          <p className="mt-2 text-sm text-zinc-300">
            Curated scenarios with defined rule sets and difficulty variants — and the club picked for you.
          </p>
          <div className="mt-4">
            <Link className="text-sm font-semibold text-amber-300 hover:text-amber-200" href="/presets">
              Browse presets →
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="text-sm font-semibold text-zinc-100">Creator-ready</div>
          <p className="mt-2 text-sm text-zinc-300">
            Copy formatted output, and download a sharp PNG for thumbnails, shorts, or stream overlays.
          </p>
          <div className="mt-4 text-xs text-zinc-500">
            Built for creators, but great for anyone.
          </div>
        </div>
      </section>

      {/* EXAMPLE */}
      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
        <div className="text-sm font-semibold text-zinc-100">Example challenge</div>
        <div className="mt-3 grid gap-3 text-sm text-zinc-300">
          <div>
            <span className="font-semibold text-zinc-100">Club:</span> Random pick
          </div>
          <div>
            <span className="font-semibold text-zinc-100">Rules:</span> Youth-only signings • No loans • Positive net spend
          </div>
          <div>
            <span className="font-semibold text-zinc-100">Objectives:</span> Promotion in 3 seasons • Sell one academy graduate
          </div>
          <div>
            <span className="font-semibold text-zinc-100">Wildcard:</span> Sell your top scorer each season
          </div>
        </div>
      </section>
    </main>
  );
}