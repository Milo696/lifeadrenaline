import { getSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CategoriesPage() {
  const supabase = getSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: categories } = await supabase.from('categories').select('id,name').order('name')

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <form action={async (formData: FormData) => {
        'use server'
        const name = String(formData.get('name') || '')
        if (name) await supabase.from('categories').insert({ name })
      }} className="mb-4 flex gap-2">
        <input name="name" placeholder="New category" className="rounded border p-2" />
        <button className="rounded bg-black text-white px-3">Add</button>
      </form>
      <ul className="divide-y rounded border">
        {categories?.map(c => (
          <li key={c.id} className="flex items-center justify-between px-4 py-3">
            <span>{c.name}</span>
            <form action={async () => { 'use server'; await supabase.from('categories').delete().eq('id', c.id) }}>
              <button className="text-sm text-red-600">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}


