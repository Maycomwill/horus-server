import { FastifyInstance } from 'fastify'
// import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function TuristLocationsRoutes(app: FastifyInstance) {
  //  Get all locations
  app.get('/locations', async () => {
    const locations = await prisma.pontosTuristicos.findMany()
    return locations
  })

  //  Get one location
  app.get('/locations/:id_ponto', async (request, reply) => {
    const idPontoSchema = z.object({
      id_ponto: z.string().uuid(),
    })

    const { id_ponto } = idPontoSchema.parse(request.params)

    const location = await prisma.pontosTuristicos.findFirstOrThrow({
      where: {
        id_ponto,
      },
    })

    return reply.status(200).send(location)
  })

  //  Creating a location
  app.post('/locations/create', async (request, reply) => {
    const locationsSchema = z.object({
      nome: z.string(),
      endereco: z.string(),
      cidade: z.string(),
      bairro: z.string(),
      estado: z.string(),
      numero: z.string(),
      CEP: z.string(),
      lat: z.number(),
      lng: z.number(),
    })

    const { nome, endereco, cidade, bairro, estado, numero, CEP, lat, lng } =
      locationsSchema.parse(request.body)

    const location = await prisma.pontosTuristicos.create({
      data: {
        nome,
        endereco,
        cidade,
        bairro,
        estado,
        numero,
        CEP,
        lat,
        lng,
      },
    })

    return reply.status(201).send(location)
  })

  //  Updating a location
  app.put('/locations/update/:id_ponto', async (request, reply) => {
    const idSchema = z.object({
      id_ponto: z.string().uuid(),
    })

    const { id_ponto } = idSchema.parse(request.params)

    const locationsSchema = z.object({
      nome: z.string(),
      endereco: z.string(),
      cidade: z.string(),
      bairro: z.string(),
      estado: z.string(),
      numero: z.string(),
      CEP: z.string(),
      lat: z.number(),
      lng: z.number(),
    })

    const { nome, endereco, cidade, bairro, estado, numero, CEP, lat, lng } =
      locationsSchema.parse(request.body)

    const updateLocation = await prisma.pontosTuristicos.update({
      where: {
        id_ponto,
      },
      data: {
        nome,
        endereco,
        cidade,
        bairro,
        estado,
        numero,
        CEP,
        lat,
        lng,
      },
    })

    return reply.status(200).send(updateLocation)
  })

  //  Deleting a location
  app.delete('/locations/delete/:id_ponto', async (request, reply) => {
    const idSchema = z.object({
      id_ponto: z.string().uuid(),
    })

    const { id_ponto } = idSchema.parse(request.params)

    await prisma.pontosTuristicos.delete({
      where: {
        id_ponto,
      },
    })

    return reply.status(200).send('Ponto turístico deletado')
  })
}
