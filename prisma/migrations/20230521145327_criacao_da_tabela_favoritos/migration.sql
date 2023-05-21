-- CreateTable
CREATE TABLE "favoritos" (
    "id_fav" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" TEXT NOT NULL,
    CONSTRAINT "favoritos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "usuarios" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);
