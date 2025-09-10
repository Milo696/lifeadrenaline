import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

export const metadata: Metadata = {
  title: {
    default: 'LifeAdrenaline',
    template: '%s | LifeAdrenaline'
  },
  description: 'Lifestyle blog about success, adventures, risks, and entertainment.',
  metadataBase: new URL('https://lifeadrenaline.vercel.app'),
  openGraph: {
    title: 'LifeAdrenaline',
    description: 'Lifestyle, adrenaline, success tips, and entertainment.',
    url: 'https://lifeadrenaline.vercel.app',
    siteName: 'LifeAdrenaline',
    type: 'website'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


