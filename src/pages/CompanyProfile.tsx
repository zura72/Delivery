import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Car,
  Download,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  Landmark,
  Mail,
  MapPin,
  Package,
  Phone,
  ScrollText,
  ShieldCheck,
  Stamp,
  Truck,
  Warehouse,
  Wrench,
  X,
} from 'lucide-react'
import { Logo } from '../components/Logo'
import { ThemeToggle } from '../components/ThemeToggle'
import { fadeUp, stagger, viewport } from '../lib/motion'

/* ---------- Data faktual (diekstrak dari 4 dokumen legal via knowledge graph) ---------- */

const sekilas = [
  { value: '2026', label: 'Tahun Berdiri' },
  { value: 'PT', label: 'Badan Hukum Resmi' },
  { value: '10', label: 'Bidang Usaha (KBLI)' },
  { value: 'UMK', label: 'Skala Usaha' },
]

const registrasi = [
  { label: 'NIB', value: '1907260010681' },
  { label: 'Akta Pendirian', value: 'No. 117' },
  { label: 'SK Kemenkumham', value: 'AHU-0056811.AH.01.01' },
]

const timeline = [
  {
    icon: ScrollText,
    date: '17 Juli 2026',
    title: 'Akta Pendirian Perseroan',
    code: 'Akta No. 117',
    desc: 'Perseroan didirikan melalui akta di hadapan Notaris Tunjung Widhi Wasesa Suwadji, S.H., M.Kn. (kedudukan Kabupaten Semarang).',
  },
  {
    icon: Stamp,
    date: '17 Juli 2026',
    title: 'Pengesahan Badan Hukum',
    code: 'AHU-0056811.AH.01.01.TAHUN 2026',
    desc: 'Status badan hukum disahkan oleh Menteri Hukum Republik Indonesia dan tercatat dalam Daftar Perseroan No. AHU-0166666.AH.01.11.TAHUN 2026.',
  },
  {
    icon: FileCheck,
    date: '19 Juli 2026',
    title: 'Terbit Nomor Induk Berusaha',
    code: 'NIB 1907260010681',
    desc: 'NIB diterbitkan melalui sistem OSS oleh Kementerian Investasi/BKPM berdasarkan UU No. 6 Tahun 2023 tentang Cipta Kerja.',
  },
]

const identitas = [
  { label: 'Nama Perusahaan', value: 'PT PUTRA PRASETYO TRANS' },
  { label: 'Bentuk Badan Usaha', value: 'Perseroan Terbatas (PMDN · Perseroan Tertutup)' },
  { label: 'Skala Usaha', value: 'Usaha Mikro & Kecil (UMK)' },
  { label: 'NPWP Perusahaan', value: '10.000.000.1-044.5056' },
  { label: 'Nomor Pendaftaran OSS', value: '4026071732105470' },
  {
    label: 'Alamat Kedudukan',
    value:
      'Perumahan Batu Putih No. 31, Kel. Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454',
  },
]

const kbliGroups = [
  {
    group: 'Transportasi & Logistik',
    accent: 'text-brand-300',
    items: [
      { kode: '49231', judul: 'Angkutan Bermotor untuk Barang Umum', icon: Truck, inti: true },
      { kode: '49232', judul: 'Angkutan Bermotor untuk Barang Khusus', icon: Truck, inti: true },
      { kode: '49295', judul: 'Angkutan Sewa', icon: Car, inti: true },
      { kode: '53200', judul: 'Aktivitas Kurir', icon: Package, inti: true },
      { kode: '52101', judul: 'Pengelola Gudang (Sistem Resi Gudang)', icon: Warehouse, inti: false },
    ],
  },
  {
    group: 'Penyewaan, Perjalanan & Pendukung',
    accent: 'text-accent-300',
    items: [
      { kode: '77100', judul: 'Penyewaan & Sewa Guna Kendaraan Bermotor', icon: Car, inti: false },
      { kode: '77393', judul: 'Penyewaan Mesin & Peralatan Konstruksi', icon: Wrench, inti: false },
      { kode: '43905', judul: 'Penyewaan Alat Konstruksi dengan Operator', icon: Wrench, inti: false },
      { kode: '79110', judul: 'Aktivitas Agen Perjalanan', icon: MapPin, inti: false },
      { kode: '95311', judul: 'Reparasi Mobil', icon: Wrench, inti: false },
    ],
  },
]

const dokumen = [
  {
    file: '/perseroan.pdf',
    nama: 'Profil Data Perseroan',
    desc: 'Data resmi perseroan: identitas, kedudukan & bidang usaha.',
    icon: Building2,
  },
  {
    file: '/Notaris.pdf',
    nama: 'Akta Pendirian (Notaris)',
    desc: 'Akta No. 117 — anggaran dasar perseroan.',
    icon: ScrollText,
  },
  {
    file: '/SK.pdf',
    nama: 'SK Kemenkumham',
    desc: 'Pengesahan pendirian badan hukum perseroan.',
    icon: Stamp,
  },
  {
    file: '/NIB.pdf',
    nama: 'NIB — Perizinan Berusaha',
    desc: 'Nomor Induk Berusaha & lampiran izin (OSS).',
    icon: FileCheck,
  },
]

