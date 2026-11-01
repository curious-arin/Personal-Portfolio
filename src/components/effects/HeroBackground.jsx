import { useEffect, useRef } from 'react'

/**
 * Hero background: a live "neural network": drifting nodes joined by faint links,
 * with glowing signals that travel along the links, light up each node they
 * reach and branch on to its neighbours, like a model thinking. The pointer
 * gently nudges nearby nodes and links to them.
 *
 * Sized to the hero, so it adapts to any screen. The canvas pauses when
 * off-screen or when the tab is hidden, and draws one still frame for
 * visitors who prefer reduced motion.
 */
function NeuralField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia?.('(pointer: coarse)').matches

    const VIOLET = '167,139,250'
    const CYAN = '103,232,249'
    const MAX_PULSES = 34

    let w = 0
    let h = 0
    let linkDist = 150
    let nodes = []
    let pulses = []
    let links = []
    let raf = 0
    let onScreen = true
    let last = 0
    let nextSpawn = 700
    const mouse = { x: -9999, y: -9999, on: false }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      linkDist = Math.max(105, Math.min(170, w * 0.16))
      const count = Math.max(24, Math.min(coarse ? 46 : 68, Math.round((w * h) / 15500)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        r: 1.1 + Math.random() * 1.7,
        ph: Math.random() * Math.PI * 2,
        glow: 0,
        tint: Math.random() < 0.28 ? CYAN : VIOLET,
      }))
      pulses = []
      frame(0, 0)
    }

    const spawn = (a, b, hops = 0) => {
      if (pulses.length >= MAX_PULSES) return
      pulses.push({ a, b, t: 0, hops })
    }

    const frame = (now, dt) => {
      ctx.clearRect(0, 0, w, h)

      // ── move nodes ──
      for (const n of nodes) {
        n.x += n.vx * dt
        n.y += n.vy * dt
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        if (mouse.on) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 130 * 130 && d2 > 1) {
            const d = Math.sqrt(d2)
            const f = (1 - d / 130) * 0.5
            n.x += (dx / d) * f
            n.y += (dy / d) * f
          }
        }
        n.glow = Math.max(0, n.glow - dt * 0.0016)
      }

      // ── links ──
      links.length = 0
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < linkDist * linkDist) {
            const k = 1 - Math.sqrt(d2) / linkDist
            links.push([i, j])
            ctx.strokeStyle = `rgba(${VIOLET},${k * 0.2 + Math.max(a.glow, b.glow) * 0.25 * k})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        if (mouse.on) {
          const dx = a.x - mouse.x
          const dy = a.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 170 * 170) {
            const k = 1 - Math.sqrt(d2) / 170
            ctx.strokeStyle = `rgba(${CYAN},${k * 0.45})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      // ── signals travelling along links ──
      if (dt > 0) {
        nextSpawn -= dt
        if (nextSpawn <= 0 && links.length) {
          const [i, j] = links[(Math.random() * links.length) | 0]
          if (Math.random() < 0.5) spawn(i, j)
          else spawn(j, i)
          nextSpawn = 260 + Math.random() * 420
        }
      }

      for (let p = pulses.length - 1; p >= 0; p--) {
        const s = pulses[p]
        const a = nodes[s.a]
        const b = nodes[s.b]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const len = Math.hypot(dx, dy) || 1
        s.t += (dt * 0.24) / len // ~240 px per second

        if (len > linkDist * 1.3) { pulses.splice(p, 1); continue } // link snapped as nodes drifted apart
        if (s.t >= 1) {
          b.glow = 1
          pulses.splice(p, 1)
          // branch on to a neighbour
          if (s.hops < 4 && Math.random() < 0.72) {
            const next = []
            for (const [i, j] of links) {
              if (i === s.b && j !== s.a) next.push(j)
              else if (j === s.b && i !== s.a) next.push(i)
            }
            if (next.length) spawn(s.b, next[(Math.random() * next.length) | 0], s.hops + 1)
          }
          continue
        }

        const x = a.x + dx * s.t
        const y = a.y + dy * s.t
        const tail = Math.min(46, len * s.t)
        const tx = x - (dx / len) * tail
        const ty = y - (dy / len) * tail
        const g = ctx.createLinearGradient(tx, ty, x, y)
        g.addColorStop(0, `rgba(${CYAN},0)`)
        g.addColorStop(1, `rgba(${CYAN},0.85)`)
        ctx.strokeStyle = g
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(x, y)
        ctx.stroke()

        const halo = ctx.createRadialGradient(x, y, 0, x, y, 9)
        halo.addColorStop(0, 'rgba(207,250,254,0.95)')
        halo.addColorStop(0.35, `rgba(${CYAN},0.35)`)
        halo.addColorStop(1, `rgba(${CYAN},0)`)
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(x, y, 9, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.lineWidth = 1

      // ── nodes ──
      for (const n of nodes) {
        const idle = 0.38 + 0.22 * Math.sin(now * 0.0014 + n.ph)
        const a = Math.min(1, idle + n.glow * 0.7)
        if (n.glow > 0.02) {
          ctx.strokeStyle = `rgba(${CYAN},${n.glow * 0.55})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r + (1 - n.glow) * 12, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.fillStyle = n.glow > 0.05 ? `rgba(207,250,254,${a})` : `rgba(${n.tint},${a})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + n.glow * 1.4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min(48, now - (last || now))
      last = now
      if (!onScreen || document.hidden) return
      frame(now, dt)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouse.on = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      mouse.x = x
      mouse.y = y
    }
    const onLeave = () => { mouse.on = false }

    build()
    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(build)
      ro.observe(canvas)
    }
    let io
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting
      })
      io.observe(canvas)
    }
    if (!reduce) {
      raf = requestAnimationFrame(loop)
      if (!coarse) {
        window.addEventListener('pointermove', onMove, { passive: true })
        document.addEventListener('pointerleave', onLeave)
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      io?.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}

export default function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden="true">
      <NeuralField />
      <div className="hero-vignette" />
    </div>
  )
}
