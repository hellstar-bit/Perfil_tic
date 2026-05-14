interface Props {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon, title, subtitle }: Props) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-8 py-16 rounded-[12px] border-2 border-dashed border-ink-200 bg-ink-50/50">
      <div className="text-brand-300">{icon}</div>
      <div className="mt-4 font-medium text-ink-700 text-[15px]">{title}</div>
      {subtitle && (
        <div className="mt-1.5 text-[12px] text-ink-500 max-w-xs leading-relaxed">{subtitle}</div>
      )}
    </div>
  );
}
