import { NextRequest, NextResponse } from "next/server";
import { mistral } from "@/lib/mistral";
import { PROMPTS } from "@/lib/ai-prompts";
import { handleMistralError } from "@/lib/ai-error-handler";
import { checkRateLimit } from "@/lib/ai-rate-limit";

interface FraseBody {
  nombre: string;
  cargo: string;
  habilidades: string[];
  experiencia: string[];
  formacion: string[];
  identificador?: string;
}

function buildPrompt(data: FraseBody, estilo: "tecnica" | "humana" | "logros"): string {
  const base = `Perfil: ${data.nombre}, ${data.cargo}. Habilidades: ${data.habilidades.slice(0, 5).join(", ")}.`;
  const estilos = {
    tecnica: `${base} Enfócate en sus habilidades técnicas.`,
    humana:  `${base} Enfócate en su impacto y valores profesionales.`,
    logros:  `${base} Formación: ${data.formacion.join(", ")}. Experiencia: ${data.experiencia.join(", ")}. Enfócate en sus logros.`,
  };
  return estilos[estilo];
}

export async function POST(req: NextRequest) {
  try {
    const body: FraseBody = await req.json();
    const identificador = body.identificador ?? "anon";

    if (!body.nombre?.trim() || !body.cargo?.trim()) {
      return NextResponse.json({ error: "Nombre y cargo son requeridos" }, { status: 400 });
    }

    const rl = checkRateLimit("frase", identificador);
    if (!rl.ok) return NextResponse.json({ error: rl.mensaje }, { status: 429 });

    const makeCall = (estilo: "tecnica" | "humana" | "logros") =>
      mistral.chat.complete({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: PROMPTS.FRASE },
          { role: "user", content: buildPrompt(body, estilo) },
        ],
        maxTokens: 100,
      });

    const [op1, op2, op3] = await Promise.all([
      makeCall("tecnica"),
      makeCall("humana"),
      makeCall("logros"),
    ]);

    const opciones = [op1, op2, op3].map(
      (r) => ((r.choices?.[0]?.message?.content as string) ?? "").trim()
    );

    return NextResponse.json({ opciones });
  } catch (error) {
    return handleMistralError(error);
  }
}
