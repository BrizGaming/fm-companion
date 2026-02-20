import { CLUBS, type Club } from "../data/clubs";
import {
  RULES_TRANSFERS,
  RULES_SQUAD,
  RULES_FINANCE,
  RULES_TACTICS,
  OBJECTIVES_SHORT,
  OBJECTIVES_MEDIUM,
  OBJECTIVES_LONG,
  WILDCARDS_LOW,
  WILDCARDS_MED,
  WILDCARDS_HIGH,
} from "../data/rules";

type Region = "any" | "europe" | "south_america";
type Difficulty = "casual" | "hard" | "brutal";
type Chaos = "low" | "medium" | "high";
type Horizon = "1_season" | "3_seasons" | "dynasty";

export type RuleCategory = "Transfers" | "Squad" | "Finance" | "Tactics";

export type CategorisedRule = {
  category: RuleCategory;
  text: string;
};

export type Scenario = {
  club: Club;
  rules: CategorisedRule[];
  objectives: string[];
  wildcard: string;
};

function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickManyUnique<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  while (out.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

function objectivesForHorizon(h: Horizon): string[] {
  if (h === "1_season") return OBJECTIVES_SHORT;
  if (h === "3_seasons") return OBJECTIVES_MEDIUM;
  return OBJECTIVES_LONG;
}

export function generateScenario(input: {
  region: Region;
  difficulty: Difficulty;
  chaos: Chaos;
  horizon: Horizon;
}): Scenario {
  const clubs =
    input.region === "any" ? CLUBS : CLUBS.filter((c) => c.region === input.region);
  const club = pickOne(clubs.length ? clubs : CLUBS);

  const rulesCount =
    input.difficulty === "casual" ? 2 : input.difficulty === "hard" ? 3 : 4;

  // Build a categorised pool
  const rulePool: CategorisedRule[] = [
    ...RULES_TRANSFERS.map((text) => ({ category: "Transfers" as const, text })),
    ...RULES_SQUAD.map((text) => ({ category: "Squad" as const, text })),
    ...RULES_FINANCE.map((text) => ({ category: "Finance" as const, text })),
    ...RULES_TACTICS.map((text) => ({ category: "Tactics" as const, text })),
  ];

  const rules = pickManyUnique(rulePool, rulesCount);

  const objectivePool = objectivesForHorizon(input.horizon);
  const objectivesCount =
    input.horizon === "1_season" ? 2 : input.horizon === "3_seasons" ? 3 : 4;

  const objectives = pickManyUnique(objectivePool, objectivesCount);

  const wildcardPool =
    input.chaos === "low"
      ? WILDCARDS_LOW
      : input.chaos === "medium"
      ? WILDCARDS_MED
      : WILDCARDS_HIGH;

  const wildcard = pickOne(wildcardPool);

  return { club, rules, objectives, wildcard };
}