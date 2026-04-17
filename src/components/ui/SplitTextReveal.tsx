"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface SplitTextRevealProps {
    text: string; // Changed from lines array to single string that we'll wrap or split manually vs automatic
    className?: string;
    splitBy?: "characters" | "words";
    staggerDelay?: number;
    initialDelay?: number;
}

export const SplitTextReveal = ({
    text,
    className = "",
    splitBy = "characters",
    staggerDelay = 0.025,
    initialDelay = 100,
}: SplitTextRevealProps) => {
    // Convert basic string input to the format the logic expects (array of lines or just handle single block)
    // For simplicity in this port, let's treat the input string as a single 'line' unless it has newlines?
    // Actually, let's allow passing an array OR a string.
    // For now, let's just handle it as lines.
    const lines = [text];

    const [revealed, setRevealed] = useState<Record<number, boolean>>({});
    const [hasTriggered, setHasTriggered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

    // Build flat list of all characters/words across all lines
    const getAllElements = useCallback(() => {
        const elements: any[] = [];
        lines.forEach((line, lineIndex) => {
            const words = line.split(" ");
            words.forEach((word, wordIndex) => {
                if (splitBy === "characters") {
                    [...word].forEach((char, charIndex) => {
                        elements.push({ lineIndex, wordIndex, charIndex, char });
                    });
                } else {
                    elements.push({ lineIndex, wordIndex, charIndex: 0, char: word });
                }
            });
        });
        return elements;
    }, [lines, splitBy]);

    // Reveal animation logic
    const reveal = useCallback(() => {
        if (hasTriggered) return; // Run once
        setHasTriggered(true);

        const elements = getAllElements();
        // Simple first-to-last stagger
        elements.forEach((_, i) => {
            const delay = initialDelay + i * staggerDelay * 1000;
            const timeout = setTimeout(() => {
                setRevealed((prev) => ({ ...prev, [i]: true }));
            }, delay);
            timeoutsRef.current.push(timeout);
        });
    }, [getAllElements, staggerDelay, initialDelay, hasTriggered]);

    // Scroll Trigger
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    reveal();
                    observer.disconnect();
                }
            },
            { threshold: 0.1 } // Trigger when 10% visible
        );

        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [reveal]);

    // Cleanup
    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, []);

    const getKey = (lineIndex: number, wordIndex: number, charIndex: number) => {
        let index = 0;
        for (let l = 0; l < lines.length; l++) {
            const words = lines[l].split(" ");
            for (let w = 0; w < words.length; w++) {
                if (splitBy === "characters") {
                    for (let c = 0; c < words[w].length; c++) {
                        if (l === lineIndex && w === wordIndex && c === charIndex) return index;
                        index++;
                    }
                } else {
                    if (l === lineIndex && w === wordIndex) return index;
                    index++;
                }
            }
        }
        return index;
    };

    // Styles ported from original
    const charOuterStyle: React.CSSProperties = {
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
    };

    const charInnerStyle = (isRevealed: boolean): React.CSSProperties => ({
        display: "inline-block",
        transform: isRevealed ? "translateY(0)" : "translateY(120%)",
        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
    });

    return (
        <div ref={containerRef} className={className}>
            {lines.map((line, lineIndex) => {
                const words = line.split(" ");
                return (
                    <span key={lineIndex} className="block">
                        {words.map((word, wordIndex) => (
                            <React.Fragment key={wordIndex}>
                                <span className="inline-block whitespace-nowrap">
                                    {splitBy === "characters" ? (
                                        [...word].map((char, charIndex) => {
                                            const key = getKey(lineIndex, wordIndex, charIndex);
                                            return (
                                                <span key={charIndex} style={charOuterStyle}>
                                                    <span style={charInnerStyle(!!revealed[key])}>
                                                        {char}
                                                    </span>
                                                </span>
                                            );
                                        })
                                    ) : (
                                        <span style={charOuterStyle}>
                                            <span
                                                style={charInnerStyle(
                                                    !!revealed[getKey(lineIndex, wordIndex, 0)]
                                                )}
                                            >
                                                {word}
                                            </span>
                                        </span>
                                    )}
                                </span>
                                {/* Word Space */}
                                {wordIndex < words.length - 1 && (
                                    <span className="inline-block w-[0.25em]" />
                                )}
                            </React.Fragment>
                        ))}
                    </span>
                );
            })}
        </div>
    );
};
