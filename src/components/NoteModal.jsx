import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function NoteModal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-none bg-[#FFF8B8] border-2 border-black p-6"
            style={{ boxShadow: "6px 6px 0 black" }}
          >
            {/* masking tape */}
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/35 backdrop-blur-sm border border-black/20 rotate-2" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 p-1.5 border-2 border-black bg-white hover:bg-[var(--signal)] hover:text-black transition-colors"
            >
              <X size={16} />
            </button>
            <p className="text-3xl font-semibold tracking-tight mb-4" style={{ color: "black" }}>
              {title}
            </p>
            <hr className="border-black/20 mb-4" />
            <div className="font-mono text-[13px] leading-5 text-black/80 space-y-3">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}