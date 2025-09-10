import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { ChipLink } from '@/components/ui/Chips'
import { Card, CardBody, CardMedia } from '@/components/ui/Card'
import { getSupabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function BlogList({ searchParams }: { searchParams?: { category?: string } }) {
  const supabase = getSupabaseServer()
  let query = supabase.from('posts').select('id,title,excerpt,category,featured_image,created_at').order('created_at', { ascending: false })
  if (searchParams?.category) {
    query = query.eq('category', searchParams.category)
  }
  const { data: posts } = await query

  const { data: categories } = await supabase.from('categories').select('id,name')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <div className="mb-6 flex gap-2 overflow-x-auto">
          <ChipLink href="/blog" active={!searchParams?.category}>Все</ChipLink>
          {categories?.map(c => (
            <ChipLink key={c.id} href={`/blog?category=${encodeURIComponent(c.name)}`} active={searchParams?.category === c.name}>{c.name}</ChipLink>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map(p => (
            <Link key={p.id} href={`/blog/${p.id}`} className="block group">
              <Card>
                {p.featured_image ? (
                  <Image src={p.featured_image} alt={p.title} width={800} height={450} className="h-48 w-full rounded-t-[var(--radius)] object-cover" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2Zy8+" />
                ) : null}
                <CardBody>
                  <div className="text-xs uppercase text-gray-500">{p.category}</div>
                  <div className="mt-1 font-semibold line-clamp-2 group-hover:underline">{p.title}</div>
                  {p.excerpt && <p className="text-sm text-gray-600 line-clamp-2 mt-1">{p.excerpt}</p>}
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}


