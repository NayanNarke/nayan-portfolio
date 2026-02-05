"use client";

import React from "react";
import { Mail, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/10 py-12 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4 tracking-tighter">NAYAN NARKE</h2>
                        <p className="text-neutral-400 max-w-sm mb-8">
                            Digital Architect bridging logic and emotion. Creating meaningful digital experiences that leave a lasting impact.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon href="mailto:narke.nayan027@gmail.com" icon={Mail} label="Email" />
                            <SocialIcon href="https://www.linkedin.com/in/nayan-narke-809a93222" icon={Linkedin} label="LinkedIn" />
                            <SocialIcon href="https://www.instagram.com/nayan__027_" icon={Instagram} label="Instagram" />
                            <SocialIcon href="https://twitter.com/nayan_narke" icon={Twitter} label="X (Twitter)" />
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Explore</h3>
                        <ul className="space-y-4">
                            <FooterLink href="#" label="Home" />
                            <FooterLink href="#about" label="About" />
                            <FooterLink href="#services" label="Services" />
                            <FooterLink href="#projects" label="Work" />
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-500 text-sm">
                        © {new Date().getFullYear()} Nayan Narke. All rights reserved.
                    </p>
                    <p className="text-neutral-600 text-xs uppercase tracking-widest">
                        Designed & Built with ❤️
                    </p>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
        </footer>
    );
}

function SocialIcon({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            aria-label={label}
        >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>
    );
}

function FooterLink({ href, label }: { href: string, label: string }) {
    return (
        <li>
            <a href={href} className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group">
                <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                {label}
            </a>
        </li>
    );
}
