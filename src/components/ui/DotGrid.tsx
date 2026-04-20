"use client";

/**
 * DotGrid — Reusable dot-grid background texture.
 *
 * Features:
 * - Rich Purple (#7851A9) base dots with diagonal fade
 * - Slow drifting wave that shifts between purple → tiffany blue
 * - mirror prop flips the diagonal (top-left/bottom-right instead of top-right/bottom-left)
 * - Sits behind all content (z-0)
 */

interface DotGridProps {
  bleedTop?: number;
  bleedBottom?: number;
  mirror?: boolean;
  className?: string;
}

export function DotGrid({ bleedTop = 0, bleedBottom = 200, mirror = false, className = "" }: DotGridProps) {
  // Default: strong top-right + bottom-left
  // Mirror: strong top-left + bottom-right
  const maskA = mirror
    ? "radial-gradient(ellipse 25% 65% at 3% 35%, black 0%, rgba(0,0,0,0.4) 40%, transparent 70%)"
    : "radial-gradient(ellipse 70% 45% at 90% 15%, black 0%, rgba(0,0,0,0.5) 40%, transparent 75%)";
  const maskB = mirror
    ? "radial-gradient(ellipse 35% 65% at 92% 65%, black 0%, rgba(0,0,0,0.4) 40%, transparent 70%)"
    : "radial-gradient(ellipse 65% 45% at 8% 85%, black 0%, rgba(0,0,0,0.5) 40%, transparent 75%)";
  const maskC = "radial-gradient(ellipse 30% 25% at 50% 50%, rgba(0,0,0,0.02) 0%, transparent 70%)";

  const fullMask = `${maskA}, ${maskB}, ${maskC}`;

  return (
    <>
      {/* Static dot pattern — Rich Purple with diagonal mask */}
      <div
        className={`absolute pointer-events-none z-0 ${className}`}
        style={{
          top: bleedTop ? `-${bleedTop}px` : 0,
          bottom: `-${bleedBottom}px`,
          left: 0,
          right: 0,
          backgroundImage: "radial-gradient(circle, rgba(120,81,169,0.45) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage: fullMask,
          WebkitMaskComposite: "source-over",
          maskImage: fullMask,
          maskComposite: "add",
        }}
      />

      {/* Animated wave — drifts and shifts from purple to tiffany blue */}
      <div
        className={`absolute pointer-events-none z-0 dot-wave-layer ${className}`}
        style={{
          top: bleedTop ? `-${bleedTop}px` : 0,
          bottom: `-${bleedBottom}px`,
          left: 0,
          right: 0,
          backgroundImage: "radial-gradient(circle, rgba(106,216,210,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <style jsx>{`
        .dot-wave-layer {
          -webkit-mask-image: radial-gradient(ellipse 50% 40% at 50% 50%, black 0%, transparent 70%);
          mask-image: radial-gradient(ellipse 50% 40% at 50% 50%, black 0%, transparent 70%);
          animation: dot-drift 14s ease-in-out infinite;
        }

        @keyframes dot-drift {
          0% {
            -webkit-mask-position: 80% 20%;
            mask-position: 80% 20%;
            opacity: 0.6;
          }
          25% {
            -webkit-mask-position: 25% 40%;
            mask-position: 25% 40%;
            opacity: 0.9;
          }
          50% {
            -webkit-mask-position: 10% 75%;
            mask-position: 10% 75%;
            opacity: 0.5;
          }
          75% {
            -webkit-mask-position: 70% 60%;
            mask-position: 70% 60%;
            opacity: 0.8;
          }
          100% {
            -webkit-mask-position: 80% 20%;
            mask-position: 80% 20%;
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
}
