import { motion } from 'framer-motion'
import { MapPinned, Truck, PackageSearch, Smile } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { fadeUp, stagger, viewport } from '../lib/motion'

const steps = [
  {
    icon: MapPinned,
    title: 'Tentukan lokasi A & B',
    desc: 'Masukkan alamat jemput dan tujuan. Sistem otomatis menghitung rute tercepat.',
  },
  {
    icon: PackageSearch,
    title: 'Pilih armada & ongkir',
    desc: 'Tentukan pickup atau truk sesuai muatan. Lihat estimasi harga transparan seketika.',
  },
  {
    icon: Truck,
    title: 'Sopir menjemput muatan',
    desc: 'Sopir terdekat datang menjemput. Pantau posisi truk secara real-time.',
  },
  {
    icon: Smile,
    title: 'Sampai dengan aman',
    desc: 'Muatan tiba di tujuan. Terima notifikasi & bukti foto pengiriman.',
  },
]

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cara Kerja"
          title={
            <>
              Kirim hanya dalam <span className="text-accent-400">4 langkah</span>
            </>
          }
          desc="Prosesnya sesederhana pesan ojek. Tidak perlu antre di konter."
        />

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              variants={fadeUp}
              className="relative rounded-3xl border border-white/10 bg-ink-800/50 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-on-brand shadow-lg shadow-brand-600/25">
                  <s.icon className="h-5.5 w-5.5" />
                </span>
                <span className="text-4xl font-black leading-none text-white/10">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 text-base font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>

              {i < steps.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-white/25 to-transparent lg:block" />
              )}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
