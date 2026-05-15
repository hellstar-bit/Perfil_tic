import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/lib/actions/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const perfil = await prisma.perfil.findUnique({
    where: { userId: session.user.id },
    select: { id: true, slug: true, nombre: true, cargo: true },
  });

  return (
    <div className="min-h-dvh bg-surface">
      {/* Nav */}
      <header className="bg-white border-b border-ink-200">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 aspect-square rounded-[7px] bg-brand-600 grid place-items-center text-white">
              <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19V5h7a4 4 0 0 1 0 8H5" />
              </svg>
            </div>
            <span className="font-semibold text-ink-900 tracking-tight text-[15px]">
              Perfil<span className="text-brand-600">TIC</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted hidden sm:block">{session.user.name ?? session.user.email}</span>
            <form action={logout}>
              <button type="submit" className="btn-ghost text-sm h-9 px-3">
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-ink-900 mb-2">
          Hola, {session.user.name?.split(" ")[0] ?? "bienvenido"} 👋
        </h1>
        <p className="text-muted mb-8">Este es tu espacio en PerfilTIC.</p>

        {perfil ? (
          <div className="card p-6 shadow-sm max-w-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">Tu perfil</p>
                <p className="text-lg font-semibold text-ink-900">{perfil.nombre}</p>
                <p className="text-sm text-muted">{perfil.cargo}</p>
              </div>
              <span className="chip shrink-0">Publicado</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href={`/${perfil.slug}`} className="btn-primary text-sm h-9 px-4">
                Ver perfil
              </Link>
              <Link href="/editar" className="btn-outline text-sm h-9 px-4">
                Editar perfil
              </Link>
              <Link href={`/api/cv/${perfil.id}`} className="btn-ghost text-sm h-9 px-4">
                Descargar CV
              </Link>
            </div>
          </div>
        ) : (
          <div className="card p-8 max-w-lg text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-brand-50 grid place-items-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0f6e56" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-ink-900 mb-1">Aún no tienes un perfil</h2>
            <p className="text-sm text-muted mb-6">Crea tu CV digital en minutos y compártelo con empleadores.</p>
            <Link href="/crear" className="btn-primary">
              Crear mi perfil
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
