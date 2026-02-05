
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const allSkills = [
    "React", "Next.js", "TypeScript", "Three.js", "WebGL", "Node.js",
    "Tailwind", "Framer Motion", "GSAP", "AWS", "Docker", "Git",
    "Photoshop", "Illustrator", "After Effects", "Premiere Pro",
    "DaVinci Resolve", "Blender", "Cinema 4D", "Unreal Engine",
    "OpenAI", "RunwayML", "Sora", "Kling AI", "Python", "SQL"
];

interface Star {
    x: number;
    y: number;
    z: number;
    text: string;
    color: string;
    id: number;
}

export default function Skills() {
    return (
        <section className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a,black)]" />

            <div className="relative z-10 text-center pointer-events-none mb-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase mb-2 mix-blend-screen">
                    Skill Warp
                </h2>
                <p className="text-blue-500 tracking-[0.5em] text-xs md:text-sm animate-pulse">
                    HYPERDRIVE SYSTEM ACTIVE
                </p>
            </div>

            <WarpTunnel />
        </section>
    );
}

function WarpTunnel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [stars, setStars] = useState<Star[]>([]);
    const requestRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Colors for different categories
    const colors = ["#3b82f6", "#8b5cf6", "#ef4444", "#10b981", "#f59e0b"];

    useEffect(() => {
        // Initialize some stars
        const initialStars: Star[] = [];
        for (let i = 0; i < 40; i++) {
            initialStars.push(createStar(true));
        }
        setStars(initialStars);

        const animate = () => {
            setStars(prevStars => {
                const newStars = prevStars.map(star => {
                    // Move star closer only (Z decreases)
                    let newZ = star.z - 20; // Speed

                    // If star passes camera (z < 1), reset it to back
                    if (newZ < 1) {
                        return createStar();
                    }

                    return { ...star, z: newZ };
                });
                // Sort by Z so distant ones render first (painter's algorithm) - optional for DOM but good for sanity
                return newStars.sort((a, b) => b.z - a.z);
            });
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const createStar = (randomZ = false): Star => {
        // Random spread X and Y
        // We want them widespread so they don't clog center
        const angle = Math.random() * Math.PI * 2;
        const radius = 200 + Math.random() * 800; // Spread out from center

        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            z: randomZ ? Math.random() * 2000 : 2000, // Z distance
            text: allSkills[Math.floor(Math.random() * allSkills.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            id: Math.random()
        };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalize -1 to 1
        mouseRef.current = {
            x: (clientX / innerWidth) * 2 - 1,
            y: (clientY / innerHeight) * 2 - 1
        };
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="absolute inset-0 perspective-[1000px] overflow-hidden"
            style={{ perspectiveOrigin: "50% 50%" }}
        >
            {stars.map(star => {
                // Determine scale and opacity based on Z
                // Perspective formula: scale = focalLength / (focalLength + z)? 
                // Actually usually standard perspective projection is roughly 1/z.
                // Let's assume camera at z=0, focal length f=1000?
                // Scale factor `k = 1000 / z`
                // But our z goes from 2000 down to 1.

                const k = 1000 / (star.z || 1);

                // Add parallax based on mouse
                const moveX = mouseRef.current.x * (1000 - star.z) * 0.5;
                const moveY = mouseRef.current.y * (1000 - star.z) * 0.5;

                const x = star.x * (1000 / 2000) + moveX; // Adjust origin spread
                const y = star.y * (1000 / 2000) + moveY;

                const opacity = Math.min(1, (2000 - star.z) / 500); // Fade in from distance

                return (
                    <div
                        key={star.id}
                        className="absolute left-1/2 top-1/2 flex items-center justify-center font-bold whitespace-nowrap will-change-transform"
                        style={{
                            transform: `translate3d(${star.x}px, ${star.y}px, ${star.z}px) scale(${k})`, // Actual 3D transform (browser handles perspective if parent has it)
                            // Wait, if we use translate3d(x,y,z), we don't need manual scale K if perspective is set on parent.
                            // Let's use clean CSS 3D:
                            // Parent has perspective: 1000px.
                            // Child translateZ starts at -2000 (far away) and goes to 0 or positive.
                            // Wait, standard CSS coords: +Z is towards viewer? No, usually +Z is out of screen.

                            // Let's try direct translation manually for full control without fighting CSS origin
                            transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${k})`,
                            color: star.color,
                            opacity: opacity,
                            zIndex: Math.floor(10000 - star.z),
                            textShadow: `0 0 ${10 * k}px ${star.color}`
                        }}
                    >
                        {star.text}
                    </div>
                );
            })}
        </div>
    );
}
