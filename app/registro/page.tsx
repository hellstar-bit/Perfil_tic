"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registro } from "@/lib/actions/auth";

export default function RegistroPage() {
  const [state, action, pending] = useActionState(registro, undefined);

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 py-12" style={{ background: "#0E0E0E" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2">
            <div className="h-9 w-9 rounded-[8px] bg-neon grid place-items-center text-noir">
              <svg viewBox="0 0 24 24" width="55%" height="55%" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19V5h7a4 4 0 0 1 0 8H5"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-ink-900">Perfil<span className="text-neon">TIC</span></span>
          </span>
        </div>

        <div className="card p-8">
          <h1 className="text-2xl font-bold text-ink-900 mb-1">Crea tu cuenta</h1>
          <p className="text-sm text-muted mb-6">
            Solo correo y contraseña — tu nombre lo pones al crear el perfil.
          </p>

          <form action={action} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="field"
                placeholder="tu@correo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="field"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            {state?.error && (
              <p className="text-sm text-danger">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="btn-primary w-full mt-2 disabled:opacity-60"
            >
              {pending ? "Creando cuenta…" : "Crear cuenta y continuar"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-neon font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
