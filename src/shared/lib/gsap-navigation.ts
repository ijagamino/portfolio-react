import { ScrollSmoother } from "gsap/all";
import type { RefObject } from "react";

export function createGSAPNavigationHandler(
  tlRef: RefObject<gsap.core.Timeline | null>
) {
  return (e: Event) => {
    const { label } = (e as CustomEvent).detail;
    const tl = tlRef.current;
    if (!tl) return;

    const st = tl.scrollTrigger;
    if (!st) return;

    const labelTime = tl.labels[label];
    if (labelTime == null) return;

    const progress = labelTime / tl.duration();
    const scrollTarget = st.start + (st.end - st.start) * progress;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(scrollTarget, true);
    } else {
      window.scrollTo({ top: scrollTarget, behavior: "smooth" });
    }
  };
}
