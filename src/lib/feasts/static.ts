import { Feast } from "@/models/Feast";

const currentYear = new Date().getFullYear();

export const solemnityOfMary: Feast = {
  id: 101,
  name: "Szűz Mária istenanyaságának ünnepe",
  date: new Date(currentYear, 0, 1),
  colorScheme: "blue",
};

export const epiphany: Feast = {
  id: 106,
  name: "Vízkereszt",
  date: new Date(currentYear, 0, 6),
  additionalInfo: ["Urunk megjelenése"],
  colorScheme: "green",
};

export const assumptionOfMary: Feast = {
  id: 815,
  name: "Nagyboldogasszony",
  date: new Date(currentYear, 7, 15),
  additionalInfo: ["Mária mennybevétele"],
  colorScheme: "blue",
};

export const allSaints: Feast = {
  id: 1101,
  name: "Mindenszentek",
  date: new Date(currentYear, 10, 1),
  colorScheme: "green",
};

export const allSoulsDay: Feast = {
  id: 1102,
  name: "Halottak napja",
  date: new Date(currentYear, 10, 2),
  colorScheme: "green",
};

export const christmas: Feast = {
  id: 1225,
  name: "Karácsony",
  date: new Date(currentYear, 11, 25),
  additionalInfo: ["Nativitatis Domini"],
  colorScheme: "gold",
};

export const holyInnocentsDay: Feast = {
  id: 1228,
  name: "Aprószentek",
  date: new Date(currentYear, 11, 28),
  colorScheme: "green",
};
