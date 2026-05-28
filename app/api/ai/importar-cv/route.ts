import { NextRequest, NextResponse } from "next/server";
import { mistral } from "@/lib/mistral";
import { handleMistralError } from "@/lib/ai-error-handler";
import { checkRateLimit } from "@/lib/ai-rate-limit";
import { randomUUID } from "crypto";

const MAX_BYTES = 10 * 1024 * 1024;

const PROMPT = `Eres un extractor de datos de hojas de vida (CV/resume) profesionales.
Lee el documento y extrae TODA la información disponible.
Devuelve ÚNICAMENTE JSON válido con esta estructura exacta (sin markdown, sin texto adicional):
{
  "nombre": "",
  "apellido": "",
  "cargo": "",
  "email": "",
  "telefono": "",
  "municipio": "",
  "departamento": "",
  "modalidad": "",
  "habilidades": [{"nombre": "", "nivel": 3}],
  "formaciones": [{"nombre": "", "institucion": "", "nivel": "", "inicio": "", "fin": ""}],
  "proyectos": [{"nombre": "", "descripcion": "", "tipo": "", "tecnologias": [], "url": ""}],
  "experiencias": [{"cargo": "", "empresa": "", "inicio": "", "fin": "", "descripcion": "", "tipo": "empleo"}]
}
Reglas:
- nivel de habilidades (1-5): infiere del contexto. Por defecto usa 3.
- tipo de experiencia: "empleo", "freelance", "sena", "voluntariado" o "comunitario".
- nivel de formación: "Bachillerato", "Técnico", "Tecnólogo", "Universitario", "Especialización", "Maestría", "Doctorado", "Curso", "Certificación", "Bootcamp" o "Diplomado".
- modalidad: "Remoto", "Híbrido", "Presencial" o "" si no aparece.
- tecnologias: array de strings con las tecnologías del proyecto, ej. ["React", "Node.js"].
- tipo de proyecto: "Académico", "Personal", "Freelance", "Voluntariado", "Laboral" o "Otro".
- inicio y fin de experiencias/formaciones: formato "Mes YYYY" (ej: "Marzo 2020") o solo año "2020". Si no hay fecha fin usa "Presente".
- Usa "" para campos de texto no encontrados, [] para listas vacías.
- No inventes información que no esté en el documento.`;

const COLORES = ["#d2ede2", "#fcebd5", "#e8e4f5", "#d5e8f4", "#f5e4e4", "#f5f0e4"];

function iniciales(nombre: string) {
  return nombre.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("") || "??";
}

function colorAleatorio() {
  return COLORES[Math.floor(Math.random() * COLORES.length)];
}

function extraerJSON(texto: string): Record<string, unknown> {
  const limpio = texto.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
  const inicio = limpio.indexOf("{");
  const fin = limpio.lastIndexOf("}");
  if (inicio === -1 || fin === -1) return {};
  return JSON.parse(limpio.slice(inicio, fin + 1)) as Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizar(datos: Record<string, unknown>): Record<string, unknown> {
  const formaciones = ((datos.formaciones as any[]) ?? []).map((f: any) => ({
    id:          randomUUID(),
    nombre:      f.nombre      ?? "",
    institucion: f.institucion ?? "",
    nivel:       f.nivel       ?? "",
    inicio:      f.inicio      ?? f.anioInicio ?? "",
    fin:         f.fin         ?? f.anioFin    ?? "",
    cert:        "",
  }));

  const proyectos = ((datos.proyectos as any[]) ?? []).map((p: any) => ({
    id:          randomUUID(),
    nombre:      p.nombre   ?? p.titulo ?? "",
    descripcion: p.descripcion ?? "",
    tipo:        p.tipo     ?? "",
    tecnologias: Array.isArray(p.tecnologias)
      ? p.tecnologias
      : (p.tag ?? "").split(",").map((t: string) => t.trim()).filter(Boolean),
    url:         p.url      ?? p.enlace ?? "",
    imagen:      "",
    color:       colorAleatorio(),
    iniciales:   iniciales(p.nombre ?? p.titulo ?? "P"),
  }));

  const experiencias = ((datos.experiencias as any[]) ?? []).map((e: any) => ({
    id:          randomUUID(),
    cargo:       e.cargo       ?? "",
    empresa:     e.empresa     ?? "",
    tipo:        e.tipo        ?? "empleo",
    emoji:       "💼",
    inicio:      e.inicio      ?? "",
    fin:         e.fin         ?? e.periodo?.split("—")[1]?.trim() ?? "Presente",
    descripcion: e.descripcion ?? "",
  }));

  const habilidades = ((datos.habilidades as any[]) ?? []).map((h: any) => ({
    nombre: h.nombre ?? "",
    nivel:  Number(h.nivel) || 3,
  }));

  return {
    nombre:       datos.nombre       ?? "",
    apellido:     datos.apellido     ?? "",
    cargo:        datos.cargo        ?? "",
    email:        datos.email        ?? "",
    telefono:     datos.telefono     ?? "",
    municipio:    datos.municipio    ?? "",
    departamento: datos.departamento ?? "",
    modalidad:    datos.modalidad    ?? "",
    habilidades,
    formaciones,
    proyectos,
    experiencias,
  };
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const archivo = form.get("archivo") as File | null;
    const identificador = (form.get("identificador") as string | null) ?? "anon";
    const puestoObjetivo = (form.get("puestoObjetivo") as string | null)?.trim() ?? "";

    if (!archivo) return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    if (archivo.type !== "application/pdf") return NextResponse.json({ error: "Solo se aceptan archivos PDF" }, { status: 400 });
    if (archivo.size > MAX_BYTES) return NextResponse.json({ error: "El archivo no puede superar 10 MB" }, { status: 400 });

    const rl = checkRateLimit("importar-cv", identificador);
    if (!rl.ok) return NextResponse.json({ error: rl.mensaje }, { status: 429 });

    const buffer = await archivo.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const ocr = await mistral.ocr.process({
      model: "mistral-ocr-latest",
      document: { type: "document_url", documentUrl: `data:application/pdf;base64,${base64}` },
    });
    const texto = ocr.pages.map((p) => p.markdown).join("\n");

    const contexto = puestoObjetivo
      ? `El candidato quiere aplicar a: "${puestoObjetivo}". Adapta el campo "cargo" para reflejar ese objetivo, y ordena las habilidades priorizando las más relevantes para ese puesto. No omitas información del CV — solo reorganiza y enfoca.`
      : "Extrae todos los datos tal como aparecen en el CV.";

    const chat = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: [
        { role: "system", content: PROMPT },
        { role: "user", content: `${contexto}\n\nHoja de vida:\n\n${texto}` },
      ],
      maxTokens: 2000,
    });

    const raw = (chat.choices?.[0]?.message?.content as string) ?? "{}";
    const datos = extraerJSON(raw);
    return NextResponse.json(normalizar(datos));
  } catch (error) {
    return handleMistralError(error);
  }
}
