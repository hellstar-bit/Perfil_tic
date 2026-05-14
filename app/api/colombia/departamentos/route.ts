import { NextResponse } from "next/server";
import { getDepartamentos } from "@/lib/colombia";

export async function GET() {
  try {
    const departamentos = await getDepartamentos();
    return NextResponse.json(departamentos, {
      headers: { "Cache-Control": "public, max-age=86400" },
    });
  } catch (err) {
    console.error("[GET /api/colombia/departamentos]", err);
    return NextResponse.json({ error: "Error cargando departamentos" }, { status: 500 });
  }
}
