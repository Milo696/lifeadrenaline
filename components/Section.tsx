export default function Section({ title, children, className = '' }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border p-5 sm:p-6 lg:p-8 bg-[var(--paper)] border-[var(--border-warm)] ${className}`}>
      {title ? <h2 className="text-xl font-semibold mb-4">{title}</h2> : null}
      {children}
    </section>
  )
}


