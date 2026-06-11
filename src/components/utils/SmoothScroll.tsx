"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Skip Lenis entirely on touch devices: it doesn't smooth touch scrolling
        // (native stays native) but its rAF loop + scroll/resize handling costs
        // every frame. Phones get pure native scroll; consumers fall back when null.
        if (window.matchMedia("(pointer: coarse)").matches) return;
        // Use native window scroll (no DOM wrapping) to prevent hydration mismatch
        const instance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wrapper: window as any,
            content: document.documentElement,
        });

        setLenis(instance);

        function raf(time: number) {
            instance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            instance.destroy();
        };
    }, []);

    return (
        <SmoothScrollContext.Provider value={lenis}>
            {children}
        </SmoothScrollContext.Provider>
    );
}
