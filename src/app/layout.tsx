import type { Metadata } from 'next'
import './globals.css'
import Providers from './Provider';

export const metadata: Metadata = {
  title: 'MedX',
  description: 'Proveyendo salud de calidad',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
