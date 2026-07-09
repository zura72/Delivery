import { motion } from 'framer-motion'
import { fadeUp, viewport } from '../lib/motion'

export function SectionHeading({
  eyebrow,
  title,
  desc,
  center = true,
}: {
  eyebrow: string
  title: React.ReactNode
  desc?: string
  center?: boolean
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {desc && <p className="mt-4 text-pretty text-base leading-relaxed text-slate-400">{desc}</p>}
    </motion.div>
  )
}
