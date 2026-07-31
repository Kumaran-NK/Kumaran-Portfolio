import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import campusPhoto from "../assets/campus.jpg";
import collegeLogo from "../assets/sec-logo.png";

const STATS = [
  { label: "Degree", value: "Bachelor of Engineering (B.E)" },
  { label: "Department", value: "Electronics & Communication Engineering (ECE)" },
  { label: "Batch", value: "2024 - 2028" },
  { label: "CGPA", value: "8.45 / 10" },
];

const DESCRIPTION =
  "An ECE student who somehow drifted into backend engineering — turns out debugging distributed systems scratches the same itch as debugging circuits. I spend my days building things, breaking them on purpose, and writing code that heals itself faster than I do.";

const ADDRESS =
  "Saveetha Nagar, Thandalam, Kancheepuram - Chennai Road, Sriperumbudur Taluk, Chennai, Tamil Nadu, 602105";

export default function EducationModal({ open, onClose }) {
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
          {/* Main Modal Box - Scrollbar hidden via 'hide-scrollbar' class */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-[var(--bg-panel)] brutal-border"
            style={{ boxShadow: "10px 10px 0 var(--solder)" }}
          >
            {/* Scoped style tag guarantees scrollbar is hidden regardless of bundler/PostCSS setup */}
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none !important;
              }
              .hide-scrollbar {
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
              }
            `}</style>

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 p-1.5 border-2 border-black bg-white hover:bg-[var(--signal)] hover:text-black transition-colors"
            >
              <X size={16} />
            </button>

            {/* Wrapper for banner and logo */}
            <div className="relative w-full">
              <div className="w-full aspect-[16/7] overflow-hidden border-b-2 border-black">
                <motion.img
                  src={campusPhoto}
                  alt="Saveetha Engineering College campus"
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
                className="absolute -bottom-10 left-8 z-10 w-20 h-20 rounded-full border-2 border-black bg-white p-1.5"
                style={{ boxShadow: "4px 4px 0 black" }}
              >
                <img
                  src={collegeLogo}
                  alt="Saveetha Engineering College logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </motion.div>
            </div>

            {/* Modal Body */}
            <div className="pt-12 px-8 pb-8">
              <p className="font-hand text-4xl mb-1 text-[var(--ink)]">
                Education
              </p>
              <p className="text-xs text-[var(--ink-dim)] mb-4">
                Saveetha Engineering College, Chennai
              </p>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35 }}
                className="text-sm leading-relaxed text-[var(--ink-dim)] mb-6 border-l-2 border-[var(--solder)] pl-4"
              >
                {DESCRIPTION}
              </motion.p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.45 + i * 0.08 }}
                    className="p-3 border-2 border-black bg-[var(--solder)]/10"
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

              {/* Full-width address tile */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.45 + STATS.length * 0.08 }}
                className="p-3 border-2 border-black bg-[var(--solder)]/10"
              >
                <p className="text-[10px] uppercase tracking-wide text-[var(--ink-dim)] mb-1">
                  Address
                </p>
                <p className="text-sm font-semibold text-[var(--ink)] leading-snug">
                  {ADDRESS}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}