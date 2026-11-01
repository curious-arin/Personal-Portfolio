import { useEffect } from 'react'
import { prefersReducedMotion } from './useInView'

/**
 * Slowly auto-scrolls a horizontally scrollable row and loops it forever,
 * while keeping it swipeable. The row's children must be the same set of
 * items twice in a row (A, A) so the jump back is invisible.
 *
 * Auto-scroll pauses while the visitor hovers, touches, or focuses inside the
 * row, and resumes shortly after they let go. It never runs off-screen, in a
 * hidden tab, when the row doesn't overflow, or with reduced motion enabled.
 */
export default function useAutoScroll(ref, { speed = 28, resumeDelay = 1600 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return undefined

    let raf = 0
    let last = 0
    let pos = el.scrollLeft
    let lastSet = el.scrollLeft
    let hold = false
    let resumeAt = 0
    let visible = true

    const loopWidth = () => {
      if (el.scrollWidth <= el.clientWidth + 1) return 0
      const kids = el.children
      const half = kids.length / 2
      if (!half) return 0
      const width = kids[half].offsetLeft - kids[0].offsetLeft
      return width > 0 ? width : 0
    }

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(64, now - (last || now))
      last = now
      if (!visible || document.hidden) return

      // Someone scrolled it by hand (or momentum is still running): follow, and wait.
      if (el.scrollLeft !== lastSet) {
        pos = el.scrollLeft
        lastSet = pos
        resumeAt = now + resumeDelay
        const lw = loopWidth()
        if (lw && pos >= lw) {
          pos -= lw
          el.scrollLeft = pos
          lastSet = el.scrollLeft
        }
        return
      }
      if (hold || now < resumeAt) return

      const lw = loopWidth()
      if (!lw) return
      pos += (speed * dt) / 1000
      if (pos >= lw) pos -= lw
      el.scrollLeft = pos
      lastSet = el.scrollLeft
    }

    const press = () => { hold = true }
    const release = () => { hold = false; resumeAt = performance.now() + resumeDelay }
    const onWheel = () => { resumeAt = performance.now() + resumeDelay }

    el.addEventListener('mouseenter', press)
    el.addEventListener('mouseleave', release)
    el.addEventListener('touchstart', press, { passive: true })
    el.addEventListener('touchend', release, { passive: true })
    el.addEventListener('touchcancel', release, { passive: true })
    el.addEventListener('focusin', press)
    el.addEventListener('focusout', release)
    el.addEventListener('wheel', onWheel, { passive: true })

    let io
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
      io.observe(el)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io?.disconnect()
      el.removeEventListener('mouseenter', press)
      el.removeEventListener('mouseleave', release)
      el.removeEventListener('touchstart', press)
      el.removeEventListener('touchend', release)
      el.removeEventListener('touchcancel', release)
      el.removeEventListener('focusin', press)
      el.removeEventListener('focusout', release)
      el.removeEventListener('wheel', onWheel)
    }
  }, [ref, speed, resumeDelay])
}
