"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Zap, MessageSquare, TrendingUp, ShieldCheck, Layers, Award, Code, MousePointer2 } from "lucide-react";

const features = [
    {
        title: "Pixel Perfect",
        description: "I obsess over every pixel, ensuring your design is implemented exactly as envisioned.",
        icon: <Layers className="w-6 h-6" />,
        colSpan: "md:col-span-2",
    },
    {
        title: "Lightning Fast",
        description: "Optimized for speed. I aim for 100/100 Lighthouse scores.",
        icon: <Zap className="w-6 h-6" />,
        colSpan: "md:col-span-1",
    },
    {
        title: "Modern Stack",
        description: "Built with Next.js, TypeScript, and the latest robust technologies.",
        icon: <Code className="w-6 h-6" />,
        colSpan: "md:col-span-1",
    },
    {
        title: "SEO Optimized",
        description: "Built-in SEO best practices to help your business rank higher.",
        icon: <TrendingUp className="w-6 h-6" />,
        colSpan: "md:col-span-2",
    },
    {
        title: "Interactive",
        description: "Engaging micro-interactions that delight users.",
        icon: <MousePointer2 className="w-6 h-6" />,
        colSpan: "md:col-span-1",
    },
    {
        title: "Reliable",
        description: "Secure, scalable, and built to last.",
        icon: <ShieldCheck className="w-6 h-6" />,
        colSpan: "md:col-span-2",
    },
];

export default function WhyMe() {
    return (
        <section className="relative bg-[#020202] py-32 px-6 md:px-12 overflow-hidden">
            {/* Meteor Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Meteors number={20} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-blue-500 mb-4">
                        The Advantage
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                        Why work with me?
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <MagicCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function MagicCard({ feature, index }: { feature: any, index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group relative border border-white/10 bg-black rounded-3xl overflow-hidden ${feature.colSpan}`}
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(59, 130, 246, 0.15),
                          transparent 80%
                        )
                    `,
                }}
            />

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-between z-10">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-blue-400 mb-8 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                    {feature.icon}
                </div>

                <div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                        {feature.title}
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors">
                        {feature.description}
                    </p>
                </div>
            </div>

            {/* Inner Border Highlight */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          400px circle at ${mouseX}px ${mouseY}px,
                          rgba(255, 255, 255, 0.1),
                          transparent 40%
                        )
                    `,
                }}
            />
        </motion.div>
    );
}

const Meteors = ({ number = 20 }: { number?: number }) => {
    const [meteors, setMeteors] = useState<number[]>([]);

    useEffect(() => {
        const styles = [...new Array(number)].map(() => ({
            left: Math.floor(Math.random() * 100) + "%",
            animationDelay: Math.random() * 1 + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
        }));
        setMeteors(styles as any);
    }, [number]);

    return (
        <>
            {meteors.map((style, idx) => (
                <span
                    key={idx}
                    className="pointer-events-none absolute left-1/2 top-1/2 -ml-0.5 h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rotate-[215deg] animate-meteor opacity-0 bg-white shadow-[0_0_0_1px_#ffffff10]"
                    style={style}
                >
                    {/* Meteor Tail */}
                    <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
                </span>
            ))}
            <style jsx>{`
                @keyframes meteor {
                    0% { transform: rotate(215deg) translateX(0); opacity: 1; }
                    70% { opacity: 1; }
                    100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
                }
                .animate-meteor {
                    animation: meteor 5s linear infinite;
                }
            `}</style>
        </>
    );
};
