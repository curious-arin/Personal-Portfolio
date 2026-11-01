import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <Reveal className="mb-8 max-w-2xl sm:mb-10">
      <p className="mb-3 flex items-center gap-3 font-mono text-xs text-violet">
        <span className="h-px w-8 shrink-0 bg-violet/60" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">{description}</p>}
    </Reveal>
  )
}
