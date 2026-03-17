export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
      <div className="max-w-3xl mx-auto">
        <div className="inline-block bg-[#00F5C4]/10 border border-[#00F5C4]/30 text-[#00F5C4] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Bezplatný nástroj od Pudeto
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Zjisti kolik návštěvníků tvého webu jsou{' '}
          <span className="text-[#00F5C4]">firmy</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
          Bezplatný GTM script + krok za krokem průvodce nastavením pro GA4
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#download"
            className="bg-[#00F5C4] text-[#061213] font-bold px-8 py-4 rounded-xl hover:bg-[#00F5C4]/90 transition-colors text-lg"
          >
            Stáhnout script zdarma
          </a>
          <a
            href="#guide"
            className="border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:border-[#00F5C4]/50 hover:text-[#00F5C4] transition-colors text-lg"
          >
            Zobrazit průvodce
          </a>
        </div>
      </div>
    </section>
  )
}
