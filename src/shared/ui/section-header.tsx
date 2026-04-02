import type { ComponentProps, ReactNode } from "react"

interface SectionHeadingProps extends ComponentProps<"header"> {
  children: ReactNode
}

export default function SectionHeading({ children }: SectionHeadingProps) {

  return (
    <header className="mb-8 text-center uppercase">
      {children}
    </header>
  )
}
