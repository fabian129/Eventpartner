"use client";

import { useEffect, useState, useCallback } from "react";
import { FabricImage, Rect } from "fabric";
import { useCanvas } from "@/hooks/useCanvas";
import { Upload, RotateCcw, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Product templates ── */
interface PrintArea { left: number; top: number; width: number; height: number }
interface ProductTemplate {
  id: string;
  name: string;
  image: string;
  printArea: PrintArea;
}

const TEMPLATES: ProductTemplate[] = [
  {
    id: "tshirt-white",
    name: "T-Shirt (White)",
    image: "/mockups/tshirt-white.png",
    printArea: { left: 250, top: 160, width: 300, height: 300 },
  },
  {
    id: "tshirt-black",
    name: "T-Shirt (Black)",
    image: "/mockups/tshirt-black.png",
    printArea: { left: 250, top: 160, width: 300, height: 300 },
  },
  {
    id: "mug-white",
    name: "Coffee Mug",
    image: "/mockups/mug-white.png",
    printArea: { left: 220, top: 140, width: 360, height: 240 },
  },
  {
    id: "tote-bag",
    name: "Tote Bag",
    image: "/mockups/tote-bag.png",
    printArea: { left: 230, top: 120, width: 340, height: 340 },
  },
];

const CANVAS_W = 800;
const CANVAS_H = 600;
const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductDesigner({ onExport }: { onExport?: (dataURL: string, productName: string) => void }) {
  const { canvasRef, canvas, exportPNG } = useCanvas({ width: CANVAS_W, height: CANVAS_H });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasLogo, setHasLogo] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const template = TEMPLATES[activeIndex];

  /* ── Load product background when template changes ── */
  useEffect(() => {
    if (!canvas) return;
    canvas.clear();
    canvas.backgroundColor = "#f0f0f0";
    canvas.renderAll();
    setHasLogo(false);

    // Load via HTMLImageElement for reliability
    const imgEl = new window.Image();
    imgEl.crossOrigin = "anonymous";
    imgEl.onload = () => {
      const fabricImg = new FabricImage(imgEl);
      fabricImg.scaleToWidth(CANVAS_W);
      fabricImg.selectable = false;
      fabricImg.evented = false;
      canvas.backgroundImage = fabricImg;
      canvas.renderAll();
    };
    imgEl.onerror = () => {
      console.warn("Failed to load mockup:", template.image);
      canvas.backgroundColor = "#e8e8e8";
      canvas.renderAll();
    };
    imgEl.src = template.image;
  }, [canvas, template]);

  /* ── Add logo to canvas ── */
  const addLogo = useCallback(async (dataURL: string) => {
    if (!canvas) return;

    // Remove existing logos
    canvas.getObjects().forEach((obj) => canvas.remove(obj));

    const logo = await FabricImage.fromURL(dataURL);
    const clip = new Rect({
      ...template.printArea,
      absolutePositioned: true,
    });

    logo.clipPath = clip;
    logo.opacity = 0.9;

    // Scale to fit ~80% of print area
    const scaleFactor = Math.min(
      (template.printArea.width * 0.8) / (logo.width ?? 1),
      (template.printArea.height * 0.8) / (logo.height ?? 1)
    );
    logo.scale(scaleFactor);

    // Center in print area
    logo.set({
      left: template.printArea.left + template.printArea.width / 2,
      top: template.printArea.top + template.printArea.height / 2,
      originX: "center",
      originY: "center",
    });

    canvas.add(logo);
    canvas.setActiveObject(logo);
    canvas.renderAll();
    setHasLogo(true);
  }, [canvas, template]);

  /* ── File handler ── */
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) addLogo(e.target.result as string);
    };
    reader.readAsDataURL(file);
  }, [addLogo]);

  /* ── Drag & Drop ── */
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  /* ── Export ── */
  const handleExport = useCallback(() => {
    const url = exportPNG();
    if (url && onExport) {
      onExport(url, template.name);
    } else if (url) {
      const link = document.createElement("a");
      link.download = `${template.id}-preview.png`;
      link.href = url;
      link.click();
    }
  }, [exportPNG, template, onExport]);

  /* ── Cycle products ── */
  const prev = () => setActiveIndex((i) => (i - 1 + TEMPLATES.length) % TEMPLATES.length);
  const next = () => setActiveIndex((i) => (i + 1) % TEMPLATES.length);

  return (
    <div className="w-full">
      {/* Product selector */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] flex items-center justify-center hover:border-tiffany/30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-[var(--text-secondary)]" />
        </button>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
          {template.name}
        </span>
        <button
          onClick={next}
          className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] flex items-center justify-center hover:border-tiffany/30 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
        </button>
      </div>

      {/* Canvas area */}
      <div
        className={`relative rounded-2xl overflow-hidden border-2 transition-colors duration-200 ${
          dragOver ? "border-tiffany bg-tiffany/5" : "border-[var(--border-default)]"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
        />

        {/* Upload overlay (shown when no logo) */}
        <AnimatePresence>
          {!hasLogo && (
            <motion.label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/20 backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                <Upload className="w-7 h-7 text-white" />
              </div>
              <span className="text-white font-medium text-sm">Drop your logo here</span>
              <span className="text-white/60 text-xs mt-1">or click to browse</span>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg,.webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = "";
                }}
                className="hidden"
              />
            </motion.label>
          )}
        </AnimatePresence>

        {/* Drag overlay */}
        <AnimatePresence>
          {dragOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-tiffany/10 backdrop-blur-sm flex items-center justify-center pointer-events-none"
            >
              <span className="text-tiffany font-medium text-lg">Drop logo</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-4">
        {hasLogo && (
          <>
            <label className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-tiffany/30 transition-colors cursor-pointer text-sm font-medium text-[var(--text-secondary)]">
              <RotateCcw className="w-4 h-4" />
              Change Logo
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg,.webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = "";
                }}
                className="hidden"
              />
            </label>
            <button
              onClick={handleExport}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#111] border border-[#333] text-white hover:bg-[#222] hover:border-[#444] transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Download Preview
            </button>
          </>
        )}
      </div>
    </div>
  );
}
