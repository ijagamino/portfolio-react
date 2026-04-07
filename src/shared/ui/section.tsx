import { cn } from "@/shared/lib/cn";
import type { ComponentProps, ReactNode } from "react";

interface SectionIntroductionProps extends ComponentProps<"section"> {
  children: ReactNode;
}

export default function SectionIntroduction({
  children,
  className,
  ...props
}: SectionIntroductionProps) {
  return (
    <section
      className={cn("grid place-items-center h-dvh md:min-w-full p-8 pt-24 relative md:p-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}
