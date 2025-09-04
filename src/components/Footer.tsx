"use client";
import Link from "next/link";
import React from "react";

const socialsData = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/cforchobar/",
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/in/ashman02",
  },
  {
    name: "Github",
    link: "https://github.com/ashman02",
  },
  {
    name: "X",
    link: "https://x.com/ashman_002",
  },
];

const Footer = () => {
  return (
    <footer className="bg-foreground -mt-[154px] flex flex-col items-center justify-center gap-4 px-2 pb-4 pt-6 md:-mt-[164px] md:flex-row md:justify-between md:px-4 md:pb-12 md:pt-14 lg:-mt-[176px] lg:px-16 relative">
      <div className="flex flex-col items-center gap-1 md:items-start">
        <h3 className="para-text text-gray-400">Email</h3>
        <p className="para-text text-background">
          <Link
            href="mailto:sidhuashman02@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            sidhuashman02@gmail.com
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center gap-1 md:items-start">
        <h3 className="para-text text-gray-400">Socials</h3>
        <div className="flex items-center gap-3">
          {socialsData.map((social) => (
            <Link key={social.name} href={social.link} target="_blank">
              <p className="para-text text-background">{social.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
