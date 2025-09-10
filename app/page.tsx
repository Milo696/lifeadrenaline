import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Quiz from '@/components/Quiz'
import Hero from '@/components/Hero'
import { Card, CardBody, CardMedia } from '@/components/ui/Card'
import Link from 'next/link'
import Image from 'next/image'
import { getSupabaseServer } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = getSupabaseServer()
  const { data: posts } = await supabase
    .from('posts')
    .select('id,title,category,featured_image,created_at')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <section className="mb-12">
          <Hero />
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Избранные статьи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`} className="block group">
                <Card>
                  {p.featured_image ? (
                    <Image src={p.featured_image} alt={p.title} width={800} height={450} className="h-48 w-full rounded-t-[var(--radius)] object-cover" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2Zy8+" />
                  ) : null}
                  <CardBody>
                    <div className="text-xs uppercase text-gray-500">{p.category}</div>
                    <div className="mt-1 font-semibold line-clamp-2 group-hover:underline">{p.title}</div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        <section id="quiz">
          <Quiz />
        </section>
      </main>
      <Footer />
    </div>
  )
}


