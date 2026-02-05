"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.5], [0, 1, 0]);

    const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.8], [0, 1, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center">
            {/* Section 1 */}
            <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute text-center px-4 z-20">
                {/* Intro Label */}
                <p className="text-blue-400 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-4 ml-1">
                    Hello, I am
                </p>

                {/* Main Heading - Clean & Massive */}
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
                    Nayan Narke
                </h1>

                {/* Subtitle - Refined & Minimal */}
                <div className="flex items-center justify-center gap-3 md:gap-6 text-neutral-400 font-light tracking-widest text-xs md:text-sm uppercase">
                    <span>Web Developer</span>
                    <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                    <span>Graphic Designer</span>
                    <span className="w-1 h-1 bg-neutral-600 rounded-full" />
                    <span>Video Editor</span>
                </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div style={{ y: y2, opacity: opacity2 }} className="absolute left-10 md:left-20 max-w-3xl z-20">
                <h2 className="text-4xl md:text-7xl font-bold leading-tight text-white tracking-tight">
                    Crafting digital <br />
                    <span className="text-neutral-500">experiences.</span>
                </h2>
                <p className="mt-8 text-lg text-neutral-400 max-w-lg leading-relaxed font-light">
                    Helping brands build modern, high-performance websites with strong visual identities.
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div style={{ y: y3, opacity: opacity3 }} className="absolute right-10 md:right-20 text-right max-w-3xl z-20">
                <h2 className="text-4xl md:text-7xl font-bold leading-tight text-white tracking-tight">
                    Let&apos;s build <br />
                    <span className="text-blue-500">the future.</span>
                </h2>
            </motion.div>
        </div>
    );
}
