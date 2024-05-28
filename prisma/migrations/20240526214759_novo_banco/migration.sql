-- CreateTable
CREATE TABLE "usuarios" (
    "id_user" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "celular" (
    "id_phone" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "celular_pkey" PRIMARY KEY ("id_phone")
);

-- CreateTable
CREATE TABLE "favoritos" (
    "id_fav" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" TEXT NOT NULL,
    "id_ponto" TEXT NOT NULL,

    CONSTRAINT "favoritos_pkey" PRIMARY KEY ("id_fav")
);

-- CreateTable
CREATE TABLE "PontosTuristicos" (
    "id_ponto" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT 'Descrição do local',
    "openingHours" TEXT NOT NULL DEFAULT 'Aberto todos os dias',
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PontosTuristicos_pkey" PRIMARY KEY ("id_ponto")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "celular" ADD CONSTRAINT "celular_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "usuarios"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_id_ponto_fkey" FOREIGN KEY ("id_ponto") REFERENCES "PontosTuristicos"("id_ponto") ON DELETE RESTRICT ON UPDATE CASCADE;
