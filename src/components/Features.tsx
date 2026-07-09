import { motion } from 'framer-motion'
import { ShieldCheck, Radar, Wallet, Headphones, Users, Truck } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { fadeUp, stagger, viewport } from '../lib/motion'

const features = [
  { icon: Radar, title: 'Pelacakan real-time', desc: 'Pantau posisi truk di peta setiap detik, dari penjemputan hingga sampai.' },
  { icon: Truck, title: 'Armada lengkap', desc: 'Pickup sampai truk Fuso — selalu ada ukuran yang pas untuk muatanmu.' },
  { icon: Users, title: 'Sopir & tenaga angkut', desc: 'Sopir berpengalaman, dan opsi tenaga angkut untuk bantu naik-turunkan muatan.' },
  { icon: ShieldCheck, title: 'Asuransi kargo', desc: 'Setiap muatan diasuransikan. Ganti rugi bila rusak atau hilang di jalan.' },
  { icon: Wallet, title: 'Harga transparan', desc: 'Ongkir tampil di awal. Tidak ada biaya kejutan di akhir transaksi.' },
  { icon: Headphones, title: 'Support 24/7', desc: 'Tim kami siap membantu kapan pun lewat chat, telepon, atau email.' },
]

export function Features() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
          <SectionHeading
            center={false}
            eyebrow="Kenapa P2T"
            title={
              <>
                Dibuat untuk pengalaman kirim <span className="text-accent-400">terbaik</span>
              </>
            }
            desc="Teknologi dan jaringan yang andal, dikemas dalam pengalaman yang ramah untuk siapa saja."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid gap-4 sm:grid-cols-2"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-ink-800/50 p-5 transition-colors hover:border-white/20 hover:bg-ink-800"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/10 text-accent-400 transition-transform group-hover:scale-105">
                  <f.icon className="h-5.5 w-5.5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
