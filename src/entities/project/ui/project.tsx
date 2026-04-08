import { cn } from "@/shared/lib/cn";
import type { ComponentProps } from "react";
import type { Project } from "../model/types";

interface ProjectProps extends ComponentProps<"div"> {
  project: Project
}

export default function Project({ project }: ProjectProps) {
  return (
    <div className="relative z-10 max-w-xl p-6 text-center content text-primary-foreground">
      <img
        src={project.image}
        alt={project.title}
        className="w-full bg-primary rounded-2xl border-4"
      />

      <h3 className="my-4 text-2xl font-bold md:text-4xl">
        <span className="inline-block rounded bg-primary">
          {project.title}
        </span>
      </h3>

      <div className="flex flex-wrap justify-center gap-2">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className={cn("inline-block px-3 py-1 text-sm font-medium rounded-full", index % 2 === 0 ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground")}
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="mb-6 md:text-lg">
        <span className="inline-block px-2 py-1 rounded bg-primary">
          {project.description}
        </span>{" "}
      </p>
    </div>
  )
}
