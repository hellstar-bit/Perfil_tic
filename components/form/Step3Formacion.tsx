"use client";

import { useState, useEffect } from "react";

export interface Formacion {
  id: string;
  programa: string;
  institucion: string;
  nivel: string;
  anioInicio: string;
  anioFin: string;
  urlCert: string;
}

interface FormState {
  editandoId: string | null;
  programa: string;
  institucion: string;
  nivel: string;
  anioInicio: string;
  anioFin: string;
  urlCert: string;
  errores: Record<string, string>;
}

const BLANK: FormState = {
  editandoId: null,
  programa: "",
  institucion: "",
  nivel: "",
  anioInicio: "",
  anioFin: "",
  urlCert: "",
  errores: {},
};

const ANIO_ACTUAL = new Date().getFullYear();
const ANIOS = Array.from({ length: ANIO_ACTUAL - 1990 + 1 }, (_, i) =>
  String(ANIO_ACTUAL - i)
);

const NIVELES = [
  "Bachillerato", "Técnico", "Tecnólogo", "Universitario",
  "Especialización", "Maestría", "Doctorado",
  "Curso", "Certificación", "Bootcamp", "Diplomado",
];

const INSTITUCIONES = [
  "SENA",
  "Universidad Nacional de Colombia",
  "Universidad de Antioquia",
  "Universidad del Valle",
  "Universidad Javeriana",
  "Universidad de los Andes",
  "Universidad del Rosario",
  "Universidad EAN",
  "Universidad EAFIT",
  "Universidad Distrital Francisco José de Caldas",
  "Universidad de Cartagena",
  "Universidad del Atlántico",
  "Universidad Surcolombiana",
  "Universidad de Nariño",
  "Universidad de Córdoba",
  "Universidad de Caldas",
  "Universidad Tecnológica de Pereira",
  "Universidad Industrial de Santander",
  "Politécnico Grancolombiano",
  "Corporación Universitaria Minuto de Dios (Uniminuto)",
  "Fundación Universitaria del Área Andina",
  "Universidad Autónoma de Colombia",
  "MinTIC",
  "Talento Tech",
  "Misión TIC",
  "Coursera",
  "Platzi",
  "Udemy",
  "Google (certificación)",
  "Meta (certificación)",
  "Microsoft",
  "AWS",
  "IBM",
  "Otra institución",
];

function isValidUrl(url: string): boolean {
  return /^https?:\/\/.+/.test(url);
}

/* ─── Icons ─── */
const GradIcon = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

