import { Button } from './ui/Button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#8B7F45]/30 bg-white/5 p-8 card-modern">
      <div className="max-w-2xl">
        <h1 className="heading text-5xl font-extrabold tracking-tight">ThrillHub</h1>
        <p className="mt-3 text-gray-200/90">Success, risk, adventures, and entertainment — no fluff.</p>
        <div className="mt-5 flex gap-3">
          <Link href="/blog"><button className="btn-gradient px-5 py-2 text-sm">Read the blog</button></Link>
          <Link href="#quiz"><button className="btn-gradient px-5 py-2 text-sm" style={{filter:'brightness(0.95)'}}>Take the quiz</button></Link>
        </div>
      </div>
    </section>
  )
}


