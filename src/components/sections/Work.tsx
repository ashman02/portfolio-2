"use client";
import React from "react";
import WorkCard from "../WorkCard";
import { worksData } from "@/utils/constant";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Work = () => {
  useGSAP(() => {
    // split main heading by text
    const headingSplit = SplitText.create(".work-main-heading", {
      type: "words",
      mask: "words",
    });

    // Set initial position
    gsap.set(headingSplit.words, { opacity: 0, y: 100 });

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
  }, []);
  return (
    <section
      id="work"
      className="bg-background relative z-50 flex flex-nowrap h-screen w-fit items-center gap-4 pb-3 px-2 pt-10 md:gap-5 md:pb-5 md:px-4 md:pt-[60px] lg:gap-6 lg:pb-6 lg:px-16 lg:pt-[72px]"
    >
      <div className="work-header w-2/5">
        <h1 className="work-main-heading section-heading w-full">
          Fresh Talent, Proven Skills
        </h1>
      </div>
      <div className="horizontal-scroll-container bg-background h-full w-fit">
        <div className="project-container flex h-full gap-4 md:gap-5 lg:gap-6">
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
    </section>
  );
};

export default Work;
