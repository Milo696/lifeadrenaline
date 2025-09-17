"use client"
import { useEffect, useState } from 'react'

export default function LikeButton({ postId }: { postId: string }) {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [liked, setLiked] = useState<boolean>(false)

  useEffect(() => {
    fetch(`/api/likes?post_id=${postId}`).then(r => r.json()).then(d => setCount(d.count || 0)).catch(() => {})
  }, [postId])

  const like = async () => {
    if (liked) return
    setLoading(true)
    try {
      await fetch('/api/likes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ post_id: postId }) })
      setCount(c => c + 1)
      setLiked(true)
      // Track event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'like_post', { post_id: postId })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={like} disabled={loading || liked} className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
      ❤ {count}
    </button>
  )
}


