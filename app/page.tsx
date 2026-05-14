import Link from "next/link";

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
);
const Share = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/></svg>
);
const Download = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"/></svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 14h6M9 17h4"/></svg>
);
const FolderIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
);
const LinkIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/></svg>
);

const Logo = ({ size = "md" }: { size?: "md" | "lg" }) => {
  const h = size === "lg" ? "h-9" : "h-7";
  return (
    <div className="flex items-center gap-2">
      <div className={`${h} aspect-square rounded-[7px] bg-brand-600 grid place-items-center text-white font-semibold`}>
        <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19V5h7a4 4 0 0 1 0 8H5"/></svg>
      </div>
      <span className="font-semibold text-ink-900 tracking-tight text-[15px]">Perfil<span className="text-brand-600">TIC</span></span>
    </div>
  );
};

const BENEFITS = [
  { i: <DocIcon />, n: "01", t: "Hoja de vida automática", d: "Formato A4 profesional, listo para imprimir o adjuntar a una postulación. Se actualiza solo cuando editas tu perfil." },
  { i: <FolderIcon />, n: "02", t: "Portafolio web", d: "Tus proyectos se muestran con descripción, tecnologías usadas, enlaces y capturas. Sin código, sin diseño." },
  { i: <LinkIcon />, n: "03", t: "Link compartible", d: "perfiltic.co/tu-nombre — envíalo por WhatsApp, pégalo en una postulación o agrégalo a tu firma de correo." },
];

