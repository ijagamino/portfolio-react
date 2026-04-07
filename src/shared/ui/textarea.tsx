import type { ComponentProps } from "react"

export default function Textarea({ ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className="px-2 py-1 border-4 rounded bg-input text-input-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      {...props}
    />
  )
}

