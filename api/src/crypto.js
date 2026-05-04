import crypto from 'node:crypto'

export function sha256Hex(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex')
}

export function randomId(prefix = '') {
  return prefix + crypto.randomUUID()
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const digest = crypto.scryptSync(String(password), salt, 64).toString('hex')
  return `scrypt$${salt}$${digest}`
}

export function verifyPassword(password, packedHash) {
  const raw = String(packedHash || '')
  const parts = raw.split('$')
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false
  const salt = parts[1]
  const expected = Buffer.from(parts[2], 'hex')
  const actual = crypto.scryptSync(String(password), salt, 64)
  if (actual.length !== expected.length) return false
  return crypto.timingSafeEqual(actual, expected)
}

export function slugify(s) {
  return (s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
