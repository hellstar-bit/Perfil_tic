"use client";

import { useEffect, useState } from "react";
import type { Formacion, Proyecto, Experiencia } from "@/types/perfil";

interface CoachResult {
  score: number;
  fortalezas: string[];
  mejorar: string[];
  consejo_principal: string;
}

interface Props {
  nombre: string;
  cargo: string;
  frase?: string;
  foto?: string;
  habilidades: { nombre: string; nivel: number }[];
  formaciones: Formacion[];
  proyectos: Proyecto[];
  experiencias: Experiencia[];
  identificador?: string;
}

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 75 ? "#00E5A0" : score >= 51 ? "#F59E0B" : "#EF4444";
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1E1E1E" strokeWidth="6" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 36 36)" style={{ transition: "stroke-dasharray 0.6s ease" }} />
        <text x="36" y="40" textAnchor="middle" fill={color} fontSize="15" fontWeight="700">{score}</text>
      </svg>
      <span className="text-[10px] text-ink-500 mt-1">/ 100</span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-18 w-18 rounded-full bg-ink-200" style={{ width: 72, height: 72 }} />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-ink-200 rounded w-3/4" />
          <div className="h-3 bg-ink-200 rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-ink-200 rounded w-full" />
      <div className="h-3 bg-ink-200 rounded w-5/6" />
    </div>
  );
}

export function PanelCoach({ nombre, cargo, frase, foto, habilidades, formaciones, proyectos, experiencias, identificador = "anon" }: Props) {
  const [estado, setEstado] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [resultado, setResultado] = useState<CoachResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const analizar = async () => {
    setEstado("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, cargo, frase, foto, habilidades, formaciones, proyectos, experiencias, identificador }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? "Error al analizar"); setEstado("error"); return; }
      setResultado(data);
      setEstado("done");
    } catch {
      setErrorMsg("Error de conexión");
      setEstado("error");
    }
  };

  useEffect(() => { analizar(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="card p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-neon">Coach IA</div>
          <h3 className="font-semibold text-[15px] text-ink-900 mt-0.5">Diagnóstico de tu perfil</h3>
        </div>
        {estado === "done" && (
          <button type="button" onClick={analizar}
            className="text-[11px] text-ink-500 hover:text-ink-700 border border-ink-200 rounded-[6px] px-2.5 py-1.5 transition-colors">
            Actualizar
          </button>
        )}
      </div>

      {estado === "loading" && <Skeleton />}

      {estado === "error" && (
        <p className="text-[12px] text-red-500">{errorMsg || "No pudimos analizar tu perfil ahora"}</p>
      )}

      {estado === "done" && resultado && (
        <>
          <div className="flex items-center gap-5">
            <ScoreCircle score={resultado.score} />
            <p className="text-[13px] text-ink-600 leading-relaxed italic">
              "{resultado.consejo_principal}"
            </p>
          </div>

          {resultado.fortalezas.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 mb-2">Tus fortalezas</div>
              <div className="flex flex-wrap gap-2">
                {resultado.fortalezas.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {resultado.mejorar.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-500 mb-2">Puedes mejorar</div>
              <div className="flex flex-wrap gap-2">
                {resultado.mejorar.map((m, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
                    → {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