/* ─── Tarjeta individual con animación de entrada ─── */
function FormacionCard({
  formacion,
  isEditing,
  isDeleting,
  onEdit,
  onDelete,
}: {
  formacion: Formacion;
  isEditing: boolean;
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      onClick={onEdit}
      className={[
        "group relative card p-4 cursor-pointer",
        isDeleting
          ? "opacity-0 transition-all duration-150"
          : visible
          ? "opacity-100 translate-y-0 transition-all duration-200"
          : "opacity-0 translate-y-2",
        isEditing
          ? "border-neon bg-brand-50"
          : "hover:border-neon/40 hover:shadow-sm transition-all",
      ].join(" ")}
    >
      <div className="flex gap-3 pr-8">
        <div className="shrink-0 bg-brand-50 text-neon rounded-[8px] p-2 self-start">
          <GradIcon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[14px] leading-tight text-ink-900 truncate">
            {formacion.programa}
          </div>
          <div className="text-[12px] text-ink-500 mt-0.5">{formacion.institucion}</div>
          <div className="text-[11px] text-ink-400 mt-1">
            {formacion.nivel} · {formacion.anioInicio} — {formacion.anioFin}
          </div>
          {formacion.urlCert && isValidUrl(formacion.urlCert) && (
            <a
              href={formacion.urlCert}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="chip mt-2 hover:bg-brand-100"
            >
              Ver certificado →
            </a>
          )}
        </div>
      </div>

      {/* Botones hover */}
      <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="h-7 w-7 rounded-md bg-ink-200 border border-ink-300 text-ink-500 hover:text-neon hover:border-neon/50 grid place-items-center"
          title="Editar"
        >
          <EditIcon />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="h-7 w-7 rounded-md bg-ink-200 border border-ink-300 text-ink-500 hover:text-coral hover:border-coral/50 grid place-items-center"
          title="Eliminar"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

/* ─── Componente principal ─── */
export function Step3Formacion({
  formaciones,
  onChange,
}: {
  formaciones: Formacion[];
  onChange: (formaciones: Formacion[]) => void;
}) {
  const [form, setForm] = useState<FormState>(BLANK);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const maximo = false;
  const disabled = false;
  const urlValida = form.urlCert ? isValidUrl(form.urlCert) : null;

  const set = (k: keyof Omit<FormState, "errores" | "editandoId">, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v, errores: { ...prev.errores, [k]: "" } }));

  const cargar = (f: Formacion) =>
    setForm({
      editandoId: f.id,
      programa: f.programa,
      institucion: f.institucion,
      nivel: f.nivel,
      anioInicio: f.anioInicio,
      anioFin: f.anioFin,
      urlCert: f.urlCert,
      errores: {},
    });

  const cancelar = () => setForm(BLANK);

  const guardar = () => {
    const e: Record<string, string> = {};
    if (!form.programa.trim()) e.programa = "El nombre del programa es requerido";
    if (!form.institucion.trim()) e.institucion = "La institución es requerida";
    if (!form.nivel) e.nivel = "El nivel de estudio es requerido";
    if (!form.anioInicio) e.anioInicio = "El año de inicio es requerido";
    if (!form.anioFin) e.anioFin = "El año de finalización es requerido";
    if (form.urlCert && !isValidUrl(form.urlCert))
      e.urlCert = "Ingresa una URL válida (ej: https://...)";
    if (
      form.anioFin &&
      form.anioFin !== "Actualidad" &&
      form.anioInicio &&
      Number(form.anioFin) < Number(form.anioInicio)
    )
      e.anioFin = "El año de fin debe ser mayor o igual al inicio";

    if (Object.keys(e).length > 0) {
      setForm((p) => ({ ...p, errores: e }));
      return;
    }

    const item: Formacion = {
      id: form.editandoId ?? crypto.randomUUID(),
      programa: form.programa.trim(),
      institucion: form.institucion.trim(),
      nivel: form.nivel,
      anioInicio: form.anioInicio,
      anioFin: form.anioFin,
      urlCert: form.urlCert.trim(),
    };

    if (form.editandoId) {
      onChange(formaciones.map((f) => (f.id === form.editandoId ? item : f)));
    } else {
      onChange([...formaciones, item]);
    }
    setForm(BLANK);
  };

  const eliminar = (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      onChange(formaciones.filter((f) => f.id !== id));
      setDeletingIds((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
      if (form.editandoId === id) setForm(BLANK);
    }, 150);
  };

  /* ─── Columna formulario ─── */
  const formCol = (
    <div className="card rounded-xl p-5 space-y-4">
      {/* Header del panel */}
      <div className="flex items-center justify-between pb-3 border-b border-ink-100">
        <div className="flex items-center gap-2.5">
          <div className={`h-7 w-7 rounded-lg grid place-items-center ${form.editandoId ? "bg-brand-50 text-neon" : "bg-neon text-noir"}`}>
            <GradIcon size={14} />
          </div>
          <h3 className="text-sm font-semibold text-ink-900">
            {form.editandoId ? "Editando formación" : "Nueva formación"}
          </h3>
        </div>
        {form.editandoId && (
          <button
            onClick={cancelar}
            className="h-7 w-7 grid place-items-center rounded-md text-ink-400 hover:text-ink-700 hover:bg-ink-100"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {disabled && (
        <div className="p-3 rounded-[8px] bg-amber-50 border border-amber-200 text-[13px] text-amber-800 leading-snug">
          Alcanzaste el máximo de 6 formaciones. Edita o elimina una existente.
        </div>
      )}

      <fieldset disabled={disabled} className="space-y-3 disabled:opacity-60">
        {/* Programa */}
        <div>
          <label className="text-xs font-medium text-ink-700 block mb-1">
            Nombre del programa o carrera *
          </label>
          <input
            className="field"
            value={form.programa}
            onChange={(e) => set("programa", e.target.value)}
            maxLength={100}
            placeholder="Ej: Técnico en Análisis y Desarrollo de Software"
          />
          {form.errores.programa && (
            <p className="text-xs text-red-500 mt-1">{form.errores.programa}</p>
          )}
        </div>

        {/* Institución con datalist */}
        <div>
          <label className="text-xs font-medium text-ink-700 block mb-1">
            Institución *
          </label>
          <input
            className="field"
            list="instituciones-list"
            value={form.institucion}
            onChange={(e) => set("institucion", e.target.value)}
            placeholder="SENA, Universidad, plataforma..."
          />
          <datalist id="instituciones-list">
            {INSTITUCIONES.map((inst) => (
              <option key={inst} value={inst} />
            ))}
          </datalist>
          {form.errores.institucion && (
            <p className="text-xs text-red-500 mt-1">{form.errores.institucion}</p>
          )}
        </div>

        {/* Nivel */}
        <div>
          <label className="text-xs font-medium text-ink-700 block mb-1">
            Nivel de estudio *
          </label>
          <select
            className="field"
            value={form.nivel}
            onChange={(e) => set("nivel", e.target.value)}
          >
            <option value="">Selecciona el nivel</option>
            {NIVELES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {form.errores.nivel && (
            <p className="text-xs text-red-500 mt-1">{form.errores.nivel}</p>
          )}
        </div>

        {/* Años */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-ink-700 block mb-1">
              Año inicio *
            </label>
            <select
              className="field"
              value={form.anioInicio}
              onChange={(e) => set("anioInicio", e.target.value)}
            >
              <option value="">Año</option>
              {ANIOS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            {form.errores.anioInicio && (
              <p className="text-xs text-red-500 mt-1">{form.errores.anioInicio}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-medium text-ink-700 block mb-1">
              Año fin *
            </label>
            <select
              className="field"
              value={form.anioFin}
              onChange={(e) => set("anioFin", e.target.value)}
            >
              <option value="">Año</option>
              <option value="Actualidad">Actualidad</option>
              {ANIOS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            {form.errores.anioFin && (
              <p className="text-xs text-red-500 mt-1">{form.errores.anioFin}</p>
            )}
          </div>
        </div>

        {/* URL certificado */}
        <div>
          <label className="text-xs font-medium text-ink-700 block mb-1">
            URL certificado <span className="text-ink-400 font-normal">(opcional)</span>
          </label>
          <input
            className="field"
            type="url"
            value={form.urlCert}
            onChange={(e) => set("urlCert", e.target.value)}
            placeholder="https://..."
          />
          {form.urlCert && urlValida && (
            <a
              href={form.urlCert}
              target="_blank"
              rel="noopener noreferrer"
              className="chip mt-2 inline-flex"
            >
              Ver certificado →
            </a>
          )}
          {form.errores.urlCert && (
            <p className="text-xs text-red-500 mt-1">{form.errores.urlCert}</p>
          )}
        </div>
      </fieldset>

      <button
        onClick={guardar}
        disabled={disabled}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {form.editandoId ? "Guardar cambios" : "Guardar formación"}
      </button>
    </div>
  );

  /* ─── Columna lista ─── */
  const listaCol = (
    <div className="bg-ink-100 rounded-xl border border-ink-200 p-5 flex flex-col min-h-[420px]">
      {formaciones.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center gap-1">
          <div className="h-14 w-14 rounded-2xl bg-ink-200 border border-ink-300 grid place-items-center text-neon/40 mx-auto">
            <GradIcon size={28} />
          </div>
          <p className="mt-3 font-medium text-[14px] text-ink-700">Tus formaciones aparecerán aquí</p>
          <p className="text-[13px] text-ink-400 mt-0.5 max-w-[200px] leading-snug">
            Completa el formulario y haz click en Guardar
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-500">
              Guardadas
            </span>
            <span className="text-[11px] font-semibold text-neon bg-brand-50 border border-neon/20 px-2 py-0.5 rounded-full">
              {formaciones.length} / 6
            </span>
          </div>
          {formaciones.map((f) => (
            <FormacionCard
              key={f.id}
              formacion={f}
              isEditing={form.editandoId === f.id}
              isDeleting={deletingIds.has(f.id)}
              onEdit={() => cargar(f)}
              onDelete={() => eliminar(f.id)}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-5 md:items-start">
      {/* Mobile: lista primero (solo si hay items) · Desktop: columna derecha */}
      <div className={`order-1 md:order-2 ${formaciones.length === 0 ? "hidden md:flex md:flex-col" : ""}`}>
        {listaCol}
      </div>
      {/* Formulario: mobile segundo · Desktop: columna izquierda */}
      <div className="order-2 md:order-1">
        {formCol}
      </div>
    </div>
  );
}
