"use client";

import { Icons } from "./Icons";

const STEPS = [
  { n: 1, label: "Datos" },
  { n: 2, label: "Habilidades" },
  { n: 3, label: "Formación" },
  { n: 4, label: "Proyectos" },
  { n: 5, label: "Experiencia" },
  { n: 6, label: "Vista previa" },
];

interface Props {
  current: number;
  label: string;
  onBack: () => void;
  onSalir: () => void;
}

export function StepTopBar({ current, label, onBack, onSalir }: Props) {
  const pct = (current / STEPS.length) * 100;

  return (
    <header className="bg-ink-50 border-b border-ink-200 shrink-0">
      <div className="px-5 pt-5 pb-3 md:px-10 md:pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-ink-700 -ml-1 h-9 w-9 grid place-items-center rounded-md hover:bg-ink-50"
          >
            <Icons.Back />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-7 aspect-square rounded-[7px] bg-neon grid place-items-center text-noir">
              <Icons.Logo width="60%" height="60%" />
            </div>
            <span className="font-semibold text-ink-900 tracking-tight text-[15px]">
              Perfil<span className="text-neon">TIC</span>
            </span>
          </div>
          <button onClick={onSalir} className="text-xs font-medium text-ink-500">
            Guardar y salir
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-medium text-ink-500 mb-2">
            <span>Paso {current} de {STEPS.length}</span>
            <span className="text-neon">{label}</span>
          </div>
          <div className="h-1.5 w-full bg-ink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-3 grid grid-cols-6 gap-1 md:max-w-2xl md:mx-auto">
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col items-center gap-1">
                <div
                  className={`h-7 w-7 rounded-full grid place-items-center text-[11px] font-semibold transition-colors
                    ${s.n < current ? "bg-neon text-noir" :
                      s.n === current ? "bg-brand-50 text-neon ring-2 ring-neon" :
                      "bg-ink-100 text-ink-400"}`}
                >
                  {s.n < current ? <Icons.Check /> : s.n}
                </div>
                <div
                  className={`text-[9px] leading-none truncate w-full text-center
                    ${s.n === current ? "text-neon font-medium" : "text-ink-400"}`}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
