import SectionHeader from '../components/SectionHeader.jsx'

export default function Manifesto() {
  return (
    <>
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / MANIFESTO</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          The Brick City Tech Manifesto
        </h1>
        <p className="max-w-2xl text-zinc-400">Built by the community. Guided by wisdom. Powered by technology.</p>
      </section>

      <section className="mb-20">
        <SectionHeader title="The moment we’re in" code="SEC_01" right="CONTEXT" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 space-y-4 text-zinc-400">
          <p>
            Artificial intelligence is not a distant trend. It is an accelerating force that will reshape how work is done, how
            businesses compete, and how communities either grow or fall behind.
          </p>
          <p>
            This shift is inevitable. The only question is whether Marion County participates in shaping it or absorbs the
            consequences of it. We choose to act. We start here, in Ocala.
          </p>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="Belief" code="SEC_02" right="VALUES" />
        <div className="bg-zinc-950 border border-zinc-800 p-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li><b className="text-zinc-100">Technology should serve people, not replace them.</b></li>
            <li><b className="text-zinc-100">Wisdom earned through lived experience must guide how AI is used.</b></li>
            <li><b className="text-zinc-100">Communities that act early shape their future.</b> Communities that wait will be shaped by others.</li>
            <li>
              <b className="text-zinc-100">Our greatest untapped resource is the capability of our people.</b> Our role is to unlock it.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="Capability we’re building" code="SEC_03" right="DOMAINS" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li><b className="text-zinc-100">AI + automation for local businesses</b> (operations, data, customer workflows)</li>
            <li><b className="text-zinc-100">Engineering design + 3D modeling</b> (practical CAD, design iteration)</li>
            <li><b className="text-zinc-100">3D printing + micro-manufacturing</b> (prototype → part → small run)</li>
            <li><b className="text-zinc-100">Generative arts</b>: music, visual art, and film workflows (with Synologic Studios)</li>
          </ul>
          <p className="text-zinc-500 text-sm mt-4">
            The goal is not “AI hype.” The goal is durable local capability: people who can build, ship, and sustain real work.
          </p>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="Ocala: next five years" code="SEC_04" right="LOCAL" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li><b className="text-zinc-100">Routine work is automated first.</b> Admin, scheduling, basic marketing, templated writing, and back-office work.</li>
            <li><b className="text-zinc-100">Small businesses feel it fastest.</b> The market resets around speed, follow-up, and cost-per-output.</li>
            <li><b className="text-zinc-100">Talent becomes the bottleneck.</b> Tools are cheap; capability is scarce.</li>
            <li><b className="text-zinc-100">Income pressure vs. cost of living.</b> Marion County median household income is about $58.5k (2019 to 2023, USAFacts). MIT Living Wage (single adult) is about $21.23 per hour.</li>
            <li><b className="text-zinc-100">Knowledge leakage and coordination costs.</b> Practical know-how and local solutions are repeatedly lost or rebuilt in isolation.</li>
          </ul>
          <div className="mt-5 text-sm">
            <a className="text-cyan-400 underline mr-4" href="https://livingwage.mit.edu/counties/12083" target="_blank" rel="noreferrer">MIT Living Wage Calculator</a>
            <a className="text-cyan-400 underline" href="https://usafacts.org/answers/what-is-the-income-of-a-us-household/county/marion-county-fl/" target="_blank" rel="noreferrer">USAFacts income data</a>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="Call to action" code="SEC_05" right="PARTICIPATE" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 space-y-4 text-zinc-400">
          <p>This is not a passive effort. It requires participation.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Attend workshops and build new skills</li>
            <li>Bring your business into the program</li>
            <li>Share your experience and insight</li>
            <li>Support the initiative financially</li>
            <li>Help define the problems we need to solve</li>
          </ul>
        </div>
      </section>
    </>
  )
}
