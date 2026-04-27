import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [err, setErr] = useState('')

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const r = await fetch('/api/blog/posts')
        const j = await r.json()
        if (!alive) return
        if (!r.ok || !j.ok) {
          setErr(j.error || String(r.status))
          return
        }
        setPosts(j.posts || [])
      } catch {
        if (!alive) return
        setErr('network error')
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <>
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / BLOG</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          Blog
        </h1>
        <p className="max-w-2xl text-zinc-400">Articles, notes, and playbooks for a human first future.</p>
      </section>

      <section className="mb-20">
        <SectionHeader title="Posts" code="SEC_01" right="PUBLISHED" />

        {err && <div className="text-red-300 font-mono text-sm">Error: {err}</div>}

        {posts.length === 0 && !err && <div className="text-zinc-400">No posts yet.</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {posts.map((p) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="bg-zinc-950 border border-zinc-800 p-8 hover:bg-white/5 transition-colors">
              <div className="font-mono text-cyan-400 text-[12px] uppercase">{p.published_at || p.created_at}</div>
              <div className="font-['Space_Grotesk'] text-[24px] font-semibold mt-2">{p.title}</div>
              {p.subtitle && <div className="text-zinc-400 mt-1">{p.subtitle}</div>}
              {Array.isArray(p.tags) && p.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 6).map((t) => (
                    <span key={t} className="font-mono text-[11px] text-zinc-300 border border-zinc-800 px-2 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
