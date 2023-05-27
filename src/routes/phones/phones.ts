import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function PhoneRoutes(app: FastifyInstance) {
  //  Getting all phones
  app.get('/phones', async (request, reply) => {
    const phones = await prisma.celular.findMany()

    return reply.status(200).send(phones)
  })

  //  Getting the user's phone
  app.get('/phones/:id_user', async (request, reply) => {
    const paramsSchema = z.object({
      id_user: z.string().uuid(),
    })

    const { id_user } = paramsSchema.parse(request.params)

    const phones = await prisma.celular.findMany({
      where: {
        id_user,
      },
    })

    return reply.status(200).send(phones)
  })

  //  Register the phone
  app.post('/phones/register', async (request, reply) => {
    const phoneSchema = z.object({
      id_user: z.string().uuid(),
      numero: z.string(),
    })

    const { id_user, numero } = phoneSchema.parse(request.body)

    await prisma.celular.create({
      data: {
        id_user,
        numero,
      },
    })
    return reply.status(201).send('Número adicionado')
  })

  //  Update the phone
  app.put('/phones/update/:id_phone', async (request, reply) => {
    const phoneIdSchema = z.object({
      id_phone: z.string().uuid(),
    })

    const { id_phone } = phoneIdSchema.parse(request.params)

    const phoneSchema = z.object({
      id_user: z.string().uuid(),
      numero: z.string(),
    })

    const { id_user, numero } = phoneSchema.parse(request.body)

    await prisma.celular.update({
      where: {
        id_phone,
      },
      data: {
        id_user,
        numero,
      },
    })
    return reply.status(200).send('Número alterado')
  })

  //  Delete the phone
  app.delete('/phones/delete/:id_phone', async (request, reply) => {
    const idPhoneSchema = z.object({
      id_phone: z.string().uuid(),
    })

    const { id_phone } = idPhoneSchema.parse(request.params)

    await prisma.celular.delete({
      where: {
        id_phone,
      },
    })

    return reply.status(200).send('This phone has been deleted')
  })
}
