"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Naturatecus",
        category: "Business Website",
        description: "A professional business website focused on clean design and strong brand presence.",
        link: "https://naturatecus.com",
        color: "#3b82f6",
        image: "/projects/naturatecus.png"
    },
    {
        id: 2,
        title: "VanLink",
        category: "Tracking Platform",
        description: "Real-time school van tracking dashboard with live maps and analytics.",
        link: "https://vanlink.in",
        color: "#8b5cf6",
        image: "/projects/vanlink.png"
    },
    {
        id: 3,
        title: "TechSpark",
        category: "Corporate Software",
        description: "Modern corporate identity for a leading technology solutions provider.",
        link: "https://www.techsparksoftware.com",
        color: "#10b981",
        image: "/projects/techspark.png"
    },
];

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeProject, setActiveProject] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Update active project based on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const step = 1 / projects.length;
        // Simple logic: if between 0-0.33 -> 0, 0.33-0.66 -> 1, etc.
        const newIndex = Math.min(Math.floor(latest / step), projects.length - 1);
        if (newIndex !== activeProject) {
            setActiveProject(newIndex);
        }
    });

    return (
        <section ref={containerRef} className="bg-[#050505] relative w-full h-[400vh]">

            {/* Sticky Device Container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Background Glow */}
                <div
                    className="absolute inset-0 transition-colors duration-1000 ease-in-out opacity-20"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${projects[activeProject].color}, transparent 70%)` }}
                />

                {/* Laptop/Device Frame */}
                <div className="relative w-[85vw] md:w-[60vw] aspect-video bg-[#111] rounded-xl border-[1px] border-white/10 shadow-2xl z-10 overflow-hidden transform md:box-content md:p-2 md:bg-neutral-800">
                    {/* Screen Content */}
                    <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={projects[activeProject].image}
                                    alt={projects[activeProject].title}
                                    fill
                                    className="object-cover"
                                />
                                {/* Reflection/Glare */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Laptop Bottom (Optional cosmetic) */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-4 bg-neutral-900 rounded-b-xl hidden md:block" />
                </div>
            </div>

            {/* Scrollable Text Content */}
            <div className="absolute inset-0 pointer-events-none">
                {projects.map((project, index) => (
                    <div key={project.id} className="h-screen w-full flex items-center justify-center md:items-end md:justify-start md:pb-32 px-6 md:px-20">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ amount: 0.5, margin: "-100px" }}
                            className={`pointer-events-auto max-w-lg p-8 rounded-2xl backdrop-blur-md border border-white/10 bg-black/50 transition-all duration-500 ${activeProject === index ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-10'}`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="h-px w-8 bg-white/60" />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/80">{project.category}</span>
                            </div>

                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h3>
                            <p className="text-lg text-neutral-300 leading-relaxed mb-8">{project.description}</p>

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-white font-semibold group"
                            >
                                View Project
                                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>
                ))}

                {/* Spacer for the last item to scroll away if needed, or just end nicely */}
                <div className="h-[20vh]" />
            </div>

        </section>
    );
}
