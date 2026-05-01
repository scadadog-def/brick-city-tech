import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [verifyLink, setVerifyLink] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setMsg('')
    setVerifyLink('')

    if (!password || password.length < 10) {
      setMsg('Password must be at least 10 characters.')
      return
    }

    setBusy(true)
    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.ok) {
        setMsg(`Registration failed: ${data?.error || res.status}`)
        return
      }

      setMsg('Account created. Check your email for a verification link.')
      if (data?.verification?.link) {
        setVerifyLink(data.verification.link)
      }

      setName('')
      setEmail('')
      setPassword('')
    } catch {
      setMsg('Registration failed: network error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="max-w-xl">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-zinc-100 font-mono uppercase tracking-widest">/ AUTH / REGISTER</span>
        <div className="h-px flex-grow bg-zinc-800" />
      </div>
      <h1 className="font-['Space_Grotesk'] text-[42px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
        Register
      </h1>
      <p className="text-zinc-400 mb-8">Create an account. You’ll need to verify your email before you can log in.</p>

      <div className="bg-zinc-900/40 border border-zinc-800 p-8">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <div className="font-mono text-[12px] text-zinc-500 uppercase">Name (optional)</div>
            <input
              className="mt-2 w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

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
              placeholder="min 10 characters"
              required
              autoComplete="new-password"
            />
            <div className="text-zinc-500 text-xs mt-2">We will add captcha + stronger requirements next.</div>
          </div>

          <button
            className="bg-cyan-400 text-black font-['Space_Grotesk'] font-bold uppercase px-8 py-4 active:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
            type="submit"
            disabled={busy}
          >
            {busy ? 'CREATING…' : 'CREATE ACCOUNT'}
          </button>

          {msg && <div className="text-zinc-300">{msg}</div>}

          {verifyLink && (
            <div className="mt-2 bg-zinc-950 border border-zinc-800 p-4">
              <div className="font-mono text-cyan-400 text-[12px] uppercase">Dev helper</div>
              <div className="text-zinc-400 mt-2 text-sm">
                SMTP failed or is disabled, so the API returned a verification link for testing:
              </div>
              <a className="block mt-2 text-cyan-400 break-all hover:underline" href={verifyLink}>
                {verifyLink}
              </a>
            </div>
          )}

          <div className="text-zinc-400 text-sm">
            Already have an account? <Link className="text-cyan-400 hover:underline" to="/login">Login</Link>
          </div>
        </form>
      </div>
    </section>
  )
}
