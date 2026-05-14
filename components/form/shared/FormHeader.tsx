import { Icons } from "./Icons";

interface Props {
  mode: "new" | "edit";
  newTitle: string;
  editTitle: string;
  onCancel?: () => void;
}

export function FormHeader({ mode, newTitle, editTitle, onCancel }: Props) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <div className={`text-[10px] font-medium uppercase tracking-wider ${mode === "edit" ? "text-brand-500" : "text-brand-700"}`}>
          {mode === "edit" ? "Editando" : "Nuevo registro"}
        </div>
        <h2 className="mt-0.5 text-[20px] font-semibold leading-tight">
          {mode === "edit" ? editTitle : newTitle}
        </h2>
      </div>
      {mode === "edit" && onCancel && (
        <button
          onClick={onCancel}
          className="h-8 px-2.5 rounded-md text-xs font-medium text-ink-600 hover:bg-ink-50 inline-flex items-center gap-1"
        >
          <Icons.X /> Cancelar
        </button>
      )}
    </div>
  );
}
