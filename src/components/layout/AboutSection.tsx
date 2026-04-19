"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Calendar, Award } from "lucide-react";
import { useTheme } from "@/components/utils/ThemeProvider";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

const TEAM = [
  { name: "Malin Eriksson", role: "Co-Founder & CEO", initials: "ME" },
  { name: "Johan Andersson", role: "Co-Founder & COO", initials: "JA" },
  { name: "Emma Karlsson", role: "Head of Partnerships", initials: "EK" },
  { name: "David Lindgren", role: "Senior Event Manager", initials: "DL" },
];

const STATS = [
  { icon: MapPin, value: "36", label: "Länder" },
  { icon: Users, value: "500+", label: "Events levererade" },
  { icon: Calendar, value: "10+", label: "Års erfarenhet" },
  { icon: Award, value: "94%", label: "Nöjda kunder" },
];

export function AboutSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="about" className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: isDark ? "#0A0A0A" : "#FFFFFF" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Header — cinematic blur entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] mb-6">
            <span className="text-[#81D8D0] text-xs">◆</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">Om oss</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.05] mb-6">
                Människor som
                <br />
                <span className="italic font-light text-[var(--text-muted)]">förstår events.</span>
              </h2>
            </div>
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                EventPartner grundades med en enkel idé: att göra enterprise-eventplanering lika smidigt som att boka ett hotellrum. Med ett nätverk som spänner över hela Europa och ett team med djup erfarenhet inom eventbranschen, gör vi det möjligt.
              </p>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                Vi sitter i Medelhavet men arbetar globalt. Vårt team har bakgrund inom eventproduktion, hotellbranschen och tech — och vi kombinerar det till en service som är snabb, personlig och pålitlig.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats row — glass overlay on architectural image */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="relative mb-16 md:mb-20 rounded-2xl overflow-hidden"
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Images/black-white-photo-modern-building.jpg"
              alt=""
              fill
              className="object-cover grayscale brightness-[0.3]"
              sizes="100vw"
              aria-hidden="true"
            />
          </div>

          {/* Glass overlay for stats */}
          <div className={`relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 md:p-10 backdrop-blur-sm ${
            isDark
              ? "bg-black/40"
              : "bg-black/30"
          }`}>
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center py-3"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
                >
                  <Icon className="w-5 h-5 text-[#81D8D0] mx-auto mb-2" />
                  <span className="font-display text-2xl md:text-3xl font-medium text-white block leading-none mb-1">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/50">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team grid — staggered entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#81D8D0] mb-6">Teamet</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
                className="group"
              >
                <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${
                  isDark
                    ? "border-white/[0.06] bg-[#111]/50 hover:border-white/[0.1]"
                    : "border-black/[0.06] bg-white hover:border-black/[0.1] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                }`}>
                  {/* Avatar placeholder */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-lg font-semibold mb-4 transition-all duration-300 ${
                    isDark
                      ? "bg-white/[0.05] text-white/30 group-hover:bg-[#81D8D0]/10 group-hover:text-[#81D8D0]"
                      : "bg-black/[0.04] text-black/25 group-hover:bg-[#81D8D0]/10 group-hover:text-[#81D8D0]"
                  }`}>
                    {member.initials}
                  </div>
                  <h4 className="text-[15px] font-medium text-[var(--text-primary)] leading-tight mb-1">
                    {member.name}
                  </h4>
                  <span className="text-[12px] text-[var(--text-muted)]">
                    {member.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
