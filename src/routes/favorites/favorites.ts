import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function FavoritesRoutes(app: FastifyInstance) {
  //  Getting all favorites
  app.get('/favorites', async (request) => {
    const favorites = await prisma.favoritos.findMany()

    return favorites
  })

  //  Getting one favorite
  app.get('/favorites/:id_fav', async (request, reply) => {
    const idSchema = z.object({
      id_fav: z.string().uuid(),
    })
    const { id_fav } = idSchema.parse(request.params)

    const favorite = await prisma.favoritos.findUniqueOrThrow({
      where: {
        id_fav,
      },
    })
    return reply.status(200).send(favorite)
  })

  //  Creating new Favorite
  app.post('/favorites/create', async (request, reply) => {
    const favoriteSchema = z.object({
      id_user: z.string().uuid(),
      nome: z.string(),
      endereco: z.string(),
      bairro: z.string(),
      cidade: z.string(),
      estado: z.string(),
      numero: z.string(),
      CEP: z.string(),
      lat: z.number(),
      lng: z.number(),
    })

    const {
      CEP,
      bairro,
      endereco,
      estado,
      id_user,
      lat,
      cidade,
      lng,
      nome,
      numero,
    } = favoriteSchema.parse(request.body)

    const favorite = await prisma.favoritos.create({
      data: {
        CEP,
        nome,
        endereco,
        numero,
        bairro,
        cidade,
        estado,
        id_user,
        lat,
        lng,
      },
    })

    return reply.status(201).send(favorite)
  })

  //  Deleting a favorite
  app.delete('/favorites/:id_fav', async (request, reply) => {
    const idSchema = z.object({
      id_fav: z.string().uuid(),
    })
    const { id_fav } = idSchema.parse(request.params)

    await prisma.favoritos.delete({
      where: {
        id_fav,
      },
    })
    return reply.status(200).send('Favorite deleted')
  })

  //  Creating new Favorite
  app.put('/favorites/update/:id_fav', async (request, reply) => {
    const idSchema = z.object({
      id_fav: z.string().uuid(),
    })

    const { id_fav } = idSchema.parse(request.params)

    const favoriteSchema = z.object({
      id_user: z.string().uuid(),
      nome: z.string(),
      endereco: z.string(),
      bairro: z.string(),
      cidade: z.string(),
      estado: z.string(),
      numero: z.string(),
      CEP: z.string(),
      lat: z.number(),
      lng: z.number(),
    })

    const {
      CEP,
      bairro,
      endereco,
      estado,
      id_user,
      lat,
      cidade,
      lng,
      nome,
      numero,
    } = favoriteSchema.parse(request.body)

    await prisma.favoritos.update({
      where: {
        id_fav,
      },
      data: {
        CEP,
        nome,
        endereco,
        numero,
        bairro,
        cidade,
        estado,
        id_user,
        lat,
        lng,
      },
    })

    return reply.status(201).send('Favorite updated')
  })
}
