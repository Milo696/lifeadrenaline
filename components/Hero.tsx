import { Button } from './ui/Button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-brand-50 to-white p-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">LifeAdrenaline</h1>
        <p className="mt-3 text-gray-700">Успех, риск, приключения и развлечения — без воды.</p>
        <div className="mt-5 flex gap-3">
          <Link href="/blog"><Button variant="brand">Читать блог</Button></Link>
          <Link href="#quiz"><Button variant="outline">Пройти квиз</Button></Link>
        </div>
      </div>
    </section>
  )
}


