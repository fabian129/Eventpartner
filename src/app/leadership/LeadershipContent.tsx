"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface TeamMember {
  name: string;
  role: string;
  linkedin?: string;
  image?: string | null;
}

export function LeadershipContent({ headline, description, teamMembers }: { headline: string; description: string; teamMembers: TeamMember[] }) {
  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid dot-grid-fade-from-right pointer-events-none opacity-50" />

      {/* Hero */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">Our Team</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">EventPartner</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88] mb-10">
          {headline}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
          {description}
        </motion.p>
      </section>

      {/* Team Grid */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: EASE }}
              className="group"
            >
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#1a1a1a] border border-[var(--border-default)] mb-6">
                <Image
                  src={member.image || "/Images/team/pontus.jpg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#6AD8D2] hover:border-[#6AD8D2]"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                )}
              </div>
              <h3 className="text-xl font-display font-semibold text-[var(--text-primary)]">{member.name}</h3>
              <p className="text-[var(--text-secondary)] mt-1 font-mono text-[12px] uppercase tracking-[0.08em]">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href="/#request" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[#6AD8D2]/30 transition-all duration-300">
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">Want to work with us?</p>
            <p className="text-[var(--text-secondary)] text-sm">Send us your event inquiry — always free, always personal.</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#6AD8D2]/10 border border-[#6AD8D2]/20 flex items-center justify-center group-hover:bg-[#6AD8D2] group-hover:text-black text-[#6AD8D2] transition-all duration-300 shrink-0 ml-6"><ArrowRight className="w-5 h-5" /></div>
        </motion.a>
      </section>
    </main>
  );
}
