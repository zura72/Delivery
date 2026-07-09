import { motion } from 'framer-motion'
import {
  Truck,
  Home,
  Route,
  Building2,
  CalendarClock,
  Boxes,
  ArrowUpRight,
} from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { fadeUp, stagger, viewport } from '../lib/motion'

const services = [
  {
    icon: Truck,
    title: 'Pickup & Truk On-Demand',
    desc: 'Pesan pickup atau truk kapan saja. Sopir datang menjemput muatan langsung ke lokasimu.',
    tag: 'Same day',
    tone: 'from-brand-500/20 to-brand-500/5 text-brand-300',
  },
  {
    icon: Route,
    title: 'Kargo Antar Kota',
    desc: 'Kirim muatan besar ke 500+ kota se-Indonesia dengan tarif transparan & terlacak.',
    tag: 'Nasional',
    tone: 'from-accent-500/20 to-accent-500/5 text-accent-300',
  },
  {
    icon: Home,
    title: 'Pindahan Rumah & Kantor',
    desc: 'Furnitur, elektronik, sampai isi satu rumah. Armada box + tenaga angkut siap bantu.',
    tag: 'Moving',
    tone: 'from-violet-500/20 to-violet-500/5 text-violet-300',
  },
  {
    icon: Boxes,
    title: 'Multi-Titik Pengantaran',
    desc: 'Satu truk, banyak tujuan. Distribusi ke beberapa alamat dalam sekali jalan.',
    tag: 'Efisien',
    tone: 'from-rose-500/20 to-rose-500/5 text-rose-300',
  },
  {
    icon: Building2,
    title: 'Solusi Bisnis & Kontrak',
    desc: 'Rekening korporat, tarif khusus, dan armada rutin untuk kebutuhan logistik bisnismu.',
    tag: 'Bisnis',
    tone: 'from-amber-500/20 to-amber-500/5 text-amber-300',
  },
  {
    icon: CalendarClock,
    title: 'Sewa Harian & Borongan',
    desc: 'Butuh truk seharian penuh? Sewa borongan dengan sopir untuk proyek atau event.',
    tag: 'Fleksibel',
    tone: 'from-emerald-500/20 to-emerald-500/5 text-emerald-300',
  },
]

export function Services() {
  return (
    <section id="layanan" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Layanan"
          title={
            <>
              Satu aplikasi untuk semua <span className="text-accent-400">kebutuhan ekspedisi</span>
            </>
          }
          desc="Dari kirim kargo, pindahan, sampai sewa truk borongan — P2T punya armada dan harga yang jujur."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.article
              key={s.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-ink-800"
            >
              <div
                className={`inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${s.tone}`}
              >
                <s.icon className="h-6 w-6" />
              </div>
              <span className="absolute right-5 top-6 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-400 ring-1 ring-white/10">
                {s.tag}
              </span>
              <h3 className="mt-5 flex items-center gap-1.5 text-lg font-bold text-white">
                {s.title}
                <ArrowUpRight className="h-4 w-4 text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-400" />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>

              <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-brand-600/0 blur-2xl transition-all duration-500 group-hover:bg-brand-600/20" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
