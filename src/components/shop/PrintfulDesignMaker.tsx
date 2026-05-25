"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, AlertCircle } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */

interface DesignResult {
  /** The Printful product template ID returned by EDM */
  templateId: number;
  /** Product ID from the Printful catalog */
  productId: number;
  /** Preview image URL of the designed product */
  previewUrl?: string;
}

interface PrintfulDesignMakerProps {
  /** Printful catalog product ID to open in the designer */
  productId: number;
  /** Product name for display */
  productName: string;
  /** Called when user saves their design in EDM */
  onDesignSaved: (result: DesignResult) => void;
  /** Called when user closes the designer */
  onClose: () => void;
  /** Whether the modal is visible */
  isOpen: boolean;
}

/* ─── Declare the global PFDesignMaker class ─────────────────── */
declare global {
  interface Window {
    PFDesignMaker?: new (config: {
      elemId: string;
      nonce: string;
      externalProductId: string;
      initProduct?: { productId: number };
    }) => {
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      destroy: () => void;
    };
  }
}

const EASE = [0.16, 1, 0.3, 1] as const;
const SCRIPT_SRC = "https://files.cdn.printful.com/embed/embed.js";

/* ─── Component ──────────────────────────────────────────────── */

export function PrintfulDesignMaker({
  productId,
  productName,
  onDesignSaved,
  onClose,
  isOpen,
}: PrintfulDesignMakerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const designMakerRef = useRef<{ on: (event: string, callback: (...args: unknown[]) => void) => void; destroy: () => void } | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const elemId = `pf-designer-${productId}`;

  // Generate a unique external product ID for this session
  const externalProductId = useRef(`ep-${productId}-${Date.now()}`);

  /* ── Load Printful embed script ── */
  const loadScript = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.PFDesignMaker) {
        resolve();
        return;
      }

      const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Failed to load Printful embed script")));
        return;
      }

      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Printful embed script"));
      document.head.appendChild(script);
    });
  }, []);

  /* ── Initialize EDM when modal opens ── */
  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    async function init() {
      setStatus("loading");
      setErrorMsg("");

      try {
        // 1. Load the Printful embed script
        await loadScript();

        if (cancelled) return;

        // 2. Get nonce from our backend
        const nonceRes = await fetch("/api/printful/nonce", { method: "POST" });
        if (!nonceRes.ok) {
          const err = await nonceRes.json();
          throw new Error(err.error || `Nonce request failed: ${nonceRes.status}`);
        }
        const { nonce } = await nonceRes.json();

        if (cancelled || !window.PFDesignMaker) {
          throw new Error("PFDesignMaker not available after script load");
        }

        // 3. Wait for container to be in DOM
        await new Promise((r) => setTimeout(r, 100));

        // 4. Initialize EDM
        const maker = new window.PFDesignMaker({
          elemId,
          nonce,
          externalProductId: externalProductId.current,
          initProduct: { productId },
        });

        designMakerRef.current = maker;

        // 5. Listen for events
        maker.on("ready", () => {
          if (!cancelled) setStatus("ready");
        });

        maker.on("design-saved", (...args: unknown[]) => {
          // The event data contains the template information
          const eventData = args[0] as { templateId?: number; product_template_id?: number; preview_url?: string } | undefined;
          const templateId = eventData?.templateId || eventData?.product_template_id || 0;
          const previewUrl = eventData?.preview_url;

          onDesignSaved({
            templateId,
            productId,
            previewUrl,
          });
        });

        maker.on("error", (...args: unknown[]) => {
          console.error("EDM error:", args);
          if (!cancelled) {
            setStatus("error");
            setErrorMsg("An error occurred in the design maker");
          }
        });
      } catch (err) {
        if (!cancelled) {
          console.error("EDM init error:", err);
          setStatus("error");
          setErrorMsg(err instanceof Error ? err.message : "Failed to initialize designer");
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      if (designMakerRef.current) {
        try {
          designMakerRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
        designMakerRef.current = null;
      }
    };
  }, [isOpen, productId, elemId, loadScript, onDesignSaved]);

  /* ── Prevent body scroll when modal is open ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[101] flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 shrink-0">
              <div>
                <h2 className="font-display text-lg font-semibold text-gray-900">
                  Design Your Product
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">{productName}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* EDM Container */}
            <div ref={containerRef} className="flex-1 relative overflow-hidden">
              {/* Loading state */}
              {status === "loading" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                  <Loader2 className="w-8 h-8 text-tiffany animate-spin mb-4" />
                  <p className="text-sm text-gray-500 font-medium">Loading Design Maker...</p>
                  <p className="text-xs text-gray-400 mt-1">This may take a few seconds</p>
                </div>
              )}

              {/* Error state */}
              {status === "error" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                  <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-400" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium mb-1">Failed to load designer</p>
                  <p className="text-xs text-gray-400 max-w-sm text-center">{errorMsg}</p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}

              {/* Printful EDM iframe renders here */}
              <div id={elemId} className="w-full h-full" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
