import { useEffect, useRef } from 'react'

/**
 * Page background, fixed behind every section: a deep navy gradient with soft
 * drifting glows and a fine dot grid. On desktop the grid lights up around the
 * pointer, a soft spotlight eases after it, and the glows shift slightly with
 * it for depth. Touch devices and reduced-motion visitors get the calm static
 * version. The animation loop only runs while the pointer is still catching up.
 */
export default function AmbientBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return undefined

    let tx = window.innerWidth / 2
    let ty = window.innerHeight * 0.35
    let x = tx
    let y = ty
    let raf = 0
    let running = false

    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.setProperty('--px', `${x.toFixed(1)}px`)
      el.style.setProperty('--py', `${y.toFixed(1)}px`)
      el.style.setProperty('--nx', ((x / window.innerWidth - 0.5) * 2).toFixed(3))
      el.style.setProperty('--ny', ((y / window.innerHeight - 0.5) * 2).toFixed(3))
      if (Math.abs(tx - x) < 0.3 && Math.abs(ty - y) < 0.3) {
        running = false
        return
      }
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      el.classList.add('is-active')
      if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }
    const onLeave = () => el.classList.remove('is-active')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className="ambient" aria-hidden="true">
      <div className="ambient-orb o1"><i /></div>
      <div className="ambient-orb o2"><i /></div>
      <div className="ambient-orb o3"><i /></div>
      <div className="ambient-dots" />
      <div className="ambient-dots-hot" />
      <div className="ambient-glow" />
      <div className="ambient-vignette" />
    </div>
  )
}
