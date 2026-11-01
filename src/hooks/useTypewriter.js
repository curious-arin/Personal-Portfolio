import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './useInView'

/**
 * Types each word out, holds it, deletes it, then moves to the next one, forever.
 * `words` must be a stable array (define it outside the component).
 * With reduced motion enabled it returns null so the caller can show static text.
 */
export default function useTypewriter(
  words,
  { typeMs = 75, deleteMs = 38, holdMs = 1600, startDelay = 900 } = {},
) {
  const reduce = prefersReducedMotion()
  const [text, setText] = useState('')

  useEffect(() => {
    if (reduce || !words.length) return undefined
    let word = 0
    let count = 0
    let deleting = false
    let timer = 0

    const tick = () => {
      const current = words[word]
      if (!deleting) {
        count += 1
        setText(current.slice(0, count))
        if (count === current.length) {
          deleting = true
          timer = setTimeout(tick, holdMs)
          return
        }
        timer = setTimeout(tick, typeMs + Math.random() * 55)
      } else {
        count -= 1
        setText(current.slice(0, count))
        if (count === 0) {
          deleting = false
          word = (word + 1) % words.length
          timer = setTimeout(tick, 380)
          return
        }
        timer = setTimeout(tick, deleteMs)
      }
    }

    timer = setTimeout(tick, startDelay)
    return () => clearTimeout(timer)
  }, [words, reduce, typeMs, deleteMs, holdMs, startDelay])

  return reduce ? null : text
}
