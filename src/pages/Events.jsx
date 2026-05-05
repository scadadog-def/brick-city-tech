import { useMemo, useState } from 'react'
import SectionHeader from '../components/SectionHeader.jsx'
import { WORKSHOPS_2026 } from '../components/workshops.js'

function isoMonthStart(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), 1)
  x.setHours(0, 0, 0, 0)
  return x
}

function addMonths(d, delta) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1)
}

function fmtMonthYear(d) {
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' })
}

function fmtShortDate(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return iso
  }
}

function CalendarView({ events }) {
  const byDay = useMemo(() => {
    const m = new Map()
    for (const e of events) {
      if (!e.date) continue
      const day = String(e.date).slice(0, 10)
      const arr = m.get(day) || []
      arr.push(e)
      m.set(day, arr)
    }
    return m
  }, [events])

  const firstEventDate = events.find((e) => e.date)?.date || '2026-05-01'
  const [cursor, setCursor] = useState(() => isoMonthStart(new Date(firstEventDate)))
  const [selectedDay, setSelectedDay] = useState(() => String(firstEventDate).slice(0, 10))

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const startDay = firstOfMonth.getDay() // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push(iso)
  }

  const selectedEvents = byDay.get(selectedDay) || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      <div className="lg:col-span-7 border border-zinc-800 bg-zinc-950">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <button
            type="button"
            className="text-zinc-300 font-mono text-xs hover:text-cyan-300"
            onClick={() => setCursor((d) => addMonths(d, -1))}
          >
            ← Prev
          </button>
          <div className="font-['Space_Grotesk'] font-bold uppercase tracking-wider text-sm text-zinc-100">
            {fmtMonthYear(cursor)}
          </div>
          <button
            type="button"
            className="text-zinc-300 font-mono text-xs hover:text-cyan-300"
            onClick={() => setCursor((d) => addMonths(d, 1))}
          >
            Next →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-px bg-zinc-800">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
            <div key={d} className="bg-zinc-950 p-2 text-center font-mono text-[11px] text-zinc-500">
              {d}
            </div>
          ))}
          {cells.map((iso, idx) => {
            if (!iso) return <div key={`empty-${idx}`} className="bg-zinc-950 p-3 h-14" />
            const has = byDay.has(iso)
            const isSelected = iso === selectedDay
            return (
              <button
                key={iso}
                type="button"
                onClick={() => setSelectedDay(iso)}
                className={[
                  'bg-zinc-950 p-2 h-14 text-left hover:bg-zinc-900 transition-colors',
                  isSelected ? 'ring-2 ring-cyan-400 ring-inset' : '',
                ].join(' ')}
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-zinc-300">{Number(iso.slice(8, 10))}</div>
                  {has && <div className="h-2 w-2 rounded-full bg-cyan-400" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="lg:col-span-5 border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="font-mono text-cyan-400 text-xs uppercase">Selected day</div>
        <div className="font-['Space_Grotesk'] text-2xl font-semibold mt-2 text-zinc-100">{selectedDay}</div>

        <div className="mt-6 space-y-4">
          {selectedEvents.length === 0 ? (
            <div className="text-zinc-400">No events scheduled for this day.</div>
          ) : (
            selectedEvents.map((e) => (
              <div key={e.date + e.title} className="bg-zinc-950 border border-zinc-800 p-4">
                <div className="font-mono text-zinc-500 text-xs">{fmtShortDate(e.date)} // {e.price}</div>
                <div className="font-['Space_Grotesk'] text-lg font-semibold text-zinc-100 mt-1">{e.title}</div>
                <div className="text-zinc-400 mt-1">{e.audience}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default function Events() {
  const [view, setView] = useState('list')

  return (
    <>
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / EVENTS_CALENDAR</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          Events
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Hands-on sessions for working adults, businesses, and youth/families. Pricing is designed to cover materials and keep it
          accessible. Scholarships/waivers available when sponsored.
        </p>
      </section>

      <section className="mb-20">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <SectionHeader title="2026 events" code="SEC_01" right="SCHEDULE" />
          <div className="border border-zinc-800 bg-zinc-950 p-1 flex gap-1">
            <button
              type="button"
              onClick={() => setView('list')}
              className={[
                "px-3 py-1 font-mono text-xs uppercase",
                view === 'list' ? 'bg-cyan-400 text-black' : 'text-zinc-400 hover:text-cyan-300'
              ].join(' ')}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setView('calendar')}
              className={[
                "px-3 py-1 font-mono text-xs uppercase",
                view === 'calendar' ? 'bg-cyan-400 text-black' : 'text-zinc-400 hover:text-cyan-300'
              ].join(' ')}
            >
              Calendar
            </button>
          </div>
        </div>

        {view === 'calendar' ? (
          <CalendarView events={WORKSHOPS_2026} />
        ) : (
          <>
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
          </>
        )}
      </section>
    </>
  )
}
