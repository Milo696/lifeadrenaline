import { getSupabaseServer } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdminHome() {
  const supabase = getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: posts } = await supabase.from('posts').select('id,title,created_at').order('created_at', { ascending: false }).limit(10)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link href="/admin/posts/new" className="rounded bg-black text-white px-3 py-2 text-sm">New Post</Link>
      </div>
      <ul className="divide-y rounded border">
        {posts?.map(p => (
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


