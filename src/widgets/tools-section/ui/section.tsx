import { tools } from "@/entities/tool/model/data";
import SectionHeader from "@/shared/ui/section-header";
import SectionHeading from "@/shared/ui/section-heading";
import SectionIntroduction from "@/shared/ui/section-introduction";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";

export default function ToolsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const introductionRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const toolsRef = useRef<HTMLLIElement[]>([]);

  useGSAP(() => {
    gsap.set(headingRef.current, { opacity: 0 });
    // gsap.set(introductionRef.current, { opacity: 1 });
    gsap.set(toolsRef.current, { opacity: 0 });

    const introductionRefSplit = SplitText.create(introductionRef.current,
      {
        type: "words"
      }
    )

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: true,
        start: "top top",
        end: "+=1500",
      }
    })

    tl.from(introductionRefSplit.words,
      {
        opacity: 0,
        stagger: 0.05,
        ease: "elastic.out",
      },
    )

    tl.to(introductionRef.current, { opacity: 0, y: -20, duration: 1 }, ">+1")
      .to(headingRef.current, { opacity: 1, duration: 1 }, ">");

    tools.forEach((word, i) => {
      const position = i * (1 / tools.length); // 0, 0.33, 0.66

      // tl.add(() => {
      //   if (wordRef.current) wordRef.current.textContent = word;
      // }, `>${position * 3}`); // multiply by total tl duration units
      //
      // tl.fromTo(wordRef.current,
      //   { opacity: 0, y: 10 },
      //   { opacity: 1, y: 0, duration: 0.5 },
      //   "<"
      // );
    });
  })

  return (
    <section ref={sectionRef}>
      <SectionIntroduction ref={introductionRef} centered>
        Using what?
      </SectionIntroduction>
      <SectionHeader>
        <SectionHeading ref={headingRef}>
          Tools and Technologies
        </SectionHeading>
      </SectionHeader>

      <ul className="grid grid-cols-2 md:grid-cols-5">
        {tools.map((tool, i) => (
          <li
            key={tool.label}
            ref={(el) => {
              if (el) toolsRef.current[i] = el;
            }}
            className="flex flex-col items-center flex-1">
            <tool.icon className="size-24" />
            {tool.label}
          </li>
        ))}
      </ul>
    </section>
  )
}
