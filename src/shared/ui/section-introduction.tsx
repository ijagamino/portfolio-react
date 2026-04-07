import { cn } from "@/shared/lib/cn";
import type { ComponentProps, ReactNode, RefObject } from "react";

interface SectionIntroductionProps extends ComponentProps<"p"> {
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>
}

export default function SectionIntroduction({
  children,
  className,
  containerRef,
  ...props
}: SectionIntroductionProps) {
  return (
    <div ref={containerRef} className="absolute">
      <p
        className={cn("text-4xl font-medium text-center text-primary-foreground", className)}
        {...props}
      >
        <span className="px-2 py-1 rounded bg-primary">
          {children}
        </span>
      </p>
    </div >
  );
}
