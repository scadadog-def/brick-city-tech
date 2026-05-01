export default function Account({ member }) {
  if (!member) {
    return (
      <section className="max-w-xl">
        <h1 className="font-['Space_Grotesk'] text-4xl uppercase text-cyan-400">Account</h1>
        <p className="mt-4 text-zinc-400">You are not logged in. Use the login button in the top-right.</p>
      </section>
    )
  }

  return (
    <section className="max-w-2xl">
      <h1 className="font-['Space_Grotesk'] text-4xl uppercase text-cyan-400">Account</h1>
      <div className="mt-6 border border-zinc-800 bg-zinc-950 p-6">
        <div className="text-xs font-mono uppercase text-zinc-500">Name</div>
        <div className="text-zinc-100">{member.name || 'N/A'}</div>
        <div className="mt-4 text-xs font-mono uppercase text-zinc-500">Email</div>
        <div className="text-zinc-100">{member.email}</div>
        <div className="mt-4 text-xs font-mono uppercase text-zinc-500">Role</div>
        <div className="text-zinc-100">{member.is_admin ? 'Admin' : 'Member'}</div>
      </div>
    </section>
  )
}
