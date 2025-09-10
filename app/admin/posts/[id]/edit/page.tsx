"use client"
import PostForm from '@/components/admin/PostForm'
import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) return router.replace('/admin/login')
      const [{ data: cats }, { data: p }] = await Promise.all([
        supabaseBrowser.from('categories').select('id,name'),
        supabaseBrowser.from('posts').select('*').eq('id', params.id).single()
      ])
      setCategories(cats || [])
      setPost(p)
    })()
  }, [router, params.id])

  if (!post) return <div>Загрузка...</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Post</h1>
      <PostForm categories={categories} post={post} />
    </div>
  )
}


