export default function SectionHeader({ title, code, right }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <h3 className="font-['Space_Grotesk'] text-[24px] font-semibold uppercase tracking-tighter">{title}</h3>
      <div className="h-[2px] flex-grow bg-zinc-800" />
      <span className="font-mono text-cyan-400 text-sm">{code}{right ? ` // ${right}` : ''}</span>
    </div>
  )
}
