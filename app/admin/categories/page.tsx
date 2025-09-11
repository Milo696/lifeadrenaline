"use client"
import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/hooks/use-toast'

export default function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [name, setName] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) return router.replace('/admin/login')
      const { data } = await supabaseBrowser.from('categories').select('id,name').order('name')
      setCategories(data || [])
    })()
  }, [router])

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return
    const { error } = await supabaseBrowser.from('categories').insert({ name })
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
      return
    }
    toast({ title: 'Category added' })
    const { data } = await supabaseBrowser.from('categories').select('id,name').order('name')
    setCategories(data || [])
    setName('')
  }

  const del = async (id: string) => {
    const { error } = await supabaseBrowser.from('categories').delete().eq('id', id)
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' })
    else toast({ title: 'Category deleted' })
    setCategories(c => c.filter(x => x.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <form onSubmit={add} className="mb-4 flex gap-2">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="New category" className="rounded border p-2" />
        <button className="rounded bg-black text-white px-3">Add</button>
      </form>
      <ul className="divide-y rounded border">
        {categories.map(c => (
          <li key={c.id} className="flex items-center justify-between px-4 py-3">
            <span>{c.name}</span>
            <button onClick={() => del(c.id)} className="text-sm text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}


