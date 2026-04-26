export default function Labs() {
  return (
    <>
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / EXPLORATION_CENTRAL</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          Innovation Labs
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Brick City Tech&apos;s specialized incubation zones. We provide the hardware, compute power, and mentorship. You provide the
          vision.
        </p>
        <p className="max-w-2xl text-zinc-500 font-mono text-xs mt-3">
          BASE: The Powerplant Incubator — 405 SE Osceola Ave, Ocala, FL 34471
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-8 flex flex-col gap-gutter">
          <div className="bg-zinc-900/40 border-2 border-zinc-800 relative overflow-hidden">
            <div className="absolute inset-0 scanlines opacity-10" />
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                    <span className="font-mono text-cyan-400 text-xs uppercase">[ AI LAB ]</span>
                  </div>
                  <h2 className="font-['Space_Grotesk'] text-[24px] font-semibold text-white uppercase tracking-tight">Neural Engine 01</h2>
                </div>
                <span className="material-symbols-outlined text-zinc-600 text-4xl">neurology</span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-mono text-cyan-400 mb-3 text-[12px] uppercase tracking-[0.1em]">CURRENT STACKS</h3>
                  <ul className="font-mono text-sm text-zinc-400 space-y-2">
                    <li>&gt; LLM evaluation & safety playbooks</li>
                    <li>&gt; Practical automations for small business</li>
                    <li>&gt; Semantic interoperability (protocols + data)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-cyan-400 mb-3 text-[12px] uppercase tracking-[0.1em]">GET INVOLVED</h3>
                  <p className="text-sm text-zinc-400 mb-4">Apply to demo a project at a build night or volunteer as a mentor.</p>
                  <a
                    className="w-full inline-flex justify-center bg-cyan-400 text-black font-['Space_Grotesk'] font-bold uppercase py-3 hover:bg-white transition-all active:translate-y-1 shadow-[4px_4px_0_0_#000]"
                    href="/brick-city-tech/#connect"
                  >
                    REQUEST ACCESS
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="bg-zinc-900/40 border-2 border-zinc-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-[#feb700] shadow-[0_0_8px_#feb700]" />
                  <span className="font-mono text-[#ffdb9d] text-xs uppercase">[ ROBOTICS ]</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold text-white uppercase mb-4">Kinetic Studio</h3>
                <p className="text-sm text-zinc-400 mb-6">Hands-on hardware hacking, sensors, and field-ready prototypes.</p>
              </div>
              <a className="w-full border-2 border-[#ffdb9d] text-[#ffdb9d] font-mono py-2 text-center hover:bg-[#ffdb9d] hover:text-black transition-all" href="/brick-city-tech/#programs">
                JOIN STUDIO
              </a>
            </div>

            <div className="bg-zinc-900/40 border-2 border-zinc-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-zinc-500 shadow-[0_0_8px_#666]" />
                  <span className="font-mono text-zinc-400 text-xs uppercase">[ IOT ]</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold text-white uppercase mb-4">Sensor Sandbox</h3>
                <p className="text-sm text-zinc-400 mb-6">Simple sensor networks for local monitoring and stewardship.</p>
              </div>
              <a className="w-full border-2 border-zinc-600 text-zinc-300 font-mono py-2 text-center hover:bg-zinc-300 hover:text-black transition-all" href="/brick-city-tech/#programs">
                VIEW PROJECTS
              </a>
            </div>
          </div>
        </div>

        <aside className="md:col-span-4 flex flex-col gap-gutter">
          <div className="bg-zinc-950 border-2 border-zinc-800 p-8 sticky top-28">
            <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold text-cyan-400 uppercase mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">mail</span> Join the Core
            </h3>
            <p className="text-zinc-400 text-sm mb-6">Stay synchronized with labs, workshops, and build sessions.</p>
            <a
              className="w-full relative group overflow-hidden py-4 border-b-4 border-black inline-flex justify-center"
              href="/brick-city-tech/#connect"
            >
              <div className="absolute inset-0 hazard-border opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-cyan-400 text-black font-['Space_Grotesk'] text-center font-black py-2 px-6">
                INITIALIZE SUBSCRIPTION
              </div>
            </a>
          </div>
        </aside>
      </div>
    </>
  )
}
