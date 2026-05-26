"use client";

import React, { useState, useRef, useEffect } from "react";

type Seccion = "experiencia" | "proyectos" | "formacion";
type Msg = { role: "user" | "assistant"; content: string };

function renderDatos(datos: object, seccion: Seccion): React.ReactNode {
  const d = datos as Record<string, unknown>;
  let campos: [string, unknown][] = [];

  if (seccion === "formacion") {
    const flat: Record<string, unknown> =
      Array.isArray(d.formacion) && d.formacion.length > 0
        ? (d.formacion[0] as Record<string, unknown>)
        : d;
    const partesP = (flat.periodo as string | undefined ?? "").split(/\s*[-–]\s*/);
    const inicio = flat.fechaInicio ?? flat.inicio ?? flat.anioInicio ?? partesP[0] ?? undefined;
    const fin = flat.fechaFin ?? flat.fin ?? flat.anioFin ?? partesP[1] ?? undefined;
    campos = [
      ["Programa",    flat.programa ?? flat.nombre],
      ["Institución", flat.institucion],
      ["Nivel",       flat.nivel],
      ["Período",     inicio && fin ? `${inicio} – ${fin}` : (inicio ?? fin)],
    ];
  } else if (seccion === "experiencia") {
    const flat: Record<string, unknown> =
      Array.isArray(d.experiencia) && d.experiencia.length > 0
        ? (d.experiencia[0] as Record<string, unknown>)
        : d;
    const inicio = flat.fechaInicio ?? flat.inicio ?? flat.anioInicio;
    const fin = flat.fechaFin ?? flat.fin ?? flat.anioFin;
    campos = [
      ["Cargo",       flat.cargo],
      ["Empresa",     flat.empresa],
      ["Tipo",        flat.tipo],
      ["Período",     inicio && fin ? `${inicio} – ${fin}` : (inicio ?? fin)],
      ["Descripción", flat.descripcion],
    ];
  } else {
    const flat: Record<string, unknown> =
      Array.isArray(d.proyectos) && d.proyectos.length > 0
        ? (d.proyectos[0] as Record<string, unknown>)
        : d;
    campos = [
      ["Nombre",      flat.nombre],
      ["Descripción", flat.descripcion],
      ["Enlace",      flat.enlace ?? flat.url],
    ];
  }

  return (
    <div className="space-y-1.5">
      {campos.filter(([, v]) => v).map(([label, value], i) => (
        <div key={i} className="flex gap-2 text-[12px] leading-snug">
          <span className="text-ink-500 shrink-0 w-[76px]">{label}:</span>
          <span className="text-ink-800 font-medium">{String(value)}</span>
        </div>
      ))}
    </div>
  );
}

function limpiarMarkdown(texto: string): string {
  return texto
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[\s]*[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const INICIALES: Record<Seccion, string> = {
  experiencia: "¡Hola! Cuéntame sobre algún trabajo o experiencia que hayas tenido. No importa si fue informal o voluntario.",
  proyectos:   "¡Cuéntame sobre algo que hayas construido o desarrollado! Puede ser una página web, una app, cualquier proyecto.",
  formacion:   "¿Qué estudios o cursos has hecho? Puede ser en el SENA, una universidad, o cualquier certificado online.",
};

interface Props {
  seccion: Seccion;
  identificador?: string;
  onDatos: (datos: object) => void;
  onCerrar: () => void;
}

const Send = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
  </svg>
);

const X = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

export function ChatEntrevista({ seccion, identificador = "anon", onDatos, onCerrar }: Props) {
  const [mensajes, setMensajes] = useState<Msg[]>([
    { role: "assistant", content: INICIALES[seccion] },
  ]);
  const [input, setInput] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [datosExtraidos, setDatosExtraidos] = useState<object | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const enviar = async () => {
    const texto = input.trim();
    if (!texto || enviando) return;

    const nuevos: Msg[] = [...mensajes, { role: "user", content: texto }];
    setMensajes(nuevos);
    setInput("");
    setEnviando(true);

    try {
      const res = await fetch("/api/ai/entrevista", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nuevos, seccionActual: seccion, identificador }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMensajes((m) => [...m, { role: "assistant", content: "Hubo un error. Intenta de nuevo." }]);
        return;
      }
      setMensajes((m) => [...m, { role: "assistant", content: limpiarMarkdown(data.mensaje) }]);
      if (data.completado && data.datos) setDatosExtraidos(data.datos);
    } catch {
      setMensajes((m) => [...m, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#0E0E0E" }}>
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-ink-200" style={{ background: "#161616" }}>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">Asistente IA</div>
          <div className="text-[13px] font-semibold text-ink-900 capitalize">{seccion}</div>
        </div>
        <button onClick={onCerrar} className="h-7 w-7 grid place-items-center rounded-full hover:bg-ink-200 text-ink-500 transition-colors">
          <X />
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {mensajes.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-[10px] px-3 py-2 text-[13px] leading-relaxed ${
                m.role === "user"
                  ? "bg-neon text-noir font-medium"
                  : "bg-ink-100 text-ink-900"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {enviando && (
          <div className="flex justify-start">
            <div className="bg-ink-100 rounded-[10px] px-3 py-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-ink-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Datos extraídos */}
      {datosExtraidos && (
        <div className="shrink-0 mx-4 mb-3 rounded-[10px] border border-neon/30 p-3" style={{ background: "#0a1a14" }}>
          <div className="text-[11px] font-semibold text-neon mb-2">¡Listo! Esto es lo que registré:</div>
          {renderDatos(datosExtraidos, seccion)}
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={() => { onDatos(datosExtraidos); onCerrar(); }}
              className="flex-1 h-8 rounded-[7px] bg-neon text-noir text-[12px] font-semibold hover:brightness-90 transition-all"
            >
              Agregar al perfil
            </button>
            <button
              type="button"
              onClick={onCerrar}
              className="flex-1 h-8 rounded-[7px] border border-ink-200 text-ink-600 text-[12px] hover:bg-ink-100 transition-colors"
            >
              Editar manualmente
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      {!datosExtraidos && (
        <div className="shrink-0 px-4 pb-4 flex gap-2">
          <input
            className="field flex-1 text-[13px]"
            placeholder="Escribe aquí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && enviar()}
            disabled={enviando}
          />
          <button
            type="button"
            onClick={enviar}
            disabled={enviando || !input.trim()}
            className="h-10 w-10 rounded-[8px] bg-neon text-noir grid place-items-center hover:brightness-90 transition-all disabled:opacity-50"
          >
            <Send />
          </button>
        </div>
      )}
    </div>
  );
}
