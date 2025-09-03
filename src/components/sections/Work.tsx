"use client";
import React, { useRef } from "react";
import WorkCard from "../WorkCard";
import { worksData } from "@/utils/constant";
import Link from "next/link";
import Button from "../Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Work = () => {
  const projectContainerRef = useRef<HTMLDivElement>(null);
  const projectWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // split main heading by text
    const headingSplit = SplitText.create(".work-main-heading", {
      type: "words",
      mask: "words",
    });
    // split paragraph  by lines
    const paragraphSplit = SplitText.create(".work-main-paragraph", {
      type: "lines",
      mask: "lines",
    });

    // Set initial position
    gsap.set(headingSplit.words, { opacity: 0, y: 100 });
    gsap.set(paragraphSplit.lines, { opacity: 0, y: 100 });

    //animate both in
    gsap.to(headingSplit.words, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "sine.inOut",
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".work-main-heading",
        start: "top 70%",
      },
    });

    gsap.to(paragraphSplit.lines, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "sine.inOut",
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".work-main-paragraph",
        start: "top 70%",
      },
    });

    // Horizontal scroll container animation
    // add matchmedia to animate according to the width of horizontal container on various devices
    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: "(min-width : 1024px)",
        isTablet: "(min-width : 768px) and (max-width : 1023px)",
        isMobile: "(max-width : 767px)",
      },
      (context) => {
        const { isDesktop, isTablet } = context.conditions as {
          isDesktop: boolean;
          isTablet: boolean;
        };

        if (!projectContainerRef.current || !projectWrapperRef.current) return;

        // calculate total scroll width
        const firstDistance =
          projectContainerRef.current.scrollWidth - projectWrapperRef.current.clientWidth;

        // add grid padding according to the different screen sizes
        const getFinalDistance = () => {
          if (isDesktop) return firstDistance + 128;
          if (isTablet) return firstDistance + 32;
          return firstDistance + 16;
        };

        gsap.to(projectContainerRef.current, {
          x: () => -getFinalDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: projectWrapperRef.current,
            start: "top top",
            end: "+=" + getFinalDistance(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            // because we are using flex on ancestor element use margin instead of padding
            pinSpacing: "margin",
            invalidateOnRefresh: true,
          },
        });
      },
    );
  }, []);
  return (
    <section
      id="work"
      className="md:-gap-3 lg:-gap-2 flex h-full w-full flex-col py-12 md:py-16 lg:py-24"
    >
      <div className="work-header flex w-full flex-col gap-3 px-2 md:w-5/6 md:gap-4 md:px-4 lg:w-3/5 lg:gap-6 lg:px-16">
        <h1 className="work-main-heading section-heading">
          Fresh Talent, Proven Skills
        </h1>
        <p className="work-main-paragraph para-text text-gray-600">
          Every expert was once a beginner. The difference? I&apos;m hungry to
          prove myself and deliver results that established agencies charge 3x
          for.
        </p>
      </div>
      <div
        ref={projectWrapperRef}
        className="horizontal-scroll-container bg-background h-screen min-h-[500px] w-full overflow-hidden pb-3 pl-2 pt-10 md:gap-5 md:pb-5 md:pl-4 md:pt-[60px] lg:gap-6 lg:pb-6 lg:pl-16 lg:pt-[72px]"
      >
        <div
          ref={projectContainerRef}
          className="project-container flex h-full gap-4"
        >
          {worksData.map((work) => (
            <WorkCard
              key={work.id}
              title={work.title}
              id={work.id}
              img={work.img}
              link={work.link}
            />
          ))}
        </div>
      </div>
      <Link className="px-2 md:px-4 lg:px-16" href={"#contact"}>
        <Button name="Be My Next Success Story" />
      </Link>
    </section>
  );
};

export default Work;
