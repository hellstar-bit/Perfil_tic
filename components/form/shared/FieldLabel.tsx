interface Props {
  children: React.ReactNode;
  optional?: boolean;
  hint?: string;
}

export function FieldLabel({ children, optional, hint }: Props) {
  return (
    <label className="flex items-center justify-between mb-1.5">
      <span className="text-[12px] font-medium text-ink-700">
        {children}
        {!optional && <span className="text-brand-600 ml-0.5">*</span>}
      </span>
      {optional && <span className="text-[10px] text-ink-400">Opcional</span>}
      {hint && <span className="text-[10px] text-ink-400">{hint}</span>}
    </label>
  );
}
