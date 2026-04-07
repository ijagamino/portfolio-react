import { tools } from "@/entities/tool/model/data";
import Tool from "@/entities/tool/ui/tool";
import Section from "@/shared/ui/section";
import SectionHeader from "@/shared/ui/section-header";
import SectionHeading from "@/shared/ui/section-heading";
import SectionIntroduction from "@/shared/ui/section-introduction";
import { createGSAPNavigationHandler } from "@/shared/lib/gsap-navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

export default function ToolsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introductionRef = useRef<HTMLParagraphElement | null>(null);
  const introductionContainerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const headingContainerRef = useRef<HTMLDivElement | null>(null);
  const toolsRef = useRef<HTMLLIElement[]>([]);
  const toolsContainerRef = useRef<HTMLUListElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useGSAP(() => {
    const section = sectionRef.current
    const introduction = introductionRef.current
    const introductionContainer = introductionContainerRef.current
    const heading = headingRef.current
    const headingContainer = headingContainerRef.current
    const tools = toolsRef.current
    const toolsContainer = toolsContainerRef.current

    if (!section || !introduction || !introductionContainer || !heading || !headingContainer || !tools || !toolsContainer) return

    gsap.set(heading, { opacity: 0 });
    gsap.set(tools, { opacity: 0, x: "100%" });

    const introductionSplit = SplitText.create(introduction, {
      type: "words",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: true,
        start: "top top",
        end: "+=2500",
        onRefresh(self) {
          stRef.current = self
        },
      },
    });

    tlRef.current = tl

    tl.from(introduction, {
      opacity: 0,
    })
      .from(introductionSplit.words, {
        opacity: 0,
        stagger: 2 / introductionSplit.words.length,
        ease: "elastic.out"
      }, ">")
      .to(introductionContainer, {
        opacity: 0,
        y: -20,
        duration: 2,
        ease: "power2.out"
      }, ">+5")
      .to(heading, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, ">")
      .to(tools, {
        opacity: 1,
        x: 0,
        stagger: 0.5,
        ease: "power2.out"
      }, ">")
      .addLabel("tools-revealed")
      .to([headingContainer, toolsContainer], {
        opacity: 0,
        y: 50,
        duration: 2,
      }, ">+2")

    const handler = createGSAPNavigationHandler(tlRef);

    document.addEventListener("gsap-nav:tools", handler)
    return () => document.removeEventListener("gsap-nav:tools", handler)
  })

  return (
    <Section
      ref={sectionRef}
      id="tools"
    >
      <SectionIntroduction
        ref={introductionRef}
        containerRef={introductionContainerRef}
      >
        Using what?
      </SectionIntroduction>

      <div>
        <SectionHeader>
          <SectionHeading ref={headingRef} containerRef={headingContainerRef}>
            Tools and Technologies
          </SectionHeading>
        </SectionHeader>

        <ul ref={toolsContainerRef} className="grid h-full grid-cols-2 place-items-center md:grid-cols-5">
          {tools.map((tool, i) => (
            <li
              key={tool.label}
              ref={(el) => {
                if (el) toolsRef.current[i] = el;
              }}
              className="flex flex-col items-center flex-1 px-1 py-2 rounded bg-primary"
            >
              <Tool tool={tool} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
