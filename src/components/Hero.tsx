import { motion } from 'framer-motion'
import {
  Truck,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
} from 'lucide-react'
import { fadeUp, stagger, viewport } from '../lib/motion'
import { RouteCard } from './RouteCard'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[120px] ambient-glow" />
        <div className="absolute right-[-10%] top-[20%] h-[360px] w-[360px] rounded-full bg-accent-500/20 blur-[110px] ambient-glow" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.a
            variants={fadeUp}
            href="#estimasi"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-200 utility-blur"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400" />
            Ekspedisi resmi berbadan hukum PT
          </motion.a>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Kirim barang besar,
            <br className="hidden sm:block" /> dari{' '}
            <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
              A ke B
            </span>{' '}
            pakai truk.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0"
          >
            Putra Prasetyo Trans adalah layanan ekspedisi on-demand. Pesan{' '}
            <span className="font-semibold text-white">pickup atau truk</span> untuk
            kirim kargo &amp; pindahan barang — dijemput dari lokasi A, diantar ke B,
            dan terlacak real-time.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
          >
            <a
              href="#estimasi"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3.5 text-sm font-semibold text-on-brand shadow-xl shadow-brand-600/30 transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
            >
              <Truck className="h-4.5 w-4.5" />
              Hitung Ongkir
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#lacak"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              <Navigation className="h-4.5 w-4.5" />
              Lacak Paket
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
          >
            {[
              { icon: Clock, label: 'Jemput < 60 menit' },
              { icon: ShieldCheck, label: 'Asuransi kargo' },
              { icon: Users, label: 'Sopir & tenaga angkut' },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-sm text-slate-300">
                <f.icon className="h-4.5 w-4.5 text-accent-400" />
                {f.label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          viewport={viewport}
          className="relative"
        >
          <RouteCard />

          {/* Floating chips */}
          <motion.div
            className="absolute -left-3 top-8 hidden rounded-2xl border border-white/10 bg-ink-800/80 px-4 py-3 shadow-2xl utility-blur sm:block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/15 text-emerald-400">
                <Truck className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-xs text-slate-400">Sopir tiba dalam</p>
                <p className="text-sm font-bold text-white">18 menit</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
