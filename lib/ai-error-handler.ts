import { NextResponse } from "next/server";

export function handleMistralError(error: unknown): NextResponse {
  console.error("[mistral]", error instanceof Error ? error.message : error);
  if (error instanceof Error) {
    if (error.message.includes("rate_limit")) {
      return NextResponse.json(
        { error: "Servicio ocupado, intenta en unos segundos" },
        { status: 429 }
      );
    }
    if (error.message.includes("invalid_api_key")) {
      return NextResponse.json(
        { error: "Error de configuración" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(
    { error: "Error inesperado, intenta de nuevo" },
    { status: 500 }
  );
}
