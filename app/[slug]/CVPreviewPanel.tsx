"use client";

import { useState, useRef, useEffect } from "react";
import { PREVIEW_MAP } from "@/components/CVTemplateSelector";
import { TEMPLATES } from "@/components/pdf/shared/pdfTypes";
import type { TemplateId } from "@/components/pdf/shared/pdfTypes";

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

/* Chrome's built-in PDF viewer toolbar is ~40 px.
   We push the iframe up by that amount so the toolbar is clipped. */
const TOOLBAR_H = 40;

interface Props {
  perfilId: string;
  initialTemplate: string;
}

export function CVPreviewPanel({ perfilId, initialTemplate }: Props) {
  const [selected, setSelected] = useState<TemplateId>((initialTemplate as TemplateId) || "clasica");
  const [loading, setLoading] = useState(true);
  const [pageH, setPageH] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const meta = TEMPLATES.find((t) => t.id === selected) ?? TEMPLATES[0];

  /* Compute visible page height once the wrapper mounts */
  useEffect(() => {
    if (!wrapRef.current) return;
    const w = wrapRef.current.offsetWidth;
    setPageH(Math.round(w * 1.414)); // A4 ratio
  }, []);

  const src = `/api/cv/${perfilId}?template=${selected}&preview=1#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;

  return (
    <div className="card overflow-hidden sticky top-20">
      {/* Header */}
      <div className="px-4 py-3 border-b border-ink-200 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Tu CV</div>
          <div className="text-[12px] font-semibold text-ink-900 mt-0.5">{meta.nombre}</div>
        </div>
        <a
          href={`/api/cv/${perfilId}?template=${selected}`}
          download
          className="h-8 px-3 rounded-[7px] bg-neon text-noir font-semibold text-[11px] inline-flex items-center gap-1.5 hover:brightness-90 transition-all"
        >
          <DownloadIcon /> PDF
        </a>
      </div>

      {/* PDF preview — clipped to exactly one A4 page */}
      <div
        ref={wrapRef}
        className="relative bg-white overflow-hidden"
        style={{ height: pageH > 0 ? pageH : undefined }}
      >
        {/* Loading placeholder */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white z-10">
            <div className="h-5 w-5 rounded-full border-2 border-neon border-t-transparent animate-spin" />
            <span className="text-[10px] text-ink-400">Generando...</span>
          </div>
        )}

        {/* Push iframe up by TOOLBAR_H to clip the browser PDF toolbar */}
        {pageH > 0 && (
          <iframe
            key={selected}
            src={src}
            title="Vista previa CV"
            onLoad={() => setLoading(false)}
            style={{
              position: "absolute",
              top: -TOOLBAR_H,
              left: 0,
              width: "100%",
              /* tall enough for toolbar + full page */
              height: pageH + TOOLBAR_H,
              border: "none",
            }}
          />
        )}
      </div>

      {/* Template switcher */}
      <div className="p-3 border-t border-ink-200">
        <div className="text-[10px] text-ink-400 mb-2 font-medium">Plantilla</div>
        <div className="grid grid-cols-4 gap-1.5">
          {TEMPLATES.map((tpl) => {
            const Thumb = PREVIEW_MAP[tpl.id];
            const isSelected = selected === tpl.id;
            return (
              <button
                key={tpl.id}
                onClick={() => { setLoading(true); setSelected(tpl.id); }}
                title={tpl.nombre}
                className={`relative overflow-hidden rounded-[5px] border-2 transition-all focus:outline-none ${
                  isSelected
                    ? "border-neon shadow-[0_0_0_2px_rgba(0,229,160,0.2)]"
                    : "border-ink-200 hover:border-ink-300"
                }`}
                style={{ paddingBottom: "141.4%" }}
              >
                <div className="absolute inset-0">
                  <Thumb />
                </div>
                {isSelected && (
                  <div className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-neon grid place-items-center z-10">
                    <svg viewBox="0 0 14 14" width="8" height="8" fill="none" stroke="#0E0E0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 7l3.5 3.5 5.5-6" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
