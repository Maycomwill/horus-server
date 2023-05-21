import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function UsersRoutes(app: FastifyInstance) {
  // Getting all users
  app.get('/users', async () => {
    const users = await prisma.usuarios.findMany()

    return users
  })

  // Getting a user
  app.get('/users/:id_user', async (request, reply) => {
    const paramsSchema = z.object({
      id_user: z.string().uuid(),
    })

    const { id_user } = paramsSchema.parse(request.params)

    const user = await prisma.usuarios.findUnique({
      where: {
        id_user,
      },
    })

    return user
  })

  // Creating a new user
  app.post('/register', async (request, reply) => {
    const userSchema = z.object({
      first_name: z.string(),
      second_name: z.string(),
      email: z.string().email(),
    })

    const { first_name, second_name, email } = userSchema.parse(request.body)

    const user = await prisma.usuarios.create({
      data: {
        email,
        first_name,
        second_name,
      },
    })

    return reply.status(201).send(user)
  })

  // Updating a existing user
  app.put('/users/:id_user', async (request, reply) => {
    const idSchema = z.object({
      id_user: z.string().uuid(),
    })

    const { id_user } = idSchema.parse(request.params)

    const userSchema = z.object({
      first_name: z.string(),
      second_name: z.string(),
      email: z.string().email(),
    })

    const { first_name, second_name, email } = userSchema.parse(request.body)

    await prisma.usuarios.update({
      where: {
        id_user,
      },
      data: {
        first_name,
        second_name,
        email,
      },
    })
    return reply.status(200).send('User updated')
  })

  // Deleting a user
  app.delete('/delete/:id_user', async (request, reply) => {
    const idSchema = z.object({
      id_user: z.string().uuid(),
    })
    const { id_user } = idSchema.parse(request.params)

    await prisma.usuarios.delete({
      where: {
        id_user,
      },
    })
    return reply.status(200).send('User Deleted')
  })
}
