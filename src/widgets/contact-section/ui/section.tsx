import { socialLinks } from "@/entities/social-link/model/data";
import SocialLink from "@/entities/social-link/ui/social-link";
import DownloadCVButton from "@/features/download-cv/ui/download-cv-button";
import { createGSAPNavigationHandler } from "@/shared/lib/gsap-navigation";
import Button from "@/shared/ui/button";
import Field from "@/shared/ui/field";
import Input from "@/shared/ui/input";
import Label from "@/shared/ui/label";
import Section from "@/shared/ui/section";
import SectionHeader from "@/shared/ui/section-header";
import SectionHeading from "@/shared/ui/section-heading";
import SectionIntroduction from "@/shared/ui/section-introduction";
import Textarea from "@/shared/ui/textarea";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";

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

    gsap.set(introduction, { opacity: 0 })

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
      opacity: 1
    }, "<")
      .from(introductionSplit.chars, {
        opacity: 0,
        ease: "elastic.out",
        stagger: {
          each: 2 / introductionSplit.chars.length,
          from: "center"
        },
      }, ">")
      .to(introductionSplit.chars, {
        opacity: 0,
        ease: "elastic.out",
        stagger: {
          each: 2 / introductionSplit.chars.length,
          from: "edges"
        },
      }, ">+2")
      .from([heading, contentContainer], {
        y: (i: number) => (i === 0 ? -40 : 40),
        opacity: 0,
      })
      .to(introductionContainer, {
        opacity: 0
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
            <form
              ref={formRef}
              className="flex flex-col gap-4"
              action="https://formspree.io/f/mbdpwylv"
              method="POST"
            >
              <Field className="flex flex-col gap-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input name="name" id="name" type="text" required />
              </Field>

              <Field className="flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea name="message" id="message" rows={8} required />
              </Field>
              <Button>
                Send Message
              </Button>
            </form>

            <ul
              ref={socialLinkContainerRef}
              className="flex flex-wrap justify-center gap-4 md:flex-col md:gap-8 md:items-start md:mt-0"
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
          </div>

          <DownloadCVButton />
        </div>
      </div>
    </Section>
  );
}
