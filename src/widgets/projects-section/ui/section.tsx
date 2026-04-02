import { projects } from "@/entities/project/model/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function CinematicTimelineMode() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const sortedProjects = [...projects].sort(
    (a, b) => Number(a.date) - Number(b.date)
  );
  const years = [...new Set(sortedProjects.map(p => p.date))].sort();

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
    const progressEl = containerRef.current?.querySelector(".timeline-progress");

    // ✅ 1. FIXED PIN SCROLL LENGTH with snap points
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * sortedProjects.length}`,
      pin: true,
      scrub: true,
      snap: {
        snapTo: 1 / sortedProjects.length, // Snap to each project
        duration: { min: 0.2, max: 0.6 },
        delay: 0,
        ease: "power1.inOut"
      },
      onUpdate: (self) => {
        if (progressEl) {
          // Map scroll progress to current project index
          const exactIndex = self.progress * sortedProjects.length;
          const currentIndex = Math.floor(exactIndex);
          const progressWithinProject = exactIndex - currentIndex;

          // Calculate date-based progress for current project
          let dateBasedProgress = 0;
          if (currentIndex < sortedProjects.length) {
            const currentProjectPos = projectPositions[currentIndex];
            if (currentIndex < sortedProjects.length - 1) {
              const nextProjectPos = projectPositions[currentIndex + 1];
              // Interpolate between current and next project positions
              dateBasedProgress = currentProjectPos + (nextProjectPos - currentProjectPos) * progressWithinProject;
            } else {
              // Last project - show full progress
              dateBasedProgress = currentProjectPos + (1 - currentProjectPos) * progressWithinProject;
            }
          }

          console.log({
            scrollProgress: self.progress.toFixed(2),
            currentIndex,
            projectDate: sortedProjects[currentIndex]?.date,
            dateBasedProgress: dateBasedProgress.toFixed(2)
          });

          gsap.set(progressEl, {
            height: `${dateBasedProgress * 100}%`,
          });
        }
      }
    });

    sections.forEach((section, i) => {
      const content = section.querySelector(".content");
      const bg = section.querySelector(".bg");
      const yearEls = containerRef.current?.querySelectorAll(".timeline-year");


      // entry
      gsap.fromTo(
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
          scrollTrigger: {
            trigger: section,
            start: () => `top+=${i * window.innerHeight} top`,
            end: () => `bottom+=${i * window.innerHeight} top`,
            scrub: true,
          },
        }
      );

      // exit
      gsap.to(content, {
        opacity: 0,
        y: -100,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: () => `bottom+=${i * window.innerHeight} top`,
          end: () => `bottom+=${(i + 1) * window.innerHeight} top`,
          scrub: true,
        },
      });

      // background parallax
      gsap.to(bg, {
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: () => `top+=${i * window.innerHeight} bottom`,
          end: () => `bottom+=${i * window.innerHeight} top`,
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: () => `top+=${i * window.innerHeight} top`,
        end: () => `bottom+=${i * window.innerHeight} top`,
        onEnter: () => highlightYear(sortedProjects[i].date),
        onEnterBack: () => highlightYear(sortedProjects[i].date),
      });

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
  })

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {sortedProjects.map((project, i) => (
        <section
          key={i}
          ref={(el) => {
            if (el) sectionsRef.current[i] = el;
          }}
          className="absolute top-0 left-0 ps-20 w-full h-screen flex items-center justify-center"
        >
          {/* background */}
          <div
            className="bg absolute inset-0"
            style={{
              filter: "blur(60px)",
              transform: "scale(1.2)",
            }}
          />

          <div className="absolute inset-0" />

          {/* content */}
          <div className="content relative z-10 text-center text-white max-w-2xl p-6">
            <img
              src={project.image}
              className="rounded-2xl shadow-2xl w-full"
            />

            <h3 className="text-4xl md:text-6xl font-bold mb-4 mt-8">
              {project.title}
            </h3>

            <p className="opacity-80 mb-6">
              {project.description}
            </p>

          </div>

        </section>
      ))}

      {/* progress line */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 flex items-center">
        {/* vertical line */}
        <div className="relative h-[60vh] w-0.5 bg-white/20">

          {/* progress fill */}
          <div
            className="timeline-progress absolute top-0 left-0 w-full bg-white"
            style={{ height: "0%" }}
          />

          {/* year labels */}
          {years.map((year) => {
            const yearPos = (Number(year) - minYear) / yearRange;
            return (
              <div
                key={year}
                className="timeline-year absolute left-2 text-white text-sm opacity-40"
                style={{
                  top: `${yearPos * 100}%`,
                  transform: "translateY(-50%)"
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
