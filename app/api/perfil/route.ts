import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const habilidadSchema = z.object({
  nombre: z.string().min(1),
  nivel: z.number().int().min(1).max(5),
});

const formacionSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1),
  institucion: z.string().min(1),
  nivel: z.string().min(1),
  inicio: z.string().min(1),
  fin: z.string().min(1),
  cert: z.string().optional().default(""),
});

const proyectoSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1),
  descripcion: z.string().min(1),
  tipo: z.string().min(1),
  tecnologias: z.array(z.string()).default([]),
  url: z.string().optional().default(""),
  imagen: z.string().optional().default(""),
  color: z.string().optional().default(""),
  iniciales: z.string().optional().default(""),
});

const experienciaSchema = z.object({
  id: z.string().optional(),
  cargo: z.string().min(1),
  empresa: z.string().min(1),
  tipo: z.string().min(1),
  emoji: z.string().optional().default(""),
  inicio: z.string().min(1),
  fin: z.string().min(1),
  descripcion: z.string().min(1),
});

const perfilSchema = z.object({
  nombre: z.string().min(1),
  apellido: z.string().optional(),
  cargo: z.string().min(1),
  departamento: z.string().min(1),
  municipio: z.string().min(1),
  email: z.string().email(),
  telefono: z.string().optional(),
  foto: z.string().optional(),
  frase: z.string().optional(),
  modalidad: z.string().optional(),
  habilidades: z.array(habilidadSchema).default([]),
  formaciones: z.array(formacionSchema).default([]),
  proyectos: z.array(proyectoSchema).default([]),
  experiencias: z.array(experienciaSchema).default([]),
});

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function uniqueSlug(base: string): Promise<string> {
  const existing = await prisma.perfil.findMany({
    where: { slug: { startsWith: base } },
    select: { slug: true },
  });
  const taken = new Set(existing.map((p: { slug: string }) => p.slug));
  if (!taken.has(base)) return base;
  let i = 2;
  while (taken.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = perfilSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      nombre, apellido, cargo, departamento, municipio, email,
      telefono, foto, frase, modalidad,
      habilidades, formaciones, proyectos, experiencias,
    } = parsed.data;

    const fullName = apellido ? `${nombre} ${apellido}` : nombre;
    const slugBase = toSlug(fullName);
    const slug = await uniqueSlug(slugBase);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const perfil = await (prisma.$transaction as any)(async (tx: typeof prisma) => {
      const p = await tx.perfil.create({
        data: { slug, nombre: fullName, cargo, departamento, municipio, email, telefono, foto, frase, modalidad },
      });

      if (habilidades.length > 0) {
        await tx.habilidad.createMany({
          data: habilidades.map((h) => ({ ...h, perfilId: p.id })),
        });
      }

      if (formaciones.length > 0) {
        await tx.formacion.createMany({
          data: formaciones.map((f) => ({
            programa: f.nombre,
            institucion: f.institucion,
            nivel: f.nivel,
            anioInicio: f.inicio,
            anioFin: f.fin,
            urlCert: f.cert || null,
            perfilId: p.id,
          })),
        });
      }

      if (proyectos.length > 0) {
        await tx.proyecto.createMany({
          data: proyectos.map((pr) => ({
            titulo: pr.nombre,
            descripcion: pr.descripcion,
            tag: [pr.tipo, ...pr.tecnologias].filter(Boolean).join(", "),
            enlace: pr.url || null,
            imagen: pr.imagen || null,
            perfilId: p.id,
          })),
        });
      }

      if (experiencias.length > 0) {
        await tx.experiencia.createMany({
          data: experiencias.map((e) => ({
            cargo: e.cargo,
            empresa: e.empresa,
            periodo: `${e.inicio} — ${e.fin}`,
            descripcion: e.descripcion,
            tipo: e.tipo,
            perfilId: p.id,
          })),
        });
      }

      return p;
    });

    return NextResponse.json({ perfilId: perfil.id, slug: perfil.slug }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/perfil]", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
