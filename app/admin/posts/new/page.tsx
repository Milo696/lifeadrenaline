import { getSupabaseServer } from '@/lib/supabase/server'
import PostForm from '@/components/admin/PostForm'
import { redirect } from 'next/navigation'

export default async function NewPostPage() {
  const supabase = getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: categories } = await supabase.from('categories').select('id,name')

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Create Post</h1>
      <PostForm categories={categories ?? []} />
    </div>
  )
}


