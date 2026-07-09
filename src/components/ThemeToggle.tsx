import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const isDarkNow = () => document.documentElement.classList.contains('dark')

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  try {
    localStorage.setItem('p2t-theme', dark ? 'dark' : 'light')
  } catch {
    /* storage tidak tersedia */
  }
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

  return (
    <button
      onClick={() => applyTheme(!isDarkNow())}
      aria-label={dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      title={dark ? 'Mode terang' : 'Mode gelap'}
      className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white ${className}`}
    >
      {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
    </button>
  )
}
