import { Icons } from "./Icons";

interface Props {
  active: boolean;
  deleting?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}

export function SavedCard({ active, deleting, onEdit, onDelete, children }: Props) {
  return (
    <article
      className={`group relative rounded-[12px] border overflow-hidden transition-all duration-150
        ${deleting ? "opacity-0" : "opacity-100"}
        ${active
          ? "border-neon bg-brand-50 shadow-[0_0_0_3px_rgba(0,229,160,0.15)]"
          : "border-ink-200 bg-ink-100 hover:border-neon/40"}`}
    >
      {children}

      <div
        className={`absolute top-3 right-3 flex gap-1 transition-opacity
          ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <button
          onClick={onEdit}
          className="h-7 w-7 rounded-md bg-ink-200 border border-ink-300 grid place-items-center text-ink-600 hover:text-neon hover:border-neon/50"
        >
          <Icons.Edit />
        </button>
        <button
          onClick={onDelete}
          className="h-7 w-7 rounded-md bg-ink-200 border border-ink-300 grid place-items-center text-ink-600 hover:text-coral hover:border-coral/50"
        >
          <Icons.Trash />
        </button>
      </div>

      {active && (
        <div className="absolute top-3 left-3 chip">Editando</div>
      )}
    </article>
  );
}
