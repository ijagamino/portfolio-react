import { socialLinks } from "@/entities/social-link/model/data";
import SectionHeader from "@/shared/ui/section-header";
import SectionHeading from "@/shared/ui/section-heading";
import SectionIntroduction from "@/shared/ui/section-introduction";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const introductionRef = useRef<HTMLParagraphElement | null>(null);
  const introductionTopRef = useRef<HTMLParagraphElement | null>(null);
  const introductionBottomRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const socialLinkContainerRef = useRef<HTMLUListElement | null>(null)
  const socialLinksRef = useRef<HTMLLIElement[]>([])

  useGSAP(() => {
    const heading = headingRef.current
    if (!heading) return
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: true,
        start: "top top",
        end: "+=1500",
      }
    })


    const topSplit = SplitText.create(introductionTopRef.current, {
      type: "chars"
    })

    const bottomSplit = SplitText.create(introductionBottomRef.current, {
      type: "chars"
    })

    tl.from(topSplit.chars, {
      opacity: 0,
      ease: "elastic.out",
      stagger: {
        each: 2 / topSplit.chars.length,
        from: "center"
      },
    }, ">");

    tl.from(bottomSplit.chars, {
      opacity: 0,
      ease: "elastic.out",
      stagger: {
        each: 2 / bottomSplit.chars.length,
        from: "edges"
      },
    }, "<");

    tl.to(
      [introductionTopRef.current, introductionBottomRef.current],
      {
        y: (i) => (i === 0 ? -40 : 40),
        opacity: 0,
        duration: 5,
      },
      ">"
    );


    tl.from(
      [headingRef.current, socialLinkContainerRef.current],
      {
        y: (i) => (i === 0 ? -40 : 40),
        opacity: 0,
        duration: 5,
      },
      ">"
    );
  })

  return (
    <section ref={sectionRef} className="grid place-items-center">
      <div className="fixed top-1/2 left-1/2 flex justify-center w-full -translate-1/2">
        <SectionIntroduction ref={introductionRef} className="opacity-0">
          Great... so how do I contact you?
        </SectionIntroduction>
        <SectionIntroduction
          ref={introductionTopRef}
          className="overflow-hidden"
          style={{ clipPath: "inset(0 0 40% 0)" }}
        >
          Great... but how do I actually contact you?
        </SectionIntroduction>

        <SectionIntroduction
          ref={introductionBottomRef}
          className="overflow-hidden"
          style={{ clipPath: "inset(40% 0 0 0)" }}
        >
          Great... but how do I actually contact you?
        </SectionIntroduction>
      </div>

      <div>
        <SectionHeader>
          <SectionHeading ref={headingRef}>
            Let's Connect
          </SectionHeading>
        </SectionHeader>
        <ul ref={socialLinkContainerRef} className="flex flex-wrap justify-center gap-4 md:gap-8">
          {socialLinks.map((socialLink, i) => (
            <li
              ref={(el) => {
                if (el) socialLinksRef.current[i] = el;
              }}
              key={socialLink.link} className="flex gap-2 px-2 border-2">
              <a className="flex items-center" href={socialLink.link}>
                <socialLink.icon className="size-16" />
                {socialLink.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
