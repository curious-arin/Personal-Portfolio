import { useMemo, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import Container from '../common/Container'
import Reveal from '../common/Reveal'
import ProjectArt from '../common/ProjectArt'
import spotlight from '../../hooks/useSpotlight'
import useAutoScroll from '../../hooks/useAutoScroll'
import useMediaQuery from '../../hooks/useMediaQuery'
import { projects } from '../../data/portfolioData'

const MOBILE_COUNT = 8 // 2 rows x 2 columns visible, the rest drift in
const MAX_PROJECTS = 12 // 2 rows x 3 columns visible on md+

// First sentence of the description, trimmed at a word boundary for small cards.
function summarize(text = '', max = 70) {
  const first = text.split(/(?<=[.!?])\s/)[0].trim()
  if (first.length <= max) return first
  const cut = first.slice(0, max).replace(/\s+\S*$/, '').replace(/[,;:\-–]+$/, '')
  return `${cut}…`
}

function ProjectCard({ project, total, copy }) {
  const { number, type, status, title, description, short, stack, art, link, label } = project
  return (
    <article
      onPointerMove={spotlight}
      aria-hidden={copy || undefined}
      className="card-hover flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-panel/70"
    >
      <div className="relative h-[4.25rem] w-full flex-none bg-gradient-to-br from-violet-500/20 via-purple-500/5 to-transparent md:h-[5.5rem]">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative h-full px-3 py-1.5">
          <ProjectArt name={art} />
        </div>
        <span className="absolute left-2.5 top-1.5 font-mono text-[10px] text-zinc-400 md:left-3 md:top-2 md:text-[11px]">
          {number} / {String(total).padStart(2, '0')}
        </span>
        <span
          className={`absolute right-2.5 top-1.5 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold md:right-3 md:top-2 md:px-2 md:text-[11px] ${
            status === 'Project'
              ? 'border-mint/25 bg-mint/10 text-mint'
              : 'border-white/15 bg-white/[0.04] text-zinc-300'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-3 md:p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate text-sm font-extrabold tracking-tight md:text-base">{title}</h3>
          <span className="hidden flex-none text-[11px] text-zinc-500 md:inline">{type}</span>
        </div>

        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-[1.15rem] text-zinc-400 md:mt-1.5 md:text-[13px] md:leading-5">
          <span className="md:hidden">{short ?? summarize(description)}</span>
          <span className="hidden md:inline">{description}</span>
        </p>

        <ul className="mt-2 flex flex-nowrap gap-1 overflow-hidden md:mt-2.5 md:gap-1.5">
          {stack.slice(0, 3).map((s) => (
            <li
              key={s}
              className="whitespace-nowrap rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300 max-md:[&:nth-child(3)]:hidden md:px-2 md:text-[11px]"
            >
              {s}
            </li>
          ))}
        </ul>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          tabIndex={copy ? -1 : undefined}
          className="group/link mt-2 flex items-center justify-between text-xs font-bold text-zinc-300 transition-colors hover:text-violet md:mt-2.5 md:text-[13px]"
        >
          <span className="truncate">{label}</span>
          <ExternalLink
            size={14}
            aria-hidden="true"
            className="flex-none transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </a>
      </div>
    </article>
  )
}

export default function Projects() {
  const railRef = useRef(null)
  const isWeb = useMediaQuery('(min-width: 768px)')
  useAutoScroll(railRef)

  const shown = useMemo(
    () => projects.slice(0, isWeb ? MAX_PROJECTS : MOBILE_COUNT),
    [isWeb]
  )

  // Always 2 rows, so an odd count leaves an empty slot; a spacer keeps the loop seamless.
  const needsSpacer = shown.length % 2 === 1

  return (
    <section id="projects" className="page-section surface-a isolate overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title={<>Projects with <span className="text-violet">purpose.</span></>}
          description="Projects that connect data science, machine learning, and practical AI applications."
        />

        <Reveal>
          {/* 2 rows always. 2 columns visible on mobile, 3 on md+. Drifts sideways, pauses on hover/touch, swipeable. */}
          <div
            ref={railRef}
            className="rail grid grid-flow-col auto-cols-[calc((100%-0.75rem)/2)] grid-rows-[repeat(2,14rem)] gap-3 overflow-x-auto pb-4 md:auto-cols-[calc((100%-2.5rem)/3)] md:grid-rows-[repeat(2,16rem)] md:gap-5"
            aria-label="Projects"
          >
            {shown.map((project) => (
              <ProjectCard key={project.number} project={project} total={shown.length} />
            ))}
            {needsSpacer && <div aria-hidden="true" />}
            {shown.map((project) => (
              <ProjectCard key={`${project.number}-copy`} project={project} total={shown.length} copy />
            ))}
            {needsSpacer && <div aria-hidden="true" />}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}