import { notFound } from "next/navigation";
import type { Habilidad, Proyecto, Formacion, Experiencia } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { ShareButtonMobile, ShareButtonDesktop, CopyButtonInline, CopyButtonDesktop } from "./ShareButtons";
import { CVPreviewPanel } from "./CVPreviewPanel";
import { logout } from "@/lib/actions/auth";

export const dynamic = "force-dynamic";

/* ─── Icons ─── */
const Download = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"/></svg>
);
const Pin = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
);
const Mail = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
);
const Phone = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z"/></svg>
);
const LinkSvg = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/></svg>
);
const Edit = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);

const Logo = () => (
  <a href="/" className="flex items-center gap-2">
    <div className="h-7 aspect-square rounded-[7px] bg-neon grid place-items-center text-noir">
      <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19V5h7a4 4 0 0 1 0 8H5"/></svg>
    </div>
    <span className="font-semibold text-ink-900 tracking-tight text-[15px]">Perfil<span className="text-neon">TIC</span></span>
  </a>
);

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("");
}

type Perfil = Awaited<ReturnType<typeof getPerfil>>;

async function getPerfil(slug: string) {
  return prisma.perfil.findUnique({
    where: { slug },
    include: { habilidades: true, proyectos: true, formacion: true, experiencia: true },
  });
}

/* ─── Constelación de habilidades ─── */
function SkillChip({ nombre, nivel }: { nombre: string; nivel: number }) {
  const size =
    nivel >= 5 ? "h-8 px-4 text-[13px] font-semibold" :
    nivel >= 4 ? "h-7 px-3.5 text-[12px] font-medium" :
    nivel >= 3 ? "h-[26px] px-3 text-[11px] font-medium" :
    nivel >= 2 ? "h-[22px] px-2.5 text-[11px]" :
                 "h-5 px-2 text-[10px]";
  const color =
    nivel >= 4 ? "bg-neon/10 text-neon border border-neon/25" :
    nivel >= 3 ? "bg-brand-50 text-neon/70 border border-neon/10" :
                 "bg-ink-100 text-ink-500 border border-ink-200";
  return (
    <span className={`inline-flex items-center rounded-full ${size} ${color}`}>{nombre}</span>
  );
}

