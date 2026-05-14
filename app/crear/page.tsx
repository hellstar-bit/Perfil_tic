"use client";

import { useReducer, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ─── Types ─── */
type Habilidad = { nombre: string; nivel: number };
type Proyecto = { titulo: string; descripcion: string; tag: string; enlace: string };
type Formacion = { titulo: string; institucion: string; periodo: string; descripcion: string; urlCert: string };
type Experiencia = { cargo: string; empresa: string; periodo: string; descripcion: string; tipo: string };

type State = {
  nombre: string;
  apellido: string;
  cargo: string;
  region: string;
  email: string;
  telefono: string;
  foto: string;
  frase: string;
  modalidad: string;
  habilidades: Habilidad[];
  proyectos: Proyecto[];
  formacion: Formacion[];
  experiencia: Experiencia[];
};

type Action =
  | { type: "SET"; payload: Partial<State> }
  | { type: "RESET" };

const INITIAL: State = {
  nombre: "", apellido: "", cargo: "", region: "", email: "",
  telefono: "", foto: "", frase: "", modalidad: "",
  habilidades: [], proyectos: [], formacion: [], experiencia: [],
};

const STORAGE_KEY = "perfiltic-draft";

function reducer(state: State, action: Action): State {
  if (action.type === "RESET") return INITIAL;
  return { ...state, ...action.payload };
}

/* ─── Icon set (inline svg) ─── */
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
    <div className="h-7 aspect-square rounded-[7px] bg-brand-600 grid place-items-center text-white font-semibold">
      <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19V5h7a4 4 0 0 1 0 8H5"/></svg>
    </div>
    <span className="font-semibold text-ink-900 tracking-tight text-[15px]">Perfil<span className="text-brand-600">TIC</span></span>
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
const SUGGESTED = ["HTML", "CSS", "JavaScript", "React", "Python", "SQL", "Excel", "Figma", "Canva", "Git", "WordPress", "Office 365"];
const REGIONS = ["Bogotá D.C.", "Antioquia", "Valle del Cauca", "Atlántico", "Santander", "Cundinamarca", "Bolívar", "Nariño", "Córdoba", "Tolima", "Otra"];
const TIPO_EXP = [
  { v: "formal", l: "Empleo formal" },
  { v: "informal", l: "Trabajo informal" },
  { v: "voluntariado", l: "Voluntariado" },
  { v: "practica", l: "Práctica / pasantía" },
];

/* ─── Step components ─── */
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
      <div>
        <label className="text-xs font-medium text-ink-700 mb-1 block">Región *</label>
        <select className="field" value={state.region} onChange={f("region")}>
          <option value="">Selecciona...</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
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
        <textarea className="field h-24 py-2.5 resize-none" value={state.frase} onChange={f("frase")} placeholder="Cuéntanos brevemente sobre ti y lo que buscas..." />
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

function Step2({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const [search, setSearch] = useState("");
  const selected = new Set(state.habilidades.map(h => h.nombre));

  const toggle = (nombre: string) => {
    if (selected.has(nombre)) {
      dispatch({ type: "SET", payload: { habilidades: state.habilidades.filter(h => h.nombre !== nombre) } });
    } else {
      dispatch({ type: "SET", payload: { habilidades: [...state.habilidades, { nombre, nivel: 3 }] } });
    }
  };

  const setLevel = (nombre: string, nivel: number) => {
    dispatch({ type: "SET", payload: { habilidades: state.habilidades.map(h => h.nombre === nombre ? { ...h, nivel } : h) } });
  };

  const addCustom = () => {
    const v = search.trim();
    if (!v || selected.has(v)) return;
    dispatch({ type: "SET", payload: { habilidades: [...state.habilidades, { nombre: v, nivel: 3 }] } });
    setSearch("");
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <input className="field pr-20" value={search} onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addCustom()}
          placeholder="Buscar o agregar (ej: Python, Canva...)" />
        <button onClick={addCustom} className="absolute right-1.5 top-1.5 h-8 px-3 rounded-[6px] bg-brand-600 text-white text-xs font-medium">Agregar</button>
      </div>

      <div>
        <div className="text-[11px] font-medium uppercase tracking-wider text-ink-500 mb-2">Sugerencias frecuentes</div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.filter(s => !search || s.toLowerCase().includes(search.toLowerCase())).map(t => (
            <button key={t} onClick={() => toggle(t)}
              className={`h-9 px-3.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5 border transition-colors ${
                selected.has(t) ? "bg-brand-600 text-white border-brand-600" : "bg-white text-ink-700 border-ink-200 hover:border-ink-300"
              }`}>
              {selected.has(t) && <Check />} {t}
            </button>
          ))}
        </div>
      </div>

      {state.habilidades.length > 0 && (
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-ink-500 mb-3">Tu nivel en lo seleccionado</div>
          <div className="space-y-3">
            {state.habilidades.map(h => (
              <div key={h.nombre} className="card p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">{h.nombre}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-[11px] text-ink-500">{LEVELS[h.nivel - 1]}</div>
                    <button onClick={() => toggle(h.nombre)} className="text-ink-400 hover:text-red-500"><Trash /></button>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <button key={i} onClick={() => setLevel(h.nombre, i)}
                      className={`flex-1 h-2 rounded-full transition-colors ${i <= h.nivel ? "bg-brand-500" : "bg-ink-100"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-3.5 rounded-[10px] bg-brand-50 border border-brand-100 flex gap-3">
        <span className="text-brand-600 shrink-0 mt-0.5"><Sparkle /></span>
        <div className="text-[13px] text-brand-800 leading-snug">
          <b>Tip:</b> ser honesto con tu nivel funciona mejor. Los reclutadores valoran más quien dice <i>"básico"</i> con seguridad que quien exagera.
        </div>
      </div>
    </div>
  );
}

function Step3({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const add = () => dispatch({ type: "SET", payload: { formacion: [...state.formacion, { titulo: "", institucion: "", periodo: "", descripcion: "", urlCert: "" }] } });
  const remove = (i: number) => dispatch({ type: "SET", payload: { formacion: state.formacion.filter((_, idx) => idx !== i) } });
  const update = (i: number, k: keyof Formacion, v: string) => {
    const next = state.formacion.map((f, idx) => idx === i ? { ...f, [k]: v } : f);
    dispatch({ type: "SET", payload: { formacion: next } });
  };
  return (
    <div className="space-y-4">
      {state.formacion.map((f, i) => (
        <div key={i} className="card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-ink-700">Formación {i + 1}</div>
            <button onClick={() => remove(i)} className="text-ink-400 hover:text-red-500"><Trash /></button>
          </div>
          <input className="field" value={f.titulo} onChange={e => update(i, "titulo", e.target.value)} placeholder="Nombre del programa o carrera" />
          <input className="field" value={f.institucion} onChange={e => update(i, "institucion", e.target.value)} placeholder="Institución (ej: SENA, Universidad...)" />
          <input className="field" value={f.periodo} onChange={e => update(i, "periodo", e.target.value)} placeholder="Período (ej: 2023 — 2024)" />
          <textarea className="field h-20 py-2 resize-none" value={f.descripcion} onChange={e => update(i, "descripcion", e.target.value)} placeholder="Descripción breve (opcional)" />
          <input className="field" value={f.urlCert} onChange={e => update(i, "urlCert", e.target.value)} placeholder="URL certificado (opcional)" />
        </div>
      ))}
      <button onClick={add} className="btn-outline w-full gap-2"><Plus /> Agregar formación</button>
    </div>
  );
}

function Step4({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const add = () => {
    if (state.proyectos.length >= 6) return;
    dispatch({ type: "SET", payload: { proyectos: [...state.proyectos, { titulo: "", descripcion: "", tag: "", enlace: "" }] } });
  };
  const remove = (i: number) => dispatch({ type: "SET", payload: { proyectos: state.proyectos.filter((_, idx) => idx !== i) } });
  const update = (i: number, k: keyof Proyecto, v: string) => {
    const next = state.proyectos.map((p, idx) => idx === i ? { ...p, [k]: v } : p);
    dispatch({ type: "SET", payload: { proyectos: next } });
  };
  return (
    <div className="space-y-4">
      {state.proyectos.map((p, i) => (
        <div key={i} className="card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-ink-700">Proyecto {i + 1}</div>
            <button onClick={() => remove(i)} className="text-ink-400 hover:text-red-500"><Trash /></button>
          </div>
          <input className="field" value={p.titulo} onChange={e => update(i, "titulo", e.target.value)} placeholder="Nombre del proyecto" />
          <textarea className="field h-20 py-2 resize-none" value={p.descripcion} onChange={e => update(i, "descripcion", e.target.value)} placeholder="Descripción breve" />
          <input className="field" value={p.tag} onChange={e => update(i, "tag", e.target.value)} placeholder="Tecnología / tag (ej: React)" />
          <input className="field" value={p.enlace} onChange={e => update(i, "enlace", e.target.value)} placeholder="Enlace (opcional)" />
        </div>
      ))}
      {state.proyectos.length < 6 && (
        <button onClick={add} className="btn-outline w-full gap-2"><Plus /> Agregar proyecto</button>
      )}
      {state.proyectos.length >= 6 && (
        <p className="text-xs text-ink-500 text-center">Máximo 6 proyectos</p>
      )}
    </div>
  );
}

function Step5({ state, dispatch }: { state: State; dispatch: React.Dispatch<Action> }) {
  const add = () => dispatch({ type: "SET", payload: { experiencia: [...state.experiencia, { cargo: "", empresa: "", periodo: "", descripcion: "", tipo: "formal" }] } });
  const remove = (i: number) => dispatch({ type: "SET", payload: { experiencia: state.experiencia.filter((_, idx) => idx !== i) } });
  const update = (i: number, k: keyof Experiencia, v: string) => {
    const next = state.experiencia.map((e, idx) => idx === i ? { ...e, [k]: v } : e);
    dispatch({ type: "SET", payload: { experiencia: next } });
  };
  return (
    <div className="space-y-4">
      {state.experiencia.map((e, i) => (
        <div key={i} className="card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-ink-700">Experiencia {i + 1}</div>
            <button onClick={() => remove(i)} className="text-ink-400 hover:text-red-500"><Trash /></button>
          </div>
          <select className="field" value={e.tipo} onChange={ev => update(i, "tipo", ev.target.value)}>
            {TIPO_EXP.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
          </select>
          <input className="field" value={e.cargo} onChange={ev => update(i, "cargo", ev.target.value)} placeholder="Cargo o rol" />
          <input className="field" value={e.empresa} onChange={ev => update(i, "empresa", ev.target.value)} placeholder="Empresa / organización" />
          <input className="field" value={e.periodo} onChange={ev => update(i, "periodo", ev.target.value)} placeholder="Período (ej: 2024 — Actual)" />
          <textarea className="field h-20 py-2 resize-none" value={e.descripcion} onChange={ev => update(i, "descripcion", ev.target.value)} placeholder="Descripción de funciones" />
        </div>
      ))}
      <button onClick={add} className="btn-outline w-full gap-2"><Plus /> Agregar experiencia</button>
      <div className="p-3.5 rounded-[10px] bg-brand-50 border border-brand-100 flex gap-3">
        <span className="text-brand-600 shrink-0 mt-0.5"><Sparkle /></span>
        <div className="text-[13px] text-brand-800 leading-snug">
          Incluye trabajos informales, voluntariados y prácticas. Todo cuenta.
        </div>
      </div>
    </div>
  );
}

function Step6({ state }: { state: State }) {
  const name = [state.nombre, state.apellido].filter(Boolean).join(" ");
  const inits = name.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("");
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-14 w-14 rounded-full bg-brand-100 grid place-items-center text-brand-700 font-semibold text-lg">{inits || "?"}</div>
          <div>
            <div className="font-semibold text-base">{name || "—"}</div>
            <div className="text-sm text-ink-500">{state.cargo || "—"}</div>
            <div className="text-xs text-ink-400">{state.region} · {state.email}</div>
          </div>
        </div>
        {state.frase && <p className="text-sm text-ink-700 leading-relaxed border-t border-ink-100 pt-3">{state.frase}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="card p-3">
          <div className="text-[10px] uppercase tracking-wider text-brand-700 font-medium mb-1">Habilidades</div>
          <div className="text-ink-900 font-semibold">{state.habilidades.length}</div>
        </div>
        <div className="card p-3">
          <div className="text-[10px] uppercase tracking-wider text-brand-700 font-medium mb-1">Proyectos</div>
          <div className="text-ink-900 font-semibold">{state.proyectos.length}</div>
        </div>
        <div className="card p-3">
          <div className="text-[10px] uppercase tracking-wider text-brand-700 font-medium mb-1">Formación</div>
          <div className="text-ink-900 font-semibold">{state.formacion.length}</div>
        </div>
        <div className="card p-3">
          <div className="text-[10px] uppercase tracking-wider text-brand-700 font-medium mb-1">Experiencia</div>
          <div className="text-ink-900 font-semibold">{state.experiencia.length}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function CrearPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, INITIAL, () => {
    if (typeof window === "undefined") return INITIAL;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...INITIAL, ...JSON.parse(saved) } : INITIAL;
    } catch {
      return INITIAL;
    }
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const pct = (step / STEPS.length) * 100;

  const canAdvance = () => {
    if (step === 1) return state.nombre && state.cargo && state.region && state.email;
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
      if (!res.ok) {
        setError(data.error ?? "Error al publicar. Intenta de nuevo.");
        return;
      }
      localStorage.removeItem(STORAGE_KEY);
      router.push(`/${data.slug}`);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabel = STEPS[step - 1]?.label ?? "";

  return (
    <div className="min-h-dvh bg-ink-50 font-sans text-ink-900 flex flex-col">
      {/* Top bar */}
      <header className="px-5 pt-5 pb-3 bg-white border-b border-ink-100">
        <div className="flex items-center justify-between">
          <button onClick={() => step > 1 ? setStep(s => s - 1) : router.push("/")}
            className="text-ink-700 -ml-1 h-9 w-9 grid place-items-center rounded-md hover:bg-ink-50">
            <Back />
          </button>
          <Logo />
          <button onClick={() => { localStorage.removeItem(STORAGE_KEY); router.push("/"); }}
            className="text-xs font-medium text-ink-500">Salir</button>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-medium text-ink-500 mb-2">
            <span>Paso {step} de {STEPS.length}</span>
            <span className="text-brand-700">{stepLabel}</span>
          </div>
          <div className="h-1.5 w-full bg-ink-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-6 gap-1">
            {STEPS.map(s => (
              <div key={s.n} className="flex flex-col items-center gap-1">
                <div className={`h-7 w-7 rounded-full grid place-items-center text-[11px] font-semibold
                  ${s.n < step ? "bg-brand-600 text-white" :
                    s.n === step ? "bg-brand-50 text-brand-700 ring-2 ring-brand-500" :
                    "bg-ink-100 text-ink-400"}`}>
                  {s.n < step ? <Check /> : s.n}
                </div>
                <div className={`text-[9px] leading-none truncate w-full text-center ${s.n === step ? "text-brand-700 font-medium" : "text-ink-400"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 overflow-y-auto px-5 py-6 max-w-lg mx-auto w-full">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">Paso {step}</div>
        <h1 className="mt-1 text-[24px] leading-tight font-semibold">
          {step === 1 && "Información personal"}
          {step === 2 && "¿Qué herramientas TIC manejas?"}
          {step === 3 && "Formación y certificados"}
          {step === 4 && "Tus proyectos"}
          {step === 5 && "Experiencia laboral"}
          {step === 6 && "Vista previa"}
        </h1>
        {step === 6 && (
          <p className="mt-2 text-[14px] text-ink-600">Revisa que todo esté correcto antes de publicar tu perfil.</p>
        )}
        <div className="mt-5">
          {step === 1 && <Step1 state={state} dispatch={dispatch} />}
          {step === 2 && <Step2 state={state} dispatch={dispatch} />}
          {step === 3 && <Step3 state={state} dispatch={dispatch} />}
          {step === 4 && <Step4 state={state} dispatch={dispatch} />}
          {step === 5 && <Step5 state={state} dispatch={dispatch} />}
          {step === 6 && <Step6 state={state} />}
        </div>
        {error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-ink-100 px-5 py-3 flex gap-3 items-center max-w-lg mx-auto w-full">
        {step > 1 && (
          <button onClick={() => setStep(s => s - 1)} className="btn-outline h-12 flex-1 gap-2">
            <Back /> Anterior
          </button>
        )}
        {step < 6 ? (
          <button onClick={() => canAdvance() && setStep(s => s + 1)}
            className={`btn-primary h-12 flex-[1.4] gap-2 ${!canAdvance() ? "opacity-50 cursor-not-allowed" : ""}`}>
            Siguiente <Arrow />
          </button>
        ) : (
          <button onClick={publish} disabled={submitting}
            className="btn-primary h-12 flex-[1.4] gap-2 disabled:opacity-50">
            <Eye /> {submitting ? "Publicando..." : "Publicar perfil"}
          </button>
        )}
      </footer>
    </div>
  );
}
