"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchPage() {
  const [q, setQ] = useState('')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const doSearch = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setItems(data.results || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { doSearch() }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex gap-2">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Поиск..." className="w-full rounded border p-2" />
        <button onClick={doSearch} className="rounded bg-black text-white px-3">Найти</button>
      </div>
      {loading ? <div>Загрузка...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(p => (
            <Link key={p.id} href={`/blog/${p.id}`} className="block group rounded border overflow-hidden">
              {p.featured_image ? (
                <Image src={p.featured_image} alt={p.title} width={800} height={450} className="h-48 w-full object-cover" />
              ) : null}
              <div className="p-4">
                <div className="text-xs uppercase text-gray-500">{p.category}</div>
                <div className="mt-1 font-semibold line-clamp-2 group-hover:underline">{p.title}</div>
                {p.excerpt && <p className="text-sm text-gray-600 line-clamp-2 mt-1">{p.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}


