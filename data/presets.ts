export type Difficulty = "casual" | "hard" | "brutal";

export type PresetId =
  | "youth_only"
  | "build_a_nation"
  | "no_transfers"
  | "fallen_giant"
  | "journeyman";

export type Preset = {
  id: PresetId;
  name: string;
  description: string;

  // Used to pick a club from whatever dataset you have now (sample list), and later your global list.
  clubCriteria?: {
    region?: "europe" | "south_america" | "any";
    // later we’ll add: continent[], tierMin/max, countries[], etc.
  };

  rulesByDifficulty: Record<Difficulty, { category: "Transfers" | "Squad" | "Finance" | "Tactics"; text: string }[]>;
  objectivesByDifficulty: Record<Difficulty, string[]>;
  wildcardsByDifficulty: Record<Difficulty, string[]>;
};

export const PRESETS: Preset[] = [
  {
    id: "youth_only",
    name: "Youth Only",
    description: "Build through youth development. Keep it lean, keep it young.",
    clubCriteria: { region: "any" },
    rulesByDifficulty: {
      casual: [
        { category: "Transfers", text: "You may only sign players aged 21 or under." },
        { category: "Squad", text: "You must start at least 1 academy graduate every match." },
      ],
      hard: [
        { category: "Transfers", text: "You may only sign players aged 21 or under." },
        { category: "Transfers", text: "No loans allowed (incoming or outgoing)." },
        { category: "Squad", text: "You must start at least 2 academy graduates every match." },
      ],
      brutal: [
        { category: "Transfers", text: "You may only sign players aged 21 or under." },
        { category: "Transfers", text: "No loans allowed (incoming or outgoing)." },
        { category: "Finance", text: "You must maintain positive net spend each season." },
        { category: "Squad", text: "You must start at least 2 academy graduates every match." },
      ],
    },
    objectivesByDifficulty: {
      casual: ["Finish top half this season.", "Develop one youth player into a regular starter."],
      hard: ["Achieve promotion within 3 seasons.", "Sell 1 academy graduate for a club-record fee."],
      brutal: ["Achieve promotion within 3 seasons.", "Maintain positive net spend for 3 seasons.", "Qualify for continental competition within 4 seasons."],
    },
    wildcardsByDifficulty: {
      casual: ["You must keep your captain for the entire season."],
      hard: ["You cannot renew contracts until the final year."],
      brutal: ["Sell your top scorer at the end of every season."],
    },
  },

  {
    id: "build_a_nation",
    name: "Build a Nation",
    description: "Pick a club from a smaller league and push them onto the continental stage.",
    clubCriteria: { region: "europe" }, // later we’ll refine by countries list
    rulesByDifficulty: {
      casual: [
        { category: "Transfers", text: "You can only sign players listed for transfer." },
        { category: "Finance", text: "Your wage bill must stay under 80% of your available wage budget." },
      ],
      hard: [
        { category: "Transfers", text: "You can only sign players listed for transfer." },
        { category: "Finance", text: "Your wage bill must stay under 80% of your available wage budget." },
        { category: "Transfers", text: "No transfers allowed in January (buy or sell)." },
      ],
      brutal: [
        { category: "Transfers", text: "You can only sign players listed for transfer." },
        { category: "Finance", text: "Your wage bill must stay under 80% of your available wage budget." },
        { category: "Finance", text: "You must maintain positive net spend each season." },
        { category: "Transfers", text: "No transfers allowed in January (buy or sell)." },
      ],
    },
    objectivesByDifficulty: {
      casual: ["Qualify for continental competition within 4 seasons."],
      hard: ["Reach the group stage of continental competition within 6 seasons."],
      brutal: ["Win a continental competition within 10 seasons."],
    },
    wildcardsByDifficulty: {
      casual: ["You must use one formation all season."],
      hard: ["You must sell your best player if a bigger club bids."],
      brutal: ["You can only sign free agents for one full season (you choose which season)."],
    },
  },

  {
    id: "no_transfers",
    name: "No Transfers",
    description: "No signings. No excuses. Survive with what you’ve got.",
    clubCriteria: { region: "any" },
    rulesByDifficulty: {
      casual: [{ category: "Transfers", text: "No permanent signings allowed." }],
      hard: [{ category: "Transfers", text: "No permanent signings allowed." }, { category: "Transfers", text: "No loans allowed (incoming or outgoing)." }],
      brutal: [
        { category: "Transfers", text: "No permanent signings allowed." },
        { category: "Transfers", text: "No loans allowed (incoming or outgoing)." },
        { category: "Finance", text: "You must reduce the wage bill by 10% in year one." },
      ],
    },
    objectivesByDifficulty: {
      casual: ["Finish top half this season."],
      hard: ["Qualify for continental competition within 4 seasons."],
      brutal: ["Win a major trophy within 5 seasons."],
    },
    wildcardsByDifficulty: {
      casual: ["You must promote at least 1 youth player to the first team this season."],
      hard: ["You must sell one senior starter in the first window."],
      brutal: ["You must accept any offer for a player over 30."],
    },
  },

  {
    id: "fallen_giant",
    name: "Fallen Giant",
    description: "A big-name club that’s slipped. Restore them and reclaim dominance.",
    clubCriteria: { region: "europe" },
    rulesByDifficulty: {
      casual: [{ category: "Transfers", text: "You may only sign players from your country." }],
      hard: [{ category: "Finance", text: "Finish each season with a positive net spend." }, { category: "Transfers", text: "You may only sign players from your country." }],
      brutal: [
        { category: "Finance", text: "Finish each season with a positive net spend." },
        { category: "Transfers", text: "You may only sign players from your country." },
        { category: "Tactics", text: "You must use the same formation all season." },
      ],
    },
    objectivesByDifficulty: {
      casual: ["Win promotion / return to the top division within 2 seasons."],
      hard: ["Qualify for Europe within 3 seasons."],
      brutal: ["Win the league within 5 seasons."],
    },
    wildcardsByDifficulty: {
      casual: ["You must keep at least 3 club-grown players in the XI."],
      hard: ["Sell your highest earner in year one."],
      brutal: ["No transfers in January (buy or sell)."],
    },
  },

  {
    id: "journeyman",
    name: "Journeyman",
    description: "Start small. Move only when you’ve earned it.",
    clubCriteria: { region: "any" },
    rulesByDifficulty: {
      casual: [{ category: "Squad", text: "You must use at least 2 U21s in your matchday squad." }],
      hard: [{ category: "Transfers", text: "You may only sign free agents." }, { category: "Squad", text: "You must use at least 2 U21s in your matchday squad." }],
      brutal: [
        { category: "Transfers", text: "You may only sign free agents." },
        { category: "Finance", text: "Your wage bill must stay under 70% of budget." },
        { category: "Squad", text: "You must use at least 3 U21s in your matchday squad." },
      ],
    },
    objectivesByDifficulty: {
      casual: ["Win a trophy with 3 different clubs."],
      hard: ["Win a top-flight league title in 3 different countries."],
      brutal: ["Win a continental competition in 2 different continents."],
    },
    wildcardsByDifficulty: {
      casual: ["You must change club after winning a trophy."],
      hard: ["You can only move jobs once per season."],
      brutal: ["If sacked, you must take the first job offered."],
    },
  },
];