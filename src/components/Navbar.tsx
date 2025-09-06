"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTimeline } from "@/context/TimelineContext";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const { activeHash, gotoHash } = useTimeline();
  const [isActive, setIsActive] = useState(false);
  const [hash, setHash] = useState(activeHash);
  const mainNavbarTl = useRef<GSAPTimeline>(null);
  const mainNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHash(activeHash);
  }, [activeHash]);

  //simple animation nav items fading in
  const { contextSafe } = useGSAP(() => {
    gsap.to(".nav-item", {
      opacity: 1,
      duration: 1,
      ease: "sine.inOut",
      stagger: 0.05,
    });
  }, []);

  const navItems = [
    {
      name: "Work",
      link: "#work",
      isActive: hash === "work",
    },
    {
      name: "About",
      link: "#about",
      isActive: hash === "about",
    },
    {
      name: "Contact",
      link: "#contact",
      isActive: hash === "contact",
    },
  ];

  // function to handle opening of navbar in mobile section
  const handleActivateMobileMenu = contextSafe(() => {
    if (!mobileMenuRef.current) return;
    if (mainNavbarTl.current) mainNavbarTl.current.kill();
    setIsActive(true);

    mainNavbarTl.current = gsap.timeline({
      defaults: { duration: 0.4, ease: "sine.inOut" },
    });

    mainNavbarTl.current
      .to(".bar.top", {
        rotate: 45,
        y: 6,
        transformOrigin: "center center",
      })
      .to(".bar.middle", { scaleX: 0, opacity: 0 }, "<")
      .to(
        ".bar.bottom",
        {
          rotate: -45,
          y: -6,
          transformOrigin: "center center",
        },
        "<",
      )
      .to(
        mobileMenuRef.current,
        {
          scaleY: 1,
        },
        "<",
      )
      .to(".mobile-menu-item", {
        opacity: 1,
        x: 0,
        stagger: 0.05,
      });
  });

  // function to close menubar in mobile
  const handleCloseMobileMenu = contextSafe(() => {
    if (!mobileMenuRef.current) return;
    if (mainNavbarTl.current) mainNavbarTl.current.kill();
    setIsActive(false);

    mainNavbarTl.current = gsap.timeline({
      defaults: { duration: 0.2, ease: "sine.inOut" },
    });

    mainNavbarTl.current
      .to(".bar.top", {
        rotate: 0,
        y: 0,
      })
      .to(".bar.middle", { scaleX: 1, opacity: 1 }, "<")
      .to(
        ".bar.bottom",
        {
          rotate: 0,
          y: 0,
        },
        "<",
      )
      .to(
        ".mobile-menu-item",
        {
          opacity: 0,
          x: -40,
          stagger: 0.02,
        },
        "<",
      )
      .to(mobileMenuRef.current, {
        scaleY: 0,
      });
  });

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav
        ref={mainNavRef}
        className="relative z-30 flex items-center justify-between px-2 py-3 md:px-4 md:py-5 lg:px-16 lg:py-6"
      >
        <h1 className="btn-heading nav-item text-gray-500 opacity-0">
          <Link
            onClick={() => {
              gotoHash("hero");
              if (isActive) {
                handleCloseMobileMenu();
              }
            }}
            href={"#hero"}
          >
            Ashman Sidhu
          </Link>
        </h1>
        {/* Show nav items on medium and large screens */}
        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="btn-heading nav-item opacity-0"
              style={{
                color: item.isActive
                  ? "var(--color-gray-400)"
                  : "var(--color-gray-500)",
              }}
            >
              <Link
                onClick={() => gotoHash(item.name.toLowerCase())}
                href={item.link}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Show hamburger on smaller screens */}
        <div
          className="nav-item flex w-6 cursor-pointer flex-col items-center justify-center gap-1 opacity-0 md:hidden"
          onClick={() => {
            if (isActive) {
              handleCloseMobileMenu();
            } else {
              handleActivateMobileMenu();
            }
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect
              className="bar top fill-gray-500"
              width="24"
              height="2"
              x="2"
              y="6"
              rx="2"
            />
            <rect
              className="bar middle fill-gray-500"
              width="24"
              height="2"
              x="2"
              y="12"
              rx="2"
            />
            <rect
              className="bar bottom fill-gray-500"
              width="24"
              height="2"
              x="2"
              y="18"
              rx="2"
            />
          </svg>
        </div>
      </nav>
      {/* Navbar menu for mobile */}
      <div
        className="bg-foreground absolute top-0 z-20 flex h-screen w-full origin-top scale-y-0 flex-col justify-between px-2 pb-6 pt-24 md:hidden"
        ref={mobileMenuRef}
      >
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="menuItem-heading mobile-menu-item -translate-x-10 opacity-0"
              style={{
                color: item.isActive
                  ? "var(--color-gray-500)"
                  : "var(--color-background)",
              }}
            >
              <Link
                onClick={() => {
                  handleCloseMobileMenu();
                  gotoHash(item.name.toLowerCase());
                }}
                href={item.link}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-item flex items-center gap-4 opacity-0">
          <div>
            <svg
              height="24px"
              width="32px"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#fafafa"
              stroke="#fafafa"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path
                    className="fill-background"
                    d="M510.746,110.361c-2.128-10.754-6.926-20.918-13.926-29.463c-1.422-1.794-2.909-3.39-4.535-5.009 c-12.454-12.52-29.778-19.701-47.531-19.701H67.244c-17.951,0-34.834,7-47.539,19.708c-1.608,1.604-3.099,3.216-4.575,5.067 c-6.97,8.509-11.747,18.659-13.824,29.428C0.438,114.62,0,119.002,0,123.435v265.137c0,9.224,1.874,18.206,5.589,26.745 c3.215,7.583,8.093,14.772,14.112,20.788c1.516,1.509,3.022,2.901,4.63,4.258c12.034,9.966,27.272,15.45,42.913,15.45h377.51 c15.742,0,30.965-5.505,42.967-15.56c1.604-1.298,3.091-2.661,4.578-4.148c5.818-5.812,10.442-12.49,13.766-19.854l0.438-1.05 c3.646-8.377,5.497-17.33,5.497-26.628V123.435C512,119.06,511.578,114.649,510.746,110.361z M34.823,99.104 c0.951-1.392,2.165-2.821,3.714-4.382c7.689-7.685,17.886-11.914,28.706-11.914h377.51c10.915,0,21.115,4.236,28.719,11.929 c1.313,1.327,2.567,2.8,3.661,4.272l2.887,3.88l-201.5,175.616c-6.212,5.446-14.21,8.443-22.523,8.443 c-8.231,0-16.222-2.99-22.508-8.436L32.19,102.939L34.823,99.104z M26.755,390.913c-0.109-0.722-0.134-1.524-0.134-2.341V128.925 l156.37,136.411L28.199,400.297L26.755,390.913z M464.899,423.84c-6.052,3.492-13.022,5.344-20.145,5.344H67.244 c-7.127,0-14.094-1.852-20.142-5.344l-6.328-3.668l159.936-139.379l17.528,15.246c10.514,9.128,23.922,14.16,37.761,14.16 c13.89,0,27.32-5.032,37.827-14.16l17.521-15.253L471.228,420.18L464.899,423.84z M485.372,388.572 c0,0.803-0.015,1.597-0.116,2.304l-1.386,9.472L329.012,265.409l156.36-136.418V388.572z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="btn-heading text-background">Have a Question?</h2>
            <p className="para-text text-gray-400">sidhuashman02@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
