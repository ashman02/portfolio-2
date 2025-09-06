"use client";
import Footer from "@/components/Footer";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import { useTimeline } from "@/context/TimelineContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const contactOverlayRef = useRef<HTMLDivElement>(null);
  const { setActiveHash, setTimeline } = useTimeline();
  useGSAP(() => {
    if (
      !mainContainerRef.current ||
      !sectionsContainerRef.current ||
      !workSectionRef.current ||
      !aboutSectionRef.current ||
      !contactSectionRef.current ||
      !footerRef.current ||
      !contactOverlayRef.current ||
      !heroOverlayRef.current
    )
      return;

    const scrollHeight =
      window.innerHeight +
      workSectionRef.current.scrollWidth +
      contactSectionRef.current.clientHeight +
      footerRef.current.clientHeight;

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

    tl.addLabel("hero")
      .to(sectionsContainerRef.current, {
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
      .to(workSectionRef.current, {
        x: -workSectionRef.current.scrollWidth,
        onComplete: () => setActiveHash("about"),
        onReverseComplete: () => setActiveHash("work"),
      })
      .addLabel("about")
      .to(aboutSectionRef.current, {
        y: -contactSectionRef.current.clientHeight,
        onComplete: () => setActiveHash("contact"),
        onReverseComplete: () => setActiveHash("about"),
      })
      .to(
        contactOverlayRef.current,
        {
          opacity: 0,
        },
        "<",
      )
      .addLabel("contact")
      .to(aboutSectionRef.current, {
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
      <section id="hero" className="bg-background absolute top-0 z-10 w-full">
        <Hero />
        <div
          ref={heroOverlayRef}
          className="bg-foreground absolute top-0 h-full w-full opacity-0 pointer-events-none"
        />
      </section>
      <div
        ref={sectionsContainerRef}
        className="relative z-50 translate-y-[100vh] overflow-x-hidden"
      >
        <section
          id="work"
          ref={workSectionRef}
          className="bg-foreground text-background relative z-40 w-fit"
        >
          <Work />
        </section>
        <section
          id="about"
          ref={aboutSectionRef}
          className="text-background absolute top-0 z-30 bg-gray-700"
        >
          <About />
        </section>
        <section
          id="contact"
          ref={contactSectionRef}
          className="bg-background absolute bottom-0 z-20 w-full"
        >
          <Contact />
          <div
            ref={contactOverlayRef}
            className="bg-foreground absolute top-0 h-full w-full pointer-events-none"
          />
        </section>
        <footer ref={footerRef} className="absolute bottom-0 z-10 w-full">
          <Footer />
        </footer>
      </div>
    </main>
  );
}
