import { Truck, Container, PackageOpen } from 'lucide-react'

export type Vehicle = {
  key: string
  name: string
  icon: typeof Truck
  capacity: string
  dimension: string
  goodFor: string
  eta: string
  base: number
  perKm: number
}

/** Armada khusus ekspedisi: hanya pickup & truk. */
export const fleet: Vehicle[] = [
  {
    key: 'pickup-bak',
    name: 'Pickup Bak',
    icon: PackageOpen,
    capacity: 's/d 1 ton',
    dimension: '200 × 130 cm (terbuka)',
    goodFor: 'Barang ringan, material, pindahan kecil',
    eta: 'Hari ini',
    base: 60000,
    perKm: 3500,
  },
  {
    key: 'pickup-box',
    name: 'Pickup Box',
    icon: Container,
    capacity: 's/d 1 ton',
    dimension: '200 × 130 × 120 cm (tertutup)',
    goodFor: 'Barang yang perlu terlindung dari cuaca',
    eta: 'Hari ini',
    base: 70000,
    perKm: 3800,
  },
  {
    key: 'engkel-box',
    name: 'Truk Engkel Box (CDE)',
    icon: Truck,
    capacity: 's/d 2 ton',
    dimension: '300 × 160 × 160 cm',
    goodFor: 'Pindahan rumah, stok toko, furnitur',
    eta: 'Hari ini',
    base: 120000,
    perKm: 5000,
  },
  {
    key: 'cdd',
    name: 'Truk CDD',
    icon: Truck,
    capacity: 's/d 4 ton',
    dimension: '440 × 200 × 200 cm',
    goodFor: 'Kargo besar, distribusi, proyek',
    eta: '1–2 hari',
    base: 200000,
    perKm: 7000,
  },
  {
    key: 'fuso',
    name: 'Truk Fuso',
    icon: Truck,
    capacity: 's/d 7 ton',
    dimension: '570 × 240 × 240 cm',
    goodFor: 'Muatan sangat berat & antar kota',
    eta: '1–3 hari',
    base: 350000,
    perKm: 9500,
  },
]

export const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)

// jarak pseudo-deterministik dari dua string agar demo terasa responsif
export function estimateDistance(a: string, b: string) {
  if (!a.trim() || !b.trim()) return 0
  let h = 0
  const s = a.toLowerCase().trim() + '→' + b.toLowerCase().trim()
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000
  return 4 + (h % 620) // 4–623 km
}
