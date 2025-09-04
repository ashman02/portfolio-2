"use client";
import React, { useRef } from "react";
import About from "../sections/About";
import Contact from "../sections/Contact";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ContactReveal = () => {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const parentContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const aboutSection = aboutSectionRef.current;
    const contactSection = contactSectionRef.current;
    if (!aboutSection || !contactSection) return;

    // contact reveal animation
    gsap.to(aboutSection, {
      y: -contactSection.clientHeight,
      ease: "none",
      scrollTrigger: {
        trigger: parentContainerRef.current,
        start: "top top",
        end: "+=" + contactSection.clientHeight,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.to(".contact-section-overlay", {
            opacity: 1 - self.progress,
            ease: "none",
            duration: 0.2,
          });
        },
      },
    });
  });

  return (
    <section ref={parentContainerRef} className="relative">
      <div ref={aboutSectionRef} className="bg-background relative z-20">
        <About />
      </div>
      <div
        ref={contactSectionRef}
        className="bg-background absolute bottom-0 z-10 h-fit w-full rounded-b-lg"
      >
        <Contact />
        <div className="contact-section-overlay bg-foreground absolute top-0 z-[15] h-full w-full" />
      </div>
    </section>
  );
};

export default ContactReveal;
