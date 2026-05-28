"use client";

import { useReducer, useState, useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";
import { useRouter } from "next/navigation";
import { LocationSelect } from "@/components/form/LocationSelect";
import { HABILIDADES_TIC, CATEGORIAS } from "@/lib/habilidades";
import { PasoFormacion } from "@/components/form/steps/PasoFormacion";
import { PasoProyectos } from "@/components/form/steps/PasoProyectos";
import { PasoExperiencia } from "@/components/form/steps/PasoExperiencia";
import { PALETA } from "@/lib/paleta";
import type { Formacion, Proyecto, Experiencia } from "@/types/perfil";
import { StepSidebar } from "@/components/form/shared/StepSidebar";
import { CVTemplateSelector } from "@/components/CVTemplateSelector";
import type { TemplateId } from "@/components/pdf/shared/pdfTypes";
import { BtnGenerarFrase } from "@/components/ai/BtnGenerarFrase";
import { PanelCoach } from "@/components/ai/PanelCoach";

/* ─── Types ─── */
type Habilidad = { nombre: string; nivel: number };

type State = {
  nombre: string;
  apellido: string;
  cargo: string;
  departamento: string;
  municipio: string;
  email: string;
  telefono: string;
  foto: string;
  frase: string;
  modalidad: string;
  colorTema: string;
  cvTemplate: string;
  habilidades: Habilidad[];
  formaciones: Formacion[];
  proyectos: Proyecto[];
  experiencias: Experiencia[];
};

type Action =
  | { type: "SET"; payload: Partial<State> }
  | { type: "RESET" };

const INITIAL: State = {
  nombre: "", apellido: "", cargo: "", departamento: "", municipio: "", email: "",
  telefono: "", foto: "", frase: "", modalidad: "", colorTema: "#0f6e56", cvTemplate: "clasica",
  habilidades: [], formaciones: [], proyectos: [], experiencias: [],
};

const STORAGE_KEY = "StartIA-draft";

function reducer(state: State, action: Action): State {
  if (action.type === "RESET") return INITIAL;
  return { ...state, ...action.payload };
}

/* ─── Icon set ─── */
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);
const Back = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
);
const Sparkle = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/></svg>
);
const Plus = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
);
const Trash = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
);
const Eye = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
);

const STEPS = [
  { n: 1, label: "Datos" },
  { n: 2, label: "Habilidades" },
  { n: 3, label: "Formación" },
  { n: 4, label: "Proyectos" },
  { n: 5, label: "Experiencia" },
  { n: 6, label: "Perfil" },
  { n: 7, label: "Vista previa" },
];

const LEVELS = ["Sé poco", "Básico", "Intermedio", "Avanzado", "Experto"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-0.5 h-3.5 rounded-full bg-neon opacity-60" />
      <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">{children}</span>
    </div>
  );
}

