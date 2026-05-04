import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import Fastify from 'fastify'
import { registerMemberRoutes } from '../src/members.js'
import { openDb, ensureSchema } from '../src/db.js'
import { sha256Hex } from '../src/crypto.js'

function makeTempDbPath() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bct-api-test-'))
  return path.join(dir, 'test.sqlite')
}

async function createTestApp(envOverrides = {}) {
  const dbPath = makeTempDbPath()
  const db = openDb(dbPath)
  ensureSchema(db)

  const app = Fastify({ logger: false })
  app.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
    try {
      done(null, body ? JSON.parse(body) : {})
    } catch (err) {
      done(err)
    }
  })

  const env = {
    PUBLIC_BASE_URL: 'https://example.test',
    SMTP_HOST: '',
    SMTP_PORT: '',
    SMTP_USER: '',
    SMTP_PASS: '',
    SMTP_SECURE: '',
    SMTP_FROM: '',
    ...envOverrides,
  }

  registerMemberRoutes(app, { db, env })
  await app.ready()
  return { app, db }
}

test('POST /signup creates member and verification token record', async (t) => {
  const { app, db } = await createTestApp()
  t.after(async () => app.close())

  const res = await app.inject({
    method: 'POST',
    url: '/signup',
    payload: {
      email: 'person@example.com',
      name: 'Test Person',
      role: 'member',
    },
  })

  assert.equal(res.statusCode, 200)
  const body = res.json()
  assert.equal(body.ok, true)
  assert.equal(body.member.email, 'person@example.com')
  assert.equal(body.verification.required, true)

  const member = db.prepare('select id, email from members where email = ?').get('person@example.com')
  assert.ok(member)

  const tokenRow = db
    .prepare("select member_id, purpose, used_at from verification_tokens where member_id = ? and purpose = 'email_verify'")
    .get(member.id)
  assert.ok(tokenRow)
  assert.equal(tokenRow.member_id, member.id)
  assert.equal(tokenRow.purpose, 'email_verify')
  assert.equal(tokenRow.used_at, null)
})

test('GET /verify-email marks member email as verified', async (t) => {
  const { app, db } = await createTestApp()
  t.after(async () => app.close())

  const now = new Date()
  const memberId = 'mem_test_verify'
  db.prepare(
    `insert into members (id, created_at, email, name, role, interest, notes, status)
     values (?,?,?,?,?,?,?, 'active')`,
  ).run(memberId, now.toISOString(), 'verify@example.com', 'Verifier', 'member', null, null)

  const rawToken = 'known-test-token'
  const tokenHash = sha256Hex(rawToken)
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000).toISOString()
  db.prepare(
    `insert into verification_tokens (token_hash, member_id, purpose, expires_at, used_at)
     values (?, ?, 'email_verify', ?, null)`,
  ).run(tokenHash, memberId, expiresAt)

  const res = await app.inject({
    method: 'GET',
    url: `/verify-email?token=${encodeURIComponent(rawToken)}`,
  })

  assert.equal(res.statusCode, 200)
  const body = res.json()
  assert.equal(body.ok, true)
  assert.equal(body.verified, true)

  const verified = db.prepare('select email_verified_at from members where id = ?').get(memberId)
  assert.ok(verified.email_verified_at)

  const consumed = db.prepare('select used_at from verification_tokens where token_hash = ?').get(tokenHash)
  assert.ok(consumed.used_at)
})
