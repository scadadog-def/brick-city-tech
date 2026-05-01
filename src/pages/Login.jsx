import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setMsg('')
    setBusy(true)
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        if (data?.error === 'account_not_active') {
          setMsg('Account pending. Please verify your email first.')
        } else {
          setMsg(`Login failed: ${data?.error || res.status}`)
        }
        return
      }

      nav('/')
    } catch {
      setMsg('Login failed: network error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="max-w-xl">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-zinc-100 font-mono uppercase tracking-widest">/ AUTH / LOGIN</span>
        <div className="h-px flex-grow bg-zinc-800" />
      </div>
      <h1 className="font-['Space_Grotesk'] text-[42px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
        Login
      </h1>
      <p className="text-zinc-400 mb-8">Use your email + password. If your account is pending, verify your email first.</p>

      <div className="bg-zinc-900/40 border border-zinc-800 p-8">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <div className="font-mono text-[12px] text-zinc-500 uppercase">Email</div>
            <input
              className="mt-2 w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <div className="font-mono text-[12px] text-zinc-500 uppercase">Password</div>
            <input
              className="mt-2 w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            className="bg-cyan-400 text-black font-['Space_Grotesk'] font-bold uppercase px-8 py-4 active:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
            type="submit"
            disabled={busy}
          >
            {busy ? 'LOGGING IN…' : 'LOGIN'}
          </button>

          {msg && <div className="text-zinc-300">{msg}</div>}

          <div className="text-zinc-400 text-sm">
            Don’t have an account? <Link className="text-cyan-400 hover:underline" to="/register">Register</Link>
          </div>
        </form>
      </div>
    </section>
  )
}
