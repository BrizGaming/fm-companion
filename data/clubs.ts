export type Club = {
  name: string;
  league: string;
  region: "europe" | "south_america";
};

export const CLUBS: Club[] = [
  { name: "Dinamo Zagreb", league: "Croatian First Football League", region: "europe" },
  { name: "FC Nordsjælland", league: "Danish Superliga", region: "europe" },
  { name: "Real Zaragoza", league: "Spain (2nd Tier)", region: "europe" },
  { name: "Cercle Brugge", league: "Belgian Pro League", region: "europe" },

  { name: "Defensa y Justicia", league: "Argentina Primera División", region: "south_america" },
  { name: "Universidad Católica", league: "Chilean Primera División", region: "south_america" },
  { name: "América Mineiro", league: "Brazil (2nd Tier)", region: "south_america" },
  { name: "Millonarios", league: "Colombian Primera A", region: "south_america" },
];