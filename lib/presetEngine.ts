import { PRESETS, type PresetId, type Difficulty } from "../data/presets";
import { CLUBS, type Club } from "../data/clubs";

export type CategorisedRule = {
  category: "Transfers" | "Squad" | "Finance" | "Tactics";
  text: string;
};

export type PresetScenario = {
  presetId: PresetId;
  presetName: string;
  club: Club;
  rules: CategorisedRule[];
  objectives: string[];
  wildcard: string;
};

function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickClubForPreset(presetId: PresetId): Club {
  const preset = PRESETS.find((p) => p.id === presetId);
  if (!preset) return pickOne(CLUBS);

  const region = preset.clubCriteria?.region ?? "any";
  const pool = region === "any" ? CLUBS : CLUBS.filter((c) => c.region === region);

  return pickOne(pool.length ? pool : CLUBS);
}

export function generatePresetScenario(args: {
  presetId: PresetId;
  difficulty: Difficulty;
}): PresetScenario {
  const preset = PRESETS.find((p) => p.id === args.presetId);
  if (!preset) throw new Error(`Unknown preset: ${args.presetId}`);

  const club = pickClubForPreset(args.presetId);
  const rules = preset.rulesByDifficulty[args.difficulty];
  const objectives = preset.objectivesByDifficulty[args.difficulty];

  const wildcardPool = preset.wildcardsByDifficulty[args.difficulty];
  const wildcard = pickOne(wildcardPool);

  return {
    presetId: preset.id,
    presetName: preset.name,
    club,
    rules,
    objectives,
    wildcard,
  };
}