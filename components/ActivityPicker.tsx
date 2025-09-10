"use client"
import { useEffect, useState } from 'react'

type Category = { id: string; name: string }
type Post = { id: string; title: string; category: string }

export default function ActivityPicker() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selected, setSelected] = useState<string>('')
  const [suggestion, setSuggestion] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(d => setCategories(d.categories || [])).catch(() => {})
  }, [])

  const suggest = async () => {
    setLoading(true)
    setSuggestion(null)
    try {
      const query = selected ? `?category=${encodeURIComponent(selected)}` : ''
      const res = await fetch(`/api/activity${query}`)
      const data = await res.json()
      setSuggestion(data.post || null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-2">Bored at home? Pick a vibe and get an activity.</h3>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <select value={selected} onChange={e => setSelected(e.target.value)} className="rounded border p-2">
          <option value="">Any category</option>
          {categories.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        <button onClick={suggest} disabled={loading} className="btn-gradient px-4 py-2 rounded">Suggest activity</button>
      </div>
      {suggestion && (
        <a href={`/blog/${suggestion.id}`} className="block rounded border p-3 hover:bg-white/5">
          <div className="text-xs uppercase text-gray-400">{suggestion.category}</div>
          <div className="font-semibold">{suggestion.title}</div>
        </a>
      )}
    </div>
  )}


