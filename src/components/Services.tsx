
"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const services = [
    {
        id: 1,
        title: "WEB DEVELOPMENT",
        subtitle: "Immersive & Performant",
        description: "Building the digital future with Next.js, React, and WebGL.",
        color: "#3b82f6", // Blue
        visual: <WebVisual />,
    },
    {
        id: 2,
        title: "GRAPHIC DESIGN",
        subtitle: "Bold & Timeless",
        description: "Brand identities that leave a lasting mark on the world.",
        color: "#8b5cf6", // Purple
        visual: <DesignVisual />,
    },
    {
        id: 3,
        title: "VIDEO EDITING",
        subtitle: "Cinematic Storytelling",
        description: "Turning raw footage into high-octane visual experiences.",
        color: "#ef4444", // Red
        visual: <VideoVisual />,
    },
    {
        id: 4,
        title: "CONSULTANCY",
        subtitle: "Strategic Vision",
        description: "Guiding your digital transformation from zero to one.",
        color: "#10b981", // Emerald
        visual: <ConsultVisual />,
    },
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="h-[500vh] relative bg-black">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                {services.map((service, i) => {
                    // Calculate when this specific slide is active
                    // We divide the total scroll (0-1) into segments
                    const start = i * 0.25;
                    const end = start + 0.25;

                    return (
                        <ServiceSlide
                            key={service.id}
                            service={service}
                            progress={scrollYProgress}
                            range={[start, end]}
                            total={services.length}
                            index={i}
                        />
                    );
                })}
            </div>
        </section>
    );
}

function ServiceSlide({ service, progress, range, index, total }: any) {
    const opacity = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
    const scale = useTransform(progress, [range[0], range[1]], [0.8, 1.2]);
    const zIndex = total - index; // Ensure earlier slides are on top if needed, or manage via opacity

    // Slide text parallax
    const xText = useTransform(progress, [range[0], range[1]], [100, -100]);

    return (
        <motion.div
            style={{ opacity, scale, zIndex }}
            className="absolute inset-0 flex items-center justify-center w-full h-full"
        >
            <div className="relative w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Text Content */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        className={`h-1 ${service.id === 3 ? "bg-red-500" : "bg-white"}`}
                    />
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600 leading-tight pb-2 break-words">
                        {service.title}
                    </h2>
                    <p className={`text-2xl md:text-3xl font-light tracking-widest uppercase`} style={{ color: service.color }}>
                        {service.subtitle}
                    </p>
                    <p className="text-xl text-neutral-400 max-w-md leading-relaxed">
                        {service.description}
                    </p>
                </div>

                {/* Right: Abstract Visual */}
                <div className="relative h-[400px] md:h-[600px] flex items-center justify-center p-4">
                    {service.visual}
                </div>
            </div>

            {/* Background Ambient Glow */}
            <div
                className="absolute inset-0 -z-10 blur-[150px] opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${service.color}, transparent 60%)` }}
            />
        </motion.div>
    );
}

// --- Visual Components (Abstract CSS Art) ---

function WebVisual() {
    return (
        <div className="relative w-64 h-64 md:w-96 md:h-96 perspective-1000">
            <motion.div
                animate={{ rotateY: 360, rotateX: 15 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="w-full h-full border-2 border-blue-500/30 rounded-full absolute inset-0 preserve-3d"
            />
            <motion.div
                animate={{ rotateY: -360, rotateX: -15 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="w-3/4 h-3/4 border-2 border-cyan-400/30 rounded-full absolute inset-0 m-auto preserve-3d"
            />
            <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-mono text-xl animate-pulse">
                &lt;/&gt;
            </div>
        </div>
    )
}

function DesignVisual() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="w-64 h-64 bg-gradient-to-tr from-purple-600 to-pink-600 mix-blend-screen opacity-50 rounded-full blur-xl absolute"
            />
            <motion.div
                animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="w-64 h-64 bg-gradient-to-bl from-blue-600 to-violet-600 mix-blend-screen opacity-50 rounded-full blur-xl absolute translate-x-10"
            />
        </div>
    )
}

function VideoVisual() {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="flex gap-4 opacity-50">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.3, ease: "linear" }}
                        className="w-16 h-64 bg-red-500/20 border-x-2 border-red-500/40"
                    />
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-red-500 rounded-full flex items-center justify-center pl-2">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-red-500 border-b-[10px] border-b-transparent" />
                </div>
            </div>
        </div>
    )
}


function ConsultVisual() {
    return (
        <div className="relative w-full h-full flex items-end justify-center gap-4 pb-20">
            {[40, 60, 30, 80, 50, 90].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-8 bg-emerald-500/40 rounded-t-lg border-t border-emerald-400"
                />
            ))}
        </div>
    )
}
