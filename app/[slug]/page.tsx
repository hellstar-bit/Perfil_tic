import { notFound } from "next/navigation";
import type { Habilidad, Proyecto, Formacion, Experiencia } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { ShareButtonMobile, ShareButtonDesktop, CopyButtonInline, CopyButtonDesktop } from "./ShareButtons";

export const dynamic = "force-dynamic";

/* ─── Inline icons ─── */
const Download = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"/></svg>
);
const Pin = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
);
const Mail = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
);
const Phone = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z"/></svg>
);
const Link = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"/></svg>
);
const Edit = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="h-7 aspect-square rounded-[7px] bg-brand-600 grid place-items-center text-white font-semibold">
      <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19V5h7a4 4 0 0 1 0 8H5"/></svg>
    </div>
    <span className="font-semibold text-ink-900 tracking-tight text-[15px]">Perfil<span className="text-brand-600">TIC</span></span>
  </div>
);

const Bars = ({ lvl }: { lvl: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} className={`h-1.5 w-4 rounded-full ${i <= lvl ? "bg-brand-500" : "bg-ink-200"}`} />
    ))}
  </div>
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
// userId is needed for owner check but not exposed to the layout components

/* ─── Mobile layout ─── */
function PerfilMobile({ perfil, isOwner }: { perfil: NonNullable<Perfil>; isOwner: boolean }) {
  return (
    <div className="min-h-dvh bg-ink-50 font-sans text-ink-900">
      <div className="px-5 pt-4 pb-3 flex items-center justify-between bg-white border-b border-ink-100">
        <Logo />
        <div className="flex items-center gap-2">
          {isOwner && (
            <a href="/editar" className="text-xs font-medium text-ink-600 inline-flex items-center gap-1 border border-ink-200 rounded-md px-2.5 py-1.5 hover:bg-ink-50">
              <Edit /> Editar
            </a>
          )}
          <ShareButtonMobile slug={perfil.slug} />
        </div>
      </div>

      <section className="bg-white px-5 pt-6 pb-5">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 rounded-full bg-brand-100 grid place-items-center text-brand-700 font-semibold text-2xl shrink-0 ring-2 ring-white shadow-sm">
            {perfil.foto ? <img src={perfil.foto} alt={perfil.nombre} className="h-full w-full rounded-full object-cover" /> : initials(perfil.nombre)}
          </div>
          <div className="min-w-0 flex-1">
            {perfil.disponible && <span className="chip">Disponible para empleo</span>}
            <h1 className="mt-2 text-[22px] font-semibold leading-tight">{perfil.nombre}</h1>
            <div className="text-[13px] text-ink-500 mt-0.5">{perfil.cargo}</div>
          </div>
        </div>
        {perfil.frase && <p className="mt-4 text-[14px] text-ink-700 leading-relaxed">{perfil.frase}</p>}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink-500">
          <span className="inline-flex items-center gap-1"><Pin /> {perfil.municipio}, {perfil.departamento}</span>
          <span className="inline-flex items-center gap-1"><Mail /> {perfil.email}</span>
          {perfil.telefono && <span className="inline-flex items-center gap-1"><Phone /> {perfil.telefono}</span>}
        </div>
        <a href={`/api/cv/${perfil.id}`} download className="mt-5 w-full h-12 rounded-[8px] bg-brand-600 text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-brand-700">
          <Download /> Descargar CV (PDF)
        </a>
      </section>

      {perfil.habilidades.length > 0 && (
        <section className="mt-3 bg-white px-5 py-6">
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-brand-700">Habilidades TIC</h2>
          <div className="mt-3 space-y-3">
            {perfil.habilidades.map((h: Habilidad) => (
              <div key={h.id} className="flex items-center justify-between">
                <span className="text-sm font-medium">{h.nombre}</span>
                <Bars lvl={h.nivel} />
              </div>
            ))}
          </div>
        </section>
      )}

      {perfil.proyectos.length > 0 && (
        <section className="mt-3 bg-white px-5 py-6">
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-brand-700">Proyectos</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {perfil.proyectos.map((p: Proyecto) => (
              <div key={p.id} className="card overflow-hidden">
                <div className="p-3">
                  {p.tag && <div className="text-[10px] font-medium uppercase tracking-wider text-brand-700">{p.tag}</div>}
                  <div className="font-semibold text-[13px] leading-tight mt-0.5">{p.titulo}</div>
                  <div className="text-[11px] text-ink-500 mt-1 leading-snug line-clamp-2">{p.descripcion}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {perfil.formacion.length > 0 && (
        <section className="mt-3 bg-white px-5 py-6">
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-brand-700">Formación</h2>
          <ol className="mt-4 relative border-l border-ink-200 pl-5 space-y-5">
            {perfil.formacion.map((f: Formacion) => (
              <li key={f.id} className="relative">
                <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full bg-white border-2 border-brand-500" />
                <div className="text-[10px] font-mono text-ink-500">{f.anioInicio} — {f.anioFin}</div>
                <div className="font-semibold text-[14px] leading-tight mt-0.5">{f.programa}</div>
                <div className="text-[12px] text-ink-500">{f.institucion}</div>
                <div className="text-[11px] text-ink-400">{f.nivel}</div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {perfil.experiencia.length > 0 && (
        <section className="mt-3 bg-white px-5 py-6">
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-brand-700">Experiencia</h2>
          <ol className="mt-4 relative border-l border-ink-200 pl-5 space-y-5">
            {perfil.experiencia.map((e: Experiencia) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full bg-white border-2 border-brand-600" />
                <div className="text-[10px] font-mono text-ink-500">{e.periodo}</div>
                <div className="font-semibold text-[14px] leading-tight mt-0.5">{e.cargo}</div>
                <div className="text-[12px] text-ink-500">{e.empresa}</div>
                <div className="text-[12px] text-ink-600 mt-1 leading-snug">{e.descripcion}</div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-3 bg-brand-600 text-white px-5 py-7">
        <div className="text-[11px] uppercase tracking-wider text-brand-100">Mi link público</div>
        <div className="mt-2 flex items-center gap-2 bg-brand-700 rounded-[8px] p-3 font-mono text-[13px]">
          <Link />
          <span className="truncate flex-1">perfiltic.co/{perfil.slug}</span>
          <CopyButtonInline slug={perfil.slug} />
        </div>
      </section>

      <footer className="px-5 py-5 bg-white text-[11px] text-ink-500 flex items-center justify-between">
        <Logo />
        <span>© 2026 PerfilTIC</span>
      </footer>
    </div>
  );
}

/* ─── Desktop layout ─── */
function PerfilDesktop({ perfil, isOwner }: { perfil: NonNullable<Perfil>; isOwner: boolean }) {
  return (
    <div className="min-h-dvh bg-ink-50 font-sans text-ink-900">
      <header className="px-10 py-4 flex items-center justify-between bg-white border-b border-ink-100">
        <div className="h-9 aspect-square rounded-[7px] bg-brand-600 grid place-items-center text-white font-semibold">
          <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19V5h7a4 4 0 0 1 0 8H5"/></svg>
        </div>
        <div className="flex items-center gap-3">
          {isOwner && (
            <a href="/editar" className="btn-outline h-10 gap-2">
              <Edit /> Editar perfil
            </a>
          )}
          <ShareButtonDesktop slug={perfil.slug} />
          <a href={`/api/cv/${perfil.id}`} download className="btn-primary h-10 gap-2 inline-flex items-center justify-center px-5 rounded-[8px] font-medium text-sm">
            <Download /> Descargar CV
          </a>
        </div>
      </header>

      <section className="bg-white px-10 pt-10 pb-10 border-b border-ink-100">
        <div className="max-w-[1080px] mx-auto flex items-center gap-8">
          <div className="h-28 w-28 rounded-full bg-brand-100 grid place-items-center text-brand-700 font-semibold text-3xl shrink-0 ring-4 ring-white shadow-md overflow-hidden">
            {perfil.foto ? <img src={perfil.foto} alt={perfil.nombre} className="h-full w-full object-cover" /> : initials(perfil.nombre)}
          </div>
          <div className="flex-1 min-w-0">
            {perfil.disponible && <span className="chip">Disponible para empleo</span>}
            <h1 className="mt-2 text-[40px] font-semibold leading-tight tracking-tight">{perfil.nombre}</h1>
            <div className="text-[16px] text-ink-500">{perfil.cargo}</div>
            <div className="mt-3 flex flex-wrap gap-4 text-[13px] text-ink-500">
              <span className="inline-flex items-center gap-1.5"><Pin /> {perfil.municipio}, {perfil.departamento}</span>
              <span className="inline-flex items-center gap-1.5"><Mail /> {perfil.email}</span>
              {perfil.telefono && <span className="inline-flex items-center gap-1.5"><Phone /> {perfil.telefono}</span>}
            </div>
          </div>
          {perfil.frase && (
            <div className="max-w-sm border-l border-ink-100 pl-8">
              <div className="text-[11px] uppercase tracking-wider text-brand-700 mb-1">Sobre mí</div>
              <p className="text-[14px] text-ink-700 leading-relaxed">{perfil.frase}</p>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto grid grid-cols-12 gap-6 px-10 py-10">
        <aside className="col-span-4 space-y-5">
          {perfil.habilidades.length > 0 && (
            <div className="card p-6">
              <h2 className="text-[11px] font-medium uppercase tracking-wider text-brand-700 mb-4">Habilidades TIC</h2>
              <div className="space-y-3.5">
                {perfil.habilidades.map((h: Habilidad) => (
                  <div key={h.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{h.nombre}</span>
                    <Bars lvl={h.nivel} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card p-6 bg-brand-600 border-brand-700">
            <div className="text-[11px] uppercase tracking-wider text-brand-100">Mi link público</div>
            <div className="mt-3 flex items-center gap-2 bg-brand-700 rounded-[8px] p-3 font-mono text-[12px] text-white">
              <Link />
              <span className="truncate flex-1">perfiltic.co/{perfil.slug}</span>
              <CopyButtonDesktop slug={perfil.slug} />
            </div>
          </div>
        </aside>

        <main className="col-span-8 space-y-5">
          {perfil.proyectos.length > 0 && (
            <div className="card p-6">
              <h2 className="text-[11px] font-medium uppercase tracking-wider text-brand-700 mb-4">Proyectos</h2>
              <div className="grid grid-cols-3 gap-3.5">
                {perfil.proyectos.map((p: Proyecto) => (
                  <div key={p.id} className="rounded-[10px] border border-ink-200 overflow-hidden hover:shadow-sm transition-shadow">
                    <div className="p-3.5">
                      {p.tag && <div className="text-[10px] font-medium uppercase tracking-wider text-brand-700">{p.tag}</div>}
                      <div className="font-semibold text-[14px] leading-tight mt-0.5">{p.titulo}</div>
                      <div className="text-[12px] text-ink-500 mt-1 leading-snug line-clamp-2">{p.descripcion}</div>
                      {p.enlace && <a href={p.enlace} target="_blank" rel="noopener noreferrer" className="text-[11px] text-brand-600 mt-2 inline-block hover:underline">Ver proyecto →</a>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {perfil.formacion.length > 0 && (
            <div className="card p-6">
              <h2 className="text-[11px] font-medium uppercase tracking-wider text-brand-700 mb-4">Formación</h2>
              <ol className="relative border-l border-ink-200 pl-5 space-y-5">
                {perfil.formacion.map((f: Formacion) => (
                  <li key={f.id} className="relative">
                    <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full bg-white border-2 border-brand-500" />
                    <div className="text-[10px] font-mono text-ink-500">{f.anioInicio} — {f.anioFin}</div>
                    <div className="font-semibold text-[14px] leading-tight mt-0.5">{f.programa}</div>
                    <div className="text-[12px] text-ink-500">{f.institucion}</div>
                    <div className="text-[11px] text-ink-400">{f.nivel}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {perfil.experiencia.length > 0 && (
            <div className="card p-6">
              <h2 className="text-[11px] font-medium uppercase tracking-wider text-brand-700 mb-4">Experiencia</h2>
              <ol className="relative border-l border-ink-200 pl-5 space-y-5">
                {perfil.experiencia.map((e: Experiencia) => (
                  <li key={e.id} className="relative">
                    <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full bg-white border-2 border-brand-600" />
                    <div className="text-[10px] font-mono text-ink-500">{e.periodo}</div>
                    <div className="font-semibold text-[14px] leading-tight mt-0.5">{e.cargo}</div>
                    <div className="text-[12px] text-ink-500">{e.empresa}</div>
                    <div className="text-[12px] text-ink-600 mt-1 leading-snug">{e.descripcion}</div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </main>
      </div>

      <footer className="px-10 py-6 border-t border-ink-100 bg-white text-[12px] text-ink-500 flex items-center justify-between">
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
