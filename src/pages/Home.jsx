import { Link } from 'react-router-dom'
import { useMe } from '../components/useMe.js'

function MembersHome() {
  return (
    <>
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ MEMBERS / HOME</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          Members Area
        </h1>
        <p className="max-w-2xl text-zinc-400">Shows, events, and reservations live here. (We’ll keep expanding this.)</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-16">
        <div className="bg-zinc-900/40 border border-zinc-800 p-8">
          <div className="font-mono text-zinc-500 text-xs">[ UPCOMING ]</div>
          <div className="font-['Space_Grotesk'] text-[24px] font-semibold mt-2">Shows</div>
          <div className="text-zinc-400 mt-1">Browse upcoming shows and reserve when available.</div>
          <div className="mt-6">
            <Link
              to="/events"
              className="bg-cyan-400 text-black font-['Space_Grotesk'] font-bold uppercase px-6 py-3 active:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              View events
            </Link>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-8">
          <div className="font-mono text-zinc-500 text-xs">[ ACCESS ]</div>
          <div className="font-['Space_Grotesk'] text-[24px] font-semibold mt-2">Reservations</div>
          <div className="text-zinc-400 mt-1">Reserve seats / workshop spots (coming next).</div>
          <div className="mt-6 text-zinc-500 font-mono text-xs">STATUS: UNDER CONSTRUCTION</div>
        </div>
      </section>
    </>
  )
}

export default function Home() {
  const { member } = useMe()

  // One homepage: public for logged out, members view for logged in.
  if (member?.status === 'pending') {
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
      </section>
    )
  }

  if (member) return <MembersHome />
  return (
    <>
      <section className="relative mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 flex flex-col justify-center bg-zinc-900/50 p-12 border border-zinc-800 relative overflow-hidden inner-glow">
            <div className="absolute inset-0 scanlines opacity-30" />
            <div className="relative z-10">
              <div className="inline-block bg-cyan-400 text-black px-3 py-1 font-mono text-[12px] tracking-[0.1em] font-bold mb-6">
                COLLECTIVE STATUS: ACTIVE
              </div>

              <h2 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-6">
                BRICK CITY TECH <br /> <span className="text-cyan-400">COLLECTIVE</span>
              </h2>

              <p className="max-w-xl text-zinc-400 mb-8">
                AI is accelerating toward a world that can feel anti-human: less meaningful work, weaker community ties, more noise,
                more manipulation. If we don’t build capability locally, we will inherit systems built elsewhere with values we did not
                choose.
                <br />
                <br />
                Brick City Tech is Ocala’s build team for a human first future using AI, design, and micro manufacturing to build a
                moat around what matters: families, farms, small businesses, and local dignity. Based at{' '}
                <span className="text-cyan-400">The Powerplant Incubator</span>.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/community"
                  className="bg-cyan-400 text-black font-['Space_Grotesk'] font-bold uppercase px-8 py-4 active:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  JOIN THE COLLECTIVE
                </Link>
                <Link
                  to="/ocala"
                  className="border-2 border-cyan-400 text-cyan-400 font-['Space_Grotesk'] font-bold uppercase px-8 py-4 hover:bg-cyan-400 hover:text-black transition-all"
                >
                  SEE THE PLAN
                </Link>
                <Link
                  to="/events"
                  className="border-2 border-zinc-700 text-zinc-200 font-['Space_Grotesk'] font-bold uppercase px-8 py-4 hover:bg-white hover:text-black transition-all"
                >
                  WORKSHOP CALENDAR
                </Link>
              </div>

              <div className="mt-8 bg-zinc-950/70 border border-zinc-800 p-6 max-w-xl">
                <div className="font-mono text-cyan-400 text-[12px] uppercase">Founder note</div>
                <p className="text-zinc-400 mt-3">
                  I moved to Ocala to start a family and get away from a technological landscape that was eroding family values in
                  major cities. But you don’t preserve a way of life by hiding from change. You preserve it by learning the tools,
                  setting the rules, and building local strength together.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 h-full min-h-[400px] border border-zinc-800 relative group overflow-hidden">
            <img
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              alt="Industrial machinery"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw_IcbKBH4iPpX8YT9D8UsW2EvCOly-0LH_8xUnI4XTZkuE4xaBb7roFza53_CNSNl5rfHqgtNboFyI1euhBGMURuQvWTpvPe7TsZtWiZv7hNPFqcPY2Q66veY1PVsSc_bBcrwCs1u3rvww1VoknfR-LTegD3TwOgCZ7PWOgS8USCbhgmpfmhZVgqPKkdfSmZkPm_mO3YEUDczxj-2I4uKPEsqCefoN6cKlj6KbAq4yf8VuCDwHcjDanVb6D5cGfVJlGMZ4Uaoy2ta"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 bg-zinc-950/80 backdrop-blur-sm border-t border-zinc-800">
              <p className="font-mono text-cyan-400 text-[12px]">BASE: THE POWERPLANT INCUBATOR</p>
              <p className="font-['Space_Grotesk'] text-[24px] font-semibold text-zinc-100">OCALA, FL</p>
              <p className="font-mono text-zinc-500 text-[12px] mt-1">405 SE Osceola Ave, Ocala, FL 34471</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <div className="flex items-center gap-4 mb-10">
          <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold uppercase tracking-tighter">DIRECTORIES</h3>
          <div className="h-[2px] flex-grow bg-zinc-800" />
          <span className="font-mono text-cyan-400 text-sm">SEC_02 // NAV</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <Link to="/events" className="bg-zinc-900/40 border border-zinc-800 p-8 hover:border-cyan-400 transition-colors">
            <div className="font-mono text-zinc-500 text-xs">[ EVENTS ]</div>
            <div className="font-['Space_Grotesk'] text-[24px] font-semibold mt-2">Workshops</div>
            <div className="text-zinc-400 mt-1">Calendar, pricing, and agendas.</div>
          </Link>
          <Link to="/ocala" className="bg-zinc-900/40 border border-zinc-800 p-8 hover:border-cyan-400 transition-colors">
            <div className="font-mono text-zinc-500 text-xs">[ OCALA ]</div>
            <div className="font-['Space_Grotesk'] text-[24px] font-semibold mt-2">Ocala’s Greatest Challenges</div>
            <div className="text-zinc-400 mt-1">Problem statement + references.</div>
          </Link>
          <Link to="/sponsors" className="bg-zinc-900/40 border border-zinc-800 p-8 hover:border-cyan-400 transition-colors">
            <div className="font-mono text-zinc-500 text-xs">[ SPONSORS ]</div>
            <div className="font-['Space_Grotesk'] text-[24px] font-semibold mt-2">Partners</div>
            <div className="text-zinc-400 mt-1">Who’s backing the work.</div>
          </Link>
        </div>
      </section>
    </>
  )
}
