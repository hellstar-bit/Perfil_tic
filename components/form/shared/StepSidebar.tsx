"use client";

import { Icons } from "./Icons";

const STEPS = [
  { n: 1, label: "Datos personales" },
  { n: 2, label: "Habilidades" },
  { n: 3, label: "Formación" },
  { n: 4, label: "Proyectos" },
  { n: 5, label: "Experiencia" },
  { n: 6, label: "Vista previa" },
];

interface Props {
  current: number;
  onSalir: () => void;
}

export function StepSidebar({ current, onSalir }: Props) {
  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-ink-200" style={{ background: "#0A0A0A" }}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-ink-200">
        <div className="flex items-center gap-2">
          <div className="h-7 aspect-square rounded-[7px] bg-neon grid place-items-center text-noir">
            <Icons.Logo width="55%" height="55%" />
          </div>
          <span className="font-semibold text-ink-900 tracking-tight text-[15px]">
            Perfil<span className="text-neon">TIC</span>
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-500 mb-5 px-1">
          Tu progreso
        </p>
        <div className="flex flex-col">
          {STEPS.map((s, i) => {
            const done = s.n < current;
            const active = s.n === current;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={s.n} className="flex gap-3">
                {/* Bubble + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`h-7 w-7 shrink-0 rounded-full grid place-items-center text-[11px] font-bold z-10
                      ${done ? "bg-neon text-noir" : active ? "bg-ink-100 text-neon" : "bg-ink-100 text-ink-400"}`}
                    style={active ? { boxShadow: "0 0 0 2px rgba(0,229,160,0.45)" } : undefined}
                  >
                    {done ? <Icons.Check /> : String(s.n).padStart(2, "0")}
                  </div>
                  {!isLast && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        minHeight: 20,
                        marginTop: 5,
                        marginBottom: 5,
                        background: done ? "rgba(0,229,160,0.28)" : "rgba(255,255,255,0.06)",
                      }}
                    />
                  )}
                </div>
                {/* Label */}
                <div className={`${isLast ? "" : "pb-5"} pt-1 min-w-0`}>
                  <span
                    className={`text-[13px] font-medium leading-tight block
                      ${active ? "text-neon" : done ? "text-ink-700" : "text-ink-500"}`}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exit */}
      <div className="px-5 py-4 border-t border-ink-200">
        <button
          onClick={onSalir}
          className="flex items-center gap-2 text-[12px] font-medium text-ink-500 hover:text-ink-700 transition-colors"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Guardar y salir
        </button>
      </div>
    </aside>
  );
}
