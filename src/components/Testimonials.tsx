import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { fadeUp, stagger, viewport } from '../lib/motion'

const items = [
  {
    name: 'Rani Puspita',
    role: 'Pemilik Toko Furnitur',
    text: 'Kirim sofa dan lemari ke pelanggan sekarang tinggal pesan Truk Engkel Box. Sampai aman, pelanggan bisa lacak sendiri. Omzet naik!',
    initials: 'RP',
    tone: 'from-brand-500 to-accent-500',
  },
  {
    name: 'Dimas Aditya',
    role: 'Manajer Logistik',
    text: 'Untuk distribusi harian ke banyak toko, fitur multi-titik hemat banget. Satu CDD, sekali jalan, semua tujuan kelar.',
    initials: 'DA',
    tone: 'from-violet-500 to-brand-500',
  },
  {
    name: 'Sari Melati',
    role: 'Baru Pindah Rumah',
    text: 'Pindahan satu rumah cuma sehari. Sopir plus tenaga angkutnya ramah dan cekatan, barang nggak ada yang lecet.',
    initials: 'SM',
    tone: 'from-rose-500 to-amber-500',
  },
]

export function Testimonials() {
  return (
    <section id="testimoni" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimoni"
          title={
            <>
              Dipercaya ribuan <span className="text-accent-400">pengirim</span>
            </>
          }
          desc="Cerita nyata dari mereka yang mengandalkan Putra Prasetyo Trans setiap hari."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {items.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="relative flex flex-col rounded-3xl border border-white/10 bg-ink-800/60 p-6"
            >
              <Quote className="h-8 w-8 text-brand-500/40" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-200">
                "{t.text}"
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${t.tone} text-sm font-bold text-on-brand`}
                >
                  {t.initials}
                </span>
                <div className="flex-1">
                  <figcaption className="text-sm font-bold text-white">{t.name}</figcaption>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
