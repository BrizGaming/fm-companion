import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">FM Companion</div>

          <nav className="flex items-center gap-4 text-sm text-zinc-300">
            <Link className="hover:text-white" href="/generate">
              Generate
            </Link>
            <Link className="hover:text-white" href="/about">
              About
            </Link>
          </nav>
        </header>

        <section className="mt-16">
          <h1 className="text-4xl font-bold leading-tight">
            Generate your next Football Manager challenge.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-300">
            Click once and get a club + rules + objectives. Built for creators and players who
            want a fresh save without the overthinking.
          </p>

          <div className="mt-8 flex gap-3">
            <Link
              href="/generate"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
            >
              Generate a challenge
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-zinc-900"
            >
              What is this?
            </Link>
          </div>

          <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <p className="text-sm text-zinc-300">Example output</p>
            <div className="mt-3 text-sm leading-6 text-zinc-200">
              <div>
                <span className="font-semibold">Club:</span> Random pick
              </div>
              <div className="mt-2">
                <span className="font-semibold">Rules:</span> Youth-only signings, Wage cap, No loans
              </div>
              <div className="mt-2">
                <span className="font-semibold">Objectives:</span> Promotion in 3 seasons, 2 academy
                graduates, Positive net spend
              </div>
              <div className="mt-2">
                <span className="font-semibold">Wildcard:</span> Sell your top scorer each season
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 text-xs text-zinc-500">
          Built by TheBrizGaming • Not affiliated with Sports Interactive or SEGA.
        </footer>
      </div>
    </main>
  );
}