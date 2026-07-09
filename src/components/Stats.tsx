import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../lib/motion'

const stats = [
  { value: '500+', label: 'Kota terjangkau' },
  { value: '1 Jt+', label: 'Muatan terkirim' },
  { value: '5.000+', label: 'Armada mitra' },
  { value: '99.2%', label: 'Tepat waktu' },
]

export function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-ink-800/40 py-14">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="text-center">
            <p className="bg-gradient-to-r from-brand-300 to-accent-300 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1.5 text-sm text-slate-400">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
