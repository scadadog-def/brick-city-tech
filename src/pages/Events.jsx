import SectionHeader from '../components/SectionHeader.jsx'
import { WORKSHOPS_2026 } from '../components/workshops.js'

export default function Events() {
  return (
    <>
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / EVENTS_CALENDAR</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          Workshops & Sessions
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Hands-on sessions for working adults, businesses, and youth/families. Pricing is designed to cover materials and keep it
          accessible. Scholarships/waivers available when sponsored.
        </p>
      </section>

      <section className="mb-20">
        <SectionHeader title="2026 calendar" code="SEC_01" right="SCHEDULE" />

        <div className="overflow-auto border border-zinc-800">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-zinc-950">
                <th className="text-left p-3 font-mono text-[12px] text-cyan-400">Month</th>
                <th className="text-left p-3 font-mono text-[12px] text-cyan-400">Session</th>
                <th className="text-left p-3 font-mono text-[12px] text-cyan-400">Audience</th>
                <th className="text-left p-3 font-mono text-[12px] text-cyan-400">Cost</th>
              </tr>
            </thead>
            <tbody>
              {WORKSHOPS_2026.map((w) => (
                <tr key={w.month + w.title} className="border-t border-zinc-800">
                  <td className="p-3 text-zinc-400">{w.month}</td>
                  <td className="p-3 text-zinc-100"><b>{w.title}</b></td>
                  <td className="p-3 text-zinc-400">{w.audience}</td>
                  <td className="p-3 text-zinc-400">{w.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {WORKSHOPS_2026.map((w) => (
            <div key={'card-' + w.month + w.title} className="bg-zinc-950 border border-zinc-800 overflow-hidden">
              <div className="h-44 relative">
                <img className="w-full h-full object-cover grayscale opacity-75" src={w.img} alt={w.title} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                <div className="absolute bottom-3 left-4 font-mono text-cyan-400 text-[12px] uppercase">
                  {w.month} // {w.price}
                </div>
              </div>
              <div className="p-6">
                <div className="font-['Space_Grotesk'] text-[24px] font-semibold">{w.title}</div>
                <div className="text-zinc-400 mt-1">{w.audience}</div>
                <ul className="list-disc pl-5 text-zinc-400 space-y-1 mt-4">
                  {w.agenda.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-zinc-500 text-xs font-mono">
          Images are currently placeholders (picsum.photos). Unsplash source URLs were returning 503 from our host.
        </div>
      </section>
    </>
  )
}
