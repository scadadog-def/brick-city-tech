import SectionHeader from '../components/SectionHeader.jsx'

export default function PortfolioSpotless() {
  return (
    <>
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ PORTFOLIO / SPOTLESS_HOME_REPAIR</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          Spotless Home Repair
        </h1>
        <p className="max-w-3xl text-zinc-400">
          A Brick City Tech portfolio build: helping a local home repair business adopt practical AI workflows to capture more leads,
          respond faster, and scale without losing quality.
        </p>
      </section>

      <section className="mb-16 border border-zinc-800 bg-zinc-900/20 overflow-hidden">
        <img
          src="/ocala/optimized/file_159---f645bb3a-b685-4832-a1b1-a335139d1f64-1600.jpg"
          alt="Downtown Ocala streetscape"
          className="w-full h-[220px] md:h-[360px] object-cover"
          loading="lazy"
        />
        <div className="p-4 md:p-6 bg-zinc-950/60 border-t border-zinc-800">
          <div className="font-mono text-cyan-400 text-[11px] uppercase tracking-widest">BUILD STATUS: ACTIVE</div>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="Who they are" code="SEC_01" right="STORY" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 text-zinc-400 space-y-4">
          <p>
            Spotless Home Repair is a local, customer-first home repair service. Like most service businesses, growth is limited by
            speed: missed calls, slow quotes, inconsistent follow-up, and scattered customer notes.
          </p>
          <p>
            Brick City Tech is helping them modernize the system behind the work — so the team can spend more time on the jobsite and
            less time chasing text threads, voicemails, and paperwork.
          </p>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="The bottleneck" code="SEC_02" right="PROBLEM" />
        <div className="bg-zinc-950 border border-zinc-800 p-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li>
              <b className="text-zinc-100">Lead intake is fragile.</b> Calls and messages come in at random times; if you miss them,
              you miss revenue.
            </li>
            <li>
              <b className="text-zinc-100">Quotes take too long.</b> The customer’s energy is highest right after the problem happens.
              Delay kills close rate.
            </li>
            <li>
              <b className="text-zinc-100">Follow-up is inconsistent.</b> Without a simple pipeline, good leads go cold.
            </li>
            <li>
              <b className="text-zinc-100">Knowledge isn’t captured.</b> Photos, notes, and scope details are spread across phones.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="What we’re building" code="SEC_03" right="SYSTEM" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li>
              <b className="text-zinc-100">AI-assisted intake</b>: turn calls/texts into structured jobs (name, address, issue,
              urgency, photos).
            </li>
            <li>
              <b className="text-zinc-100">Quote drafts</b>: generate a quote template + scope checklist from the intake.
            </li>
            <li>
              <b className="text-zinc-100">Follow-up automations</b>: simple sequences for “quote sent”, “pending approval”, “schedule
              window”.
            </li>
            <li>
              <b className="text-zinc-100">A lightweight pipeline</b>: every lead has a status (new → contacted → quoted → scheduled →
              complete).
            </li>
            <li>
              <b className="text-zinc-100">SOP capture</b>: translate repeatable jobs into checklists so quality scales.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="Milestones" code="SEC_04" right="PROGRESS" />
        <div className="bg-zinc-950 border border-zinc-800 p-8 text-zinc-400">
          <ul className="list-disc pl-5 space-y-2">
            <li><b className="text-zinc-100">Week 1:</b> intake + pipeline design and tools selection</li>
            <li><b className="text-zinc-100">Week 2:</b> quote draft templates + follow-up sequences</li>
            <li><b className="text-zinc-100">Week 3:</b> KPI dashboard (close rate, response time, average ticket)</li>
          </ul>
          <div className="text-zinc-500 text-sm mt-4">We’ll keep this page updated as we ship.</div>
        </div>
      </section>
    </>
  )
}
