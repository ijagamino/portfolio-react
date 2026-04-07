export const NAV_LINKS = [
  { label: "Tools", href: "#tools" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const GSAP_NAV_TARGETS: Record<string, { event: string; label: string, pinnedScrollLength?: number }> = {
  tools: { event: "gsap-nav:tools", label: "tools-revealed", pinnedScrollLength: 2500 },
  projects: { event: "gsap-nav:projects", label: "projects-revealed", pinnedScrollLength: 2500 },
  contact: { event: "gsap-nav:contact", label: "contact-revealed", pinnedScrollLength: 1500 },
};
