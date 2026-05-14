import { NextRequest, NextResponse } from "next/server";
import { getMunicipios } from "@/lib/colombia";

export async function GET(req: NextRequest) {
  const dpto = req.nextUrl.searchParams.get("dpto");
  if (!dpto) {
    return NextResponse.json({ error: "Parámetro dpto requerido" }, { status: 400 });
  }
  try {
    const municipios = await getMunicipios(dpto);
    return NextResponse.json(municipios, {
      headers: { "Cache-Control": "public, max-age=86400" },
    });
  } catch (err) {
    console.error("[GET /api/colombia/municipios]", err);
    return NextResponse.json({ error: "Error cargando municipios" }, { status: 500 });
  }
}
