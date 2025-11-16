// constants/players.js

export const PLAYERS = [
  { name: "Frax" },
  { name: "Alby" },
  { name: "Micky" },
  { name: "Pietro" },
  { name: "Andre" },
  { name: "Carlo" },
  { name: "Edo" },
  { name: "Cusi" },
  { name: "Davide" },
  { name: "Matte" },
  { name: "Gaga" },
];

export const getPlayerByName = (name) => {
  return PLAYERS.find((p) => p.name === name);
};

export const getPlayerName = (name) => {
  const player = getPlayerByName(name);
  return player?.name || "Sconosciuto";
};
