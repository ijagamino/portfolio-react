import { ThemeProvider } from "@/app/providers/theme";
import DustButton from "@/features/theme-switcher/ui/dust-button";
import ContactSection from "@/widgets/contact-section/ui/section";
import HeroSection from "@/widgets/hero-section/ui/section";
import IntroductionSection from "@/widgets/introduction-section/ui/section";
import Navbar from "@/widgets/navbar/ui/navbar";
import ProjectsSection from "@/widgets/projects-section/ui/section";
import ToolsSection from "@/widgets/tools-section/ui/section";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip, MotionPathPlugin, ScrollSmoother, ScrollTrigger, SplitText, TextPlugin } from "gsap/all";
import { useRef, useState } from "react";

gsap.registerPlugin(Flip, MotionPathPlugin, ScrollSmoother, ScrollTrigger, SplitText, TextPlugin)

function App() {
  const [heroElement, setHeroElement] = useState<HTMLElement | null>(null)
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const dustButtonCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const [navbarVisible, setNavbarVisible] = useState(false)

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });
    smoother.scrollTo(0, false)

    ScrollTrigger.create({
      trigger: "#smooth-content",
      start: "top+=100vh top",
      onEnter: () => setNavbarVisible(true),
      onLeaveBack: () => setNavbarVisible(false),
    })
    ScrollTrigger.refresh();
  })

  return (
    <ThemeProvider>
      <Navbar visible={navbarVisible} />
      <DustButton
        triggerElement={heroElement}
        canvasRef={dustButtonCanvasRef}
      />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="relative"
          >
            <HeroSection
              ref={setHeroElement}
              canvasRef={heroCanvasRef}
            />
            <IntroductionSection />
            <ToolsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
        </div>
      </div>
      <canvas
        ref={heroCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
      <canvas
        ref={dustButtonCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </ThemeProvider>
  )
}

export default App
