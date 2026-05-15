import Link from "next/link";

/* ─── Icons ─── */
const Arrow = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
const Check = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>;
const Share = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/></svg>;
const Download = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"/></svg>;
const DocIcon = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 14h6M9 17h4"/></svg>;
const FolderIcon = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
const LinkIcon = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/></svg>;
const UserIcon = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
const SearchIcon = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>;

const Logo = ({ size = "md" }: { size?: "md" | "lg" }) => (
  <div className="flex items-center gap-2">
    <div className={`${size === "lg" ? "h-9" : "h-7"} aspect-square rounded-[7px] bg-brand-600 grid place-items-center text-white`}>
      <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19V5h7a4 4 0 0 1 0 8H5"/></svg>
    </div>
    <span className="font-semibold text-ink-900 tracking-tight text-[15px]">Perfil<span className="text-brand-600">TIC</span></span>
  </div>
);

/* ─── Shared data ─── */
const BENEFITS = [
  { i: <DocIcon />, n: "01", t: "Hoja de vida automática", d: "Formato A4 profesional, listo para imprimir o adjuntar a una postulación. Se actualiza cuando editas tu perfil." },
  { i: <FolderIcon />, n: "02", t: "Portafolio web", d: "Tus proyectos con descripción, tecnologías usadas y enlaces. Sin código, sin diseño extra." },
  { i: <LinkIcon />, n: "03", t: "Link compartible", d: "perfiltic.co/tu-nombre — envíalo por WhatsApp, pégalo en una postulación o en tu firma de correo." },
];

const PASOS = [
  { n: "01", t: "Crea tu cuenta", d: "Solo correo y contraseña. Sin formularios largos ni tarjetas de crédito. En 30 segundos estás adentro." },
  { n: "02", t: "Llena tu perfil guiado", d: "6 pasos simples: datos personales, habilidades TIC, formación, proyectos, experiencia y vista previa." },
  { n: "03", t: "Tu perfil queda publicado", d: "En el momento en que terminas, tu link ya es accesible. Compártelo con quien quieras, cuando quieras." },
  { n: "04", t: "Descarga tu hoja de vida", d: "Genera tu CV en PDF con un clic. Siempre actualizado, siempre listo para adjuntar en una postulación." },
];

const PERFILES_MUESTRA = [
  { ini: "LM", nombre: "Laura Mendoza", cargo: "Desarrolladora Front-end", ciudad: "Barranquilla", skills: ["React", "Tailwind", "Figma"], color: "#0f6e56", slug: "laura-mendoza" },
  { ini: "JC", nombre: "Juan L. Campo S.", cargo: "Desarrollador Full Stack", ciudad: "Cartagena", skills: ["Node.js", "PostgreSQL", "Docker"], color: "#1a3a6b", slug: "juan-luis-campo-simanca" },
  { ini: "AT", nombre: "Andrés F. Torres", cargo: "Técnico de Soporte TIC", ciudad: "Medellín", skills: ["Redes", "Windows Server", "ITIL"], color: "#2d3748", slug: "andres-felipe-torres" },
];

/* ══════════════════════════════════════════════
   MOBILE
   ══════════════════════════════════════════════ */
