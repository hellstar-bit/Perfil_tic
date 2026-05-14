/* eslint-disable */
/* PerfilTIC — Pasos 3, 4 y 5 del formulario multi-paso
   - Paso 3: Formación y certificados
   - Paso 4: Proyectos
   - Paso 5: Experiencia laboral
   Cada componente acepta `state` ("empty" | "list-new" | "list-edit") + `mobile`. */

const { useState: _useStateFS } = React;

/* ============================================================
   Iconos (stroke 1.75)
   ============================================================ */
const FSIcon = {
  Back: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>),
  Arrow: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  Check: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>),
  Plus: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>),
  Edit: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>),
  Trash: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/></svg>),
  X: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>),
  Chevron: (p) => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6"/></svg>),
  Link: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/></svg>),
  Upload: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 16V4M12 4l-4 4M12 4l4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>),
  Sparkle: (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/></svg>),
  Search: (p) => (<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>),
  /* Step icons (grandes, brand-300 cuando van en estado vacío) */
  Diploma: (p) => (<svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M8 16h48v22H8z"/><path d="M14 16v22M50 16v22"/><path d="M22 44h20l-2 12-8-4-8 4z"/><circle cx="32" cy="27" r="3.5"/><path d="M28.5 27h7"/>
  </svg>),
  Folder: (p) => (<svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M8 18a4 4 0 0 1 4-4h12l4 4h24a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z"/><path d="M20 30l-4 4 4 4M28 30l4 4-4 4M22 38l4-8"/>
  </svg>),
  Briefcase: (p) => (<svg viewBox="0 0 64 64" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="8" y="20" width="48" height="32" rx="3"/><path d="M24 20v-4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4M8 34h48"/><circle cx="32" cy="34" r="2"/>
  </svg>),
  /* Tarjeta saved */
  CapSmall: (p) => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 9l9-4 9 4-9 4-9-4z"/><path d="M7 11v5c0 1 2.5 2.5 5 2.5s5-1.5 5-2.5v-5"/></svg>),
};

/* ============================================================
   Top bar de progreso (compartido por los tres pasos)
   ============================================================ */
const FS_STEPS = [
  { n: 1, label: "Datos" },
  { n: 2, label: "Habilidades" },
  { n: 3, label: "Formación" },
  { n: 4, label: "Proyectos" },
  { n: 5, label: "Experiencia" },
  { n: 6, label: "Vista previa" },
];

