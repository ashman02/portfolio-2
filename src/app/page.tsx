import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Work/>
      <About/>
      <Contact/>
      <Footer/>
    </main>
  );
}
