import fastify from 'fastify'
import cors from '@fastify/cors'
import { Routes } from './routes/routes'
import { UsersRoutes } from './routes/users/users'
import { FavoritesRoutes } from './routes/favorites/favorites'
import { PhoneRoutes } from './routes/phones/phones'

export const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(Routes)
app.register(UsersRoutes)
app.register(PhoneRoutes)
app.register(FavoritesRoutes)

app
  .listen({ port: 3333 })
  .then(() => console.log('HTTP Server running on http://localhost:3333 💻'))
