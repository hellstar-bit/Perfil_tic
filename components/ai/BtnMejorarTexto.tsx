"use client";

import { useState } from "react";

type Estado = "idle" | "loading" | "mejorado" | "error";

interface Props {
  texto: string;
  contexto: "proyecto" | "experiencia" | "formacion";
  cargo?: string;
  identificador?: string;
  onMejorado: (texto: string) => void;
}

const Sparkle = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/>
  </svg>
);

export function BtnMejorarTexto({ texto, contexto, cargo, identificador = "anon", onMejorado }: Props) {
  const [estado, setEstado] = useState<Estado>("idle");
  const [original, setOriginal] = useState("");

  const activo = texto.trim().length >= 10;

  const mejorar = async () => {
    if (!activo) return;
    setEstado("loading");
    setOriginal(texto);
    try {
      const res = await fetch("/api/ai/mejorar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto, contexto, cargo, identificador }),
      });
      const data = await res.json();
      if (!res.ok) { setEstado("error"); return; }
      onMejorado(data.mejorado);
      setEstado("mejorado");
    } catch {
      setEstado("error");
    }
  };

  const restaurar = () => {
    onMejorado(original);
    setEstado("idle");
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      {estado === "mejorado" ? (
        <>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neon bg-neon/10 border border-neon/25 px-2.5 py-1 rounded-full">
            ✓ Texto mejorado
          </span>
          <button type="button" onClick={restaurar}
            className="text-[10px] text-ink-500 underline underline-offset-2 hover:text-ink-300 transition-colors">
            Volver al original
          </button>
        </>
      ) : estado === "loading" ? (
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neon">
          <div className="h-3 w-3 rounded-full border-2 border-neon border-t-transparent animate-spin" />
          Mejorando con IA…
        </div>
      ) : estado === "error" ? (
        <button type="button" onClick={mejorar}
          className="text-[11px] text-red-400 hover:text-red-300 transition-colors">
          Error — reintentar
        </button>
      ) : activo ? (
        <button
          type="button"
          onClick={mejorar}
          className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-[6px] border border-neon/35 bg-neon/5 text-[11px] font-semibold text-neon hover:bg-neon hover:text-noir transition-all"
        >
          <Sparkle /> Mejorar con IA
        </button>
      ) : null}
    </div>
  );
}
