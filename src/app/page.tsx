"use client";

import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import dynamic from 'next/dynamic';

const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: false });
const WhyMe = dynamic(() => import("@/components/WhyMe"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <main className="relative bg-[#121212] min-h-screen">
      <ScrollyCanvas numFrames={200} step={3} />
      <div className="relative z-20">
        <About />
        <Services />
        <Skills />
        <Projects />
        <WhyMe />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
