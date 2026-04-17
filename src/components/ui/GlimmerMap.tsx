"use client"

import React, { useEffect, useRef, useState } from "react"

interface Dot {
    x: number
    y: number
    w: number
    h: number
    color: string
    baseOpacity: number
    // Animation props (only for dynamic dots)
    phase?: number
    oscillateSpeed?: number
    isDynamic: boolean
}

export function GlimmerMap() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 })
    const [dots, setDots] = useState<Dot[]>([])

    // 1. Parse SVG Data and Initialize Dots (Run Once)
    useEffect(() => {
        const loadAndParse = async () => {
            try {
                const response = await fetch("/map-dark.svg")
                const text = await response.text()
                const parser = new DOMParser()
                const doc = parser.parseFromString(text, "image/svg+xml")

                const svg = doc.querySelector("svg")
                if (!svg) return

                const viewBox = svg.getAttribute("viewBox")?.split(" ").map(Number) || [0, 0, 1138, 640]
                setDimensions({ w: viewBox[2], h: viewBox[3] })

                const rects = Array.from(doc.querySelectorAll("rect"))
                const newDots: Dot[] = rects.map((rect, i) => {
                    const opacity = parseFloat(rect.getAttribute("opacity") || "1")

                    // Optimization: Only animate 30% of dots randomly
                    const isDynamic = Math.random() < 0.3

                    return {
                        x: parseFloat(rect.getAttribute("x") || "0"),
                        y: parseFloat(rect.getAttribute("y") || "0"),
                        w: parseFloat(rect.getAttribute("width") || "0"),
                        h: parseFloat(rect.getAttribute("height") || "0"),
                        color: "#0EA5E9", // Sky Blue for all dots
                        baseOpacity: opacity,
                        isDynamic,
                        // Random phase for non-sync blinking
                        phase: isDynamic ? Math.random() * Math.PI * 2 : 0,
                        // FINAL TUNE V2: + 10% more speed (0.003 base)
                        oscillateSpeed: isDynamic ? 0.003 + Math.random() * 0.006 : 0
                    }
                })

                setDots(newDots)
            } catch (e) {
                console.error("Canvas Map Init Failed", e)
            }
        }
        loadAndParse()
    }, [])

    // 2. Animation Loop with Caching
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || dots.length === 0) return

        const ctx = canvas.getContext("2d", { alpha: true }) // alpha true for transparent bg
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const canvasWidth = dimensions.w * dpr
        const canvasHeight = dimensions.h * dpr

        canvas.width = canvasWidth
        canvas.height = canvasHeight
        ctx.scale(dpr, dpr)

        // --- OPTIMIZATION: OFFSCREEN CACHE ---
        // Create an offscreen canvas to hold the 70% static dots
        const staticCanvas = document.createElement("canvas")
        staticCanvas.width = canvasWidth
        staticCanvas.height = canvasHeight
        const staticCtx = staticCanvas.getContext("2d")

        if (staticCtx) {
            staticCtx.scale(dpr, dpr) // Scale it too
            staticCtx.clearRect(0, 0, dimensions.w, dimensions.h)

            dots.forEach(dot => {
                if (!dot.isDynamic) {
                    staticCtx.globalAlpha = dot.baseOpacity
                    staticCtx.fillStyle = dot.color
                    // Optimization: fillRect is faster than path functions
                    staticCtx.fillRect(dot.x, dot.y, dot.w, dot.h)
                }
            })
        }

        // Separate the dynamic dots for the loop
        const dynamicDots = dots.filter(d => d.isDynamic)

        let animationFrameId: number

        const render = () => {
            // 1. Clear Frame
            ctx.clearRect(0, 0, dimensions.w, dimensions.h)

            // 2. Blit the static background (One fast draw call)
            if (staticCanvas) {
                ctx.drawImage(staticCanvas, 0, 0, dimensions.w, dimensions.h)
            }

            // 3. Draw only the dynamic dots
            dynamicDots.forEach(dot => {
                // Update Phase
                if (dot.phase !== undefined && dot.oscillateSpeed !== undefined) {
                    dot.phase += dot.oscillateSpeed

                    // Logic: Oscillate AROUND the base opacity.
                    // Range: +/- 0.22 intensity (was 0.20)
                    const sine = Math.sin(dot.phase)
                    const opacityChange = sine * 0.22
                    let displayOpacity = dot.baseOpacity + opacityChange

                    // Clamp
                    if (displayOpacity < 0.1) displayOpacity = 0.1
                    if (displayOpacity > 1) displayOpacity = 1

                    ctx.globalAlpha = displayOpacity
                    ctx.fillStyle = dot.color
                    ctx.fillRect(dot.x, dot.y, dot.w, dot.h)
                }
            })

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => cancelAnimationFrame(animationFrameId)
    }, [dots, dimensions])

    return (
        <div className="w-full h-full relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 pointer-events-none" />
            <div className="w-full aspect-[1138/640] relative">
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
        </div>
    )
}
