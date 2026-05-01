import crypto from 'node:crypto'
import nodemailer from 'nodemailer'
import { randomId, sha256Hex } from './crypto.js'

function normEmail(e) {
  return String(e || '').trim().toLowerCase()
}

function boolFromEnv(v, defaultValue = false) {
  if (v == null) return defaultValue
  const normalized = String(v).trim().toLowerCase()
  return normalized === '1' || normalized === 'true' || normalized === 'yes'
}

function toVerifyUrl(baseUrl, token) {
  const cleanBase = String(baseUrl || '').replace(/\/+$/, '')
  return `${cleanBase}/api/verify-email?token=${encodeURIComponent(token)}`
}

export function registerMemberRoutes(app, { db, env }) {
  const smtpConfigured = Boolean(
    env.SMTP_HOST &&
    env.SMTP_PORT &&
    env.SMTP_USER &&
    env.SMTP_PASS &&
    env.PUBLIC_BASE_URL,
  )
  const smtpFrom = env.SMTP_FROM || env.SMTP_USER
  const smtpSecure = boolFromEnv(env.SMTP_SECURE, Number(env.SMTP_PORT) === 465)
  const transport = smtpConfigured
    ? nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        secure: smtpSecure,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      })
    : null

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

    const rawToken = crypto.randomBytes(32).toString('hex')
    const tokenHash = sha256Hex(rawToken)
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()

    // Rotate old unused verification tokens for this member.
    db.prepare(
      `update verification_tokens
       set used_at = ?
       where member_id = ? and purpose = 'email_verify' and used_at is null`,
    ).run(now, id)

    db.prepare(
      `insert into verification_tokens (token_hash, member_id, purpose, expires_at, used_at)
       values (?, ?, 'email_verify', ?, null)`,
    ).run(tokenHash, id, expiresAt)

    const verificationConfigured = Boolean(transport && smtpFrom)
    const verifyUrl = verificationConfigured ? toVerifyUrl(env.PUBLIC_BASE_URL, rawToken) : null
    let emailSent = false
    let emailError = null

    if (verificationConfigured) {
      try {
        await transport.sendMail({
          from: smtpFrom,
          to: email,
          subject: 'Confirm your Brick City Tech registration',
          text: `Welcome to Brick City Tech!\n\nPlease confirm your email by visiting:\n${verifyUrl}\n\nThis link expires in 24 hours.`,
          html: `<p>Welcome to Brick City Tech!</p><p>Please confirm your email by clicking <a href="${verifyUrl}">this verification link</a>.</p><p>This link expires in 24 hours.</p>`,
        })
        emailSent = true
      } catch (err) {
        req.log.error({ err }, 'failed to send verification email')
        emailError = 'send_failed'
      }
    }

    return {
      ok: true,
      member: { id, email },
      verification: {
        required: true,
        configured: verificationConfigured,
        emailSent,
        ...(emailError ? { error: emailError } : {}),
      },
    }
  })

  app.get('/verify-email', async (req, reply) => {
    const token = String(req.query?.token || '').trim()
    if (!token) return reply.code(400).send({ ok: false, error: 'missing_token' })

    const tokenHash = sha256Hex(token)
    const row = db
      .prepare(
        `select token_hash, member_id, expires_at, used_at
         from verification_tokens
         where token_hash = ? and purpose = 'email_verify'`,
      )
      .get(tokenHash)

    if (!row) return reply.code(400).send({ ok: false, error: 'invalid_token' })
    if (row.used_at) return reply.code(400).send({ ok: false, error: 'token_already_used' })

    const nowIso = new Date().toISOString()
    if (row.expires_at < nowIso) return reply.code(400).send({ ok: false, error: 'token_expired' })

    db.prepare(
      `update members
       set email_verified_at = coalesce(email_verified_at, ?)
       where id = ?`,
    ).run(nowIso, row.member_id)

    db.prepare('update verification_tokens set used_at = ? where token_hash = ?').run(nowIso, tokenHash)

    return { ok: true, verified: true }
  })
}
