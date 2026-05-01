import { Link } from 'react-router-dom'

export default function VerifyEmailNeeded() {
  return (
    <section className="max-w-2xl">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-zinc-100 font-mono uppercase tracking-widest">/ MEMBER ACCESS</span>
        <div className="h-px flex-grow bg-zinc-800" />
      </div>
      <h1 className="font-['Space_Grotesk'] text-[42px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
        Verify your email
      </h1>
      <p className="text-zinc-400 mb-6">
        Your account is created, but it’s still <span className="text-cyan-400">pending</span> until you verify your email.
        Please click the verification link we emailed you.
      </p>

      <div className="bg-zinc-950 border border-zinc-800 p-6">
        <div className="font-mono text-cyan-400 text-[12px] uppercase">Next steps</div>
        <ol className="list-decimal pl-5 mt-3 text-zinc-400 space-y-2">
          <li>Open the verification email.</li>
          <li>Click the link to activate your account.</li>
          <li>Return here — you’ll have access to member content.</li>
        </ol>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="border-2 border-zinc-700 text-zinc-200 font-['Space_Grotesk'] font-bold uppercase px-6 py-3 hover:bg-white hover:text-black transition-all"
          >
            Back to home
          </Link>
          <Link
            to="/login"
            className="border-2 border-cyan-400 text-cyan-400 font-['Space_Grotesk'] font-bold uppercase px-6 py-3 hover:bg-cyan-400 hover:text-black transition-all"
          >
            Login again
          </Link>
        </div>
      </div>
    </section>
  )
}
