import { Instagram, Twitter, Facebook, Mail, Phone } from 'lucide-react'
import { Logo } from './Logo'

const cols = [
  {
    title: 'Layanan',
    links: ['Pickup & Truk On-Demand', 'Kargo Antar Kota', 'Pindahan', 'Multi-Titik', 'Sewa Borongan'],
  },
  {
    title: 'Perusahaan',
    links: ['Tentang Kami', 'Karier', 'Blog', 'Mitra Kurir', 'Kontak'],
  },
  {
    title: 'Bantuan',
    links: ['Pusat Bantuan', 'Cara Kirim', 'Klaim Asuransi', 'Syarat & Ketentuan', 'Kebijakan Privasi'],
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
              Layanan ekspedisi on-demand dengan armada pickup &amp; truk yang
              menghubungkan lokasi A ke B — cepat, aman, dan terlacak.
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
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-400 transition-colors hover:text-white">
                      {l}
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
            <a href="mailto:halo@putraprasetyotrans.id" className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail className="h-3.5 w-3.5" /> halo@putraprasetyotrans.id
            </a>
            <a href="tel:+622150001000" className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5" /> +62 21 5000 1000
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
