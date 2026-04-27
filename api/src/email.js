import crypto from 'node:crypto'

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
  return `${publicBaseUrl(env)}${basePathPrefix(env)}/api/verify-email?token=${encodeURIComponent(token)}`
}

export async function sendEmail(env, { to, subject, text }) {
  // We purposely keep this as a stub until SMTP is configured.
  // For pending-account flow in dev, we can log the link instead.
  if (!env.SMTP_HOST || !env.SMTP_FROM) {
    return { ok: false, error: 'smtp_not_configured' }
  }

  // Minimal SMTP implementation can be added later (nodemailer).
  return { ok: false, error: 'smtp_not_implemented' }
}
