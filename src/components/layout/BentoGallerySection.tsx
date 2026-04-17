"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryItem {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    size: "large" | "medium" | "small";
}

const items: GalleryItem[] = [
    // Row 1: Large Hero
    {
        id: "1",
        title: "Nordic Tech Summit 2025",
        category: "Corporate Conference",
        description: "2,400 attendees across three days in Stockholm. Full venue sourcing and logistics.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2600&auto=format&fit=crop",
        size: "large",
    },
    // Row 2: Side by Side
    {
        id: "2",
        title: "Grand Hotel Lobby",
        category: "Luxury Hospitality",
        description: "VVIP arrivals and welcome reception venue.",
        image: "/Images/hotel-lobby.jpg",
        size: "medium",
    },
    {
        id: "3",
        title: "Seoul Floating Island",
        category: "International Launch",
        description: "Futuristic venue for global tech product reveal.",
        image: "/Images/colorful-seoul-floating-island.jpg",
        size: "medium",
    },
    // Row 3: Side by Side
    {
        id: "4",
        title: "Historic Palace Gala",
        category: "Cultural Landmark",
        description: "Exclusive dinner in a protected heritage site.",
        image: "/Images/palace-culture-iasi-romania.jpg",
        size: "medium",
    },
    {
        id: "5",
        title: "Cherry Blossom Bridge",
        category: "Scenic Outdoor",
        description: "Spring festival activation and walkway experience.",
        image: "/Images/illuminated-footbridge-amidst-cherry-trees-night.jpg",
        size: "medium",
    },
    // Row 4: Large Feature
    {
        id: "6",
        title: "E-Gaming Main Stage",
        category: "Esports Arena",
        description: "Arena sourcing for 15,000 attendees with complex AV requirements.",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2670&auto=format&fit=crop",
        size: "large",
    },
    // Row 5: Side by Side
    {
        id: "7",
        title: "Royal Wedding Reception",
        category: "Private Celebration",
        description: "Elegant candlelit dinner for high-profile guests.",
        image: "/Images/wedding-reception-hall-with-elegant-table-setting-with-candles.jpg",
        size: "medium",
    },
    {
        id: "8",
        title: "Volvo Leadership Forum",
        category: "Executive Retreat",
        description: "Private château venue in the south of France.",
        image: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?q=80&w=1600&auto=format&fit=crop",
        size: "medium",
    },
];

export function BentoGallerySection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["end 60%", "end 10%"], // Fade out as it leaves
    });
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

    return (
        <section
            id="bento-gallery"
            ref={containerRef}
            className="relative w-full bg-[var(--bg-primary)] px-6 md:px-10 py-20 md:py-32"
        >
            <motion.div
                style={{ opacity, scale }}
                className="max-w-[1200px] mx-auto"
            >

                {/* Section Header */}
                <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className="section-label mb-3">Selected Works</p>
                        <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.1]">
                            Venues som imponerar.<br /><span className="italic font-light text-[var(--text-muted)]">Event som levererar.</span>
                        </h2>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
                        Ett urval av de venues och event vi har levererat åt våra kunder.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className={cn(
                                "group relative overflow-hidden rounded-lg bg-neutral-900",
                                item.size === "large" ? "md:col-span-2 aspect-[16/9] md:aspect-[2.4/1]" : "md:col-span-1 aspect-[4/3] md:aspect-[1.2/1]"
                            )}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-[0.8] transition-all duration-700 group-hover:scale-105"
                                    sizes={item.size === "large" ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* Content Content - Bottom Aligned */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col justify-end h-full">
                                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <span className="text-[var(--color-tiffany)] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                                        {item.category}
                                    </span>

                                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-[0.95] tracking-tight mb-4 text-white">
                                        {item.title}
                                    </h3>

                                    <p className="max-w-xl text-sm md:text-base text-neutral-400 leading-relaxed opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 delay-75">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Indicator */}
                            <div className="absolute top-6 right-6 opacity-0 transform -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

            </motion.div>
        </section>
    );
}
