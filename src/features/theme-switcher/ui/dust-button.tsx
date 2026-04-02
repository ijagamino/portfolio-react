import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useRef, type ComponentProps } from "react"
import TablerMoon from "~icons/tabler/moon"
import TablerSun from "~icons/tabler/sun"
import type { Particle } from "../model/types"
import { useTheme } from "@/app/providers/theme"

interface DustButtonProps extends ComponentProps<'button'> {
  triggerElement: HTMLElement | null
}

export default function DustButton({ triggerElement }: DustButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { theme, toggleTheme } = useTheme()

  useGSAP(() => {
    const button = buttonRef.current
    const canvas = canvasRef.current
    const trigger = triggerElement
    if (!button || !canvas || !trigger) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particleCount = 800

    function setupAnimation(
      {
        button,
        canvas
      }: {
        button: HTMLButtonElement,
        canvas: HTMLCanvasElement
      }) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const rect = button.getBoundingClientRect()
      const originX = rect.left + rect.width / 2
      const originY = rect.top + rect.height / 2

      particles.length = 0

      for (let i = 0; i < particleCount; i++) {
        const targetX = Math.random() * window.innerWidth;
        const targetY = Math.random() * window.innerHeight;

        particles.push({
          x: originX,
          y: originY,
          size: Math.random() * 3 + 1,
          vx: targetX - originX,
          vy: targetY - originY,
          alpha: 1,
        });
      }
    }

    const particles: Particle[] = [];
    setupAnimation({ button, canvas })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        scrub: true,
        start: "center center",
        end: "bottom top",
      }
    })

    tl.to(button, {
      opacity: 0,
      scale: 0.5,
    });

    tl.to(particles, {
      duration: 2,
      ease: "power3.out",
      x: (i) => particles[i].x + particles[i].vx,
      y: (i) => particles[i].y + particles[i].vy,
      stagger: {
        each: 1 / particleCount,
        from: "random",
        ease: "elastic.out"
      },
      onUpdate: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Use theme-aware color: dark particles for light theme, light particles for dark theme
        const particleColor = theme === 'light' ? '#000000' : '#ffffff';
        particles.forEach((p) => {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = particleColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      },
      onReverseComplete: () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      },
    }, ">");

    const handleResize = () => {
      setupAnimation({ button, canvas })
      tl.invalidate()
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", () => { console.log('resized') })
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [triggerElement, theme])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className="fixed top-1/4 left-3/4 z-10 rounded-full -translate-1/2 transition-colors
                   bg-black text-white dark:bg-white dark:text-black"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{ zIndex: 50 }}
      >
        {theme === 'light' ? (
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
