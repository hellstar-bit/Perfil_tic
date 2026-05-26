"use client";

import { useState } from "react";
import { CVTemplateSelector } from "@/components/CVTemplateSelector";
import type { TemplateId } from "@/components/pdf/shared/pdfTypes";

const Download = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" />
  </svg>
);
const X = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

interface Props {
  perfilId: string;
  initialTemplate?: string;
  variant?: "desktop" | "mobile";
}

export function CVDownloadButton({ perfilId, initialTemplate = "clasica", variant = "desktop" }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TemplateId>((initialTemplate as TemplateId) || "clasica");

  const buttonClass =
    variant === "mobile"
      ? "mt-5 w-full h-11 rounded-[8px] bg-neon text-noir font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-90 transition-all"
      : "h-9 px-4 rounded-[8px] bg-neon text-noir font-semibold text-sm inline-flex items-center gap-2 hover:brightness-90 transition-all";

  return (
    <>
      <button onClick={() => setOpen(true)} className={buttonClass}>
        <Download /> Descargar CV
      </button>

      {open && (
        /* Single flex overlay — backdrop + centering in one element */
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center md:items-center md:p-6 bg-noir/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* Modal panel — stopPropagation so clicks inside don't close */}
          <div
            className="relative w-full md:max-w-3xl flex flex-col bg-ink-50 rounded-t-2xl md:rounded-2xl border border-ink-200 shadow-2xl"
            style={{ maxHeight: "88vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div className="shrink-0 border-b border-ink-200 px-5 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="font-semibold text-[15px] text-ink-900">Descargar CV en PDF</h2>
                <p className="text-[11px] text-ink-500 mt-0.5">Elige una plantilla y descarga</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 grid place-items-center rounded-full hover:bg-ink-200 text-ink-500 transition-colors"
              >
                <X />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-5">
              <CVTemplateSelector
                perfilId={perfilId}
                selected={selected}
                onSelect={setSelected}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
