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
            <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute text-center px-4">
                <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-2xl">
                    <span className="block text-2xl md:text-4xl font-light text-neutral-400 mb-2 tracking-wide">Hi, I&apos;m</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        Nayan Narke
                    </span>
                </h1>
                <div className="inline-block relative">
                    <p className="text-sm md:text-xl text-blue-200/90 font-mono tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
                        Web Developer • Graphic Designer • Video Editor
                    </p>
                    {/* Glow effect for subtitle */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl -z-10 rounded-full" />
                </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div style={{ y: y2, opacity: opacity2 }} className="absolute left-10 md:left-20 max-w-2xl">
                <h2 className="text-3xl md:text-6xl font-bold leading-tight text-white">
                    I help businesses build <br />
                    <span className="text-blue-400">modern, high-performance</span> websites.
                </h2>
                <p className="mt-8 text-xl text-gray-400 max-w-lg leading-relaxed">
                    Strong visual identities and digital solutions that convert visitors into customers.
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div style={{ y: y3, opacity: opacity3 }} className="absolute right-10 md:right-20 text-right max-w-2xl">
                <h2 className="text-3xl md:text-6xl font-bold leading-tight text-white">
                    Let&apos;s build something <br />
                    <span className="text-purple-400">impactful.</span>
                </h2>
            </motion.div>
        </div>
    );
}
