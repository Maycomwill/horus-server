import { app } from "../../server";

export async function ForteCincoPontasRouter() {
  app.get("/public/cinco-pontas/1", function (req, reply) {
    reply.sendFile("pontos-turisticos/cinco-pontas/forte5pontas1.jpg");
  });
  app.get("/public/cinco-pontas/2", function (req, reply) {
    reply.sendFile("pontos-turisticos/cinco-pontas/forte5pontas2.jpg");
  });
  app.get("/public/cinco-pontas/3", function (req, reply) {
    reply.sendFile("pontos-turisticos/cinco-pontas/forte5pontas3.jpg");
  });
  app.get("/public/cinco-pontas/4", function (req, reply) {
    reply.sendFile("pontos-turisticos/cinco-pontas/forte5pontas4.jpg");
  });
}
