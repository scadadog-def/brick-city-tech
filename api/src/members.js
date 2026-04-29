import { randomId } from './crypto.js'

function normEmail(e) {
  return String(e || '').trim().toLowerCase()
}

export function registerMemberRoutes(app, { db, env }) {
  // Public: create/upsert a member signup (email verification added next)
  app.post('/signup', async (req, reply) => {
    const body = req.body || {}
    const email = normEmail(body.email)
    const name = body.name != null ? String(body.name).trim() : null
    const role = body.role != null ? String(body.role).trim() : 'member'
    const interest = body.interest != null ? String(body.interest).trim() : null
    const notes = body.notes != null ? String(body.notes).trim() : null

    if (!email || !email.includes('@')) {
      return reply.code(400).send({ ok: false, error: 'invalid_email' })
    }

    const now = new Date().toISOString()

    const existing = db.prepare('select id from members where email = ?').get(email)
    let id
    if (existing) {
      id = existing.id
      db.prepare(
        `update members
         set name = coalesce(?, name),
             role = coalesce(?, role),
             interest = coalesce(?, interest),
             notes = coalesce(?, notes)
         where id = ?`,
      ).run(name, role, interest, notes, id)
    } else {
      id = randomId('mem_')
      db.prepare(
        `insert into members (id, created_at, email, name, role, interest, notes, status)
         values (?,?,?,?,?,?,?, 'active')`,
      ).run(id, now, email, name, role, interest, notes)
    }

    // Email verification will be wired once SMTP is set.
    // For now, we store the row and return success.
    const verificationConfigured = Boolean(env.SMTP_HOST && env.SMTP_FROM)

    return {
      ok: true,
      member: { id, email },
      verification: {
        required: true,
        configured: verificationConfigured
      }
    }
  })

  // Placeholder: later this will verify email tokens
  app.get('/verify-email', async () => {
    return { ok: false, error: 'not_implemented' }
  })
}
