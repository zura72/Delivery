# Graph Report - public  (2026-07-20)

## Corpus Check
- Corpus is ~1,239 words - fits in a single context window. You may not need a graph.

## Summary
- 36 nodes · 55 edges · 6 communities
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.84)
- Token cost: 159,938 input · 0 output

## Community Hubs (Navigation)
- Perizinan OSS & NIB
- Akta Pendirian & Pengurus
- Bidang Usaha (KBLI)
- Logo & Identitas Brand
- Favicon & Ikon Aplikasi
- Anggaran Dasar & KBLI Konstruksi

## God Nodes (most connected - your core abstractions)
1. `Data Perseroan / Pengesahan Pendirian (profil SABH)` - 17 edges
2. `NIB 1907260010681 (Perizinan Berusaha Berbasis Risiko, terbit 19 Juli 2026)` - 10 edges
3. `SK Menteri Hukum AHU-0056811.AH.01.01.TAHUN 2026 (17 Juli 2026)` - 8 edges
4. `Akta Pendirian PT Nomor 117 tanggal 17 Juli 2026` - 7 edges
5. `PT Putra Prasetyo Trans` - 4 edges
6. `Putra Prasetyo Trans Web Logo` - 4 edges
7. `Notaris Tunjung Widhi Wasesa Suwadji, S.H., M.Kn. (Kab. Semarang)` - 3 edges
8. `Fahri Ramadhan (Direktur, 700 lembar saham)` - 3 edges
9. `Lukman Alfiansyah (Komisaris, 300 lembar saham)` - 3 edges
10. `KBLI 43905 Penyewaan Alat Konstruksi dengan Operator` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Data Perseroan / Pengesahan Pendirian (profil SABH)` --conceptually_related_to--> `SK Menteri Hukum AHU-0056811.AH.01.01.TAHUN 2026 (17 Juli 2026)`  [INFERRED]
  perseroan.pdf → SK.pdf
- `Data Perseroan / Pengesahan Pendirian (profil SABH)` --references--> `PT Putra Prasetyo Trans`  [EXTRACTED]
  perseroan.pdf → NIB.pdf
- `NIB 1907260010681 (Perizinan Berusaha Berbasis Risiko, terbit 19 Juli 2026)` --references--> `Kedudukan: Perumahan Batu Putih No. 31, Harjamukti, Cimanggis, Kota Depok, Jawa Barat 16454`  [EXTRACTED]
  NIB.pdf → perseroan.pdf
- `NIB 1907260010681 (Perizinan Berusaha Berbasis Risiko, terbit 19 Juli 2026)` --references--> `KBLI 77100 Penyewaan dan Sewa Guna Usaha Kendaraan Bermotor`  [EXTRACTED]
  NIB.pdf → perseroan.pdf
- `NIB 1907260010681 (Perizinan Berusaha Berbasis Risiko, terbit 19 Juli 2026)` --references--> `KBLI 77393 Penyewaan dan Sewa Guna Usaha Mesin dan Peralatan Konstruksi dan Teknik Sipil`  [EXTRACTED]
  NIB.pdf → perseroan.pdf

## Hyperedges (group relationships)
- **Alur Pendirian Badan Hukum PT Putra Prasetyo Trans (Akta - SK Kemenkum - NIB OSS)** — notaris_akta_pendirian_117, sk_kepmen_ahu_0056811, nib_nomor_induk_berusaha_1907260010681, perseroan_data_perseroan, nib_pt_putra_prasetyo_trans [EXTRACTED 1.00]
- **Struktur Pengurus dan Pemegang Saham (Fahri Ramadhan 70%, Lukman Alfiansyah 30%)** — notaris_fahri_ramadhan, notaris_lukman_alfiansyah, nib_pt_putra_prasetyo_trans [EXTRACTED 1.00]
- **Portofolio bidang usaha transportasi, logistik, dan penyewaan alat** — perseroan_kbli_49231, perseroan_kbli_49232, perseroan_kbli_49295, perseroan_kbli_52101, perseroan_kbli_53200, perseroan_kbli_77100, perseroan_kbli_77393, perseroan_kbli_43905, perseroan_kbli_79110, perseroan_kbli_95311 [INFERRED 0.85]

## Communities (6 total, 0 thin omitted)

### Community 0 - "Perizinan OSS & NIB"
Cohesion: 0.25
Nodes (8): BSrE-BSSN (Balai Sertifikasi Elektronik), Menteri Investasi dan Hilirisasi / Kepala BKPM, NIB 1907260010681 (Perizinan Berusaha Berbasis Risiko, terbit 19 Juli 2026), Sistem OSS (Online Single Submission), UU Nomor 6 Tahun 2023 (Cipta Kerja), Kedudukan: Perumahan Batu Putih No. 31, Harjamukti, Cimanggis, Kota Depok, Jawa Barat 16454, KBLI 79110 Aktivitas Agen Perjalanan, KBLI 95311 Reparasi Mobil

### Community 1 - "Akta Pendirian & Pengurus"
Cohesion: 0.39
Nodes (8): PT Putra Prasetyo Trans, Akta Pendirian PT Nomor 117 tanggal 17 Juli 2026, Fahri Ramadhan (Direktur, 700 lembar saham), Lukman Alfiansyah (Komisaris, 300 lembar saham), Notaris Tunjung Widhi Wasesa Suwadji, S.H., M.Kn. (Kab. Semarang), Daftar Perseroan Nomor AHU-0166666.AH.01.11.TAHUN 2026, Kementerian Hukum RI (Ditjen AHU / Kemenkumham), SK Menteri Hukum AHU-0056811.AH.01.01.TAHUN 2026 (17 Juli 2026)

### Community 2 - "Bidang Usaha (KBLI)"
Cohesion: 0.38
Nodes (7): Data Perseroan / Pengesahan Pendirian (profil SABH), KBLI 49231 Angkutan Bermotor untuk Barang Umum, KBLI 49232 Angkutan Bermotor untuk Barang Khusus, KBLI 49295 Angkutan Sewa, KBLI 52101 Pengelola Gudang Sistem Resi Gudang, KBLI 53200 Aktivitas Kurir, KBLI 77100 Penyewaan dan Sewa Guna Usaha Kendaraan Bermotor

### Community 3 - "Logo & Identitas Brand"
Cohesion: 0.47
Nodes (6): Putra Prasetyo Trans Web Logo, Forward Arrow / Route Motif, Navy and Steel-Blue Brand Palette, P2T Monogram, Putra Prasetyo Trans (Company), Transport / Delivery Services

### Community 4 - "Favicon & Ikon Aplikasi"
Cohesion: 0.83
Nodes (4): Blue-Cyan Gradient Palette, Delivery Arrow Motif, P2T Brand Identity, P2T Favicon Logo Mark

### Community 5 - "Anggaran Dasar & KBLI Konstruksi"
Cohesion: 0.67
Nodes (3): Anggaran Dasar Perseroan (Pasal 1-20), KBLI 43905 Penyewaan Alat Konstruksi dengan Operator, KBLI 77393 Penyewaan dan Sewa Guna Usaha Mesin dan Peralatan Konstruksi dan Teknik Sipil

## Knowledge Gaps
- **9 isolated node(s):** `Sistem OSS (Online Single Submission)`, `Menteri Investasi dan Hilirisasi / Kepala BKPM`, `UU Nomor 6 Tahun 2023 (Cipta Kerja)`, `BSrE-BSSN (Balai Sertifikasi Elektronik)`, `Kementerian Hukum RI (Ditjen AHU / Kemenkumham)` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Data Perseroan / Pengesahan Pendirian (profil SABH)` connect `Bidang Usaha (KBLI)` to `Perizinan OSS & NIB`, `Akta Pendirian & Pengurus`, `Anggaran Dasar & KBLI Konstruksi`?**
  _High betweenness centrality (0.293) - this node is a cross-community bridge._
- **Why does `NIB 1907260010681 (Perizinan Berusaha Berbasis Risiko, terbit 19 Juli 2026)` connect `Perizinan OSS & NIB` to `Akta Pendirian & Pengurus`, `Bidang Usaha (KBLI)`, `Anggaran Dasar & KBLI Konstruksi`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `SK Menteri Hukum AHU-0056811.AH.01.01.TAHUN 2026 (17 Juli 2026)` connect `Akta Pendirian & Pengurus` to `Bidang Usaha (KBLI)`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **What connects `Sistem OSS (Online Single Submission)`, `Menteri Investasi dan Hilirisasi / Kepala BKPM`, `UU Nomor 6 Tahun 2023 (Cipta Kerja)` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._