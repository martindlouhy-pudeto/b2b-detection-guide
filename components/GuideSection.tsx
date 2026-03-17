const guideSteps = [
  {
    title: 'Registrace na ipinfo.io',
    description: 'Získej API token na ipinfo.io/signup',
    items: [
      'Jdi na ipinfo.io/signup a zaregistruj se',
      'Bezplatný plán: 50 000 požadavků/měsíc',
      'Zkopíruj svůj API token z dashboardu',
    ],
  },
  {
    title: 'GTM Custom HTML Tag',
    description: 'Vytvoř nový tag v Google Tag Manageru',
    items: [
      'Vytvoř nový tag typu Custom HTML',
      'Vlož stažený script a nahraď YOUR_IPINFO_TOKEN',
      'Trigger: All Pages',
      'Název tagu: "Pudeto - B2B Detection"',
    ],
  },
  {
    title: 'Test v Preview módu',
    description: 'Ověř správnou funkci před publikací',
    items: [
      'Klikni Preview v GTM',
      'Zadej URL svého webu',
      'Ověř tag v sekci Tags Fired',
      'Zkontroluj visitor_type v Data Layer',
    ],
  },
  {
    title: 'Publikuj GTM kontejner',
    description: 'Nasaď změny do produkce',
    items: [
      'Klikni Submit',
      'Název verze: "B2B Detection v1"',
      'Klikni Publish',
    ],
  },
  {
    title: 'GTM Trigger',
    description: 'Vytvoř trigger pro custom event',
    items: [
      'Triggers → New → Custom Event',
      'Event name: visitor_classified',
      'Název triggeru: CE - visitor_classified',
    ],
  },
  {
    title: 'DataLayer Variables',
    description: 'Vytvoř 2 proměnné pro data z Data Layer',
    items: [
      'Variables → New → Data Layer Variable',
      '"DLV - visitor_type" → field: visitor_type',
      '"DLV - visitor_country" → field: visitor_country',
    ],
  },
  {
    title: 'GA4 Event Tag',
    description: 'Odešli data do Google Analytics 4',
    items: [
      'Tags → New → GA4 Event',
      'Measurement ID: tvoje G-XXXXXXXX',
      'Event Name: visitor_classified',
      'Parametry: visitor_type a visitor_country',
      'Trigger: CE - visitor_classified',
    ],
  },
  {
    title: 'Custom Dimensions v GA4',
    description: 'Zaregistruj dimenze v Google Analytics',
    items: [
      'GA4 Admin → Custom definitions',
      'Přidej "Visitor Type" (param: visitor_type)',
      'Přidej "Visitor Country" (param: visitor_country)',
    ],
  },
  {
    title: 'Ověř data v GA4',
    description: 'Zkontroluj příchozí data po 24–48 hodinách',
    items: [
      'Počkej 24–48 hodin',
      'Reports → Engagement → Events',
      'Najdi event: visitor_classified',
      'Ověř hodnoty b2b / b2c v dimenzi Visitor Type',
    ],
  },
]

export default function GuideSection() {
  return (
    <section id="guide" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Průvodce nastavením</h2>
        <p className="text-white/50 text-center mb-16">9 kroků k funkčnímu B2B trackingu</p>
        <div className="space-y-6">
          {guideSteps.map((step, i) => (
            <div key={i} className="border border-white/10 rounded-2xl p-6 hover:border-[#00F5C4]/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00F5C4] text-[#061213] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-white/50 text-sm mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-[#00F5C4] mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
