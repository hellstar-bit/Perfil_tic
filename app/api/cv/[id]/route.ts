import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { createElement } from "react";
import { prisma } from "@/lib/prisma";
import { CVDocument } from "@/components/pdf/CVDocument";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/cv/[id]">) {
  try {
    const { id } = await ctx.params;

    const perfil = await prisma.perfil.findUnique({
      where: { id },
      include: {
        habilidades: true,
        proyectos: true,
        formacion: true,
        experiencia: true,
      },
    });

    if (!perfil) {
      return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stream = await renderToStream(createElement(CVDocument, { perfil }) as any);

    const chunks: Uint8Array[] = [];
    for await (const chunk of stream as AsyncIterable<Buffer>) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="cv-${perfil.slug}.pdf"`,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("[GET /api/cv/[id]]", err);
    return NextResponse.json({ error: "Error generando PDF" }, { status: 500 });
  }
}
