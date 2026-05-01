import SectionHeader from '../components/SectionHeader.jsx'

const SPONSORS = [
  {
    name: 'SCADADOG',
    subtitle: 'Where IT Meets OT',
    href: 'https://www.scadadog.com/',
    color: 'border-cyan-400',
    logo: '/sponsors/scadadog-logo-dark.png',
    offers: [
      'SCADA integration + industrial automation support',
      'IIoT data collection and operations analytics',
      'Industrial software development (bridging IT + OT)'
    ],
    note: 'Supporting local capability-building and responsible AI adoption.'
  },
  {
    name: 'Synalgic Studios',
    subtitle: 'Design + web + 3D + motion',
    href: 'https://synalgicstudios.com/',
    color: 'border-[#feb700]',
    logo: null,
    offers: [
      'Design team on demand (brand + web)',
      'Advanced design services (3D, motion, web)',
      'Cinematic, story-driven multi-page websites',
      'Support for generative arts workflows (music, art, film)'
    ],
    note: 'Logo pending (site is Cloudflare-protected; please send the official logo file and I’ll add it).'
  }
]

export default function Sponsors() {
  return (
    <>
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / SPONSORS</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          Sponsors
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Brick City Tech is community-built. Sponsors help us keep workshops accessible and fund scholarships, materials, and
          venue support.
        </p>
      </section>

      <section className="mb-20">
        <SectionHeader title="Partners" code="SEC_01" right="SUPPORT" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {SPONSORS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
              className={`bg-zinc-950 border-2 ${s.color} p-8 hover:bg-white/5 transition-colors`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-cyan-400 text-[12px] uppercase">Sponsor</div>
                  <div className="font-['Space_Grotesk'] text-[24px] font-semibold mt-2">{s.name}</div>
                  <div className="text-zinc-400 mt-1">{s.subtitle}</div>
                </div>
                {s.logo && (
                  <img
                    src={s.logo}
                    alt={`${s.name} logo`}
                    className="h-14 w-14 object-contain bg-black/20 border border-zinc-800 p-2"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="mt-5">
                <div className="font-mono text-cyan-400 text-[12px] uppercase">What they offer</div>
                <ul className="list-disc pl-5 text-zinc-400 space-y-1 mt-2">
                  {s.offers.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>

              <div className="text-zinc-500 text-sm mt-5">{s.note}</div>
              <div className="mt-6 font-mono text-[12px] text-zinc-500">{s.href.startsWith('http') ? 'OPEN LINK →' : 'LINK PENDING →'}</div>
            </a>
          ))}
        </div>

        <div className="mt-10 bg-zinc-900/40 border border-zinc-800 p-8">
          <div className="font-mono text-cyan-400 text-[12px] uppercase">Want to sponsor?</div>
          <p className="text-zinc-400 mt-2">
            If you want to sponsor workshops, scholarships, or demo kits, sign up on the Community page and choose “Sponsor” as
            role.
          </p>
        </div>
      </section>
    </>
  )
}
