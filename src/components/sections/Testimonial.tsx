import React from "react";

const Testimonial = () => {
  return (
    <div className="my-grid relative flex h-screen min-h-[500px] flex-col items-center justify-center bg-primary lg:gap-16 md:gap-12 gap-10">
      <p className="card-heading w-full text-center md:w-10/12 lg:w-8/12 text-gray-700">
        Working with Ashman on my website has been a great experience. His
        strong technical knowledge and problem solving skills have been
        invaluable.{" "}
        <span className="text-foreground">
          I’m really happy with the end result and would highly recommend
          him{" "}
        </span>
      </p>
      <div className="client-details font-heading text-lg md:text-2xl font-bold leading-none tracking-tighter flex flex-col gap-1 items-center">
        <div className="name">Zack Detwiler</div>
        <div className="company">Owner of Thrive Fitness</div>
      </div>
    </div>
  );
};

export default Testimonial;
