import { NextRequest, NextResponse } from "next/server";
import { mistral } from "@/lib/mistral";
import { PROMPTS } from "@/lib/ai-prompts";
import { handleMistralError } from "@/lib/ai-error-handler";
import { checkRateLimit } from "@/lib/ai-rate-limit";

const TIPOS_VALIDOS = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_BYTES = 10 * 1024 * 1024;

function extraerJSON(texto: string): object {
  // Strip markdown code fences
  const limpio = texto.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
  // Find the first complete {...} block
  const inicio = limpio.indexOf("{");
  const fin = limpio.lastIndexOf("}");
  if (inicio === -1 || fin === -1) return {};
  return JSON.parse(limpio.slice(inicio, fin + 1));
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const archivo = form.get("archivo") as File | null;
    const identificador = (form.get("identificador") as string | null) ?? "anon";

    if (!archivo) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    }
    if (!TIPOS_VALIDOS.includes(archivo.type)) {
      return NextResponse.json({ error: "Solo se aceptan JPG, PNG, WEBP o PDF" }, { status: 400 });
    }
    if (archivo.size > MAX_BYTES) {
      return NextResponse.json({ error: "El archivo no puede superar 10MB" }, { status: 400 });
    }

    const rl = checkRateLimit("certificado", identificador);
    if (!rl.ok) return NextResponse.json({ error: rl.mensaje }, { status: 429 });

    const buffer = await archivo.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    let textoExtraido: string;

    if (archivo.type === "application/pdf") {
      const ocr = await mistral.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "document_url",
          documentUrl: `data:application/pdf;base64,${base64}`,
        },
      });
      textoExtraido = ocr.pages.map((p) => p.markdown).join("\n");

      const chat = await mistral.chat.complete({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: PROMPTS.CERTIFICADO },
          { role: "user", content: `Extrae los datos de este certificado:\n${textoExtraido}` },
        ],
        maxTokens: 300,
      });
      textoExtraido = (chat.choices?.[0]?.message?.content as string) ?? "{}";
    } else {
      const chat = await mistral.chat.complete({
        model: "mistral-small-latest",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPTS.CERTIFICADO + "\nExtrae los datos de este certificado:" },
              { type: "image_url", imageUrl: `data:${archivo.type};base64,${base64}` },
            ],
          },
        ],
        maxTokens: 300,
      });
      textoExtraido = (chat.choices?.[0]?.message?.content as string) ?? "{}";
    }

    const datos = extraerJSON(textoExtraido) as Record<string, string | null>;
    return NextResponse.json({
      programa:    datos.programa    ?? null,
      institucion: datos.institucion ?? null,
      nivel:       datos.nivel       ?? null,
      fechaInicio: datos.fechaInicio ?? datos.anioInicio ?? datos.año_inicio ?? null,
      fechaFin:    datos.fechaFin    ?? datos.anioFin    ?? datos.año_fin    ?? null,
      urlCert:     null,
    });
  } catch (error) {
    return handleMistralError(error);
  }
}
