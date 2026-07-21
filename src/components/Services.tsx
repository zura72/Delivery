import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Truck,
  PackageCheck,
  Car,
  Package,
  Warehouse,
  Wrench,
  ArrowUpRight,
  ArrowRight,
  Check,
  X,
} from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { fadeUp, stagger, viewport } from '../lib/motion'

type Service = {
  icon: typeof Truck
  title: string
  desc: string
  tag: string
  tone: string
  detail: string
  cakupan: string[]
}

// Layanan disusun sesuai bidang usaha resmi (KBLI) PT Putra Prasetyo Trans.
const services: Service[] = [
  {
    icon: Truck,
    title: 'Angkutan Barang Umum',
    desc: 'Pengiriman aneka barang antar lokasi dengan armada pickup & truk yang andal dan terawat.',
    tag: 'KBLI 49231',
    tone: 'from-brand-500/20 to-brand-500/5 text-brand-300',
    detail:
      'Jasa pengangkutan barang umum menggunakan armada bermotor (pickup & truk) melalui jalur darat, baik dalam kota maupun antar kota. Cocok untuk pengiriman aneka barang yang tidak memerlukan penanganan khusus, dengan penjemputan langsung dari lokasi Anda dan pengantaran sampai tujuan.',
    cakupan: [
      'Pengiriman harian antar lokasi',
      'Distribusi ke toko, gudang & reseller',
      'Muatan pindahan rumah & kantor',
      'Pengiriman antar kota se-Indonesia',
    ],
  },
  {
    icon: PackageCheck,
    title: 'Angkutan Barang Khusus',
    desc: 'Penanganan muatan yang butuh perlakuan khusus dengan armada dan prosedur yang sesuai.',
    tag: 'KBLI 49232',
    tone: 'from-accent-500/20 to-accent-500/5 text-accent-300',
    detail:
      'Pengangkutan barang yang membutuhkan penanganan, armada, atau prosedur khusus — seperti muatan berat, berdimensi besar, atau yang perlu perlakuan tertentu selama perjalanan. Ditangani oleh sopir berpengalaman dengan armada yang sesuai untuk menjaga keamanan muatan.',
    cakupan: [
      'Alat berat & mesin industri',
      'Material proyek & konstruksi',
      'Barang berdimensi besar',
      'Muatan yang perlu penanganan khusus',
    ],
  },
  {
    icon: Car,
    title: 'Angkutan Sewa (Charter)',
    desc: 'Sewa kendaraan angkut lengkap dengan sopir untuk kebutuhan pengiriman terjadwal Anda.',
    tag: 'KBLI 49295',
    tone: 'from-violet-500/20 to-violet-500/5 text-violet-300',
    detail:
      'Penyediaan jasa angkutan dengan sistem sewa/charter — Anda menyewa kendaraan lengkap dengan pengemudi untuk kebutuhan pengiriman terjadwal, borongan, atau rutin. Fleksibel menyesuaikan volume dan frekuensi pengiriman bisnis Anda.',
    cakupan: [
      'Sewa harian penuh dengan sopir',
      'Kontrak pengiriman rutin',
      'Kebutuhan event & proyek',
      'Borongan pengiriman antar kota',
    ],
  },
  {
    icon: Package,
    title: 'Layanan Kurir',
    desc: 'Aktivitas kurir untuk paket dan dokumen — dijemput dari lokasi A, diantar ke B, terlacak.',
    tag: 'KBLI 53200',
    tone: 'from-rose-500/20 to-rose-500/5 text-rose-300',
    detail:
      'Aktivitas kurir untuk pengiriman paket, dokumen, dan barang berukuran kecil hingga menengah dari titik A ke titik B. Dijemput dari lokasi Anda, diantar ke tujuan, dan status pengirimannya dapat dipantau.',
    cakupan: [
      'Paket & dokumen penting',
      'Pengiriman same-day dalam kota',
      'Paket e-commerce',
      'Titik jemput & antar yang fleksibel',
    ],
  },
  {
    icon: Wrench,
    title: 'Sewa Kendaraan & Alat',
    desc: 'Penyewaan kendaraan bermotor serta mesin & peralatan konstruksi, dengan atau tanpa operator.',
    tag: 'KBLI 77100 · 77393',
    tone: 'from-amber-500/20 to-amber-500/5 text-amber-300',
    detail:
      'Penyewaan dan sewa guna usaha kendaraan bermotor serta mesin dan peralatan konstruksi & teknik sipil — tersedia dengan maupun tanpa operator. Solusi bagi bisnis yang membutuhkan armada atau alat tambahan tanpa harus membelinya.',
    cakupan: [
      'Sewa pickup & truk (per unit)',
      'Mesin & peralatan konstruksi',
      'Alat berat dengan operator (KBLI 43905)',
      'Kebutuhan proyek jangka pendek & panjang',
    ],
  },
  {
    icon: Warehouse,
    title: 'Pergudangan',
    desc: 'Pengelolaan gudang dengan sistem resi gudang untuk mendukung rantai pasok bisnis Anda.',
    tag: 'KBLI 52101',
    tone: 'from-emerald-500/20 to-emerald-500/5 text-emerald-300',
    detail:
      'Pengelolaan gudang dengan sistem resi gudang untuk penyimpanan barang dan dukungan rantai pasok. Membantu bisnis menyimpan stok dengan aman sebelum didistribusikan ke tujuan berikutnya.',
    cakupan: [
      'Penyimpanan barang & stok',
      'Sistem resi gudang',
      'Dukungan distribusi & fulfillment',
      'Penanganan keluar-masuk barang',
    ],
  },
]

export function Services() {
  const [active, setActive] = useState<Service | null>(null)

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
          desc="Enam layanan inti Putra Prasetyo Trans sesuai izin usaha (KBLI) yang terdaftar. Klik tiap layanan untuk melihat penjelasan lengkapnya."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.button
              key={s.title}
              type="button"
              variants={fadeUp}
              onClick={() => setActive(s)}
              aria-label={`Lihat detail ${s.title}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-ink-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60"
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

              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Selengkapnya <ArrowRight className="h-3.5 w-3.5" />
              </span>

              <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-brand-600/0 blur-2xl transition-all duration-500 group-hover:bg-brand-600/20" />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Detail modal — render bersyarat (unmount bersih saat ditutup) */}
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-ink-800 p-6 shadow-2xl sm:p-8"
          >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-600/20 blur-3xl" />

              <button
                onClick={() => setActive(null)}
                aria-label="Tutup"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="relative">
                <div
                  className={`inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${active.tone}`}
                >
                  <active.icon className="h-7 w-7" />
                </div>
                <span className="ml-3 inline-flex rounded-full bg-white/5 px-2.5 py-1 align-middle text-[11px] font-semibold text-accent-300 ring-1 ring-white/10">
                  {active.tag}
                </span>

                <h3 className="mt-5 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  {active.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{active.detail}</p>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Cakupan layanan
                </p>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {active.cakupan.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href="#/pesan"
                    onClick={() => setActive(null)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-3 text-sm font-bold text-on-brand shadow-lg shadow-brand-600/25 transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    <Truck className="h-4.5 w-4.5" /> Pesan Armada
                  </a>
                  <button
                    onClick={() => setActive(null)}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Tutup
                  </button>
                </div>
              </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
