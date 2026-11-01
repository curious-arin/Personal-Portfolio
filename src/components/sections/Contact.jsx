import { useEffect, useRef, useState } from 'react'
import { Mail, Github, Linkedin, ArrowUpRight, Check, Copy } from 'lucide-react'
import Container from '../common/Container'
import Reveal from '../common/Reveal'
import { site } from '../../data/portfolioData'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API can be unavailable on non-secure origins or older mobile browsers.
      const textarea = document.createElement('textarea')
      textarea.value = site.email
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const success = document.execCommand('copy')
      textarea.remove()
      if (success) {
        setCopied(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), 1800)
      }
    }
  }

  const social = [
    { label: 'GitHub', href: site.github, Icon: Github, detail: 'Projects & code' },
    { label: 'LinkedIn', href: site.linkedin, Icon: Linkedin, detail: 'Professional profile' },
  ]

  return (
    <section id="contact" className="page-section surface-c isolate overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-violet-500/[0.08] blur-[90px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/[0.05] blur-[100px]" aria-hidden="true" />

      <Container className="relative max-w-6xl">
        <Reveal>
          <div className="hud-panel overflow-hidden rounded-[1.75rem] border border-violet-300/[0.15] shadow-2xl shadow-black/25">
            <div className="grid lg:grid-cols-[1.1fr_.9fr]">
              <div className="relative p-6 sm:p-9 lg:p-11">
                <p className="mb-3 flex items-center gap-3 font-mono text-xs text-violet">
                  <span className="h-px w-8 shrink-0 bg-violet/60" aria-hidden="true" />
                  Get in touch
                </p>
                <h2 className="max-w-xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                  Have a problem worth <span className="text-violet-400">solving?</span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-300 sm:text-base">
                  I’m always glad to connect with people building thoughtful things with data, machine learning, and AI. Let’s exchange ideas or explore a collaboration.
                </p>
                <a
                  href={`mailto:${site.email}?subject=Let%27s%20connect`}
                  className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:bg-violet-400"
                >
                  <Mail size={16} /> Start a conversation
                  <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="border-t border-white/[0.08] bg-black/15 p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
                <div className="flex flex-col gap-3 rounded-xl border border-white/[0.09] bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">Email address</p>
                    <a href={`mailto:${site.email}`} className="mt-1 block break-words text-sm font-semibold text-zinc-200 transition hover:text-cyan-200">{site.email}</a>
                  </div>
                  <button type="button" onClick={copyEmail} aria-label={copied ? 'Email address copied' : 'Copy email address'} title={copied ? 'Copied' : 'Copy email address'} className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-zinc-300 transition hover:border-cyan-200/30 hover:text-white sm:self-auto">
                    {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                    <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <p className="mb-3 mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">Find me online</p>
                <div className="grid gap-2 min-[480px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {social.map(({ label, href, Icon, detail }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 transition hover:-translate-y-0.5 hover:border-violet-300/30 hover:bg-violet-300/[0.04]">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.05] text-zinc-300 transition group-hover:text-violet-300"><Icon size={17} /></span>
                      <span className="min-w-0 flex-1"><span className="block text-xs font-bold text-zinc-200">{label}</span><span className="mt-0.5 block text-[11px] text-zinc-500">{detail}</span></span>
                      <ArrowUpRight size={14} className="text-zinc-500 transition group-hover:text-violet-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-violet-300/35 to-transparent" aria-hidden="true" />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
