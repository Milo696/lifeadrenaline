"use client"
import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/hooks/use-toast'

type Banner = { id: string; slot: string; html: string; active: boolean; weight: number; max_width?: number | null }

export default function BannersAdmin() {
  const router = useRouter()
  const [items, setItems] = useState<Banner[]>([])
  const { toast } = useToast()
  const [slot, setSlot] = useState('home_top')
  const [html, setHtml] = useState('')
  const [weight, setWeight] = useState(1)
  const [active, setActive] = useState(true)
  const [maxWidth, setMaxWidth] = useState<number | ''>('')
  const [fixed, setFixed] = useState(false)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) return router.replace('/admin/login')
      const { data } = await supabaseBrowser.from('banners').select('*').order('created_at', { ascending: false })
      setItems((data as any) || [])
    })()
  }, [router])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload: any = { slot, html, weight, active, fixed }
    if (maxWidth !== '') payload.max_width = maxWidth
    const { error } = await supabaseBrowser.from('banners').insert(payload)
    if (!error) {
      const { data } = await supabaseBrowser.from('banners').select('*').order('created_at', { ascending: false })
      setItems((data as any) || [])
      setHtml('')
      toast({ title: 'Banner created' })
    }
    else toast({ title: 'Error', description: error.message, variant: 'destructive' })
  }

  const toggle = async (id: string, next: boolean) => {
    const { error } = await supabaseBrowser.from('banners').update({ active: next }).eq('id', id)
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' })
    else toast({ title: next ? 'Banner activated' : 'Banner deactivated' })
    setItems((prev) => prev.map(i => i.id === id ? { ...i, active: next } : i))
  }

  const remove = async (id: string) => {
    const { error } = await supabaseBrowser.from('banners').delete().eq('id', id)
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' })
    else toast({ title: 'Banner deleted' })
    setItems(items.filter(i => i.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Banners</h1>
      <form onSubmit={create} className="mb-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          <select value={slot} onChange={e => setSlot(e.target.value)} className="rounded border p-2">
            <option value="home_top">home_top</option>
            <option value="blog_sidebar">blog_sidebar</option>
            <option value="post_inline">post_inline</option>
          </select>
          <input type="number" min={1} value={weight} onChange={e => setWeight(parseInt(e.target.value) || 1)} className="w-24 rounded border p-2" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} /> Active</label>
          <input type="number" placeholder="max width (px)" value={maxWidth} onChange={e => setMaxWidth(e.target.value === '' ? '' : (parseInt(e.target.value) || ''))} className="w-40 rounded border p-2" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={fixed} onChange={e => setFixed(e.target.checked)} /> Use original size</label>
        </div>
        <textarea value={html} onChange={e => setHtml(e.target.value)} placeholder="Paste banner HTML" className="w-full min-h-[120px] rounded border p-2" />
        <button className="btn-gradient px-4 py-2 rounded">Create banner</button>
      </form>

      <ul className="divide-y rounded border">
        {items.map(b => (
          <li key={b.id} className="px-4 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">{b.slot} · weight {b.weight}</div>
              <div className="flex gap-2 text-sm">
                <button onClick={() => toggle(b.id, !b.active)} className="rounded border px-2 py-1">{b.active ? 'Deactivate' : 'Activate'}</button>
                <button onClick={() => remove(b.id)} className="text-red-600">Delete</button>
              </div>
            </div>
            <div className="rounded border p-2 bg-black/20" dangerouslySetInnerHTML={{ __html: b.html }} />
          </li>
        ))}
      </ul>
    </div>
  )
}