function LandingMobile() {
  return (
    <div className="min-h-dvh bg-white font-sans text-ink-900 md:hidden">
      <header className="flex items-center justify-between px-5 pt-5 pb-4">
        <Logo />
        <button className="text-sm font-medium text-ink-700">Iniciar sesión</button>
      </header>

      <section className="px-5 pt-3 pb-8">
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

        <Link href="/crear" className="mt-6 w-full h-12 rounded-[8px] bg-brand-600 text-white font-medium text-[15px] flex items-center justify-center gap-2 active:bg-brand-700">
          Crea tu perfil gratis <Arrow />
        </Link>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-500">
          <span className="text-brand-500"><Check /></span> Toma 7 minutos · No necesitas hoja de vida previa
        </div>

        <div className="mt-7 relative">
          <div className="rounded-[14px] bg-ink-50 border border-ink-200 p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-brand-100 grid place-items-center text-brand-700 font-semibold">LM</div>
              <div className="min-w-0">
                <div className="font-semibold text-sm leading-tight">Laura Mendoza</div>
                <div className="text-xs text-ink-500">Desarrolladora Front-end · Bogotá</div>
              </div>
              <span className="ml-auto chip">Disponible</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["HTML", "CSS", "JavaScript", "React", "Figma"].map(s => (
                <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-ink-200 text-ink-700">{s}</span>
              ))}
            </div>
            <div className="mt-3 h-1.5 w-full bg-ink-200 rounded-full overflow-hidden">
              <div className="h-full w-[72%] bg-brand-500" />
            </div>
            <div className="mt-1 text-[10px] text-ink-500">Perfil 72% completo</div>
          </div>
          <div className="absolute -top-3 -right-2 px-2 py-1 rounded-md bg-brand-600 text-white text-[10px] font-medium shadow-sm rotate-3">perfiltic.co/laura</div>
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-brand-700">Qué obtienes</div>
        <h2 className="mt-1 text-[22px] font-semibold">Tres herramientas, una sola vez que llenas el formulario.</h2>
        <div className="mt-5 space-y-3">
          {BENEFITS.map(b => (
            <div key={b.n} className="card p-4 flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-[8px] bg-brand-50 text-brand-700 grid place-items-center">{b.i}</div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-mono text-ink-400">{b.n}</span>
                  <div className="font-semibold text-[15px]">{b.t}</div>
                </div>
                <div className="text-[13px] text-ink-600 mt-0.5 leading-snug">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-5 mb-8 rounded-[14px] bg-brand-600 text-white p-5">
        <div className="text-[11px] uppercase tracking-wider text-brand-100">Empieza ahora</div>
        <div className="mt-1 text-[20px] font-semibold leading-snug">7 minutos para tener tu primer perfil profesional.</div>
        <Link href="/crear" className="mt-4 w-full h-11 rounded-[8px] bg-white text-brand-700 font-medium text-sm flex items-center justify-center gap-2">
          Comenzar <Arrow />
        </Link>
      </section>

      <footer className="px-5 py-6 border-t border-ink-100 text-xs text-ink-500 flex items-center justify-between">
        <Logo />
        <span>© 2026 PerfilTIC</span>
      </footer>
    </div>
  );
}

function LandingDesktop() {
  return (
    <div className="min-h-dvh bg-white font-sans text-ink-900 hidden md:block">
      <header className="flex items-center justify-between px-12 pt-6 pb-4">
        <Logo size="lg" />
        <nav className="flex items-center gap-8 text-sm text-ink-700">
          <a href="#beneficios">Cómo funciona</a>
          <a href="#beneficios">Para reclutadores</a>
          <button className="btn-outline h-10">Iniciar sesión</button>
          <Link href="/crear" className="btn-primary h-10">Crea tu perfil</Link>
        </nav>
      </header>

      <section className="px-12 pt-10 pb-16 grid grid-cols-2 gap-14 items-center">
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
          <div className="mt-7 flex items-center gap-3">
            <Link href="/crear" className="h-12 px-6 rounded-[8px] bg-brand-600 text-white font-medium text-[15px] flex items-center gap-2 hover:bg-brand-700">
              Crea tu perfil gratis <Arrow />
            </Link>
            <button className="h-12 px-5 rounded-[8px] border border-ink-200 text-ink-800 font-medium text-[15px] flex items-center gap-2 hover:bg-ink-50">
              Ver un perfil real
            </button>
          </div>
          <div className="mt-5 flex items-center gap-5 text-xs text-ink-500">
            <span className="flex items-center gap-1.5"><span className="text-brand-500"><Check /></span> Sin tarjeta</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-500"><Check /></span> Sin hoja de vida previa</span>
            <span className="flex items-center gap-1.5"><span className="text-brand-500"><Check /></span> Desde tu celular</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-brand-50 rounded-[28px] -z-0" />
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
                <div className="text-sm text-ink-500">Desarrolladora Front-end · Bogotá D.C.</div>
              </div>
              <button className="ml-auto btn-outline h-9 gap-1.5"><Download /> CV</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["HTML", "CSS", "JavaScript", "React", "Figma", "Git"].map(s => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-ink-50 border border-ink-200 text-ink-700">{s}</span>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 rounded-[8px] bg-[repeating-linear-gradient(135deg,#f3f1ed_0_8px,#faf9f7_8px_16px)] border border-ink-200" />
              ))}
            </div>
          </div>
          <div className="absolute -top-4 -right-3 px-3 py-1.5 rounded-md bg-brand-600 text-white text-xs font-medium shadow-md rotate-2 flex items-center gap-1.5">
            <Share /> Compartible
          </div>
        </div>
      </section>

      <section id="beneficios" className="px-12 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-brand-700">Qué obtienes</div>
            <h2 className="mt-1 text-[34px] font-semibold tracking-tight">Tres herramientas, un solo formulario.</h2>
          </div>
          <div className="text-sm text-ink-500 max-w-xs text-right">Llenas tus datos una sola vez. PerfilTIC arma el resto.</div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {BENEFITS.map(b => (
            <div key={b.n} className="card p-6">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-[10px] bg-brand-50 text-brand-700 grid place-items-center">{b.i}</div>
                <span className="text-xs font-mono text-ink-300">{b.n}</span>
              </div>
              <div className="mt-5 font-semibold text-lg">{b.t}</div>
              <div className="text-sm text-ink-600 mt-2 leading-relaxed">{b.d}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-12 py-8 border-t border-ink-100 text-xs text-ink-500 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-5">
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
