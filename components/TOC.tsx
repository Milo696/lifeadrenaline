"use client"
import { useEffect, useState } from 'react'

type Item = { id: string; text: string; level: number }

export default function TOC() {
  const [items, setItems] = useState<Item[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll(".prose h2, .prose h3")) as HTMLHeadingElement[]
    const mapped = headings.map(h => ({ id: h.id, text: h.textContent || '', level: h.tagName === 'H2' ? 2 : 3 }))
    setItems(mapped)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive((entry.target as HTMLElement).id) })
    }, { rootMargin: '0px 0px -70% 0px' })
    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  if (!items.length) return null

  return (
    <aside className="sticky top-24 hidden lg:block w-64 h-[calc(100vh-6rem)] overflow-auto pl-6">
      <div className="text-sm font-semibold mb-2">Оглавление</div>
      <ul className="space-y-2 text-sm">
        {items.map(item => (
          <li key={item.id} className={item.level === 3 ? 'ml-3' : ''}>
            <a href={`#${item.id}`} className={`hover:underline ${active === item.id ? 'text-brand-700 dark:text-brand-400' : 'text-gray-600 dark:text-gray-300'}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}


