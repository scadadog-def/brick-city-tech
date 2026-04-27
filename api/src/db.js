import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

function readSql(relPath) {
  const p = new URL(relPath, import.meta.url)
  return fs.readFileSync(p, 'utf-8')
}

export function openDb(dbPath) {
  const dir = path.dirname(dbPath)
  fs.mkdirSync(dir, { recursive: true })
  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  return db
}

export function ensureSchema(db) {
  // Bootstrap migrations table first
  db.exec(`
    create table if not exists migrations (
      id text primary key,
      created_at text not null
    );
  `)

  function apply(id, rel) {
    const has = db.prepare('select 1 from migrations where id = ?').get(id)
    if (has) return
    const sql = readSql(rel)
    db.exec(sql)
    db.prepare('insert into migrations (id, created_at) values (?, ?)').run(id, new Date().toISOString())
  }

  apply('001_init', './migrations/001_init.sql')
  apply('002_blog', './migrations/002_blog.sql')
}
