import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip, SplitText } from "gsap/all";
import { useRef, type ComponentPropsWithRef } from "react";

export default function HeroSection(props: ComponentPropsWithRef<'section'>) {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const descriptionRef = useRef(null)

  useGSAP(() => {
    const heading = headingRef.current
    if (!heading) return
    if (!descriptionRef.current) return

    const split = SplitText.create(heading, { type: "words", tag: "span" })
    const words = split.words

    const tl = gsap.timeline()

    gsap.set(words, { opacity: 0 })
    gsap.set(words[0], {
      position: "fixed",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
    })

    const state = Flip.getState(words[0])

    gsap.set(words, { clearProps: "all" })
    gsap.set(words, { display: "inline-block" })

    Flip.from(state, {
      targets: words[0],
      duration: 1,
      ease: "circ.inOut",
    })

    tl.fromTo(words[0], {
      rotation: 45,
      scale: 0.5,
      duration: 0.5,
    }, {
      scale: 3,
      ease: "elastic.out",
    }, "<")

    tl.to(words[0], {
      scale: 1,
    }, ">")
  })

  return (
    <section className="grid text-center place-items-center" {...props}>
      <div>
        <header className="uppercase">
          <h1 className="text-7xl font-extrabold" ref={headingRef}>Hey! I'm Ivan</h1>
          <p className="text-4xl" ref={descriptionRef}>I'm a Fullstack Developer</p>
        </header>
      </div>
    </section>
  )
}
