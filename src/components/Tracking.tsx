import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, PackageCheck, Truck, Warehouse, ClipboardList, MapPin } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { scaleIn, viewport } from '../lib/motion'

const timeline = [
  { icon: ClipboardList, title: 'Pesanan dibuat', place: 'Truk Engkel Box · Jakarta', time: '08:12', done: true },
  { icon: Truck, title: 'Sopir menjemput muatan', place: 'Gudang Cakung', time: '09:40', done: true },
  { icon: Warehouse, title: 'Muatan selesai dinaikkan', place: 'Cakung, Jakarta', time: '11:05', done: true },
  { icon: Truck, title: 'Dalam perjalanan', place: 'Menuju Bandung', time: '14:20', done: false, active: true },
  { icon: PackageCheck, title: 'Terkirim', place: 'Jl. Merdeka No.8', time: '—', done: false },
]

export function Tracking() {
  const [code, setCode] = useState('PKG-8842-ID')
  const [shown, setShown] = useState(true)

  return (
    <section id="lacak" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Lacak Paket"
          title={
            <>
              Tahu persis di mana <span className="text-accent-400">paketmu</span>
            </>
          }
          desc="Masukkan nomor resi untuk melihat perjalanan paket dari A ke B secara real-time."
        />

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mt-14 max-w-3xl"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink-800/60 p-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-2.5 rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/10">
              <Search className="h-4.5 w-4.5 text-slate-400" />
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Masukkan nomor resi, cth. PKG-8842-ID"
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <button
              onClick={() => setShown(true)}
              className="rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-sm font-bold text-on-brand shadow-lg shadow-brand-600/25 transition-transform hover:scale-[1.02] active:scale-95"
            >
              Lacak
            </button>
          </div>

          <AnimatePresence>
            {shown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-3xl border border-white/10 bg-ink-800/50 p-6 sm:p-8">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <MapPin className="h-4 w-4 text-accent-400" />
                      Resi <span className="font-bold text-white">{code || 'PKG-8842-ID'}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-400/20">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                      Dalam perjalanan
                    </span>
                  </div>

                  <ol className="relative">
                    {timeline.map((t, i) => (
                      <motion.li
                        key={t.title}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="relative flex gap-4 pb-7 last:pb-0"
                      >
                        {i < timeline.length - 1 && (
                          <span
                            className={`absolute left-[19px] top-10 h-[calc(100%-2rem)] w-0.5 ${
                              t.done ? 'bg-gradient-to-b from-accent-500 to-brand-500' : 'bg-white/10'
                            }`}
                          />
                        )}
                        <span
                          className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full ring-4 ${
                            t.done
                              ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-on-brand ring-brand-500/15'
                              : t.active
                                ? 'bg-amber-500/20 text-amber-300 ring-amber-500/15'
                                : 'bg-white/5 text-slate-500 ring-white/5'
                          }`}
                        >
                          <t.icon className="h-5 w-5" />
                          {t.active && (
                            <span className="absolute inset-0 animate-ping rounded-full ring-2 ring-amber-400/40" />
                          )}
                        </span>
                        <div className="flex flex-1 items-start justify-between pt-1.5">
                          <div>
                            <p className={`text-sm font-bold ${t.done || t.active ? 'text-white' : 'text-slate-500'}`}>
                              {t.title}
                            </p>
                            <p className="text-xs text-slate-400">{t.place}</p>
                          </div>
                          <span className="text-xs font-medium text-slate-500">{t.time}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
