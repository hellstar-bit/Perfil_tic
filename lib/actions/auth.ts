"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function login(
  _prev: unknown,
  formData: FormData
): Promise<{ error: string } | void> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  try {
    // Check if the user already has a profile to decide where to redirect
    const user = await prisma.user.findUnique({
      where: { email },
      select: { perfil: { select: { slug: true } } },
    });
    const redirectTo = user?.perfil ? "/dashboard" : "/crear";

    await signIn("credentials", { email, password, redirectTo });
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Email o contraseña incorrectos" };
    }
    throw err;
  }
}

export async function registro(
  _prev: unknown,
  formData: FormData
): Promise<{ error: string } | void> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password)
    return { error: "Todos los campos son requeridos" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: "Ingresa un email válido" };
  if (password.length < 8)
    return { error: "La contraseña debe tener mínimo 8 caracteres" };

  const existe = await prisma.user.findUnique({ where: { email } });
  if (existe) return { error: "Ya existe una cuenta con ese email" };

  const hashed = await hash(password, 12);
  await prisma.user.create({ data: { email, password: hashed } });

  // Auto-login after registration, go straight to create profile
  await signIn("credentials", { email, password, redirectTo: "/crear" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
