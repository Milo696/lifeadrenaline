import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const button = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-gray-900 focus-visible:ring-black',
        brand: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-600',
        outline: 'border border-gray-300 hover:bg-gray-50',
        ghost: 'hover:bg-gray-100'
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-6'
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={clsx(button({ variant, size }), className)} {...props} />
}


