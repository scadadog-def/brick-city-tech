import crypto from 'node:crypto'
import nodemailer from 'nodemailer'

function b64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export function makeToken() {
  return b64url(crypto.randomBytes(32))
}

export function sha256Hex(s) {
  return crypto.createHash('sha256').update(String(s)).digest('hex')
}

export function publicBaseUrl(env) {
  const u = String(env.PUBLIC_BASE_URL || '').replace(/\/$/, '')
  return u
}

export function basePathPrefix(env) {
  const p = env.BASE_PATH || ''
  return p === '/' ? '' : p
}

export function verificationLink(env, token) {
  return `${publicBaseUrl(env)}${basePathPrefix(env)}/verify-email?token=${encodeURIComponent(token)}`
}

export function passwordResetLink(env, token) {
  return `${publicBaseUrl(env)}${basePathPrefix(env)}/reset-password?token=${encodeURIComponent(token)}`
}

export async function sendEmail(env, { to, subject, text }) {
  if (!env.SMTP_HOST || !env.SMTP_FROM || !env.SMTP_USER || !env.SMTP_PASS) {
    return { ok: false, error: 'smtp_not_configured' }
  }

  const port = Number(env.SMTP_PORT || 587)
  const secure = port === 465

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  })

  const info = await transporter.sendMail({
    from: env.SMTP_FROM,
    to,
    subject,
    text,
  })

  return { ok: true, messageId: info.messageId }
}
