import Fastify from 'fastify'
import { ensureSchema, openDb } from './db.js'

const PORT = Number(process.env.PORT || 8787)
const BASE_PATH = process.env.BASE_PATH || '/brick-city-tech'
const DATABASE_PATH = process.env.DATABASE_PATH || '/data/bct.sqlite'

const app = Fastify({ logger: true })

const db = openDb(DATABASE_PATH)
ensureSchema(db)

app.get('/health', async () => {
  return { ok: true, service: 'brick-city-tech-api' }
})

// Placeholder: this will become our real podcast/membership API.
app.get('/info', async () => {
  return {
    ok: true,
    basePath: BASE_PATH,
    databasePath: DATABASE_PATH
  }
})

app.listen({ port: PORT, host: '0.0.0.0' })
