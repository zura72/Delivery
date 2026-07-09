import { motion } from 'framer-motion'
import { Truck, PackageCheck } from 'lucide-react'

export function RouteCard() {
  return (
    <div className="relative mx-auto max-w-md rounded-3xl border border-white/10 bg-gradient-to-b from-ink-700/80 to-ink-800/90 p-2 shadow-2xl shadow-black/40 utility-blur">
      <div className="rounded-[20px] bg-ink-900/60 p-5">
        {/* Map area */}
        <div className="relative h-64 overflow-hidden rounded-2xl bg-ink-800 ring-1 ring-white/5">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute left-[-20%] top-1/3 h-40 w-40 rounded-full bg-brand-600/20 blur-2xl" />
          <div className="absolute right-[-10%] bottom-0 h-40 w-40 rounded-full bg-accent-500/20 blur-2xl" />

          <svg viewBox="0 0 360 256" className="absolute inset-0 h-full w-full">
            <path
              d="M52 196 C 120 196, 120 90, 190 90 S 300 60, 312 60"
              fill="none"
              stroke="url(#route)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="10 12"
              className="[animation:dash_18s_linear_infinite]"
            />
            <defs>
              <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#3b82f6" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>

          {/* Courier icon following path (overlay for crisp icon) */}
          <motion.div
            className="absolute left-0 top-0 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink-900 text-accent-400 ring-2 ring-accent-400"
            style={{
              offsetPath:
                "path('M52 196 C 120 196, 120 90, 190 90 S 300 60, 312 60')",
            }}
            animate={{ offsetDistance: ['0%', '100%'] } as never}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Truck className="h-4 w-4" />
          </motion.div>

          {/* Point A */}
          <div className="absolute left-[10%] top-[70%] flex -translate-y-1/2 items-center gap-1.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-500 text-[11px] font-bold text-on-brand ring-4 ring-brand-500/25">
              A
            </span>
          </div>
          {/* Point B */}
          <div className="absolute left-[84%] top-[23%] flex -translate-y-1/2 items-center gap-1.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-500 text-[11px] font-bold text-on-brand ring-4 ring-accent-500/25">
              B
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="mt-4 space-y-3">
          <Row dotClass="bg-brand-500" label="Jemput dari" value="Gudang Cakung, Jakarta" />
          <div className="ml-[7px] h-4 w-px border-l border-dashed border-white/15" />
          <Row dotClass="bg-accent-500" label="Antar ke" value="Jl. Merdeka No.8, Bandung" />
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/5 p-3.5 ring-1 ring-white/10">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <PackageCheck className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-xs text-slate-400">Truk Engkel Box · tiba</p>
              <p className="text-sm font-bold text-white">Hari ini, 16.40</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Ongkir</p>
            <p className="text-sm font-extrabold text-white">Rp 285.000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({
  dotClass,
  label,
  value,
}: {
  dotClass: string
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-3.5 w-3.5 shrink-0 rounded-full ${dotClass} ring-4 ring-white/5`} />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
        <p className="truncate text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  )
}
