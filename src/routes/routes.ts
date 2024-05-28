import { FastifyInstance } from 'fastify'

export async function Routes(app: FastifyInstance) {
  app.get('/', async () => {
    return 'Welcome to Hórus server'
  })

}
