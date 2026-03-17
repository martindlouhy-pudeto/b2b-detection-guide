export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
        <span className="text-[#00F5C4] font-bold text-lg tracking-widest">PUDETO</span>
        <p>
          Vytvořil{' '}
          <a href="https://dlouhymartin.cz" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#00F5C4] transition-colors">
            Martin Dlouhý
          </a>
          {' | '}
          <a href="https://pudeto.cz" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#00F5C4] transition-colors">
            Pudeto.cz
          </a>
        </p>
      </div>
    </footer>
  )
}
