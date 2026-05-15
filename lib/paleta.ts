export type ColorTema = {
  color: string;
  light: string;
  nombre: string;
};

export const PALETA: ColorTema[] = [
  { color: "#0f6e56", light: "#ecf7f2", nombre: "Esmeralda" },
  { color: "#1a3a6b", light: "#e8eef7", nombre: "Azul marino" },
  { color: "#2d3748", light: "#edf2f7", nombre: "Antracita" },
  { color: "#3730a3", light: "#ede9fe", nombre: "Índigo" },
  { color: "#7b2d2d", light: "#fee2e2", nombre: "Burdeos" },
  { color: "#0f766e", light: "#f0fdfa", nombre: "Teal" },
  { color: "#5b21b6", light: "#f5f3ff", nombre: "Violeta" },
  { color: "#9a3412", light: "#fff7ed", nombre: "Terracota" },
];

export function getLightColor(color: string): string {
  return PALETA.find((p) => p.color === color)?.light ?? "#ecf7f2";
}
