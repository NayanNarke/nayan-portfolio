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
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center text-white mix-blend-difference">
            {/* Section 1 */}
            <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute text-center px-4">
                <h1 className="text-4xl md:text-8xl font-bold tracking-tighter mb-4">Hi, I’m Nayan Narke</h1>
                <p className="text-lg md:text-2xl font-light tracking-wide">Web Developer | Graphic Designer | Video Editor</p>
            </motion.div>

            {/* Section 2 */}
            <motion.div style={{ y: y2, opacity: opacity2 }} className="absolute left-10 md:left-20 max-w-2xl">
                <h2 className="text-3xl md:text-6xl font-bold leading-tight">
                    I help businesses build modern, high-performance websites.
                </h2>
                <p className="mt-6 text-xl text-gray-300">
                    Strong visual identities and digital solutions that convert visitors into customers.
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div style={{ y: y3, opacity: opacity3 }} className="absolute right-10 md:right-20 text-right max-w-2xl">
                <h2 className="text-3xl md:text-6xl font-bold leading-tight">
                    Let’s build something impactful.
                </h2>
            </motion.div>
        </div>
    );
}
