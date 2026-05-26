import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { EditorClient } from "./EditorClient";
import type { State } from "./EditorClient";
import { randomUUID } from "crypto";

export default async function EditarPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const perfil = await prisma.perfil.findUnique({
    where: { userId: session.user.id },
    include: { habilidades: true, proyectos: true, formacion: true, experiencia: true },
  });

  if (!perfil) redirect("/crear");

  // Map DB fields → form state
  const [primerNombre, ...restoNombre] = perfil.nombre.split(" ");
  const initialState: State = {
    nombre: primerNombre ?? "",
    apellido: restoNombre.join(" "),
    cargo: perfil.cargo,
    departamento: perfil.departamento,
    municipio: perfil.municipio,
    email: perfil.email,
    telefono: perfil.telefono ?? "",
    foto: perfil.foto ?? "",
    frase: perfil.frase ?? "",
    modalidad: perfil.modalidad ?? "",
    colorTema: perfil.colorTema ?? "#0f6e56",
    cvTemplate: perfil.cvTemplate ?? "clasica",
    habilidades: perfil.habilidades.map((h) => ({ nombre: h.nombre, nivel: h.nivel })),
    formaciones: perfil.formacion.map((f) => ({
      id: randomUUID(),
      nombre: f.programa,
      institucion: f.institucion,
      nivel: f.nivel,
      inicio: f.anioInicio,
      fin: f.anioFin,
      cert: f.urlCert ?? "",
    })),
    proyectos: perfil.proyectos.map((p) => {
      const parts = (p.tag ?? "").split(", ").map((s) => s.trim()).filter(Boolean);
      return {
        id: randomUUID(),
        nombre: p.titulo,
        descripcion: p.descripcion,
        tipo: parts[0] ?? "",
        tecnologias: parts.slice(1),
        url: p.enlace ?? "",
        imagen: p.imagen ?? "",
        color: "",
        iniciales: "",
      };
    }),
    experiencias: perfil.experiencia.map((e) => {
      const [inicio = "", fin = ""] = e.periodo.split(" — ");
      return {
        id: randomUUID(),
        cargo: e.cargo,
        empresa: e.empresa,
        tipo: e.tipo,
        emoji: "",
        inicio,
        fin,
        descripcion: e.descripcion,
      };
    }),
  };

  return <EditorClient initialState={initialState} slug={perfil.slug} />;
}
