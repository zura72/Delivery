# PUTRA PRASETYO TRANS (P2T) 🚚

Website **layanan ekspedisi on-demand** — kirim kargo & pindahan dari lokasi A ke B
menggunakan **armada pickup & truk** (gaya Lalamove, khusus angkutan barang).
Termasuk **halaman pemesanan multi-step** di `#/pesan` (rute → armada → muatan → kontak → ringkasan).
Dibangun dengan **React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion**, responsif di
semua perangkat (iOS, Android, Windows, macOS) dan berjalan mulus di semua browser modern.

## ✨ Fitur

- **Hero** dengan visualisasi rute A → B beranimasi (truk bergerak di peta).
- **Armada** — Pickup Bak, Pickup Box, Truk Engkel Box (CDE), Truk CDD, dan Truk Fuso,
  lengkap dengan kapasitas & dimensi.
- **Estimasi ongkir interaktif** — isi rute, pilih armada, tambah titik singgah (multi-stop)
  & tenaga angkut; harga langsung terhitung.
- **Pelacakan muatan** dengan timeline status real-time.
- Layanan, cara kerja, keunggulan, statistik, testimoni, dan CTA.
- Dark UI modern, gradient estetik, mikro-animasi, dan komponen fleksibel/responsif.

## 🛠️ Menjalankan secara lokal

```bash
npm install
npm run dev      # http://localhost:8080
```

Build & preview produksi:

```bash
npm run build
npm run preview  # http://localhost:8080
```

## 🖥️ Hosting di VPS

Spesifikasi & panduan lengkap ada di [docs/VPS-REQUIREMENTS.md](docs/VPS-REQUIREMENTS.md).
Ringkas: 1 vCPU / 1 GB RAM / 20 GB SSD + Nginx sudah cukup (site statis);
2 GB RAM bila build dilakukan di VPS.

## ☁️ Deploy ke Vercel

Sudah dikonfigurasi lewat `vercel.json` (framework Vite, output `dist`).

**Opsi A — CLI**

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

**Opsi B — Git**
Push ke GitHub, lalu "Import Project" di [vercel.com](https://vercel.com). Vercel otomatis
mendeteksi Vite; build command `npm run build`, output `dist`.

## 📁 Struktur

```
src/
  components/   # Navbar, Hero, Estimator, Tracking, Services, dst.
  lib/motion.ts # varian animasi Framer Motion
  App.tsx       # komposisi halaman
  index.css     # tema Tailwind & utilitas
```

## 🧰 Stack

| Area      | Teknologi            |
| --------- | -------------------- |
| Framework | React 18 + Vite 6    |
| Bahasa    | TypeScript           |
| Styling   | Tailwind CSS v4      |
| Animasi   | Framer Motion        |
| Ikon      | lucide-react         |
| Hosting   | Vercel               |
# Delivery
