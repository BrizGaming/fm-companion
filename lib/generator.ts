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
  // if set, only one rule with the same group can exist on a card
  exclusiveGroup?: string;
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

function pickManyUniqueStrings(arr: string[], count: number): string[] {
  const copy = [...arr];
  const out: string[] = [];
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

/**
 * Adds lightweight constraint logic without rewriting all rule data into objects.
 * We tag a few rules into exclusive groups so impossible combos never appear.
 */
function buildRulePool(): CategorisedRule[] {
  const tactics = RULES_TACTICS.map((text) => {
    const lower = text.toLowerCase();

    // Exclusive mentality lock (prevents attacking-only + defensive-only together)
    if (lower.includes("attacking mentality")) {
      return { category: "Tactics" as const, text, exclusiveGroup: "mentality_lock" };
    }
    if (lower.includes("defensive mentality")) {
      return { category: "Tactics" as const, text, exclusiveGroup: "mentality_lock" };
    }

    return { category: "Tactics" as const, text };
  });

  return [
    ...RULES_TRANSFERS.map((text) => ({ category: "Transfers" as const, text })),
    ...RULES_SQUAD.map((text) => ({ category: "Squad" as const, text })),
    ...RULES_FINANCE.map((text) => ({ category: "Finance" as const, text })),
    ...tactics,
  ];
}

function pickRulesWithConstraints(pool: CategorisedRule[], count: number): CategorisedRule[] {
  const copy = [...pool];
  const picked: CategorisedRule[] = [];
  const usedGroups = new Set<string>();

  while (picked.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    const candidate = copy.splice(idx, 1)[0];

    if (picked.some((r) => r.text === candidate.text)) continue;

    if (candidate.exclusiveGroup) {
      if (usedGroups.has(candidate.exclusiveGroup)) continue;
      usedGroups.add(candidate.exclusiveGroup);
    }

    picked.push(candidate);
  }

  return picked;
}

export function generateScenario(input: {
  region: Region;
  difficulty: Difficulty;
  chaos: Chaos;
  horizon: Horizon;
}): Scenario {
  const clubs = input.region === "any" ? CLUBS : CLUBS.filter((c) => c.region === input.region);
  const club = pickOne(clubs.length ? clubs : CLUBS);

  const rulesCount = input.difficulty === "casual" ? 2 : input.difficulty === "hard" ? 3 : 4;

  const rulePool = buildRulePool();
  const rules = pickRulesWithConstraints(rulePool, rulesCount);

  const objectivePool = objectivesForHorizon(input.horizon);
  const objectivesCount = input.horizon === "1_season" ? 2 : input.horizon === "3_seasons" ? 3 : 4;
  const objectives = pickManyUniqueStrings(objectivePool, objectivesCount);

  const wildcardPool =
    input.chaos === "low"
      ? WILDCARDS_LOW
      : input.chaos === "medium"
      ? WILDCARDS_MED
      : WILDCARDS_HIGH;

  const wildcard = pickOne(wildcardPool);

  return { club, rules, objectives, wildcard };
}