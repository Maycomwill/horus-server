import fastify from "fastify";
import cors from "@fastify/cors";
import { Routes } from "./routes/routes";
import { UsersRoutes } from "./routes/users/users";
import { FavoritesRoutes } from "./routes/favorites/favorites";
import { PhoneRoutes } from "./routes/phones/phones";
import { fastifyStatic } from "@fastify/static";
import { TuristLocationsRoutes } from "./routes/locations/locations";
import path from "node:path";
import { ForteCincoPontasRouter } from "./routes/public/cinco-pontas";
import { MarcoZeroRouter } from "./routes/public/marco-zero";
import { AuthRoutes } from "./routes/auth";

export const app = fastify();

app.register(cors, {
  origin: true,
});
app.register(Routes);
app.register(AuthRoutes, { prefix: "auth" });
app.register(UsersRoutes, {prefix: "users"});
app.register(PhoneRoutes);
app.register(FavoritesRoutes);
app.register(TuristLocationsRoutes);
app.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});
app.register(ForteCincoPontasRouter);
app.register(MarcoZeroRouter);

app
  .listen({ port: 3333 })
  .then(() => console.log("HTTP Server running on http://localhost:3333 💻"));
