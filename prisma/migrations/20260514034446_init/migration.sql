-- CreateTable
CREATE TABLE "Perfil" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "foto" TEXT,
    "frase" TEXT,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "modalidad" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habilidad" (
    "id" TEXT NOT NULL,
    "perfilId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,

    CONSTRAINT "Habilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proyecto" (
    "id" TEXT NOT NULL,
    "perfilId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tag" TEXT,
    "enlace" TEXT,
    "imagen" TEXT,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formacion" (
    "id" TEXT NOT NULL,
    "perfilId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "institucion" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "descripcion" TEXT,
    "urlCert" TEXT,

    CONSTRAINT "Formacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" TEXT NOT NULL,
    "perfilId" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_slug_key" ON "Perfil"("slug");

-- AddForeignKey
ALTER TABLE "Habilidad" ADD CONSTRAINT "Habilidad_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formacion" ADD CONSTRAINT "Formacion_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiencia" ADD CONSTRAINT "Experiencia_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;
