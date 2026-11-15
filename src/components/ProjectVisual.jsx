import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ZoomIn, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import FSMDiagram from "./FSMDiagram";

/**
 * Reusable visual renderer for project media.
 * The lightbox is rendered via React Portal directly into document.body,
 * escaping ALL stacking contexts / CSS transforms of parent cards.
 */
export default function ProjectVisual({ visual, className = "" }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [fsmMode, setFsmMode] = useState(visual?.fsm ? "image" : "fsm");

  if (!visual) return null;

  // Pure component mode without image
  if (visual.type === "component" && !visual.src) {
    return (
      <div className={`rounded-lg border border-[var(--line)] bg-black/50 overflow-hidden ${className}`}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-panel-2)] border-b border-[var(--line)] text-[10px] font-mono text-[var(--ink-dim)]">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--solder)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--circuit)] blink-dot" />
          <span className="ml-1 text-[9px] text-[var(--circuit)] font-bold">FSM_ENGINE</span>
          <span className="ml-auto text-[9px] text-[var(--ink-dim)]">health_monitor.lua</span>
        </div>
        <div className="p-3">
          <FSMDiagram />
        </div>
      </div>
    );
  }

  // Rate Limiter dual-mode (Architecture PNG with Live FSM toggle)
  if (visual.fsm) {
    return (
      <>
        <div className={`rounded-lg border border-[var(--line)] bg-black/60 overflow-hidden ${className}`}>
          {/* Header with Mode Toggle */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-panel-2)] border-b border-[var(--line)] text-[10px] font-mono text-[var(--ink-dim)]">
            <span className="w-2 h-2 rounded-full bg-[var(--signal)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--solder)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--circuit)] blink-dot" />
            <span className="ml-1 text-[9px] text-[var(--circuit)] font-bold">RATE_LIMITER</span>
            <div className="ml-auto flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setFsmMode("image"); }}
                className={`px-2 py-0.5 rounded text-[9px] font-bold transition-colors cursor-pointer ${
                  fsmMode === "image"
                    ? "bg-[var(--circuit)] text-black shadow-sm"
                    : "bg-black/40 text-[var(--ink-dim)] hover:text-white"
                }`}
              >
                ARCH_PNG
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setFsmMode("fsm"); }}
                className={`px-2 py-0.5 rounded text-[9px] font-bold transition-colors cursor-pointer ${
                  fsmMode === "fsm"
                    ? "bg-[var(--circuit)] text-black shadow-sm"
                    : "bg-black/40 text-[var(--ink-dim)] hover:text-white"
                }`}
              >
                LIVE_FSM
              </button>
            </div>
          </div>

          {/* Body */}
          {fsmMode === "fsm" ? (
            <div className="p-3 bg-black/50">
              <FSMDiagram />
            </div>
          ) : (
            <div
              className="relative group cursor-zoom-in overflow-hidden"
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
            >
              <img
                src={visual.src}
                alt={visual.alt}
                width={visual.width || 1536}
                height={visual.height || 1024}
                loading="lazy"
                className="w-full h-auto object-contain block max-h-[380px] transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ imageRendering: "crisp-edges" }}
              />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-1 text-[10px] font-mono font-bold bg-black/80 hover:bg-[var(--circuit)] hover:text-black text-white border border-[var(--line)] rounded backdrop-blur-sm transition-all shadow-md cursor-pointer"
                title="Click to zoom image"
              >
                <ZoomIn size={12} />
                <span>ZOOM</span>
              </button>
            </div>
          )}
        </div>

        <MediaPortalLightbox
          open={lightboxOpen}
          media={visual}
          onClose={() => setLightboxOpen(false)}
        />
      </>
    );
  }

  // Video with Zoom
  if (visual.type === "video" && visual.src) {
    return (
      <>
        <VideoVisual
          visual={visual}
          className={className}
          onZoom={() => setLightboxOpen(true)}
        />
        <MediaPortalLightbox
          open={lightboxOpen}
          media={visual}
          onClose={() => setLightboxOpen(false)}
        />
      </>
    );
  }

  // Image with Zoom
  if (visual.type === "image" && visual.src) {
    return (
      <>
        <ImageVisual
          visual={visual}
          className={className}
          onZoom={() => setLightboxOpen(true)}
        />
        <MediaPortalLightbox
          open={lightboxOpen}
          media={visual}
          onClose={() => setLightboxOpen(false)}
        />
      </>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// Portal Lightbox — renders into document.body, escapes all stacking contexts
// ---------------------------------------------------------------------------
function MediaPortalLightbox({ open, media, onClose }) {
  // Lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Esc key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!media) return null;

  const isVideo = media.type === "video";
  const accentColor = isVideo ? "var(--signal)" : "var(--circuit)";

  const lightbox = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out select-none"
          style={{ zIndex: 99999 }}
          role="dialog"
          aria-modal="true"
          aria-label={media.alt || media.filename || "Media zoom view"}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full cursor-default"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-mono font-bold text-[var(--circuit)]">
                {media.filename || media.alt || "preview"}
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 border border-[var(--line)] text-[var(--ink)] hover:border-[var(--circuit)] hover:text-[var(--circuit)] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Media */}
            {isVideo ? (
              <video
                src={media.src}
                poster={media.poster}
                controls
                autoPlay
                playsInline
                className="w-full h-auto border-2 shadow-[0_0_50px_-10px_rgba(47,230,217,0.5)]"
                style={{ borderColor: accentColor }}
              />
            ) : (
              <img
                src={media.src}
                alt={media.alt || "Zoomed view"}
                className="w-full h-auto border-2 shadow-[0_0_50px_-10px_rgba(47,230,217,0.5)]"
                style={{ borderColor: accentColor, imageRendering: "crisp-edges" }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(lightbox, document.body);
}

// ---------------------------------------------------------------------------
// VideoVisual
// ---------------------------------------------------------------------------
function VideoVisual({ visual, className = "", onZoom }) {
  const videoRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) { video.pause(); return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div className={`relative rounded-lg border border-[var(--line)] bg-black/60 overflow-hidden group ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-panel-2)] border-b border-[var(--line)] text-[10px] font-mono text-[var(--ink-dim)]">
        <span className="w-2 h-2 rounded-full bg-[var(--signal)]" />
        <span className="w-2 h-2 rounded-full bg-[var(--solder)]" />
        <span className="w-2 h-2 rounded-full bg-[var(--circuit)]" />
        <span className="ml-1 text-[9px] text-[var(--ink-dim)] truncate">
          {visual.filename || "vpp_simulation.mp4"}
        </span>
      </div>

      <div
        className="relative cursor-zoom-in"
        onClick={(e) => { e.stopPropagation(); onZoom?.(); }}
      >
        <video
          ref={videoRef}
          src={visual.src}
          poster={visual.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={visual.alt}
          className="w-full aspect-video object-cover block"
        />
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onZoom?.(); }}
          className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-1 text-[10px] font-mono font-bold bg-black/80 hover:bg-[var(--signal)] hover:text-white text-white border border-[var(--line)] rounded backdrop-blur-sm transition-all shadow-md cursor-pointer"
          title="Click to zoom video"
        >
          <ZoomIn size={12} />
          <span>ZOOM</span>
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ImageVisual
// ---------------------------------------------------------------------------
function ImageVisual({ visual, className = "", onZoom }) {
  return (
    <div className={`relative rounded-lg border border-[var(--line)] bg-black/60 overflow-hidden group ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-panel-2)] border-b border-[var(--line)] text-[10px] font-mono text-[var(--ink-dim)]">
        <span className="w-2 h-2 rounded-full bg-[var(--signal)]" />
        <span className="w-2 h-2 rounded-full bg-[var(--solder)]" />
        <span className="w-2 h-2 rounded-full bg-[var(--circuit)]" />
        <span className="ml-1 text-[9px] text-[var(--ink-dim)] truncate">
          {visual.filename || "preview.png"}
        </span>
      </div>

      <div
        className="relative cursor-zoom-in overflow-hidden"
        onClick={(e) => { e.stopPropagation(); onZoom?.(); }}
      >
        <img
          src={visual.src}
          alt={visual.alt}
          width={visual.width || 1200}
          height={visual.height || 675}
          loading="lazy"
          className="w-full h-auto object-contain block max-h-[380px] transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ imageRendering: "crisp-edges" }}
        />
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onZoom?.(); }}
          className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-1 text-[10px] font-mono font-bold bg-black/80 hover:bg-[var(--circuit)] hover:text-black text-white border border-[var(--line)] rounded backdrop-blur-sm transition-all shadow-md cursor-pointer"
          title="Click to zoom image"
        >
          <ZoomIn size={12} />
          <span>ZOOM</span>
        </button>
      </div>
    </div>
  );
}
