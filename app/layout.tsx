import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { Toaster } from '@/components/components/ui/toaster'
import Analytics from '@/components/Analytics'

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
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Merriweather:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={`min-h-screen min-w-full antialiased bg-gradient-to-b from-[#2d1b0f] to-[#1a0e08] text-[#f4ede1]`}> 
        <ThemeProvider attribute="class" forcedTheme="dark" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}


