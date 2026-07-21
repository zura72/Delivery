import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Navigation,
  Plus,
  Minus,
  Ruler,
  BadgeCheck,
  ArrowRight,
  Users,
} from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { fadeUp, scaleIn, viewport } from '../lib/motion'
import { fleet, rupiah, estimateDistance } from '../lib/fleet'

const EXTRA_STOP_FEE = 15000
const HELPER_FEE = 50000

export function Estimator() {
  const [origin, setOrigin] = useState('Jakarta Selatan')
  const [dest, setDest] = useState('Bandung')
  const [vehicleKey, setVehicleKey] = useState('engkel-box')
  const [stops, setStops] = useState(0)
  const [helper, setHelper] = useState(false)

  const distance = useMemo(() => estimateDistance(origin, dest), [origin, dest])
  const vehicle = fleet.find((v) => v.key === vehicleKey)!

  const price = useMemo(() => {
    if (distance === 0) return 0
    const raw =
      vehicle.base +
      distance * vehicle.perKm +
      stops * EXTRA_STOP_FEE +
      (helper ? HELPER_FEE : 0)
    return Math.round(raw / 500) * 500
  }, [vehicle, distance, stops, helper])

  return (
    <section id="estimasi" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Estimasi Ongkir"
          title={
            <>
              Cek biaya sewa armada <span className="text-accent-400">seketika</span>
            </>
          }
          desc="Isi rute, pilih pickup atau truk, harga langsung muncul. Tanpa biaya tersembunyi."
        />

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-5"
        >
          {/* Form */}
          <div className="rounded-3xl border border-white/10 bg-ink-800/60 p-6 sm:p-8 lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={<MapPin className="h-4.5 w-4.5 text-brand-400" />} label="Lokasi A (Jemput)">
                <input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="cth. Jakarta Selatan"
                  className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                />
              </Field>
              <Field icon={<Navigation className="h-4.5 w-4.5 text-accent-400" />} label="Lokasi B (Tujuan)">
                <input
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  placeholder="cth. Bandung"
                  className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                />
              </Field>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Pilih armada
              </p>
              <div className="space-y-2.5">
                {fleet.map((v) => {
                  const active = v.key === vehicleKey
                  return (
                    <button
                      key={v.key}
                      onClick={() => setVehicleKey(v.key)}
                      className={`flex w-full items-center gap-3.5 rounded-2xl border p-3 text-left transition-all ${
                        active
                          ? 'border-brand-400/60 bg-brand-500/15 shadow-lg shadow-brand-600/10'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                      }`}
                    >
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                          active ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-on-brand' : 'bg-white/5 text-slate-300'
                        }`}
                      >
                        <v.icon className="h-5.5 w-5.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${active ? 'text-white' : 'text-slate-200'}`}>
                            {v.name}
                          </span>
                          <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold text-accent-300 ring-1 ring-white/10">
                            {v.capacity}
                          </span>
                        </span>
                        <span className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                          <Ruler className="h-3 w-3" /> {v.dimension}
                        </span>
                      </span>
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                          active ? 'border-accent-400 bg-accent-400' : 'border-white/20'
                        }`}
                      >
                        {active && <span className="h-2 w-2 rounded-full bg-ink-900" />}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Add-ons */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">Titik singgah</p>
                  <p className="text-[11px] text-slate-500">+{rupiah(EXTRA_STOP_FEE)} / titik</p>
                </div>
                <div className="flex items-center gap-2">
                  <StepBtn onClick={() => setStops((s) => Math.max(0, s - 1))} disabled={stops === 0}>
                    <Minus className="h-4 w-4" />
                  </StepBtn>
                  <span className="w-5 text-center text-sm font-bold text-white">{stops}</span>
                  <StepBtn onClick={() => setStops((s) => Math.min(5, s + 1))} disabled={stops === 5}>
                    <Plus className="h-4 w-4" />
                  </StepBtn>
                </div>
              </div>

              <button
                onClick={() => setHelper((h) => !h)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
                  helper ? 'border-brand-400/60 bg-brand-500/15' : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className={`h-5 w-5 ${helper ? 'text-accent-400' : 'text-slate-400'}`} />
                  <div>
                    <p className="text-sm font-semibold text-white">Tenaga angkut</p>
                    <p className="text-[11px] text-slate-500">+{rupiah(HELPER_FEE)}</p>
                  </div>
                </div>
                <span
                  className={`relative h-6 w-11 rounded-full transition-colors ${helper ? 'bg-accent-500' : 'bg-white/15'}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-on-brand transition-all ${helper ? 'left-[22px]' : 'left-0.5'}`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-brand-600/25 to-ink-800/80 p-6 sm:p-8 lg:col-span-2">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/20 blur-2xl" />
            <div>
              <p className="text-sm font-medium text-slate-300">Estimasi ongkir</p>
              <motion.p
                key={price}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-1 text-4xl font-black tracking-tight text-white sm:text-5xl"
              >
                {price > 0 ? rupiah(price) : '—'}
              </motion.p>

              <div className="mt-6 space-y-3 text-sm">
                <ResultRow label="Armada" value={vehicle.name} />
                <ResultRow label="Kapasitas" value={vehicle.capacity} />
                <ResultRow label="Jarak tempuh" value={distance > 0 ? `${distance} km` : '—'} />
                <ResultRow label="Estimasi tiba" value={vehicle.eta} />
                <ResultRow label="Asuransi kargo" value="Termasuk" accent />
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-xs text-slate-300 ring-1 ring-white/10">
                <BadgeCheck className="h-4 w-4 text-emerald-400" />
                Sopir berpengalaman &amp; muatan diasuransikan
              </div>
              <a
                href="#/pesan"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-bold text-ink-900 transition-transform hover:scale-[1.02] active:scale-95"
              >
                Pesan Armada
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mt-6 max-w-xl text-center text-xs text-slate-500"
        >
          *Estimasi bersifat simulasi untuk demo. Tarif final dihitung berdasarkan rute, jenis armada &amp; muatan aktual saat pemesanan.
        </motion.p>
      </div>
    </section>
  )
}

function StepBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  )
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors focus-within:border-brand-400/50">
      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {icon} {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}

function ResultRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
      <span className="text-slate-400">{label}</span>
      <span className={`font-semibold ${accent ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
    </div>
  )
}
