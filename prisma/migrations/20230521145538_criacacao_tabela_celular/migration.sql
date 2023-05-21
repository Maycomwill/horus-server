-- CreateTable
CREATE TABLE "celular" (
    "id_phone" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    CONSTRAINT "celular_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "usuarios" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);
