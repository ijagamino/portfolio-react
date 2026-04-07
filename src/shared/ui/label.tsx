
import type { ComponentProps, ReactNode } from "react"

interface LabelProps extends ComponentProps<"label"> {
  children: ReactNode
}

export default function Label({ children, ...props }: LabelProps) {
  return (
    <label
      className="md:text-lg"
      {...props}
    >
      <span className="bg-primary">
        {children}
      </span>
    </label>
  )
}
