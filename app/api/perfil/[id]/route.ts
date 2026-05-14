import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const include = {
  habilidades: true,
  proyectos: true,
  formacion: true,
  experiencia: true,
};

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/perfil/[id]">) {
  try {
    const { id } = await ctx.params;
    const perfil = await prisma.perfil.findUnique({ where: { id }, include });
    if (!perfil) {
      return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 });
    }
    return NextResponse.json(perfil);
  } catch (err) {
    console.error("[GET /api/perfil/[id]]", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/perfil/[id]">) {
  try {
    const { id } = await ctx.params;
    const body = await request.json();

    const existing = await prisma.perfil.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 });
    }

    const { habilidades, proyectos, formacion, experiencia, ...fields } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const perfil = await (prisma.$transaction as any)(async (tx: typeof prisma) => {
      const p = await tx.perfil.update({ where: { id }, data: fields });

      if (habilidades !== undefined) {
        await tx.habilidad.deleteMany({ where: { perfilId: id } });
        if (habilidades.length > 0) {
          await tx.habilidad.createMany({
            data: habilidades.map((h: { nombre: string; nivel: number }) => ({ ...h, perfilId: id })),
          });
        }
      }

      if (proyectos !== undefined) {
        await tx.proyecto.deleteMany({ where: { perfilId: id } });
        if (proyectos.length > 0) {
          await tx.proyecto.createMany({
            data: proyectos.map((pr: object) => ({ ...pr, perfilId: id })),
          });
        }
      }

      if (formacion !== undefined) {
        await tx.formacion.deleteMany({ where: { perfilId: id } });
        if (formacion.length > 0) {
          await tx.formacion.createMany({
            data: formacion.map((f: object) => ({ ...f, perfilId: id })),
          });
        }
      }

      if (experiencia !== undefined) {
        await tx.experiencia.deleteMany({ where: { perfilId: id } });
        if (experiencia.length > 0) {
          await tx.experiencia.createMany({
            data: experiencia.map((e: object) => ({ ...e, perfilId: id })),
          });
        }
      }

      return p;
    });

    return NextResponse.json(perfil);
  } catch (err) {
    console.error("[PUT /api/perfil/[id]]", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
