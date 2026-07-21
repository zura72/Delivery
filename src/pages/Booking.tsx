import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  MapPin,
  Navigation,
  Plus,
  Trash2,
  CalendarClock,
  Ruler,
  Users,
  Package,
  Phone,
  User,
  ArrowLeft,
  ArrowRight,
  Check,
  BadgeCheck,
  PartyPopper,
  Copy,
} from 'lucide-react'
import { Logo } from '../components/Logo'
import { ThemeToggle } from '../components/ThemeToggle'
import { fleet, rupiah, estimateDistance } from '../lib/fleet'

const EXTRA_STOP_FEE = 15000
const HELPER_FEE = 50000
const INSURANCE_RATE = 0.002 // 0,2% dari nilai barang

const steps = ['Rute', 'Armada', 'Muatan', 'Kontak', 'Ringkasan'] as const

const cargoTypes = [
  'Furnitur & Perabot',
  'Elektronik',
  'Bahan Bangunan',
  'Stok Dagangan',
  'Mesin & Sparepart',
  'Pindahan Rumah/Kantor',
  'Lainnya',
]

type FormData = {
  origin: string
  dest: string
  stops: string[]
  date: string
  time: string
  vehicleKey: string
  helper: boolean
  cargoType: string
  weight: string
  itemValue: string
  insured: boolean
  note: string
  senderName: string
  senderPhone: string
  receiverName: string
  receiverPhone: string
}

const initialData: FormData = {
  origin: '',
  dest: '',
  stops: [],
  date: '',
  time: '',
  vehicleKey: 'engkel-box',
  helper: false,
  cargoType: cargoTypes[0],
  weight: '',
  itemValue: '',
  insured: true,
  note: '',
  senderName: '',
  senderPhone: '',
  receiverName: '',
  receiverPhone: '',
}

function makeBookingCode() {
  const n = Math.floor(1000 + Math.random() * 9000)
  const m = Math.floor(10 + Math.random() * 90)
  return `P2T-${n}${m}-ID`
}

