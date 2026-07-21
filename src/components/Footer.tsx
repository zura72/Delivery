import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import { Logo } from './Logo'

const cols = [
  {
    title: 'Layanan',
    links: [
      { label: 'Angkutan Barang Umum', href: '#layanan' },
      { label: 'Angkutan Barang Khusus', href: '#layanan' },
      { label: 'Layanan Kurir', href: '#layanan' },
      { label: 'Sewa Kendaraan & Alat', href: '#layanan' },
      { label: 'Pergudangan', href: '#layanan' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang Kami', href: '#/profil' },
      { label: 'Legalitas & Dokumen', href: '#/profil' },
      { label: 'Karier', href: '#' },
      { label: 'Mitra Sopir', href: '#' },
      { label: 'Kontak', href: '#' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { label: 'Pusat Bantuan', href: '#' },
      { label: 'Cara Kirim', href: '#cara-kerja' },
      { label: 'Klaim Asuransi', href: '#' },
      { label: 'Syarat & Ketentuan', href: '#' },
      { label: 'Kebijakan Privasi', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-900 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              PT Putra Prasetyo Trans — ekspedisi &amp; transportasi barang berbadan
              hukum resmi. Angkutan barang, kurir, sewa armada &amp; pergudangan.
            </p>
            <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-slate-500">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Perumahan Batu Putih No. 31,
              Kel. Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454
            </p>
            <div className="mt-5 flex gap-2.5">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-bold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PUTRA PRASETYO TRANS. Dibuat dengan ❤️ di Indonesia.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
            <a href="mailto:ptputraprasetyo@gmail.com" className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail className="h-3.5 w-3.5" /> ptputraprasetyo@gmail.com
            </a>
            <a href="tel:+6281912715758" className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5" /> 0819-1271-5758
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
