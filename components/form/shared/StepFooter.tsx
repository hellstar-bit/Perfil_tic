"use client";

import { Icons } from "./Icons";

interface Props {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  emptyHint?: string;
}

export function StepFooter({ onBack, onNext, nextLabel = "Siguiente", emptyHint }: Props) {
  return (
    <footer className="bg-white border-t border-ink-100 shrink-0">
      {emptyHint && (
        <div className="px-5 pt-3 md:px-10">
          <p className="bg-ink-50 border border-ink-200 text-ink-600 text-sm p-3 rounded-[8px]">
            {emptyHint}
          </p>
        </div>
      )}
      <div className="px-5 py-3 flex items-center gap-3 md:px-10 md:py-4">
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-[8px] border border-ink-200 text-ink-700 font-medium text-sm hover:bg-ink-50 flex-1 md:flex-initial md:min-w-[140px]"
        >
          <Icons.Back /> Anterior
        </button>
        <div className="hidden md:flex flex-1 text-xs text-ink-400 justify-center">
          Tus cambios se guardan automáticamente
        </div>
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[8px] bg-brand-600 text-white font-medium text-sm hover:bg-brand-700 flex-[1.4] md:flex-initial md:min-w-[180px]"
        >
          {nextLabel} <Icons.Arrow />
        </button>
      </div>
    </footer>
  );
}
