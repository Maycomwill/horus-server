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

  //  Gettning all favorites with same location
  app.get('/favorites/same/:id_ponto', async (request, reply) => {
    const idSchema = z.object({
      id_ponto: z.string().uuid(),
    })
    const { id_ponto } = idSchema.parse(request.params)

    const favs = await prisma.favoritos.findMany({
      where: {
        id_ponto,
      },
    })

    return reply.status(200).send(favs)
  })

  //  Gettning all favorites with same user
  app.get('/favorites/user/:id_user', async (request, reply) => {
    const idSchema = z.object({
      id_user: z.string().uuid(),
    })
    const { id_user } = idSchema.parse(request.params)

    const favs = await prisma.favoritos.findMany({
      where: {
        id_user,
      },
    })

    return reply.status(200).send(favs)
  })

  //  Creating new Favorite
  app.post('/favorites/create', async (request, reply) => {
    const favoriteSchema = z.object({
      id_user: z.string().uuid(),
      id_ponto: z.string().uuid(),
    })

    const { id_user, id_ponto } = favoriteSchema.parse(request.body)

    const favorite = await prisma.favoritos.create({
      data: {
        id_user,
        id_ponto,
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
      id_ponto: z.string().uuid(),
    })

    const { id_ponto } = favoriteSchema.parse(request.body)

    await prisma.favoritos.update({
      where: {
        id_fav,
      },
      data: {
        id_ponto,
      },
    })

    return reply.status(201).send('Favorite updated')
  })
}
