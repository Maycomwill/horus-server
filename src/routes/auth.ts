import { FastifyInstance } from "fastify";
import { z, ZodError } from "zod";
import { prisma } from "../lib/prisma";
import compareHash from "../services/compare-hase";
import generateToken from "../services/generate-token";
import verifyToken from "../services/verify-token";

export async function AuthRoutes(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
      reminder: z.boolean()
    });

    try {
      const { email, password, reminder } = bodySchema.parse(req.body);
      const user = await prisma.usuarios.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res
          .status(400)
          .send({ message: "Email ou senha errados", data: null });
      }

      const compare = compareHash(password, user.password);

      if (!compare) {
        return res
          .status(400)
          .send({ message: "Email ou senha errados", data: null });
      }

      const token = generateToken({
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id_user,
        email: user.email,
        reminder
      });
      return res.status(200).send({
        message: "Login autorizado",
        data: {
          user: {
            id: user.id_user,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          },
          token,
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(500).send({ message: error.message, data: error });
      }
    }
  });

  app.post("/verify", async (req, res) => {
    const bodySchema = z.object({
      token: z.string(),
    });

    try {
      const { token } = bodySchema.parse(req.body);

      const verify = verifyToken(token);

      if (!verify) {
        return res.status(400).send({ mensage: "Token inválido", data: null });
      }

      return res.status(200).send({ message: "Token válido", data: null });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(500).send({ message: error.message, data: error });
      }
    }
  });
}
