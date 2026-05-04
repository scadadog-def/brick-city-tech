import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Portfolio() {
  return (
    <>
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / PORTFOLIO</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          Portfolio
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Real businesses and practical ideas we’re building with — focused on execution, operational leverage, and local impact.
        </p>
      </section>

      <section className="mb-20">
        <SectionHeader title="Active builds" code="SEC_01" right="WORK" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-8">
          <Link
            to="/portfolio/spotless-home-repair"
            className="group bg-zinc-900/40 border border-zinc-800 hover:border-cyan-400 transition-colors overflow-hidden"
          >
            <div className="h-52 overflow-hidden">
              <img
                src="/ocala/optimized/file_158---9509c0f5-8511-4426-b909-b8290d603deb-1600.jpg"
                alt="Ocala downtown aerial"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-8">
              <div className="font-mono text-zinc-500 text-xs">[ BUSINESS ENABLEMENT ]</div>
              <div className="font-['Space_Grotesk'] text-[26px] font-semibold mt-2">Spotless Home Repair</div>
              <div className="text-zinc-400 mt-2">
                A local service business modernizing operations with AI-assisted intake, quoting, follow-up, and lightweight automation.
              </div>
              <div className="mt-6 font-mono text-cyan-400 text-xs">OPEN CASE →</div>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
