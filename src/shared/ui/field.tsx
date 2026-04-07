import type { ComponentProps, ReactNode } from "react"

interface FieldProps extends ComponentProps<"div"> {
  children: ReactNode
}

export default function Field({ children, ...props }: FieldProps) {
  return (
    <div
      className="flex flex-col gap-2"
      {...props}
    >
      {children}
    </div>
  )
}
