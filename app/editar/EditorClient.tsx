"use client";

import { useReducer, useState } from "react";
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

type Habilidad = { nombre: string; nivel: number };

export type State = {
  nombre: string; apellido: string; cargo: string; departamento: string;
  municipio: string; email: string; telefono: string; foto: string;
  frase: string; modalidad: string; colorTema: string; cvTemplate: string;
  habilidades: Habilidad[]; formaciones: Formacion[];
  proyectos: Proyecto[]; experiencias: Experiencia[];
};

type Action = { type: "SET"; payload: Partial<State> } | { type: "RESET"; payload: State };

function reducer(state: State, action: Action): State {
  if (action.type === "RESET") return action.payload;
  return { ...state, ...action.payload };
}

/* ─── Icons ─── */
const Arrow = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
const Back  = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>;
const Check = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>;
const Sparkle = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/></svg>;
const Trash = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>;
const Save  = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;

const STEPS = [
  { n: 1, label: "Datos" }, { n: 2, label: "Habilidades" }, { n: 3, label: "Formación" },
  { n: 4, label: "Proyectos" }, { n: 5, label: "Experiencia" }, { n: 6, label: "Guardar" },
];
const LEVELS = ["Sé poco", "Básico", "Intermedio", "Avanzado", "Experto"];

