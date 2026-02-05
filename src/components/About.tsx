
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

    return (
        <section ref={targetRef} className="relative h-[450vh] bg-[#0a0a0a]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Background Ambient Light */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.2),transparent_70%)] pointer-events-none" />

                <motion.div style={{ x }} className="flex gap-20 pl-10 md:pl-32 pr-32 items-center">

                    {/* 1. Intro Panel */}
                    <div className="flex-shrink-0 w-[80vw] md:w-[60vw] flex flex-col justify-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500 tracking-tighter mb-8"
                        >
                            ABOUT ME.
                        </motion.h2>
                        <p className="text-xl md:text-3xl text-neutral-400 max-w-2xl leading-relaxed">
                            I am a <span className="text-blue-400 font-bold">Software Developer</span> and <span className="text-emerald-400 font-bold">Marketing Lead at TechSpark</span>.
                            Bridging the gap between <span className="text-white">logic</span> and <span className="text-purple-400">emotion</span> through design, code, and strategy.
                        </p>
                    </div>

                    {/* 2. Web Developer Card */}
                    <Card
                        title="THE DEVELOPER"
                        subtitle="Clean. Scalable. Powerful."
                        description="I build high-performance websites that don't just look good—they work beautifully. React, Next.js, and modern tech stacks."
                        color="from-blue-600 to-cyan-500"
                        icon="💻"
                    />

                    {/* 3. The Strategist (Marketing Lead) Card */}
                    <Card
                        title="THE STRATEGIST"
                        subtitle="Leadership & Execution."
                        description={<>
                            <span className="text-emerald-400 font-bold">Marketing Lead at TechSpark</span> (VanLink). I bridge the gap between tech and business, handling client communication, intern management, and project execution.
                        </>}
                        color="from-emerald-600 to-green-500"
                        icon="🤝"
                    />

                    {/* 3. Graphic Designer Card */}
                    <Card
                        title="THE DESIGNER"
                        subtitle="Visuals that speak."
                        description="Crafting strong visual identities. From logos to full UI/UX systems, I ensure your brand stands out in a crowded digital space."
                        color="from-purple-600 to-pink-500"
                        icon="🎨"
                    />

                    {/* 4. Video Editor Card */}
                    <Card
                        title="THE EDITOR"
                        subtitle="Stories in motion."
                        description="Transforming raw footage into cinematic narratives. Dynamic cuts, smooth transitions, and engaging storytelling for the modern web."
                        color="from-red-600 to-orange-500"
                        icon="🎬"
                    />

                    {/* 5. Philosophy/End Panel */}
                    <div className="flex-shrink-0 w-[80vw] md:w-[50vw] flex flex-col justify-center items-start">
                        <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Ready to level up?
                        </h3>
                        <p className="text-xl text-neutral-400 mb-10">
                            It’s time to build something extraordinary.
                        </p>
                        <div className="h-1 bg-white w-full max-w-xs relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}

function Card({ title, subtitle, description, color, icon }: { title: string, subtitle: string, description: string | React.ReactNode, color: string, icon: string }) {
    return (
        <div className="flex-shrink-0 w-[85vw] md:w-[35vw] h-[60vh] md:h-[70vh] relative group perspective-1000">
            <div
                className={`w-full h-full rounded-3xl bg-neutral-900 border border-neutral-800 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden transition-all duration-500 group-hover:-translate-y-4 shadow-2xl`}
            >
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br ${color} opacity-10 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity duration-700`} />

                {/* Icon Background */}
                <div className="absolute -bottom-10 -right-10 text-[15rem] opacity-5 select-none pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    {icon}
                </div>

                <div>
                    <div className={`inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium tracking-wider mb-6 text-white/80`}>
                        {icon} {title}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                        {subtitle}
                    </h3>
                </div>

                <div className="relative z-10">
                    <p className="text-lg md:text-xl text-neutral-400 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
