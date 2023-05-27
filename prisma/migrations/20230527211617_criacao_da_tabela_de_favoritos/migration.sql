-- CreateTable
CREATE TABLE "favoritos" (
    "id_fav" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" TEXT NOT NULL,
    "id_ponto" TEXT NOT NULL,
    CONSTRAINT "favoritos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "usuarios" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favoritos_id_ponto_fkey" FOREIGN KEY ("id_ponto") REFERENCES "PontosTuristicos" ("id_ponto") ON DELETE RESTRICT ON UPDATE CASCADE
);
