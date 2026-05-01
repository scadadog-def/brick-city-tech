import crypto from 'node:crypto'
import cookie from '@fastify/cookie'
import session from '@fastify/session'
import oauthPlugin from '@fastify/oauth2'
import nodemailer from 'nodemailer'
import { hashPassword, randomId, sha256Hex, verifyPassword } from './crypto.js'

function normEmail(e) { return String(e || '').trim().toLowerCase() }
function normUsername(s) { return String(s || '').trim().toLowerCase() }
function parseAllowlist(s) {
  return String(s || '').split(',').map((x) => x.trim().toLowerCase()).filter(Boolean)
}
function boolFromEnv(v, d = false) {
  if (v == null) return d
  const n = String(v).trim().toLowerCase()
  return n === '1' || n === 'true' || n === 'yes'
}
function sessionMember(member) {
  return { id: member.id, email: member.email, name: member.name, is_admin: Boolean(member.is_admin) }
}

export async function registerAuth(app, { db, env }) {
  const allowlist = parseAllowlist(env.ADMIN_EMAIL_ALLOWLIST)
  await app.register(cookie)
  await app.register(session, {
    secret: env.SESSION_SECRET,
    cookie: { path: env.BASE_PATH || '/', httpOnly: true, sameSite: 'lax', secure: env.PUBLIC_BASE_URL?.startsWith('https://') || false },
  })

  const smtpConfigured = Boolean(env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS && env.PUBLIC_BASE_URL)
  const smtpFrom = env.SMTP_FROM || env.SMTP_USER
  const transport = smtpConfigured
    ? nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        secure: boolFromEnv(env.SMTP_SECURE, Number(env.SMTP_PORT) === 465),
        auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      })
    : null

  app.post('/auth/register', async (req, reply) => {
    const email = normEmail(req.body?.email)
    const username = normUsername(req.body?.username)
    const password = String(req.body?.password || '')
    const name = req.body?.name != null ? String(req.body.name).trim() : null
    if (!email || !email.includes('@')) return reply.code(400).send({ ok: false, error: 'invalid_email' })
    if (!username || username.length < 3) return reply.code(400).send({ ok: false, error: 'invalid_username' })
    if (password.length < 8) return reply.code(400).send({ ok: false, error: 'weak_password' })
    if (db.prepare('select id from members where email = ?').get(email)) return reply.code(409).send({ ok: false, error: 'email_taken' })
    if (db.prepare('select id from members where username = ?').get(username)) return reply.code(409).send({ ok: false, error: 'username_taken' })

    const now = new Date().toISOString()
    const id = randomId('mem_')
    const isAdmin = allowlist.includes(email) ? 1 : 0
    db.prepare(`insert into members (id, created_at, email, name, role, is_admin, status, username, password_hash, password_updated_at) values (?,?,?,?,?,?,'active',?,?,?)`)
      .run(id, now, email, name, 'member', isAdmin, username, hashPassword(password), now)
    const member = db.prepare('select * from members where id = ?').get(id)
    req.session.member = sessionMember(member)
    return { ok: true, member: req.session.member }
  })

  app.post('/auth/login', async (req, reply) => {
    const login = String(req.body?.login || '').trim().toLowerCase()
    const password = String(req.body?.password || '')
    if (!login || !password) return reply.code(400).send({ ok: false, error: 'missing_credentials' })
    const member = db.prepare('select * from members where email = ? or username = ?').get(login, login)
    if (!member || !member.password_hash || !verifyPassword(password, member.password_hash)) return reply.code(401).send({ ok: false, error: 'invalid_credentials' })
    db.prepare('update members set last_login_at = ? where id = ?').run(new Date().toISOString(), member.id)
    req.session.member = sessionMember(member)
    return { ok: true, member: req.session.member }
  })

  app.post('/auth/forgot-password', async (req) => {
    const email = normEmail(req.body?.email)
    if (!email || !email.includes('@')) return { ok: true }
    const member = db.prepare('select id, email from members where email = ?').get(email)
    if (!member) return { ok: true }
    const rawToken = crypto.randomBytes(32).toString('hex')
    const tokenHash = sha256Hex(rawToken)
    const now = new Date().toISOString()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30).toISOString()
    db.prepare(`update verification_tokens set used_at = ? where member_id = ? and purpose = 'password_reset' and used_at is null`).run(now, member.id)
    db.prepare(`insert into verification_tokens (token_hash, member_id, purpose, expires_at, used_at) values (?, ?, 'password_reset', ?, null)`).run(tokenHash, member.id, expiresAt)
    if (transport && smtpFrom) {
      const resetUrl = `${String(env.PUBLIC_BASE_URL || '').replace(/\/+$/, '')}/login?reset=${encodeURIComponent(rawToken)}`
      try {
        await transport.sendMail({ from: smtpFrom, to: member.email, subject: 'Reset your Brick City Tech password', text: `Reset link:\n${resetUrl}`, html: `<a href="${resetUrl}">${resetUrl}</a>` })
      } catch (err) {
        req.log.error({ err }, 'failed to send password reset email')
      }
    }
    return { ok: true }
  })

  app.post('/auth/reset-password', async (req, reply) => {
    const token = String(req.body?.token || '').trim()
    const username = normUsername(req.body?.username)
    const password = String(req.body?.password || '')
    if (!token) return reply.code(400).send({ ok: false, error: 'missing_token' })
    if (!username || username.length < 3) return reply.code(400).send({ ok: false, error: 'invalid_username' })
    if (password.length < 8) return reply.code(400).send({ ok: false, error: 'weak_password' })
    const row = db.prepare(`select member_id, expires_at, used_at from verification_tokens where token_hash = ? and purpose = 'password_reset'`).get(sha256Hex(token))
    if (!row || row.used_at) return reply.code(400).send({ ok: false, error: 'invalid_token' })
    if (row.expires_at < new Date().toISOString()) return reply.code(400).send({ ok: false, error: 'token_expired' })
    const usernameOwner = db.prepare('select id from members where username = ?').get(username)
    if (usernameOwner && usernameOwner.id !== row.member_id) return reply.code(409).send({ ok: false, error: 'username_taken' })
    const now = new Date().toISOString()
    db.prepare('update members set username = ?, password_hash = ?, password_updated_at = ? where id = ?').run(username, hashPassword(password), now, row.member_id)
    db.prepare('update verification_tokens set used_at = ? where token_hash = ?').run(now, sha256Hex(token))
    const member = db.prepare('select * from members where id = ?').get(row.member_id)
    req.session.member = sessionMember(member)
    return { ok: true, member: req.session.member }
  })

  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    const callbackUri = `${env.PUBLIC_BASE_URL}${env.BASE_PATH}/api/auth/google/callback`
    await app.register(oauthPlugin, {
      name: 'googleOAuth2',
      scope: ['openid', 'email', 'profile'],
      credentials: { client: { id: env.GOOGLE_CLIENT_ID, secret: env.GOOGLE_CLIENT_SECRET }, auth: oauthPlugin.GOOGLE_CONFIGURATION },
      startRedirectPath: '/auth/google/start',
      callbackUri,
    })
  } else {
    app.get('/auth/google/start', async (_req, reply) => reply.code(404).send({ ok: false, error: 'google_oauth_not_configured' }))
  }

  app.get('/me', async (req) => ({ ok: true, member: req.session.member || null }))
  app.post('/auth/logout', async (req) => { req.session.delete(); return { ok: true } })
}