export function Booking() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(initialData)
  const [tried, setTried] = useState(false)
  const [bookingCode, setBookingCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }))

  const vehicle = fleet.find((v) => v.key === data.vehicleKey)!
  const distance = useMemo(
    () => estimateDistance(data.origin, data.dest),
    [data.origin, data.dest],
  )

  const breakdown = useMemo(() => {
    if (distance === 0) return null
    const basePrice = vehicle.base + distance * vehicle.perKm
    const stopsFee = data.stops.filter((s) => s.trim()).length * EXTRA_STOP_FEE
    const helperFee = data.helper ? HELPER_FEE : 0
    const value = Number(data.itemValue) || 0
    const insuranceFee = data.insured && value > 0 ? Math.round((value * INSURANCE_RATE) / 500) * 500 : 0
    const total = Math.round((basePrice + stopsFee + helperFee + insuranceFee) / 500) * 500
    return { basePrice, stopsFee, helperFee, insuranceFee, total }
  }, [distance, vehicle, data.stops, data.helper, data.insured, data.itemValue])

  const phoneOk = (p: string) => /^(\+62|0)8\d{7,12}$/.test(p.replace(/[\s-]/g, ''))

  const stepValid = (s: number): boolean => {
    switch (s) {
      case 0:
        return data.origin.trim() !== '' && data.dest.trim() !== '' && data.date !== '' && data.time !== ''
      case 1:
        return !!data.vehicleKey
      case 2:
        return data.weight.trim() !== '' && Number(data.weight) > 0
      case 3:
        return (
          data.senderName.trim() !== '' &&
          phoneOk(data.senderPhone) &&
          data.receiverName.trim() !== '' &&
          phoneOk(data.receiverPhone)
        )
      default:
        return true
    }
  }

  const next = () => {
    if (!stepValid(step)) {
      setTried(true)
      return
    }
    setTried(false)
    setStep((s) => Math.min(steps.length - 1, s + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const back = () => {
    setTried(false)
    setStep((s) => Math.max(0, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const confirm = () => {
    setBookingCode(makeBookingCode())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyCode = async () => {
    if (!bookingCode) return
    try {
      await navigator.clipboard.writeText(bookingCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard tidak tersedia */
    }
  }

  const err = (cond: boolean) => tried && cond

  return (
    <div className="relative min-h-screen">
      {/* Ambient bg */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[10%] h-[320px] w-[320px] rounded-full bg-accent-500/15 blur-[110px]" />
      </div>

      {/* Header */}
      <header className="safe-top mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Beranda
          </a>
        </div>
      </header>

      <main className="pb-safe mx-auto max-w-4xl px-4 sm:px-6">
        {bookingCode ? (
          <SuccessScreen
            code={bookingCode}
            data={data}
            vehicleName={vehicle.name}
            total={breakdown?.total ?? 0}
            copied={copied}
            onCopy={copyCode}
          />
        ) : (
          <>
            <h1 className="mt-4 text-center text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Pesan Armada
            </h1>
            <p className="mt-2 text-center text-sm text-slate-400">
              Lengkapi {steps.length} langkah berikut, armada langsung kami jadwalkan.
            </p>

            {/* Stepper */}
            <ol className="mx-auto mt-8 flex max-w-2xl items-center">
              {steps.map((label, i) => {
                const done = i < step
                const active = i === step
                return (
                  <li key={label} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold transition-colors ${
                          done
                            ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-on-brand'
                            : active
                              ? 'bg-white text-ink-900'
                              : 'bg-white/10 text-slate-400'
                        }`}
                      >
                        {done ? <Check className="h-4.5 w-4.5" /> : i + 1}
                      </span>
                      <span
                        className={`hidden text-[11px] font-semibold sm:block ${
                          active ? 'text-white' : done ? 'text-accent-300' : 'text-slate-500'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <span
                        className={`mx-2 mb-0 h-0.5 flex-1 rounded-full sm:mb-5 ${
                          done ? 'bg-gradient-to-r from-brand-500 to-accent-500' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </li>
                )
              })}
            </ol>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="mt-8 rounded-3xl border border-white/10 bg-ink-800/60 p-6 sm:p-8"
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <StepTitle>Rute pengiriman</StepTitle>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        icon={<MapPin className="h-4.5 w-4.5 text-brand-400" />}
                        label="Lokasi A (Jemput)"
                        error={err(!data.origin.trim()) ? 'Wajib diisi' : undefined}
                      >
                        <input
                          value={data.origin}
                          onChange={(e) => set('origin', e.target.value)}
                          placeholder="Alamat lengkap penjemputan"
                          className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                        />
                      </Field>
                      <Field
                        icon={<Navigation className="h-4.5 w-4.5 text-accent-400" />}
                        label="Lokasi B (Tujuan)"
                        error={err(!data.dest.trim()) ? 'Wajib diisi' : undefined}
                      >
                        <input
                          value={data.dest}
                          onChange={(e) => set('dest', e.target.value)}
                          placeholder="Alamat lengkap tujuan"
                          className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                        />
                      </Field>
                    </div>

                    {/* Extra stops */}
                    {data.stops.map((s, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="flex-1">
                          <Field
                            icon={<MapPin className="h-4.5 w-4.5 text-amber-400" />}
                            label={`Titik singgah ${i + 1} (+${rupiah(EXTRA_STOP_FEE)})`}
                          >
                            <input
                              value={s}
                              onChange={(e) =>
                                set(
                                  'stops',
                                  data.stops.map((x, j) => (j === i ? e.target.value : x)),
                                )
                              }
                              placeholder="Alamat titik singgah"
                              className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                            />
                          </Field>
                        </div>
                        <button
                          onClick={() => set('stops', data.stops.filter((_, j) => j !== i))}
                          aria-label="Hapus titik singgah"
                          className="mt-3 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-rose-500/15 hover:text-rose-400"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    ))}
                    {data.stops.length < 5 && (
                      <button
                        onClick={() => set('stops', [...data.stops, ''])}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-white/20 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:border-accent-400/50 hover:text-accent-300"
                      >
                        <Plus className="h-4 w-4" /> Tambah titik singgah
                      </button>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        icon={<CalendarClock className="h-4.5 w-4.5 text-brand-400" />}
                        label="Tanggal jemput"
                        error={err(!data.date) ? 'Wajib diisi' : undefined}
                      >
                        <input
                          type="date"
                          value={data.date}
                          min={new Date().toISOString().slice(0, 10)}
                          onChange={(e) => set('date', e.target.value)}
                          className="w-full bg-transparent text-sm font-medium text-white outline-none"
                        />
                      </Field>
                      <Field
                        icon={<CalendarClock className="h-4.5 w-4.5 text-accent-400" />}
                        label="Waktu jemput"
                        error={err(!data.time) ? 'Wajib diisi' : undefined}
                      >
                        <input
                          type="time"
                          value={data.time}
                          onChange={(e) => set('time', e.target.value)}
                          className="w-full bg-transparent text-sm font-medium text-white outline-none"
                        />
                      </Field>
                    </div>

                    {distance > 0 && (
                      <p className="rounded-xl bg-white/5 px-4 py-3 text-sm text-slate-300 ring-1 ring-white/10">
                        Perkiraan jarak: <span className="font-bold text-white">{distance} km</span>
                      </p>
                    )}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <StepTitle>Pilih armada</StepTitle>
                    <div className="space-y-2.5">
                      {fleet.map((v) => {
                        const active = v.key === data.vehicleKey
                        return (
                          <button
                            key={v.key}
                            onClick={() => set('vehicleKey', v.key)}
                            className={`flex w-full items-center gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                              active
                                ? 'border-brand-400/60 bg-brand-500/15 shadow-lg shadow-brand-600/10'
                                : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                            }`}
                          >
                            <span
                              className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
                                active
                                  ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-on-brand'
                                  : 'bg-white/5 text-slate-300'
                              }`}
                            >
                              <v.icon className="h-6 w-6" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-2">
                                <span className={`text-sm font-bold ${active ? 'text-white' : 'text-slate-200'}`}>
                                  {v.name}
                                </span>
                                <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold text-accent-300 ring-1 ring-white/10">
                                  {v.capacity}
                                </span>
                              </span>
                              <span className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                                <Ruler className="h-3 w-3" /> {v.dimension} · {v.goodFor}
                              </span>
                            </span>
                            <span className="shrink-0 text-right">
                              <span className="block text-[11px] text-slate-500">mulai</span>
                              <span className="text-sm font-extrabold text-white">{rupiah(v.base)}</span>
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    <button
                      onClick={() => set('helper', !data.helper)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                        data.helper ? 'border-brand-400/60 bg-brand-500/15' : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Users className={`h-5 w-5 ${data.helper ? 'text-accent-400' : 'text-slate-400'}`} />
                        <span>
                          <span className="block text-sm font-semibold text-white">Tenaga angkut</span>
                          <span className="text-[11px] text-slate-500">
                            Bantu naik-turunkan muatan · +{rupiah(HELPER_FEE)}
                          </span>
                        </span>
                      </span>
                      <span
                        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                          data.helper ? 'bg-accent-500' : 'bg-white/15'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-on-brand transition-all ${
                            data.helper ? 'left-[22px]' : 'left-0.5'
                          }`}
                        />
                      </span>
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <StepTitle>Detail muatan</StepTitle>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field icon={<Package className="h-4.5 w-4.5 text-brand-400" />} label="Jenis barang">
                        <select
                          value={data.cargoType}
                          onChange={(e) => set('cargoType', e.target.value)}
                          className="w-full bg-transparent text-sm font-medium text-white outline-none"
                        >
                          {cargoTypes.map((c) => (
                            <option key={c} value={c} className="bg-ink-800">
                              {c}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field
                        icon={<Package className="h-4.5 w-4.5 text-accent-400" />}
                        label="Perkiraan berat (kg)"
                        error={err(!(Number(data.weight) > 0)) ? 'Isi berat yang valid' : undefined}
                      >
                        <input
                          type="number"
                          min={1}
                          value={data.weight}
                          onChange={(e) => set('weight', e.target.value)}
                          placeholder="cth. 500"
                          className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        icon={<BadgeCheck className="h-4.5 w-4.5 text-emerald-400" />}
                        label="Nilai barang (Rp, untuk asuransi)"
                      >
                        <input
                          type="number"
                          min={0}
                          value={data.itemValue}
                          onChange={(e) => set('itemValue', e.target.value)}
                          placeholder="cth. 5000000"
                          className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                        />
                      </Field>
                      <button
                        onClick={() => set('insured', !data.insured)}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
                          data.insured ? 'border-brand-400/60 bg-brand-500/15' : 'border-white/10 bg-white/[0.03]'
                        }`}
                      >
                        <span>
                          <span className="block text-sm font-semibold text-white">Asuransi kargo</span>
                          <span className="text-[11px] text-slate-500">0,2% dari nilai barang</span>
                        </span>
                        <span
                          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                            data.insured ? 'bg-accent-500' : 'bg-white/15'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-on-brand transition-all ${
                              data.insured ? 'left-[22px]' : 'left-0.5'
                            }`}
                          />
                        </span>
                      </button>
                    </div>

                    <Field icon={<Package className="h-4.5 w-4.5 text-slate-400" />} label="Catatan untuk sopir (opsional)">
                      <textarea
                        value={data.note}
                        onChange={(e) => set('note', e.target.value)}
                        rows={3}
                        placeholder="cth. Barang mudah pecah, ada lift di lokasi jemput…"
                        className="w-full resize-none bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                      />
                    </Field>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <StepTitle>Data pengirim</StepTitle>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          icon={<User className="h-4.5 w-4.5 text-brand-400" />}
                          label="Nama pengirim"
                          error={err(!data.senderName.trim()) ? 'Wajib diisi' : undefined}
                        >
                          <input
                            value={data.senderName}
                            onChange={(e) => set('senderName', e.target.value)}
                            placeholder="Nama lengkap"
                            className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                          />
                        </Field>
                        <Field
                          icon={<Phone className="h-4.5 w-4.5 text-brand-400" />}
                          label="No. HP pengirim"
                          error={err(!phoneOk(data.senderPhone)) ? 'Format: 08xx / +628xx' : undefined}
                        >
                          <input
                            type="tel"
                            value={data.senderPhone}
                            onChange={(e) => set('senderPhone', e.target.value)}
                            placeholder="08xxxxxxxxxx"
                            className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                          />
                        </Field>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <StepTitle>Data penerima</StepTitle>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          icon={<User className="h-4.5 w-4.5 text-accent-400" />}
                          label="Nama penerima"
                          error={err(!data.receiverName.trim()) ? 'Wajib diisi' : undefined}
                        >
                          <input
                            value={data.receiverName}
                            onChange={(e) => set('receiverName', e.target.value)}
                            placeholder="Nama lengkap"
                            className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                          />
                        </Field>
                        <Field
                          icon={<Phone className="h-4.5 w-4.5 text-accent-400" />}
                          label="No. HP penerima"
                          error={err(!phoneOk(data.receiverPhone)) ? 'Format: 08xx / +628xx' : undefined}
                        >
                          <input
                            type="tel"
                            value={data.receiverPhone}
                            onChange={(e) => set('receiverPhone', e.target.value)}
                            placeholder="08xxxxxxxxxx"
                            className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-5">
                    <StepTitle>Ringkasan pesanan</StepTitle>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <div className="space-y-3 rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10">
                        <SummaryRow label="Rute" value={`${data.origin} → ${data.dest}`} />
                        {data.stops.filter((s) => s.trim()).length > 0 && (
                          <SummaryRow
                            label="Titik singgah"
                            value={data.stops.filter((s) => s.trim()).join(' · ')}
                          />
                        )}
                        <SummaryRow label="Jadwal jemput" value={`${data.date} ${data.time}`} />
                        <SummaryRow label="Armada" value={`${vehicle.name} (${vehicle.capacity})`} />
                        <SummaryRow label="Muatan" value={`${data.cargoType} · ±${data.weight} kg`} />
                        <SummaryRow label="Pengirim" value={`${data.senderName} · ${data.senderPhone}`} />
                        <SummaryRow label="Penerima" value={`${data.receiverName} · ${data.receiverPhone}`} />
                        {data.note.trim() && <SummaryRow label="Catatan" value={data.note} />}
                      </div>

                      <div className="rounded-2xl bg-gradient-to-b from-brand-600/25 to-ink-800/70 p-5 ring-1 ring-white/10">
                        <p className="text-sm font-semibold text-slate-300">Rincian biaya</p>
                        {breakdown ? (
                          <div className="mt-3 space-y-2.5 text-sm">
                            <PriceRow label={`Armada · ${distance} km`} value={rupiah(breakdown.basePrice)} />
                            {breakdown.stopsFee > 0 && (
                              <PriceRow label="Titik singgah" value={rupiah(breakdown.stopsFee)} />
                            )}
                            {breakdown.helperFee > 0 && (
                              <PriceRow label="Tenaga angkut" value={rupiah(breakdown.helperFee)} />
                            )}
                            {breakdown.insuranceFee > 0 && (
                              <PriceRow label="Asuransi kargo" value={rupiah(breakdown.insuranceFee)} />
                            )}
                            <div className="flex items-center justify-between border-t border-white/15 pt-3">
                              <span className="font-bold text-white">Total</span>
                              <span className="text-xl font-black text-white">{rupiah(breakdown.total)}</span>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-3 text-sm text-slate-400">Lengkapi rute untuk melihat biaya.</p>
                        )}
                        <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
                          *Simulasi demo. Tarif final dikonfirmasi tim kami sebelum penjemputan.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    onClick={back}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4" /> Kembali
                  </button>
                  {step < steps.length - 1 ? (
                    <button
                      onClick={next}
                      className="group inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-sm font-bold text-on-brand shadow-lg shadow-brand-600/25 transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      Lanjut
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <button
                      onClick={confirm}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-ink-900 transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      <BadgeCheck className="h-4.5 w-4.5" /> Konfirmasi Pesanan
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </main>
    </div>
  )
}

function SuccessScreen({
  code,
  data,
  vehicleName,
  total,
  copied,
  onCopy,
}: {
  code: string
  data: FormData
  vehicleName: string
  total: number
  copied: boolean
  onCopy: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="mx-auto mt-10 max-w-lg text-center"
    >
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-500/25 to-accent-500/15 text-emerald-400 ring-8 ring-emerald-500/10">
        <PartyPopper className="h-9 w-9" />
      </span>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
        Pesanan diterima! 🎉
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        Tim kami akan menghubungi <span className="font-semibold text-white">{data.senderPhone}</span> untuk
        konfirmasi. Simpan kode pemesanan berikut untuk melacak muatanmu.
      </p>

      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-xl font-black tracking-widest text-accent-300">
          {code}
        </span>
        <button
          onClick={onCopy}
          aria-label="Salin kode"
          className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>

      <div className="mt-8 space-y-3 rounded-3xl border border-white/10 bg-ink-800/60 p-6 text-left">
        <SummaryRow label="Rute" value={`${data.origin} → ${data.dest}`} />
        <SummaryRow label="Jadwal" value={`${data.date} ${data.time}`} />
        <SummaryRow label="Armada" value={vehicleName} />
        <SummaryRow label="Total" value={rupiah(total)} bold />
      </div>

      <a
        href="#top"
        className="mt-8 inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3.5 text-sm font-bold text-on-brand shadow-lg shadow-brand-600/25 transition-transform hover:scale-[1.02]"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
      </a>
    </motion.div>
  )
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-white">{children}</h2>
}

function Field({
  icon,
  label,
  error,
  children,
}: {
  icon: React.ReactNode
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        className={`block rounded-2xl border px-4 py-3 transition-colors focus-within:border-brand-400/50 ${
          error ? 'border-rose-500/50 bg-rose-500/5' : 'border-white/10 bg-white/[0.03]'
        }`}
      >
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {icon} {label}
        </span>
        <div className="mt-1.5">{children}</div>
      </label>
      {error && <p className="mt-1.5 px-1 text-xs font-medium text-rose-400">{error}</p>}
    </div>
  )
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="shrink-0 text-slate-400">{label}</span>
      <span className={`text-right ${bold ? 'text-base font-black text-white' : 'font-semibold text-white'}`}>
        {value}
      </span>
    </div>
  )
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  )
}
