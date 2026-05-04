export default function Admin({ member }) {
  if (!member) {
    return (
      <section className="max-w-xl">
        <h1 className="font-['Space_Grotesk'] text-4xl uppercase text-cyan-400">Admin</h1>
        <p className="mt-4 text-zinc-400">Please log in to access admin settings.</p>
      </section>
    )
  }

  if (!member.is_admin) {
    return (
      <section className="max-w-xl">
        <h1 className="font-['Space_Grotesk'] text-4xl uppercase text-cyan-400">Admin</h1>
        <p className="mt-4 text-zinc-400">Your account does not have admin access.</p>
      </section>
    )
  }

  return (
    <section className="max-w-3xl">
      <h1 className="font-['Space_Grotesk'] text-4xl uppercase text-cyan-400">Admin Settings</h1>
      <div className="mt-6 border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-zinc-300">
          Admin dashboard foundation is live. Next step is wiring user management, role updates, and platform stats endpoints.
        </p>
      </div>
    </section>
  )
}
