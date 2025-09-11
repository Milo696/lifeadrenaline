import { clsx } from 'clsx'
import ThemedImage from './ThemedImage'

export function Card({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        'rounded-[12px] bg-[#3a2817] text-[#f4ede1] shadow-md overflow-hidden transition-transform duration-300 hover:translate-y-1',
        'border border-[var(--border-warm)]',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardMedia({ src, alt, srcDark }: { src?: string; srcDark?: string; alt?: string }) {
  if (!src && !srcDark) return null
  return <ThemedImage lightSrc={src} darkSrc={srcDark} alt={alt} className="h-40 sm:h-48 w-full rounded-t-[var(--radius)] object-cover" />
}

export function CardBody({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={clsx('p-4', className)}>{children}</div>
}


