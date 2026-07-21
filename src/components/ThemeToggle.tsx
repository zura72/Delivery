import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

const isDarkNow = () => document.documentElement.classList.contains('dark')
const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function persist(dark: boolean) {
  try {
    localStorage.setItem('p2t-theme', dark ? 'dark' : 'light')
  } catch {
    /* storage tidak tersedia */
  }
}

// Ganti tema dengan reveal melingkar dari titik (x, y) tombol.
function switchTheme(next: boolean, x?: number, y?: number) {
  const root = document.documentElement
  const commit = () => root.classList.toggle('dark', next)
  persist(next)

  const startVT = (
    document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> }
    }
  ).startViewTransition

  if (prefersReduced() || typeof startVT !== 'function') {
    if (typeof startVT !== 'function') {
      root.classList.add('theme-transition')
      commit()
      window.setTimeout(() => root.classList.remove('theme-transition'), 500)
    } else {
      commit()
    }
    return
  }

  if (x != null && y != null) {
    root.style.setProperty('--tx', `${(x / window.innerWidth) * 100}%`)
    root.style.setProperty('--ty', `${(y / window.innerHeight) * 100}%`)
  }
  root.classList.add('vt-theme')
  const transition = startVT.call(document, commit)
  transition.finished.finally(() => root.classList.remove('vt-theme'))
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState(isDarkNow)

  // Sinkronkan ikon antar semua instance toggle lewat perubahan class di <html>
  useEffect(() => {
    const observer = new MutationObserver(() => setDark(isDarkNow()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    switchTheme(!isDarkNow(), rect.left + rect.width / 2, rect.top + rect.height / 2)
  }

  return (
    <button
      onClick={handleClick}
      aria-label={dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      title={dark ? 'Mode terang' : 'Mode gelap'}
      className={`group relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white ${className}`}
    >
      {/* kilau hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center text-amber-400"
          >
            <Sun className="h-[18px] w-[18px]" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center text-brand-400"
          >
            <Moon className="h-[18px] w-[18px]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
