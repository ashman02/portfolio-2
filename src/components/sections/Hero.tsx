"use client";
import Link from "next/link";
import React, { useRef } from "react";
import Button from "../Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
    <section
      id="#hero"
      className="my-container flex h-screen min-h-[600px] flex-col justify-between"
    >
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
      <Link className="hero-heading-word opacity-0" href={"#contact"}>
        <Button name="Get Your Dream Website Today" />
      </Link>
    </section>
  );
};

export default Hero;
