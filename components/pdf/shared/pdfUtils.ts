export const NIVEL_LABEL = ["Sé poco", "Básico", "Intermedio", "Avanzado", "Experto"] as const;

export function getIniciales(nombre: string): string {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

export function formatPeriodo(inicio: string, fin: string): string {
  return `${inicio} — ${fin}`;
}

export function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

/** Parses "Tipo, tech1, tech2" stored in proyecto.tag */
export function parseTag(tag: string | null | undefined): { tipo: string; techs: string[] } {
  const parts = (tag ?? "").split(", ").map((s) => s.trim()).filter(Boolean);
  return { tipo: parts[0] ?? "", techs: parts.slice(1) };
}

/** Hex color → same color at reduced opacity (approx, returns hex 6-digit) */
export function withOpacity(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, "0");
  return `#${hex.slice(1)}${alpha}`;
}

/** Returns a very light tint of the given hex (white mix at 90%) */
export function lightTint(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c: number) => Math.round(c * 0.12 + 255 * 0.88).toString(16).padStart(2, "0");
  return `#${mix(r)}${mix(g)}${mix(b)}`;
}
