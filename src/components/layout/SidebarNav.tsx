"use client";

import { Globe, HelpCircle, ArrowUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * SidebarNav — Fixed vertical icon sidebar (left edge)
 * 
 * Glassmorphic pill with tooltip-on-hover icons.
 * Provides: Language toggle, Help, Scroll-to-top, Contact.
 * Appears after scrolling 300px. Adapts to theme.
 * 
 * Inspired by: vertical-icon-sidebar-navigation-with-tooltips.html
 */

const ITEMS = [
  { icon: Globe, label: "Språk", action: "language" },
  { icon: HelpCircle, label: "Hjälp", action: "help" },
  { icon: MessageCircle, label: "Kontakt", action: "contact" },
  { icon: ArrowUp, label: "Till toppen", action: "top" },
] as const;

export function SidebarNav() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<"sv" | "en">("sv");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (action: string) => {
    switch (action) {
      case "top":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "contact":
        document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "language":
        setLang(prev => prev === "sv" ? "en" : "sv");
        break;
      case "help":
        // Future: open help modal
        break;
    }
  };

  return (
    <div
      className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 hidden lg:flex ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
      }`}
    >
      <div className="flex flex-col gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full p-1.5 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.12)]">
        {ITEMS.map(({ icon: Icon, label, action }) => (
          <button
            key={action}
            onClick={() => handleClick(action)}
            className="group relative h-10 w-10 rounded-full grid place-items-center text-[var(--text-muted)] hover:text-tiffany hover:bg-tiffany/10 transition-all duration-200"
          >
            <Icon className="w-4 h-4" />
            {/* Tooltip */}
            <span className="absolute left-12 bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-default)] text-[11px] font-medium px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
              {action === "language" ? (lang === "sv" ? "English" : "Svenska") : label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
