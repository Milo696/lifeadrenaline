"use client"
import PostForm from '@/components/admin/PostForm'
import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) return router.replace('/admin/login')
      const { data } = await supabaseBrowser.from('categories').select('id,name')
      setCategories(data || [])
    })()
  }, [router])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Create Post</h1>
      <PostForm categories={categories} />
    </div>
  )
}


