import type { ComponentProps } from "react";
import type { Tool } from "../model/types";

interface ToolProps extends ComponentProps<"div"> {
  tool: Tool
}

export default function Tool({ tool }: ToolProps) {
  return (
    <div className="text-center">
      <tool.icon className="size-12 md:size-24" />
      {tool.label}
    </div>
  )
}
