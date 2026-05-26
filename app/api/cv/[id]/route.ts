import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { createElement } from "react";
import { prisma } from "@/lib/prisma";
import { CVDocument } from "@/components/pdf/CVDocument";
import type { TemplateId } from "@/components/pdf/shared/pdfTypes";

const VALID_TEMPLATES: TemplateId[] = [
  "clasica", "ejecutiva", "tech", "minimalista", "compacta", "internacional", "creativa",
];

export async function GET(req: NextRequest, ctx: RouteContext<"/api/cv/[id]">) {
  try {
    const { id } = await ctx.params;
    const raw = req.nextUrl.searchParams.get("template") ?? "clasica";
    const templateId: TemplateId = (VALID_TEMPLATES.includes(raw as TemplateId)
      ? raw
      : "clasica") as TemplateId;
    const isPreview = req.nextUrl.searchParams.get("preview") === "1";

    const perfil = await prisma.perfil.findUnique({
      where: { id },
      include: {
        habilidades: true,
        proyectos:   true,
        formacion:   true,
        experiencia: true,
      },
    });

    if (!perfil) {
      return NextResponse.json({ error: "Perfil no encontrado" }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stream = await renderToStream(createElement(CVDocument, { perfil, templateId }) as any);

    const chunks: Uint8Array[] = [];
    for await (const chunk of stream as AsyncIterable<Buffer>) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": isPreview
          ? "inline"
          : `attachment; filename="cv-${perfil.slug}-${templateId}.pdf"`,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("[GET /api/cv/[id]]", err);
    return NextResponse.json({ error: "Error generando PDF" }, { status: 500 });
  }
}
