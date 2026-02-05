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
            <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute text-center px-4 z-20 w-full">
                {/* Intro Label - Larger & Clearer */}
                <p className="text-blue-400 tracking-[0.2em] uppercase text-sm md:text-xl font-semibold mb-4 ml-1 drop-shadow-md">
                    Hello, I am
                </p>

                {/* Main Heading - Cinematic Scale */}
                <h1 className="text-[12vw] md:text-[9rem] font-black tracking-tighter leading-[0.85] mb-8 drop-shadow-2xl">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400">
                        Nayan Narke
                    </span>
                </h1>

                {/* Subtitle - Legible & Balanced */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-white/90 font-medium tracking-[0.2em] text-xs md:text-lg uppercase drop-shadow-lg">
                    <span>Web Developer</span>
                    <span className="hidden md:inline-block text-blue-500 text-xs">●</span>
                    <span>Graphic Designer</span>
                    <span className="hidden md:inline-block text-blue-500 text-xs">●</span>
                    <span>Video Editor</span>
                </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div style={{ y: y2, opacity: opacity2 }} className="absolute left-6 md:left-20 max-w-4xl z-20">
                <h2 className="text-4xl md:text-8xl font-bold leading-[0.9] text-white tracking-tighter drop-shadow-xl">
                    Crafting digital <br />
                    <span className="text-neutral-400">masterpieces.</span>
                </h2>
                <p className="mt-8 text-lg md:text-xl text-white/90 max-w-xl leading-relaxed font-normal drop-shadow-md">
                    Helping brands build modern, high-performance websites with strong visual identities.
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div style={{ y: y3, opacity: opacity3 }} className="absolute right-6 md:right-20 text-right max-w-4xl z-20">
                <h2 className="text-4xl md:text-8xl font-bold leading-[0.9] text-white tracking-tighter drop-shadow-xl">
                    Let&apos;s build <br />
                    <span className="text-blue-500">the future.</span>
                </h2>
            </motion.div>
        </div>
    );
}
