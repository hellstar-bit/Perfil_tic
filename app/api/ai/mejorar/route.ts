import { NextRequest, NextResponse } from "next/server";
import { mistral } from "@/lib/mistral";
import { PROMPTS } from "@/lib/ai-prompts";
import { handleMistralError } from "@/lib/ai-error-handler";
import { checkRateLimit } from "@/lib/ai-rate-limit";

interface MejorarBody {
  texto: string;
  contexto: "proyecto" | "experiencia" | "formacion";
  cargo?: string;
  identificador?: string;
}

function buildPrompt(texto: string, contexto: MejorarBody["contexto"], cargo?: string): string {
  if (contexto === "proyecto") return `Mejora esta descripción de proyecto TIC: ${texto}`;
  if (contexto === "experiencia") return `Mejora esta descripción de experiencia laboral para el cargo ${cargo ?? "profesional TIC"}: ${texto}`;
  return `Mejora esta descripción de formación académica: ${texto}`;
}

export async function POST(req: NextRequest) {
  try {
    const body: MejorarBody = await req.json();
    const { texto, contexto, cargo, identificador = "anon" } = body;

    if (!texto || texto.trim().length < 10) {
      return NextResponse.json({ error: "El texto debe tener al menos 10 caracteres" }, { status: 400 });
    }
    if (texto.length > 500) {
      return NextResponse.json({ error: "El texto no puede superar 500 caracteres" }, { status: 400 });
    }

    const rl = checkRateLimit("mejorar", identificador);
    if (!rl.ok) return NextResponse.json({ error: rl.mensaje }, { status: 429 });

    const result = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: [
        { role: "system", content: PROMPTS.MEJORAR },
        { role: "user", content: buildPrompt(texto, contexto, cargo) },
      ],
      maxTokens: 200,
    });

    const mejorado = ((result.choices?.[0]?.message?.content as string) ?? "").trim();
    return NextResponse.json({ mejorado, original: texto });
  } catch (error) {
    return handleMistralError(error);
  }
}
