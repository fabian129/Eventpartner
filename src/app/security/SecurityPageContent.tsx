"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, Server, UserCheck, Globe, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const ICON_MAP: Record<string, any> = { lock: Lock, server: Server, fileCheck: FileCheck, userCheck: UserCheck, eye: Eye, alertTriangle: AlertTriangle };

const DEFAULT_PILLARS = [
  { icon: Lock, title: "Data Encryption", description: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We follow industry best practices for key management and rotation." },
  { icon: Server, title: "EU-Based Infrastructure", description: "All data is hosted on EU-based servers. We do not transfer personal data outside the European Economic Area without explicit safeguards." },
  { icon: FileCheck, title: "GDPR Compliant", description: "EventPartner is fully GDPR compliant. We maintain a detailed data processing register and respond to data subject requests within 30 days." },
  { icon: UserCheck, title: "Access Control", description: "Role-based access control (RBAC) ensures that only authorized personnel can access sensitive information. All access is logged and auditable." },
  { icon: Eye, title: "Transparency", description: "We publish a clear privacy policy and maintain an open line of communication for any data protection concerns or questions." },
  { icon: AlertTriangle, title: "Incident Response", description: "We maintain a documented incident response plan with 72-hour notification commitment in accordance with GDPR Article 33." },
];

const DEFAULT_COMPLIANCE = [
  { category: "Data Protection", items: ["GDPR (EU General Data Protection Regulation)", "Swedish Data Protection Authority (IMY) guidelines", "Data Processing Agreements (DPA) with all sub-processors", "Privacy Impact Assessments (PIA) for new services"] },
  { category: "Security Standards", items: ["TLS 1.3 encryption for all communications", "AES-256 encryption for stored data", "Regular third-party security audits", "Vulnerability scanning and penetration testing"] },
  { category: "Organizational Measures", items: ["Designated Data Protection Officer (DPO)", "Staff training on data protection and security", "Documented information security policies", "Regular policy reviews and updates"] },
];

const DEFAULT_RIGHTS = [
  { right: "Right of Access", desc: "Request a copy of all personal data we hold about you." },
  { right: "Right to Rectification", desc: "Request correction of inaccurate or incomplete personal data." },
  { right: "Right to Erasure", desc: "Request deletion of your personal data under certain conditions." },
  { right: "Right to Data Portability", desc: "Receive your personal data in a machine-readable format." },
  { right: "Right to Object", desc: "Object to the processing of your personal data for direct marketing." },
  { right: "Right to Restrict Processing", desc: "Request limitation of the processing of your personal data." },
];

interface SecurityCMS {
  heroLabel?: string; heroLabelRight?: string; heroBadge?: string;
  heroHeadline?: string; heroHeadlineAccent?: string; heroSubtitle?: string;
  pillarsLabel?: string; pillarsHeadline?: string; pillarsHeadlineAccent?: string;
  pillarCards?: { title: string; description: string; icon?: string }[];
  complianceLabel?: string; complianceHeadline?: string; complianceHeadlineAccent?: string;
  complianceSections?: { category: string; items: string[] }[];
  rightsLabel?: string; rightsHeadline?: string; rightsHeadlineAccent?: string;
  rightsIntro?: string; rightsList?: { right: string; desc: string }[];
  dpoTitle?: string; dpoSubtitle?: string; dpoDescription?: string; dpoEmail?: string;
  ctaHeadline?: string; ctaDescription?: string;
}

export function SecurityPageContent({ cms }: { cms?: SecurityCMS }) {
  const pillars = cms?.pillarCards?.map(p => ({ icon: ICON_MAP[p.icon || "lock"] || Lock, title: p.title, description: p.description })) || DEFAULT_PILLARS;
  const compliance = cms?.complianceSections || DEFAULT_COMPLIANCE;
  const rights = cms?.rightsList || DEFAULT_RIGHTS;

  return (
    <main className="relative w-full pt-32 md:pt-44 pb-20 md:pb-32 overflow-hidden">
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex justify-between items-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabel || "Security & Compliance"}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-dim)]">{cms?.heroLabelRight || "GDPR · EU Data"}</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6AD8D2]/10 border border-[#6AD8D2]/20 mb-8">
            <Shield className="w-3.5 h-3.5 text-[#6AD8D2]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6AD8D2]">{cms?.heroBadge || "Enterprise-Grade Security"}</span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[-0.02em] text-[var(--text-primary)] leading-[0.88]">
            {cms?.heroHeadline || "Your data"}<br /><span className="text-[#6AD8D2]">{cms?.heroHeadlineAccent || "is sacred."}</span>
          </h1>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
          {cms?.heroSubtitle || "We handle event data for some of Europe's largest organizations. That trust is earned through rigorous security practices, full GDPR compliance, and absolute transparency about how we protect your information."}
        </motion.p>
      </section>

      {/* Pillars */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6AD8D2] block mb-6">{cms?.pillarsLabel || "Security Foundations"}</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] max-w-lg">{cms?.pillarsHeadline || "Built on six"}<br />{cms?.pillarsHeadlineAccent || "security pillars."}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }} className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] group hover:border-[#6AD8D2]/20 hover:shadow-lg hover:shadow-[#6AD8D2]/[0.03] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#6AD8D2]/10 flex items-center justify-center mb-5"><p.icon className="w-5 h-5 text-[#6AD8D2]" /></div>
              <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-2">{p.title}</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7]">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Compliance */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6AD8D2] block mb-6">{cms?.complianceLabel || "Compliance Framework"}</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95] max-w-lg">{cms?.complianceHeadline || "Standards we"}<br />{cms?.complianceHeadlineAccent || "hold ourselves to."}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {compliance.map((section, i) => (
            <motion.div key={section.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i, ease: EASE }} className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6AD8D2] mb-6">{section.category}</h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#6AD8D2]/60" /><span className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{item}</span></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Data Rights */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6AD8D2] block mb-6">{cms?.rightsLabel || "Your Rights"}</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-[0.95]">{cms?.rightsHeadline || "You are in"}<br />{cms?.rightsHeadlineAccent || "control."}</h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.7] mt-6">{cms?.rightsIntro || "Under GDPR, you have extensive rights regarding your personal data. We make it easy to exercise them."}</p>
          </motion.div>
          <motion.div className="lg:col-span-7 lg:col-start-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
            <div className="space-y-0 divide-y divide-[var(--border-default)]">
              {rights.map((r) => (
                <div key={r.right} className="py-5 first:pt-0 last:pb-0">
                  <h4 className="text-[16px] font-medium text-[var(--text-primary)] mb-1">{r.right}</h4>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">{r.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* DPO */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="p-8 md:p-10 rounded-2xl bg-[#0A0A0A] border border-white/[0.06]">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#6AD8D2]/15 flex items-center justify-center shrink-0"><Globe className="w-5 h-5 text-[#6AD8D2]" /></div>
            <div>
              <h3 className="font-display text-xl font-medium text-white mb-1">{cms?.dpoTitle || "Data Protection Officer"}</h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">{cms?.dpoSubtitle || "For questions about data processing"}</p>
            </div>
          </div>
          <p className="text-[15px] text-white/50 leading-[1.7] mb-6 max-w-2xl">{cms?.dpoDescription || "If you have any questions about how we process your data, wish to exercise your rights, or want to report a data protection concern, please contact our Data Protection Officer."}</p>
          <a href={`mailto:${cms?.dpoEmail || "dpo@eventpartner.se"}`} className="inline-flex items-center gap-2 text-[#6AD8D2] text-sm font-medium hover:text-[#5EC4BA] transition-colors duration-300">{cms?.dpoEmail || "dpo@eventpartner.se"}<ArrowRight className="w-4 h-4" /></a>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.a href="/#request" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="group flex items-center justify-between p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[#6AD8D2]/30 transition-all duration-300">
          <div>
            <p className="text-xl md:text-2xl font-display font-medium text-[var(--text-primary)] mb-2">{cms?.ctaHeadline || "Questions about security?"}</p>
            <p className="text-[var(--text-secondary)] text-sm">{cms?.ctaDescription || "We're happy to discuss our security practices in detail. Get in touch with our team."}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#6AD8D2]/10 border border-[#6AD8D2]/20 flex items-center justify-center group-hover:bg-[#6AD8D2] group-hover:text-black text-[#6AD8D2] transition-all duration-300 shrink-0 ml-6"><ArrowRight className="w-5 h-5" /></div>
        </motion.a>
      </section>
    </main>
  );
}
