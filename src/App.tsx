import DustButton from "@/features/theme-switcher/ui/dust-button";
import ContactSection from "@/widgets/contact-section/ui/section";
import HeroSection from "@/widgets/hero-section/ui/section";
import IntroductionSection from "@/widgets/introduction-section/ui/section";
import ProjectsSection from "@/widgets/projects-section/ui/section";
import SeminarsSection from "@/widgets/seminars-section/ui/section";
import ToolsSection from "@/widgets/tools-section/ui/section";
import { ThemeProvider } from "@/app/providers/theme";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip, MotionPathPlugin, ScrollTrigger, SplitText, TextPlugin } from "gsap/all";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(Flip)
gsap.registerPlugin(MotionPathPlugin)
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)
gsap.registerPlugin(TextPlugin)

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const [heroElement, setHeroElement] = useState<HTMLElement | null>(null)

  return (
    <ThemeProvider>
      <main
        ref={mainRef}
        className="
        relative
        [&>section]:p-8
        [&>section]:min-h-dvh 
        [&>section]:relative 
        [&>section]:md:p-32 
        [&>section]:md:min-w-full
        [&>section>div]:mx-auto
        "
      >
        <DustButton triggerElement={heroElement} />
        <HeroSection ref={setHeroElement} />
        <IntroductionSection />
        <ToolsSection />
        <ProjectsSection />
        <SeminarsSection />
        <ContactSection />
      </main>
    </ThemeProvider>
  )
}

export default App
