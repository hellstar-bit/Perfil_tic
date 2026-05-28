"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/actions/auth";
import { Logo } from "@/components/Logo";

function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
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
          autoComplete="current-password"
          required
          className="field"
          placeholder="••••••••"
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
        {pending ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4 py-12" style={{ background: "#0E0E0E" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Logo size="xl" />
        </div>

        <div className="card p-8">
          <h1 className="text-2xl font-bold text-ink-900 mb-1">Bienvenido de nuevo</h1>
          <p className="text-sm text-muted mb-6">Ingresa a tu cuenta para continuar</p>
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="text-neon font-medium hover:underline">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
