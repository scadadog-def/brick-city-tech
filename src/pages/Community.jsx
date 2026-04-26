import { useState } from 'react'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Community() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'community',
    interest: 'workshops',
    notes: ''
  })
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  async function addMember(e) {
    e.preventDefault()
    setMsg('')

    const email = (form.email || '').trim().toLowerCase()
    if (!email || !email.includes('@')) {
      setMsg('Please enter a valid email.')
      return
    }

    setBusy(true)
    try {
      const res = await fetch('/brick-city-tech/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          interest: form.interest,
          notes: form.notes
        })
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setMsg(`Signup failed: ${data.error || res.status}`)
        return
      }

      setForm({ ...form, name: '', email: '', notes: '' })
      if (data.verification?.configured) {
        setMsg('Saved. Please check your email to verify your address (verification is enabled).')
      } else {
        setMsg('Saved. Email verification will be enabled soon.')
      }
    } catch (err) {
      setMsg('Signup failed: network error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / COMMUNITY</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          Community
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Sign up for updates, workshops, volunteer opportunities, and build sessions.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-20">
        <div className="lg:col-span-4 bg-zinc-950 border border-zinc-800 p-8 flex flex-col justify-between">
          <div>
            <SectionHeader title="Sign up" code="SEC_01" right="INTAKE" />
            <p className="text-zinc-400">
              Signups are now stored in our backend membership table. Email verification will be enabled once SMTP is configured.
            </p>
          </div>
          <div className="mt-10">
            {msg && <div className="text-zinc-400 mt-4">{msg}</div>}
          </div>
        </div>

        <div className="lg:col-span-8 bg-zinc-900/40 border border-zinc-800 p-8">
          <form onSubmit={addMember} className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div>
              <div className="font-mono text-[12px] text-zinc-500 uppercase">Name</div>
              <input className="mt-2 w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            </div>
            <div>
              <div className="font-mono text-[12px] text-zinc-500 uppercase">Email</div>
              <input className="mt-2 w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required />
            </div>
            <div>
              <div className="font-mono text-[12px] text-zinc-500 uppercase">Role</div>
              <select className="mt-2 w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="community">Community member</option>
                <option value="student">Student</option>
                <option value="educator">Educator</option>
                <option value="business">Business owner/operator</option>
                <option value="mentor">Volunteer / mentor</option>
                <option value="sponsor">Sponsor</option>
              </select>
            </div>
            <div>
              <div className="font-mono text-[12px] text-zinc-500 uppercase">Primary interest</div>
              <select className="mt-2 w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                <option value="workshops">Workshops</option>
                <option value="business">Business AI upgrades</option>
                <option value="youth">Youth / STEM</option>
                <option value="hack">Hack sessions</option>
                <option value="ag">Ag-tech</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <div className="font-mono text-[12px] text-zinc-500 uppercase">Notes</div>
              <input className="mt-2 w-full bg-zinc-900 border border-zinc-700 p-3 text-zinc-100" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="What are you hoping to learn or build?" />
            </div>

            <div className="md:col-span-2">
              <button
                className="bg-cyan-400 text-black font-['Space_Grotesk'] font-bold uppercase px-8 py-4 active:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                type="submit"
                disabled={busy}
              >
                {busy ? 'SAVING…' : 'SAVE SIGNUP'}
              </button>
            </div>
          </form>

          <div className="mt-10 bg-zinc-950 border border-zinc-800 p-6">
            <div className="font-mono text-cyan-400 text-[12px] uppercase">Privacy</div>
            <div className="text-zinc-400 mt-2">
              We don’t display member emails publicly. Admin access and exports will live in the Admin panel once Google login is enabled.
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
