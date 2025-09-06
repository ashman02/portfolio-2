import Image from "next/image";
import React from "react";
import myImage from "@/../public/images/about-img-final.png";

const About = () => {
  return (
    <div
      className="my-grid relative flex h-screen min-h-[500px] flex-col items-center justify-center"
    >
      <div className="flex w-full flex-col items-center justify-center gap-6 md:w-10/12 md:gap-7 lg:w-8/12 lg:gap-12">
        <h1 className="para-text">Hey, I&apos;m Ashman</h1>
        <p className="card-heading text-center">
          Look, I could bore you with technical specs and fancy buzzwords. But
          here&apos;s what matters: 
          <span className="text-primary">
            I build websites that make you money.
          </span>
        </p>
      </div>
      <div className="absolute h-72 w-52 overflow-hidden rounded-3xl bg-gray-200 md:w-56 -z-10">
        <div className="absolute -z-20 w-full h-full">
          <Image
            src={myImage}
            alt="My Image"
            className="h-full w-full object-fill"
          />
        </div>
        <div className="overlay bg-foreground/70 absolute -z-10 w-full h-full" />
      </div>
    </div>
  );
};

export default About;
