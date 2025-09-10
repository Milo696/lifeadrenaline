import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

export const metadata: Metadata = {
  title: {
    default: 'ThrillHub',
    template: '%s | ThrillHub'
  },
  description: 'Lifestyle blog about success, adventures, risks, and entertainment.',
  metadataBase: new URL('https://lifeadrenaline.vercel.app'),
  openGraph: {
    title: 'ThrillHub',
    description: 'Lifestyle, adrenaline, success tips, and entertainment.',
    url: 'https://lifeadrenaline.vercel.app',
    siteName: 'ThrillHub',
    type: 'website'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={`min-h-screen min-w-full text-gray-100 antialiased adrenaline-bg`}> 
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


