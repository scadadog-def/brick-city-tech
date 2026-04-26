import { Link } from 'react-router-dom'

export default function Home() {
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
                Community-driven workshops and build sessions for Ocala/Marion County. Practical AI, automation, hardware, and
                stewardship — hosted from <span className="text-cyan-400">The Powerplant Incubator</span>.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/community"
                  className="bg-cyan-400 text-black font-['Space_Grotesk'] font-bold uppercase px-8 py-4 active:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  JOIN THE COLLECTIVE
                </Link>
                <Link
                  to="/events"
                  className="border-2 border-cyan-400 text-cyan-400 font-['Space_Grotesk'] font-bold uppercase px-8 py-4 hover:bg-cyan-400 hover:text-black transition-all"
                >
                  WORKSHOP CALENDAR
                </Link>
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
