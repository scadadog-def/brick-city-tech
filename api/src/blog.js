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

export function registerBlogRoutes(app, { db }) {
  // Public: list published posts
  app.get('/blog/posts', async (req) => {
    const limit = Math.min(Number(req.query.limit || 50), 200)
    const offset = Math.max(Number(req.query.offset || 0), 0)

    const rows = db
      .prepare(
        `select id, created_at, published_at, status, title, slug, subtitle, tags_json, cover_image_url
         from blog_posts
         where status = 'published'
         order by coalesce(published_at, created_at) desc
         limit ? offset ?`,
      )
      .all(limit, offset)

    return {
      ok: true,
      posts: rows.map((r) => ({
        ...r,
        tags: JSON.parse(r.tags_json || '[]'),
      })),
    }
  })

  // Public: get a single published post by slug
  app.get('/blog/posts/:slug', async (req, reply) => {
    const slug = String(req.params.slug || '')
    const row = db
      .prepare(
        `select id, created_at, published_at, status, title, slug, subtitle, tags_json, cover_image_url, content_markdown
         from blog_posts
         where slug = ? and status = 'published'`,
      )
      .get(slug)

    if (!row) return reply.code(404).send({ ok: false, error: 'not_found' })

    return {
      ok: true,
      post: {
        ...row,
        tags: JSON.parse(row.tags_json || '[]'),
      },
    }
  })

  // Ingest: create a post using an API key
  app.post('/ingest/blog/posts', async (req, reply) => {
    const apiKey = req.headers['x-api-key']
    if (!apiKey) return reply.code(401).send({ ok: false, error: 'missing_api_key' })

    const keyHash = sha256Hex(String(apiKey))
    const keyRow = db.prepare('select id, scopes_json, revoked_at from api_keys where key_hash = ?').get(keyHash)
    if (!keyRow || keyRow.revoked_at) return reply.code(403).send({ ok: false, error: 'invalid_api_key' })

    const scopes = JSON.parse(keyRow.scopes_json || '[]')
    if (!scopes.includes('blog:write')) return reply.code(403).send({ ok: false, error: 'insufficient_scope' })

    const body = req.body || {}
    const title = String(body.title || '').trim()
    const subtitle = body.subtitle != null ? String(body.subtitle).trim() : null
    const coverImageUrl = body.cover_image_url != null ? String(body.cover_image_url).trim() : null
    const contentMarkdown = String(body.content_markdown || '').trim()
    const tags = normalizeTags(body.tags)
    const status = (body.status || 'published').toString()
    const publishedAt = body.published_at ? String(body.published_at) : null

    if (!title) return reply.code(400).send({ ok: false, error: 'missing_title' })
    if (!contentMarkdown) return reply.code(400).send({ ok: false, error: 'missing_content_markdown' })
    if (coverImageUrl && !isHttpUrl(coverImageUrl)) return reply.code(400).send({ ok: false, error: 'invalid_cover_image_url' })

    const id = randomId('post_')
    const createdAt = new Date().toISOString()

    let slug = slugify(body.slug || title)
    if (!slug) slug = id
    let suffix = 2
    while (db.prepare('select 1 from blog_posts where slug = ?').get(slug)) {
      slug = `${slugify(title)}-${suffix}`
      suffix += 1
    }

    db.prepare('update api_keys set last_used_at = ? where id = ?').run(createdAt, keyRow.id)

    db.prepare(
      `insert into blog_posts (
        id, created_at, published_at, status, title, slug, subtitle, tags_json, cover_image_url, content_markdown, created_by_api_key_id
      ) values (?,?,?,?,?,?,?,?,?,?,?)`,
    ).run(
      id,
      createdAt,
      publishedAt,
      status,
      title,
      slug,
      subtitle,
      JSON.stringify(tags),
      coverImageUrl,
      contentMarkdown,
      keyRow.id,
    )

    return { ok: true, post: { id, slug } }
  })
}
