"use client";

import { useState, useRef } from "react";
import type { Proyecto } from "@/types/perfil";
import { HABILIDADES_TIC } from "@/lib/habilidades";
import { Icons } from "../shared/Icons";
import { StepTopBar } from "../shared/StepTopBar";
import { StepFooter } from "../shared/StepFooter";
import { FieldLabel } from "../shared/FieldLabel";
import { FormHeader } from "../shared/FormHeader";
import { EmptyState } from "../shared/EmptyState";
import { SavedCard } from "../shared/SavedCard";

const TIPOS = ["Académico", "Personal", "Freelance", "Voluntariado", "Laboral", "Otro"];
const ANOS = Array.from({ length: 36 }, (_, i) => String(2026 - i));
const COLORES_PASTEL = ["#d2ede2", "#fcebd5", "#e8e4f5", "#d5e8f4", "#f5e4e4", "#f5f0e4"];

const TECHS_DISPLAY = HABILIDADES_TIC.filter((h) => h.sugerida).map((h) => h.nombre).slice(0, 12);

function generarColor() {
  return COLORES_PASTEL[Math.floor(Math.random() * COLORES_PASTEL.length)];
}

function generarIniciales(nombre: string) {
  return nombre.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("") || "??";
}

interface Campos {
  nombre: string;
  descripcion: string;
  tipo: string;
  tecnologias: string[];
  url: string;
  imagen: string;
  color: string;
  iniciales: string;
}

const BLANK: Campos = {
  nombre: "", descripcion: "", tipo: "Académico",
  tecnologias: [], url: "", imagen: "", color: generarColor(), iniciales: "",
};

interface Props {
  proyectos: Proyecto[];
  onChange: (items: Proyecto[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSalir: () => void;
}

function ProyectoCard({
  item, active, deleting, onEdit, onDelete,
}: {
  item: Proyecto; active: boolean; deleting: boolean;
  onEdit: () => void; onDelete: () => void;
}) {
  return (
    <SavedCard active={active} deleting={deleting} onEdit={onEdit} onDelete={onDelete}>
      <div
        className="relative h-32 w-full"
        style={{ background: `repeating-linear-gradient(135deg, ${item.color} 0 8px, transparent 8px 16px), ${item.color}` }}
      >
        {item.imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imagen} alt={item.nombre} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="font-mono font-semibold text-2xl text-ink-700/40">{item.iniciales}</div>
          </div>
        )}
        <div className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded-md bg-ink-100/90 backdrop-blur-sm text-[10px] font-medium text-ink-700 border border-ink-200">
          {item.tipo}
        </div>
      </div>
      <div className="p-4">
        <div className="font-semibold text-[14px] leading-tight text-ink-900">{item.nombre}</div>
        <div className="text-[12px] text-ink-600 mt-1 leading-snug line-clamp-2">{item.descripcion}</div>
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          {item.tecnologias.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-ink-50 border border-ink-200 text-ink-700">{t}</span>
          ))}
          {item.tecnologias.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-md text-ink-500">+{item.tecnologias.length - 3} más</span>
          )}
          {item.url && (
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-md bg-brand-50 text-neon font-medium inline-flex items-center gap-1 border border-neon/20">
              <Icons.Link /> Ver proyecto
            </span>
          )}
        </div>
      </div>
    </SavedCard>
  );
}

