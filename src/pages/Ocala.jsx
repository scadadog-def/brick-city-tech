import SectionHeader from '../components/SectionHeader.jsx'

export default function Ocala() {
  return (
    <>
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / OCALA_NEXT_5_YEARS</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
Ocala’s Greatest Challenges
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Brick City Tech’s read of the next 5 years: risks, gaps, and what we’re building.
        </p>
      </section>

      <section className="mb-20">
        <SectionHeader title="What’s changing" code="SEC_01" right="SHIFT" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li><b className="text-zinc-100">Routine work is automated first.</b> Admin, scheduling, basic marketing, templated writing, back-office work.</li>
            <li><b className="text-zinc-100">Small businesses feel it fastest.</b> The market resets around speed, follow-up, and cost-per-output.</li>
            <li><b className="text-zinc-100">Talent becomes the bottleneck.</b> Tools are cheap; capability is scarce.</li>
          </ul>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="Ocala’s gap (local)" code="SEC_02" right="GAPS" />
        <div className="bg-zinc-950 border border-zinc-800 p-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li><b className="text-zinc-100">Income pressure vs. cost of living.</b> Marion County median household income ≈ $58.5k (2019–2023, USAFacts). MIT Living Wage (single adult) ≈ $21.23/hr.</li>
            <li><b className="text-zinc-100">Uneven access to modern tools.</b> Many workers and owners haven’t been shown safe, practical workflows.</li>
            <li><b className="text-zinc-100">Knowledge leakage.</b> Practical know-how isn’t captured; it leaves when people retire or move.</li>
            <li><b className="text-zinc-100">Coordination costs.</b> Organizations solve similar problems in isolation, repeatedly.</li>
          </ul>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="References & resources" code="SEC_03" right="PUBLIC" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li><a className="text-cyan-400 underline" href="https://livingwage.mit.edu/counties/12083" target="_blank" rel="noreferrer">MIT Living Wage Calculator (Marion County)</a></li>
            <li><a className="text-cyan-400 underline" href="https://usafacts.org/answers/what-is-the-income-of-a-us-household/county/marion-county-fl/" target="_blank" rel="noreferrer">USAFacts: Marion County median household income</a></li>
            <li><a className="text-cyan-400 underline" href="https://www.flchamber.com/floridaworkforceneedsstudy2" target="_blank" rel="noreferrer">Florida Workforce Needs Study 2.0</a></li>
            <li><a className="text-cyan-400 underline" href="https://lmsresources.labormarketinfo.com/skills_gap/index.html" target="_blank" rel="noreferrer">Florida Skills Gap & Job Vacancy data hub</a></li>
            <li><a className="text-cyan-400 underline" href="https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent" target="_blank" rel="noreferrer">Goldman Sachs (2023): generative AI macro impacts</a></li>
          </ul>
        </div>
      </section>
    </>
  )
}
