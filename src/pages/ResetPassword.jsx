import { useMemo, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  const [params] = useSearchParams()
  const nav = useNavigate()
  const token = useMemo(() => params.get('token') || '', [params])

  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setMsg('')

    if (!token) {
      setMsg('Missing token. Use the link from your email.')
      return
    }

    if (!password || password.length < 10) {
      setMsg('Password must be at least 10 characters.')
      return
    }

    setBusy(true)
    try {
      const res = await fetch('/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        setMsg(`Reset failed: ${data?.error || res.status}`)
        return
      }

      setMsg('Password reset. You are now logged in.')
      setTimeout(() => nav('/'), 600)
    } catch {
      setMsg('Reset failed: network error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="max-w-xl">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-zinc-100 font-mono uppercase tracking-widest">/ AUTH / RESET</span>
        <div className="h-px flex-grow bg-zinc-800" />
      </div>
      <h1 className="font-['Space_Grotesk'] text-[42px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
        Reset password
      </h1>
      <p className="text-zinc-400 mb-8">Set a new password for your account.</p>

      <div className="bg-zinc-900/40 border border-zinc-800 p-8">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <div className="font-mono text-[12px] text-zinc-500 uppercase">New password</div>
            <input
              className="mt-2 w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="min 10 characters"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            className="bg-cyan-400 text-black font-['Space_Grotesk'] font-bold uppercase px-8 py-4 active:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
            type="submit"
            disabled={busy}
          >
            {busy ? 'RESETTING…' : 'RESET PASSWORD'}
          </button>

          {msg && <div className="text-zinc-300">{msg}</div>}

          <div className="text-zinc-400 text-sm">
            Back to <Link className="text-cyan-400 hover:underline" to="/login">Login</Link>
          </div>
        </form>
      </div>
    </section>
  )
}