export function PasoProyectos({ proyectos, onChange, onNext, onBack, onSalir }: Props) {
  const [items, setItems] = useState<Proyecto[]>(proyectos);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [campos, setCampos] = useState<Campos>(BLANK);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [saliendo, setSaliendo] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Campos>(k: K, v: Campos[K]) => {
    setCampos((p) => ({ ...p, [k]: v }));
    setErrores((p) => ({ ...p, [k]: "" }));
  };

  const toggleTec = (t: string) => {
    const cur = campos.tecnologias;
    if (cur.includes(t)) {
      set("tecnologias", cur.filter((x) => x !== t));
    } else if (cur.length < 5) {
      set("tecnologias", [...cur, t]);
    }
  };

  const editarItem = (item: Proyecto) => {
    setEditandoId(item.id);
    setCampos({ nombre: item.nombre, descripcion: item.descripcion, tipo: item.tipo,
      tecnologias: item.tecnologias, url: item.url, imagen: item.imagen,
      color: item.color, iniciales: item.iniciales });
    setErrores({});
  };

  const cancelar = () => { setEditandoId(null); setCampos({ ...BLANK, color: generarColor() }); setErrores({}); };

  const guardar = () => {
    const e: Record<string, string> = {};
    if (campos.nombre.trim().length < 3) e.nombre = "Mínimo 3 caracteres";
    if (campos.nombre.trim().length > 80) e.nombre = "Máximo 80 caracteres";
    if (campos.descripcion.trim().length < 10) e.descripcion = "Mínimo 10 caracteres";
    if (!campos.tipo) e.tipo = "Selecciona el tipo";
    if (campos.url && !/^https?:\/\/.+/.test(campos.url)) e.url = "Ingresa una URL válida (ej: https://...)";

    if (Object.keys(e).length > 0) { setErrores(e); return; }

    const nombre = campos.nombre.trim();
    const item: Proyecto = {
      id: editandoId ?? crypto.randomUUID(),
      nombre,
      descripcion: campos.descripcion.trim(),
      tipo: campos.tipo,
      tecnologias: campos.tecnologias,
      url: campos.url.trim(),
      imagen: campos.imagen,
      color: campos.color || generarColor(),
      iniciales: campos.iniciales || generarIniciales(nombre),
    };

    const next = editandoId ? items.map((p) => (p.id === editandoId ? item : p)) : [...items, item];
    setItems(next);
    onChange(next);
    cancelar();
  };

  const eliminar = (id: string) => {
    setSaliendo(id);
    setTimeout(() => {
      const next = items.filter((p) => p.id !== id);
      setItems(next);
      onChange(next);
      if (editandoId === id) cancelar();
      setSaliendo(null);
    }, 150);
  };

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrores((p) => ({ ...p, imagen: "Solo JPG, PNG o WEBP" }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrores((p) => ({ ...p, imagen: "La imagen no puede superar 2MB" }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => set("imagen", ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const charCount = campos.descripcion.length;
  const maximo = items.length >= 6 && editandoId === null;
  const mode = editandoId ? "edit" : "new";
  const editandoItem = items.find((p) => p.id === editandoId);
  const techsRestantes = TECHS_DISPLAY.filter((t) => !campos.tecnologias.includes(t));

  return (
    <div className="h-dvh w-full bg-ink-50 font-sans text-ink-900 flex flex-col">
      <StepTopBar current={4} label="Proyectos" onBack={onBack} onSalir={onSalir} />

      <main className="flex-1 overflow-y-auto px-5 py-5 md:px-10 md:py-8">
        <div className="md:max-w-[1200px] md:mx-auto md:grid md:grid-cols-[minmax(0,_45fr)_minmax(0,_55fr)] md:gap-8 md:items-start">

          {/* Mobile: lista primero */}
          {items.length > 0 && (
            <div className="mb-6 md:hidden">
              <h3 className="text-[11px] font-medium uppercase tracking-wider text-ink-500 mb-3">
                Tus proyectos ({items.length})
              </h3>
              <div className="space-y-3">
                {items.slice(0, 1).map((p) => (
                  <ProyectoCard key={p.id} item={p} active={p.id === editandoId}
                    deleting={saliendo === p.id} onEdit={() => editarItem(p)} onDelete={() => eliminar(p.id)} />
                ))}
              </div>
            </div>
          )}

          {/* Formulario */}
          <div className="card p-5 md:p-7 md:sticky md:top-6">
            <FormHeader
              mode={mode}
              newTitle="Nuevo proyecto"
              editTitle={editandoItem?.nombre ?? ""}
              onCancel={cancelar}
            />

            {maximo && (
              <div className="mb-4 p-3 rounded-[8px] bg-amber-50 border border-amber-200 text-[13px] text-amber-800">
                Alcanzaste el máximo de 6 proyectos.
              </div>
            )}

            <fieldset disabled={maximo} className="space-y-4 disabled:opacity-60">
              <div>
                <FieldLabel>Nombre del proyecto</FieldLabel>
                <input
                  className={`field ${errores.nombre ? "border-red-400" : ""}`}
                  value={campos.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  maxLength={80}
                  placeholder="Ej: App de tareas, Tienda online..."
                />
                {errores.nombre && <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>}
              </div>

              <div>
                <FieldLabel>Descripción</FieldLabel>
                <div className="relative">
                  <textarea
                    className={`w-full px-3 py-2.5 rounded-[6px] border bg-ink-100 text-ink-900 placeholder:text-ink-500 outline-none focus:border-neon resize-none min-h-[88px] text-sm leading-relaxed
                      ${errores.descripcion ? "border-red-400" : "border-ink-200"}`}
                    value={campos.descripcion}
                    onChange={(e) => set("descripcion", e.target.value)}
                    maxLength={200}
                    placeholder="¿Qué construiste? ¿Para quién? ¿Qué problema resuelve?"
                  />
                  <div className="absolute bottom-2 right-3 text-[10px] font-mono text-ink-400">{charCount}/200</div>
                </div>
                {errores.descripcion && <p className="mt-1 text-xs text-red-600">{errores.descripcion}</p>}
              </div>

              <div>
                <FieldLabel>Tipo de proyecto</FieldLabel>
                <div className="grid grid-cols-3 gap-1.5">
                  {TIPOS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set("tipo", t)}
                      className={`h-10 px-2 rounded-[6px] text-[12px] font-medium border transition-colors
                        ${campos.tipo === t
                          ? "bg-neon text-noir border-neon"
                          : "bg-ink-100 text-ink-900 border-ink-200 hover:border-ink-300"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <FieldLabel optional hint={`${campos.tecnologias.length}/5`}>Tecnologías usadas</FieldLabel>
                <div className="rounded-[8px] border border-ink-200 bg-ink-100 p-2">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {campos.tecnologias.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 h-7 pl-3 pr-1 rounded-full bg-neon text-noir text-xs font-semibold">
                        {t}
                        <button type="button" onClick={() => toggleTec(t)} className="h-5 w-5 grid place-items-center rounded-full hover:bg-noir/20">
                          <Icons.X width={12} height={12} />
                        </button>
                      </span>
                    ))}
                    {campos.tecnologias.length < 5 && (
                      <div className="inline-flex items-center gap-1 h-7 px-3 rounded-full text-xs text-ink-500 border border-dashed border-ink-300">
                        <Icons.Plus width={12} height={12} /> Agregar
                      </div>
                    )}
                  </div>
                  {techsRestantes.length > 0 && (
                    <div className="border-t border-ink-100 pt-2">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-ink-500 mb-1.5">Tus habilidades</div>
                      <div className="flex flex-wrap gap-1.5">
                        {techsRestantes.map((t) => (
                          <button key={t} type="button" onClick={() => toggleTec(t)}
                            className="h-7 px-3 rounded-full text-xs font-medium bg-ink-200 text-ink-700 hover:bg-brand-50 hover:text-neon">
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <FieldLabel optional>Enlace al proyecto</FieldLabel>
                <input
                  className={`field ${errores.url ? "border-red-400" : ""}`}
                  value={campos.url}
                  onChange={(e) => set("url", e.target.value)}
                  placeholder="https://github.com/... o https://miproyecto.com"
                />
                {errores.url && <p className="mt-1 text-xs text-red-600">{errores.url}</p>}
              </div>

              <div>
                <FieldLabel optional>Imagen del proyecto</FieldLabel>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="rounded-[8px] border-2 border-dashed border-ink-200 bg-ink-50/40 p-5 text-center hover:border-brand-400 hover:bg-brand-50/40 transition-colors cursor-pointer"
                >
                  {campos.imagen ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={campos.imagen} alt="preview" className="h-20 mx-auto object-contain rounded" />
                  ) : (
                    <>
                      <div className="inline-flex h-10 w-10 rounded-full bg-ink-100 border border-ink-200 items-center justify-center text-ink-500 mb-2">
                        <Icons.Upload />
                      </div>
                      <div className="text-[13px] font-medium text-ink-700">Arrastra o haz click para subir</div>
                      <div className="text-[11px] text-ink-500 mt-0.5">JPG, PNG o WEBP · máximo 2 MB</div>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleImagen} />
                {errores.imagen && <p className="mt-1 text-xs text-red-600">{errores.imagen}</p>}
              </div>
            </fieldset>

            <div className="mt-6 pt-5 border-t border-ink-100 flex items-center gap-2.5">
              <button
                onClick={guardar}
                disabled={maximo}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-neon text-noir font-semibold text-sm hover:brightness-90 disabled:opacity-50"
              >
                {editandoId ? <><Icons.Check /> Guardar cambios</> : <><Icons.Plus /> Agregar proyecto</>}
              </button>
              {!editandoId && (
                <button onClick={() => setCampos({ ...BLANK, color: generarColor() })} className="text-sm text-ink-500 hover:text-ink-700">
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Lista (desktop) */}
          <div className="hidden md:block">
            <div className="mb-4">
              <h3 className="text-[11px] font-medium uppercase tracking-wider text-neon">Tus proyectos</h3>
              <div className="mt-0.5 text-[12px] text-ink-500">{items.length} de 6 — destaca los que más te enorgullecen</div>
            </div>
            {items.length === 0 ? (
              <EmptyState
                icon={<Icons.Folder />}
                title="Aquí verás tus proyectos"
                subtitle="No necesitas tener proyectos en GitHub — cualquier cosa que hayas construido cuenta. Un sitio sencillo, una app de práctica, un diseño en Figma."
              />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {items.map((p) => (
                  <ProyectoCard key={p.id} item={p} active={p.id === editandoId}
                    deleting={saliendo === p.id} onEdit={() => editarItem(p)} onDelete={() => eliminar(p.id)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <StepFooter
        onBack={onBack}
        onNext={onNext}
        emptyHint={items.length === 0 ? "Puedes continuar sin agregar proyectos. Siempre podrás editarlo desde tu perfil." : undefined}
      />
    </div>
  );
}
