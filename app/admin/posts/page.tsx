"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function PostsAdminPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) return router.replace('/admin/login')
      const { data } = await supabaseBrowser.from('posts').select('id,title,created_at').order('created_at', { ascending: false })
      setPosts(data || [])
    })()
  }, [router])

  const del = async (id: string) => {
    await supabaseBrowser.from('posts').delete().eq('id', id)
    setPosts(list => list.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link href="/admin/posts/new" className="rounded bg-black text-white px-3 py-2 text-sm">New</Link>
      </div>
      <ul className="divide-y rounded border">
        {posts.map(p => (
          <li key={p.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-gray-600">{new Date(p.created_at).toLocaleString()}</div>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/posts/${p.id}/edit`} className="underline">Edit</Link>
              <button onClick={() => del(p.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


