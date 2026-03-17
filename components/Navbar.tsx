export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#061213]/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-[#00F5C4] font-bold text-xl tracking-widest">PUDETO</span>
        <div className="flex gap-6 text-sm text-white/70">
          <a href="#how" className="hover:text-[#00F5C4] transition-colors">Jak to funguje</a>
          <a href="#guide" className="hover:text-[#00F5C4] transition-colors">Průvodce</a>
          <a href="#download" className="hover:text-[#00F5C4] transition-colors">Stáhnout</a>
        </div>
      </div>
    </nav>
  )
}
