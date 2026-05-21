import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CVMockupAnimated } from "@/components/landing/CVMockupAnimated";
import { PortafolioAnimated } from "@/components/landing/PortafolioAnimated";
import { LinkAnimated } from "@/components/landing/LinkAnimated";
import { HeroTitle } from "@/components/landing/HeroTitle";
import { TypedHeading } from "@/components/landing/TypedHeading";
import { ProfileCardAnimated } from "@/components/landing/ProfileCardAnimated";
import { PasoCards } from "@/components/landing/PasoCards";

/* ─── Icons ─── */
const Arrow = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
const DocIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 14h6M9 17h4"/></svg>;
const LinkIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/></svg>;
const FolderIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
const BuildingIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 8h2M15 12h2M15 16h2M5 8h2M5 12h2M5 16h2"/></svg>;
const SparkleIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/></svg>;
const CheckIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>;

const Logo = ({ size = "md" }: { size?: "md" | "lg" }) => (
  <div className="flex items-center gap-2">
    <div className={`${size === "lg" ? "h-9" : "h-7"} aspect-square rounded-[8px] bg-neon grid place-items-center text-noir`}>
      <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19V5h7a4 4 0 0 1 0 8H5"/></svg>
    </div>
    <span className="font-semibold text-ink-900 tracking-tight text-[15px]">Perfil<span className="text-neon">TIC</span></span>
  </div>
);

const PASOS = [
  { n: "01", t: "Llena tu información", d: "Datos básicos, habilidades, formación, proyectos. Preguntas concretas, sin lenguaje corporativo." },
  { n: "02", t: "La IA arma tu perfil", d: "Redactamos descripciones, sugerimos categorías y ordenamos la información para que se vea profesional." },
  { n: "03", t: "Compártelo con el mundo", d: "Obtienes un link único y un PDF descargable. Lo envías por WhatsApp o lo adjuntas en una postulación." },
];

const HERRAMIENTAS = [
  { i: <DocIcon />, n: "01", t: "Hoja de vida", d: "CV en PDF generado automático. Formato A4 limpio, listo para imprimir o adjuntar. Se actualiza solo cada vez que editas tu perfil." },
  { i: <FolderIcon />, n: "02", t: "Portafolio", d: "Página web con tus proyectos. Cada proyecto con descripción, tecnologías, enlace y tipo." },
  { i: <LinkIcon />, n: "03", t: "Link único", d: "Una URL para compartir todo. perfiltic.co/tu-nombre. WhatsApp, correo, hojas físicas — donde haga falta." },
];

