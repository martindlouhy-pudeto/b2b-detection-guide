const steps = [
  { icon: '🌐', title: 'Návštěvník přijde na web' },
  { icon: '🏷️', title: 'GTM Tag se spustí' },
  { icon: '🔍', title: 'ipinfo.io zkontroluje IP' },
  { icon: '🏢', title: 'Klasifikuje: b2b nebo b2c' },
  { icon: '📊', title: 'Data jdou do GA4' },
]

export default function HowItWorksSection() {
  return (
    <section id="how" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Jak to funguje</h2>
        <p className="text-white/50 text-center mb-16">5 kroků od návštěvy po data v GA4</p>
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center flex-1">
              <div className="w-16 h-16 rounded-2xl bg-[#00F5C4]/10 border border-[#00F5C4]/20 flex items-center justify-center text-2xl mb-4">
                {step.icon}
              </div>
              <div className="text-[#00F5C4] text-xs font-bold mb-2">KROK {i + 1}</div>
              <div className="text-sm font-medium text-white/80">{step.title}</div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute text-[#00F5C4]/30 text-2xl" style={{ marginLeft: '100%' }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