function FSTopBar({ current, label, mobile }) {
  const pct = (current / FS_STEPS.length) * 100;
  return (
    <header className="bg-white border-b border-ink-100">
      <div className={`${mobile ? "px-5" : "px-10"} ${mobile ? "pt-5 pb-3" : "pt-5 pb-4"}`}>
        <div className="flex items-center justify-between">
          <button className="text-ink-700 -ml-1 h-9 w-9 grid place-items-center rounded-md hover:bg-ink-50">
            <FSIcon.Back />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-7 aspect-square rounded-[7px] bg-brand-600 grid place-items-center text-white">
              <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19V5h7a4 4 0 0 1 0 8H5"/></svg>
            </div>
            <span className="font-semibold text-ink-900 tracking-tight text-[15px]">
              Perfil<span className="text-brand-600">TIC</span>
            </span>
          </div>
          <button className="text-xs font-medium text-ink-500">Guardar y salir</button>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-medium text-ink-500 mb-2">
            <span>Paso {current} de {FS_STEPS.length}</span>
            <span className="text-brand-700">{label}</span>
          </div>
          <div className="h-1.5 w-full bg-ink-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all" style={{width: `${pct}%`}}/>
          </div>
          <div className={`mt-3 grid gap-1 ${mobile ? "grid-cols-6" : "grid-cols-6 max-w-2xl mx-auto"}`}>
            {FS_STEPS.map(s=>(
              <div key={s.n} className="flex flex-col items-center gap-1">
                <div className={`h-7 w-7 rounded-full grid place-items-center text-[11px] font-semibold transition-colors
                  ${s.n < current ? "bg-brand-600 text-white" :
                    s.n === current ? "bg-brand-50 text-brand-700 ring-2 ring-brand-500" :
                    "bg-ink-100 text-ink-400"}`}>
                  {s.n < current ? <FSIcon.Check/> : s.n}
                </div>
                <div className={`text-[9px] leading-none truncate w-full text-center ${s.n === current ? "text-brand-700 font-medium" : "text-ink-400"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   Botonera inferior (Anterior / Siguiente)
   ============================================================ */
function FSFooter({ mobile, nextLabel = "Siguiente" }) {
  return (
    <footer className={`bg-white border-t border-ink-100 ${mobile ? "px-5 py-3" : "px-10 py-4"} flex items-center gap-3`}>
      <button className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-[8px] border border-ink-200 text-ink-700 font-medium text-sm hover:bg-ink-50 flex-1 md:flex-initial md:min-w-[140px]">
        <FSIcon.Back/> Anterior
      </button>
      {!mobile && <div className="flex-1 text-xs text-ink-400 text-center">Tus cambios se guardan automáticamente</div>}
      <button className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[8px] bg-brand-600 text-white font-medium text-sm hover:bg-brand-700 flex-[1.4] md:flex-initial md:min-w-[180px]">
        {nextLabel} <FSIcon.Arrow/>
      </button>
    </footer>
  );
}

/* ============================================================
   Building blocks compartidos
   ============================================================ */
const Label = ({ children, optional, hint }) => (
  <label className="flex items-center justify-between mb-1.5">
    <span className="text-[12px] font-medium text-ink-700">{children}{!optional && <span className="text-brand-600 ml-0.5">*</span>}</span>
    {optional && <span className="text-[10px] text-ink-400">Opcional</span>}
    {hint && <span className="text-[10px] text-ink-400">{hint}</span>}
  </label>
);

const FormHeader = ({ mode, newTitle, editTitle, onCancel }) => (
  <div className="flex items-center justify-between mb-5">
    <div>
      <div className={`text-[10px] font-medium uppercase tracking-wider ${mode === "edit" ? "text-brand-500" : "text-brand-700"}`}>
        {mode === "edit" ? "Editando" : "Nuevo registro"}
      </div>
      <h2 className="mt-0.5 text-[20px] font-semibold leading-tight">
        {mode === "edit" ? editTitle : newTitle}
      </h2>
    </div>
    {mode === "edit" && (
      <button className="h-8 px-2.5 rounded-md text-xs font-medium text-ink-600 hover:bg-ink-50 inline-flex items-center gap-1">
        <FSIcon.X/> Cancelar
      </button>
    )}
  </div>
);

const EmptyState = ({ icon, title, subtitle }) => (
  <div className="h-full flex flex-col items-center justify-center text-center px-8 py-16 rounded-[12px] border-2 border-dashed border-ink-200 bg-ink-50/50">
    <div className="text-brand-300">{icon}</div>
    <div className="mt-4 font-medium text-ink-700 text-[15px]">{title}</div>
    {subtitle && <div className="mt-1.5 text-[12px] text-ink-500 max-w-xs leading-relaxed">{subtitle}</div>}
  </div>
);

const SavedCardChrome = ({ active, children }) => (
  <article className={`group relative rounded-[12px] border transition-all overflow-hidden
    ${active
      ? "border-brand-500 bg-brand-50 shadow-[0_0_0_3px_rgba(29,158,117,0.12)]"
      : "border-ink-200 bg-white hover:border-brand-400"}`}>
    {children}
    <div className={`absolute top-3 right-3 flex gap-1 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>
      <button className="h-7 w-7 rounded-md bg-white border border-ink-200 grid place-items-center text-ink-600 hover:text-brand-700 hover:border-brand-300">
        <FSIcon.Edit/>
      </button>
      <button className="h-7 w-7 rounded-md bg-white border border-ink-200 grid place-items-center text-ink-600 hover:text-[#c25450] hover:border-[#e0a8a6]">
        <FSIcon.Trash/>
      </button>
    </div>
    {active && (
      <div className="absolute top-3 left-3 chip">Editando</div>
    )}
  </article>
);

/* ============================================================
   PASO 3 — FORMACIÓN Y CERTIFICADOS
   ============================================================ */
const FORMACIONES_MOCK = [
  {
    id: "f1",
    nombre: "Tecnólogo en Análisis y Desarrollo de Software",
    institucion: "SENA — Centro de Servicios Financieros",
    nivel: "Tecnólogo",
    inicio: "2022", fin: "2024",
    cert: "https://certificados.sena.edu.co/laura-mendoza",
  },
  {
    id: "f2",
    nombre: "Bootcamp Front-end Junior",
    institucion: "Talento Tech — MinTIC",
    nivel: "Bootcamp",
    inicio: "2025", fin: "Actualidad",
    cert: null,
  },
];

const INSTITUCIONES_SUG = ["SENA", "Universidad Nacional de Colombia", "Universidad Distrital", "Politécnico Grancolombiano", "Talento Tech — MinTIC", "Platzi", "Coursera", "Google", "AWS Skill Builder"];
const NIVELES = ["Bachillerato","Técnico","Tecnólogo","Universitario","Especialización","Maestría","Doctorado","Curso","Certificación","Bootcamp","Diplomado"];

function FormacionCard({ f, active }) {
  return (
    <SavedCardChrome active={active}>
      <div className="p-4 pr-24 flex gap-3.5">
        <div className={`h-12 w-12 shrink-0 rounded-[10px] grid place-items-center
          ${active ? "bg-white text-brand-600 border border-brand-200" : "bg-brand-50 text-brand-700"}`}>
          <FSIcon.CapSmall/>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-[14px] leading-tight text-ink-900">{f.nombre}</div>
          <div className="text-[12px] text-ink-600 mt-0.5 truncate">{f.institucion} · {f.nivel}</div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-ink-50 border border-ink-200 text-ink-600">
              {f.inicio} — {f.fin}
            </span>
            {f.cert && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 font-medium inline-flex items-center gap-1 border border-brand-100">
                <FSIcon.Link/> Ver certificado
              </span>
            )}
          </div>
        </div>
      </div>
    </SavedCardChrome>
  );
}

function FormacionForm({ mode = "new" }) {
  const editing = mode === "edit";
  return (
    <>
      <FormHeader
        mode={mode}
        newTitle="Nueva formación o certificado"
        editTitle="Bootcamp Front-end Junior"
      />

      <div className="space-y-4">
        <div>
          <Label>Nombre del programa o carrera</Label>
          <input className="field" defaultValue={editing ? "Bootcamp Front-end Junior" : ""} placeholder="Ej: Tecnólogo en Desarrollo de Software"/>
        </div>

        {/* Institución con autocomplete */}
        <div>
          <Label>Institución</Label>
          <div className="relative">
            <input className="field pr-9" defaultValue={editing ? "Talento Tech — MinTIC" : "SENA"} placeholder="Empieza a escribir..."/>
            <FSIcon.Search className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400"/>
            {!editing && (
              <div className="absolute top-12 left-0 right-0 bg-white border border-ink-200 rounded-[8px] shadow-lg z-10 overflow-hidden">
                <div className="px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-ink-500 bg-ink-50">Sugerencias</div>
                {INSTITUCIONES_SUG.slice(0,5).map((i,idx)=>(
                  <button key={i} className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between ${idx===0 ? "bg-brand-50 text-brand-700" : "hover:bg-ink-50"}`}>
                    <span>{i}</span>
                    {idx===0 && <span className="text-[10px] text-ink-400">↵</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label>Nivel de estudio</Label>
          <div className="relative">
            <select className="field appearance-none pr-9" defaultValue={editing ? "Bootcamp" : "Tecnólogo"}>
              {NIVELES.map(n=> <option key={n}>{n}</option>)}
            </select>
            <FSIcon.Chevron className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"/>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Año inicio</Label>
            <div className="relative">
              <select className="field appearance-none pr-9" defaultValue={editing ? "2025" : "2022"}>
                {Array.from({length:36},(_,i)=>2026-i).map(y => <option key={y}>{y}</option>)}
              </select>
              <FSIcon.Chevron className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"/>
            </div>
          </div>
          <div>
            <Label>Año fin</Label>
            <div className="relative">
              <select className="field appearance-none pr-9" defaultValue={editing ? "Actualidad" : "2024"}>
                <option>Actualidad</option>
                {Array.from({length:36},(_,i)=>2026-i).map(y => <option key={y}>{y}</option>)}
              </select>
              <FSIcon.Chevron className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"/>
            </div>
          </div>
        </div>

        <div>
          <Label optional>URL del certificado</Label>
          <input className="field" placeholder="https://..." defaultValue={editing ? "" : ""}/>
          <div className="mt-1.5 text-[11px] text-ink-500">Si tienes link al diploma o certificación digital, agrégalo y aparecerá un botón en tu perfil.</div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-ink-100 flex items-center gap-2.5">
        <button className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-brand-600 text-white font-medium text-sm hover:bg-brand-700">
          {editing ? <><FSIcon.Check/> Guardar cambios</> : <><FSIcon.Plus/> Agregar formación</>}
        </button>
        {!editing && <button className="text-sm text-ink-500 hover:text-ink-700">Limpiar</button>}
      </div>
    </>
  );
}

function Step3Formacion({ state = "list-new", mobile = false }) {
  const items = state === "empty" ? [] : FORMACIONES_MOCK;
  const editingId = state === "list-edit" ? "f2" : null;
  const mode = state === "list-edit" ? "edit" : "new";

  return (
    <div className="h-full w-full bg-ink-50 font-sans text-ink-900 flex flex-col">
      <FSTopBar current={3} label="Formación y certificados" mobile={mobile}/>

      <main className={`flex-1 overflow-y-auto ${mobile ? "px-5 py-5" : "px-10 py-8"}`}>
        <div className={`${mobile ? "" : "max-w-[1200px] mx-auto grid grid-cols-[minmax(0,_45fr)_minmax(0,_55fr)] gap-8 items-start"}`}>

          {/* Mobile: lista primero */}
          {mobile && items.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-medium uppercase tracking-wider text-ink-500">Tus formaciones ({items.length})</h3>
              </div>
              <div className="space-y-2.5">
                {items.slice(0,1).map(f => <FormacionCard key={f.id} f={f} active={f.id === editingId}/>)}
              </div>
            </div>
          )}

          {/* FORM (izquierda en desktop) */}
          <div className={`card ${mobile ? "p-5" : "p-7"} ${mobile ? "" : "sticky top-6"}`}>
            <FormacionForm mode={mode}/>
          </div>

          {/* LISTA (derecha en desktop) */}
          {!mobile && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[11px] font-medium uppercase tracking-wider text-brand-700">Tus formaciones</h3>
                  <div className="mt-0.5 text-[12px] text-ink-500">{items.length} de 6 — puedes agregar hasta 6</div>
                </div>
              </div>
              {items.length === 0 ? (
                <EmptyState
                  icon={<FSIcon.Diploma/>}
                  title="Tus formaciones aparecerán aquí"
                  subtitle="Empieza por la más reciente. Cursos, bootcamps y certificaciones también cuentan."
                />
              ) : (
                <div className="space-y-3">
                  {items.map(f => <FormacionCard key={f.id} f={f} active={f.id === editingId}/>)}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <FSFooter mobile={mobile}/>
    </div>
  );
}

/* ============================================================
   PASO 4 — PROYECTOS
   ============================================================ */
const PROYECTOS_MOCK = [
  {
    id: "p1",
    nombre: "Tienda de café El Tolima",
    tipo: "Académico",
    descripcion: "Sitio web responsive para venta de café especial de origen tolimense. Diseñé el carrito de compras y la página de producto.",
    tecnologias: ["HTML","CSS","JavaScript","Figma"],
    url: "https://tienda-tolima.vercel.app",
    color: "#d2ede2", iniciales: "TT",
  },
  {
    id: "p2",
    nombre: "Inventario panadería La Espiga",
    tipo: "Freelance",
    descripcion: "Sistema básico de inventario y control de ventas diarias para una panadería del barrio.",
    tecnologias: ["React","Firebase","Tailwind","Vercel","Git"],
    url: null,
    color: "#fcebd5", iniciales: "LE",
  },
];

const TIPOS_PROY = ["Académico","Personal","Freelance","Voluntariado","Laboral","Otro"];
const TECS_DISPONIBLES = ["HTML","CSS","JavaScript","React","Python","SQL","Figma","Tailwind","Git","Firebase","Wordpress","Canva"];

function ProyectoCard({ p, active }) {
  return (
    <SavedCardChrome active={active}>
      {/* imagen / placeholder */}
      <div className="relative h-32 w-full" style={{background:`repeating-linear-gradient(135deg, ${p.color} 0 8px, transparent 8px 16px), ${p.color}`}}>
        <div className="absolute inset-0 grid place-items-center">
          <div className="font-mono font-semibold text-2xl text-ink-700/40">{p.iniciales}</div>
        </div>
        <div className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-medium text-ink-700 border border-ink-200">
          {p.tipo}
        </div>
      </div>
      <div className="p-4">
        <div className="font-semibold text-[14px] leading-tight text-ink-900">{p.nombre}</div>
        <div className="text-[12px] text-ink-600 mt-1 leading-snug line-clamp-2">{p.descripcion}</div>
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          {p.tecnologias.slice(0,3).map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-ink-50 border border-ink-200 text-ink-700">{t}</span>
          ))}
          {p.tecnologias.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-md text-ink-500">+{p.tecnologias.length-3} más</span>
          )}
          {p.url && (
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 font-medium inline-flex items-center gap-1 border border-brand-100">
              <FSIcon.Link/> Ver proyecto
            </span>
          )}
        </div>
      </div>
    </SavedCardChrome>
  );
}

function ProyectoForm({ mode = "new" }) {
  const editing = mode === "edit";
  const desc = editing
    ? "Sistema básico de inventario y control de ventas diarias para una panadería del barrio."
    : "";
  const charCount = desc.length;
  const selectedTecs = editing ? ["React","Firebase","Tailwind"] : ["HTML","JavaScript"];

  return (
    <>
      <FormHeader mode={mode}
        newTitle="Nuevo proyecto"
        editTitle="Inventario panadería La Espiga"/>

      <div className="space-y-4">
        <div>
          <Label>Nombre del proyecto</Label>
          <input className="field" defaultValue={editing ? "Inventario panadería La Espiga" : ""} placeholder="Ej: App de tareas, Tienda online..."/>
        </div>

        <div>
          <Label>Descripción</Label>
          <div className="relative">
            <textarea
              className="w-full px-3 py-2.5 rounded-[6px] border border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 outline-none focus:border-brand-500 resize-none min-h-[88px] text-sm leading-relaxed"
              defaultValue={desc}
              maxLength={200}
              placeholder="¿Qué construiste? ¿Para quién? ¿Qué problema resuelve?"
            />
            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-ink-400">{charCount}/200</div>
          </div>
        </div>

        <div>
          <Label>Tipo de proyecto</Label>
          <div className="grid grid-cols-3 gap-1.5">
            {TIPOS_PROY.map(t => (
              <button key={t}
                className={`h-10 px-2 rounded-[6px] text-[12px] font-medium border transition-colors
                  ${(editing ? "Freelance" : "Académico") === t
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-ink-700 border-ink-200 hover:border-ink-300"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label optional hint={`${selectedTecs.length}/5`}>Tecnologías usadas</Label>
          <div className="rounded-[8px] border border-ink-200 bg-white p-2">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {selectedTecs.map(t => (
                <span key={t} className="inline-flex items-center gap-1 h-7 pl-3 pr-1 rounded-full bg-brand-600 text-white text-xs font-medium">
                  {t}
                  <button className="h-5 w-5 grid place-items-center rounded-full hover:bg-white/15"><FSIcon.X width="12" height="12"/></button>
                </span>
              ))}
              <div className="inline-flex items-center gap-1 h-7 px-3 rounded-full text-xs text-ink-500 border border-dashed border-ink-300">
                <FSIcon.Plus width="12" height="12"/> Agregar
              </div>
            </div>
            <div className="border-t border-ink-100 pt-2">
              <div className="text-[10px] font-medium uppercase tracking-wider text-ink-500 mb-1.5">Tus habilidades</div>
              <div className="flex flex-wrap gap-1.5">
                {TECS_DISPONIBLES.filter(t => !selectedTecs.includes(t)).slice(0,8).map(t => (
                  <button key={t} className="h-7 px-3 rounded-full text-xs font-medium bg-ink-50 text-ink-700 hover:bg-brand-50 hover:text-brand-700">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label optional>Enlace al proyecto</Label>
          <input className="field" placeholder="https://github.com/... o https://miproyecto.com"/>
        </div>

        <div>
          <Label optional>Imagen del proyecto</Label>
          <div className="rounded-[8px] border-2 border-dashed border-ink-200 bg-ink-50/40 p-5 text-center hover:border-brand-400 hover:bg-brand-50/40 transition-colors cursor-pointer">
            <div className="inline-flex h-10 w-10 rounded-full bg-white border border-ink-200 items-center justify-center text-ink-500 mb-2">
              <FSIcon.Upload/>
            </div>
            <div className="text-[13px] font-medium text-ink-700">Arrastra o haz click para subir</div>
            <div className="text-[11px] text-ink-500 mt-0.5">JPG o PNG · máximo 2 MB</div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-ink-100 flex items-center gap-2.5">
        <button className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-brand-600 text-white font-medium text-sm hover:bg-brand-700">
          {editing ? <><FSIcon.Check/> Guardar cambios</> : <><FSIcon.Plus/> Agregar proyecto</>}
        </button>
        {!editing && <button className="text-sm text-ink-500 hover:text-ink-700">Limpiar</button>}
      </div>
    </>
  );
}

function Step4Proyectos({ state = "list-new", mobile = false }) {
  const items = state === "empty" ? [] : PROYECTOS_MOCK;
  const editingId = state === "list-edit" ? "p2" : null;
  const mode = state === "list-edit" ? "edit" : "new";

  return (
    <div className="h-full w-full bg-ink-50 font-sans text-ink-900 flex flex-col">
      <FSTopBar current={4} label="Proyectos" mobile={mobile}/>

      <main className={`flex-1 overflow-y-auto ${mobile ? "px-5 py-5" : "px-10 py-8"}`}>
        <div className={mobile ? "" : "max-w-[1200px] mx-auto grid grid-cols-[minmax(0,_45fr)_minmax(0,_55fr)] gap-8 items-start"}>

          {mobile && items.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-medium uppercase tracking-wider text-ink-500">Tus proyectos ({items.length})</h3>
              </div>
              <div className="space-y-3">
                {items.slice(0,1).map(p => <ProyectoCard key={p.id} p={p} active={p.id === editingId}/>)}
              </div>
            </div>
          )}

          <div className={`card ${mobile ? "p-5" : "p-7"} ${mobile ? "" : "sticky top-6"}`}>
            <ProyectoForm mode={mode}/>
          </div>

          {!mobile && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[11px] font-medium uppercase tracking-wider text-brand-700">Tus proyectos</h3>
                  <div className="mt-0.5 text-[12px] text-ink-500">{items.length} de 6 — destaca los que más te enorgullecen</div>
                </div>
              </div>
              {items.length === 0 ? (
                <EmptyState
                  icon={<FSIcon.Folder/>}
                  title="Aquí verás tus proyectos"
                  subtitle="No necesitas tener proyectos en GitHub — cualquier cosa que hayas construido cuenta. Un sitio sencillo, una app de práctica, un diseño en Figma."
                />
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {items.map(p => <ProyectoCard key={p.id} p={p} active={p.id === editingId}/>)}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <FSFooter mobile={mobile}/>
    </div>
  );
}

/* ============================================================
   PASO 5 — EXPERIENCIA LABORAL
   ============================================================ */
const TIPOS_EXP = [
  { v:"empleo",       l:"Empleo formal",        d:"Contrato laboral",        e:"💼" },
  { v:"obra",         l:"Contrato por obra",    d:"Proyecto específico",     e:"📋" },
  { v:"sena",         l:"Práctica SENA",        d:"Contrato de aprendizaje", e:"🎓" },
  { v:"universidad",  l:"Práctica universitaria", d:"Convenio académico",    e:"🏛️" },
  { v:"voluntariado", l:"Voluntariado",         d:"Sin remuneración",        e:"🤝" },
  { v:"comunitario",  l:"Trabajo comunitario",  d:"Apoyo a la comunidad",    e:"👥" },
  { v:"freelance",    l:"Freelance",            d:"Trabajo independiente",   e:"💻" },
  { v:"negocio",      l:"Negocio propio",       d:"Emprendimiento",          e:"🏠" },
];

const EXPERIENCIAS_MOCK = [
  {
    id: "e1",
    cargo: "Soporte técnico nivel 1",
    empresa: "Globalcom S.A.S.",
    tipo: "empleo",
    inicio: "2024", fin: "Actualidad",
    desc: "Atención telefónica y por chat a 30+ clientes diarios. Resolución de incidencias de software y configuración de equipos en sitio.",
  },
  {
    id: "e2",
    cargo: "Monitor sala de cómputo",
    empresa: "Alcaldía de Soacha — Casa de Cultura",
    tipo: "voluntariado",
    inicio: "2023", fin: "2024",
    desc: "Apoyo a adultos mayores en uso básico de computador y trámites en línea. Diseñé una guía paso a paso en Canva.",
  },
];

function ExperienciaCard({ e, active }) {
  const tipoMeta = TIPOS_EXP.find(t => t.v === e.tipo);
  return (
    <SavedCardChrome active={active}>
      <div className="p-4 pr-24 flex gap-3.5">
        <div className={`h-12 w-12 shrink-0 rounded-[10px] grid place-items-center text-2xl
          ${active ? "bg-white border border-brand-200" : "bg-brand-50"}`}>
          <span>{tipoMeta.e}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-[14px] leading-tight text-ink-900">{e.cargo}</div>
          <div className="text-[12px] text-ink-600 mt-0.5 truncate">{e.empresa}</div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 font-medium border border-brand-100">
              {tipoMeta.l}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-ink-50 border border-ink-200 text-ink-600">
              {e.inicio} — {e.fin}
            </span>
          </div>
          <p className="text-[12px] text-ink-600 mt-2 leading-snug line-clamp-2">{e.desc}</p>
          <button className="mt-1.5 text-[11px] text-brand-700 font-medium hover:underline">Ver más</button>
        </div>
      </div>
    </SavedCardChrome>
  );
}

function ExperienciaForm({ mode = "new" }) {
  const editing = mode === "edit";
  const selected = editing ? "voluntariado" : "empleo";

  return (
    <>
      <FormHeader mode={mode}
        newTitle="Nueva experiencia"
        editTitle="Monitor sala de cómputo"/>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>Cargo o rol</Label>
            <input className="field"
              defaultValue={editing ? "Monitor sala de cómputo" : ""}
              placeholder="ej: Soporte técnico, Practicante, Monitor..."/>
          </div>
          <div>
            <Label>Empresa u organización</Label>
            <input className="field"
              defaultValue={editing ? "Alcaldía de Soacha — Casa de Cultura" : ""}
              placeholder="ej: Empresa S.A.S., Alcaldía, Comunidad..."/>
          </div>
        </div>

        <div>
          <Label>Tipo de experiencia</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {TIPOS_EXP.map(t => (
              <button key={t.v}
                className={`flex items-start gap-2.5 px-3 py-2.5 rounded-[8px] border text-left transition-colors
                  ${selected === t.v
                    ? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/30"
                    : "border-ink-200 bg-white hover:border-ink-300"}`}>
                <span className="text-lg leading-none mt-0.5">{t.e}</span>
                <div className="min-w-0">
                  <div className={`text-[12px] font-semibold leading-tight ${selected === t.v ? "text-brand-700" : "text-ink-800"}`}>{t.l}</div>
                  <div className="text-[10px] text-ink-500 mt-0.5">{t.d}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Año inicio</Label>
            <div className="relative">
              <select className="field appearance-none pr-9" defaultValue={editing ? "2023" : "2024"}>
                {Array.from({length:36},(_,i)=>2026-i).map(y => <option key={y}>{y}</option>)}
              </select>
              <FSIcon.Chevron className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"/>
            </div>
          </div>
          <div>
            <Label>Año fin</Label>
            <div className="relative">
              <select className="field appearance-none pr-9" defaultValue={editing ? "2024" : "Actualidad"}>
                <option>Actualidad</option>
                {Array.from({length:36},(_,i)=>2026-i).map(y => <option key={y}>{y}</option>)}
              </select>
              <FSIcon.Chevron className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"/>
            </div>
          </div>
        </div>

        <div>
          <Label>Descripción</Label>
          <div className="relative">
            <textarea
              className="w-full px-3 py-2.5 rounded-[6px] border border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 outline-none focus:border-brand-500 resize-none min-h-[112px] text-sm leading-relaxed"
              defaultValue={editing ? "Apoyo a adultos mayores en uso básico de computador y trámites en línea. Diseñé una guía paso a paso en Canva." : ""}
              maxLength={300}
              placeholder="Describe qué hacías, qué aprendiste o en qué ayudabas. Sé concreto y honesto."
            />
            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-ink-400">{(editing ? 132 : 0)}/300</div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-ink-100 flex items-center gap-2.5">
        <button className="inline-flex items-center gap-2 h-11 px-5 rounded-[8px] bg-brand-600 text-white font-medium text-sm hover:bg-brand-700">
          {editing ? <><FSIcon.Check/> Guardar cambios</> : <><FSIcon.Plus/> Agregar experiencia</>}
        </button>
        {!editing && <button className="text-sm text-ink-500 hover:text-ink-700">Limpiar</button>}
      </div>
    </>
  );
}

function Step5Experiencia({ state = "list-new", mobile = false }) {
  const items = state === "empty" ? [] : EXPERIENCIAS_MOCK;
  const editingId = state === "list-edit" ? "e2" : null;
  const mode = state === "list-edit" ? "edit" : "new";

  return (
    <div className="h-full w-full bg-ink-50 font-sans text-ink-900 flex flex-col">
      <FSTopBar current={5} label="Experiencia laboral" mobile={mobile}/>

      <main className={`flex-1 overflow-y-auto ${mobile ? "px-5 py-5" : "px-10 py-8"}`}>
        <div className={mobile ? "" : "max-w-[1200px] mx-auto"}>

          {/* Banner — informal también cuenta */}
          <div className={`rounded-[10px] bg-brand-50 border border-brand-100 p-4 flex gap-3 mb-6 ${mobile ? "" : ""}`}>
            <div className="text-brand-600 shrink-0 mt-0.5"><FSIcon.Sparkle/></div>
            <div className="text-[13px] text-brand-800 leading-relaxed">
              <b>La experiencia informal también cuenta.</b> Los reclutadores de PerfilTIC valoran el trabajo comunitario, las prácticas y los proyectos propios igual que un empleo formal.
            </div>
          </div>

          <div className={mobile ? "" : "grid grid-cols-[minmax(0,_45fr)_minmax(0,_55fr)] gap-8 items-start"}>

            {mobile && items.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[11px] font-medium uppercase tracking-wider text-ink-500">Tu experiencia ({items.length})</h3>
                </div>
                <div className="space-y-2.5">
                  {items.slice(0,1).map(e => <ExperienciaCard key={e.id} e={e} active={e.id === editingId}/>)}
                </div>
              </div>
            )}

            <div className={`card ${mobile ? "p-5" : "p-7"} ${mobile ? "" : "sticky top-6"}`}>
              <ExperienciaForm mode={mode}/>
            </div>

            {!mobile && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[11px] font-medium uppercase tracking-wider text-brand-700">Tu experiencia</h3>
                    <div className="mt-0.5 text-[12px] text-ink-500">{items.length} de 6 — empieza por la más reciente</div>
                  </div>
                </div>
                {items.length === 0 ? (
                  <EmptyState
                    icon={<FSIcon.Briefcase/>}
                    title="Tu experiencia aparecerá aquí"
                    subtitle="No importa si es tu primera vez trabajando — cualquier experiencia tiene valor. Prácticas, voluntariado y emprendimientos también cuentan."
                  />
                ) : (
                  <div className="space-y-3">
                    {items.map(e => <ExperienciaCard key={e.id} e={e} active={e.id === editingId}/>)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <FSFooter mobile={mobile} nextLabel="Siguiente"/>
    </div>
  );
}

Object.assign(window, {
  Step3Formacion,
  Step4Proyectos,
  Step5Experiencia,
});
