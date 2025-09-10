import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">LifeAdrenaline</Link>
        <nav className="flex items-center gap-3 sm:gap-6 text-sm">
          <Link href="/blog">Blog</Link>
          <Link href="/admin" className="text-gray-600">Admin</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}


