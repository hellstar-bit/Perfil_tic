"use client";

import { Icons } from "./Icons";

const STEPS = [
  { n: 1, label: "Datos personales",  sub: "Tu información básica" },
  { n: 2, label: "Habilidades",       sub: "Tus herramientas TIC" },
  { n: 3, label: "Formación",         sub: "Estudios y cursos" },
  { n: 4, label: "Proyectos",         sub: "Lo que has construido" },
  { n: 5, label: "Experiencia",       sub: "Dónde has trabajado" },
  { n: 6, label: "Vista previa",      sub: "Revisa y publica" },
];

interface Props {
  current: number;
  onSalir: () => void;
}

export function StepSidebar({ current, onSalir }: Props) {
  const completed = current - 1;
  const pct = Math.round((completed / (STEPS.length - 1)) * 100);

  return (
    <aside
      className="hidden md:flex flex-col w-60 shrink-0 border-r border-ink-200 h-full"
      style={{ background: "#080808" }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-ink-200 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 aspect-square rounded-[7px] bg-neon grid place-items-center text-noir">
            <Icons.Logo width="55%" height="55%" />
          </div>
          <span className="font-semibold text-ink-900 tracking-tight text-[15px]">
            Perfil<span className="text-neon">TIC</span>
          </span>
        </div>
      </div>

      {/* Progress summary */}
      <div className="px-6 py-4 border-b border-ink-200 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">
            Tu progreso
          </span>
          <span className="text-[11px] font-mono font-bold text-neon">{pct}%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-ink-200 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #00C78A 0%, #00E5A0 100%)",
            }}
          />
        </div>
        <div className="mt-1.5 text-[10px] text-ink-500">
          {completed === 0
            ? "Comenzando…"
            : completed === STEPS.length - 1
            ? "¡Todo listo para publicar!"
            : `${completed} de ${STEPS.length - 1} secciones completadas`}
        </div>
      </div>

      {/* Steps — 70 % of sidebar height */}
      <div className="flex flex-col px-5 py-5 overflow-hidden" style={{ flex: "0 0 70%" }}>
        {STEPS.map((s, i) => {
          const done = s.n < current;
          const active = s.n === current;
          const isLast = i === STEPS.length - 1;

          return (
            <div key={s.n} className={`flex flex-col ${isLast ? "" : "flex-1 min-h-[52px]"}`}>
              {/* Row: bubble + labels */}
              <div className="flex items-start gap-3">
                {/* Bubble */}
                <div
                  className={`h-7 w-7 shrink-0 rounded-full grid place-items-center text-[11px] font-bold transition-all duration-300
                    ${done
                      ? "bg-neon text-noir"
                      : active
                      ? "bg-ink-100 text-neon"
                      : "bg-ink-100 text-ink-400"}`}
                  style={active ? { boxShadow: "0 0 0 2px rgba(0,229,160,0.40), 0 0 12px rgba(0,229,160,0.12)" } : undefined}
                >
                  {done ? <Icons.Check /> : String(s.n).padStart(2, "0")}
                </div>

                {/* Text */}
                <div className="pt-0.5 min-w-0 flex-1">
                  <span
                    className={`text-[13px] font-semibold leading-tight block transition-colors duration-300
                      ${active ? "text-neon" : done ? "text-ink-700" : "text-ink-400"}`}
                  >
                    {s.label}
                  </span>
                  <span
                    className={`text-[11px] leading-tight block mt-0.5 transition-colors duration-300
                      ${active
                        ? "text-ink-500"
                        : done
                        ? "text-neon/50"
                        : "text-ink-600"}`}
                  >
                    {done ? "Completado" : active ? s.sub : s.sub}
                  </span>
                </div>
              </div>

              {/* Connector line — grows to fill flex space */}
              {!isLast && (
                <div
                  className="flex-1 mt-2 transition-colors duration-500"
                  style={{
                    width: 1,
                    marginLeft: 13,
                    minHeight: 10,
                    background: done
                      ? "linear-gradient(180deg, rgba(0,229,160,0.35) 0%, rgba(0,229,160,0.15) 100%)"
                      : "rgba(255,255,255,0.06)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Exit */}
      <div className="px-5 py-4 border-t border-ink-200 shrink-0 mt-auto">
        <button
          onClick={onSalir}
          className="flex items-center gap-2 text-[12px] font-medium text-ink-500 hover:text-ink-700 transition-colors w-full group"
        >
          <svg
            viewBox="0 0 24 24" width="14" height="14" fill="none"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:translate-x-0.5 transition-transform"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Guardar y salir
        </button>
      </div>
    </aside>
  );
}
