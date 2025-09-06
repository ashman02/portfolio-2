import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { TimelineProvider } from "@/context/TimelineContext";

const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashman Sidhu | Full Stack Web Developer & Designer",
  description:
    "Innovative Full Stack Developer crafting dynamic web experiences with React, Next.js, Three.js, and Figma. Explore projects showcasing cutting-edge UI design, 3D elements, and modern web technologies.",
  keywords: [
    "full stack web developer",
    "React developer",
    "Next.js portfolio",
    "3D web designer",
    "Three.js developer",
    "web design portfolio",
    "Figma web designer",
    "MongoDB developer",
    "Express.js developer",
    "TypeScript developer",
    "freelance web developer",
    "GSAP animations",
    "TailwindCSS expert",
    "creative web developer",
    "interactive web developer",
  ],
  metadataBase: new URL("https://ashman.vercel.app"),
  openGraph: {
    title: "Ashman Sidhu | Full Stack Web Developer & Designer",
    description:
      "Innovative Full Stack Developer crafting dynamic web experiences with React, Next.js, Three.js, and Figma. Explore projects showcasing cutting-edge UI design, 3D elements, and modern web technologies.",
    url: "https://ashman.vercel.app/", // Replace with your actual portfolio URL
    images: [
      {
        url: "/images/og_twitter_img.png", // Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: "Portfolio of Ashman Sidhu - Full Stack Developer",
      },
    ],
    siteName: "Ashman's Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ashman_002", // Replace with your Twitter handle with @
    creator: "@ashman_002", // Usually the same as site or author
    title: "Ashman Sidhu | Full Stack Web Developer & Designer",
    description:
      "Innovative Full Stack Developer crafting dynamic web experiences with React, Next.js, Three.js, and Figma. Explore projects showcasing cutting-edge UI design, 3D elements, and modern web technologies.",
    images: [
      {
        url: "/images/og_twitter_img.png", // Replace with your Twitter card image URL
        alt: "Portfolio of Ashman Sidhu - Full Stack Developer",
      },
    ],
  },
  robots : {
    index : true,
    googleBot : {
      index : true
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${dmSans.variable} bg-background text-foreground antialiased`}
      >
        <TimelineProvider>
          <Navbar />
          {children}
        </TimelineProvider>
      </body>
    </html>
  );
}
