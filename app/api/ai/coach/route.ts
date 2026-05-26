import { NextRequest, NextResponse } from "next/server";
import { mistral } from "@/lib/mistral";
import { PROMPTS } from "@/lib/ai-prompts";
import { handleMistralError } from "@/lib/ai-error-handler";
import { checkRateLimit } from "@/lib/ai-rate-limit";
import type { Formacion, Proyecto, Experiencia } from "@/types/perfil";

interface CoachBody {
  nombre: string;
  cargo: string;
  frase?: string;
  foto?: string;
  habilidades: { nombre: string; nivel: number }[];
  formaciones: Formacion[];
  proyectos: Proyecto[];
  experiencias: Experiencia[];
  identificador?: string;
}

function buildPrompt(p: CoachBody): string {
  return `Analiza este perfil TIC colombiano:
- Nombre: ${p.nombre}, Cargo: ${p.cargo}
- Habilidades (${p.habilidades.length}): ${p.habilidades.map((h) => h.nombre).join(", ") || "ninguna"}
- Formación (${p.formaciones.length} items): ${p.formaciones.map((f) => f.nombre).join(", ") || "ninguna"}
- Experiencia (${p.experiencias.length} items): ${p.experiencias.map((e) => e.tipo).join(", ") || "ninguna"}
- Proyectos (${p.proyectos.length}): ${p.proyectos.map((pr) => pr.nombre).join(", ") || "ninguno"}
- Frase: ${p.frase?.trim() || "sin frase"}
- Foto: ${p.foto ? "sí" : "no"}`;
}

export async function POST(req: NextRequest) {
  try {
    const body: CoachBody = await req.json();
    const identificador = body.identificador ?? "anon";

    const rl = checkRateLimit("coach", identificador);
    if (!rl.ok) return NextResponse.json({ error: rl.mensaje }, { status: 429 });

    const result = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: [
        { role: "system", content: PROMPTS.COACH },
        { role: "user", content: buildPrompt(body) },
      ],
      maxTokens: 500,
    });

    const raw = ((result.choices?.[0]?.message?.content as string) ?? "{}").trim();
    const limpio = raw.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
    const idx = limpio.indexOf("{");
    const datos = idx !== -1 ? JSON.parse(limpio.slice(idx, limpio.lastIndexOf("}") + 1)) : {};

    return NextResponse.json({
      score:             Number(datos.score)             ?? 0,
      fortalezas:        Array.isArray(datos.fortalezas) ? datos.fortalezas.slice(0, 3) : [],
      mejorar:           Array.isArray(datos.mejorar)    ? datos.mejorar.slice(0, 3)    : [],
      consejo_principal: String(datos.consejo_principal ?? ""),
    });
  } catch (error) {
    return handleMistralError(error);
  }
}
