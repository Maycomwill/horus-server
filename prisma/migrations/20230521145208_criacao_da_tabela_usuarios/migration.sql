-- CreateTable
CREATE TABLE "usuarios" (
    "id_user" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