/* ─── Step 1 ─── */
function Step1({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const f = (k: keyof State) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    dispatch({ type: "SET", payload: { [k]: e.target.value } });
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-ink-700 mb-1 block">Nombre *</label>
          <input className="field" value={state.nombre} onChange={f("nombre")} placeholder="Laura" />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-700 mb-1 block">Apellido</label>
          <input className="field" value={state.apellido} onChange={f("apellido")} placeholder="Mendoza" />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-ink-700 mb-1 block">Cargo / Rol *</label>
        <input className="field" value={state.cargo} onChange={f("cargo")} placeholder="Desarrolladora Front-end Junior" />
      </div>
      <LocationSelect
        departamento={state.departamento} municipio={state.municipio}
        onChange={(field, value) => dispatch({ type: "SET", payload: { [field]: value } })}
      />
      <div>
        <label className="text-xs font-medium text-ink-700 mb-1 block">Correo electrónico *</label>
        <input className="field" type="email" value={state.email} onChange={f("email")} placeholder="laura@correo.co" />
      </div>
      <div>
        <label className="text-xs font-medium text-ink-700 mb-1 block">Teléfono</label>
        <input className="field" value={state.telefono} onChange={f("telefono")} placeholder="+57 300 000 0000" />
      </div>
      <div>
        <label className="text-xs font-medium text-ink-700 mb-1 block">Frase de presentación</label>
        <textarea className="field h-24 py-2.5 resize-none" value={state.frase} onChange={f("frase")} placeholder="Cuéntanos brevemente sobre ti..." />
        <BtnGenerarFrase
          nombre={state.nombre}
          cargo={state.cargo}
          habilidades={state.habilidades.map((h) => h.nombre)}
          experiencia={state.experiencias.map((e) => e.cargo)}
          formacion={state.formaciones.map((fm) => fm.nombre)}
          onSelect={(frase) => dispatch({ type: "SET", payload: { frase } })}
        />
      </div>
      <div>
        <label className="text-xs font-medium text-ink-700 mb-1 block">Modalidad preferida</label>
        <select className="field" value={state.modalidad} onChange={f("modalidad")}>
          <option value="">Selecciona...</option>
          <option value="Remoto">Remoto</option>
          <option value="Híbrido">Híbrido</option>
          <option value="Presencial">Presencial</option>
        </select>
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
  const setLevel = (nombre: string, nivel: number) =>
    dispatch({ type: "SET", payload: { habilidades: state.habilidades.map((h) => h.nombre === nombre ? { ...h, nivel } : h) } });
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

/* ─── Step 6 ─── */
function Step6({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const name = [state.nombre, state.apellido].filter(Boolean).join(" ");
  const inits = name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
  const tema = state.colorTema || "#0f6e56";

  return (
    <div className="space-y-5">
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

      <div className="card p-4">
        <div className="text-[11px] font-medium uppercase tracking-wider text-ink-500 mb-3">Color de tu perfil</div>
        <div className="grid grid-cols-4 gap-2">
          {PALETA.map((p) => (
            <button key={p.color} onClick={() => dispatch({ type: "SET", payload: { colorTema: p.color } })}
              className="flex flex-col items-center gap-1.5">
              <span className="w-full h-9 rounded-lg transition-all" style={{
                backgroundColor: p.color,
                outline: tema === p.color ? `3px solid ${p.color}` : "3px solid transparent",
                outlineOffset: "2px",
              }} />
              <span className={`text-[10px] leading-none ${tema === p.color ? "text-ink-800 font-medium" : "text-ink-400"}`}>
                {p.nombre}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <CVTemplateSelector
          selected={(state.cvTemplate as TemplateId) || "clasica"}
          onSelect={(id) => dispatch({ type: "SET", payload: { cvTemplate: id } })}
        />
      </div>

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

/* ─── Main ─── */
export function EditorClient({ initialState, slug }: { initialState: State; slug: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canAdvance = () => {
    if (step === 1) return state.nombre && state.cargo && state.departamento && state.municipio && state.email;
    return true;
  };

  const actualizar = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/perfil", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error al guardar. Intenta de nuevo."); return; }
      router.push(`/${data.slug}`);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 3) return (
    <PasoFormacion formaciones={state.formaciones}
      onChange={(f) => dispatch({ type: "SET", payload: { formaciones: f } })}
      onNext={() => setStep(4)} onBack={() => setStep(2)} onSalir={() => router.push(`/${slug}`)} />
  );
  if (step === 4) return (
    <PasoProyectos proyectos={state.proyectos}
      onChange={(p) => dispatch({ type: "SET", payload: { proyectos: p } })}
      onNext={() => setStep(5)} onBack={() => setStep(3)} onSalir={() => router.push(`/${slug}`)} />
  );
  if (step === 5) return (
    <PasoExperiencia experiencias={state.experiencias}
      onChange={(e) => dispatch({ type: "SET", payload: { experiencias: e } })}
      onNext={() => setStep(6)} onBack={() => setStep(4)} onSalir={() => router.push(`/${slug}`)} />
  );

  const pct = (step / STEPS.length) * 100;

  return (
    <div className="h-dvh flex font-sans text-ink-900">
      <StepSidebar current={step} onSalir={() => router.push(`/${slug}`)} />
      <div className="flex flex-col flex-1 min-w-0 bg-ink-50">
        {/* Mobile top strip */}
        <header className="md:hidden px-4 py-3 bg-ink-50 border-b border-ink-200 flex items-center justify-between shrink-0">
          <button onClick={() => step > 1 ? setStep((s) => s - 1) : router.push(`/${slug}`)}
            className="text-ink-700 -ml-1 h-9 w-9 grid place-items-center rounded-md">
            <Back />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-ink-500">Paso {step} de {STEPS.length}</span>
            <span className="text-[13px] font-semibold text-neon leading-tight">{STEPS[step - 1]?.label}</span>
          </div>
          <button onClick={() => router.push(`/${slug}`)} className="text-xs font-medium text-ink-500">Cancelar</button>
        </header>
        <div className="md:hidden h-0.5 bg-ink-100 shrink-0">
          <div className="h-full bg-neon transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className={`py-6 px-5 mx-auto w-full ${step === 2 ? "max-w-4xl md:px-10 md:py-8" : "max-w-lg"}`}>
            <div className="text-xs font-medium uppercase tracking-wider text-neon">Paso {step}</div>
            <h1 className="mt-1 text-[24px] leading-tight font-semibold">
              {step === 1 && "Información personal"}
              {step === 2 && "¿Qué herramientas TIC manejas?"}
              {step === 6 && "Revisar y guardar"}
            </h1>
            {step === 6 && <p className="mt-2 text-[14px] text-ink-600">Revisa los cambios y guarda tu perfil actualizado.</p>}
            <div className="mt-5">
              {step === 1 && <Step1 state={state} dispatch={dispatch} />}
              {step === 2 && <Step2 state={state} dispatch={dispatch} />}
              {step === 6 && <Step6 state={state} dispatch={dispatch} />}
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
          {step < 6 ? (
            <button onClick={() => canAdvance() && setStep((s) => s + 1)}
              className={`btn-primary h-12 flex-[1.4] gap-2 ${!canAdvance() ? "opacity-50 cursor-not-allowed" : ""}`}>
              Siguiente <Arrow />
            </button>
          ) : (
            <button onClick={actualizar} disabled={submitting} className="btn-primary h-12 flex-[1.4] gap-2 disabled:opacity-50">
              <Save /> {submitting ? "Guardando..." : "Guardar cambios"}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
