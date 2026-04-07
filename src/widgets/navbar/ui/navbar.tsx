import { useTheme } from "@/app/providers/theme";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useRef, useState, type MouseEvent } from "react";
import IconTablerMenu2 from "~icons/tabler/menu-2";
import IconTablerMoon from "~icons/tabler/moon";
import IconTablerSun from "~icons/tabler/sun";
import IconTablerX from "~icons/tabler/x";
import { GSAP_NAV_TARGETS, NAV_LINKS } from "../model/navigation-items";

export default function Navbar({ visible }: { visible: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useGSAP(() => {
    if (navRef.current) {
      if (visible) {
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          pointerEvents: "auto",
        });
      } else {
        gsap.to(navRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          pointerEvents: "none",
        });
      }
    }
  }, [visible]);

  useGSAP(() => {
    NAV_LINKS.forEach(({ href }) => {
      const sectionId = href.replace("#", "");
      const gsapTarget = GSAP_NAV_TARGETS[sectionId];
      const targetElement = document.querySelector(`#${sectionId}`);

      if (gsapTarget?.pinnedScrollLength) {
        const sectionElement = targetElement?.closest("section") ?? targetElement;
        if (sectionElement) {
          ScrollTrigger.create({
            trigger: sectionElement,
            start: "top center",
            end: `+=${gsapTarget.pinnedScrollLength}`,
            onEnter: () => setActiveSection(sectionId),
            onEnterBack: () => setActiveSection(sectionId),
            onLeave: () => setActiveSection(""),
            onLeaveBack: () => setActiveSection(""),
          });
        }
      } else if (targetElement) {
        ScrollTrigger.create({
          trigger: targetElement,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(sectionId),
          onEnterBack: () => setActiveSection(sectionId),
          onLeave: () => setActiveSection(""),
          onLeaveBack: () => setActiveSection(""),
        });
      }
    });
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");

    if (GSAP_NAV_TARGETS[sectionId]) {
      const { event, label } = GSAP_NAV_TARGETS[sectionId];
      document.dispatchEvent(new CustomEvent(event, { detail: { label } }));
      setIsMobileMenuOpen(false);
      return;
    }

    const targetElement = document.querySelector(`[data-nav-target="${sectionId}"]`);
    if (targetElement) {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(targetElement, true, "top 120px");
      } else {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b-2 bg-background"
      style={{
        transform: "translateY(-100%)",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            const smoother = ScrollSmoother.get();
            if (smoother) {
              smoother.scrollTo(0, true);
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="text-xl font-bold tracking-tight uppercase hover:text-accent"
        >
          Ivan
        </a>

        <ul className="items-center hidden gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`relative text-sm font-medium hover:text-accent ${isActive ? "text-accent" : ""
                    }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-foreground/10"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <IconTablerSun className="w-5 h-5" />
            ) : (
              <IconTablerMoon className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg md:hidden hover:bg-foreground/10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <IconTablerX className="w-5 h-5" />
            ) : (
              <IconTablerMenu2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-full left-0 right-0 mx-4 mt-1 overflow-hidden rounded-lg md:hidden"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: theme === "dark"
              ? "rgba(9, 9, 11, 0.95)"
              : "rgba(250, 250, 250, 0.95)",
            border: theme === "dark"
              ? "1px solid rgba(250, 250, 250, 0.1)"
              : "1px solid rgba(9, 9, 11, 0.1)",
          }}
        >
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`block px-6 py-3 text-sm font-medium hover:bg-foreground/10 ${isActive ? "text-accent bg-foreground/5" : ""
                      }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </ nav>
  );
}
