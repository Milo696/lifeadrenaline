import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import Container from './Container'
import AdrenalineLogo from './Logo'

export default function Header() {
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/70">
      <Container className="py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <AdrenalineLogo />
          <span className="text-xl font-bold">ThrillHub</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6 text-sm">
          <Link href="/blog">Blog</Link>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}


