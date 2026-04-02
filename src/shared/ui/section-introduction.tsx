import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/shared/lib/cn"
import { cva, type VariantProps } from "class-variance-authority"

interface SectionIntroductionProps extends ComponentProps<"p"> {
  children: ReactNode
}

const sectionIntroductionVariants = cva(
  "absolute text-4xl font-medium text-center text-primary-foreground", {
  variants: {
    centered: {
      false: null,
      true: "top-1/2 left-1/2 -translate-1/2"
    }
  },
  defaultVariants: {
    centered: false
  }
})

export default function SectionIntroduction({ children, centered, className, ...props }: SectionIntroductionProps & VariantProps<typeof sectionIntroductionVariants>) {
  return (
    <>
      <p className={cn(sectionIntroductionVariants({ centered, className }))} {...props}>
        <span className="
          bg-primary
          px-2 py-1
          rounded
        ">
          {children}
        </span>
      </p>
    </>
  )
}

