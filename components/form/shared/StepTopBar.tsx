"use client";

import { Icons } from "./Icons";

const TOTAL = 6;

interface Props {
  current: number;
  label: string;
  onBack: () => void;
  onSalir: () => void;
}

export function StepTopBar({ current, label, onBack, onSalir }: Props) {
  return (
    <header className="md:hidden bg-ink-50 border-b border-ink-200 shrink-0">
      <div className="px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-ink-700 -ml-1 h-9 w-9 grid place-items-center rounded-md"
        >
          <Icons.Back />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-medium text-ink-500">
            Paso {current} de {TOTAL}
          </span>
          <span className="text-[13px] font-semibold text-neon leading-tight">{label}</span>
        </div>
        <button onClick={onSalir} className="text-xs font-medium text-ink-500">
          Salir
        </button>
      </div>
      <div className="h-0.5 bg-ink-100">
        <div
          className="h-full bg-neon transition-all"
          style={{ width: `${(current / TOTAL) * 100}%` }}
        />
      </div>
    </header>
  );
}
