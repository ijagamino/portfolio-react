import { projects } from "@/entities/project/model/data";
import Project from "@/entities/project/ui/project";
import { createGSAPNavigationHandler } from "@/shared/lib/gsap-navigation";
import Section from "@/shared/ui/section";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import ProgressDots from "./progress-dots";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const sectionsRef = useRef<HTMLElement[]>([])
  const progressRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0)

  const sortedProjects = [...projects].sort(
    (a, b) => Number(a.date) - Number(b.date),
  );

  useGSAP(() => {
    const sections = sectionsRef.current
    const section = sectionRef.current
    const progress = progressRef.current
    if (!sections || !section || !progress) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * sortedProjects.length}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * sortedProjects.length),
            sortedProjects.length - 1
          );
          setActiveIndex(index);
        },
        onRefresh(self) {
          stRef.current = self
        },
      },
    })

    tlRef.current = tl

    sections.forEach((section, index) => {
      const content = section.querySelector(".content");

      tl.fromTo(content, {
        opacity: 0,
        y: 100,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "none",
      })
      if (index === 0) {
        tl.addLabel("projects-revealed")
      }
      tl.to(content, {
        opacity: 0,
        y: -100,
        scale: 1.05,
        ease: "none",
      }, ">+2")
    })

    tl.to(progress, {
      opacity: 0,
      duration: 1
    }, "<-1")

    const handler = createGSAPNavigationHandler(tlRef);

    document.addEventListener("gsap-nav:projects", handler);
    return () => document.removeEventListener("gsap-nav:projects", handler);
  })

  return (
    <Section
      ref={sectionRef}
      id="projects"
    >
      <ul>
        {sortedProjects.map((project, i) => (
          <li
            key={i}
            ref={(el) => {
              if (el) sectionsRef.current[i] = el;
            }}
            className="absolute top-16 left-0 flex items-center justify-center w-full h-screen md:top-0"
          >
            <Project project={project} />
          </li>
        ))}
      </ul>

      <ProgressDots
        ref={progressRef}
        projects={sortedProjects}
        activeIndex={activeIndex}
      />
    </Section>
  );
}
