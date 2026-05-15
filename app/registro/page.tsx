"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registro } from "@/lib/actions/auth";

export default function RegistroPage() {
  const [state, action, pending] = useActionState(registro, undefined);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#0f6e56" />
              <path d="M8 22L14 10L20 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.5 17.5H17.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="23" cy="11" r="2.5" fill="white" />
            </svg>
            <span className="text-xl font-semibold text-ink-900">PerfilTIC</span>
          </span>
        </div>

        <div className="card p-8 shadow-md">
          <h1 className="text-2xl font-semibold text-ink-900 mb-1">Crea tu cuenta</h1>
          <p className="text-sm text-muted mb-6">
            Solo necesitas un correo y una contraseña — tu nombre lo pones al crear el perfil.
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
          <Link href="/login" className="text-brand-600 font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
