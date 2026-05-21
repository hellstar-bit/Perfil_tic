"use client";

import { useReducer, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LocationSelect } from "@/components/form/LocationSelect";
import { HABILIDADES_TIC, CATEGORIAS } from "@/lib/habilidades";
import { PasoFormacion } from "@/components/form/steps/PasoFormacion";
import { PasoProyectos } from "@/components/form/steps/PasoProyectos";
import { PasoExperiencia } from "@/components/form/steps/PasoExperiencia";
import { PALETA } from "@/lib/paleta";
import type { Formacion, Proyecto, Experiencia } from "@/types/perfil";

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
  telefono: "", foto: "", frase: "", modalidad: "", colorTema: "#0f6e56",
  habilidades: [], formaciones: [], proyectos: [], experiencias: [],
};

const STORAGE_KEY = "perfiltic-draft";

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

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="h-7 aspect-square rounded-[7px] bg-neon grid place-items-center text-noir">
      <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19V5h7a4 4 0 0 1 0 8H5"/></svg>
    </div>
    <span className="font-semibold text-ink-900 tracking-tight text-[15px]">Perfil<span className="text-neon">TIC</span></span>
  </div>
);

const STEPS = [
  { n: 1, label: "Datos" },
  { n: 2, label: "Habilidades" },
  { n: 3, label: "Formación" },
  { n: 4, label: "Proyectos" },
  { n: 5, label: "Experiencia" },
  { n: 6, label: "Vista previa" },
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

  return (
    <div className="space-y-7">
      {/* Datos básicos */}
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

      {/* Ubicación */}
      <div>
        <SectionLabel>Ubicación</SectionLabel>
        <LocationSelect
          departamento={state.departamento}
          municipio={state.municipio}
          onChange={(field, value) => dispatch({ type: "SET", payload: { [field]: value } })}
        />
      </div>

      {/* Contacto */}
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

      {/* Presentación */}
      <div>
        <SectionLabel>Presentación</SectionLabel>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-medium text-ink-600 tracking-wide">Frase de presentación</label>
              <span className="text-[10px] font-mono text-ink-500">{state.frase.length}/280</span>
            </div>
            <textarea
              className="field h-24 py-2.5 resize-none"
              value={state.frase}
              onChange={f("frase")}
              maxLength={280}
              placeholder="Cuéntanos brevemente sobre ti y lo que buscas..."
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-ink-600 mb-1.5 block tracking-wide">Modalidad preferida</label>
            <select className="field" value={state.modalidad} onChange={f("modalidad")}>
              <option value="">Selecciona...</option>
              <option value="Remoto">Remoto</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Presencial">Presencial</option>
            </select>
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

      {state.habilidades.length > 0 && (
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-ink-500 mb-3">Tu nivel en lo seleccionado</div>
          <div className="grid grid-cols-2 gap-2">
            {state.habilidades.map((h) => (
              <div key={h.nombre} className="card p-3">
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
        </div>
      )}

      <div className="p-3.5 rounded-[10px] bg-brand-50 border border-brand-100 flex gap-3">
        <span className="text-brand-600 shrink-0 mt-0.5"><Sparkle /></span>
        <div className="text-[13px] text-brand-800 leading-snug">
          <b>Tip:</b> ser honesto con tu nivel funciona mejor. Los reclutadores valoran más quien dice <i>&quot;básico&quot;</i> con seguridad que quien exagera.
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
        <div className="text-[11px] font-medium uppercase tracking-wider text-ink-500 mb-3">Color de tu CV</div>
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

/* ─── Main Page ─── */
export default function CrearPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
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
    <div className="min-h-dvh bg-ink-50 font-sans text-ink-900 flex flex-col">
      <header className="px-5 pt-5 pb-3 bg-ink-50 border-b border-ink-200">
        <div className="flex items-center justify-between">
          <button onClick={() => step > 1 ? setStep((s) => s - 1) : router.push("/")}
            className="text-ink-700 -ml-1 h-9 w-9 grid place-items-center rounded-md hover:bg-ink-50">
            <Back />
          </button>
          <Logo />
          <button onClick={salir} className="text-xs font-medium text-ink-500">Salir</button>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-medium text-ink-500 mb-2">
            <span>Paso {step} de {STEPS.length}</span>
            <span className="text-neon">{stepLabel}</span>
          </div>
          <div className="h-1.5 w-full bg-ink-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-6 gap-1">
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col items-center gap-1">
                <div className={`h-7 w-7 rounded-full grid place-items-center text-[11px] font-semibold
                  ${s.n < step ? "bg-neon text-noir" :
                    s.n === step ? "bg-brand-50 text-neon ring-2 ring-neon" :
                    "bg-ink-100 text-ink-400"}`}>
                  {s.n < step ? <Check /> : s.n}
                </div>
                <div className={`text-[9px] leading-none truncate w-full text-center ${s.n === step ? "text-neon font-medium" : "text-ink-400"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto py-6 px-5 max-w-lg mx-auto w-full">
        <div className="text-xs font-medium uppercase tracking-wider text-neon">Paso {step}</div>
        <h1 className="mt-1 text-[24px] leading-tight font-semibold">
          {step === 1 && "Información personal"}
          {step === 2 && "¿Qué herramientas TIC manejas?"}
          {step === 6 && "Vista previa"}
        </h1>
        {step === 6 && <p className="mt-2 text-[14px] text-ink-600">Revisa que todo esté correcto antes de publicar tu perfil.</p>}
        <div className="mt-5">
          {step === 1 && <Step1 state={state} dispatch={dispatch} />}
          {step === 2 && <Step2 state={state} dispatch={dispatch} />}
          {step === 6 && <Step6 state={state} dispatch={dispatch} />}
        </div>
        {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
      </main>

      <footer className="bg-ink-50 border-t border-ink-200 px-5 py-3 flex gap-3 items-center max-w-lg mx-auto w-full">
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
          <button onClick={publish} disabled={submitting} className="btn-primary h-12 flex-[1.4] gap-2 disabled:opacity-50">
            <Eye /> {submitting ? "Publicando..." : "Publicar perfil"}
          </button>
        )}
      </footer>
    </div>
  );
}
