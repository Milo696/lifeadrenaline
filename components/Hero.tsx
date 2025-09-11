import { Button } from './ui/Button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--border-warm)] bg-[var(--paper)] p-8 card-modern animate-fade">
      <div className="max-w-2xl">
        <h1 className="heading font-lora text-5xl font-extrabold tracking-tight">ThrillHub</h1>
        <p className="mt-3 font-merriweather text-[#f4ede1] opacity-90">Warm ideas to make staying home feel inspiring and cozy.</p>
        <div className="mt-5 flex gap-3">
          <Link href="/blog"><button className="bg-gradient-to-r from-[#D97904] to-[#F4A261] text-white font-semibold py-2 px-4 rounded-lg shadow-md animate-bob transition-all duration-200">Read the blog</button></Link>
          <Link href="#activity"><button className="bg-gradient-to-r from-[#D97904] to-[#F4A261] text-white font-semibold py-2 px-4 rounded-lg shadow-md animate-bob transition-all duration-200">Suggest an activity</button></Link>
        </div>
      </div>
    </section>
  )
}


