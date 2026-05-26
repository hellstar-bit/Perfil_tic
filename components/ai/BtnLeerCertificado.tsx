"use client";

import { useRef, useState } from "react";
import type { Formacion } from "@/types/perfil";

export type FormacionExtraida = Pick<Formacion, "nombre" | "institucion" | "nivel" | "inicio" | "fin" | "cert">;

type Estado = "idle" | "uploading" | "success" | "error";

interface Props {
  onExtracted: (data: FormacionExtraida) => void;
  identificador?: string;
}

const PaperClip = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7.5l3.5 3.5 6.5-7" />
  </svg>
);

export function BtnLeerCertificado({ onExtracted, identificador = "anon" }: Props) {
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setEstado("uploading");
    setErrorMsg("");
    try {
      const form = new FormData();
      form.append("archivo", file);
      form.append("identificador", identificador);

      const res = await fetch("/api/ai/certificado", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Error al leer el certificado");
        setEstado("error");
        return;
      }

      onExtracted({
        nombre:      data.programa    ?? "",
        institucion: data.institucion ?? "",
        nivel:       data.nivel       ?? "",
        inicio:      data.anioInicio  ?? "",
        fin:         data.anioFin     ?? "",
        cert:        "",
      });
      setEstado("success");
    } catch {
      setErrorMsg("Error de conexión. Intenta de nuevo.");
      setEstado("error");
    }
  };

  if (estado === "success") {
    return (
      <span className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[8px] bg-neon/10 border border-neon/30 text-[12px] font-semibold text-neon">
        <Check /> Datos extraídos
      </span>
    );
  }

  if (estado === "error") {
    return (
      <div className="space-y-1.5">
        <p className="text-[11px] text-red-400">{errorMsg}</p>
        <button type="button" onClick={() => setEstado("idle")}
          className="text-[11px] text-ink-500 underline underline-offset-2 hover:text-ink-300">
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <>
      <input
        ref={inputRef}
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
        disabled={estado === "uploading"}
        onClick={() => inputRef.current?.click()}
        className="h-9 px-4 rounded-[8px] border border-neon/40 bg-neon/5 text-[12px] font-semibold text-neon hover:bg-neon hover:text-noir transition-all disabled:opacity-60 inline-flex items-center gap-2"
      >
        {estado === "uploading" ? (
          <>
            <div className="h-3.5 w-3.5 rounded-full border-2 border-neon border-t-transparent animate-spin shrink-0" />
            Analizando…
          </>
        ) : (
          <>
            <PaperClip /> Leer certificado
          </>
        )}
      </button>
    </>
  );
}
