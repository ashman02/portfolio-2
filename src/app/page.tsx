"use client";
import Footer from "@/components/Footer";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const mainTl = useRef<GSAPTimeline>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (mainTl.current) mainTl.current.kill();
        if (
          !mainContainerRef.current ||
          !sectionsContainerRef.current ||
          !workSectionRef.current ||
          !aboutSectionRef.current ||
          !contactSectionRef.current ||
          !footerRef.current
        )
          return;

        const scrollHeight =
          window.innerHeight +
          workSectionRef.current.scrollWidth +
          contactSectionRef.current.clientHeight +
          170;

        mainTl.current = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: mainContainerRef.current,
            start: "top top",
            end: "+=" + scrollHeight,
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
            markers: true,
          },
        });

        mainTl.current
          .to(sectionsContainerRef.current, {
            y: 0,
          })
          .to(workSectionRef.current, {
            x: -workSectionRef.current.scrollWidth,
          })
          .to(aboutSectionRef.current, {
            y: -contactSectionRef.current.clientHeight,
          })
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
  }, []);
  return (
    <main ref={mainContainerRef} className="relative">
      <div className="bg-background absolute top-0 z-10 w-full">
        <Hero />
      </div>
      <div
        ref={sectionsContainerRef}
        className="relative z-50 translate-y-[100vh] overflow-x-hidden"
      >
        <div ref={workSectionRef} className="bg-background relative z-40">
          <Work />
        </div>
        <div
          ref={aboutSectionRef}
          className="bg-background absolute top-0 z-30"
        >
          <About />
        </div>
        <div
          ref={contactSectionRef}
          className="bg-background absolute bottom-0 z-20 w-full"
        >
          <Contact />
        </div>
        <div ref={footerRef} className="absolute bottom-0 z-10 w-full">
          <Footer />
        </div>
      </div>
    </main>
  );
}
