"use client";
import Link from "next/link";
import React, { Suspense, useRef } from "react";
import Button from "../Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTimeline } from "@/context/TimelineContext";
import { Canvas } from "@react-three/fiber";
import Experience from "../Experience";

gsap.registerPlugin(useGSAP);

const headerArray = [
  "Turn",
  "Your",
  "Website",
  "Into",
  "Your",
  "Best",
  "Sales",
  "Employee",
];

const Hero = () => {
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const { gotoHash, setActiveHash } = useTimeline();
  //fading in animation
  useGSAP(() => {
    gsap.to(".hero-heading-word", {
      opacity: 1,
      duration: 1,
      ease: "sine.inOut",
      stagger: 0.05,
    });
  }, []);
  return (
    <div className="my-container flex h-screen min-h-[600px] flex-col justify-between">
      <h1
        ref={heroHeadingRef}
        className="hero-heading flex flex-wrap gap-x-2 md:gap-x-3 lg:gap-x-4"
        aria-label="Turn Your Website Into Your Best Sales Employee"
      >
        {headerArray.map((word, index) => (
          <span className="hero-heading-word opacity-0" key={index}>
            {word}
          </span>
        ))}
      </h1>
      <Link
        className="hero-heading-word cursor-pointer opacity-0"
        href={"#contact"}
        onClick={() => {
          gotoHash("contact", { duration: 2 });
          setActiveHash("contact");
        }}
      >
        <Button name="Get Your Dream Website Today" />
      </Link>
      <div className="canvas-container absolute left-0 top-0 -z-10 h-full w-full opacity-60">
        <Canvas>
          <Suspense>
            <Experience />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Hero;
