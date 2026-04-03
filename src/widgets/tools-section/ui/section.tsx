import { tools } from "@/entities/tool/model/data";
import { ScrollSmoother, SplitText } from "gsap/all";
import SectionHeader from "@/shared/ui/section-header";
import SectionHeading from "@/shared/ui/section-heading";
import SectionIntroduction from "@/shared/ui/section-introduction";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function ToolsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introductionRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const toolsRef = useRef<HTMLLIElement[]>([]);
  const smoother = ScrollSmoother.get();

  useGSAP(() => {
    if (!smoother) return;

    gsap.set(headingRef.current, { opacity: 0 });
    gsap.set(toolsRef.current, { opacity: 0, y: 60 });

    const introductionRefSplit = SplitText.create(introductionRef.current, {
      type: "words",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: true,
        start: "top top",
        end: "+=1000",
      },
      onComplete: () => {
        smoother.paused(true);
        gsap.to(toolsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out",
          onComplete: () => {
            smoother.paused(false);
          },
        });
      },
    });

    tl.from(introductionRefSplit.words, {
      opacity: 0,
      stagger: 0.05,
      ease: "elastic.out",
    });

    tl.to(
      introductionRef.current,
      { opacity: 0, y: -20, duration: 1 },
      ">+1",
    ).to(headingRef.current, { opacity: 1, duration: 1 }, ">");
  }, [smoother]);

  return (
    <section ref={sectionRef}>
      <SectionIntroduction
        ref={introductionRef}
        centered
      >
        Using what?
      </SectionIntroduction>
      <SectionHeader>
        <SectionHeading ref={headingRef}>Tools and Technologies</SectionHeading>
      </SectionHeader>

      <ul className="grid h-full grid-cols-2 place-items-center md:grid-cols-5">
        {tools.map((tool, i) => (
          <li
            key={tool.label}
            ref={(el) => {
              if (el) toolsRef.current[i] = el;
            }}
            className="flex flex-col items-center flex-1 px-1 py-2 rounded bg-primary"
          >
            <tool.icon className="size-24" />
            {tool.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
