import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/50 px-3 py-1 text-[11px] uppercase tracking-wider text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          About
        </div>

        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight">FM Companion</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          A lightweight challenge generator for Football Manager saves — built to help you pick a
          club, rules, objectives, and a wildcard… and export it as a clean PNG for creators.
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
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="text-sm font-semibold text-zinc-100">What it does</div>
          <p className="mt-2 text-sm text-zinc-300">
            Generates save ideas that are structured and content-ready — including a downloadable card.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="text-sm font-semibold text-zinc-100">Who it’s for</div>
          <p className="mt-2 text-sm text-zinc-300">
            Anyone who plays FM — and especially creators who want quick, interesting challenge hooks.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
          <div className="text-sm font-semibold text-zinc-100">Disclaimer</div>
          <p className="mt-2 text-sm text-zinc-300">
            Not affiliated with Sports Interactive or SEGA. Football Manager is a trademark of its owners.
          </p>
        </div>
      </section>
    </main>
  );
}