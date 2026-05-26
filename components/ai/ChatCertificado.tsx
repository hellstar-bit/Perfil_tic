"use client";

import React, { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string; esArchivo?: boolean };

const INICIAL =
  "¡Hola! Voy a ayudarte a agregar tu formación. Puedes subir tu certificado con el botón 📎 y yo extraigo los datos — si falta algo te lo pregunto. También puedes contarme directamente sobre tus estudios.";

interface Props {
  onDatos: (datos: object) => void;
  onCerrar: () => void;
  identificador?: string;
}

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const PaperClipIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);
const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/>
  </svg>
);

const TIPOS_VALIDOS = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

function renderDatos(datos: object): React.ReactNode {
  const d = datos as Record<string, unknown>;
  const flat: Record<string, unknown> =
    Array.isArray(d.formacion) && d.formacion.length > 0
      ? (d.formacion[0] as Record<string, unknown>)
      : d;

  const partesP = (flat.periodo as string | undefined ?? "").split(/\s*[-–]\s*/);
  const inicio = flat.fechaInicio ?? flat.inicio ?? flat.anioInicio ?? partesP[0] ?? undefined;
  const fin = flat.fechaFin ?? flat.fin ?? flat.anioFin ?? partesP[1] ?? undefined;

  const campos: [string, unknown][] = [
    ["Programa",   flat.programa ?? flat.nombre],
    ["Institución", flat.institucion],
    ["Nivel",      flat.nivel],
    ["Período",    inicio && fin ? `${inicio} – ${fin}` : (inicio ?? fin)],
  ];

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
    .replace(/\*\*(.+?)\*\*/g, "$1")   // **negrita**
    .replace(/\*(.+?)\*/g, "$1")        // *cursiva*
    .replace(/^#{1,6}\s+/gm, "")        // # títulos
    .replace(/^[\s]*[-*+]\s+/gm, "")   // - listas
    .replace(/^\d+\.\s+/gm, "")        // 1. listas numeradas
    .replace(/`{1,3}[^`]*`{1,3}/g, "") // `código`
    .replace(/\n{3,}/g, "\n\n")         // saltos excesivos
    .trim();
}

export function ChatCertificado({ onDatos, onCerrar, identificador = "anon" }: Props) {
  const [mensajes, setMensajes] = useState<Msg[]>([
    { role: "assistant", content: INICIAL },
  ]);
  const [input, setInput] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [analizando, setAnalizando] = useState(false);
  const [datosExtraidos, setDatosExtraidos] = useState<object | null>(null);
  const [dragging, setDragging] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, enviando, analizando]);

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    if (dragCounter.current === 1) setDragging(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setDragging(false);
  };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDragging(false);
    if (cargando || datosExtraidos) return;
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!TIPOS_VALIDOS.includes(file.type)) return;
    handleFile(file);
  };

  /* ── Enviar texto al API de entrevista ── */
  const callEntrevista = async (msgs: Msg[]) => {
    const res = await fetch("/api/ai/entrevista", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: msgs.map(({ role, content }) => ({ role, content })),
        seccionActual: "formacion",
        identificador,
      }),
    });
    return res.json();
  };

  const enviar = async () => {
    const texto = input.trim();
    if (!texto || cargando) return;

    const nuevos: Msg[] = [...mensajes, { role: "user", content: texto }];
    setMensajes(nuevos);
    setInput("");
    setEnviando(true);

    try {
      const data = await callEntrevista(nuevos);
      setMensajes((m) => [...m, { role: "assistant", content: limpiarMarkdown(data.mensaje ?? "Error al responder.") }]);
      if (data.completado && data.datos) setDatosExtraidos(data.datos);
    } catch {
      setMensajes((m) => [...m, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    } finally {
      setEnviando(false);
    }
  };

  /* ── Subir y procesar certificado ── */
  const handleFile = async (file: File) => {
    if (cargando) return;
    setAnalizando(true);

    // Burbuja del archivo
    const msgArchivo: Msg = {
      role: "user",
      content: `📎 ${file.name}`,
      esArchivo: true,
    };
    setMensajes((prev) => [...prev, msgArchivo]);

    try {
      const form = new FormData();
      form.append("archivo", file);
      form.append("identificador", identificador);

      const res = await fetch("/api/ai/certificado", { method: "POST", body: form });
      const cert = await res.json();

      if (!res.ok) {
        // El AI maneja el error y sigue la conversación manualmente
        const msgErr: Msg = {
          role: "user",
          content: `No se pudo leer el certificado automáticamente (${cert.error ?? "error"}). Por favor pregúntame los datos manualmente.`,
        };
        const conError = [...mensajes, msgArchivo, msgErr];
        const data = await callEntrevista(conError);
        setMensajes((prev) => [...prev, { role: "assistant", content: data.mensaje }]);
        if (data.completado && data.datos) setDatosExtraidos(data.datos);
        return;
      }

      // Construir mensaje con datos extraídos (visible en el chat)
      const encontrados: string[] = [];
      const faltantes: string[] = [];

      const check = (campo: string, valor: string | null, etiqueta: string) => {
        if (valor) encontrados.push(`${etiqueta}: "${valor}"`);
        else faltantes.push(etiqueta);
      };
      check("programa", cert.programa, "programa");
      check("institucion", cert.institucion, "institución");
      check("nivel", cert.nivel, "nivel");
      check("fechaInicio", cert.fechaInicio, "fecha de inicio");
      check("fechaFin", cert.fechaFin, "fecha de fin");

      const resumen =
        encontrados.length > 0
          ? `Encontré en el certificado: ${encontrados.join(", ")}.` +
            (faltantes.length > 0 ? ` Faltan: ${faltantes.join(", ")}.` : " Todo está completo.")
          : "No pude extraer datos del certificado. Por favor cuéntame sobre tus estudios.";

      // Este mensaje va al API para que el bot sepa qué preguntar
      const msgDatos: Msg = {
        role: "user",
        content: resumen + (faltantes.length > 0
          ? " Pregúntame solo por los campos que faltan, uno a la vez."
          : " Confirma los datos y completa la sección."),
      };

      // Solo mostramos el resumen en el chat (sin la instrucción interna)
      const msgMostrar: Msg = {
        role: "user",
        content: resumen,
      };

      const msgsParaAPI = [...mensajes, msgArchivo, msgDatos];
      const data = await callEntrevista(msgsParaAPI);

      setMensajes((prev) => [
        ...prev,
        msgMostrar,
        { role: "assistant", content: limpiarMarkdown(data.mensaje) },
      ]);
      if (data.completado && data.datos) setDatosExtraidos(data.datos);
    } catch {
      setMensajes((prev) => [
        ...prev,
        { role: "assistant", content: "Error analizando el certificado. Cuéntame sobre tus estudios y yo te ayudo." },
      ]);
    } finally {
      setAnalizando(false);
    }
  };

  // cargando needs to be defined before the drag handlers reference it
  const cargando = enviando || analizando;

  return (
    <div
      className="flex flex-col h-full relative"
      style={{ background: "#0E0E0E" }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {/* Drag overlay */}
      {dragging && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-[10px]"
          style={{ background: "rgba(0,229,160,0.08)", border: "2px dashed #00E5A0" }}>
          <div className="h-14 w-14 rounded-full bg-neon/15 grid place-items-center text-neon">
            <PaperClipIcon />
          </div>
          <p className="text-[13px] font-semibold text-neon">Suelta el certificado aquí</p>
          <p className="text-[11px] text-ink-500">PDF, JPG, PNG o WEBP</p>
        </div>
      )}

      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-ink-200"
        style={{ background: "#161616" }}>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-neon/10 grid place-items-center text-neon shrink-0">
            <SparkleIcon />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neon">Asistente IA</div>
            <div className="text-[13px] font-semibold text-ink-900">Formación</div>
          </div>
        </div>
        <button onClick={onCerrar}
          className="h-7 w-7 grid place-items-center rounded-full hover:bg-ink-200 text-ink-500 transition-colors">
          <XIcon />
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {mensajes.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "user" && m.esArchivo ? (
              /* Burbuja de archivo */
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] border border-ink-200 bg-ink-100 text-[12px] font-medium text-ink-600 max-w-[80%]">
                <PaperClipIcon />
                <span className="truncate">{m.content.replace("📎 ", "")}</span>
              </div>
            ) : (
              <div className={`max-w-[82%] rounded-[10px] px-3 py-2 text-[13px] leading-relaxed ${
                m.role === "user"
                  ? "bg-neon text-noir font-medium"
                  : "bg-ink-100 text-ink-900"
              }`}>
                {m.content}
              </div>
            )}
          </div>
        ))}

        {/* Indicador de carga */}
        {cargando && (
          <div className="flex justify-start">
            <div className="bg-ink-100 rounded-[10px] px-3 py-2.5 flex items-center gap-1.5">
              {analizando && (
                <span className="text-[10px] text-ink-500 mr-1">
                  {analizando ? "Leyendo certificado…" : ""}
                </span>
              )}
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-ink-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Panel de datos extraídos */}
      {datosExtraidos && (
        <div className="shrink-0 mx-4 mb-3 rounded-[10px] border border-neon/30 p-3"
          style={{ background: "#0a1a14" }}>
          <div className="text-[11px] font-semibold text-neon mb-2">¡Listo! Esto es lo que registré:</div>
          {renderDatos(datosExtraidos)}
          <div className="flex gap-2 mt-3">
            <button type="button"
              onClick={() => { onDatos(datosExtraidos); onCerrar(); }}
              className="flex-1 h-8 rounded-[7px] bg-neon text-noir text-[12px] font-semibold hover:brightness-90 transition-all">
              Agregar al perfil
            </button>
            <button type="button" onClick={onCerrar}
              className="flex-1 h-8 rounded-[7px] border border-ink-200 text-ink-600 text-[12px] hover:bg-ink-100 transition-colors">
              Editar manualmente
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      {!datosExtraidos && (
        <div className="shrink-0 px-4 pb-4 flex gap-2 items-center">
          <input
            ref={fileRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={cargando}
            title="Subir certificado"
            className="h-10 w-10 rounded-[8px] border border-ink-200 bg-ink-100 text-ink-500 hover:border-neon/40 hover:text-neon transition-all grid place-items-center disabled:opacity-40 shrink-0"
          >
            <PaperClipIcon />
          </button>
          <input
            className="field flex-1 text-[13px]"
            placeholder="Escribe aquí…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && enviar()}
            disabled={cargando}
          />
          <button
            type="button"
            onClick={enviar}
            disabled={cargando || !input.trim()}
            className="h-10 w-10 rounded-[8px] bg-neon text-noir grid place-items-center hover:brightness-90 transition-all disabled:opacity-50 shrink-0"
          >
            <SendIcon />
          </button>
        </div>
      )}
    </div>
  );
}
