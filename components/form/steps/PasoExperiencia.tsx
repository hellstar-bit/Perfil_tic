"use client";

import { useState } from "react";
import type { Experiencia } from "@/types/perfil";
import { Icons } from "../shared/Icons";
import { StepTopBar } from "../shared/StepTopBar";
import { StepSidebar } from "../shared/StepSidebar";
import { StepFooter } from "../shared/StepFooter";
import { FieldLabel } from "../shared/FieldLabel";
import { FormHeader } from "../shared/FormHeader";
import { EmptyState } from "../shared/EmptyState";
import { SavedCard } from "../shared/SavedCard";

const ANOS = Array.from({ length: 36 }, (_, i) => String(2026 - i));

const TIPOS_EXP = [
  { v: "empleo",       l: "Empleo formal",         d: "Contrato laboral",        icon: Icons.Work },
  { v: "obra",         l: "Contrato por obra",      d: "Proyecto específico",     icon: Icons.Clipboard },
  { v: "sena",         l: "Práctica SENA",          d: "Contrato de aprendizaje", icon: Icons.GradCap },
  { v: "universidad",  l: "Práctica universitaria", d: "Convenio académico",      icon: Icons.Building },
  { v: "voluntariado", l: "Voluntariado",           d: "Sin remuneración",        icon: Icons.Heart },
  { v: "comunitario",  l: "Trabajo comunitario",    d: "Apoyo a la comunidad",    icon: Icons.Users },
  { v: "freelance",    l: "Freelance",              d: "Trabajo independiente",   icon: Icons.Terminal },
  { v: "negocio",      l: "Negocio propio",         d: "Emprendimiento",          icon: Icons.Store },
];

interface Campos {
  cargo: string;
  empresa: string;
  tipo: string;
  inicio: string;
  fin: string;
  descripcion: string;
}

const BLANK: Campos = {
  cargo: "", empresa: "", tipo: "empleo",
  inicio: "", fin: "", descripcion: "",
};

