import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSupabaseServer } from '@/lib/supabase/server'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
// import TOC from '@/components/TOC'
import Image from 'next/image'
import LikeButton from '@/components/LikeButton'
import ShareButtons from '@/components/ShareButtons'
import BannerSlot from '@/components/ads/BannerSlot'
import CommentForm from '@/components/CommentForm'

export default async function PostPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()
  const { data: post } = await supabase.from('posts').select('*').eq('id', params.id).single()
  const { data: comments } = await supabase.from('comments').select('*').eq('post_id', params.id).order('created_at', { ascending: true })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8">
        {post && (
          <article className="max-w-none">
            <div className="post-hero mb-6">
              <h1 className="heading text-4xl sm:text-5xl font-extrabold">{post.title}</h1>
              <div className="post-meta mt-2">
                <span className="chip">{post.category}</span>
                {post.created_at && <span>{new Date(post.created_at).toLocaleDateString()}</span>}
              </div>
            </div>
            {post.featured_image && (
              <div className="my-4 overflow-hidden rounded-md">
                <Image src={post.featured_image} alt={post.title} width={1280} height={720} className="h-auto w-full object-cover" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PSc1MCUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nNTAlJyBmaWxsPSIjZWVlIi8+PC9zdmc+" />
              </div>
            )}
            <div className="post-card post-content prose prose-invert lg:prose-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}>
                {post.content}
              </ReactMarkdown>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <LikeButton postId={params.id} />
              <ShareButtons title={post.title} />
            </div>
          </article>
        )}
        {/* Right sidebar: vertical banner from post.affiliate_html, fallback to blog_sidebar slot */}
        <aside className="hidden lg:block">
          {post?.affiliate_html ? (
            <div className="banner sticky top-24" dangerouslySetInnerHTML={{ __html: post.affiliate_html }} />
          ) : (
            <BannerSlot slot="blog_sidebar" className="sticky top-24" />
          )}
        </aside>
      </main>
      {/* Comments moved below */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-12">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <div className="space-y-4">
          {comments?.map((c: any) => (
            <div key={c.id} className="rounded border p-3">
              <div className="text-sm text-gray-400">{c.author || 'Guest'} — {new Date(c.created_at).toLocaleString()}</div>
              <div>{c.text}</div>
            </div>
          ))}
        </div>
        <CommentForm postId={params.id} />
      </section>
      <Footer />
    </div>
  )
}


