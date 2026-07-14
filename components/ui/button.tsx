import * as React from "react"
import { twMerge } from "tailwind-merge"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex items-center justify-center font-display font-medium text-[15px] rounded-lg px-5 py-2.5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-indigo/30 disabled:opacity-40 disabled:pointer-events-none cursor-pointer",
          variant === 'primary' && "bg-brand-slate text-white hover:bg-slate-800",
          variant === 'accent' && "bg-brand-indigo text-white hover:bg-indigo-700",
          variant === 'secondary' && "bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-100",
          variant === 'ghost' && "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
