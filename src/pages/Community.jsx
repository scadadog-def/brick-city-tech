import { useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import { exportMembersCSV, exportMembersJSON, loadMembers, saveMembers } from '../components/memberStore.js'

export default function Community() {
  const [members, setMembers] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'community',
    interest: 'workshops',
    notes: ''
  })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setMembers(loadMembers())
  }, [])

  useEffect(() => {
    saveMembers(members)
  }, [members])

  function addMember(e) {
    e.preventDefault()
    setMsg('')
    const email = (form.email || '').trim().toLowerCase()
    if (!email || !email.includes('@')) {
      setMsg('Please enter a valid email.')
      return
    }
    const name = (form.name || '').trim()
    const rec = {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
      name,
      email,
      role: form.role,
      interest: form.interest,
      notes: (form.notes || '').trim()
    }
    setMembers([rec, ...members])
    setForm({ ...form, name: '', email: '', notes: '' })
    setMsg('Saved. Thank you — we’ll follow up soon.')
  }

  function clearMembers() {
    if (!confirm('Clear all saved member records from this browser?')) return
    setMembers([])
    setMsg('Cleared local records.')
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
              This currently saves to a local members table in your browser. Next step is wiring to a shared backend list.
            </p>
          </div>
          <div className="mt-10">
            <div className="font-mono text-cyan-400 text-[12px] uppercase">Exports</div>
            <div className="flex flex-wrap gap-3 mt-3">
              <button
                onClick={() => exportMembersCSV(members)}
                className="border border-zinc-700 py-3 px-4 font-['Space_Grotesk'] font-bold hover:bg-white hover:text-black transition-all"
              >
                EXPORT CSV
              </button>
              <button
                onClick={() => exportMembersJSON(members)}
                className="border border-zinc-700 py-3 px-4 font-['Space_Grotesk'] font-bold hover:bg-white hover:text-black transition-all"
              >
                EXPORT JSON
              </button>
              <button
                onClick={clearMembers}
                className="border border-red-700/60 text-red-300 py-3 px-4 font-['Space_Grotesk'] font-bold hover:bg-red-600 hover:text-black transition-all"
              >
                CLEAR
              </button>
            </div>
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
              <button className="bg-cyan-400 text-black font-['Space_Grotesk'] font-bold uppercase px-8 py-4 active:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" type="submit">
                SAVE SIGNUP
              </button>
            </div>
          </form>

          <div className="mt-10 overflow-auto border border-zinc-800">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-zinc-950">
                  <th className="text-left p-3 font-mono text-[12px] text-cyan-400">Timestamp</th>
                  <th className="text-left p-3 font-mono text-[12px] text-cyan-400">Name</th>
                  <th className="text-left p-3 font-mono text-[12px] text-cyan-400">Email</th>
                  <th className="text-left p-3 font-mono text-[12px] text-cyan-400">Role</th>
                  <th className="text-left p-3 font-mono text-[12px] text-cyan-400">Interest</th>
                  <th className="text-left p-3 font-mono text-[12px] text-cyan-400">Notes</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 && (
                  <tr className="border-t border-zinc-800">
                    <td colSpan="6" className="p-3 text-zinc-400">No signups yet (in this browser).</td>
                  </tr>
                )}
                {members.map((m) => (
                  <tr key={m.id} className="border-t border-zinc-800">
                    <td className="p-3 text-zinc-400">{m.createdAt}</td>
                    <td className="p-3 text-zinc-400">{m.name || '—'}</td>
                    <td className="p-3 text-zinc-400">{m.email}</td>
                    <td className="p-3 text-zinc-400">{m.role}</td>
                    <td className="p-3 text-zinc-400">{m.interest}</td>
                    <td className="p-3 text-zinc-400">{m.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
