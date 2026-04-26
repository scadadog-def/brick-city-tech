import cookie from '@fastify/cookie'
import session from '@fastify/session'
import oauthPlugin from '@fastify/oauth2'
import { randomId } from './crypto.js'

function normEmail(e) {
  return String(e || '').trim().toLowerCase()
}

function parseAllowlist(s) {
  return String(s || '')
    .split(',')
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean)
}

export async function registerAuth(app, { db, env }) {
  const allowlist = parseAllowlist(env.ADMIN_EMAIL_ALLOWLIST)

  await app.register(cookie)
  await app.register(session, {
    secret: env.SESSION_SECRET,
    cookie: {
      path: env.BASE_PATH || '/brick-city-tech',
      httpOnly: true,
      sameSite: 'lax',
      secure: env.PUBLIC_BASE_URL?.startsWith('https://') || false,
    },
  })

  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    app.log.warn('Google OAuth not configured (missing GOOGLE_CLIENT_ID/SECRET)')
    return
  }

  const callbackUri = `${env.PUBLIC_BASE_URL}${env.BASE_PATH}/api/auth/google/callback`

  await app.register(oauthPlugin, {
    name: 'googleOAuth2',
    scope: ['openid', 'email', 'profile'],
    credentials: {
      client: {
        id: env.GOOGLE_CLIENT_ID,
        secret: env.GOOGLE_CLIENT_SECRET,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/auth/google/start',
    callbackUri,
  })

  app.get('/auth/google/callback', async function (req, reply) {
    const token = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req)

    const userinfoRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${token.token.access_token}`,
      },
    })

    if (!userinfoRes.ok) {
      req.log.warn({ status: userinfoRes.status }, 'failed to fetch google userinfo')
      return reply.code(401).send({ ok: false, error: 'google_userinfo_failed' })
    }

    const info = await userinfoRes.json()
    const googleSub = String(info.sub || '')
    const email = normEmail(info.email)
    const name = info.name ? String(info.name) : null
    const emailVerified = Boolean(info.email_verified)

    if (!googleSub || !email) return reply.code(401).send({ ok: false, error: 'invalid_google_identity' })

    const now = new Date().toISOString()

    // Link or create member
    let member = db.prepare('select * from members where google_sub = ?').get(googleSub)

    if (!member) {
      member = db.prepare('select * from members where email = ?').get(email)

      if (member) {
        db.prepare(
          `update members
           set google_sub = ?, google_email = ?, name = coalesce(?, name),
               email_verified_at = coalesce(email_verified_at, ?),
               last_login_at = ?
           where id = ?`,
        ).run(googleSub, email, name, emailVerified ? now : null, now, member.id)
      } else {
        const id = randomId('mem_')
        const isAdmin = allowlist.includes(email) ? 1 : 0
        db.prepare(
          `insert into members (id, created_at, email, name, role, is_admin, status, google_sub, google_email, email_verified_at, last_login_at)
           values (?,?,?,?,?,?,'active',?,?,?,?)`,
        ).run(id, now, email, name, 'member', isAdmin, googleSub, email, emailVerified ? now : null, now)
        member = db.prepare('select * from members where id = ?').get(id)
      }
    } else {
      db.prepare('update members set last_login_at = ? where id = ?').run(now, member.id)
    }

    // Set session
    req.session.member = {
      id: member.id,
      email: member.email,
      name: member.name,
      is_admin: Boolean(member.is_admin),
    }

    return reply.redirect(env.BASE_PATH + '/')
  })

  app.get('/me', async (req) => {
    return { ok: true, member: req.session.member || null }
  })

  app.post('/auth/logout', async (req) => {
    req.session.delete()
    return { ok: true }
  })
}
