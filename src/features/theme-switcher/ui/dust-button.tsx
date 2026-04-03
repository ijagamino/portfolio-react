import { useTheme } from "@/app/providers/theme";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, type ComponentProps } from "react";
import TablerMoon from "~icons/tabler/moon";
import TablerSun from "~icons/tabler/sun";
import {
  setupCanvas,
  generateParticleTargets,
  createParticlesFromPoint,
  renderParticles,
  type Particle,
} from "@/shared/lib/particles";
import {
  DUST_BUTTON_FADE_DURATION,
  DUST_BUTTON_PARTICLE_DURATION,
} from "@/shared/lib/disintegration-timing";

interface DustButtonProps extends ComponentProps<"button"> {
  triggerElement: HTMLElement | null;
}

export default function DustButton({ triggerElement }: DustButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  useGSAP(() => {
    const button = buttonRef.current;
    const canvas = canvasRef.current;
    const trigger = triggerElement;
    if (!button || !canvas || !trigger) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particleCount = 800;
    let particles: Particle[] = [];

    // Generate target positions once on load
    const particleTargets = generateParticleTargets(particleCount);

    const initParticles = () => {
      setupCanvas(canvas);
      particles = createParticlesFromPoint(button, particleTargets);
    };

    initParticles();
    const tl = gsap.timeline({ paused: true });

    tl.to(button, {
      duration: DUST_BUTTON_FADE_DURATION,
      opacity: 0,
      scale: 0.5,
    });

    tl.to(
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
          const particleColor = theme === "light" ? "#000000" : "#ffffff";
          renderParticles(ctx, particles, particleColor);
        },
        onReverseComplete: () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
      },
      ">",
    );

    const timelineTrigger = ScrollTrigger.create({
      trigger,
      scrub: true,
      start: "center center",
      end: "bottom top",
      onUpdate: (self) => {
        tl.progress(self.progress);
      },
    });

    tl.progress(timelineTrigger.progress);

    const handleResize = () => {
      initParticles();
      tl.invalidate();
      ScrollTrigger.refresh();
      tl.progress(timelineTrigger.progress);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      timelineTrigger.kill();
      window.removeEventListener("resize", handleResize);
      tl.kill();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [triggerElement, theme]);

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

      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </>
  );
}
