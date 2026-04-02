import SectionHeader from "@/shared/ui/section-header";
import SectionHeading from "@/shared/ui/section-heading";
import SectionIntroduction from "@/shared/ui/section-introduction";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { WORDS } from "../config/words";

export default function IntroductionSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const introductionRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const wordRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    gsap.set(headingRef.current, { opacity: 0 });
    gsap.set(introductionRef.current, { opacity: 1 });

    const introductionRefSplit = SplitText.create(introductionRef.current, {
      type: "chars"
    })

    gsap.set(headingRef.current, { opacity: 0 });
    gsap.set(introductionRef.current, { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: true,
        start: "top top",
        end: "+=1500",
      }
    })

    tl.from(introductionRefSplit.chars,
      {
        opacity: 0,
        y: 10,
        scale: 0.5,
        stagger: 0.2,
        ease: "elastic.in",
      },
      0.5
    )

    tl.to(introductionRef.current, { opacity: 0, y: -20, duration: 1 }, ">+1")
      .to(headingRef.current, { opacity: 1, duration: 1 }, ">");

    WORDS.forEach((word, i) => {
      const position = i * (1 / WORDS.length); // 0, 0.33, 0.66

      tl.add(() => {
        if (wordRef.current) wordRef.current.textContent = word;
      }, `>${position * WORDS.length}`); // multiply by total tl duration units

      tl.fromTo(wordRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "<"
      );
    });
  })
  return (
    <section ref={sectionRef} className="grid place-items-center">
      <SectionIntroduction ref={introductionRef}>
        ...so?
      </SectionIntroduction>
      <SectionHeader>
        <SectionHeading ref={headingRef} className="font-normal">
          I build
          <span className="relative font-extrabold">
            <span ref={wordRef} className="block w-full">efficient</span>
          </span>
          web applications
        </SectionHeading>
      </SectionHeader>
    </section>
  )
}
