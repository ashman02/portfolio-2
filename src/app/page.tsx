"use client";
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
  const workContainerRef = useRef<HTMLDivElement>(null);
  const mainHeroContainerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(workContainerRef.current, {
      y: 0,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: mainHeroContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          //when progressing increase the opacity of overlay 
          gsap.to("#hero-overlay", { opacity: self.progress, ease: "power3.out" });
        },
      },
    });
  }, []);

  return (
    <main className="relative">
      {/* use shared section for hero and work animation */}
      <section ref={mainHeroContainerRef}>
        <section className="absolute">
          <Hero />
          <div
            id="hero-overlay"
            className="bg-foreground absolute left-0 top-0 h-full w-full opacity-0"
          />
        </section>
        <section>
          <div
            ref={workContainerRef}
            className="bg-background translate-y-[100vh]"
          >
            <Work />
          </div>
        </section>
      </section>
      <section>
        <About />
      </section>
      <section>
        <Contact />
      </section>
    </main>
  );
}
