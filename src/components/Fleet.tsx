import { motion } from 'framer-motion'
import { Ruler, Check } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { fadeUp, stagger, viewport } from '../lib/motion'
import { fleet } from '../lib/fleet'

export function Fleet() {
  return (
    <section id="armada" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Armada"
          title={
            <>
              Pilih <span className="text-accent-400">pickup atau truk</span> sesuai muatan
            </>
          }
          desc="Dari barang seukuran kulkas sampai muatan 7 ton — ada armada yang pas. Semua dengan sopir berpengalaman."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {fleet.map((v, i) => (
            <motion.article
              key={v.key}
              variants={fadeUp}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                i === 2
                  ? 'border-brand-400/40 bg-gradient-to-b from-brand-600/20 to-ink-800/70'
                  : 'border-white/10 bg-ink-800/60 hover:border-white/20'
              }`}
            >
              {i === 2 && (
                <span className="absolute right-5 top-6 rounded-full bg-accent-500/20 px-2.5 py-1 text-[11px] font-semibold text-accent-300 ring-1 ring-accent-400/30">
                  Terpopuler
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/10 text-accent-400">
                  <v.icon className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{v.name}</h3>
                  <p className="text-sm font-semibold text-accent-300">{v.capacity}</p>
                </div>
              </div>

              <div className="mt-5 space-y-2.5 text-sm">
                <p className="flex items-center gap-2 text-slate-300">
                  <Ruler className="h-4 w-4 text-slate-500" /> {v.dimension}
                </p>
                <p className="flex items-start gap-2 text-slate-400">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> Cocok untuk {v.goodFor.toLowerCase()}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-slate-500">Estimasi tiba</span>
                <span className="text-sm font-bold text-white">{v.eta}</span>
              </div>
              <a
                href="#estimasi"
                className="mt-4 flex items-center justify-center rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                Hitung ongkir
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
