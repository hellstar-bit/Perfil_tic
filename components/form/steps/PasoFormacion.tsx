"use client";

import { useState } from "react";
import type { Formacion } from "@/types/perfil";
import { INSTITUCIONES } from "@/lib/instituciones";
import { Icons } from "../shared/Icons";
import { StepTopBar } from "../shared/StepTopBar";
import { StepSidebar } from "../shared/StepSidebar";
import { StepFooter } from "../shared/StepFooter";
import { FieldLabel } from "../shared/FieldLabel";
import { FormHeader } from "../shared/FormHeader";
import { EmptyState } from "../shared/EmptyState";
import { SavedCard } from "../shared/SavedCard";
import { ChatCertificado } from "@/components/ai/ChatCertificado";

const MESES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

function parseFecha(str: string): { mes: string; anio: string } {
  const m = str?.trim().match(/^([A-Za-záéíóúÁÉÍÓÚ]+)\s+(\d{4})$/);
  if (m && MESES.includes(m[1])) return { mes: m[1], anio: m[2] };
  return { mes: "", anio: str?.trim() ?? "" };
}

function fmtFecha(mes: string, anio: string): string {
  return mes ? `${mes} ${anio}` : anio;
}

function fechaANum(mes: string, anio: string): number {
  const m = MESES.indexOf(mes) + 1;
  return parseInt(anio) * 100 + (m > 0 ? m : 0);
}

const NIVELES = [
  "Bachillerato", "Técnico", "Tecnólogo", "Universitario",
  "Especialización", "Maestría", "Doctorado",
  "Curso", "Certificación", "Bootcamp", "Diplomado",
];

const ANOS = Array.from({ length: 36 }, (_, i) => String(2026 - i));

interface Campos {
  nombre: string;
  institucion: string;
  nivel: string;
  mesInicio: string;
  inicio: string;
  mesFin: string;
  fin: string;
  cert: string;
}

const BLANK: Campos = { nombre: "", institucion: "", nivel: "", mesInicio: "", inicio: "", mesFin: "", fin: "", cert: "" };

