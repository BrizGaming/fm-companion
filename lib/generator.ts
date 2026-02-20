import { CLUBS, type Club } from "../data/clubs";
import {
  OBJECTIVES,
  RULES_CORE,
  WILDCARDS_HIGH,
  WILDCARDS_LOW,
  WILDCARDS_MED,
} from "../data/rules";

type Region = "any" | "europe" | "south_america";
type Difficulty = "casual" | "hard" | "brutal";
type Chaos = "low" | "medium" | "high";
type Horizon = "1_season" | "3_seasons" | "dynasty";

export type Scenario = {
  club: Club;
  rules: string[];
  objectives: string[];
  wildcard: string;
};

function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickManyUnique(arr: string[], count: number): string[] {
  const copy = [...arr];
  const out: string[] = [];
  while (out.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
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
  const objectivesCount = input.horizon === "1_season" ? 2 : input.horizon === "3_seasons" ? 3 : 4;

  const rules = pickManyUnique(RULES_CORE, rulesCount);
  const objectives = pickManyUnique(OBJECTIVES, objectivesCount);

  const wildcardPool =
    input.chaos === "low" ? WILDCARDS_LOW : input.chaos === "medium" ? WILDCARDS_MED : WILDCARDS_HIGH;

  const wildcard = pickOne(wildcardPool);

  return { club, rules, objectives, wildcard };
}