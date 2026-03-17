const rows = [
  { situation: 'Zaměstnanec v kanceláři', result: '✅ b2b', reason: 'Firemní IP' },
  { situation: 'Zaměstnanec doma', result: '❌ b2c', reason: 'Domácí ISP' },
  { situation: 'Firemní VPN', result: '✅ b2b', reason: 'VPN má firemní IP' },
  { situation: 'Privátní VPN', result: '❌ b2c', reason: 'NordVPN apod.' },
  { situation: 'Zahraniční firma', result: '❌ b2c', reason: 'Script klasifikuje jen CZ' },
]

export default function LimitationsSection() {
  return (
    <section className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Omezení scriptu</h2>
        <p className="text-white/50 text-center mb-12">Kdy funguje a kdy ne</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/50 font-medium">Situace</th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">Výsledek</th>
                <th className="text-left py-3 px-4 text-white/50 font-medium">Proč</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-4 px-4 text-white/80">{row.situation}</td>
                  <td className="py-4 px-4 font-medium">{row.result}</td>
                  <td className="py-4 px-4 text-white/50">{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
