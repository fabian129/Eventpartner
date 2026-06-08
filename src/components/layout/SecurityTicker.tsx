"use client";

import { useTranslations } from "next-intl";

export function SecurityTicker() {
  const t = useTranslations('vpp');
  const badges = [
    {
      key: 'gdpr',
      icon: (
        <svg className="w-5 h-5 text-tiffany" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      key: 'iso',
      icon: (
        <svg className="w-5 h-5 text-tiffany" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      key: 'soc',
      icon: (
        <svg className="w-5 h-5 text-tiffany" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      key: 'enterprise',
      icon: (
        <svg className="w-5 h-5 text-tiffany" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  // Duplicate list to achieve seamless infinite scrolling
  const scrollBadges = [...badges, ...badges, ...badges, ...badges];

  return (
    <div className="mt-16 pt-10 border-t border-[var(--border-default)]">
      <div className="relative overflow-hidden w-full py-4">
        {/* Soft edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />
        
        {/* Scrolling wrapper */}
        <div className="flex gap-6 animate-[securityMarquee_25s_linear_infinite] hover:[animation-play-state:paused] w-max">
          {scrollBadges.map((badge, i) => (
            <div
              key={`${badge.key}-${i}`}
              className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/[0.02] dark:bg-black/35 backdrop-blur-md border border-white/[0.05] dark:border-white/[0.06] hover:border-tiffany/30 hover:shadow-[0_0_20px_rgba(74,222,210,0.15)] transition-all duration-300 group select-none cursor-default shrink-0"
            >
              <div className="w-10 h-10 rounded-lg bg-tiffany/5 flex items-center justify-center shrink-0 border border-tiffany/10 group-hover:bg-tiffany/10 transition-colors">
                {badge.icon}
              </div>
              <div className="text-left">
                <h4 className="text-white text-xs font-semibold tracking-wide">
                  {t(`securityTicker.${badge.key}.title`)}
                </h4>
                <p className="text-[10px] text-white/50 group-hover:text-white/70 transition-colors mt-0.5">
                  {t(`securityTicker.${badge.key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes securityMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
}
