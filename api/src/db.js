import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

export function openDb(dbPath) {
  const dir = path.dirname(dbPath)
  fs.mkdirSync(dir, { recursive: true })
  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  return db
}

export function ensureSchema(db) {
  // Minimal schema for now: we’re only proving container wiring.
  db.exec(`
    create table if not exists migrations (
      id text primary key,
      created_at text not null
    );
  `)
}
