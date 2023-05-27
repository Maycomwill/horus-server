/*
  Warnings:

  - You are about to drop the column `CEP` on the `favoritos` table. All the data in the column will be lost.
  - You are about to drop the column `bairro` on the `favoritos` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `favoritos` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `favoritos` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `favoritos` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `favoritos` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `favoritos` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `favoritos` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `favoritos` table. All the data in the column will be lost.
  - Added the required column `id_ponto` to the `favoritos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PontosTuristicos" (
    "id_ponto" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_favoritos" (
    "id_fav" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "id_ponto" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "favoritos_id_ponto_fkey" FOREIGN KEY ("id_ponto") REFERENCES "PontosTuristicos" ("id_ponto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favoritos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "usuarios" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_favoritos" ("createdAt", "id_fav", "id_user") SELECT "createdAt", "id_fav", "id_user" FROM "favoritos";
DROP TABLE "favoritos";
ALTER TABLE "new_favoritos" RENAME TO "favoritos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