interface Props {
  formaciones: Formacion[];
  onChange: (items: Formacion[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSalir: () => void;
}

function FormacionCard({
  item, active, deleting, onEdit, onDelete,
}: {
  item: Formacion; active: boolean; deleting: boolean;
  onEdit: () => void; onDelete: () => void;
}) {
  return (
    <SavedCard active={active} deleting={deleting} onEdit={onEdit} onDelete={onDelete}>
      <div className="p-4 pr-24 flex gap-3.5">
        <div className={`h-12 w-12 shrink-0 rounded-[10px] grid place-items-center
          ${active ? "bg-ink-200 text-neon border border-neon/30" : "bg-brand-50 text-neon"}`}>
          <Icons.Cap />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-[14px] leading-tight text-ink-900">{item.nombre}</div>
          <div className="text-[12px] text-ink-600 mt-0.5 truncate">{item.institucion} · {item.nivel}</div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-ink-50 border border-ink-200 text-ink-600">
              {item.inicio} — {item.fin}
            </span>
            {item.cert && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-50 text-neon font-medium inline-flex items-center gap-1 border border-neon/20">
                <Icons.Link /> Ver certificado
              </span>
            )}
          </div>
        </div>
      </div>
    </SavedCard>
  );
}

export function PasoFormacion({ formaciones, onChange, onNext, onBack, onSalir }: Props) {
  const [items, setItems] = useState<Formacion[]>(formaciones);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [campos, setCampos] = useState<Campos>(BLANK);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [saliendo, setSaliendo] = useState<string | null>(null);
  const [showSuggest, setShowSuggest] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const set = (k: keyof Campos, v: string) => {
    setCampos((p) => ({ ...p, [k]: v }));
    setErrores((p) => ({ ...p, [k]: "" }));
  };

  const editarItem = (item: Formacion) => {
    setEditandoId(item.id);
    const pI = parseFecha(item.inicio);
    const pF = item.fin === "Actualidad" ? { mes: "", anio: "Actualidad" } : parseFecha(item.fin);
    setCampos({ nombre: item.nombre, institucion: item.institucion, nivel: item.nivel,
      mesInicio: pI.mes, inicio: pI.anio, mesFin: pF.mes, fin: pF.anio, cert: item.cert });
    setErrores({});
  };

  const cancelar = () => {
    setEditandoId(null);
    setCampos(BLANK);
    setErrores({});
  };

  const guardar = () => {
    const e: Record<string, string> = {};
    if (campos.nombre.trim().length < 3) e.nombre = "Mínimo 3 caracteres";
    if (campos.institucion.trim().length < 2) e.institucion = "Campo requerido";
    if (!campos.nivel) e.nivel = "Selecciona el nivel";
    if (!campos.inicio) e.inicio = "Selecciona el año de inicio";
    if (!campos.fin) e.fin = "Selecciona el año de fin";
    if (campos.fin && campos.fin !== "Actualidad" && campos.inicio &&
        fechaANum(campos.mesFin, campos.fin) < fechaANum(campos.mesInicio, campos.inicio))
      e.fin = "La fecha de fin no puede ser anterior al inicio";
    if (campos.cert && !/^https?:\/\/.+/.test(campos.cert))
      e.cert = "Ingresa una URL válida (ej: https://...)";

    if (Object.keys(e).length > 0) { setErrores(e); return; }

    const item: Formacion = {
      id: editandoId ?? crypto.randomUUID(),
      nombre: campos.nombre.trim(),
      institucion: campos.institucion.trim(),
      nivel: campos.nivel,
      inicio: fmtFecha(campos.mesInicio, campos.inicio),
      fin: campos.fin === "Actualidad" ? "Actualidad" : fmtFecha(campos.mesFin, campos.fin),
      cert: campos.cert.trim(),
    };

    const next = editandoId
      ? items.map((f) => (f.id === editandoId ? item : f))
      : [...items, item];

    setItems(next);
    onChange(next);
    cancelar();
  };

  const eliminar = (id: string) => {
    setSaliendo(id);
    setTimeout(() => {
      const next = items.filter((f) => f.id !== id);
      setItems(next);
      onChange(next);
      if (editandoId === id) cancelar();
      setSaliendo(null);
    }, 150);
  };

  const sugerencias = campos.institucion
    ? INSTITUCIONES.filter((i) => i.toLowerCase().includes(campos.institucion.toLowerCase())).slice(0, 5)
    : INSTITUCIONES.slice(0, 5);

  const maximo = items.length >= 6 && editandoId === null;
  const mode = editandoId ? "edit" : "new";
  const editandoItem = items.find((f) => f.id === editandoId);

  return (
    <div className="h-dvh w-full flex">
      <StepSidebar current={3} onSalir={onSalir} />
      <div className="flex flex-col flex-1 min-w-0 bg-ink-50 font-sans text-ink-900">
      <StepTopBar current={3} label="Formación y certificados" onBack={onBack} onSalir={onSalir} />

      <main className="flex-1 overflow-y-auto px-5 py-5 md:px-10 md:py-8">
        <div className="md:max-w-[1200px] md:mx-auto md:grid md:grid-cols-[minmax(0,_45fr)_minmax(0,_55fr)] md:gap-8 md:items-start">

          {/* Mobile: lista primero */}
          {items.length > 0 && (
            <div className="mb-6 md:hidden">
              <h3 className="text-[11px] font-medium uppercase tracking-wider text-ink-500 mb-3">
                Tus formaciones ({items.length})
              </h3>
              <div className="space-y-2.5">
                {items.slice(0, 1).map((f) => (
                  <FormacionCard key={f.id} item={f} active={f.id === editandoId}
                    deleting={saliendo === f.id} onEdit={() => editarItem(f)} onDelete={() => eliminar(f.id)} />
                ))}
              </div>
            </div>
          )}

          {/* Formulario (sticky en desktop) */}
          <div className="card p-5 md:p-7 md:sticky md:top-6">
            <FormHeader
              mode={mode}
              newTitle="Nueva formación o certificado"
              editTitle={editandoItem?.nombre ?? ""}
              onCancel={cancelar}
            />

            {!maximo && !showChat && (
              <div className="mb-5 rounded-[10px] border border-neon/25 p-4" style={{ background: "rgba(0,229,160,0.04)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#00E5A0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/>
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neon">Asistente IA</span>
                </div>
                <p className="text-[12px] text-ink-500 mb-3 leading-snug">Sube tu certificado o cuéntame sobre tus estudios — la IA completa el formulario y te pregunta lo que falte</p>
                <button type="button" onClick={() => setShowChat(true)}
                  className="h-9 px-4 rounded-[8px] bg-neon text-noir text-[12px] font-bold hover:brightness-90 transition-all inline-flex items-center gap-2">
                  ✦ Hacer con IA
                </button>
              </div>
            )}

            {showChat && (
              <div className="mb-4 rounded-[10px] overflow-hidden border border-neon/25" style={{ height: 400 }}>
                <ChatCertificado
                  onDatos={(datos) => {
                    const raw = datos as Record<string, unknown>;
                    const d: Record<string, string> =
                      Array.isArray(raw.formacion) && raw.formacion.length > 0
                        ? (raw.formacion[0] as Record<string, string>)
                        : (raw as Record<string, string>);
                    const partesP = (d.periodo ?? "").split(/\s*[-–]\s*/);
                    const pI = parseFecha(d.fechaInicio ?? d.inicio ?? d.anioInicio ?? partesP[0] ?? "");
                    const rawFin = d.fechaFin ?? d.fin ?? d.anioFin ?? partesP[1] ?? "";
                    const pF = rawFin === "Actualidad" ? { mes: "", anio: "Actualidad" } : parseFecha(rawFin);
                    const item: Formacion = {
                      id: crypto.randomUUID(),
                      nombre:      d.programa    ?? d.nombre     ?? "",
                      institucion: d.institucion ?? "",
                      nivel:       d.nivel       ?? "",
                      inicio:      fmtFecha(pI.mes, pI.anio),
                      fin:         rawFin === "Actualidad" ? "Actualidad" : fmtFecha(pF.mes, pF.anio),
                      cert:        "",
                    };
                    const next = [...items, item];
                    setItems(next);
                    onChange(next);
                  }}
                  onCerrar={() => setShowChat(false)}
                />
              </div>
            )}

            {maximo && (
              <div className="mb-4 p-3 rounded-[8px] bg-amber-50 border border-amber-200 text-[13px] text-amber-800">
                Alcanzaste el máximo de 6 formaciones.
              </div>
            )}

            <fieldset disabled={maximo} className="space-y-4 disabled:opacity-60">
              <div>
                <FieldLabel>Nombre del programa o carrera</FieldLabel>
                <input
                  className={`field ${errores.nombre ? "border-red-400" : ""}`}
                  value={campos.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  placeholder="Ej: Tecnólogo en Desarrollo de Software"
                />
                {errores.nombre && <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>}
              </div>

              <div>
                <FieldLabel>Institución</FieldLabel>
                <div className="relative">
                  <input
                    className={`field pr-9 ${errores.institucion ? "border-red-400" : ""}`}
                    value={campos.institucion}
                    onChange={(e) => { set("institucion", e.target.value); setShowSuggest(true); }}
                    onFocus={() => setShowSuggest(true)}
                    onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
                    placeholder="Empieza a escribir..."
                  />
                  <Icons.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" />
                  {showSuggest && sugerencias.length > 0 && (
                    <div className="absolute top-12 left-0 right-0 bg-ink-100 border border-ink-200 rounded-[8px] shadow-lg z-10 overflow-hidden">
                      <div className="px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-ink-500 bg-ink-200">
                        Sugerencias
                      </div>
                      {sugerencias.map((inst, idx) => (
                        <button
                          key={inst}
                          type="button"
                          onMouseDown={() => { set("institucion", inst); setShowSuggest(false); }}
                          className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between ${idx === 0 ? "bg-ink-200 text-neon" : "hover:bg-ink-200"}`}
                        >
                          <span>{inst}</span>
                          {idx === 0 && <span className="text-[10px] text-ink-400">↵</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errores.institucion && <p className="mt-1 text-xs text-red-600">{errores.institucion}</p>}
              </div>

              <div>
                <FieldLabel>Nivel de estudio</FieldLabel>
                <div className="relative">
                  <select
                    className={`field appearance-none pr-9 ${errores.nivel ? "border-red-400" : ""}`}
                    value={campos.nivel}
                    onChange={(e) => set("nivel", e.target.value)}
                  >
                    <option value="">Selecciona el nivel</option>
                    {NIVELES.map((n) => <option key={n}>{n}</option>)}
                  </select>
                  <Icons.Chevron className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                </div>
                {errores.nivel && <p className="mt-1 text-xs text-red-600">{errores.nivel}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel>Inicio</FieldLabel>
                  <div className="flex gap-1.5">
                    <div className="relative flex-1 min-w-0">
                      <select
                        className="field appearance-none pr-6 text-[12px]"
                        value={campos.mesInicio}
                        onChange={(e) => set("mesInicio", e.target.value)}
                      >
                        <option value="">Mes</option>
                        {MESES.map((m) => <option key={m}>{m}</option>)}
                      </select>
                      <Icons.Chevron className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                    </div>
                    <div className="relative flex-1 min-w-0">
                      <select
                        className={`field appearance-none pr-6 text-[12px] ${errores.inicio ? "border-red-400" : ""}`}
                        value={campos.inicio}
                        onChange={(e) => set("inicio", e.target.value)}
                      >
                        <option value="">Año</option>
                        {ANOS.map((a) => <option key={a}>{a}</option>)}
                      </select>
                      <Icons.Chevron className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                    </div>
                  </div>
                  {errores.inicio && <p className="mt-1 text-xs text-red-600">{errores.inicio}</p>}
                </div>
                <div>
                  <FieldLabel>Fin</FieldLabel>
                  <div className="flex gap-1.5">
                    <div className="relative flex-1 min-w-0">
                      <select
                        className="field appearance-none pr-6 text-[12px] disabled:opacity-40"
                        value={campos.mesFin}
                        onChange={(e) => set("mesFin", e.target.value)}
                        disabled={campos.fin === "Actualidad"}
                      >
                        <option value="">Mes</option>
                        {MESES.map((m) => <option key={m}>{m}</option>)}
                      </select>
                      <Icons.Chevron className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                    </div>
                    <div className="relative flex-1 min-w-0">
                      <select
                        className={`field appearance-none pr-6 text-[12px] ${errores.fin ? "border-red-400" : ""}`}
                        value={campos.fin}
                        onChange={(e) => set("fin", e.target.value)}
                      >
                        <option value="">Año</option>
                        <option>Actualidad</option>
                        {ANOS.map((a) => <option key={a}>{a}</option>)}
                      </select>
                      <Icons.Chevron className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                    </div>
                  </div>
                  {errores.fin && <p className="mt-1 text-xs text-red-600">{errores.fin}</p>}
                </div>
              </div>

              <div>
                <FieldLabel optional>URL del certificado</FieldLabel>
                <input
                  className={`field ${errores.cert ? "border-red-400" : ""}`}
                  value={campos.cert}
                  onChange={(e) => set("cert", e.target.value)}
                  placeholder="https://..."
                />
                <div className="mt-1.5 text-[11px] text-ink-500">
                  Si tienes link al diploma o certificación digital, agrégalo.
                </div>
                {errores.cert && <p className="mt-1 text-xs text-red-600">{errores.cert}</p>}
              </div>
            </fieldset>

            <div className="mt-6 pt-5 border-t border-ink-100 flex items-center gap-2.5">
              <button
                onClick={guardar}
                disabled={maximo}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-neon text-noir font-semibold text-sm hover:brightness-90 disabled:opacity-50"
              >
                {editandoId ? <><Icons.Check /> Guardar cambios</> : <><Icons.Plus /> Agregar formación</>}
              </button>
              {!editandoId && (
                <button onClick={() => setCampos(BLANK)} className="text-sm text-ink-500 hover:text-ink-700">
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Lista (desktop) */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[11px] font-medium uppercase tracking-wider text-neon">Tus formaciones</h3>
                <div className="mt-0.5 text-[12px] text-ink-500">{items.length} de 6 — puedes agregar hasta 6</div>
              </div>
            </div>
            {items.length === 0 ? (
              <EmptyState
                icon={<Icons.Diploma />}
                title="Tus formaciones aparecerán aquí"
                subtitle="Empieza por la más reciente. Cursos, bootcamps y certificaciones también cuentan."
              />
            ) : (
              <div className="space-y-3">
                {items.map((f) => (
                  <FormacionCard key={f.id} item={f} active={f.id === editandoId}
                    deleting={saliendo === f.id} onEdit={() => editarItem(f)} onDelete={() => eliminar(f.id)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <StepFooter
        onBack={onBack}
        onNext={onNext}
        emptyHint={items.length === 0 ? "Puedes continuar sin agregar formaciones. Siempre podrás editarlo desde tu perfil." : undefined}
      />
      </div>
    </div>
  );
}
