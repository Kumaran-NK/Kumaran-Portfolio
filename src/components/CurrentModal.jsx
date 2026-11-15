import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import currentPhoto from "../assets/photos/kuma.png"; 
import devIcon from "../assets/profile/dev.png";

const STATS = [
  { label: "Status", value: "Open to Internships" },
  { label: "Target", value: "Summer 2027" },
];

export default function CurrentModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-[var(--bg-panel)] brutal-border"
            style={{ boxShadow: "10px 10px 0 var(--circuit)", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 p-1.5 border-2 border-black bg-white hover:bg-[var(--signal)] hover:text-black transition-colors"
            >
              <X size={16} />
            </button>

            {/* Photo banner + badge wrapper */}
            <div className="relative w-full">
              <div className="w-full aspect-[16/7] overflow-hidden border-b-2 border-black bg-[var(--bg-panel-2)] flex items-center justify-center">
                <motion.img
                  src={currentPhoto}
                  alt="Kumaran at work"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="w-full h-full object-cover"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute -bottom-8 left-7 z-10 w-16 h-16 rounded-full border-2 border-black bg-white p-2"
                style={{ boxShadow: "4px 4px 0 black" }}
              >
                <img
                  src={devIcon}
                  alt="Developer icon"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>

            {/* Padding fix applied here (pt-10) so content doesn't collide with the overlap */}
            <div className="pt-10 px-8 pb-8">
              <p className="font-hand text-4xl mb-2 text-[var(--ink)]">
                Current
              </p>

              {/* Status badge */}
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border-2 border-black bg-[var(--bg-panel)]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#3fb950" }}
                />
                <span
                  className="text-[11px] font-semibold tracking-wide uppercase"
                  style={{ color: "#3fb950" }}
                >
                  Open to Work
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="text-sm leading-relaxed text-[var(--ink-dim)] mb-6 border-l-2 border-[var(--circuit)] pl-4"
              >
                Currently a 3rd-year ECE student open to internship
                opportunities for 2027 — backend engineering, distributed
                systems, and applied AI are where I&apos;d love to
                contribute.
              </motion.p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.35 + i * 0.08 }}
                    className="p-3 border-2 border-black bg-[var(--circuit)]/10"
                  >
                    <p className="text-[10px] uppercase tracking-wide text-[var(--ink-dim)] mb-1">
                      {stat.label}
                    </p>
                    <p className="text-sm font-semibold text-[var(--ink)]">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35 + STATS.length * 0.08 }}
                className="p-3 border-2 border-black bg-[var(--circuit)]/10"
              >
                <p className="text-sm font-semibold text-[var(--ink)] leading-snug">
                  Reach out via GitHub or LinkedIn above — always happy to
                  chat.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}