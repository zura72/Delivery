import { motion } from 'framer-motion'
import { ArrowRight, Apple, Play } from 'lucide-react'
import { fadeUp, viewport } from '../lib/motion'

export function CTA() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-10 h-52 w-52 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-ink-900/30 blur-3xl" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-on-brand sm:text-4xl lg:text-5xl">
              Siap kirim muatan pertamamu?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-on-brand/85 sm:text-lg">
              Gabung sekarang dan dapatkan gratis ongkir untuk 3 pengiriman pertama.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#/pesan"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-on-brand px-6 py-3.5 text-sm font-bold text-[#0f172a] shadow-xl transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
              >
                Mulai Kirim
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-2xl border border-on-brand/25 bg-on-brand/10 px-4 py-3.5 text-sm font-semibold text-on-brand utility-blur transition-colors hover:bg-on-brand/20"
                >
                  <Apple className="h-5 w-5" /> App Store
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-2xl border border-on-brand/25 bg-on-brand/10 px-4 py-3.5 text-sm font-semibold text-on-brand utility-blur transition-colors hover:bg-on-brand/20"
                >
                  <Play className="h-5 w-5" /> Google Play
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
