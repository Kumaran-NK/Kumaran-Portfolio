import { motion } from "framer-motion";

const COLORS = {
  amber: "bg-[var(--solder)]",
  cyan: "bg-[var(--circuit)]",
};

export default function StickyNote({
  color = "amber",
  rotate = -3,
  title,
  children,
  className = "",
  width = "w-52",
  delay = 0,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ rotate: 0, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`relative ${width} text-left p-4 brutal-border brutal-shadow-sm cursor-pointer ${COLORS[color]} ${className}`}
    >
      {/* tape */}
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-white/40 border border-black/20 rotate-2" />
      {title && (
        <p className="font-hand text-2xl leading-none mb-2 text-black">{title}</p>
      )}
      <div className="text-[13px] leading-relaxed font-medium text-black/85">{children}</div>
      <span className="absolute bottom-1.5 right-2 text-[10px] opacity-60">
       
      </span>
    </motion.button>
  );
}
