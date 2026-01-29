"use client";
import Hero from "@/components/sections/Hero";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Work from "@/components/sections/Work";
import { useTimeline } from "@/context/TimelineContext";
import About from "@/components/sections/About";
import Testimonial from "@/components/sections/Testimonial";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const workSectionContainerRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const testimonialContactFooterSectionContainerRef =
    useRef<HTMLDivElement>(null);
  const testimonialSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const contactOverlayRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const { setActiveHash, setTimeline } = useTimeline();

  //   animation
  useGSAP(() => {
    if (
      !mainContainerRef.current ||
      !workSectionRef.current ||
      !testimonialContactFooterSectionContainerRef.current ||
      !testimonialSectionRef.current ||
      !contactSectionRef.current ||
      !footerRef.current ||
      !contactOverlayRef.current ||
      !heroOverlayRef.current
    )
      return;

    // total scroll height of all sections
    const scrollHeight =
      workSectionRef.current.clientHeight +
      workSectionRef.current.scrollWidth +
      testimonialSectionRef.current.clientHeight +
      contactSectionRef.current.clientHeight +
      footerRef.current.clientHeight;

    // so here is our timeline to animatate content in sequence
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: mainContainerRef.current,
        start: "top top",
        end: "+=" + scrollHeight,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    // we are using labels to track current active section.
    // move our work section to the top
    tl.addLabel("hero")
      .to(workSectionContainerRef.current, {
        y: 0,
        onComplete: () => setActiveHash("work"),
        onReverseComplete: () => setActiveHash("hero"),
      })
      .to(
        heroOverlayRef.current,
        {
          opacity: 1,
        },
        "<",
      )
      .addLabel("work")
      // Move work section to the left
      .to(workSectionRef.current, {
        x: -workSectionRef.current.scrollWidth,
        onComplete: () => setActiveHash("about"),
        onReverseComplete: () => setActiveHash("work"),
      })
      .addLabel("about")
    //   testimonial section to the top
      .to(testimonialContactFooterSectionContainerRef.current, {
        y: 0,
        onComplete: () => setActiveHash("testimonial"),
        onReverseComplete: () => setActiveHash("about"),
      })
      .addLabel("testimonial")
    //   now for contact we are moving testimonial section just equal to the height of contact section. (same for footer)
      .to(testimonialSectionRef.current, {
        y: -contactSectionRef.current.clientHeight,
        onComplete: () => setActiveHash("contact"),
        onReverseComplete: () => setActiveHash("testimonial"),
      })
      .to(
        contactOverlayRef.current,
        {
          opacity: 0,
        },
        "<",
      )
      .addLabel("contact")
      // Move both about section and contact section to reveal footer
      .to(testimonialSectionRef.current, {
        y:
          -footerRef.current.clientHeight +
          8 -
          contactSectionRef.current.clientHeight,
      })
      .to(
        contactSectionRef.current,
        {
          y: -footerRef.current.clientHeight + 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        },
        "<",
      );
    setTimeline(tl);
  }, []);

  return (
    <main ref={mainContainerRef} className="relative">
      {/* Our goal is to create a stacking animation so we have positioned the hero section absolutely */}
      <section id="hero" className="bg-background absolute top-0 z-10 w-full">
        <Hero />
        <div
          ref={heroOverlayRef}
          className="bg-foreground pointer-events-none absolute top-0 h-full w-full opacity-0"
        />
      </section>
      {/* we have overflow on x so we are wrapping this in div and later with gsap we will move section to the left */}
      {/* we are moving this below the fold so we can see hero and with animation we can move it to the top */}
      <div
        ref={workSectionContainerRef}
        className="relative z-20 translate-y-[100vh] overflow-hidden"
      >
        <section
          id="work"
          ref={workSectionRef}
          className="bg-foreground text-background relative z-30 w-fit"
        >
          <Work />
        </section>
        {/* we are grouping other sections with work section because we want other sections to remain under work section and as we are moving work section to the left about section is starting to visible again. so other sections as well */}
        <section
          id="about"
          ref={aboutSectionRef}
          className="text-background absolute top-0 z-20 bg-gray-700"
        >
          <About />
        </section>
        {/* we have grouped testimonial, contact and footer because we want stacking animation contact section comes under testimonial section and footer under contact section. */}
        <div
          ref={testimonialContactFooterSectionContainerRef}
          className="absolute top-0 z-[25] translate-y-[100vh]"
        >
          <section
            id="testimonial"
            ref={testimonialSectionRef}
            className="relative z-30"
          >
            <Testimonial />
          </section>

          <section
            id="contact"
            ref={contactSectionRef}
            className="bg-background absolute bottom-0 z-20 w-full"
          >
            <Contact />
            <div
              ref={contactOverlayRef}
              className="bg-foreground pointer-events-none absolute top-0 h-full w-full"
            />
          </section>
          <footer ref={footerRef} className="absolute bottom-0 z-10 w-full">
            <Footer />
          </footer>
        </div>
      </div>
    </main>
  );
}
