# System Requirements — VPS untuk PUTRA PRASETYO TRANS

Website ini adalah **SPA statis** (hasil `npm run build` berupa file HTML/CSS/JS ± 500 KB,
gzip ± 115 KB). Tidak ada backend/database, jadi kebutuhan servernya sangat ringan.

## Spesifikasi minimum (cukup untuk mulai)

| Komponen  | Minimum                            | Catatan                                      |
| --------- | ---------------------------------- | -------------------------------------------- |
| CPU       | 1 vCPU                             | Nginx menyajikan file statis, beban sangat kecil |
| RAM       | 1 GB                               | Nginx hanya butuh puluhan MB; sisanya buffer OS |
| Disk      | 20 GB SSD                          | OS + web ± 5 GB; sisanya untuk log & update  |
| Bandwidth | 1 TB/bulan                         | ± jutaan kunjungan halaman dengan aset ~150 KB |
| OS        | Ubuntu 22.04 / 24.04 LTS (64-bit)  | Debian 12 / AlmaLinux 9 juga oke             |

## Spesifikasi disarankan (nyaman jangka panjang)

| Komponen | Disarankan | Alasan                                                        |
| -------- | ---------- | ------------------------------------------------------------- |
| CPU      | 2 vCPU     | Headroom saat traffic naik & proses update berjalan           |
| RAM      | 2 GB       | **Build di VPS butuh ± 1,5–2 GB** (Vite + TypeScript); dengan 1 GB tambahkan swap 2 GB |
| Disk     | 40 GB NVMe | Ruang untuk beberapa rilis, log, dan cache npm                |

> 💡 Kalau build dilakukan di lokal/CI (hanya upload folder `dist/`), VPS 1 vCPU / 1 GB
> sudah lebih dari cukup — bahkan paket VPS termurah pun bisa.

## Software yang perlu dipasang

| Software           | Versi            | Fungsi                                        |
| ------------------ | ---------------- | --------------------------------------------- |
| Nginx              | ≥ 1.24 (stable)  | Menyajikan file statis `dist/`                |
| Node.js            | ≥ 20 LTS (22 disarankan) | **Hanya jika build di VPS**; tidak perlu jalan sebagai service |
| Certbot (Let's Encrypt) | terbaru     | HTTPS gratis, wajib untuk produksi            |
| UFW / firewalld    | bawaan OS        | Buka hanya port 22, 80, 443                   |
| Fail2ban           | opsional         | Proteksi brute-force SSH                      |

## Contoh konfigurasi Nginx

```nginx
server {
    listen 80;
    server_name putraprasetyotrans.id www.putraprasetyotrans.id;
    root /var/www/p2t/dist;
    index index.html;

    # SPA fallback (routing pakai hash, tapi ini jaga-jaga)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache aset ber-hash selama 1 tahun
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

## Langkah deploy singkat

```bash
# di VPS (Ubuntu)
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
sudo mkdir -p /var/www/p2t

# dari komputer lokal: build lalu upload
npm run build
scp -r dist/ user@ip-vps:/var/www/p2t/

# aktifkan HTTPS
sudo certbot --nginx -d putraprasetyotrans.id -d www.putraprasetyotrans.id
```

## Catatan

- **Vercel tidak butuh VPS** — kalau tetap deploy ke Vercel (gratis untuk proyek ini),
  VPS tidak diperlukan sama sekali. VPS relevan bila ingin hosting sendiri/pakai domain
  & infrastruktur sendiri.
- Port aplikasi dev (8080) hanya untuk pengembangan lokal; di VPS yang diekspos adalah
  Nginx di port 80/443.
- Jika nanti ditambah backend (login, penyimpanan pesanan, pembayaran), kebutuhan naik:
  minimal 2 vCPU / 4 GB RAM + database (PostgreSQL/MySQL) — sebaiknya dihitung ulang saat itu.
