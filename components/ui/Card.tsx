import { clsx } from 'clsx'
import ThemedImage from './ThemedImage'

export function Card({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={clsx('card border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:bg-gray-900', className)}>{children}</div>
}

export function CardMedia({ src, alt, srcDark }: { src?: string; srcDark?: string; alt?: string }) {
  if (!src && !srcDark) return null
  return <ThemedImage lightSrc={src} darkSrc={srcDark} alt={alt} className="h-40 sm:h-48 w-full rounded-t-[var(--radius)] object-cover" />
}

export function CardBody({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={clsx('p-4', className)}>{children}</div>
}


