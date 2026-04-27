import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader.jsx'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const r = await fetch(`/brick-city-tech/api/blog/posts/${encodeURIComponent(slug)}`)
        const j = await r.json()
        if (!alive) return
        if (!r.ok || !j.ok) {
          setErr(j.error || String(r.status))
          return
        }
        setPost(j.post)
      } catch {
        if (!alive) return
        setErr('network error')
      }
    })()
    return () => {
      alive = false
    }
  }, [slug])

  const html = useMemo(() => {
    if (!post) return ''
    const raw = marked.parse(post.content_markdown || '')
    return DOMPurify.sanitize(raw)
  }, [post])

  return (
    <>
      <div className="mb-8">
        <Link to="/blog" className="font-mono text-cyan-400 text-sm">← Back to Blog</Link>
      </div>

      {err && <div className="text-red-300 font-mono text-sm">Error: {err}</div>}

      {post && (
        <>
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / BLOG / {post.slug}</span>
              <div className="h-px flex-grow bg-zinc-800" />
            </div>
            <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
              {post.title}
            </h1>
            {post.subtitle && <p className="max-w-2xl text-zinc-400">{post.subtitle}</p>}
          </section>

          <section className="mb-20">
            <SectionHeader title="Article" code="SEC_01" right="MARKDOWN" />
            <div className="bg-zinc-900/40 border border-zinc-800 p-8">
              <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </section>
        </>
      )}
    </>
  )
}
