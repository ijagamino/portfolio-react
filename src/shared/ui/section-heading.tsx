import { cn } from "@/shared/lib/cn";
import type { ComponentProps, ReactNode, RefObject } from "react";

interface SectionHeadingProps extends ComponentProps<"h2"> {
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>
}

export default function SectionHeading({
  children,
  className,
  containerRef,
  ...props
}: SectionHeadingProps) {
  return (
    <div ref={containerRef}>
      <h2
        className={cn(
          "text-4xl md:text-7xl font-extrabold text-center",
          className,
        )}
        {...props}
      >
        <span className="px-2 py-1 rounded bg-primary">
          {children}
        </span>
      </h2>
    </div>
  );
}
