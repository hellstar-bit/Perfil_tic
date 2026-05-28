"use client";

import { useState, useEffect, useRef } from "react";

type Estado = "idle" | "loading" | "opciones" | "error";

interface Props {
  nombre: string;
  cargo: string;
  habilidades: string[];
  experiencia: string[];
  formacion: string[];
  identificador?: string;
  autoGenerate?: boolean;
  onSelect: (frase: string) => void;
}

const Sparkle = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/>
  </svg>
);

function SkeletonCard() {
  return (
    <div className="rounded-[8px] border border-ink-200 p-3.5 space-y-2 animate-pulse" style={{ background: "#1a1a1a" }}>
      <div className="h-2.5 bg-ink-200 rounded w-full" />
      <div className="h-2.5 bg-ink-200 rounded w-5/6" />
      <div className="h-2.5 bg-ink-200 rounded w-4/6" />
    </div>
  );
}

export function BtnGenerarFrase({ nombre, cargo, habilidades, experiencia, formacion, identificador = "anon", autoGenerate = false, onSelect }: Props) {
  const [estado, setEstado] = useState<Estado>("idle");
  const [opciones, setOpciones] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const triggered = useRef(false);

  const puedeGenerar = nombre.trim() && cargo.trim();

  const generar = async () => {
    setEstado("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/ai/frase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, cargo, habilidades, experiencia, formacion, identificador }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? "Error al generar"); setEstado("error"); return; }
      setOpciones(data.opciones ?? []);
      setEstado("opciones");
    } catch {
      setErrorMsg("Error de conexión");
      setEstado("error");
    }
  };

  useEffect(() => {
    if (autoGenerate && !triggered.current && puedeGenerar) {
      triggered.current = true;
      generar();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const usar = (frase: string) => {
    onSelect(frase);
    setEstado("idle");
  };

  if (!puedeGenerar) return null;

  return (
    <div className="mt-3 space-y-3">
      {/* Banner IA */}
      <div className="rounded-[10px] border border-neon/25 p-3.5" style={{ background: "rgba(0,229,160,0.04)" }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-6 w-6 rounded-md bg-neon/10 grid place-items-center text-neon shrink-0">
              <Sparkle />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-widest text-neon">Asistente IA</div>
              <div className="text-[11px] text-ink-500 leading-tight">Genera una frase profesional en segundos</div>
            </div>
          </div>
          <button
            type="button"
            onClick={generar}
            disabled={estado === "loading"}
            className="shrink-0 h-8 px-4 rounded-[7px] bg-neon text-noir text-[12px] font-bold hover:brightness-90 disabled:opacity-60 inline-flex items-center gap-1.5 transition-all"
          >
            {estado === "loading" ? (
              <>
                <div className="h-3.5 w-3.5 rounded-full border-2 border-noir border-t-transparent animate-spin" />
                Generando…
              </>
            ) : (
              <><Sparkle /> Generar</>
            )}
          </button>
        </div>
      </div>

      {/* Skeletons */}
      {estado === "loading" && (
        <div className="space-y-2">
          <SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      )}

      {/* Error */}
      {estado === "error" && (
        <p className="text-[11px] text-red-400">{errorMsg}</p>
      )}

      {/* Opciones */}
      {estado === "opciones" && opciones.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 px-0.5">
            Elige la que mejor te represente
          </div>
          {opciones.map((op, i) => (
            <div key={i} className="rounded-[8px] border border-ink-200 p-3.5 hover:border-neon/40 transition-colors group cursor-pointer"
              style={{ background: "#1a1a1a" }}
              onClick={() => usar(op)}
            >
              <p className="text-[12px] text-ink-600 leading-relaxed mb-2.5 group-hover:text-ink-800">{op}</p>
              <span className="text-[11px] font-semibold text-neon group-hover:underline">
                Usar esta →
              </span>
            </div>
          ))}
          <button type="button" onClick={generar}
            className="text-[11px] text-ink-500 hover:text-neon transition-colors inline-flex items-center gap-1">
            <Sparkle /> Generar otras opciones
          </button>
        </div>
      )}
    </div>
  );
}
