import { useTheme } from "@/app/providers/theme";
import { DUST_BUTTON_PARTICLE_START_PROGRESS } from "@/shared/lib/disintegration-timing";
import {
  createParticlesFromText,
  renderParticles,
  setupCanvas
} from "@/shared/lib/particles";
import Section from "@/shared/ui/section";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip, ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import { useEffect, useRef, useState, type ComponentProps, type RefObject } from "react";
import { createPortal } from "react-dom";

interface HeroSectionProps extends ComponentProps<"section"> {
  canvasRef: RefObject<HTMLCanvasElement | null>
}

export default function HeroSection({
  ref: externalRef,
  canvasRef,
  ...props
}: HeroSectionProps) {
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const [portalWord, setPortalWord] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const smoother = ScrollSmoother.get();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    themeRef.current = theme;

    const st = scrollTriggerRef.current;
    if (!st) return;

    st.vars.onUpdate?.(st);
  }, [theme]);

  const mergeRefs = (element: HTMLElement | null) => {
    sectionRef.current = element;
    if (typeof externalRef === "function") {
      externalRef(element);
    }
  };

  useGSAP(() => {
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const canvas = canvasRef.current;
    const trigger = sectionRef.current;

    if (!heading || !description || !canvas || !trigger || !smoother) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = () => {
      setupCanvas(canvas);

      const screenArea = window.innerWidth * window.innerHeight;
      const baseReductionFactor = screenArea > 2000000
        ? 2 : screenArea > 1000000
          ? 3 : screenArea > 500000
            ? 4 : 5

      const headingParticles = createParticlesFromText(heading, baseReductionFactor);
      const descriptionParticles = createParticlesFromText(description, baseReductionFactor + 1);
      const particles = [...headingParticles, ...descriptionParticles];

      const scrollTrigger = ScrollTrigger.create({
        trigger: trigger,
        start: "center center",
        end: "+=500",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress =
            self.progress <= DUST_BUTTON_PARTICLE_START_PROGRESS
              ? 0
              : (self.progress - DUST_BUTTON_PARTICLE_START_PROGRESS) /
              (1 - DUST_BUTTON_PARTICLE_START_PROGRESS);

          heading.style.opacity = progress > 0.01 ? "0" : "1";
          description.style.opacity = progress > 0.0 ? "0" : "1";

          if (progress > 0.01) {
            const renderedParticles = particles.map((particle) => ({
              x: particle.x + particle.vx * progress,
              y: particle.y + particle.vy * progress,
              size: particle.size,
              vx: particle.vx,
              vy: particle.vy,
              alpha: 1 - progress * 0.8,
            }));

            const particleColor = themeRef.current === "light" ? "#000000" : "#ffffff";
            renderParticles(ctx, renderedParticles, particleColor);
          } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        },
      });

      scrollTriggerRef.current = scrollTrigger;
      return scrollTrigger;
    };

    const split = SplitText.create(headingRef.current, {
      type: "words",
      tag: "span",
    });
    const words = split.words;

    setPortalWord(words[0].innerHTML);
    gsap.set(words, { opacity: 0 });
    gsap.set(description, { opacity: 0 });

    gsap.delayedCall(0, () => {
      const tl = gsap.timeline();
      smoother.paused(true);
      const clone = portalRef.current;
      if (!clone) return;

      const state = Flip.getState(clone);

      const rect = words[0].getBoundingClientRect();
      gsap.set(clone, {
        position: "fixed",
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
        xPercent: -50,
        yPercent: -50,
      });

      Flip.from(state, {
        duration: 1,
        ease: "circ.inOut",
        onComplete: () => {
          gsap.set(words[0], { opacity: 1 });
          setPortalWord(null);
        },
      })

      tl.fromTo(clone, {
        rotation: 45,
        scale: 0.5,
        duration: 0.5,
      }, {
        scale: 3,
        ease: "elastic.out",
      }, "<")
        .to(clone, {
          scale: 1,
        }, ">")
        .to([words[1], words[2]], {
          opacity: 1,
          scale: 1,
          stagger: 0.2,
        }, ">")
        .to(description, {
          opacity: 1,
        }, ">")
        .call(() => {
          initParticles();
          smoother.paused(false);
        })
    })
  }, [smoother])

  return (
    <>
      {portalWord &&
        createPortal(
          <div
            ref={portalRef}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <header className="uppercase">
              <h1 className="font-extrabold uppercase text-7xl">
                {portalWord}
              </h1>
            </header>
          </div>,
          document.body,
        )}
      <Section
        ref={mergeRefs}
        className="grid text-center place-items-center"
        {...props}
      >
        <div>
          <header className="uppercase">
            <h1
              className="font-extrabold text-7xl"
              ref={headingRef}
            >
              Hey! I'm Ivan
            </h1>
            <p
              className="text-4xl"
              ref={descriptionRef}
            >
              I'm a Fullstack Developer
            </p>
          </header>
        </div>
      </Section>

      {createPortal(
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: -1 }}
        />,
        document.body,
      )}
    </>
  );
}
