import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'B2B Detection Guide | Pudeto',
  description: 'Zjisti kolik návštěvníků tvého webu jsou firmy. Bezplatný GTM script + průvodce nastavením pro GA4.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
