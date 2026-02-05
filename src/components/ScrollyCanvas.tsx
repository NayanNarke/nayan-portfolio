"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";

export default function ScrollyCanvas({ numFrames = 200, step = 3 }: { numFrames?: number, step?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [loadProgress, setLoadProgress] = useState(0);
    const [images, setImages] = useState<(HTMLImageElement | null)[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Track scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress (0 to 1) to frame index (0 to numFrames - 1)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, numFrames - 1]);

    // Preload images
    useEffect(() => {
        const loadedImages: (HTMLImageElement | null)[] = new Array(numFrames).fill(null);
        let loadedCount = 0;
        const totalToLoad = Math.floor((numFrames - 1) / step) + 1;

        for (let i = 0; i < numFrames; i += step) {
            const indexStr = i.toString().padStart(3, "0");
            const img = new Image();
            img.src = `/sequence/frame_${indexStr}_delay-0.04s.webp`;

            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / totalToLoad) * 100));
                if (loadedCount >= totalToLoad) {
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / totalToLoad) * 100));
                if (loadedCount >= totalToLoad) {
                    setImagesLoaded(true);
                }
            }

            loadedImages[i] = img;
        }
        setImages(loadedImages);
    }, [numFrames, step]);

    // Render to canvas
    const render = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !imagesLoaded) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Find nearest loaded frame
        // If we are at index 7 and step is 3, we have 0, 3, 6, 9. 
        // 7 should map to 6 or 9. Let's floor it to nearest step.
        const effectiveIndex = Math.floor(index / step) * step;

        const img = images[effectiveIndex];
        if (!img) return;

        // Draw image covering the canvas (object-fit: cover logic)
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawWidth = canvasHeight * imgRatio;
            drawHeight = canvasHeight;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Update canvas on scroll
    useMotionValueEvent(currentIndex, "change", (latest) => {
        const frameIndex = Math.floor(latest);
        requestAnimationFrame(() => render(frameIndex));
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame on resize
                const currentFrame = Math.floor(currentIndex.get());
                render(currentFrame);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded, currentIndex]);

    // Initial render when images load
    useEffect(() => {
        if (imagesLoaded) {
            render(0);
        }
    }, [imagesLoaded]);

    return (
        <div ref={containerRef} className="h-[500vh] w-full relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                />
                <Overlay scrollYProgress={scrollYProgress} />
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black z-50">
                        <div className="text-2xl font-bold mb-4">Loading Experience...</div>
                        <div className="w-64 h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-200 ease-out"
                                style={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <div className="mt-2 text-sm text-neutral-400">{loadProgress}%</div>
                    </div>
                )}
            </div>
        </div>
    );
}
