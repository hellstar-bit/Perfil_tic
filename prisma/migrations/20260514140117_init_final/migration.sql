/*
  Warnings:

  - You are about to drop the column `descripcion` on the `Formacion` table. All the data in the column will be lost.
  - You are about to drop the column `periodo` on the `Formacion` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Formacion` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Perfil` table. All the data in the column will be lost.
  - Added the required column `anioFin` to the `Formacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anioInicio` to the `Formacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivel` to the `Formacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programa` to the `Formacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Formacion" DROP COLUMN "descripcion",
DROP COLUMN "periodo",
DROP COLUMN "titulo",
ADD COLUMN     "anioFin" TEXT NOT NULL,
ADD COLUMN     "anioInicio" TEXT NOT NULL,
ADD COLUMN     "nivel" TEXT NOT NULL,
ADD COLUMN     "programa" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Perfil" DROP COLUMN "region",
ADD COLUMN     "departamento" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "municipio" TEXT NOT NULL DEFAULT '';