/* ══════════════════════════════════════════
   MOBILE
══════════════════════════════════════════ */
function LandingMobile({ perfiles, departamentos }: { perfiles: number; departamentos: number }) {
  return (
    <div className="min-h-dvh font-sans text-ink-900 md:hidden" style={{ background: "#0E0E0E" }}>
      {/* Nav */}
      <header className="flex items-center justify-between px-5 pt-5 pb-4 sticky top-0 z-10 border-b border-ink-200"
        style={{ background: "rgba(14,14,14,0.92)", backdropFilter: "blur(12px)" }}>
        <Logo />
        <Link href="/login" className="text-sm font-medium text-ink-600 hover:text-ink-900 transition-colors">Iniciar sesión</Link>
      </header>

      {/* Hero */}
      <section className="px-5 pt-8 pb-10">
        <div className="chip inline-flex mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-neon mr-1" />
          Proyecto EU · Colombia 2026—2030
        </div>
        <HeroTitle mobile />
        <p className="mt-4 text-[14px] leading-relaxed text-ink-500">
          PerfilTIC convierte lo que sabes — proyectos del SENA, freelances, soporte, autodidacta — en un perfil digital que reclutadores del sector tecnológico pueden encontrar, descargar y compartir.
        </p>
        <Link href="/registro" className="mt-6 w-full h-12 rounded-[8px] bg-neon text-noir font-semibold text-[15px] flex items-center justify-center gap-2 active:brightness-90 transition-all">
          Crear mi perfil <Arrow />
        </Link>
        <Link href="/juan-luis-campo-simanca" className="mt-3 w-full h-11 rounded-[8px] border border-ink-200 text-ink-700 font-medium text-sm flex items-center justify-center gap-2 hover:bg-ink-50 transition-colors">
          Ver un perfil real
        </Link>
      </section>

      {/* Stats */}
      <section className="mx-5 mb-10 rounded-[14px] border border-ink-200 bg-ink-50 p-4 grid grid-cols-3 divide-x divide-ink-200">
        {[
          [String(perfiles), "perfiles publicados"],
          [String(departamentos), "departamentos"],
          ["7 min", "para tener tu perfil"],
        ].map(([n, l]) => (
          <div key={l} className="text-center px-2">
            <div className="text-[22px] font-bold text-neon">{n}</div>
            <div className="text-[10px] text-ink-500 mt-0.5 leading-tight">{l}</div>
          </div>
        ))}
      </section>

      {/* Cómo funciona */}
      <section className="px-5 pb-10">
        <div className="section-label mb-2">01 · Cómo funciona</div>
        <TypedHeading lines={["Tres pasos.", "Una sola vez."]} className="text-[24px] font-bold mb-2" />
        <p className="text-[13px] text-ink-500 mb-6 leading-relaxed">No necesitas saber diseño ni tener hoja de vida previa. Solo respondes preguntas que ya sabes contestar.</p>
        <div className="space-y-3">
          {PASOS.map((p, i) => (
            <div key={p.n} className="card p-5 flex gap-4 items-start">
              <div className="h-10 w-10 shrink-0 rounded-full grid place-items-center text-[13px] font-bold text-neon border border-neon/30 mt-0.5"
                style={{ background: "rgba(0,229,160,0.08)" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[15px] text-ink-900 mb-1">{p.t}</div>
                <div className="text-[13px] text-ink-500 leading-snug">{p.d}</div>
                <div className="mt-3 h-[2px] rounded-full" style={{ background: `rgba(0,229,160,${0.15 + i * 0.25})` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Qué obtienes */}
      <section className="px-5 pb-10">
        <div className="section-label mb-2">02 · Qué obtienes</div>
        <TypedHeading lines={["Tres herramientas,", "un solo formulario."]} className="text-[24px] font-bold mb-5" />
        <div className="space-y-3">
          {HERRAMIENTAS.map(b => (
            <div key={b.n} className="card p-4 flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-[8px] bg-brand-50 text-neon grid place-items-center">{b.i}</div>
              <div className="min-w-0">
                <div className="font-semibold text-[14px] text-ink-900">{b.n} · {b.t}</div>
                <div className="text-[12px] text-ink-500 mt-0.5 leading-snug">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Para empresas */}
      <section className="mx-5 mb-10 rounded-[16px] p-6" style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="section-label mb-3">03 · Para empresas</div>
        <TypedHeading lines={["¿Buscas talento TIC inclusivo?"]} className="text-[22px] font-bold mb-3 leading-tight" />
        <p className="text-[13px] text-ink-500 leading-relaxed mb-5">
          Jóvenes formados en programas del MinTIC, SENA y bootcamps comunitarios — listos para entrar al mercado laboral. Filtra por habilidad, ciudad y modalidad. Sin costo, sin intermediarios.
        </p>
        <div className="flex flex-col gap-2">
          <Link href="/registro" className="h-11 rounded-[8px] bg-neon text-noir font-semibold text-sm flex items-center justify-center gap-2">
            Acceso para empresas <Arrow />
          </Link>
          <button className="h-11 rounded-[8px] border border-ink-200 text-ink-700 font-medium text-sm flex items-center justify-center gap-2">
            Hablar con el equipo
          </button>
        </div>
      </section>

      <footer className="px-5 py-6 border-t border-ink-200 text-xs text-ink-500">
        <Logo />
        <p className="mt-3 text-[11px] text-ink-500 leading-relaxed">
          Iniciativa de inclusión digital para jóvenes vulnerables del sector TIC. Colombia 2026—2030.
        </p>
        <div className="mt-4 flex items-center justify-between">
          <a href="#como-funciona" className="hover:text-ink-700">Cómo funciona</a>
          <a href="#empresas" className="hover:text-ink-700">Para empresas</a>
          <span>© 2026 PerfilTIC</span>
        </div>
      </footer>
    </div>
  );
}

/* ══════════════════════════════════════════
   DESKTOP
══════════════════════════════════════════ */
function LandingDesktop({ perfiles, departamentos }: { perfiles: number; departamentos: number }) {
  return (
    <div className="font-sans text-ink-900 hidden md:block" style={{ background: "#0E0E0E" }}>
      {/* Nav */}
      <header className="flex items-center justify-between px-12 pt-5 pb-4 sticky top-0 z-10 border-b border-ink-200"
        style={{ background: "rgba(14,14,14,0.92)", backdropFilter: "blur(16px)" }}>
        <Logo size="lg" />
        <nav className="flex items-center gap-8 text-sm text-ink-600">
          <a href="#como-funciona" className="hover:text-ink-900 transition-colors">Cómo funciona</a>
          <a href="#empresas" className="hover:text-ink-900 transition-colors">Para empresas</a>
          <Link href="/login" className="btn-outline h-9 px-4 text-ink-700">Iniciar sesión</Link>
          <Link href="/registro" className="h-9 px-4 rounded-[8px] bg-neon text-noir font-medium text-sm inline-flex items-center gap-2 hover:brightness-90 transition-all">
            Crea tu perfil <Arrow />
          </Link>
        </nav>
      </header>

      {/* Hero — asymmetric */}
      <section className="px-12 pt-20 pb-24 grid grid-cols-[1fr_460px] gap-16 items-center max-w-[1280px] mx-auto">
        <div>
          <div className="chip inline-flex mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-neon mr-1.5" />
            Proyecto EU · Colombia 2026—2030
          </div>
          <HeroTitle />
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-500">
            PerfilTIC convierte lo que sabes — proyectos del SENA, freelances, soporte, autodidacta — en un perfil digital que reclutadores del sector tecnológico pueden encontrar, descargar y compartir.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link href="/registro" className="h-12 px-7 rounded-[8px] bg-neon text-noir font-bold text-[15px] flex items-center gap-2 hover:brightness-90 transition-all">
              Crear mi perfil <Arrow />
            </Link>
            <Link href="/juan-luis-campo-simanca" className="h-12 px-6 rounded-[8px] border border-ink-200 text-ink-700 font-medium text-[15px] flex items-center gap-2 hover:bg-ink-50 transition-colors">
              Ver un perfil real
            </Link>
          </div>
        </div>

        {/* Animated profile card */}
        <ProfileCardAnimated />
      </section>

      {/* Stats */}
      <section className="border-y border-ink-200 py-10" style={{ background: "#161616" }}>
        <div className="max-w-[1280px] mx-auto px-12 grid grid-cols-3 divide-x divide-ink-200">
          {[
            [String(perfiles), "perfiles publicados"],
            [String(departamentos), "departamentos cubiertos"],
            ["7 min", "para tener tu perfil"],
          ].map(([n, l]) => (
            <div key={l} className="text-center px-8">
              <div className="text-[38px] font-bold text-neon leading-none">{n}</div>
              <div className="text-sm text-ink-500 mt-1.5">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="px-12 py-24 max-w-[1280px] mx-auto">
        <div className="mb-16 max-w-2xl">
          <div className="section-label mb-3">01 · Cómo funciona</div>
          <TypedHeading lines={["Tres pasos.", "Una sola vez."]} className="text-[44px] font-bold tracking-tight leading-[1.1]" />
          <p className="mt-4 text-[16px] text-ink-500 leading-relaxed">
            No necesitas saber diseño ni tener hoja de vida previa. Solo respondes preguntas que ya sabes contestar.
          </p>
        </div>

        <PasoCards />
      </section>

      {/* Qué obtienes */}
      <section className="py-24" style={{ background: "#161616" }}>
        <div className="max-w-[1280px] mx-auto px-12">
          <div className="mb-14">
            <div className="section-label mb-3">02 · Qué obtienes</div>
            <TypedHeading lines={["Tres herramientas,", "un solo formulario."]} className="text-[44px] font-bold tracking-tight leading-[1.1]" />
          </div>
          <div className="grid grid-cols-[1fr_380px] gap-5 items-stretch">

            {/* 01 — Hoja de vida */}
            <div className="relative rounded-[20px] p-8 overflow-hidden"
              style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)", minHeight: "420px" }}>
              <span className="chip text-[11px] mb-7 inline-flex">01 · Hoja de vida</span>
              <h3 className="text-[38px] font-bold text-ink-900 leading-[1.05] tracking-tight mb-4 max-w-[260px]">
                CV en PDF<br />generado<br />automático.
              </h3>
              <p className="text-[14px] text-ink-500 leading-relaxed max-w-[260px]">
                Formato A4 limpio, listo para imprimir o adjuntar. Se actualiza solo cada vez que editas tu perfil.
              </p>

              {/* Floating CV mockup — animated */}
              <CVMockupAnimated />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {/* 02 — Portafolio */}
              <div className="flex-1 rounded-[20px] p-6"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="chip text-[11px] mb-5 inline-flex">02 · Portafolio</span>
                <h3 className="text-[22px] font-bold leading-snug mb-2 text-ink-900">Página web<br />con tus proyectos.</h3>
                <p className="text-[13px] text-ink-500 mb-5 leading-relaxed">Cada proyecto con descripción, tecnologías, enlace y tipo.</p>
                <PortafolioAnimated />
              </div>

              {/* 03 — Link único */}
              <div className="rounded-[20px] p-6"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="chip text-[11px] mb-5 inline-flex">03 · Link único</span>
                <h3 className="text-[22px] font-bold leading-snug mb-4 text-ink-900">Una URL para<br />compartir todo.</h3>
                <LinkAnimated />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Para empresas */}
      <section id="empresas" className="px-12 py-24 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-[1fr_400px] gap-16 items-center">
          <div>
            <div className="section-label mb-4">03 · Para empresas</div>
            <TypedHeading lines={["¿Buscas talento", "TIC inclusivo?"]} className="text-[44px] font-bold tracking-tight leading-[1.1] mb-5" />
            <p className="text-[16px] text-ink-500 leading-relaxed mb-8 max-w-lg">
              Jóvenes formados en programas del MinTIC, SENA y bootcamps comunitarios — listos para entrar al mercado laboral. Filtra por habilidad, ciudad y modalidad. Sin costo, sin intermediarios.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/registro" className="h-12 px-7 rounded-[8px] bg-neon text-noir font-bold text-[15px] flex items-center gap-2 hover:brightness-90 transition-all">
                Acceso para empresas <Arrow />
              </Link>
              <button className="h-12 px-6 rounded-[8px] border border-ink-200 text-ink-700 font-medium text-[15px] flex items-center gap-2 hover:bg-ink-50 transition-colors">
                Hablar con el equipo
              </button>
            </div>
          </div>

          {/* Card destacada */}
          <div className="card p-7 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-[8px] bg-brand-50 text-neon grid place-items-center shrink-0"><BuildingIcon /></div>
              <div>
                <div className="font-semibold text-[14px] text-ink-900">Sin costo, sin intermediarios</div>
                <div className="text-[12px] text-ink-500 mt-0.5">Acceso directo a perfiles verificados</div>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                "Filtra por habilidad, ciudad y modalidad",
                "Descarga el CV en PDF con un clic",
                "Perfiles con proyectos y experiencia detallada",
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-[13px] text-ink-600">
                  <span className="text-neon shrink-0"><CheckIcon /></span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-200 px-12 py-10" style={{ background: "#161616" }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-[1fr_auto_auto] gap-16 items-start">
            <div>
              <Logo size="lg" />
              <p className="mt-3 text-[13px] text-ink-500 leading-relaxed max-w-xs">
                Iniciativa de inclusión digital para jóvenes vulnerables del sector TIC. Colombia 2026—2030.
              </p>
              <p className="mt-2 text-[12px] text-ink-400 font-mono">perfiltic.co</p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-500 mb-3">Producto</div>
              <div className="space-y-2 text-[13px] text-ink-600">
                <a href="#como-funciona" className="block hover:text-ink-900">Cómo funciona</a>
                <a href="#empresas" className="block hover:text-ink-900">Para empresas</a>
                <a href="#" className="block hover:text-ink-900">Ejemplos</a>
                <a href="#" className="block hover:text-ink-900">Preguntas</a>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-500 mb-3">Legal</div>
              <div className="space-y-2 text-[13px] text-ink-600">
                <a href="#" className="block hover:text-ink-900">Términos de uso</a>
                <a href="#" className="block hover:text-ink-900">Privacidad</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-ink-200 flex items-center justify-between text-[11px] text-ink-500">
            <span>© 2026 PerfilTIC</span>
            <span>Colombia 2026—2030</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default async function Home() {
  const [perfiles, deps] = await Promise.all([
    prisma.perfil.count(),
    prisma.perfil.findMany({ select: { departamento: true }, distinct: ["departamento"] }),
  ]);
  const departamentos = deps.filter(d => d.departamento).length;

  return (
    <>
      <LandingMobile perfiles={perfiles} departamentos={departamentos} />
      <LandingDesktop perfiles={perfiles} departamentos={departamentos} />
    </>
  );
}
