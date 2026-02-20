"use client";

import { useMemo, useState } from "react";
import { generateScenario, type Scenario } from "../../lib/generator";

type Region = "any" | "europe" | "south_america";
type Difficulty = "casual" | "hard" | "brutal";
type Chaos = "low" | "medium" | "high";
type Horizon = "1_season" | "3_seasons" | "dynasty";

export default function GeneratePage() {
  const [region, setRegion] = useState<Region>("any");
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");
  const [chaos, setChaos] = useState<Chaos>("medium");
  const [horizon, setHorizon] = useState<Horizon>("3_seasons");

  const [seed, setSeed] = useState(0);

  const scenario = useMemo(() => {
    return generateScenario({ region, difficulty, chaos, horizon });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  function reroll() {
    setSeed((s) => s + 1);
  }

  async function copyToClipboard() {
    const text =
      `FM Companion Challenge\n` +
      `Club: ${scenario.club.name} (${scenario.club.league})\n\n` +
      `Rules:\n- ${scenario.rules.join("\n- ")}\n\n` +
      `Objectives:\n- ${scenario.objectives.join("\n- ")}\n\n` +
      `Wildcard:\n- ${scenario.wildcard}\n`;

    await navigator.clipboard.writeText(text);
    alert("Copied!");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="flex items-center justify-between">
          <a href="/" className="text-xl font-semibold tracking-tight">
            FM Companion
          </a>
          <div className="text-sm text-zinc-400">Generator (v0.1)</div>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-lg font-semibold">Settings</h2>

            <div className="mt-4 grid gap-4 text-sm">
              <label className="grid gap-1">
                <span className="text-zinc-300">Region</span>
                <select
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                  value={region}
                  onChange={(e) => setRegion(e.target.value as Region)}
                >
                  <option value="any">Any</option>
                  <option value="europe">Europe</option>
                  <option value="south_america">South America</option>
                </select>
              </label>

              <label className="grid gap-1">
                <span className="text-zinc-300">Difficulty</span>
                <select
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                >
                  <option value="casual">Casual</option>
                  <option value="hard">Hard</option>
                  <option value="brutal">Brutal</option>
                </select>
              </label>

              <label className="grid gap-1">
                <span className="text-zinc-300">Chaos</span>
                <select
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                  value={chaos}
                  onChange={(e) => setChaos(e.target.value as Chaos)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>

              <label className="grid gap-1">
                <span className="text-zinc-300">Time Horizon</span>
                <select
                  className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2"
                  value={horizon}
                  onChange={(e) => setHorizon(e.target.value as Horizon)}
                >
                  <option value="1_season">1 season</option>
                  <option value="3_seasons">3 seasons</option>
                  <option value="dynasty">Dynasty</option>
                </select>
              </label>

              <div className="mt-2 flex gap-3">
                <button
                  onClick={reroll}
                  className="flex-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
                >
                  Generate
                </button>
                <button
                  onClick={copyToClipboard}
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold hover:bg-zinc-900"
                >
                  Copy
                </button>
              </div>

              <p className="text-xs text-zinc-500">
                v0.1 uses local data. We’ll add database + creator packs later.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{scenario.club.name}</h2>
                <p className="mt-1 text-sm text-zinc-400">{scenario.club.league}</p>
              </div>
              <div className="text-xs text-zinc-500">
                {region.toUpperCase()} • {difficulty.toUpperCase()} • {chaos.toUpperCase()}
              </div>
            </div>

            <div className="mt-6 grid gap-6">
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">Rules</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                  {scenario.rules.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-200">Objectives</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                  {scenario.objectives.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-200">Wildcard</h3>
                <p className="mt-2 text-sm text-zinc-300">{scenario.wildcard}</p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-12 text-xs text-zinc-500">
          Built by TheBrizGaming • Not affiliated with Sports Interactive or SEGA.
        </footer>
      </div>
    </main>
  );
}