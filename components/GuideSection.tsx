'use client'

import { useState } from 'react'

type ChecklistGroup = {
  title?: string
  items: string[]
}

type CodeBlock = {
  label: string
  lines: string[]
}

type Step = {
  title: string
  description: string
  checklists: ChecklistGroup[]
  codeBlock?: CodeBlock
  tip?: string
  warning?: string
}

const guideSteps: Step[] = [
  {
    title: 'Registrace na ipinfo.io',
    description:
      'ipinfo.io je služba která podle IP adresy pozná zda návštěvník přichází z firemní sítě nebo domácího připojení. Free plán = 50 000 dotazů/měsíc. Díky 24h cache v scriptu to stačí i pro tisíce návštěvníků.',
    checklists: [
      {
        items: [
          'Otevři https://ipinfo.io/signup',
          'Vyplň e-mail a heslo → klikni Sign Up',
          'Na onboarding obrazovce: I am signing up to… → "Use as part of a business"',
          'I am most interested in… → zaškrtni "ASN" a "IP to Company"',
          'I will be using IPinfo data for… → "Ad & Marketing Ops" + "Data & Analytics"',
          'API or Database? → "API"',
          'Klikni Continue',
          'Jdi na https://ipinfo.io/account/token',
          'Zkopíruj token (vypadá takto: 33cb1af065765b)',
        ],
      },
    ],
    tip: 'Token si ulož – budeš ho vkládat do scriptu v Kroku 2. Nikdy ho nedávej do veřejného GitHub repozitáře.',
  },
  {
    title: 'GTM Custom HTML Tag',
    description:
      'V Google Tag Manageru vytvoříš tag který se spustí při každé návštěvě webu. Tag zavolá ipinfo.io API, zjistí typ sítě a výsledek (b2b/b2c) pushne do dataLayer odkud ho v Kroku 7 pošleme do GA4.',
    checklists: [
      {
        items: [
          'Otevři https://tagmanager.google.com',
          'Vyber kontejner svého webu',
          'Vlevo klikni na Tags → vpravo nahoře klikni New',
          'Klikni na velký box Tag Configuration',
          'Ze seznamu vyber Custom HTML',
          'Do HTML pole vlož celý stažený script',
          'Na řádku var IPINFO_TOKEN = \'YOUR_IPINFO_TOKEN\'; nahraď YOUR_IPINFO_TOKEN svým tokenem z Kroku 1',
          'Klikni na sekci Triggering (spodní box)',
          'Vyber All Pages (Page View)',
          'Vpravo nahoře do pole Name napiš: Pudeto - B2B Detection',
          'Klikni Save',
        ],
      },
    ],
    tip: 'Script obsahuje 24h cache v sessionStorage – API se volá jen jednou za zařízení za den. Každý další pageview čte výsledek z cache bez dalšího API callu.',
  },
  {
    title: 'Test v GTM Preview módu',
    description:
      'Preview mód spustí tvůj web v debug režimu – uvidíš přesně které tagy se spustily a jaká data jdou do dataLayer. Tím ověříme že script funguje správně ještě před ostrým nasazením.',
    checklists: [
      {
        items: [
          'V GTM klikni na tlačítko Preview (modré, vpravo nahoře)',
          'Otevře se Tag Assistant na tagassistant.google.com',
          'Do pole "Your website\'s URL" zadej URL svého webu',
          'Klikni Connect – web se otevře v novém okně (nechej ho otevřený)',
          'Vrať se do Tag Assistant okna a klikni Continue',
          'V sekci Tags Fired hledej: Pudeto - B2B Detection',
          'V levém sloupci klikni na: visitor_classified',
          'Nahoře klikni na záložku Data Layer',
        ],
      },
    ],
    codeBlock: {
      label: 'Očekávané hodnoty v Data Layer',
      lines: [
        'event: "visitor_classified"',
        'visitor_type: "b2b"  // nebo "b2c"',
        'visitor_country: "CZ"',
      ],
    },
    warning:
      'Pokud Pudeto - B2B Detection není v Tags Fired ale v Tags Not Fired, pravděpodobně máš aktivní blokovač reklam. Nejčastější viníci: Windscribe, uBlock Origin, AdBlock, Ghostery. Dočasně ho vypni a obnov stránku.',
  },
  {
    title: 'Publikování GTM kontejneru',
    description:
      'Preview mód je jen testovací – tag zatím neběží ostře. Publishnutím kontejneru se tag nasadí na živý web a začne sbírat data od reálných návštěvníků.',
    checklists: [
      {
        items: [
          'Zavři Preview mód (klikni na X nebo Finish)',
          'V GTM klikni Submit (modré tlačítko vpravo nahoře)',
          'Do pole Version Name napiš: B2B Detection v1',
          '(Volitelně) do Version Description: "Přidán B2B detection script přes ipinfo.io API"',
          'Klikni Publish',
          'Počkej na potvrzení – uvidíš "Version X published"',
        ],
      },
    ],
  },
  {
    title: 'GTM Trigger pro event visitor_classified',
    description:
      'Trigger je podmínka která říká GTM "kdykoli nastane tato situace, spusť příslušný tag". Potřebujeme trigger který se aktivuje ve chvíli kdy náš script pushne event visitor_classified do dataLayer.',
    checklists: [
      {
        items: [
          'V GTM klikni vlevo na Triggers',
          'Vpravo nahoře klikni New',
          'Klikni na Trigger Configuration',
          'Ze seznamu vyber Custom Event',
          'Do pole Event name napiš přesně: visitor_classified',
          'Nechej zaškrtnuté "All Custom Events"',
          'Vpravo nahoře do Name napiš: CE - visitor_classified',
          'Klikni Save',
        ],
      },
    ],
    tip: 'Název v poli "Event name" musí být naprosto stejný jako název eventu v scriptu. Pokud se liší byť o jedno písmeno, trigger se neaktivuje.',
  },
  {
    title: 'DataLayer Variables v GTM',
    description:
      'Variables (proměnné) říkají GTM jak má číst konkrétní hodnoty z dataLayer. Bez nich by GA4 Event tag nevěděl kde najít hodnoty visitor_type a visitor_country. Vytvoříme dvě proměnné.',
    checklists: [
      {
        title: 'Variable 1 – visitor_type',
        items: [
          'V GTM klikni vlevo na Variables',
          'V sekci User-Defined Variables klikni New',
          'Klikni Variable Configuration',
          'Ze seznamu vyber Data Layer Variable',
          'Data Layer Variable Name: visitor_type',
          'Data Layer Version: Version 2',
          'Name: DLV - visitor_type',
          'Klikni Save',
        ],
      },
      {
        title: 'Variable 2 – visitor_country',
        items: [
          'Variables → User-Defined Variables → New',
          'Variable Configuration → Data Layer Variable',
          'Data Layer Variable Name: visitor_country',
          'Name: DLV - visitor_country',
          'Klikni Save',
        ],
      },
    ],
    codeBlock: {
      label: 'Správně vyplněná Variable',
      lines: [
        'Variable Type:              Data Layer Variable',
        'Data Layer Variable Name:   visitor_type',
        'Data Layer Version:         Version 2',
      ],
    },
  },
  {
    title: 'GA4 Event Tag v GTM',
    description:
      'Tento tag je most mezi GTM a Google Analytics 4. Kdykoli se spustí trigger CE - visitor_classified (Krok 5), tag odešle event visitor_classified do GA4 spolu s hodnotami visitor_type a visitor_country.',
    checklists: [
      {
        items: [
          'V GTM jdi na Tags → New',
          'Klikni Tag Configuration',
          'Ze seznamu vyber: Google Analytics: GA4 Event',
          'Do pole Measurement ID zadej své GA4 ID (začíná G-)',
          '(GA4 → Admin → Data Streams → klikni na stream → Measurement ID)',
          'Do pole Event Name napiš: visitor_classified',
          'Klikni na šipku u Event Parameters – sekce se rozbalí',
          'Klikni Add Parameter → Event Parameter: visitor_type | Value: {{DLV - visitor_type}}',
          'Klikni Add Parameter → Event Parameter: visitor_country | Value: {{DLV - visitor_country}}',
          'V sekci Triggering klikni + a vyber CE - visitor_classified',
          'Name: GA4 - visitor_classified',
          'Klikni Save → Submit → Publish (verze: "GA4 Event Tag v1")',
        ],
      },
    ],
    tip: 'Hodnoty {{DLV - visitor_type}} a {{DLV - visitor_country}} jsou reference na proměnné z Kroku 6. Musíš je napsat přesně včetně {{ }} – nebo je vyber kliknutím na ikonu kostičky vedle pole Value.',
  },
  {
    title: 'Custom Dimensions v GA4',
    description:
      'Custom Dimensions jsou vlastní dimenze které musíš v GA4 zaregistrovat aby je bylo možné používat v reportech. Data se sbírají od okamžiku nasazení GTM tagu, ale bez registrace dimenzí je nelze zobrazit jako sloupec v reportech.',
    checklists: [
      {
        title: 'Dimenze 1 – Visitor Type',
        items: [
          'Otevři https://analytics.google.com',
          'Vyber správný GA4 property',
          'Vlevo dole klikni na Admin (ozubené kolo)',
          'V prostředním sloupci klikni Data display → Custom definitions',
          'Klikni Create custom dimension',
          'Dimension name: Visitor Type',
          'Scope: Event',
          'Event parameter: visitor_type',
          'Klikni Save',
        ],
      },
      {
        title: 'Dimenze 2 – Visitor Country',
        items: [
          'Klikni znovu Create custom dimension',
          'Dimension name: Visitor Country',
          'Scope: Event',
          'Event parameter: visitor_country',
          'Klikni Save',
        ],
      },
    ],
    warning:
      'GA4 potřebuje 24–48 hodin než se Custom Dimensions začnou plnit historickými daty. Data se ale sbírají od okamžiku nasazení – po 48h uvidíš vše zpětně.',
  },
  {
    title: 'Ověření dat v GA4',
    description:
      'Po 24–48 hodinách zkontroluj zda se data správně propisují. V reportech uvidíš event visitor_classified a breakdown b2b vs b2c. V Traffic Acquisition pak přidáš Visitor Type jako sekundární dimenzi a uvidíš které zdroje přivádějí B2B návštěvníky.',
    checklists: [
      {
        title: 'Engagement report',
        items: [
          'Jdi na Reports → Engagement → Events',
          'V tabulce najdi řádek visitor_classified a klikni na něj',
          'Přepni na záložku Event count by Event parameter value',
          'Uvidíš kolik sessionů bylo b2b a kolik b2c',
        ],
      },
      {
        title: 'Traffic Acquisition',
        items: [
          'Jdi na Reports → Acquisition → Traffic acquisition',
          'V tabulce klikni na ikonu + (přidat dimenzi)',
          'Vyhledej: Visitor Type a klikni na ni',
          'Každý řádek se rozdělí na b2b a b2c',
        ],
      },
      {
        title: 'Realtime test (okamžité ověření)',
        items: [
          'Jdi na Admin → DebugView',
          'Otevři web v jiném okně',
          'V DebugView uvidíš event visitor_classified v reálném čase',
          'Klikni na něj a ověř parametry visitor_type a visitor_country',
        ],
      },
    ],
    tip: 'V Looker Studiu pak z těchto dat snadno vytvoříš koláčový graf podílu B2B vs B2C a time series trend v průběhu měsíce.',
  },
]

