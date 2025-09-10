import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSupabaseServer } from '@/lib/supabase/server'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkSlug from 'remark-slug'
import TOC from '@/components/TOC'
import Image from 'next/image'
import LikeButton from '@/components/LikeButton'
import ShareButtons from '@/components/ShareButtons'
import CommentForm from '@/components/CommentForm'

export default async function PostPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()
  const { data: post } = await supabase.from('posts').select('*').eq('id', params.id).single()
  const { data: comments } = await supabase.from('comments').select('*').eq('post_id', params.id).order('created_at', { ascending: true })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-8">
        {post && (
          <article className="prose lg:prose-lg max-w-none">
            <h1>{post.title}</h1>
            {post.featured_image && (
              <div className="my-4 overflow-hidden rounded-md">
                <Image src={post.featured_image} alt={post.title} width={1280} height={720} className="h-auto w-full object-cover" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PSc1MCUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nNTAlJyBmaWxsPSIjZWVlIi8+PC9zdmc+" />
              </div>
            )}
            {post.affiliate_html && (
              <div className="my-4 affiliate" dangerouslySetInnerHTML={{ __html: post.affiliate_html }} />
            )}
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkSlug]} rehypePlugins={[rehypeRaw, rehypeAutolinkHeadings]}>
              {post.content}
            </ReactMarkdown>
            <div className="mt-6 flex items-center gap-3">
              <LikeButton postId={params.id} />
              <ShareButtons title={post.title} />
            </div>
          </article>
        )}
        <TOC />
        <section className="mt-10">
          <h3 className="text-lg font-semibold mb-2">Комментарии</h3>
          <div className="space-y-4">
            {comments?.map((c: any) => (
              <div key={c.id} className="rounded border p-3">
                <div className="text-sm text-gray-600">{c.author || 'Гость'} — {new Date(c.created_at).toLocaleString()}</div>
                <div>{c.text}</div>
              </div>
            ))}
          </div>
          <CommentForm postId={params.id} />
        </section>
      </main>
      <Footer />
    </div>
  )
}


