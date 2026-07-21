import { motion } from 'framer-motion'
import {
  Truck,
  PackageCheck,
  Car,
  Package,
  Warehouse,
  Wrench,
  ArrowUpRight,
} from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { fadeUp, stagger, viewport } from '../lib/motion'

// Layanan disusun sesuai bidang usaha resmi (KBLI) PT Putra Prasetyo Trans.
const services = [
  {
    icon: Truck,
    title: 'Angkutan Barang Umum',
    desc: 'Pengiriman aneka barang antar lokasi dengan armada pickup & truk yang andal dan terawat.',
    tag: 'KBLI 49231',
    tone: 'from-brand-500/20 to-brand-500/5 text-brand-300',
  },
  {
    icon: PackageCheck,
    title: 'Angkutan Barang Khusus',
    desc: 'Penanganan muatan yang butuh perlakuan khusus dengan armada dan prosedur yang sesuai.',
    tag: 'KBLI 49232',
    tone: 'from-accent-500/20 to-accent-500/5 text-accent-300',
  },
  {
    icon: Car,
    title: 'Angkutan Sewa (Charter)',
    desc: 'Sewa kendaraan angkut lengkap dengan sopir untuk kebutuhan pengiriman terjadwal Anda.',
    tag: 'KBLI 49295',
    tone: 'from-violet-500/20 to-violet-500/5 text-violet-300',
  },
  {
    icon: Package,
    title: 'Layanan Kurir',
    desc: 'Aktivitas kurir untuk paket dan dokumen — dijemput dari lokasi A, diantar ke B, terlacak.',
    tag: 'KBLI 53200',
    tone: 'from-rose-500/20 to-rose-500/5 text-rose-300',
  },
  {
    icon: Wrench,
    title: 'Sewa Kendaraan & Alat',
    desc: 'Penyewaan kendaraan bermotor serta mesin & peralatan konstruksi, dengan atau tanpa operator.',
    tag: 'KBLI 77100 · 77393',
    tone: 'from-amber-500/20 to-amber-500/5 text-amber-300',
  },
  {
    icon: Warehouse,
    title: 'Pergudangan',
    desc: 'Pengelolaan gudang dengan sistem resi gudang untuk mendukung rantai pasok bisnis Anda.',
    tag: 'KBLI 52101',
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
              Bidang usaha resmi <span className="text-accent-400">kami</span>
            </>
          }
          desc="Enam layanan inti Putra Prasetyo Trans sesuai izin usaha (KBLI) yang terdaftar — dari angkutan barang, kurir, hingga penyewaan armada & pergudangan."
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
