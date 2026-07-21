import { motion } from 'framer-motion'
import { ScrollText, Stamp, FileCheck, ArrowRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { fadeUp, stagger, viewport } from '../lib/motion'

const items = [
  {
    icon: ScrollText,
    title: 'Akta Pendirian Resmi',
    code: 'Akta No. 117 · 2026',
    text: 'Didirikan melalui akta notaris resmi sebagai Perseroan Terbatas (PT).',
  },
  {
    icon: Stamp,
    title: 'Disahkan Kemenkumham',
    code: 'AHU-0056811.AH.01.01',
    text: 'Status badan hukum telah disahkan oleh Menteri Hukum Republik Indonesia.',
  },
  {
    icon: FileCheck,
    title: 'Terdaftar & Berizin (OSS)',
    code: 'NIB 1907260010681',
    text: 'Memiliki Nomor Induk Berusaha melalui sistem OSS Kementerian Investasi/BKPM.',
  },
]

export function Testimonials() {
  return (
    <section id="legalitas" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Legalitas"
          title={
            <>
              Perusahaan yang <span className="text-accent-400">legal &amp; terpercaya</span>
            </>
          }
          desc="Putra Prasetyo Trans beroperasi dengan legalitas lengkap — bukan sekadar janji, tapi terbukti dokumen resmi negara."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {items.map((t) => (
            <motion.article
              key={t.title}
              variants={fadeUp}
              className="relative flex flex-col rounded-3xl border border-white/10 bg-ink-800/60 p-6"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-on-brand">
                <t.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">{t.title}</h3>
              <p className="mt-1 font-mono text-xs font-semibold text-accent-300">{t.code}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{t.text}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-8 text-center"
        >
          <a
            href="#/profil"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Lihat profil &amp; dokumen legal lengkap
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
