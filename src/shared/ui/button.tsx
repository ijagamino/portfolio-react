import type { ComponentProps, ReactNode } from "react"
import { cn } from "../lib/cn"

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn("flex items-center cursor-pointer gap-2 px-2 py-1 mt-4 text-lg font-bold border-4 rounded-xl bg-primary md:mt-8", className)}
      {...props}
    >
      {children}
    </button>
  )
}
