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

  // We reroll by bumping a seed value (keeps the UI stable until you click Generate)
  const [seed, setSeed] = useState(0);

  const scenario = useMemo<Scenario>(() => {
    return generateScenario({ region, difficulty, chaos, horizon });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  const challengeId = useMemo(() => {
    // 4-digit id that changes when you reroll
    return String(1000 + Math.floor(Math.random() * 9000));
  }, [seed]);

  function reroll() {
    setSeed((s) => s + 1);
  }

  async function copyToClipboard() {
    const text =
      `FM Companion Challenge (#${challengeId})\n` +
      `Club: ${scenario.club.name} (${scenario.club.league})\n\n` +
      `Rules:\n- ${scenario.rules
        .map((r) => `${r.category}: ${r.text}`)
        .join("\n- ")}\n\n` +
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
          {/* LEFT: SETTINGS */}
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
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
                  className="flex-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 shadow-[0_0_0_2px_rgba(245,158,11,0.15)]"
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

          {/* RIGHT: CHALLENGE CARD */}
          <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 to-zinc-900/30 p-7 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/50 px-3 py-1 text-[11px] uppercase tracking-wider text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  FM Companion Challenge
                </div>

                <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight">
                  {scenario.club.name}
                </h2>
                <p className="mt-1 text-sm text-zinc-400">{scenario.club.league}</p>

                <div className="mt-3 text-xs text-zinc-500">
                  Challenge ID: <span className="text-zinc-300">#{challengeId}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                {[region, difficulty, chaos, horizon].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-800 bg-zinc-950/60 px-2.5 py-1 text-[11px] text-zinc-300"
                  >
                    {t.replace("_", " ").toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="mt-6 grid gap-6">
              {/* Rules */}
              <div>
                <h3 className="text-sm font-semibold text-zinc-200">Rules</h3>

                <div className="mt-3 grid gap-3">
                  {(["Transfers", "Squad", "Finance", "Tactics"] as const).map((cat) => {
                    const items = scenario.rules.filter((r) => r.category === cat);
                    if (items.length === 0) return null;

                    return (
                      <div
                        key={cat}
                        className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                      >
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          {cat}
                        </div>

                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                          {items.map((r) => (
                            <li key={`${r.category}-${r.text}`}>{r.text}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Objectives */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-950/30 p-4">
                <h3 className="text-sm font-semibold text-zinc-200">Objectives</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                  {scenario.objectives.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>

              {/* Wildcard */}
              <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-200">Wildcard</h3>
                  <span className="rounded-full border border-red-900/40 bg-red-950/30 px-2 py-1 text-[11px] text-red-200">
                    CHAOS CLAUSE
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-200">{scenario.wildcard}</p>
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