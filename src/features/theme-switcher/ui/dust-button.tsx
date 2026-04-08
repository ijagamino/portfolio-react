import { useTheme } from "@/app/providers/theme";
import {
  DUST_BUTTON_FADE_DURATION,
  DUST_BUTTON_PARTICLE_DURATION,
} from "@/shared/lib/disintegration-timing";
import {
  createParticlesFromPoint,
  generateParticleTargets,
  renderParticles,
  setupCanvas
} from "@/shared/lib/particles";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, type ComponentProps, type RefObject } from "react";
import TablerMoon from "~icons/tabler/moon";
import TablerSun from "~icons/tabler/sun";

interface DustButtonProps extends ComponentProps<"button"> {
  triggerElement: HTMLElement | null
  canvasRef: RefObject<HTMLCanvasElement | null>
}

export default function DustButton({
  triggerElement,
  canvasRef,
}: DustButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { theme, toggleTheme } = useTheme();
  const themeRef = useRef(theme);
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    themeRef.current = theme
    const tl = tlRef.current
    const canvas = canvasRef.current
    if (!tl || !canvas) return

    const current = tl.progress()
    if (current === 0) return
    tl.progress(current - 0.0001).progress(current)
  }, [theme, canvasRef]);

  useGSAP(() => {
    const button = buttonRef.current
    const canvas = canvasRef.current
    const trigger = triggerElement
    if (!button || !canvas || !trigger) return

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initParticles = () => {
      setupCanvas(canvas);

      const screenArea = window.innerWidth * window.innerHeight;
      const particleCount = Math.floor(screenArea / 3000);

      const particleTargets = generateParticleTargets(particleCount);
      const particles = createParticlesFromPoint(button, particleTargets);

      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl

      tl.to(button, {
        duration: DUST_BUTTON_FADE_DURATION,
        opacity: 0,
        scale: 0.5,
      })
        .to(
          particles,
          {
            duration: DUST_BUTTON_PARTICLE_DURATION,
            ease: "power3.out",
            x: (i) => particles[i].x + particles[i].vx,
            y: (i) => particles[i].y + particles[i].vy,
            stagger: {
              each: 1 / particleCount,
              from: "random",
              ease: "power1.in",
            },
            onUpdate: () => {
              const particleColor = themeRef.current === "light" ? "#000000" : "#ffffff";
              renderParticles(ctx, particles, particleColor);
            },
          },
          ">",
        );

      ScrollTrigger.create({
        trigger,
        scrub: true,
        start: "center center",
        end: "bottom top",
        onUpdate: (self) => {
          tl.progress(self.progress);
        },
      });
    };

    initParticles()
  }, [triggerElement]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className="fixed top-1/4 left-3/4 z-10 rounded-full -translate-1/2 transition-colors
                   bg-black text-white dark:bg-white dark:text-black"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        style={{ zIndex: 50 }}
      >
        {theme === "light" ? (
          <TablerMoon className="size-18 md:size-24" />
        ) : (
          <TablerSun className="size-18 md:size-24" />
        )}
      </button>
    </>
  );
}
