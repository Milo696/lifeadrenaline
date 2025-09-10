"use client"
import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Ошибка подписки')
      }
      setOk(true)
      setEmail('')
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Ваш email" className="w-full rounded border p-2 text-sm" />
      <button disabled={loading} className="rounded bg-black text-white px-3 text-sm">Подписаться</button>
      {ok && <span className="text-green-600 text-sm">Готово</span>}
      {err && <span className="text-red-600 text-sm">{err}</span>}
    </form>
  )
}


