import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface WorkCardProps {
  id: number;
  img: StaticImageData;
  title: string;
  link: string;
}

const WorkCard = ({ id, img, title, link }: WorkCardProps) => {
  return (
    <Link className="h-full w-full cursor-pointer" href={link} target="_blank">
      <div
        className="relative flex h-full w-80 items-center justify-center rounded-3xl md:w-[584px]"
        style={{ backgroundColor: `var(--color-gray-${id})` }}
      >
        <div className="h-full w-full">
          <Image
            src={img}
            alt={title}
            className="h-full w-full object-cover object-center"
            priority
          />
        </div>
        <h1
          className="card-heading absolute bottom-5 left-4 md:bottom-6 md:left-5 lg:bottom-8 lg:left-6"
          style={{
            color:
              id <= 300 ? "var(--color-foreground)" : "var(--color-background)",
          }}
        >
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default WorkCard;
