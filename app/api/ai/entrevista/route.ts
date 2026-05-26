import { NextRequest, NextResponse } from "next/server";
import { mistral } from "@/lib/mistral";
import { PROMPTS } from "@/lib/ai-prompts";
import { handleMistralError } from "@/lib/ai-error-handler";
import { checkRateLimit } from "@/lib/ai-rate-limit";

type Seccion = "experiencia" | "proyectos" | "formacion";
type Mensaje = { role: "user" | "assistant"; content: string };

interface EntrevistaBody {
  messages: Mensaje[];
  seccionActual: Seccion;
  contextoExistente?: object;
  identificador?: string;
}

const META: Record<Seccion, string> = {
  experiencia: `Recopila en el JSON estos campos exactos: cargo, empresa, tipo, fechaInicio (mes y año, ej: "Marzo 2020"), fechaFin (mes y año o "Actualidad"), descripcion.`,
  proyectos:   `Recopila en el JSON estos campos exactos: nombre, descripcion, tipo (web/app/otro), tecnologias (array), url.`,
  formacion:   `Recopila en el JSON estos campos exactos: programa, institucion, nivel, fechaInicio (mes y año, ej: "Enero 2015"), fechaFin (mes y año, ej: "Junio 2020").`,
};

function buildSystem(seccion: Seccion, contexto?: object): string {
  const ctx = contexto ? `\nDatos ya registrados: ${JSON.stringify(contexto)}` : "";
  return `${PROMPTS.ENTREVISTA}\n\nSección actual: ${seccion}. ${META[seccion]}${ctx}`;
}

function extraerDatos(texto: string): object | null {
  try {
    const limpio = texto.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
    const inicio = limpio.indexOf("{");
    const fin = limpio.lastIndexOf("}");
    if (inicio === -1 || fin === -1) return null;
    return JSON.parse(limpio.slice(inicio, fin + 1));
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: EntrevistaBody = await req.json();
    const { messages, seccionActual, contextoExistente, identificador = "anon" } = body;

    const rl = checkRateLimit("entrevista", identificador);
    if (!rl.ok) return NextResponse.json({ error: rl.mensaje }, { status: 429 });

    const result = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: [
        { role: "system", content: buildSystem(seccionActual, contextoExistente) },
        ...messages,
      ],
      maxTokens: 400,
    });

    const contenido = ((result.choices?.[0]?.message?.content as string) ?? "").trim();
    const completado = contenido.includes("SECCIÓN_COMPLETA");

    if (completado) {
      const datos = extraerDatos(contenido);
      const mensaje = contenido.split("SECCIÓN_COMPLETA")[0].trim();
      return NextResponse.json({ completado: true, mensaje, datos });
    }

    return NextResponse.json({ completado: false, mensaje: contenido });
  } catch (error) {
    return handleMistralError(error);
  }
}
