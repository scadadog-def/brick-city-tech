import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Login({ onAuthSuccess }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const resetToken = searchParams.get('reset') || ''
  const initialMode = useMemo(() => (resetToken ? 'reset' : 'login'), [resetToken])
  const [mode, setMode] = useState(initialMode)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const [loginForm, setLoginForm] = useState({ login: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', username: '', password: '' })
  const [forgotEmail, setForgotEmail] = useState('')
  const [resetForm, setResetForm] = useState({ token: resetToken, username: '', password: '' })

  async function submitLogin(e) {
    e.preventDefault()
    setBusy(true)
    setMsg('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginForm),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setMsg(`Login failed: ${data.error || res.status}`)
        return
      }
      onAuthSuccess?.()
      navigate('/account')
    } catch {
      setMsg('Login failed: network error')
    } finally {
      setBusy(false)
    }
  }

  async function submitRegister(e) {
    e.preventDefault()
    setBusy(true)
    setMsg('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(registerForm),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setMsg(`Registration failed: ${data.error || res.status}`)
        return
      }
      onAuthSuccess?.()
      navigate('/account')
    } catch {
      setMsg('Registration failed: network error')
    } finally {
      setBusy(false)
    }
  }

  async function submitForgot(e) {
    e.preventDefault()
    setBusy(true)
    setMsg('')
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: forgotEmail }),
      })
      setMsg('If that email exists, a reset link was sent.')
    } catch {
      setMsg('Unable to send reset email right now.')
    } finally {
      setBusy(false)
    }
  }

  async function submitReset(e) {
    e.preventDefault()
    setBusy(true)
    setMsg('')
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(resetForm),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setMsg(`Reset failed: ${data.error || res.status}`)
        return
      }
      onAuthSuccess?.()
      setMsg('Credentials updated. Redirecting to account...')
      navigate('/account')
    } catch {
      setMsg('Reset failed: network error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="max-w-2xl">
      <h1 className="font-['Space_Grotesk'] text-4xl uppercase text-cyan-400">Login</h1>
      <div className="mt-4 flex gap-2 flex-wrap">
        <button className="px-3 py-2 border border-zinc-700 text-sm" onClick={() => setMode('login')} type="button">Login</button>
        <button className="px-3 py-2 border border-zinc-700 text-sm" onClick={() => setMode('register')} type="button">Register</button>
        <button className="px-3 py-2 border border-zinc-700 text-sm" onClick={() => setMode('forgot')} type="button">Forgot password</button>
        <a className="px-3 py-2 border border-zinc-700 text-sm hover:text-cyan-400" href="/api/auth/google/start">Login with Google</a>
      </div>

      <div className="mt-6 border border-zinc-800 bg-zinc-950 p-6">
        {mode === 'login' && (
          <form className="space-y-4" onSubmit={submitLogin}>
            <input className="w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" placeholder="Email or username" value={loginForm.login} onChange={(e) => setLoginForm({ ...loginForm, login: e.target.value })} />
            <input className="w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" placeholder="Password" type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            <button className="bg-cyan-400 text-black font-bold px-6 py-3 uppercase disabled:opacity-50" disabled={busy} type="submit">Sign In</button>
          </form>
        )}

        {mode === 'register' && (
          <form className="space-y-4" onSubmit={submitRegister}>
            <input className="w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" placeholder="Name" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} />
            <input className="w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" placeholder="Email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
            <input className="w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" placeholder="Username" value={registerForm.username} onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })} />
            <input className="w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" placeholder="Password (min 8 chars)" type="password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
            <button className="bg-cyan-400 text-black font-bold px-6 py-3 uppercase disabled:opacity-50" disabled={busy} type="submit">Create Account</button>
          </form>
        )}

        {mode === 'forgot' && (
          <form className="space-y-4" onSubmit={submitForgot}>
            <input className="w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" placeholder="Your email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
            <button className="bg-cyan-400 text-black font-bold px-6 py-3 uppercase disabled:opacity-50" disabled={busy} type="submit">Send Reset Link</button>
          </form>
        )}

        {mode === 'reset' && (
          <form className="space-y-4" onSubmit={submitReset}>
            <input className="w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" placeholder="Reset token" value={resetForm.token} onChange={(e) => setResetForm({ ...resetForm, token: e.target.value })} />
            <input className="w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" placeholder="New username" value={resetForm.username} onChange={(e) => setResetForm({ ...resetForm, username: e.target.value })} />
            <input className="w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" placeholder="New password (min 8 chars)" type="password" value={resetForm.password} onChange={(e) => setResetForm({ ...resetForm, password: e.target.value })} />
            <button className="bg-cyan-400 text-black font-bold px-6 py-3 uppercase disabled:opacity-50" disabled={busy} type="submit">Update Credentials</button>
          </form>
        )}
        {msg && <p className="mt-4 text-zinc-400">{msg}</p>}
      </div>
    </section>
  )
}
