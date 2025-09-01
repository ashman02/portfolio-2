"use client";
import React, { useState } from "react";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="relative z-30 flex items-center justify-between px-2 py-3 md:px-4 md:py-1 lg:px-16">
        <h1
          className="btn-heading"
          style={{
            color: isActive
              ? "var(--color-background)"
              : "var(--color-foreground)",
          }}
        >
          <Link href={"#hero"}>Ashman Sidhu</Link>
        </h1>
        {/* Show nav items on medium and large screens */}
        <ul className="hidden items-center gap-6 md:flex">
          <li
            className="btn-heading"
            style={{
              color:
                pathname === "#work"
                  ? "var(--color-foreground)"
                  : "var(--color-gray-500)",
            }}
          >
            <Link href={"#work"}>Work</Link>
          </li>
          <li
            className="btn-heading"
            style={{
              color:
                pathname === "#about"
                  ? "var(--color-foreground)"
                  : "var(--color-gray-500)",
            }}
          >
            <Link href={"#about"}>About</Link>
          </li>
          <li>
            <Link href={"#contact"}>
              <Button name="Book Now" />
            </Link>
          </li>
        </ul>
        {/* Show hamburger on smaller screens */}
        <div className="flex h-full w-6 cursor-pointer flex-col gap-1 py-1 md:hidden">
          {[1, 2, 3].map((i) => (
            <div
              style={{
                backgroundColor: isActive
                  ? "var(--color-background)"
                  : "var(--color-foreground)",
              }}
              key={i}
              className="h-px w-full rounded-md"
            />
          ))}
        </div>
      </nav>
      {/* Navbar menu for mobile */}
      <div className="bg-foreground absolute top-0 z-20 flex h-screen w-full flex-col justify-between px-2 pb-6 pt-24 md:hidden"
      style={{transform : isActive ? "translateX(0)" : "translateX(-100%)"}}
      >
        <ul className="flex flex-col gap-1">
          <li
            className="menuItem-heading"
            style={{
              color:
                pathname === "#work"
                  ? "var(--color-gray-500)"
                  : "var(--color-background)",
            }}
          >
            <Link href={"#work"}>Work</Link>
          </li>
          <li
            className="menuItem-heading"
            style={{
              color:
                pathname === "#about"
                  ? "var(--color-gray-500)"
                  : "var(--color-background)",
            }}
          >
            <Link href={"#about"}>About</Link>
          </li>
          <li
            className="menuItem-heading"
            style={{
              color:
                pathname === "#contact"
                  ? "var(--color-gray-500)"
                  : "var(--color-background)",
            }}
          >
            <Link href={"#contact"}>Contact</Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
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
