import { ArrowRight, ArrowDownRight, BrainCircuit, Database, Workflow } from 'lucide-react'
import useTypewriter from '../../hooks/useTypewriter'
import { site } from '../../data/portfolioData'
import HeroBackground from '../effects/HeroBackground'
import Container from '../common/Container'

// Roles the heading types out, one after another.
const ROLES = ['Data Analyst', 'Data Scientist', 'ML Engineer', 'GenAI Engineer']

export default function Hero() {
  const typed = useTypewriter(ROLES)
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]"
    >
      <HeroBackground />

      <Container className="relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* ───────── Profile photo (top + centered on mobile, right on desktop) ───────── */}
        <div
          className="rise order-1 flex justify-center lg:order-2 lg:justify-end"
          style={{ '--d': '300ms' }}
        >
          <div className="relative">
            {/* soft glow behind the photo */}
            <div className="absolute inset-0 rounded-full bg-violet/20 blur-3xl" aria-hidden="true" />

            <div className="relative aspect-square w-56 rounded-full border border-violet/40 bg-gradient-to-br from-violet/25 via-[#171321] to-cyan-200/10 p-2 shadow-[0_0_55px_rgba(167,139,250,0.18)] sm:w-56 md:w-64 lg:w-80 xl:w-[26rem]">
              <div className="absolute inset-1 rounded-full border border-white/10" aria-hidden="true" />
              <div
                className="grid h-full w-full place-items-center rounded-full bg-[#121019] text-5xl font-black tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl"
                aria-hidden="true"
              >
                AS
              </div>
              <img
                src="/profile-photo.jpg"
                alt="Portrait of Arin Sharma"
                width="400"
                height="400"
                decoding="async"
                className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-full object-cover"
                onError={(event) => { event.currentTarget.style.display = 'none' }}
              />
            </div>
          </div>
        </div>

        {/* ───────── Description (below card on mobile, left on desktop) ───────── */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="rise mb-3 flex items-center justify-center gap-2 font-mono text-sm text-violet-400 lg:justify-start" style={{ '--d': '100ms' }}>
            <span className="wave-hand text-lg" aria-hidden="true">👋</span>
            Hey there
          </p>

          <h1 className="line-mask text-[clamp(1.75rem,5.5vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-.035em]">
            <span style={{ '--d': '200ms' }}>
              I&apos;m {site.name}<span className="text-violet">.</span>
            </span>
          </h1>

          {/* Typing effect. Screen readers get the full list once; the animated text is hidden from them. */}
          <p
            className="rise mt-3 min-h-[2rem] text-[clamp(1.05rem,3.6vw,1.6rem)] font-bold leading-tight text-zinc-200"
            style={{ '--d': '350ms' }}
          >
            <span className="sr-only">Aspiring {ROLES.join(', ')}.</span>
            <span aria-hidden="true">
              <span className="text-zinc-400">Aspiring </span>
              <span className="bg-gradient-to-r from-violet-400 to-mint bg-clip-text text-transparent">
                {typed === null ? ROLES.join(' · ') : typed}
              </span>
              {typed !== null && <span className="caret ml-0.5 font-light text-violet">|</span>}
            </span>
          </p>

          <p
            className="rise mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-[15px] sm:leading-7 lg:mx-0"
            style={{ '--d': '500ms' }}
          >
            I turn messy data into clear answers and ideas into working AI. I&apos;m building strong
            foundations in analytics, machine learning and generative AI, one hands-on project at a time.
          </p>

          <div
            className="rise mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:mx-0 lg:justify-start"
            style={{ '--d': '650ms' }}
          >
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-violet px-6 py-3.5 text-sm font-extrabold text-ink transition hover:bg-violet-400"
            >
              Download resume
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-bold text-zinc-200 transition hover:border-white/30 hover:bg-white/[0.04]"
            >
              See my projects
              <ArrowDownRight size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>

          <ul
            className="rise mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-xs font-semibold text-zinc-400 lg:justify-start"
            style={{ '--d': '800ms' }}
          >
            <li className="flex items-center gap-2"><BrainCircuit size={15} className="text-violet" />Applied AI</li>
            <li className="flex items-center gap-2"><Database size={15} className="text-violet" />Data analytics</li>
            <li className="flex items-center gap-2"><Workflow size={15} className="text-violet" />Machine learning</li>
          </ul>
        </div>
      </Container>
    </section>
  )
}
