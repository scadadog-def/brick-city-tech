import { randomId, sha256Hex, slugify } from './crypto.js'

function isHttpUrl(u) {
  try {
    const x = new URL(u)
    return x.protocol === 'http:' || x.protocol === 'https:'
  } catch {
    return false
  }
}

function normalizeTags(tags) {
  if (!tags) return []
  if (!Array.isArray(tags)) return []
  const out = []
  for (const t of tags) {
    const s = String(t || '').trim()
    if (!s) continue
    out.push(s)
  }
  return out
}

export function registerPodcastRoutes(app, { db }) {
  // Public: list published episodes
  app.get('/podcast/episodes', async (req) => {
    const limit = Math.min(Number(req.query.limit || 50), 200)
    const offset = Math.max(Number(req.query.offset || 0), 0)

    const rows = db
      .prepare(
        `select id, created_at, published_at, status, title, slug, description, summary, tags_json, guests, video_url, audio_url, thumbnail_url
         from podcast_episodes
         where status = 'published'
         order by coalesce(published_at, created_at) desc
         limit ? offset ?`,
      )
      .all(limit, offset)

    return {
      ok: true,
      episodes: rows.map((r) => ({
        ...r,
        tags: JSON.parse(r.tags_json || '[]')
      }))
    }
  })

  // Ingest: create an episode using an API key
  app.post('/ingest/podcast/episodes', async (req, reply) => {
    const apiKey = req.headers['x-api-key']
    if (!apiKey) return reply.code(401).send({ ok: false, error: 'missing_api_key' })

    const keyHash = sha256Hex(String(apiKey))
    const keyRow = db
      .prepare(
        `select id, scopes_json, revoked_at from api_keys where key_hash = ?`,
      )
      .get(keyHash)

    if (!keyRow || keyRow.revoked_at) return reply.code(403).send({ ok: false, error: 'invalid_api_key' })

    const scopes = JSON.parse(keyRow.scopes_json || '[]')
    if (!scopes.includes('podcast:write')) return reply.code(403).send({ ok: false, error: 'insufficient_scope' })

    const body = req.body || {}
    const title = String(body.title || '').trim()
    const description = String(body.description || '').trim()
    const summary = body.summary != null ? String(body.summary).trim() : null
    const guests = body.guests != null ? String(body.guests).trim() : null
    const videoUrl = String(body.video_url || '').trim()
    const audioUrl = body.audio_url != null ? String(body.audio_url).trim() : null
    const thumbnailUrl = body.thumbnail_url != null ? String(body.thumbnail_url).trim() : null
    const tags = normalizeTags(body.tags)
    const status = (body.status || 'published').toString()
    const publishedAt = body.published_at ? String(body.published_at) : null

    if (!title) return reply.code(400).send({ ok: false, error: 'missing_title' })
    if (!description) return reply.code(400).send({ ok: false, error: 'missing_description' })
    if (!isHttpUrl(videoUrl)) return reply.code(400).send({ ok: false, error: 'invalid_video_url' })
    if (audioUrl && !isHttpUrl(audioUrl)) return reply.code(400).send({ ok: false, error: 'invalid_audio_url' })
    if (thumbnailUrl && !isHttpUrl(thumbnailUrl)) return reply.code(400).send({ ok: false, error: 'invalid_thumbnail_url' })

    const id = randomId('ep_')
    const createdAt = new Date().toISOString()

    // slug uniqueness: add suffix if needed
    let slug = slugify(body.slug || title)
    if (!slug) slug = id
    let suffix = 2
    while (db.prepare('select 1 from podcast_episodes where slug = ?').get(slug)) {
      slug = `${slugify(title)}-${suffix}`
      suffix += 1
    }

    db.prepare('update api_keys set last_used_at = ? where id = ?').run(createdAt, keyRow.id)

    db.prepare(
      `insert into podcast_episodes (
        id, created_at, published_at, status, title, slug, description, summary, tags_json, guests,
        video_url, audio_url, thumbnail_url, created_by_api_key_id
      ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    ).run(
      id,
      createdAt,
      publishedAt,
      status,
      title,
      slug,
      description,
      summary,
      JSON.stringify(tags),
      guests,
      videoUrl,
      audioUrl,
      thumbnailUrl,
      keyRow.id,
    )

    return { ok: true, episode: { id, slug } }
  })
}