/* ═══ MOBILE ═══ */
function PerfilMobile({ perfil, isOwner }: { perfil: NonNullable<Perfil>; isOwner: boolean }) {
  const color = perfil.colorTema ?? "#0f6e56";
  return (
    <div className="min-h-dvh font-sans text-ink-900" style={{ background: "#0E0E0E" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-ink-200"
        style={{ background: "#161616" }}>
        <Logo />
        <div className="flex items-center gap-2">
          {isOwner && (
            <>
              <a href="/editar" className="text-xs font-medium text-ink-600 inline-flex items-center gap-1 border border-ink-200 rounded-md px-2.5 py-1.5 hover:bg-ink-100 transition-colors">
                <Edit /> Editar
              </a>
              <form action={logout}>
                <button type="submit" className="text-xs font-medium text-ink-500 border border-ink-200 rounded-md px-2.5 py-1.5 hover:bg-ink-100 transition-colors">
                  Salir
                </button>
              </form>
            </>
          )}
          <ShareButtonMobile slug={perfil.slug} />
        </div>
      </div>

      {/* Hero */}
      <section className="px-5 pt-6 pb-6 border-b border-ink-200" style={{ background: "#161616" }}>
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 rounded-full grid place-items-center text-white font-bold text-2xl shrink-0 overflow-hidden"
            style={{ backgroundColor: color }}>
            {perfil.foto ? <img src={perfil.foto} alt={perfil.nombre} className="h-full w-full object-cover" /> : initials(perfil.nombre)}
          </div>
          <div className="min-w-0 flex-1">
            {perfil.disponible && <span className="chip inline-flex mb-2">Disponible</span>}
            <h1 className="text-[22px] font-bold leading-tight text-ink-900">{perfil.nombre}</h1>
            <div className="text-[13px] text-ink-500 mt-0.5">{perfil.cargo}</div>
          </div>
        </div>
        {perfil.frase && <p className="mt-4 text-[13px] text-ink-600 leading-relaxed">{perfil.frase}</p>}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink-500">
          <span className="inline-flex items-center gap-1"><Pin /> {perfil.municipio}, {perfil.departamento}</span>
          <span className="inline-flex items-center gap-1"><Mail /> {perfil.email}</span>
          {perfil.telefono && <span className="inline-flex items-center gap-1"><Phone /> {perfil.telefono}</span>}
        </div>
        <a
          href={`/api/cv/${perfil.id}?template=${perfil.cvTemplate ?? "clasica"}`}
          download
          className="mt-5 w-full h-11 rounded-[8px] bg-neon text-noir font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-90 transition-all"
        >
          <Download /> Descargar CV
        </a>
      </section>

      {/* Habilidades */}
      {perfil.habilidades.length > 0 && (
        <section className="mt-2 px-5 py-6 border-b border-ink-200" style={{ background: "#161616" }}>
          <h2 className="section-label mb-4">Constelación de habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {perfil.habilidades
              .slice()
              .sort((a: Habilidad, b: Habilidad) => b.nivel - a.nivel)
              .map((h: Habilidad) => (
                <SkillChip key={h.id} nombre={h.nombre} nivel={h.nivel} />
              ))}
          </div>
        </section>
      )}

      {/* Proyectos */}
      {perfil.proyectos.length > 0 && (
        <section className="mt-2 px-5 py-6 border-b border-ink-200" style={{ background: "#161616" }}>
          <h2 className="section-label mb-4">Proyectos</h2>
          <div className="grid grid-cols-2 gap-3">
            {perfil.proyectos.map((p: Proyecto) => (
              <div key={p.id} className="card p-3">
                {p.tag && <div className="text-[10px] font-semibold uppercase tracking-wider text-neon mb-1">{p.tag}</div>}
                <div className="font-semibold text-[13px] text-ink-900 leading-tight">{p.titulo}</div>
                <div className="text-[11px] text-ink-500 mt-1 leading-snug line-clamp-2">{p.descripcion}</div>
                {p.enlace && (
                  <a href={p.enlace} target="_blank" rel="noopener noreferrer"
                    className="text-[11px] text-neon mt-2 inline-flex items-center gap-0.5 hover:underline">
                    Ver <Arrow />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formación */}
      {perfil.formacion.length > 0 && (
        <section className="mt-2 px-5 py-6 border-b border-ink-200" style={{ background: "#161616" }}>
          <h2 className="section-label mb-5">Formación</h2>
          <ol className="relative border-l border-ink-200 pl-5 space-y-5">
            {perfil.formacion.map((f: Formacion) => (
              <li key={f.id} className="relative">
                <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-neon" style={{ background: "#161616" }} />
                <div className="text-[10px] font-mono text-ink-500">{f.anioInicio} — {f.anioFin}</div>
                <div className="font-semibold text-[14px] text-ink-900 mt-0.5">{f.programa}</div>
                <div className="text-[12px] text-ink-500">{f.institucion}</div>
                <div className="text-[11px] text-ink-400">{f.nivel}</div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Experiencia */}
      {perfil.experiencia.length > 0 && (
        <section className="mt-2 px-5 py-6 border-b border-ink-200" style={{ background: "#161616" }}>
          <h2 className="section-label mb-5">Experiencia</h2>
          <ol className="relative border-l border-ink-200 pl-5 space-y-5">
            {perfil.experiencia.map((e: Experiencia) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-neon" style={{ background: "#161616" }} />
                <div className="text-[10px] font-mono text-ink-500">{e.periodo}</div>
                <div className="font-semibold text-[14px] text-ink-900 mt-0.5">{e.cargo}</div>
                <div className="text-[12px] text-ink-500">{e.empresa}</div>
                <div className="text-[12px] text-ink-600 mt-1 leading-snug">{e.descripcion}</div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Link público */}
      <section className="mt-2 px-5 py-6" style={{ background: "#161616" }}>
        <div className="section-label mb-3">Mi link público</div>
        <div className="flex items-center gap-2 rounded-[8px] p-3 font-mono text-[12px] text-ink-700 border border-ink-200" style={{ background: "#1E1E1E" }}>
          <LinkSvg />
          <span className="truncate flex-1 text-ink-900">perfiltic.co/{perfil.slug}</span>
          <CopyButtonInline slug={perfil.slug} />
        </div>
      </section>

      <footer className="px-5 py-5 border-t border-ink-200 text-[11px] text-ink-500 flex items-center justify-between" style={{ background: "#161616" }}>
        <Logo />
        <span>© 2026 PerfilTIC</span>
      </footer>
    </div>
  );
}

/* ═══ DESKTOP ═══ */
function PerfilDesktop({ perfil, isOwner }: { perfil: NonNullable<Perfil>; isOwner: boolean }) {
  const color = perfil.colorTema ?? "#0f6e56";
  return (
    <div className="min-h-dvh font-sans text-ink-900" style={{ background: "#0E0E0E" }}>
      {/* Header */}
      <header className="px-10 py-4 flex items-center justify-between border-b border-ink-200"
        style={{ background: "rgba(14,14,14,0.92)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 10 }}>
        <Logo />
        <div className="flex items-center gap-3">
          {isOwner && (
            <>
              <a href="/editar" className="btn-outline h-9 px-4 gap-2 inline-flex items-center text-sm">
                <Edit /> Editar perfil
              </a>
              <form action={logout}>
                <button type="submit" className="btn-ghost h-9 px-3 text-sm text-ink-500 hover:text-ink-700">
                  Cerrar sesión
                </button>
              </form>
            </>
          )}
          <ShareButtonDesktop slug={perfil.slug} />
        </div>
      </header>

      {/* Hero */}
      <section className="px-10 pt-10 pb-10 border-b border-ink-200" style={{ background: "#161616" }}>
        <div className="max-w-[1080px] mx-auto flex items-center gap-8">
          <div className="h-28 w-28 rounded-full grid place-items-center text-white font-bold text-3xl shrink-0 overflow-hidden"
            style={{ backgroundColor: color, boxShadow: `0 0 0 4px rgba(14,14,14,1), 0 0 0 6px ${color}40` }}>
            {perfil.foto ? <img src={perfil.foto} alt={perfil.nombre} className="h-full w-full object-cover" /> : initials(perfil.nombre)}
          </div>
          <div className="flex-1 min-w-0">
            {perfil.disponible && <span className="chip inline-flex mb-2">Disponible para empleo</span>}
            <h1 className="text-[42px] font-bold leading-tight tracking-tight text-ink-900">{perfil.nombre}</h1>
            <div className="text-[17px] text-ink-500 mt-1">{perfil.cargo}</div>
            <div className="mt-3 flex flex-wrap gap-4 text-[12px] text-ink-500">
              <span className="inline-flex items-center gap-1.5"><Pin /> {perfil.municipio}, {perfil.departamento}</span>
              <span className="inline-flex items-center gap-1.5"><Mail /> {perfil.email}</span>
              {perfil.telefono && <span className="inline-flex items-center gap-1.5"><Phone /> {perfil.telefono}</span>}
            </div>
          </div>
          {perfil.frase && (
            <div className="max-w-sm border-l border-ink-200 pl-8 shrink-0">
              <div className="section-label mb-2">Sobre mí</div>
              <p className="text-[14px] text-ink-600 leading-relaxed">{perfil.frase}</p>
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-[220px_1fr_260px] gap-5 px-10 py-10 items-start">

        {/* Left sidebar */}
        <aside className="space-y-5">
          {perfil.habilidades.length > 0 && (
            <div className="card p-5">
              <h2 className="section-label mb-4">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {perfil.habilidades
                  .slice()
                  .sort((a: Habilidad, b: Habilidad) => b.nivel - a.nivel)
                  .map((h: Habilidad) => (
                    <SkillChip key={h.id} nombre={h.nombre} nivel={h.nivel} />
                  ))}
              </div>
            </div>
          )}

          {/* Link público */}
          <div className="card p-4">
            <div className="section-label mb-3">Mi link</div>
            <div className="flex items-center gap-2 rounded-[8px] p-2.5 font-mono text-[11px] text-ink-700 border border-ink-200" style={{ background: "#1E1E1E" }}>
              <LinkSvg />
              <span className="truncate flex-1 text-ink-900">perfiltic.co/{perfil.slug}</span>
              <CopyButtonDesktop slug={perfil.slug} />
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="space-y-5 min-w-0">
          {perfil.proyectos.length > 0 && (
            <div className="card p-6">
              <h2 className="section-label mb-5">Proyectos</h2>
              <div className="grid grid-cols-2 gap-3">
                {perfil.proyectos.map((p: Proyecto) => (
                  <div key={p.id} className="rounded-[10px] border border-ink-200 p-3.5 hover:border-neon/30 transition-colors"
                    style={{ background: "#1E1E1E" }}>
                    {p.tag && <div className="text-[10px] font-semibold uppercase tracking-wider text-neon mb-1">{p.tag}</div>}
                    <div className="font-semibold text-[14px] text-ink-900 leading-tight">{p.titulo}</div>
                    <div className="text-[12px] text-ink-500 mt-1 leading-snug line-clamp-2">{p.descripcion}</div>
                    {p.enlace && (
                      <a href={p.enlace} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] text-neon mt-2 inline-flex items-center gap-0.5 hover:underline">
                        Ver proyecto <Arrow />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {perfil.formacion.length > 0 && (
            <div className="card p-6">
              <h2 className="section-label mb-5">Formación</h2>
              <ol className="relative border-l border-ink-200 pl-5 space-y-5">
                {perfil.formacion.map((f: Formacion) => (
                  <li key={f.id} className="relative">
                    <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-neon" style={{ background: "#161616" }} />
                    <div className="text-[10px] font-mono text-ink-500">{f.anioInicio} — {f.anioFin}</div>
                    <div className="font-semibold text-[14px] text-ink-900 mt-0.5">{f.programa}</div>
                    <div className="text-[12px] text-ink-500">{f.institucion}</div>
                    <div className="text-[11px] text-ink-400">{f.nivel}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {perfil.experiencia.length > 0 && (
            <div className="card p-6">
              <h2 className="section-label mb-5">Experiencia</h2>
              <ol className="relative border-l border-ink-200 pl-5 space-y-5">
                {perfil.experiencia.map((e: Experiencia) => (
                  <li key={e.id} className="relative">
                    <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-neon" style={{ background: "#161616" }} />
                    <div className="text-[10px] font-mono text-ink-500">{e.periodo}</div>
                    <div className="font-semibold text-[14px] text-ink-900 mt-0.5">{e.cargo}</div>
                    <div className="text-[12px] text-ink-500">{e.empresa}</div>
                    <div className="text-[12px] text-ink-600 mt-1 leading-snug">{e.descripcion}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </main>

        {/* Right — CV preview */}
        <CVPreviewPanel perfilId={perfil.id} initialTemplate={perfil.cvTemplate ?? "clasica"} />
      </div>

      <footer className="px-10 py-6 border-t border-ink-200 text-[12px] text-ink-500 flex items-center justify-between" style={{ background: "#161616" }}>
        <Logo />
        <span>© 2026 PerfilTIC · Iniciativa de inclusión digital · Colombia</span>
      </footer>
    </div>
  );
}

/* ─── Page ─── */
export default async function SlugPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const [perfil, session] = await Promise.all([getPerfil(slug), auth()]);
  if (!perfil) notFound();

  const isOwner = !!session?.user?.id && session.user.id === perfil.userId;

  return (
    <>
      <div className="md:hidden"><PerfilMobile perfil={perfil} isOwner={isOwner} /></div>
      <div className="hidden md:block"><PerfilDesktop perfil={perfil} isOwner={isOwner} /></div>
    </>
  );
}
