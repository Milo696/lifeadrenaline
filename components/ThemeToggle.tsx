"use client"
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  const isDark = (theme === 'dark') || (theme === 'system' && resolvedTheme === 'dark')
  return (
    <button
      className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}


