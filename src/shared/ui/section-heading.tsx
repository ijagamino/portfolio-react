import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface SectionHeadingProps extends ComponentProps<"h2"> {
  children: ReactNode;
}

export default function SectionHeading({
  children,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-5xl md:text-7xl font-extrabold text-center px-2 py-1 rounded",
        className,
      )}
      {...props}
    >
      <span className="bg-primary">{children}</span>
    </h2>
  );
}
