import SectionHeader from '../components/SectionHeader.jsx'

const EPISODES = [
  {
    id: 'E001',
    title: 'Brick City Tech  Why Ocala  Why Now',
    date: 'TBD',
    guests: 'Hector Lopez',
    summary:
      'A kickoff episode: the mission, the capability we’re building (AI + design + manufacturing + generative arts), and why the next 5 years matter for Ocala/Marion County.',
    videoUrl: null,
    audioUrl: null
  },
  {
    id: 'E002',
    title: 'Generative Arts in Practice (Music / Art / Film)',
    date: 'TBD',
    guests: 'Synalgic Studios',
    summary:
      'How creators can use AI to iterate faster while maintaining taste, authorship, and ethical boundaries. Practical workflows and pitfalls.',
    videoUrl: null,
    audioUrl: null
  }
]

function EpisodeCard({ ep }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="font-mono text-cyan-400 text-[12px] uppercase">{ep.id}</div>
          <div className="font-mono text-zinc-500 text-[12px] uppercase">{ep.date}</div>
        </div>
        <div className="font-['Space_Grotesk'] text-[24px] font-semibold mt-2">{ep.title}</div>
        <div className="text-zinc-400 mt-1">Guests: {ep.guests}</div>
        <p className="text-zinc-400 mt-4">{ep.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {ep.videoUrl ? (
            <a
              className="border border-zinc-700 py-3 px-4 font-['Space_Grotesk'] font-bold hover:bg-white hover:text-black transition-all"
              href={ep.videoUrl}
              target="_blank"
              rel="noreferrer"
            >
              WATCH VIDEO
            </a>
          ) : (
            <span className="border border-zinc-800 py-3 px-4 font-mono text-xs text-zinc-500">VIDEO: COMING SOON</span>
          )}

          {ep.audioUrl ? (
            <a
              className="border border-zinc-700 py-3 px-4 font-['Space_Grotesk'] font-bold hover:bg-white hover:text-black transition-all"
              href={ep.audioUrl}
              target="_blank"
              rel="noreferrer"
            >
              LISTEN
            </a>
          ) : (
            <span className="border border-zinc-800 py-3 px-4 font-mono text-xs text-zinc-500">AUDIO: COMING SOON</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Podcast() {
  return (
    <>
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-zinc-100 font-mono uppercase tracking-widest">/ ROOT / PODCAST</span>
          <div className="h-px flex-grow bg-zinc-800" />
        </div>
        <h1 className="font-['Space_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-zinc-100 uppercase mb-4">
          Podcast
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Brick City Tech will run a podcast studio to record and publish episodes featuring builders, educators, business owners,
          and creators. This page is the public episode directory.
        </p>
      </section>

      <section className="mb-20">
        <SectionHeader title="Episodes" code="SEC_01" right="DIRECTORY" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {EPISODES.map((ep) => (
            <EpisodeCard key={ep.id} ep={ep} />
          ))}
        </div>
      </section>

      <section className="mb-20">
        <SectionHeader title="Publishing pipeline (planned)" code="SEC_02" right="ROADMAP" />
        <div className="bg-zinc-900/40 border border-zinc-800 p-8">
          <ul className="list-disc pl-5 text-zinc-400 space-y-2">
            <li>Upload raw audio/video → store in a durable bucket</li>
            <li>Generate episode metadata (title, description, guests, timestamps)</li>
            <li>Publish to podcast feeds and video platforms</li>
            <li>Embed playable links here + searchable archive</li>
          </ul>
          <div className="text-zinc-500 text-sm mt-4">
            We’ll wire this to an automated pipeline later. For now, episodes are added as curated links.
          </div>
        </div>
      </section>
    </>
  )
}
