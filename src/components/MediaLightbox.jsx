import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Cyberpunk modal zoom view matching the Mule Matrix style:
 * Clean, natural-aspect, uncropped visual inside a sleek terminal frame.
 */
export default function MediaLightbox({ open, media, onClose }) {
  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc key listener
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  if (!media) return null;

  const isVideo = media.type === "video";
  const accentColor = isVideo ? "var(--signal)" : "var(--circuit)";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center cursor-zoom-out select-none"
          role="dialog"
          aria-modal="true"
          aria-label={media.alt || media.filename || "Media zoom view"}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl cursor-default flex flex-col rounded-xl overflow-hidden border-2 bg-black shadow-2xl mx-4"
            style={{
              borderColor: accentColor,
              boxShadow: `0 0 45px -10px ${accentColor}`,
            }}
          >
            {/* Top Bar with Terminal Window Styling */}
            <div className="w-full flex items-center justify-between px-4 py-2.5 bg-[var(--bg-panel-2)] border-b border-[var(--line)] font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--signal)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--solder)]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--circuit)]" />
                <span className="ml-2 text-xs text-[var(--ink)] font-bold">
                  {media.filename || "media_preview"}
                </span>
                <span className="text-[10px] text-[var(--ink-dim)] hidden sm:inline">
                  [{isVideo ? "VIDEO" : "IMAGE"}]
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close lightbox"
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded bg-[var(--signal)] text-white hover:brightness-110 transition-all cursor-pointer shadow"
              >
                <X size={14} />
                <span>CLOSE (ESC)</span>
              </button>
            </div>

            {/* Media Body: naturally sized, no forced height */}
            <div className="w-full bg-black/95 flex items-center justify-center p-3 sm:p-5">
              {isVideo ? (
                <video
                  src={media.src}
                  poster={media.poster}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-auto max-h-[75vh] object-contain block mx-auto rounded"
                />
              ) : (
                <img
                  src={media.src}
                  alt={media.alt || "Zoomed view"}
                  className="w-full h-auto max-h-[75vh] object-contain block mx-auto rounded"
                  style={{ imageRendering: "crisp-edges" }}
                />
              )}
            </div>

            {/* Caption bar */}
            {media.alt && (
              <div className="w-full px-4 py-2 bg-[var(--bg-panel-2)] border-t border-[var(--line)] font-mono text-[11px] text-[var(--ink-dim)] flex items-center justify-between">
                <span className="truncate max-w-[80%] text-[var(--ink)]/85">
                  {media.alt}
                </span>
                <span className="text-[10px] text-[var(--ink-dim)] shrink-0">
                  Click outside to close
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
