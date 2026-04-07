import Section from "@/shared/ui/section";
import SectionHeader from "@/shared/ui/section-header";
import SectionHeading from "@/shared/ui/section-heading";
import SectionIntroduction from "@/shared/ui/section-introduction";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { WORDS } from "../config/words";

export default function IntroductionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introductionRef = useRef<HTMLParagraphElement>(null);
  const introductionContainerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingContainerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useGSAP(() => {
    const section = sectionRef.current
    const introduction = introductionRef.current
    const introductionContainer = introductionContainerRef.current
    const heading = headingRef.current
    const headingContainer = headingContainerRef.current
    if (!section || !introduction || !introductionContainer || !heading || !headingContainer) return

    const introductionSplit = SplitText.create(introduction, {
      type: "chars",
    })

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
    })

    tlRef.current = tl

    tl.from(introductionContainer, {
      opacity: 0,
    })
      .from(introductionSplit.chars, {
        opacity: 0,
        y: 10,
        scale: 0.5,
        stagger: 0.5,
        ease: "elastic.in",
      }, "<")
      .to(introduction, {
        opacity: 0,
        y: -20,
        duration: 2,
      }, ">+5")
      .from(heading, {
        opacity: 0,
        duration: 1
      }, ">+2")

    WORDS.forEach((word, i) => {
      const position = i * (1 / WORDS.length)

      tl.add(
        () => {
          if (wordRef.current) wordRef.current.textContent = word;
        },
        `>${position * WORDS.length}`,
      ).from(wordRef.current, {
        opacity: 0,
        y: 10
      }, ">")
        .to(wordRef.current, {
          opacity: 1,
          y: 0, duration: 5
        }, ">")
    })

    tl.to(headingContainer, {
      opacity: 0,
      y: -20,
      duration: 2,
    }, ">")
  })

  return (
    <Section
      ref={sectionRef}
    >
      <SectionIntroduction
        ref={introductionRef}
        containerRef={introductionContainerRef}
      >
        ...so?
      </SectionIntroduction>

      <SectionHeader>
        <SectionHeading
          ref={headingRef}
          containerRef={headingContainerRef}
          className="font-normal"
        >
          I build
          <span className="relative block font-extrabold">
            <span
              ref={wordRef}
              className="inline-block px-2 py-1 rounded bg-primary"
            >
              efficient
            </span>
          </span>
          web applications
        </SectionHeading>
      </SectionHeader>
    </Section>
  );
}