/* ---------- Page ---------- */

export function CompanyProfile() {
  const [viewedDoc, setViewedDoc] = useState<(typeof dokumen)[number] | null>(null)

  return (
    <div className="relative min-h-screen">
      {/* Ambient bg */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12%] h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[130px] ambient-glow" />
        <div className="absolute right-[-12%] bottom-[8%] h-[340px] w-[340px] rounded-full bg-accent-500/12 blur-[120px] ambient-glow" />
      </div>

      {/* Header */}
      <header className="safe-top sticky top-0 z-40 border-b border-white/5 bg-ink-900/70 utility-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
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
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ---------- HERO ---------- */}
        <section className="grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-300"
            >
              Company Profile
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              PT Putra Prasetyo{' '}
              <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                Trans
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              Perusahaan ekspedisi &amp; transportasi barang berbadan hukum resmi.
              Melayani angkutan barang umum &amp; khusus, jasa kurir, penyewaan armada,
              hingga pergudangan — dijalankan secara profesional dan legal.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-2.5">
              {['Berbadan Hukum PT', 'Terdaftar OSS/BKPM', 'Disahkan Kemenkumham'].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20"
                >
                  <ShieldCheck className="h-3.5 w-3.5" /> {b}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Registration card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-700/70 to-ink-800/80 p-6 shadow-2xl shadow-black/30 utility-blur sm:p-8"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-600/20 blur-2xl" />
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Landmark className="h-4 w-4 text-accent-400" /> Data Registrasi Resmi
            </p>
            <div className="mt-5 space-y-4">
              {registrasi.map((r) => (
                <div key={r.label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">{r.label}</p>
                  <p className="mt-1 break-words font-mono text-lg font-bold text-white">{r.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ---------- SEKILAS (stat band) ---------- */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4"
        >
          {sekilas.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="bg-ink-800/80 p-6 text-center">
              <p className="bg-gradient-to-r from-brand-300 to-accent-300 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-xs font-medium text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------- 01 TENTANG ---------- */}
        <Section num="01" title="Tentang Perusahaan">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              <p className="text-pretty text-base leading-relaxed text-slate-300">
                <span className="font-semibold text-white">PT Putra Prasetyo Trans</span> adalah
                perseroan terbatas yang bergerak di bidang transportasi, ekspedisi, dan logistik.
                Didirikan pada tahun 2026 dan berkedudukan di Kota Depok, Jawa Barat, perusahaan
                telah memiliki legalitas lengkap: akta notaris, pengesahan badan hukum dari
                Kementerian Hukum, serta Nomor Induk Berusaha (NIB) melalui sistem OSS.
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-slate-300">
                Dengan sepuluh bidang usaha terdaftar (KBLI) yang berpusat pada angkutan barang
                umum &amp; khusus, perusahaan siap menjadi mitra logistik yang andal, aman, dan
                transparan bagi kebutuhan perorangan maupun bisnis di seluruh Indonesia.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="rounded-3xl border border-white/10 bg-ink-800/60 p-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-wide text-accent-300">Visi</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Menjadi perusahaan transportasi &amp; ekspedisi terpercaya yang menghubungkan
                setiap daerah di Indonesia secara cepat, aman, dan profesional.
              </p>
              <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-accent-300">Misi</h3>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-300">
                <li>• Menyediakan armada angkutan yang andal &amp; terawat.</li>
                <li>• Mengutamakan ketepatan waktu &amp; keamanan muatan.</li>
                <li>• Membangun kemitraan logistik jangka panjang.</li>
                <li>• Melayani secara transparan &amp; berbasis teknologi.</li>
              </ul>
            </motion.div>
          </div>
        </Section>

        {/* ---------- 02 LEGALITAS (timeline) ---------- */}
        <Section num="02" title="Legalitas & Perizinan">
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="relative ml-3 border-l-2 border-white/10"
          >
            {timeline.map((t) => (
              <motion.li key={t.title} variants={fadeUp} className="relative ml-8 pb-9 last:pb-0">
                <span className="absolute -left-[42px] grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-on-brand ring-4 ring-ink-900">
                  <t.icon className="h-5 w-5" />
                </span>
                <div className="rounded-2xl border border-white/10 bg-ink-800/60 p-5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="rounded-md bg-accent-500/15 px-2 py-0.5 text-[11px] font-bold text-accent-300">
                      {t.date}
                    </span>
                    <h3 className="text-base font-bold text-white">{t.title}</h3>
                  </div>
                  <p className="mt-1.5 font-mono text-xs font-semibold text-brand-300">{t.code}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </Section>

        {/* ---------- 03 IDENTITAS ---------- */}
        <Section num="03" title="Identitas Perusahaan">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60"
          >
            <dl className="divide-y divide-white/10">
              {identitas.map((row) => (
                <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {row.label}
                  </dt>
                  <dd className="text-sm font-medium text-white">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 bg-white/[0.02] px-6 py-4 text-sm text-slate-400">
              <a href="tel:+6281912715758" className="inline-flex items-center gap-1.5 hover:text-white">
                <Phone className="h-4 w-4 text-accent-400" /> 0819-1271-5758
              </a>
              <a href="mailto:ptputraprasetyo@gmail.com" className="inline-flex items-center gap-1.5 hover:text-white">
                <Mail className="h-4 w-4 text-accent-400" /> ptputraprasetyo@gmail.com
              </a>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent-400" /> Depok, Jawa Barat
              </span>
            </div>
          </motion.div>
        </Section>

        {/* ---------- 04 BIDANG USAHA ---------- */}
        <Section num="04" title="Bidang Usaha (KBLI)">
          <div className="space-y-8">
            {kbliGroups.map((g) => (
              <div key={g.group}>
                <h3 className={`mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide ${g.accent}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" /> {g.group}
                </h3>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {g.items.map((k) => (
                    <motion.div
                      key={k.kode}
                      variants={fadeUp}
                      className={`group relative flex gap-3.5 rounded-2xl border p-4 transition-colors ${
                        k.inti
                          ? 'border-brand-400/40 bg-brand-500/10'
                          : 'border-white/10 bg-ink-800/50 hover:border-white/20'
                      }`}
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                          k.inti
                            ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-on-brand'
                            : 'bg-white/5 text-slate-300'
                        }`}
                      >
                        <k.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] font-bold tracking-wide text-accent-300">
                          KBLI {k.kode}
                        </p>
                        <p className="mt-0.5 text-sm font-medium leading-snug text-white">{k.judul}</p>
                      </div>
                      {k.inti && (
                        <span className="absolute right-3 top-3 rounded-full bg-accent-500/15 px-1.5 py-0.5 text-[9px] font-bold text-accent-300">
                          INTI
                        </span>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- 05 DOKUMEN ---------- */}
        <Section num="05" title="Dokumen Legal">
          <p className="-mt-2 mb-6 max-w-2xl text-sm leading-relaxed text-slate-400">
            Transparansi adalah komitmen kami. Seluruh dokumen legal perusahaan dapat dibaca
            langsung di halaman ini maupun diunduh.
          </p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid gap-4 sm:grid-cols-2"
          >
            {dokumen.map((d) => (
              <motion.div
                key={d.file}
                variants={fadeUp}
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-ink-800/60 p-5 transition-colors hover:border-white/20"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/10 text-accent-400">
                  <d.icon className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white">{d.nama}</h3>
                  <p className="mt-0.5 truncate text-xs text-slate-500">{d.desc}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => setViewedDoc(d)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-3.5 py-2 text-xs font-bold text-on-brand transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    <Eye className="h-4 w-4" /> Baca
                  </button>
                  <a
                    href={d.file}
                    download
                    aria-label={`Unduh ${d.nama}`}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ---------- CTA ---------- */}
        <section className="my-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 px-6 py-12 text-center sm:px-12"
          >
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
            <h2 className="relative mx-auto max-w-xl text-balance text-2xl font-extrabold tracking-tight text-on-brand sm:text-3xl">
              Butuh mitra logistik yang legal &amp; terpercaya?
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-sm text-on-brand/85 sm:text-base">
              Pesan armada pickup atau truk sekarang, atau hubungi tim kami untuk kerja sama.
            </p>
            <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#/pesan"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-on-brand px-6 py-3.5 text-sm font-bold text-[#0f172a] shadow-xl transition-transform hover:scale-[1.03] sm:w-auto"
              >
                <Truck className="h-4.5 w-4.5" /> Pesan Armada
              </a>
              <a
                href="mailto:ptputraprasetyo@gmail.com"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-on-brand/30 bg-on-brand/10 px-6 py-3.5 text-sm font-bold text-on-brand utility-blur transition-colors hover:bg-on-brand/20 sm:w-auto"
              >
                <Mail className="h-4.5 w-4.5" /> Hubungi Kami
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* PDF viewer modal — render bersyarat (unmount bersih saat ditutup) */}
      {viewedDoc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/70 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setViewedDoc(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-2xl"
          >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <FileText className="h-5 w-5 shrink-0 text-accent-400" />
                  <p className="truncate text-sm font-bold text-white">{viewedDoc.nama}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={viewedDoc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10 sm:inline-flex"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Tab baru
                  </a>
                  <button
                    onClick={() => setViewedDoc(null)}
                    aria-label="Tutup"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            <iframe
              src={viewedDoc.file}
              title={viewedDoc.nama}
              className="h-full w-full flex-1 bg-on-brand"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

function Section({
  num,
  title,
  children,
}: {
  num: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="py-10 sm:py-14">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mb-8 flex items-center gap-4"
      >
        <span className="font-mono text-sm font-black text-accent-400">{num}</span>
        <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">{title}</h2>
        <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
      </motion.div>
      {children}
    </section>
  )
}
