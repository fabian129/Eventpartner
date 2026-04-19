"use client";

/**
 * BorderBeam — Stripe-style animated light beam along card border.
 *
 * A small bright dot that continuously travels along the border
 * of its parent container. Creates a premium, living feel.
 *
 * Usage: Place inside a relative-positioned container.
 *   <div className="relative overflow-hidden rounded-2xl ...">
 *     <BorderBeam />
 *     {children}
 *   </div>
 */

interface BorderBeamProps {
  duration?: number;   // seconds for full loop
  size?: number;       // beam dot size in px
  color?: string;      // beam color
  delay?: number;      // animation delay in seconds
}

export function BorderBeam({
  duration = 8,
  size = 80,
  color = "#6AD8D2",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      style={{ overflow: "hidden", borderRadius: "inherit" }}
    >
      <div
        className="absolute"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, ${color} 0%, ${color}80 20%, transparent 70%)`,
          borderRadius: "50%",
          animation: `borderBeamTravel ${duration}s linear ${delay}s infinite`,
          opacity: 0.7,
        }}
      />
      <style jsx>{`
        @keyframes borderBeamTravel {
          0% {
            top: -${size / 2}px;
            left: 0%;
          }
          25% {
            top: -${size / 2}px;
            left: calc(100% - ${size / 2}px);
          }
          50% {
            top: calc(100% - ${size / 2}px);
            left: calc(100% - ${size / 2}px);
          }
          75% {
            top: calc(100% - ${size / 2}px);
            left: -${size / 2}px;
          }
          100% {
            top: -${size / 2}px;
            left: -${size / 2}px;
          }
        }
      `}</style>
    </div>
  );
}
