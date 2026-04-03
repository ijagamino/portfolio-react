import { ThemeProvider } from "@/app/providers/theme";
import DustButton from "@/features/theme-switcher/ui/dust-button";
import ContactSection from "@/widgets/contact-section/ui/section";
import HeroSection from "@/widgets/hero-section/ui/section";
import IntroductionSection from "@/widgets/introduction-section/ui/section";
import ProjectsSection from "@/widgets/projects-section/ui/section";
import SeminarsSection from "@/widgets/seminars-section/ui/section";
import ToolsSection from "@/widgets/tools-section/ui/section";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip, MotionPathPlugin, ScrollSmoother, ScrollTrigger, SplitText, TextPlugin } from "gsap/all";
import { useState } from "react";

gsap.registerPlugin(Flip, MotionPathPlugin, ScrollSmoother, ScrollTrigger, SplitText, TextPlugin)

function App() {
  const [heroElement, setHeroElement] = useState<HTMLElement | null>(null)

  useGSAP(() => {
    ScrollSmoother.get()?.kill();

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    smoother.scrollTo(0, false)
    ScrollTrigger.refresh();

    return () => {
      smoother.kill();
    };
  });


  return (
    <ThemeProvider>
      <DustButton triggerElement={heroElement} />
      {/* <DustButton triggerElement={heroRef.current} /> */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main
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
            <HeroSection ref={setHeroElement} />
            <IntroductionSection />
            <ToolsSection />
            <ProjectsSection />
            <SeminarsSection />
            <ContactSection />
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
