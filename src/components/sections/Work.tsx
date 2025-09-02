import React from "react";
import WorkCard from "../WorkCard";
import { worksData } from "@/utils/constant";
import Link from "next/link";
import Button from "../Button";

const Work = () => {
  return (
    <section id="work" className="flex h-full w-full flex-col gap-10 py-12 md:gap-12 md:py-16 lg:gap-16 lg:py-24">
      <div className="work-header flex w-full flex-col gap-3 px-2 md:w-5/6 md:gap-4 md:px-4 lg:w-3/5 lg:gap-6 lg:px-16">
        <h1 className="section-heading">Fresh Talent, Proven Skills</h1>
        <p className="para-text text-gray-600">
          Every expert was once a beginner. The difference? I&apos;m hungry to
          prove myself and deliver results that established agencies charge 3x
          for.
        </p>
      </div>
      <div className="pl-2 md:pl-4 lg:pl-16 project-container flex h-screen min-h-[500px] gap-4 overflow-hidden md:gap-5 lg:gap-6">
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
      <Link className="px-2 md:px-4 lg:px-16" href={"#contact"}>
        <Button name="Be My Next Success Story" />
      </Link>
    </section>
  );
};

export default Work;
