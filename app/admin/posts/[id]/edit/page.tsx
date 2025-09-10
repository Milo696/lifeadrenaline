import { getSupabaseServer } from '@/lib/supabase/server'
import PostForm from '@/components/admin/PostForm'
import { redirect } from 'next/navigation'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: categories } = await supabase.from('categories').select('id,name')
  const { data: post } = await supabase.from('posts').select('*').eq('id', params.id).single()

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Post</h1>
      <PostForm categories={categories ?? []} post={post} />
    </div>
  )
}


