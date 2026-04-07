import type { Project } from "@/entities/project/model/types";
import { cn } from "@/shared/lib/cn";
import type { ComponentProps } from "react";

interface ProgressDotsProps extends ComponentProps<"div"> {
  projects: Project[]
  activeIndex: number
}

export default function ProgressDots({
  projects,
  className,
  activeIndex,
  ...props
}: ProgressDotsProps) {
  return (
    <div
      className={cn("fixed bottom-8 left-1/2 z-50 flex gap-4 px-2 py-1 -translate-x-1/2 rounded-full pointer-events-none md:gap-8 bg-primary", className)}
      {...props}
    >
      {projects.map((_, i) => (
        <div
          key={i}
          className={cn(
            "size-4 md:size-8 rounded-full transition-all duration-300",
            i === activeIndex
              ? "bg-accent scale-125"
              : "bg-accent/50"
          )}
        />
      ))}
    </div>
  )
}
