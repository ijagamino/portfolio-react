import { socialLinks } from "@/entities/social-link/model/data";
import SocialLink from "@/entities/social-link/ui/social-link";
import DownloadCVButton from "@/features/download-cv/ui/download-cv-button";
import { createGSAPNavigationHandler } from "@/shared/lib/gsap-navigation";
import Section from "@/shared/ui/section";
import SectionHeader from "@/shared/ui/section-header";
import SectionHeading from "@/shared/ui/section-heading";
import SectionIntroduction from "@/shared/ui/section-introduction";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
import ContactForm from "./contact-form";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introductionRef = useRef<HTMLParagraphElement | null>(null);
  const introductionContainerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const headingContainerRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const socialLinkContainerRef = useRef<HTMLUListElement | null>(null);
  const socialLinksRef = useRef<HTMLLIElement[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useGSAP(() => {
    const section = sectionRef.current
    const introduction = introductionRef.current
    const introductionContainer = introductionContainerRef.current
    const heading = headingRef.current
    const contentContainer = contentContainerRef.current
    const socialLinkContainer = socialLinkContainerRef.current

    if (!section || !introduction || !introductionContainer || !heading || !contentContainer || !socialLinkContainer) return

    gsap.set(introduction, { autoAlpha: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: true,
        start: "top top",
        end: "+=1500",
        onRefresh(self) {
          stRef.current = self
        },
      },
    });

    tlRef.current = tl

    const introductionSplit = SplitText.create(introduction, {
      type: "chars",
    });

    tl.to(introduction, {
      autoAlpha: 1
    }, "<")
      .from(introductionSplit.chars, {
        autoAlpha: 0,
        ease: "elastic.out",
        stagger: {
          each: 2 / introductionSplit.chars.length,
          from: "center"
        },
      }, ">")
      .to(introductionSplit.chars, {
        autoAlpha: 0,
        ease: "elastic.out",
        stagger: {
          each: 2 / introductionSplit.chars.length,
          from: "edges"
        },
      }, ">+2")
      .from([heading, contentContainer], {
        y: (i: number) => (i === 0 ? -40 : 40),
        autoAlpha: 0,
      })
      .to(introductionContainer, {
        autoAlpha: 0
      }, "<")
      .addLabel("contact-revealed")

    const handler = createGSAPNavigationHandler(tlRef);

    document.addEventListener("gsap-nav:contact", handler);
    return () => document.removeEventListener("gsap-nav:contact", handler);
  })

  return (
    <Section
      ref={sectionRef}
      id="contact"
    >
      <SectionIntroduction
        ref={introductionRef}
        containerRef={introductionContainerRef}
      >
        How do I contact you?
      </SectionIntroduction>

      <div className="w-full max-w-4xl">
        <SectionHeader>
          <SectionHeading
            ref={headingRef}
            containerRef={headingContainerRef}
          >
            Let's Connect
          </SectionHeading>
        </SectionHeader>

        <div ref={contentContainerRef} >
          <div className="grid md:gap-8 md:grid-cols-2">
            <ContactForm ref={formRef} />
            <div
              className="flex justify-center gap-4 flex-col items-center md:mt-0"
            >
              <ul
                ref={socialLinkContainerRef}
                className="flex justify-center gap-4 md:flex-col md:gap-8 md:items-start md:mt-0"
              >
                {socialLinks.map((socialLink, i) => (
                  <li
                    ref={(el) => {
                      if (el) socialLinksRef.current[i] = el;
                    }}
                    key={socialLink.link}
                    className="gap-2 px-2 py-1 rounded bg-primary"
                  >
                    <SocialLink
                      socialLink={socialLink}
                    />
                  </li>
                ))}
              </ul>
              <DownloadCVButton />
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