interface Props {
  experiencias: Experiencia[];
  onChange: (items: Experiencia[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSalir: () => void;
}

function ExperienciaCard({
  item, active, deleting, onEdit, onDelete,
}: {
  item: Experiencia; active: boolean; deleting: boolean;
  onEdit: () => void; onDelete: () => void;
}) {
  const tipoMeta = TIPOS_EXP.find((t) => t.v === item.tipo);
  return (
    <SavedCard active={active} deleting={deleting} onEdit={onEdit} onDelete={onDelete}>
      <div className="p-4 pr-24 flex gap-3.5">
        <div
          className="h-12 w-12 shrink-0 rounded-[10px] grid place-items-center"
          style={{
            background: active ? "rgba(0,229,160,0.08)" : "rgba(0,229,160,0.05)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: active ? "rgba(0,229,160,0.30)" : "rgba(0,229,160,0.12)",
          }}
        >
          {tipoMeta && <tipoMeta.icon width="22" height="22" className={active ? "text-neon" : "text-ink-500"} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-[14px] leading-tight text-ink-900">{item.cargo}</div>
          <div className="text-[12px] text-ink-600 mt-0.5 truncate">{item.empresa}</div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-50 text-neon font-medium border border-neon/20 inline-flex items-center gap-1">
              {tipoMeta && <tipoMeta.icon width="10" height="10" />} {tipoMeta?.l}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-ink-50 border border-ink-200 text-ink-600">
              {item.inicio} — {item.fin}
            </span>
          </div>
          <p className="text-[12px] text-ink-600 mt-2 leading-snug line-clamp-2">{item.descripcion}</p>
        </div>
      </div>
    </SavedCard>
  );
}

export function PasoExperiencia({ experiencias, onChange, onNext, onBack, onSalir }: Props) {
  const [items, setItems] = useState<Experiencia[]>(experiencias);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [campos, setCampos] = useState<Campos>(BLANK);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [saliendo, setSaliendo] = useState<string | null>(null);

  const set = <K extends keyof Campos>(k: K, v: Campos[K]) => {
    setCampos((p) => ({ ...p, [k]: v }));
    setErrores((p) => ({ ...p, [k]: "" }));
  };

  const seleccionarTipo = (tipo: typeof TIPOS_EXP[number]) => {
    setCampos((p) => ({ ...p, tipo: tipo.v }));
    setErrores((p) => ({ ...p, tipo: "" }));
  };

  const editarItem = (item: Experiencia) => {
    setEditandoId(item.id);
    setCampos({ cargo: item.cargo, empresa: item.empresa, tipo: item.tipo,
      inicio: item.inicio, fin: item.fin, descripcion: item.descripcion });
    setErrores({});
  };

  const cancelar = () => { setEditandoId(null); setCampos(BLANK); setErrores({}); };

  const guardar = () => {
    const e: Record<string, string> = {};
    if (campos.cargo.trim().length < 3) e.cargo = "Mínimo 3 caracteres";
    if (campos.empresa.trim().length < 2) e.empresa = "Campo requerido";
    if (!campos.tipo) e.tipo = "Selecciona el tipo";
    if (!campos.inicio) e.inicio = "Selecciona el año de inicio";
    if (!campos.fin) e.fin = "Selecciona el año de fin";
    if (campos.fin && campos.fin !== "Actualidad" && campos.inicio && parseInt(campos.fin) < parseInt(campos.inicio))
      e.fin = "El año de fin no puede ser anterior al de inicio";
    if (campos.descripcion.trim().length < 20) e.descripcion = "Mínimo 20 caracteres";

    if (Object.keys(e).length > 0) { setErrores(e); return; }

    const tipoMeta = TIPOS_EXP.find((t) => t.v === campos.tipo);
    const item: Experiencia = {
      id: editandoId ?? crypto.randomUUID(),
      cargo: campos.cargo.trim(),
      empresa: campos.empresa.trim(),
      tipo: campos.tipo,
      emoji: "",
      inicio: campos.inicio,
      fin: campos.fin,
      descripcion: campos.descripcion.trim(),
    };

    const next = editandoId ? items.map((ex) => (ex.id === editandoId ? item : ex)) : [...items, item];
    setItems(next);
    onChange(next);
    cancelar();
  };

  const eliminar = (id: string) => {
    setSaliendo(id);
    setTimeout(() => {
      const next = items.filter((ex) => ex.id !== id);
      setItems(next);
      onChange(next);
      if (editandoId === id) cancelar();
      setSaliendo(null);
    }, 150);
  };

  const charCount = campos.descripcion.length;
  const maximo = items.length >= 6 && editandoId === null;
  const mode = editandoId ? "edit" : "new";
  const editandoItem = items.find((ex) => ex.id === editandoId);

  return (
    <div className="h-dvh w-full flex">
      <StepSidebar current={5} onSalir={onSalir} />
      <div className="flex flex-col flex-1 min-w-0 bg-ink-50 font-sans text-ink-900">
      <StepTopBar current={5} label="Experiencia laboral" onBack={onBack} onSalir={onSalir} />

      <main className="flex-1 overflow-y-auto px-5 py-5 md:px-10 md:py-8">
        <div className="md:max-w-[1200px] md:mx-auto">

          {/* Banner */}
          <div className="rounded-[10px] bg-brand-50 p-4 flex gap-3 mb-6" style={{ border: "1px solid rgba(0,229,160,0.15)" }}>
            <div className="text-neon shrink-0 mt-0.5"><Icons.Sparkle /></div>
            <div className="text-[13px] text-ink-700 leading-relaxed">
              <b className="text-neon font-semibold">La experiencia informal también cuenta.</b> Los reclutadores de PerfilTIC valoran el trabajo comunitario, las prácticas y los proyectos propios igual que un empleo formal.
            </div>
          </div>

          <div className="md:grid md:grid-cols-[minmax(0,_45fr)_minmax(0,_55fr)] md:gap-8 md:items-start">

            {/* Mobile: lista primero */}
            {items.length > 0 && (
              <div className="mb-6 md:hidden">
                <h3 className="text-[11px] font-medium uppercase tracking-wider text-ink-500 mb-3">
                  Tu experiencia ({items.length})
                </h3>
                <div className="space-y-2.5">
                  {items.slice(0, 1).map((ex) => (
                    <ExperienciaCard key={ex.id} item={ex} active={ex.id === editandoId}
                      deleting={saliendo === ex.id} onEdit={() => editarItem(ex)} onDelete={() => eliminar(ex.id)} />
                  ))}
                </div>
              </div>
            )}

            {/* Formulario */}
            <div className="card p-5 md:p-7 md:sticky md:top-6">
              <FormHeader
                mode={mode}
                newTitle="Nueva experiencia"
                editTitle={editandoItem?.cargo ?? ""}
                onCancel={cancelar}
              />

              {maximo && (
                <div className="mb-4 p-3 rounded-[8px] bg-amber-50 border border-amber-200 text-[13px] text-amber-800">
                  Alcanzaste el máximo de 6 experiencias.
                </div>
              )}

              <fieldset disabled={maximo} className="space-y-4 disabled:opacity-60">
                <div>
                  <FieldLabel>Cargo o rol</FieldLabel>
                  <input
                    className={`field ${errores.cargo ? "border-red-400" : ""}`}
                    value={campos.cargo}
                    onChange={(e) => set("cargo", e.target.value)}
                    placeholder="ej: Soporte técnico, Practicante, Monitor..."
                  />
                  {errores.cargo && <p className="mt-1 text-xs text-red-600">{errores.cargo}</p>}
                </div>

                <div>
                  <FieldLabel>Empresa u organización</FieldLabel>
                  <input
                    className={`field ${errores.empresa ? "border-red-400" : ""}`}
                    value={campos.empresa}
                    onChange={(e) => set("empresa", e.target.value)}
                    placeholder="ej: Empresa S.A.S., Alcaldía, Comunidad..."
                  />
                  {errores.empresa && <p className="mt-1 text-xs text-red-600">{errores.empresa}</p>}
                </div>

                <div>
                  <FieldLabel>Tipo de experiencia</FieldLabel>
                  <div className="grid grid-cols-2 gap-1.5">
                    {TIPOS_EXP.map((t) => (
                      <button
                        key={t.v}
                        type="button"
                        onClick={() => seleccionarTipo(t)}
                        className={`flex items-start gap-2.5 px-3 py-2.5 rounded-[8px] text-left transition-colors
                          ${campos.tipo === t.v
                            ? "bg-brand-50 ring-1 ring-neon/40"
                            : "bg-ink-100 hover:bg-ink-200"}`}
                        style={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: campos.tipo === t.v ? "rgba(0,229,160,0.35)" : "rgba(255,255,255,0.07)",
                        }}
                      >
                        <span className={`shrink-0 mt-0.5 ${campos.tipo === t.v ? "text-neon" : "text-ink-500"}`}>
                          <t.icon width="15" height="15" />
                        </span>
                        <div className="min-w-0">
                          <div className={`text-[12px] font-semibold leading-tight ${campos.tipo === t.v ? "text-neon" : "text-ink-800"}`}>
                            {t.l}
                          </div>
                          <div className="text-[10px] text-ink-500 mt-0.5">{t.d}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errores.tipo && <p className="mt-1 text-xs text-red-600">{errores.tipo}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Año inicio</FieldLabel>
                    <select
                      className={`field ${errores.inicio ? "border-red-400" : ""}`}
                      value={campos.inicio}
                      onChange={(e) => set("inicio", e.target.value)}
                    >
                      <option value="">Año</option>
                      {ANOS.map((a) => <option key={a}>{a}</option>)}
                    </select>
                    {errores.inicio && <p className="mt-1 text-xs text-red-600">{errores.inicio}</p>}
                  </div>
                  <div>
                    <FieldLabel>Año fin</FieldLabel>
                    <select
                      className={`field ${errores.fin ? "border-red-400" : ""}`}
                      value={campos.fin}
                      onChange={(e) => set("fin", e.target.value)}
                    >
                      <option value="">Año</option>
                      <option>Actualidad</option>
                      {ANOS.map((a) => <option key={a}>{a}</option>)}
                    </select>
                    {errores.fin && <p className="mt-1 text-xs text-red-600">{errores.fin}</p>}
                  </div>
                </div>

                <div>
                  <FieldLabel>Descripción</FieldLabel>
                  <div className="relative">
                    <textarea
                      className={`w-full px-3 py-2.5 rounded-[6px] border bg-ink-100 text-ink-900 placeholder:text-ink-500 outline-none focus:border-neon resize-none min-h-[112px] text-sm leading-relaxed
                        ${errores.descripcion ? "border-red-400" : "border-ink-200"}`}
                      value={campos.descripcion}
                      onChange={(e) => set("descripcion", e.target.value)}
                      maxLength={300}
                      placeholder="Describe qué hacías, qué aprendiste o en qué ayudabas. Sé concreto y honesto."
                    />
                    <div className="absolute bottom-2 right-3 text-[10px] font-mono text-ink-400">{charCount}/300</div>
                  </div>
                  {errores.descripcion && <p className="mt-1 text-xs text-red-600">{errores.descripcion}</p>}
                </div>
              </fieldset>

              <div className="mt-6 pt-5 border-t border-ink-100 flex items-center gap-2.5">
                <button
                  onClick={guardar}
                  disabled={maximo}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-neon text-noir font-semibold text-sm hover:brightness-90 disabled:opacity-50"
                >
                  {editandoId ? <><Icons.Check /> Guardar cambios</> : <><Icons.Plus /> Agregar experiencia</>}
                </button>
                {!editandoId && (
                  <button onClick={cancelar} className="text-sm text-ink-500 hover:text-ink-700">
                    Limpiar
                  </button>
                )}
              </div>
            </div>

            {/* Lista (desktop) */}
            <div className="hidden md:block">
              <div className="mb-4">
                <h3 className="text-[11px] font-medium uppercase tracking-wider text-neon">Tu experiencia</h3>
                <div className="mt-0.5 text-[12px] text-ink-500">{items.length} de 6 — empieza por la más reciente</div>
              </div>
              {items.length === 0 ? (
                <EmptyState
                  icon={<Icons.Briefcase />}
                  title="Tu experiencia aparecerá aquí"
                  subtitle="No importa si es tu primera vez trabajando — cualquier experiencia tiene valor. Prácticas, voluntariado y emprendimientos también cuentan."
                />
              ) : (
                <div className="space-y-3">
                  {items.map((ex) => (
                    <ExperienciaCard key={ex.id} item={ex} active={ex.id === editandoId}
                      deleting={saliendo === ex.id} onEdit={() => editarItem(ex)} onDelete={() => eliminar(ex.id)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <StepFooter
        onBack={onBack}
        onNext={onNext}
        nextLabel="Siguiente"
        emptyHint={items.length === 0 ? "Puedes continuar sin agregar experiencia. Siempre podrás editarlo desde tu perfil." : undefined}
      />
      </div>
    </div>
  );
}
