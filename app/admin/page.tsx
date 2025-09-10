"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminHome() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) {
        router.replace('/admin/login')
        return
      }
      const { data } = await supabaseBrowser.from('posts').select('id,title,created_at').order('created_at', { ascending: false }).limit(10)
      setPosts(data || [])
      setLoading(false)
    })()
  }, [router])

  if (loading) return <div>Загрузка...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link href="/admin/posts/new" className="rounded bg-black text-white px-3 py-2 text-sm">New Post</Link>
      </div>
      <ul className="divide-y rounded border">
        {posts.map(p => (
          <li key={p.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-gray-600">{new Date(p.created_at).toLocaleString()}</div>
            </div>
            <div className="flex gap-2 text-sm">
              <Link href={`/admin/posts/${p.id}/edit`} className="underline">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


