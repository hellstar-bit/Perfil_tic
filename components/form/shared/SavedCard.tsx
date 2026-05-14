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
          ? "border-brand-500 bg-brand-50 shadow-[0_0_0_3px_rgba(29,158,117,0.12)]"
          : "border-ink-200 bg-white hover:border-brand-400"}`}
    >
      {children}

      <div
        className={`absolute top-3 right-3 flex gap-1 transition-opacity
          ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <button
          onClick={onEdit}
          className="h-7 w-7 rounded-md bg-white border border-ink-200 grid place-items-center text-ink-600 hover:text-brand-700 hover:border-brand-300"
        >
          <Icons.Edit />
        </button>
        <button
          onClick={onDelete}
          className="h-7 w-7 rounded-md bg-white border border-ink-200 grid place-items-center text-ink-600 hover:text-[#c25450] hover:border-[#e0a8a6]"
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
