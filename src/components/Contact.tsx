"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Mail, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <section className="relative bg-black min-h-screen flex items-center justify-center overflow-hidden">
            {/* 1. Fluid Particle Background */}
            <ParticleNetwork />

            {/* 2. Central Holographic Interface */}
            <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center justify-center h-full pointer-events-none">
                <HoloInterface />
            </div>

            {/* Ambient Lighting */}
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-blue-500/5 to-transparent z-0" />
        </section>
    );
}

// --- PARTICLE NETWORK COMPONENT ---
function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = container.offsetWidth;
        let height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: any[] = [];
        const particleCount = 80;
        const connectionDistance = 150;
        const mouseDistance = 200;

        let mouse = { x: -1000, y: -1000 };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse repulsion
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 5;
                    const directionY = forceDirectionY * force * 5;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = "rgba(100, 150, 255, 0.8)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Init
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

                // Draw connections
                for (let j = index; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x;
                    const dy = particles[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 150, 255, ${1 - distance / connectionDistance})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = container.offsetWidth;
            height = container.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        window.addEventListener("resize", handleResize);
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}

// --- HOLOGRAPHIC INTERFACE COMPONENT ---
function HoloInterface() {
    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 400, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 400, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        x.set((mouseX / width) - 0.5);
        y.set((mouseY / height) - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative pointer-events-auto perspective-1000 group cursor-default w-full max-w-2xl"
        >
            {/* Glass Card */}
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12">

                {/* Holographic Header */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

                <div className="relative z-10 flex flex-col h-full">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-2">
                            Initialize Connection
                        </h2>
                        <p className="text-blue-400 text-xs tracking-[0.3em] uppercase">
                            SECURE HOLOGRAPHIC TRANSMISSION
                        </p>
                    </div>

                    {/* Form */}
                    {/* Form */}
                    <form
                        action="https://formspree.io/f/YOUR_FORM_ID"
                        method="POST"
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Identity" placeholder="Name" name="name" />
                            <InputGroup label="Comms" placeholder="Mobile Number" name="mobile" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Coords" placeholder="Email Address" type="email" name="email" />
                            <InputGroup label="Topic" placeholder="Subject" name="subject" />
                        </div>
                        <InputGroup label="Transmission" placeholder="Message" textarea name="message" />

                        <div className="pt-4">
                            <button type="submit" className="w-full relative group overflow-hidden rounded-xl bg-blue-600 p-[1px]">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative bg-black h-full rounded-xl px-8 py-4 flex items-center justify-center gap-3 transition-colors group-hover:bg-transparent">
                                    <span className="text-white font-bold tracking-widest uppercase text-sm">Send Message</span>
                                    <span className="text-white group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </div>
                            </button>
                        </div>
                    </form>

                    {/* Social Links */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SocialLink href="mailto:narke.nayan027@gmail.com" label="Email" value="narke.nayan027@gmail.com" icon={Mail} delay={0.1} />
                            <SocialLink href="https://www.instagram.com/nayan__027_" label="Instagram" value="@nayan__027_" icon={Instagram} delay={0.2} />
                            <SocialLink href="https://www.linkedin.com/in/nayan-narke-809a93222" label="LinkedIn" value="Nayan Narke" icon={Linkedin} delay={0.3} />
                            <SocialLink href="https://twitter.com/nayan_narke" label="X" value="@nayan_narke" icon={Twitter} delay={0.4} />
                        </div>
                    </div>

                    {/* Footer Status */}
                    <div className="mt-8 text-center text-xs text-white/30 font-mono tracking-widest flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        SYSTEM ONLINE // ENCRYPTION ACTIVE
                    </div>

                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10px] w-full animate-scan pointer-events-none" />
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10 group-hover:bg-purple-500/20 transition-colors duration-500" />

        </motion.div>
    );
}

function InputGroup({ label, placeholder, type = "text", textarea = false, name }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] text-blue-400/70 tracking-widest uppercase pl-1">{label}</label>
            {textarea ? (
                <textarea
                    name={name}
                    rows={4}
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                    required
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    required
                />
            )}
        </div>
    );
}


// --- LIQUID PHYSICS SOCIAL CARD ---

function SocialLink({ href, label, value, icon: Icon, delay }: { href: string, label: string, value: string, icon: any, delay: number }) {
    const [isHovered, setIsHovered] = useState(false);

    // Liquid Bloom Physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }; // More responsive, less sluggish
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <>
            {/* Global Gooey Filter (Hidden but active) */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay, duration: 0.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                className="group relative flex items-center gap-4 p-4 rounded-xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 z-10 hover:border-white/20"
            >
                {/* --- LIQUID LAYER (Background Only) --- */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ filter: "url(#goo)" }}
                >
                    {/* The gooey blob */}
                    <motion.div
                        className="absolute w-40 h-40 bg-blue-600/40 rounded-full blur-2xl"
                        style={{
                            left: springX,
                            top: springY,
                            x: "-50%",
                            y: "-50%",
                        }}
                    />

                    {/* Static background goo for blending */}
                    <div className="absolute inset-0 bg-blue-900/10 blur-xl" />
                </div>

                {/* --- GLASS LAYER (Separation) --- */}
                <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20 pointer-events-none" />

                {/* --- CONTENT LAYER (Top, Sharp) --- */}
                <div className="relative z-20 flex items-center gap-4 w-full pointer-events-none">
                    {/* Icon Container */}
                    <div className="relative p-3 rounded-lg bg-black/60 border border-white/10 group-hover:border-blue-500/50 transition-colors shadow-lg">
                        <Icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />

                        {/* Internal Icon Glow */}
                        <div className="absolute inset-0 bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-blue-300/80 uppercase tracking-widest font-mono font-bold group-hover:text-blue-200 transition-colors shadow-black drop-shadow-md">{label}</span>
                            <ArrowUpRight className="w-3 h-3 text-white/50 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300" />
                        </div>
                        <div className="text-sm text-gray-200 font-semibold truncate group-hover:text-white transition-colors drop-shadow-sm tracking-wide">
                            {value}
                        </div>
                    </div>
                </div>

                {/* Glass Border Highlight */}
                <div className="absolute inset-0 border border-white/5 group-hover:border-blue-400/30 rounded-xl transition-colors pointer-events-none" />
            </motion.a>
        </>
    );
}
