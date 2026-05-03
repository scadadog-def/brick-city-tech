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
        <SectionHeader title="Ocala’s greatest challenges" code="SEC_04" right="NEXT_5_YEARS" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 mb-8">
          <p className="text-zinc-400">
            Brick City Tech’s read of the next 5 years: risks, gaps, and what we’re building locally.
          </p>
        </div>

        <SectionHeader title="What’s changing" code="SEC_04A" right="SHIFT" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 mb-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li>
              <b className="text-zinc-100">Routine work is automated first.</b> Admin, scheduling, basic marketing, templated writing,
              back-office work.
            </li>
            <li>
              <b className="text-zinc-100">Small businesses feel it fastest.</b> The market resets around speed, follow-up, and
              cost-per-output.
            </li>
            <li>
              <b className="text-zinc-100">Talent becomes the bottleneck.</b> Tools are cheap; capability is scarce.
            </li>
          </ul>
        </div>

        <SectionHeader title="Ocala’s gap (local)" code="SEC_04B" right="GAPS" />
        <div className="bg-zinc-950 border border-zinc-800 p-8 mb-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li>
              <b className="text-zinc-100">Income pressure vs. cost of living.</b> Marion County median household income is about $58.5k
              (2019 to 2023, USAFacts). MIT Living Wage (single adult) is about $21.23 per hour.
            </li>
            <li>
              <b className="text-zinc-100">Uneven access to modern tools.</b> Many workers and owners haven’t been shown safe, practical
              workflows.
            </li>
            <li>
              <b className="text-zinc-100">Knowledge leakage.</b> Practical know-how isn’t captured; it leaves when people retire or move.
            </li>
            <li>
              <b className="text-zinc-100">Coordination costs.</b> Organizations solve similar problems in isolation, repeatedly.
            </li>
          </ul>
        </div>

        <SectionHeader title="References & resources" code="SEC_04C" right="PUBLIC" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li>
              <a className="text-cyan-400 underline" href="https://livingwage.mit.edu/counties/12083" target="_blank" rel="noreferrer">
                MIT Living Wage Calculator (Marion County)
              </a>
            </li>
            <li>
              <a
                className="text-cyan-400 underline"
                href="https://usafacts.org/answers/what-is-the-income-of-a-us-household/county/marion-county-fl/"
                target="_blank"
                rel="noreferrer"
              >
                USAFacts: Marion County median household income
              </a>
            </li>
            <li>
              <a
                className="text-cyan-400 underline"
                href="https://www.flchamber.com/floridaworkforceneedsstudy2"
                target="_blank"
                rel="noreferrer"
              >
                Florida Workforce Needs Study 2.0
              </a>
            </li>
            <li>
              <a
                className="text-cyan-400 underline"
                href="https://lmsresources.labormarketinfo.com/skills_gap/index.html"
                target="_blank"
                rel="noreferrer"
              >
                Florida Skills Gap & Job Vacancy data hub
              </a>
            </li>
            <li>
              <a
                className="text-cyan-400 underline"
                href="https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent"
                target="_blank"
                rel="noreferrer"
              >
                Goldman Sachs (2023): generative AI macro impacts
              </a>
            </li>
          </ul>
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
