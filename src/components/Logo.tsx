export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-2.5 ${className}`}>
      {/* Badge putih berisi mark "P2T" (crop dari logo asli), kontras di light & dark */}
      <span className="relative block h-10 w-16 overflow-hidden rounded-xl bg-[#fdfdfd] shadow-lg shadow-black/10 ring-1 ring-black/10">
        <img
          src="/logo-web.jpg"
          alt="Logo P2T"
          className="absolute left-[-79%] top-[-37%] w-[260%] max-w-none"
        />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-extrabold tracking-wide text-white">
          PUTRA PRASETYO
        </span>
        <span className="block text-[11px] font-bold tracking-[0.35em] text-accent-400">
          TRANS
        </span>
      </span>
    </a>
  )
}
