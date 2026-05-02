import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
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

      // Force reload so header session state updates immediately
      window.location.href = '/'
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

          <a
            href="/auth/github/start"
            className="border-2 border-zinc-700 text-zinc-200 font-['Space_Grotesk'] font-bold uppercase px-6 py-3 hover:bg-white hover:text-black transition-all text-center flex items-center justify-center gap-3"
            aria-label="Login with GitHub"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5 fill-current">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <span>Login with GitHub</span>
          </a>

          {msg && <div className="text-zinc-300">{msg}</div>}

          <div className="text-zinc-400 text-sm flex flex-col gap-2">
            <div>
              Don’t have an account? <Link className="text-cyan-400 hover:underline" to="/register">Register</Link>
            </div>
            <div>
              Forgot password? <Link className="text-cyan-400 hover:underline" to="/forgot-password">Reset it</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
