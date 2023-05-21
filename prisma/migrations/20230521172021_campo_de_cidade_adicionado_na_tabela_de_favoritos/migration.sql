/*
  Warnings:

  - Added the required column `cidade` to the `favoritos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_favoritos" (
    "id_fav" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "favoritos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "usuarios" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_favoritos" ("CEP", "bairro", "createdAt", "endereco", "estado", "id_fav", "id_user", "lat", "lng", "nome", "numero") SELECT "CEP", "bairro", "createdAt", "endereco", "estado", "id_fav", "id_user", "lat", "lng", "nome", "numero" FROM "favoritos";
DROP TABLE "favoritos";
ALTER TABLE "new_favoritos" RENAME TO "favoritos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
