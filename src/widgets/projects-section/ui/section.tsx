import { projects } from "@/entities/project/model/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function CinematicTimelineMode() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const sortedProjects = [...projects].sort(
    (a, b) => Number(a.date) - Number(b.date),
  );
  const years = [...new Set(sortedProjects.map((p) => p.date))].sort();

  // Calculate date-based positions for each project
  const minYear = Number(years[0]);
  const maxYear = Number(years[years.length - 1]);
  const yearRange = maxYear - minYear || 1; // Avoid division by zero

  const projectPositions = sortedProjects.map((project) => {
    const projectYear = Number(project.date);
    return (projectYear - minYear) / yearRange;
  });

  useGSAP(() => {
    const sections = sectionsRef.current;
    const progressEl =
      containerRef.current?.querySelector(".timeline-progress");
    const yearEls = containerRef.current?.querySelectorAll(".timeline-year");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (sortedProjects.length + 1)}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (progressEl) {
            const exactIndex = self.progress * sortedProjects.length;
            const currentIndex = Math.floor(exactIndex);
            const progressWithinProject = exactIndex - currentIndex;

            let dateBasedProgress = 0;
            if (currentIndex < sortedProjects.length) {
              const currentProjectPos = projectPositions[currentIndex];
              if (currentIndex < sortedProjects.length - 1) {
                const nextProjectPos = projectPositions[currentIndex + 1];
                dateBasedProgress =
                  currentProjectPos +
                  (nextProjectPos - currentProjectPos) * progressWithinProject;
              } else {
                dateBasedProgress =
                  currentProjectPos +
                  (1 - currentProjectPos) * progressWithinProject;
              }
            }

            gsap.set(progressEl, {
              height: `${dateBasedProgress * 100}%`,
            });
          }
        },
      },
    });

    sections.forEach((section, i) => {
      const label = `section-${i}`;
      tl.addLabel(label, i * 1.2); // Add buffer between projects
      const content = section.querySelector(".content");
      const bg = section.querySelector(".bg");

      tl.call(() => highlightYear(sortedProjects[i].date), [], label);

      tl.fromTo(
        content,
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          duration: 0.4,
        },
      );

      // exit
      tl.to(content, {
        opacity: 0,
        y: -100,
        scale: 1.05,
        ease: "none",
        duration: 0.4,
        delay: 0.5,
      });

      // background parallax
      tl.to(
        bg,
        {
          scale: 1.2,
          ease: "none",
        },
        label,
      );

      function highlightYear(activeYear: string) {
        yearEls?.forEach((el) => {
          const isActive = el.textContent === activeYear;

          gsap.to(el, {
            opacity: isActive ? 1 : 0.4,
            x: isActive ? 10 : 0,
            fontWeight: isActive ? 600 : 400,
            duration: 0.3,
          });
        });
      }
    });
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {sortedProjects.map((project, i) => (
        <section
          key={i}
          ref={(el) => {
            if (el) sectionsRef.current[i] = el;
          }}
          className="absolute top-0 left-0 flex items-center justify-center w-full h-screen ps-20"
        >
          {/* background */}
          <div
            className="absolute inset-0 bg"
            style={{
              filter: "blur(60px)",
              transform: "scale(1.2)",
            }}
          />

          <div className="absolute inset-0" />

          {/* content */}
          <div className="relative z-10 max-w-2xl p-6 text-center content text-primary-foreground">
            <img
              src={project.image}
              className="w-full shadow-2xl rounded-2xl"
            />

            <h3 className="mt-8 mb-4 text-4xl font-bold md:text-6xl">
              <span className="inline-block px-2 py-1 rounded bg-primary">
                {project.title}
              </span>
            </h3>

            <p className="mb-6">
              <span className="inline-block px-2 py-1 rounded bg-primary">
                {project.description}
              </span>{" "}
            </p>
          </div>
        </section>
      ))}

      {/* progress line */}
      <div className="absolute z-20 flex items-center -translate-y-1/2 left-8 top-1/2">
        {/* vertical line */}
        <div className="relative h-[60vh] w-0.5 bg-primary-foreground/20">
          {/* progress fill */}
          <div
            className="absolute top-0 left-0 w-full timeline-progress bg-primary-foreground"
            style={{ height: "0%" }}
          />

          {/* year labels */}
          {years.map((year) => {
            const yearPos = (Number(year) - minYear) / yearRange;
            return (
              <div
                key={year}
                className="absolute text-sm timeline-year left-2 text-primary-foreground opacity-40"
                style={{
                  top: `${yearPos * 100}%`,
                  transform: "translateY(-50%)",
                }}
              >
                {year}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
