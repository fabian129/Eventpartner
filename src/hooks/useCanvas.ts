"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas } from "fabric";

interface UseCanvasOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export function useCanvas(options?: UseCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [ready, setReady] = useState(false);

  // Detect when canvas DOM element is available via ref callback
  const setCanvasElement = useCallback((el: HTMLCanvasElement | null) => {
    (canvasRef as any).current = el;
    setReady(!!el);
  }, []);

  useEffect(() => {
    if (!ready || !canvasRef.current) return;

    // Dispose previous instance if it exists
    if (fabricRef.current) {
      try { fabricRef.current.dispose(); } catch {}
      fabricRef.current = null;
    }

    const c = new Canvas(canvasRef.current, {
      backgroundColor: options?.backgroundColor ?? "transparent",
    });
    c.setDimensions({
      width: options?.width ?? 800,
      height: options?.height ?? 600,
    });

    fabricRef.current = c;
    setCanvas(c);

    return () => {
      try { c.dispose(); } catch {}
      fabricRef.current = null;
      setCanvas(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const exportPNG = useCallback(() => {
    if (!canvas) return "";
    return canvas.toDataURL({ format: "png", quality: 1 });
  }, [canvas]);

  const exportJSON = useCallback(() => {
    if (!canvas) return null;
    return canvas.toJSON();
  }, [canvas]);

  return { canvasRef: setCanvasElement, canvas, exportPNG, exportJSON };
}
