const LIMITES: Record<string, number> = {
  certificado: 10,
  frase: 5,
  mejorar: 20,
  coach: 3,
  entrevista: 50,
};

const MENSAJES: Record<string, string> = {
  certificado: "lecturas de certificado",
  frase: "generaciones de frase",
  mejorar: "mejoras de texto",
  coach: "análisis de coach",
  entrevista: "turnos de entrevista",
};

const contadores = new Map<string, Record<string, number>>();

const enabled = process.env.AI_RATE_LIMIT_ENABLED !== "false";

export function checkRateLimit(
  funcion: string,
  identificador: string
): { ok: boolean; mensaje?: string } {
  if (!enabled) return { ok: true };

  const limite = LIMITES[funcion] ?? 10;
  const key = `${funcion}:${identificador}`;

  const entrada = contadores.get(key) ?? { count: 0 };
  if (entrada.count >= limite) {
    return {
      ok: false,
      mensaje: `Ya usaste todas tus ${MENSAJES[funcion] ?? funcion} disponibles. Puedes continuar llenando manualmente.`,
    };
  }

  entrada.count += 1;
  contadores.set(key, entrada);
  return { ok: true };
}
