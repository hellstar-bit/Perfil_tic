import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const habilidadSchema = z.object({
  nombre: z.string().min(1),
  nivel: z.number().int().min(1).max(5),
});

const proyectoSchema = z.object({
  titulo: z.string().min(1),
  descripcion: z.string().min(1),
  tag: z.string().optional(),
  enlace: z.string().url().optional().or(z.literal("")),
  imagen: z.string().optional(),
});

const formacionSchema = z.object({
  titulo: z.string().min(1),
  institucion: z.string().min(1),
  periodo: z.string().min(1),
  descripcion: z.string().optional(),
  urlCert: z.string().url().optional().or(z.literal("")),
});

const experienciaSchema = z.object({
  cargo: z.string().min(1),
  empresa: z.string().min(1),
  periodo: z.string().min(1),
  descripcion: z.string().min(1),
  tipo: z.enum(["formal", "informal", "voluntariado", "practica"]),
});

const perfilSchema = z.object({
  nombre: z.string().min(1),
  apellido: z.string().optional(),
  cargo: z.string().min(1),
  region: z.string().min(1),
  email: z.string().email(),
  telefono: z.string().optional(),
  foto: z.string().optional(),
  frase: z.string().optional(),
  modalidad: z.string().optional(),
  habilidades: z.array(habilidadSchema).default([]),
  proyectos: z.array(proyectoSchema).default([]),
  formacion: z.array(formacionSchema).default([]),
  experiencia: z.array(experienciaSchema).default([]),
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

    const { nombre, apellido, cargo, region, email, telefono, foto, frase, modalidad, habilidades, proyectos, formacion, experiencia } = parsed.data;
    const fullName = apellido ? `${nombre} ${apellido}` : nombre;
    const slugBase = toSlug(fullName);
    const slug = await uniqueSlug(slugBase);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const perfil = await (prisma.$transaction as any)(async (tx: typeof prisma) => {
      const p = await tx.perfil.create({
        data: {
          slug,
          nombre: fullName,
          cargo,
          region,
          email,
          telefono,
          foto,
          frase,
          modalidad,
        },
      });

      if (habilidades.length > 0) {
        await tx.habilidad.createMany({
          data: habilidades.map((h) => ({ ...h, perfilId: p.id })),
        });
      }

      if (proyectos.length > 0) {
        await tx.proyecto.createMany({
          data: proyectos.map((pr) => ({
            ...pr,
            enlace: pr.enlace || null,
            perfilId: p.id,
          })),
        });
      }

      if (formacion.length > 0) {
        await tx.formacion.createMany({
          data: formacion.map((f) => ({
            ...f,
            urlCert: f.urlCert || null,
            perfilId: p.id,
          })),
        });
      }

      if (experiencia.length > 0) {
        await tx.experiencia.createMany({
          data: experiencia.map((e) => ({ ...e, perfilId: p.id })),
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
