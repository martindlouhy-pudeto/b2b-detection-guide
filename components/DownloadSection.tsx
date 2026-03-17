export default function DownloadSection() {
  return (
    <section id="download" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stáhnout GTM Script</h2>
        <p className="text-white/50 mb-12">Připravený k okamžitému použití v Google Tag Manageru</p>
        <div className="border border-[#00F5C4]/30 rounded-2xl p-8 bg-[#00F5C4]/5">
          <div className="text-4xl mb-4">📄</div>
          <div className="font-mono text-[#00F5C4] font-semibold mb-2">GTM_B2B_Detection_FINAL.js</div>
          <p className="text-white/50 text-sm mb-8">
            Custom HTML tag připravený k nakopírování do GTM.
            Obsahuje 24h cache a filtrování českých ISP.
          </p>
          <a
            href="/GTM_B2B_Detection_FINAL.js"
            download="GTM_B2B_Detection_FINAL.js"
            className="inline-block bg-[#00F5C4] text-[#061213] font-bold px-10 py-4 rounded-xl hover:bg-[#00F5C4]/90 transition-colors text-lg"
          >
            ↓ Stáhnout script
          </a>
        </div>
      </div>
    </section>
  )
}