function LandingMobile() {
  return (
    <div className="min-h-dvh bg-white font-sans text-ink-900 md:hidden">
      {/* Nav */}
      <header className="flex items-center justify-between px-5 pt-5 pb-4 sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-ink-100">
        <Logo />
        <Link href="/login" className="text-sm font-medium text-ink-700">Iniciar sesión</Link>
      </header>

      {/* Hero */}
      <section className="px-5 pt-6 pb-8">
        <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-brand-50 text-brand-700 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          Gratis · Sector TIC Colombia
        </span>
        <h1 className="mt-4 text-[34px] leading-[1.05] font-semibold tracking-tight">
          Tu talento merece <span className="text-brand-600">verse profesional</span>.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
          Convierte lo que sabes en un perfil digital que los reclutadores del sector tecnológico pueden encontrar, descargar y compartir.
        </p>
        <Link href="/registro" className="mt-6 w-full h-12 rounded-[8px] bg-brand-600 text-white font-medium text-[15px] flex items-center justify-center gap-2 active:bg-brand-700">
          Crea tu perfil gratis <Arrow />
        </Link>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-500">
          <span className="text-brand-500"><Check /></span> Toma 7 minutos · Sin hoja de vida previa
        </div>

        {/* Mockup card */}
        <div className="mt-7 relative">
          <div className="rounded-[14px] bg-ink-50 border border-ink-200 p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-brand-100 grid place-items-center text-brand-700 font-semibold">LM</div>
              <div className="min-w-0">
                <div className="font-semibold text-sm leading-tight">Laura Mendoza</div>
                <div className="text-xs text-ink-500">Desarrolladora Front-end · Barranquilla</div>
              </div>
              <span className="ml-auto chip">Disponible</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["HTML", "CSS", "React", "Figma", "Git"].map(s => (
                <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-ink-200 text-ink-700">{s}</span>
              ))}
            </div>
          </div>
          <div className="absolute -top-3 -right-2 px-2 py-1 rounded-md bg-brand-600 text-white text-[10px] font-medium shadow-sm rotate-3">perfiltic.co/laura-mendoza</div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-5 mb-8 rounded-[14px] bg-ink-50 border border-ink-200 p-4 grid grid-cols-3 divide-x divide-ink-200">
        {[["3+", "Perfiles activos"], ["32", "Departamentos"], ["100%", "Gratuito"]].map(([n, l]) => (
          <div key={l} className="text-center px-2">
            <div className="text-[20px] font-semibold text-brand-600">{n}</div>
            <div className="text-[10px] text-ink-500 leading-tight mt-0.5">{l}</div>
          </div>
        ))}
      </section>

      {/* Cómo funciona */}
      <section className="px-5 pb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">Cómo funciona</div>
        <h2 className="mt-1 text-[22px] font-semibold">Cuatro pasos. Una vez. Para siempre.</h2>
        <div className="mt-5 space-y-3">
          {PASOS.map((p, i) => (
            <div key={p.n} className="flex gap-4 items-start">
              <div className="h-8 w-8 shrink-0 rounded-full bg-brand-600 text-white text-xs font-semibold grid place-items-center mt-0.5">{i + 1}</div>
              <div>
                <div className="font-semibold text-[15px]">{p.t}</div>
                <div className="text-[13px] text-ink-600 mt-0.5 leading-snug">{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Qué obtienes */}
      <section className="px-5 pb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">Qué obtienes</div>
        <h2 className="mt-1 text-[22px] font-semibold">Tres herramientas, una sola vez que llenas el formulario.</h2>
        <div className="mt-5 space-y-3">
          {BENEFITS.map(b => (
            <div key={b.n} className="card p-4 flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-[8px] bg-brand-50 text-brand-700 grid place-items-center">{b.i}</div>
              <div className="min-w-0">
                <div className="font-semibold text-[15px]">{b.t}</div>
                <div className="text-[13px] text-ink-600 mt-0.5 leading-snug">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perfiles muestra */}
      <section className="px-5 pb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">Perfiles reales</div>
        <h2 className="mt-1 text-[22px] font-semibold">Así se ve tu perfil terminado.</h2>
        <div className="mt-4 space-y-3">
          {PERFILES_MUESTRA.map(p => (
            <Link key={p.slug} href={`/${p.slug}`} className="card p-4 flex items-center gap-3 hover:shadow-sm transition-shadow block">
              <div className="h-11 w-11 shrink-0 rounded-full grid place-items-center text-white font-semibold text-sm" style={{ backgroundColor: p.color }}>{p.ini}</div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-[14px] leading-tight">{p.nombre}</div>
                <div className="text-[12px] text-ink-500">{p.cargo} · {p.ciudad}</div>
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {p.skills.map(s => <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-ink-100 text-ink-600">{s}</span>)}
                </div>
              </div>
              <span className="text-ink-300 shrink-0"><Arrow /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-5 mb-8 rounded-[14px] bg-brand-600 text-white p-5">
        <div className="text-[11px] uppercase tracking-wider text-brand-100">Empieza ahora</div>
        <div className="mt-1 text-[20px] font-semibold leading-snug">7 minutos para tener tu primer perfil profesional.</div>
        <Link href="/registro" className="mt-4 w-full h-11 rounded-[8px] bg-white text-brand-700 font-medium text-sm flex items-center justify-center gap-2">
          Comenzar gratis <Arrow />
        </Link>
      </section>

      <footer className="px-5 py-6 border-t border-ink-100 text-xs text-ink-500 flex items-center justify-between">
        <Logo />
        <span>© 2026 PerfilTIC</span>
      </footer>
    </div>
  );
}

/* ══════════════════════════════════════════════
   DESKTOP
   ══════════════════════════════════════════════ */
function LandingDesktop() {
  return (
    <div className="bg-white font-sans text-ink-900 hidden md:block">
      {/* Nav */}
      <header className="flex items-center justify-between px-12 pt-6 pb-4 sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-ink-100">
        <Logo size="lg" />
        <nav className="flex items-center gap-8 text-sm text-ink-700">
          <a href="#como-funciona" className="hover:text-brand-600 transition-colors">Cómo funciona</a>
          <a href="#perfiles" className="hover:text-brand-600 transition-colors">Perfiles</a>
          <Link href="/login" className="btn-outline h-10">Iniciar sesión</Link>
          <Link href="/registro" className="btn-primary h-10">Crea tu perfil</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-12 pt-14 pb-20 grid grid-cols-2 gap-14 items-center max-w-[1280px] mx-auto">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full bg-brand-50 text-brand-700 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Gratis · Sector TIC Colombia
          </span>
          <h1 className="mt-5 text-[64px] leading-[1.02] font-semibold tracking-tight">
            Tu talento merece<br /><span className="text-brand-600">verse profesional</span>.
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-600">
            Convierte lo que sabes en un perfil digital que los reclutadores del sector tecnológico pueden encontrar, descargar y compartir. En 7 minutos.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link href="/registro" className="h-12 px-6 rounded-[8px] bg-brand-600 text-white font-medium text-[15px] flex items-center gap-2 hover:bg-brand-700 transition-colors">
              Crea tu perfil gratis <Arrow />
            </Link>
            <Link href="/laura-mendoza" className="h-12 px-5 rounded-[8px] border border-ink-200 text-ink-800 font-medium text-[15px] flex items-center gap-2 hover:bg-ink-50 transition-colors">
              Ver un perfil real
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-6 text-xs text-ink-500">
            <span className="flex items-center gap-1.5"><span className="text-brand-500"><Check /></span> Sin tarjeta de crédito</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-500"><Check /></span> Sin hoja de vida previa</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-500"><Check /></span> Desde tu celular</span>
          </div>
        </div>

        {/* Browser mockup */}
        <div className="relative">
          <div className="absolute -inset-6 bg-brand-50 rounded-[28px]" />
          <div className="relative rounded-[20px] bg-white border border-ink-200 shadow-lg p-6">
            <div className="flex items-center gap-2 pb-3 border-b border-ink-100">
              <div className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <div className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <div className="h-2.5 w-2.5 rounded-full bg-ink-200" />
              <div className="ml-3 px-2 h-6 rounded bg-ink-50 text-[11px] font-mono text-ink-500 flex items-center">perfiltic.co/laura-mendoza</div>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-brand-100 grid place-items-center text-brand-700 font-semibold text-lg">LM</div>
              <div>
                <div className="font-semibold text-lg leading-tight">Laura Mendoza</div>
                <div className="text-sm text-ink-500">Desarrolladora Front-end · Barranquilla</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 border border-ink-200 rounded-[8px] h-9 px-3 text-sm text-ink-700">
                <Download /> CV
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["HTML5", "CSS3", "JavaScript", "React", "Tailwind", "Figma"].map(s => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-ink-50 border border-ink-200 text-ink-700">{s}</span>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="text-[10px] font-medium uppercase tracking-wider text-brand-700">Experiencia reciente</div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                <div>
                  <div className="text-[13px] font-medium">Desarrolladora Front-end · Agencia Digital Costa Norte</div>
                  <div className="text-[11px] text-ink-500">Feb 2023 — Presente</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-3 px-3 py-1.5 rounded-md bg-brand-600 text-white text-xs font-medium shadow-md rotate-2 flex items-center gap-1.5">
            <Share /> Compartible
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-ink-100 bg-ink-50 py-8">
        <div className="max-w-[1280px] mx-auto px-12 grid grid-cols-4 divide-x divide-ink-200">
          {[["3+", "Perfiles publicados"], ["32", "Departamentos cubiertos"], ["7 min", "Tiempo promedio de creación"], ["100%", "Gratuito siempre"]].map(([n, l]) => (
            <div key={l} className="text-center px-8">
              <div className="text-[32px] font-semibold text-brand-600 leading-none">{n}</div>
              <div className="text-sm text-ink-500 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="px-12 py-20 max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-xs font-medium uppercase tracking-wider text-brand-700">Cómo funciona</div>
          <h2 className="mt-2 text-[40px] font-semibold tracking-tight">Cuatro pasos. Una vez. Para siempre.</h2>
          <p className="mt-3 text-[16px] text-ink-600 max-w-xl mx-auto">
            Llenas tu información una sola vez y obtienes perfil web, portafolio y CV descargable al instante.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {PASOS.map((p, i) => (
            <div key={p.n} className="relative">
              {i < PASOS.length - 1 && (
                <div className="absolute top-5 left-[calc(50%+20px)] right-[-50%] h-px bg-ink-200 hidden lg:block" />
              )}
              <div className="card p-6 relative">
                <div className="h-10 w-10 rounded-full bg-brand-600 text-white text-sm font-semibold grid place-items-center mb-4">
                  {i + 1}
                </div>
                <div className="font-semibold text-[17px] mb-2">{p.t}</div>
                <div className="text-sm text-ink-600 leading-relaxed">{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Qué obtienes */}
      <section className="bg-ink-50 py-20">
        <div className="max-w-[1280px] mx-auto px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-brand-700">Qué obtienes</div>
              <h2 className="mt-2 text-[40px] font-semibold tracking-tight">Tres herramientas, un solo formulario.</h2>
            </div>
            <p className="text-sm text-ink-500 max-w-xs text-right leading-relaxed">Llenas tus datos una sola vez.<br />PerfilTIC arma el resto automáticamente.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {BENEFITS.map(b => (
              <div key={b.n} className="card p-6 bg-white">
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-[10px] bg-brand-50 text-brand-700 grid place-items-center">{b.i}</div>
                  <span className="text-xs font-mono text-ink-300">{b.n}</span>
                </div>
                <div className="font-semibold text-lg">{b.t}</div>
                <div className="text-sm text-ink-600 mt-2 leading-relaxed">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfiles reales */}
      <section id="perfiles" className="px-12 py-20 max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-brand-700">Perfiles reales</div>
            <h2 className="mt-2 text-[40px] font-semibold tracking-tight">Así se ve tu perfil terminado.</h2>
          </div>
          <Link href="/registro" className="btn-primary h-10">Crear el mío <Arrow /></Link>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {PERFILES_MUESTRA.map(p => (
            <Link key={p.slug} href={`/${p.slug}`} className="card p-5 hover:shadow-md transition-shadow block group">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full grid place-items-center text-white font-semibold shrink-0"
                  style={{ backgroundColor: p.color }}>{p.ini}</div>
                <div className="min-w-0">
                  <div className="font-semibold text-[15px] leading-tight">{p.nombre}</div>
                  <div className="text-[12px] text-ink-500">{p.cargo}</div>
                  <div className="text-[11px] text-ink-400">{p.ciudad}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.skills.map(s => (
                  <span key={s} className="text-[11px] px-2 py-1 rounded-md bg-ink-50 border border-ink-200 text-ink-600">{s}</span>
                ))}
              </div>
              <div className="text-[12px] text-brand-600 font-medium group-hover:underline">
                Ver perfil completo →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="max-w-[1280px] mx-auto px-12 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-brand-100">Empieza ahora</div>
            <h2 className="mt-1 text-[36px] font-semibold leading-tight">7 minutos para tener tu<br />primer perfil profesional.</h2>
            <div className="mt-4 flex items-center gap-6 text-sm text-brand-100">
              <span className="flex items-center gap-1.5"><Check /> Sin tarjeta</span>
              <span className="flex items-center gap-1.5"><Check /> Sin hoja de vida previa</span>
              <span className="flex items-center gap-1.5"><Check /> Link listo al terminar</span>
            </div>
          </div>
          <Link href="/registro" className="h-14 px-8 rounded-[10px] bg-white text-brand-700 font-semibold text-[16px] flex items-center gap-2 hover:bg-brand-50 transition-colors shrink-0">
            Crear mi perfil gratis <Arrow />
          </Link>
        </div>
      </section>

      <footer className="px-12 py-8 border-t border-ink-100 bg-white text-xs text-ink-500 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <a href="#como-funciona" className="hover:text-ink-700">Cómo funciona</a>
          <a href="#perfiles" className="hover:text-ink-700">Perfiles</a>
          <span>Iniciativa de inclusión digital · Colombia</span>
          <span>© 2026 PerfilTIC</span>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <LandingMobile />
      <LandingDesktop />
    </>
  );
}
