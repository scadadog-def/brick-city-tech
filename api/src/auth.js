import cookie from '@fastify/cookie'
import session from '@fastify/session'
import oauthPlugin from '@fastify/oauth2'
import { randomId, sha256Hex } from './crypto.js'
import { hashPassword, verifyPassword } from './passwords.js'
import { makeToken, verificationLink, passwordResetLink, sendEmail } from './email.js'

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
  const basePath = env.BASE_PATH === '/' ? '' : (env.BASE_PATH || '')
  const allowlist = parseAllowlist(env.ADMIN_EMAIL_ALLOWLIST)

  const baseUrl = String(env.PUBLIC_BASE_URL || '').replace(/\/$/, '')
  if (!baseUrl) {
    app.log.warn('PUBLIC_BASE_URL is not set; email verification links may be wrong')
  }

  await app.register(cookie)
  await app.register(session, {
    secret: env.SESSION_SECRET,
    cookie: {
      path: env.BASE_PATH || '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: env.PUBLIC_BASE_URL?.startsWith('https://') || false,
    },
  })

  const githubEnabled = Boolean(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET)
  if (!githubEnabled) {
    app.log.warn('GitHub OAuth not configured (missing GITHUB_CLIENT_ID/SECRET)')
  } else {
    const callbackUri = `${baseUrl}${basePath}/auth/github/callback`

    await app.register(oauthPlugin, {
      name: 'githubOAuth2',
      scope: ['read:user', 'user:email'],
      credentials: {
        client: {
          id: env.GITHUB_CLIENT_ID,
          secret: env.GITHUB_CLIENT_SECRET,
        },
        auth: oauthPlugin.GITHUB_CONFIGURATION,
      },
      startRedirectPath: '/auth/github/start',
      callbackUri,
    })

    app.get('/auth/github/callback', async function (req, reply) {
      const token = await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(req)

      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token.token.access_token}`,
          'User-Agent': 'brick-city-tech',
          Accept: 'application/vnd.github+json',
        },
      })

      if (!userRes.ok) {
        req.log.warn({ status: userRes.status }, 'failed to fetch github user')
        return reply.code(401).send({ ok: false, error: 'github_userinfo_failed' })
      }

      const gh = await userRes.json()
      const githubId = String(gh.id || '')
      const githubUsername = gh.login ? String(gh.login) : null
      const name = gh.name ? String(gh.name) : null

      if (!githubId) return reply.code(401).send({ ok: false, error: 'invalid_github_identity' })

      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${token.token.access_token}`,
          'User-Agent': 'brick-city-tech',
          Accept: 'application/vnd.github+json',
        },
      })

      if (!emailRes.ok) {
        req.log.warn({ status: emailRes.status }, 'failed to fetch github emails')
        return reply.code(401).send({ ok: false, error: 'github_emails_failed' })
      }

      const emails = await emailRes.json()
      const chosen = Array.isArray(emails)
        ? emails.find((e) => e?.primary && e?.verified) || emails.find((e) => e?.verified) || emails[0]
        : null

      const email = normEmail(chosen?.email)
      if (!email) return reply.code(400).send({ ok: false, error: 'github_email_required' })

      const now = new Date().toISOString()

      // Link or create member
      let member = db.prepare('select * from members where github_id = ?').get(githubId)

      if (!member) {
        member = db.prepare('select * from members where email = ?').get(email)

        if (member) {
          db.prepare(
            `update members
             set github_id = ?, github_username = ?, github_email = ?,
                 name = coalesce(?, name),
                 status = 'active',
                 email_verified_at = coalesce(email_verified_at, ?),
                 last_login_at = ?
             where id = ?`,
          ).run(githubId, githubUsername, email, name, now, now, member.id)
        } else {
          const id = randomId('mem_')
          const isAdmin = allowlist.includes(email) ? 1 : 0
          db.prepare(
            `insert into members (id, created_at, email, name, role, is_admin, status, github_id, github_username, github_email, email_verified_at, last_login_at)
             values (?,?,?,?,?,?,'active',?,?,?,?,?)`,
          ).run(id, now, email, name, 'member', isAdmin, githubId, githubUsername, email, now, now)
          member = db.prepare('select * from members where id = ?').get(id)
        }
      } else {
        db.prepare('update members set last_login_at = ? where id = ?').run(now, member.id)
      }

      req.session.member = {
        id: member.id,
        email: member.email,
        name: member.name,
        is_admin: Boolean(member.is_admin),
        status: member.status,
      }

      return reply.redirect((env.BASE_PATH === '/' ? '' : (env.BASE_PATH || '')) + '/')
    })
  }

  const googleEnabled = Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET)
  if (!googleEnabled) {
    app.log.warn('Google OAuth not configured (missing GOOGLE_CLIENT_ID/SECRET)')
  } else {
    const callbackUri = `${baseUrl}${basePath}/auth/google/callback`

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
      status: member.status,
    }

    return reply.redirect((env.BASE_PATH === '/' ? '' : (env.BASE_PATH || '')) + '/')
  })
  }

  app.get('/me', async (req) => {
    return { ok: true, member: req.session.member || null }
  })

  // Email + password auth (pending until email verified)
  app.post('/auth/register', async (req, reply) => {
    const body = req.body || {}
    const email = normEmail(body.email)
    const name = body.name != null ? String(body.name).trim() : null
    const password = body.password != null ? String(body.password) : ''

    if (!email || !email.includes('@')) return reply.code(400).send({ ok: false, error: 'invalid_email' })
    if (!password || password.length < 10) return reply.code(400).send({ ok: false, error: 'weak_password' })

    const now = new Date().toISOString()

    const existing = db.prepare('select * from members where email = ?').get(email)
    if (existing) {
      return reply.code(409).send({ ok: false, error: 'email_exists' })
    }

    const id = randomId('mem_')
    const isAdmin = allowlist.includes(email) ? 1 : 0
    const password_hash = await hashPassword(password)

    db.prepare(
      `insert into members (id, created_at, email, name, role, is_admin, status, password_hash)
       values (?,?,?,?,?,?,'pending',?)`,
    ).run(id, now, email, name, 'member', isAdmin, password_hash)

    // create verification token
    const token = makeToken()
    const token_hash = sha256Hex(token)
    const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString() // 24h
    db.prepare(
      `insert into verification_tokens (token_hash, member_id, purpose, expires_at)
       values (?,?, 'email_verify', ?)`,
    ).run(token_hash, id, expires_at)

    const link = verificationLink(env, token)
    const emailRes = await sendEmail(env, {
      to: email,
      subject: 'Verify your Brick City Tech email',
      text: `Verify your email to activate your account:\n\n${link}\n\nIf you didn’t request this, ignore this email.`,
    })

    if (!emailRes.ok) {
      req.log.warn({ email, error: emailRes.error, link }, 'verification email not sent (smtp not configured)')
    }

    return {
      ok: true,
      member: { id, email },
      status: 'pending',
      verification: {
        sent: emailRes.ok,
        // exposed only in dev/no-smtp so we can test flow
        link: emailRes.ok ? undefined : link,
      },
    }
  })

  app.get('/verify-email', async (req, reply) => {
    const token = String((req.query || {}).token || '')
    if (!token) return reply.code(400).send({ ok: false, error: 'missing_token' })

    const token_hash = sha256Hex(token)
    const row = db
      .prepare(
        `select * from verification_tokens
         where token_hash = ? and purpose = 'email_verify' and used_at is null`,
      )
      .get(token_hash)

    if (!row) return reply.code(400).send({ ok: false, error: 'invalid_token' })
    if (new Date(row.expires_at).getTime() < Date.now()) return reply.code(400).send({ ok: false, error: 'expired_token' })

    const now = new Date().toISOString()
    db.prepare('update verification_tokens set used_at = ? where token_hash = ?').run(now, token_hash)
    db.prepare(
      `update members
       set email_verified_at = coalesce(email_verified_at, ?),
           status = 'active'
       where id = ?`,
    ).run(now, row.member_id)

    // Optionally sign them in after verify
    const member = db.prepare('select * from members where id = ?').get(row.member_id)
    req.session.member = {
      id: member.id,
      email: member.email,
      name: member.name,
      is_admin: Boolean(member.is_admin),
      status: member.status,
    }

    return reply.redirect(basePath + '/')
  })

  app.post('/auth/forgot-password', async (req) => {
    const body = req.body || {}
    const email = normEmail(body.email)

    // Always return ok to avoid account enumeration
    const member = db.prepare('select * from members where email = ?').get(email)
    if (!member) return { ok: true }

    const token = makeToken()
    const token_hash = sha256Hex(token)
    const expires_at = new Date(Date.now() + 1000 * 60 * 30).toISOString() // 30 min
    db.prepare(
      `insert into verification_tokens (token_hash, member_id, purpose, expires_at)
       values (?,?, 'password_reset', ?)`,
    ).run(token_hash, member.id, expires_at)

    const link = passwordResetLink(env, token)
    const emailRes = await sendEmail(env, {
      to: member.email,
      subject: 'Reset your Brick City Tech password',
      text: `Reset your password using this link (expires in 30 minutes):\n\n${link}\n\nIf you didn’t request this, you can ignore this email.`,
    })

    if (!emailRes.ok) {
      req.log.warn({ email, error: emailRes.error, link }, 'password reset email not sent')
    }

    return { ok: true, sent: emailRes.ok }
  })

  app.post('/auth/reset-password', async (req, reply) => {
    const body = req.body || {}
    const token = String(body.token || '')
    const newPassword = body.password != null ? String(body.password) : ''

    if (!token) return reply.code(400).send({ ok: false, error: 'missing_token' })
    if (!newPassword || newPassword.length < 10) return reply.code(400).send({ ok: false, error: 'weak_password' })

    const token_hash = sha256Hex(token)
    const row = db
      .prepare(
        `select * from verification_tokens
         where token_hash = ? and purpose = 'password_reset' and used_at is null`,
      )
      .get(token_hash)

    if (!row) return reply.code(400).send({ ok: false, error: 'invalid_token' })
    if (new Date(row.expires_at).getTime() < Date.now()) return reply.code(400).send({ ok: false, error: 'expired_token' })

    const now = new Date().toISOString()
    const password_hash = await hashPassword(newPassword)

    db.prepare('update verification_tokens set used_at = ? where token_hash = ?').run(now, token_hash)
    db.prepare('update members set password_hash = ?, last_login_at = ? where id = ?').run(password_hash, now, row.member_id)

    // Sign in after reset
    const member = db.prepare('select * from members where id = ?').get(row.member_id)
    req.session.member = {
      id: member.id,
      email: member.email,
      name: member.name,
      is_admin: Boolean(member.is_admin),
      status: member.status,
    }

    return { ok: true }
  })

  app.post('/auth/login', async (req, reply) => {
    const body = req.body || {}
    const email = normEmail(body.email)
    const password = body.password != null ? String(body.password) : ''

    const member = db.prepare('select * from members where email = ?').get(email)
    if (!member) return reply.code(401).send({ ok: false, error: 'invalid_credentials' })

    const ok = await verifyPassword(member.password_hash, password)
    if (!ok) return reply.code(401).send({ ok: false, error: 'invalid_credentials' })

    if (member.status !== 'active') {
      return reply.code(403).send({ ok: false, error: 'account_not_active', status: member.status })
    }

    const now = new Date().toISOString()
    db.prepare('update members set last_login_at = ? where id = ?').run(now, member.id)

    req.session.member = {
      id: member.id,
      email: member.email,
      name: member.name,
      is_admin: Boolean(member.is_admin),
      status: member.status,
    }

    return { ok: true, member: req.session.member }
  })

  app.post('/auth/logout', async (req) => {
    req.session.delete()
    return { ok: true }
  })
}
