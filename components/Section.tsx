type Props = React.HTMLAttributes<HTMLElement> & { title?: string; className?: string }

export default function Section({ title, children, className = '', ...props }: Props) {
  return (
    <section
      {...props}
      className={`rounded-2xl border p-5 sm:p-6 lg:p-8 bg-[var(--paper)] border-[var(--border-warm)] ${className}`}
    >
      {title ? <h2 className="text-xl font-semibold mb-4">{title}</h2> : null}
      {children}
    </section>
  )
}


