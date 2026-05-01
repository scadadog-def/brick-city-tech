import Fastify from 'fastify'
import { ensureSchema, openDb } from './db.js'
import { registerPodcastRoutes } from './podcast.js'
import { registerBlogRoutes } from './blog.js'
import { registerMemberRoutes } from './members.js'
import { registerAuth } from './auth_local.js'

const PORT = Number(process.env.PORT || 8787)
const BASE_PATH = process.env.BASE_PATH || '/'
const DATABASE_PATH = process.env.DATABASE_PATH || '/data/bct.sqlite'

const app = Fastify({ logger: true })

app.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
  try {
    done(null, body ? JSON.parse(body) : {})
  } catch (err) {
    done(err)
  }
})

const db = openDb(DATABASE_PATH)
ensureSchema(db)

app.get('/health', async () => {
  return { ok: true, service: 'brick-city-tech-api' }
})

app.get('/info', async () => {
  return {
    ok: true,
    basePath: BASE_PATH,
    databasePath: DATABASE_PATH
  }
})

const env = {
  BASE_PATH,
  PUBLIC_BASE_URL: process.env.PUBLIC_BASE_URL,
  ADMIN_EMAIL_ALLOWLIST: process.env.ADMIN_EMAIL_ALLOWLIST,
  SESSION_SECRET: process.env.SESSION_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_SECURE: process.env.SMTP_SECURE,
  SMTP_FROM: process.env.SMTP_FROM,
}

await registerAuth(app, { db, env })

registerPodcastRoutes(app, { db })
registerBlogRoutes(app, { db })
registerMemberRoutes(app, { db, env })

app.listen({ port: PORT, host: '0.0.0.0' })
