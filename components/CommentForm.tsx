"use client"
import { useState } from 'react'

export default function CommentForm({ postId }: { postId: string }) {
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setOk(false)
    try {
      const res = await fetch('/api/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ post_id: postId, text }) })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Ошибка отправки')
      }
      setText('')
      setOk(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-2">
      {error && <div className="text-sm text-red-600">{error}</div>}
      {ok && <div className="text-sm text-green-600">Comment added (refresh to see it).</div>}
      <textarea value={text} onChange={e => setText(e.target.value)} className="w-full rounded border p-2" placeholder="Your comment" required />
      <button disabled={loading} className="rounded bg-black text-white px-3 py-2 text-sm disabled:opacity-50">Send</button>
    </form>
  )
}