export default function GuideSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="guide" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Průvodce nastavením</h2>
        <p className="text-white/50 text-center mb-16">9 kroků k funkčnímu B2B trackingu</p>

        <div className="space-y-3">
          {guideSteps.map((step, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`border rounded-2xl transition-colors duration-200 ${
                  isOpen
                    ? 'border-[#00F5C4]/40 bg-[#00F5C4]/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Header – always visible */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-4 p-6 text-left"
                >
                  <div
                    className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isOpen ? 'bg-[#00F5C4] text-[#061213]' : 'bg-[#00F5C4]/15 text-[#00F5C4]'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base">{step.title}</div>
                    {!isOpen && (
                      <div className="text-white/40 text-sm mt-0.5 truncate">{step.description}</div>
                    )}
                  </div>
                  <div
                    className={`text-white/40 text-xl shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ↓
                  </div>
                </button>

                {/* Accordion body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 space-y-6">
                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                      {step.description}
                    </p>

                    {/* Checklists */}
                    {step.checklists.map((group, gi) => (
                      <div key={gi}>
                        {group.title && (
                          <div className="text-xs font-semibold text-[#00F5C4] uppercase tracking-wider mb-3">
                            {group.title}
                          </div>
                        )}
                        <ul className="space-y-2">
                          {group.items.map((item, ji) => (
                            <li key={ji} className="flex items-start gap-3 text-sm text-white/75">
                              <span className="text-[#00F5C4] shrink-0 mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Code block */}
                    {step.codeBlock && (
                      <div>
                        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                          {step.codeBlock.label}
                        </div>
                        <div className="bg-[#061213] border border-white/10 rounded-xl px-4 py-3 font-mono text-sm space-y-1">
                          {step.codeBlock.lines.map((line, li) => (
                            <div key={li} className="text-[#00F5C4]/80">{line}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tip */}
                    {step.tip && (
                      <div className="flex gap-3 bg-[#00F5C4]/8 border border-[#00F5C4]/20 rounded-xl px-4 py-3 text-sm text-white/70">
                        <span className="shrink-0 text-[#00F5C4]">💡</span>
                        <span>{step.tip}</span>
                      </div>
                    )}

                    {/* Warning */}
                    {step.warning && (
                      <div className="flex gap-3 bg-orange-500/8 border border-orange-500/25 rounded-xl px-4 py-3 text-sm text-white/70">
                        <span className="shrink-0">⚠️</span>
                        <span>{step.warning}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