/* ─── Step 1 ─── */
function Step1({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const f = (k: keyof State) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    dispatch({ type: "SET", payload: { [k]: e.target.value } });

  const fullName = [state.nombre, state.apellido].filter(Boolean).join(" ");
  const initials = fullName.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("") || "?";

  const CHECKS = [
    { label: "Nombre",    ok: !!state.nombre },
    { label: "Cargo",     ok: !!state.cargo },
    { label: "Ubicación", ok: !!(state.departamento && state.municipio) },
    { label: "Correo",    ok: !!state.email },
    { label: "Teléfono",  ok: !!state.telefono },
    { label: "Modalidad", ok: !!state.modalidad },
  ];
  const done = CHECKS.filter((c) => c.ok).length;

  return (
    <div className="md:grid md:grid-cols-[1fr_272px] md:gap-10 md:items-start">

      {/* ── Left: form ── */}
      <div className="space-y-7">
        <div>
          <SectionLabel>Datos básicos</SectionLabel>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-ink-600 mb-1.5 block tracking-wide">Nombre *</label>
                <input className="field" value={state.nombre} onChange={f("nombre")} placeholder="Laura" />
              </div>
              <div>
                <label className="text-[11px] font-medium text-ink-600 mb-1.5 block tracking-wide">Apellido</label>
                <input className="field" value={state.apellido} onChange={f("apellido")} placeholder="Mendoza" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-medium text-ink-600 mb-1.5 block tracking-wide">Cargo / Rol *</label>
              <input className="field" value={state.cargo} onChange={f("cargo")} placeholder="Desarrolladora Front-end Junior" />
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>Ubicación</SectionLabel>
          <LocationSelect
            departamento={state.departamento}
            municipio={state.municipio}
            onChange={(field, value) => dispatch({ type: "SET", payload: { [field]: value } })}
          />
        </div>

        <div>
          <SectionLabel>Contacto</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-ink-600 mb-1.5 block tracking-wide">Correo electrónico *</label>
              <input className="field" type="email" value={state.email} onChange={f("email")} placeholder="laura@correo.co" />
            </div>
            <div>
              <label className="text-[11px] font-medium text-ink-600 mb-1.5 block tracking-wide">Teléfono</label>
              <input className="field" value={state.telefono} onChange={f("telefono")} placeholder="+57 300 000 0000" />
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>Disponibilidad</SectionLabel>
          <label className="text-[11px] font-medium text-ink-600 mb-1.5 block tracking-wide">Modalidad preferida</label>
          <select className="field" value={state.modalidad} onChange={f("modalidad")}>
            <option value="">Selecciona...</option>
            <option value="Remoto">Remoto</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Presencial">Presencial</option>
          </select>
        </div>
      </div>

      {/* ── Right: live preview ── */}
      <div className="hidden md:flex flex-col gap-4 sticky top-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">
          Vista previa
        </p>

        {/* Profile card preview */}
        <div className="card overflow-hidden">
          <div className="h-1.5" style={{ background: "linear-gradient(90deg,#00C78A,#00E5A0)" }} />
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-11 w-11 rounded-full grid place-items-center font-bold text-white text-sm shrink-0 transition-colors duration-300"
                style={{ background: state.nombre ? "#1a3a6b" : "#2E2E2E" }}
              >
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-[14px] text-ink-900 leading-tight truncate">
                  {fullName || <span className="text-ink-500 font-normal italic text-[12px]">Tu nombre</span>}
                </div>
                <div className="text-[11px] text-ink-500 mt-0.5 truncate">
                  {state.cargo || <span className="italic">Cargo / Rol</span>}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3 min-h-[22px]">
              {state.municipio && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-ink-100 border border-ink-200 text-ink-600">
                  {[state.municipio, state.departamento].filter(Boolean).join(", ")}
                </span>
              )}
              {state.modalidad && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 border border-neon/20 text-neon">
                  {state.modalidad}
                </span>
              )}
              {!state.municipio && !state.modalidad && (
                <span className="text-[10px] text-ink-600 italic">Ubicación y modalidad…</span>
              )}
            </div>

            <div className="border-t border-ink-200 pt-3">
              {state.frase ? (
                <p className="text-[11px] text-ink-600 leading-relaxed line-clamp-3">{state.frase}</p>
              ) : (
                <p className="text-[11px] text-ink-600 italic">Tu frase de presentación…</p>
              )}
            </div>
          </div>
        </div>

        {/* Completitud */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-ink-700">Completitud</span>
            <span className="text-[11px] font-mono font-bold text-neon">{done}/{CHECKS.length}</span>
          </div>
          <div className="h-1 w-full rounded-full bg-ink-200 overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(done / CHECKS.length) * 100}%`,
                background: "linear-gradient(90deg,#00C78A,#00E5A0)",
              }}
            />
          </div>
          <div className="space-y-1.5">
            {CHECKS.map(({ label, ok }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`h-4 w-4 rounded-full grid place-items-center shrink-0 transition-all duration-300
                    ${ok ? "bg-neon" : "bg-ink-200"}`}
                >
                  {ok && <Check />}
                </div>
                <span className={`text-[11px] transition-colors ${ok ? "text-ink-700" : "text-ink-500"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2 ─── */
function Step2({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const selected = new Set(state.habilidades.map((h) => h.nombre));

  const toggle = (nombre: string) => {
    if (selected.has(nombre)) {
      dispatch({ type: "SET", payload: { habilidades: state.habilidades.filter((h) => h.nombre !== nombre) } });
    } else {
      dispatch({ type: "SET", payload: { habilidades: [...state.habilidades, { nombre, nivel: 3 }] } });
    }
  };

  const setLevel = (nombre: string, nivel: number) => {
    dispatch({ type: "SET", payload: { habilidades: state.habilidades.map((h) => h.nombre === nombre ? { ...h, nivel } : h) } });
  };

  const addCustom = () => {
    const v = search.trim();
    if (!v || selected.has(v)) return;
    dispatch({ type: "SET", payload: { habilidades: [...state.habilidades, { nombre: v, nivel: 3 }] } });
    setSearch("");
  };

  const visibles = HABILIDADES_TIC.filter((h) => {
    const matchCat = categoria === "Todas" ? h.sugerida : h.categoria === categoria;
    const matchSearch = !search || h.nombre.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (search ? true : matchCat);
  });

  return (
    <div className="md:grid md:grid-cols-[1fr_300px] md:gap-8 md:items-start">

      {/* Left — search / categories / skills / tip */}
      <div className="space-y-5">
        <div className="relative">
          <input className="field pr-20" value={search} onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustom()}
            placeholder="Buscar o agregar (ej: Python, Canva...)" />
          <button onClick={addCustom} className="absolute right-1.5 top-1.5 h-8 px-3 rounded-[6px] bg-neon text-noir text-xs font-semibold">Agregar</button>
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {["Todas", ...CATEGORIAS].map((cat) => (
            <button key={cat} onClick={() => setCategoria(cat)}
              className={`h-7 px-3 rounded-full text-[11px] font-medium transition-colors ${categoria === cat ? "bg-neon text-noir" : "bg-ink-100 text-ink-600 hover:bg-ink-200"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-ink-500 mb-2">
            {search ? `Resultados para "${search}"` : categoria === "Todas" ? "Habilidades sugeridas" : categoria}
          </div>
          <div className="flex flex-wrap gap-2">
            {visibles.map((h) => (
              <button key={h.nombre} onClick={() => toggle(h.nombre)}
                className={`h-9 px-3.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5 border transition-colors ${selected.has(h.nombre) ? "bg-neon text-noir border-neon" : "bg-ink-100 text-ink-900 border-ink-200 hover:border-ink-300"}`}>
                {selected.has(h.nombre) && <Check />} {h.nombre}
              </button>
            ))}
            {visibles.length === 0 && <p className="text-sm text-ink-400">Sin resultados. Usa &quot;Agregar&quot; para añadirla.</p>}
          </div>
        </div>

        <div className="p-3.5 rounded-[10px] bg-brand-50 border border-brand-100 flex gap-3">
          <span className="text-brand-600 shrink-0 mt-0.5"><Sparkle /></span>
          <div className="text-[13px] text-brand-800 leading-snug">
            <b>Tip:</b> ser honesto con tu nivel funciona mejor. Los reclutadores valoran más quien dice <i>&quot;básico&quot;</i> con seguridad que quien exagera.
          </div>
        </div>
      </div>

      {/* Right — level selectors (sticky on desktop, below on mobile) */}
      <div className={`mt-5 md:mt-0 md:sticky md:top-6 ${state.habilidades.length === 0 ? "hidden md:block" : ""}`}>
        <div className="card p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-neon mb-3">
            Tu nivel en lo seleccionado
          </div>
          {state.habilidades.length === 0 ? (
            <div className="py-10 flex flex-col items-center gap-2 text-center">
              <div className="h-10 w-10 rounded-full bg-ink-100 grid place-items-center text-ink-400 mb-1">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <p className="text-[13px] text-ink-500 leading-snug">Selecciona habilidades<br />para ajustar tu nivel</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {state.habilidades.map((h) => (
                <div key={h.nombre} className="p-3 rounded-[8px] bg-ink-50 border border-ink-200">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-medium text-[13px] text-ink-900 truncate flex-1 min-w-0 pr-1">{h.nombre}</span>
                    <button onClick={() => toggle(h.nombre)} className="text-ink-400 hover:text-coral shrink-0"><Trash /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <button key={i} onClick={() => setLevel(h.nombre, i)}
                          className={`flex-1 h-1.5 rounded-full transition-colors ${i <= h.nivel ? "bg-neon" : "bg-ink-200 hover:bg-ink-300"}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-ink-500 shrink-0 w-16 text-right">{LEVELS[h.nivel - 1]}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 6: Perfil profesional (frase) ─── */
function Step6({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const f = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch({ type: "SET", payload: { frase: e.target.value } });
  const nombre = [state.nombre, state.apellido].filter(Boolean).join(" ");

  return (
    <div className="space-y-5">
      <p className="text-[14px] text-ink-600 leading-relaxed">
        Esta frase aparece en tu CV y perfil público. La IA la genera usando todo lo que llenaste — edítala o elige la que más te represente.
      </p>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-medium text-ink-600 tracking-wide">Frase de presentación</label>
          <span className="text-[10px] font-mono text-ink-500">{state.frase.length}/280</span>
        </div>
        <textarea
          className="field h-28 py-2.5 resize-none"
          value={state.frase}
          onChange={f}
          maxLength={280}
          placeholder="Cuéntanos brevemente sobre ti y lo que buscas…"
        />
      </div>
      <BtnGenerarFrase
        nombre={nombre}
        cargo={state.cargo}
        habilidades={state.habilidades.map((h) => h.nombre)}
        experiencia={state.experiencias.map((e) => e.cargo)}
        formacion={state.formaciones.map((fm) => fm.nombre)}
        autoGenerate={!state.frase}
        onSelect={(frase) => dispatch({ type: "SET", payload: { frase } })}
      />
    </div>
  );
}

/* ─── Step 7: Vista previa ─── */
function Step7({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const name = [state.nombre, state.apellido].filter(Boolean).join(" ");
  const inits = name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
  const tema = state.colorTema || "#0f6e56";

  return (
    <div className="space-y-6">
      {/* Coach IA */}
      <PanelCoach
        nombre={name}
        cargo={state.cargo}
        frase={state.frase}
        foto={state.foto}
        habilidades={state.habilidades}
        formaciones={state.formaciones}
        proyectos={state.proyectos}
        experiencias={state.experiencias}
      />

      {/* Preview card */}
      <div className="card overflow-hidden">
        <div className="h-2" style={{ backgroundColor: tema }} />
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-full grid place-items-center font-semibold text-lg text-white shrink-0"
              style={{ backgroundColor: tema }}>
              {inits || "?"}
            </div>
            <div>
              <div className="font-semibold text-base">{name || "—"}</div>
              <div className="text-sm text-ink-500">{state.cargo || "—"}</div>
              <div className="text-xs text-ink-400">
                {state.municipio && state.departamento ? `${state.municipio}, ${state.departamento}` : ""} · {state.email}
              </div>
            </div>
          </div>
          {state.frase && <p className="text-sm text-ink-700 leading-relaxed border-t border-ink-100 pt-3">{state.frase}</p>}
        </div>
      </div>

      {/* Color picker */}
      <div className="card p-4">
        <div className="text-[11px] font-medium uppercase tracking-wider text-ink-500 mb-3">Color de tu perfil</div>
        <div className="grid grid-cols-4 gap-2">
          {PALETA.map((p) => (
            <button
              key={p.color}
              onClick={() => dispatch({ type: "SET", payload: { colorTema: p.color } })}
              className="flex flex-col items-center gap-1.5 group"
            >
              <span
                className="w-full h-9 rounded-lg transition-all"
                style={{
                  backgroundColor: p.color,
                  outline: tema === p.color ? `3px solid ${p.color}` : "3px solid transparent",
                  outlineOffset: "2px",
                }}
              />
              <span className={`text-[10px] leading-none ${tema === p.color ? "text-ink-800 font-medium" : "text-ink-400"}`}>
                {p.nombre}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Template selector */}
      <div className="card p-4">
        <CVTemplateSelector
          selected={(state.cvTemplate as TemplateId) || "clasica"}
          onSelect={(id) => dispatch({ type: "SET", payload: { cvTemplate: id } })}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {[
          { label: "Habilidades", count: state.habilidades.length },
          { label: "Formación", count: state.formaciones.length },
          { label: "Proyectos", count: state.proyectos.length },
          { label: "Experiencia", count: state.experiencias.length },
        ].map(({ label, count }) => (
          <div key={label} className="card p-3">
            <div className="text-[10px] uppercase tracking-wider font-medium mb-1" style={{ color: tema }}>{label}</div>
            <div className="text-ink-900 font-semibold">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 0: Importar CV ─── */
function Step0({ onImport, onSkip }: { onImport: (data: Partial<State>) => void; onSkip: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [puestoObjetivo, setPuestoObjetivo] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") { setErrorMsg("Solo se aceptan archivos PDF"); return; }
    setFileName(file.name);
    setStatus("loading");
    setErrorMsg("");
    const form = new FormData();
    form.append("archivo", file);
    if (puestoObjetivo.trim()) form.append("puestoObjetivo", puestoObjetivo.trim());
    try {
      const res = await fetch("/api/ai/importar-cv", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? "Error al leer el CV"); setStatus("error"); return; }
      onImport(data);
    } catch {
      setErrorMsg("Error de conexión. Intenta de nuevo.");
      setStatus("error");
    }
  };

  const isDragging = false;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: "#0E0E0E" }}>

      {/* Top bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/[0.06] shrink-0">
        <Logo />
        <a href="/login" className="text-[12px] text-ink-500 hover:text-ink-700 transition-colors">
          ¿Ya tienes cuenta? <span className="text-neon">Inicia sesión</span>
        </a>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10">

        {/* Heading */}
        <div className="text-center mb-10 max-w-lg">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-neon mb-5 px-3 py-1.5 rounded-full border border-neon/20" style={{ background: "rgba(0,229,160,0.06)" }}>
            <Sparkle /> IA incluida gratis
          </div>
          <h1 className="text-[30px] font-bold text-ink-900 leading-tight mb-3">
            Crea tu perfil profesional
          </h1>
          <p className="text-[14px] text-ink-500 leading-relaxed">
            Importa tu CV y la IA completa todo — o empieza desde cero paso a paso.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl">

          {/* ── Card A: Importar CV ── */}
          <div className="rounded-[20px] border border-white/[0.08] p-6 flex flex-col gap-4" style={{ background: "#111111" }}>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-[10px] grid place-items-center shrink-0" style={{ background: "rgba(0,229,160,0.10)" }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#00E5A0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <div>
                <div className="text-[14px] font-bold text-ink-900">Importar mi CV</div>
                <div className="text-[11px] text-ink-500">La IA extrae y organiza todo</div>
              </div>
            </div>

            {/* Drop zone */}
            <div
              onClick={() => status !== "loading" && inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              className={`rounded-[12px] border-2 border-dashed flex flex-col items-center justify-center gap-2.5 py-6 transition-all select-none
                ${status === "loading"
                  ? "border-neon/30 cursor-wait"
                  : fileName
                  ? "border-neon/50 cursor-pointer"
                  : "border-white/[0.10] hover:border-neon/40 cursor-pointer"}`}
              style={{ background: status === "loading" || fileName ? "rgba(0,229,160,0.04)" : "rgba(255,255,255,0.02)" }}
            >
              {status === "loading" ? (
                <>
                  <div className="h-7 w-7 rounded-full border-[2.5px] border-neon border-t-transparent animate-spin" />
                  <div className="text-center">
                    <p className="text-[13px] font-medium text-ink-700">Analizando con IA…</p>
                    <p className="text-[11px] text-ink-500 mt-0.5">Esto tarda unos segundos</p>
                  </div>
                </>
              ) : fileName ? (
                <>
                  <div className="h-8 w-8 rounded-full bg-neon/10 grid place-items-center text-neon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
                  </div>
                  <div className="text-center">
                    <p className="text-[12px] font-semibold text-neon truncate max-w-[180px]">{fileName}</p>
                    <p className="text-[11px] text-ink-500 mt-0.5">Haz clic para cambiar el archivo</p>
                  </div>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-500">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <div className="text-center">
                    <p className="text-[13px] font-semibold text-ink-700">Arrastra tu CV aquí</p>
                    <p className="text-[11px] text-ink-500 mt-0.5">o haz clic para elegir · PDF · Máx 10 MB</p>
                  </div>
                </>
              )}
            </div>

            <input ref={inputRef} type="file" accept=".pdf,application/pdf" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

            {/* Puesto objetivo */}
            <div>
              <label className="text-[11px] font-semibold text-ink-500 uppercase tracking-widest block mb-1.5">
                ¿Para qué puesto? <span className="normal-case font-normal">— opcional</span>
              </label>
              <textarea
                className="field resize-none text-[13px] py-2.5 leading-relaxed"
                style={{ minHeight: 72 }}
                placeholder={"Ej: Front-end en fintech, React + TypeScript"}
                value={puestoObjetivo}
                onChange={(e) => setPuestoObjetivo(e.target.value)}
                maxLength={400}
                disabled={status === "loading"}
              />
              <p className="text-[11px] text-ink-600 mt-1 leading-snug">
                La IA prioriza las habilidades y ajusta el cargo para ese rol.
              </p>
            </div>

            {errorMsg && <p className="text-[12px] text-red-400 -mt-1">{errorMsg}</p>}
          </div>

          {/* ── Card B: Desde cero ── */}
          <div className="rounded-[20px] border border-white/[0.08] p-6 flex flex-col" style={{ background: "#111111" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-[10px] bg-ink-100 grid place-items-center shrink-0">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink-600">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <div>
                <div className="text-[14px] font-bold text-ink-900">Empezar desde cero</div>
                <div className="text-[11px] text-ink-500">Completa cada sección guiado</div>
              </div>
            </div>

            <div className="flex-1 space-y-3 mb-6">
              {[
                ["Datos personales", "Nombre, cargo, contacto y ubicación"],
                ["Habilidades TIC", "Tus herramientas con nivel de dominio"],
                ["Formación", "Estudios, cursos y certificaciones"],
                ["Proyectos", "Lo que has construido con tecnología"],
                ["Experiencia", "Empleos, freelances y voluntariados"],
                ["Perfil con IA", "Tu frase generada con toda tu info"],
              ].map(([title, desc], i) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full grid place-items-center text-[10px] font-bold shrink-0 mt-0.5"
                    style={{ background: "rgba(255,255,255,0.05)", color: "#666" }}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-ink-700">{title}</div>
                    <div className="text-[11px] text-ink-500 mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onSkip}
              className="h-11 w-full rounded-[10px] border border-white/[0.10] text-[13px] font-medium text-ink-600 hover:text-ink-900 hover:border-white/20 transition-all"
            >
              Empezar desde cero →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function CrearPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load draft after hydration — never in the lazy initializer (causes SSR mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "SET", payload: JSON.parse(saved) });
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage only after the draft has been loaded
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state, hydrated]);

  const salir = () => { localStorage.removeItem(STORAGE_KEY); router.push("/"); };

  const canAdvance = () => {
    if (step === 1) return state.nombre && state.cargo && state.departamento && state.municipio && state.email;
    return true;
  };

  const publish = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/perfil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error al publicar. Intenta de nuevo."); return; }
      localStorage.removeItem(STORAGE_KEY);
      router.push(`/${data.slug}`);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 0) {
    return (
      <Step0
        onImport={(data) => { dispatch({ type: "SET", payload: data }); setStep(1); }}
        onSkip={() => setStep(1)}
      />
    );
  }

  /* Full-screen steps 3, 4, 5 */
  if (step === 3) {
    return (
      <PasoFormacion
        formaciones={state.formaciones}
        onChange={(f) => dispatch({ type: "SET", payload: { formaciones: f } })}
        onNext={() => setStep(4)}
        onBack={() => setStep(2)}
        onSalir={salir}
      />
    );
  }
  if (step === 4) {
    return (
      <PasoProyectos
        proyectos={state.proyectos}
        onChange={(p) => dispatch({ type: "SET", payload: { proyectos: p } })}
        onNext={() => setStep(5)}
        onBack={() => setStep(3)}
        onSalir={salir}
      />
    );
  }
  if (step === 5) {
    return (
      <PasoExperiencia
        experiencias={state.experiencias}
        onChange={(e) => dispatch({ type: "SET", payload: { experiencias: e } })}
        onNext={() => setStep(6)}
        onBack={() => setStep(4)}
        onSalir={salir}
      />
    );
  }

  const pct = (step / STEPS.length) * 100;
  const stepLabel = STEPS[step - 1]?.label ?? "";

  return (
    <div className="h-dvh flex font-sans text-ink-900">
      <StepSidebar current={step} onSalir={salir} />
      <div className="flex flex-col flex-1 min-w-0 bg-ink-50">
        {/* Mobile top strip */}
        <header className="md:hidden px-4 py-3 bg-ink-50 border-b border-ink-200 flex items-center justify-between shrink-0">
          <button onClick={() => step > 1 ? setStep((s) => s - 1) : router.push("/")}
            className="text-ink-700 -ml-1 h-9 w-9 grid place-items-center rounded-md">
            <Back />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-ink-500">Paso {step} de {STEPS.length}</span>
            <span className="text-[13px] font-semibold text-neon leading-tight">{stepLabel}</span>
          </div>
          <button onClick={salir} className="text-xs font-medium text-ink-500">Salir</button>
        </header>
        <div className="md:hidden h-0.5 bg-ink-100 shrink-0">
          <div className="h-full bg-neon transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className={`py-6 px-5 mx-auto w-full ${step === 1 || step === 2 ? "max-w-4xl md:px-10 md:py-8" : "max-w-lg"}`}>
            <div className="text-xs font-medium uppercase tracking-wider text-neon">Paso {step}</div>
            <h1 className="mt-1 text-[24px] leading-tight font-semibold">
              {step === 1 && "Información personal"}
              {step === 2 && "¿Qué herramientas TIC manejas?"}
              {step === 6 && "Tu perfil profesional"}
              {step === 7 && "Vista previa"}
            </h1>
            {step === 7 && <p className="mt-2 text-[14px] text-ink-600">Revisa que todo esté correcto antes de publicar tu perfil.</p>}
            <div className="mt-5">
              {step === 1 && <Step1 state={state} dispatch={dispatch} />}
              {step === 2 && <Step2 state={state} dispatch={dispatch} />}
              {step === 6 && <Step6 state={state} dispatch={dispatch} />}
              {step === 7 && <Step7 state={state} dispatch={dispatch} />}
            </div>
            {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
          </div>
        </main>

        <footer className="border-t border-ink-200 px-5 py-3 flex gap-3 items-center max-w-lg mx-auto w-full shrink-0">
          {step > 1 && (
            <button onClick={() => setStep((s) => s - 1)} className="btn-outline h-12 flex-1 gap-2">
              <Back /> Anterior
            </button>
          )}
          {step < 7 ? (
            <button onClick={() => canAdvance() && setStep((s) => s + 1)}
              className={`btn-primary h-12 flex-[1.4] gap-2 ${!canAdvance() ? "opacity-50 cursor-not-allowed" : ""}`}>
              Siguiente <Arrow />
            </button>
          ) : (
            <button onClick={publish} disabled={submitting} className="btn-primary h-12 flex-[1.4] gap-2 disabled:opacity-50">
              <Eye /> {submitting ? "Publicando..." : "Publicar perfil"}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
