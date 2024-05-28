import { app } from "../../server";

export async function MarcoZeroRouter() {
  app.get("/public/marco-zero/1", function (req, reply) {
    reply.sendFile("pontos-turisticos/marco-zero/MarcoZero1.jpg");
  });
  app.get("/public/marco-zero/2", function (req, reply) {
    reply.sendFile("pontos-turisticos/marco-zero/MarcoZero2.jpg");
  });
  app.get("/public/marco-zero/3", function (req, reply) {
    reply.sendFile("pontos-turisticos/marco-zero/MarcoZero3.jpg");
  });
  app.get("/public/marco-zero/4", function (req, reply) {
    reply.sendFile("pontos-turisticos/marco-zero/MarcoZero4.jpg");
  });
}
