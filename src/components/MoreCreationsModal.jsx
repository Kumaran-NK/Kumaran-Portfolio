import { AnimatePresence, motion } from "framer-motion";
import { X, FolderOpen, Code2 } from "lucide-react";
import GlitchHeading from "./GlitchHeading";

// Placeholder entries — swap in real projects + GitHub links later.
const PLACEHOLDER_PROJECTS = [
  {
    id: "proj-01",
    title: "PROJECT_01",
    badge: null,
    description:
      "Placeholder slot — swap in a real project summary here once it's ready.",
    bullets: [
      "— Placeholder technical highlight one.",
      "— Placeholder technical highlight two.",
    ],
    tech: ["Tech", "Stack", "Here"],
  },
  {
    id: "proj-02",
    title: "PROJECT_02",
    badge: "NEW",
    description:
      "Another placeholder slot — swap in a real project summary here once it's ready.",
    bullets: [
      "— Placeholder technical highlight one.",
      "— Placeholder technical highlight two.",
    ],
    tech: ["Tech", "Stack", "Here"],
  },
  {
    id: "proj-03",
    title: "PROJECT_03",
    badge: null,
    description:
      "Another placeholder slot — swap in a real project summary here once it's ready.",
    bullets: [
      "— Placeholder technical highlight one.",
      "— Placeholder technical highlight two.",
    ],
    tech: ["Tech", "Stack", "Here"],
  },
];

function WaveBars() {
  const heights = [10, 22, 14, 28, 18, 26, 12, 20, 16, 24, 10];
  return (
    <div className="flex items-end justify-center gap-1.5 h-16">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-1.5 bg-[var(--circuit)] rounded-sm"
          style={{ height: `${h * 2}px` }}
        />
      ))}
    </div>
  );
}

function PlaceholderCard({ project }) {
  return (
    <div className="cyber-card-glow bg-[var(--bg-panel)] p-6 rounded-2xl border-2">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--signal)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--solder)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--circuit)]" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <h4 className="cyber-title text-lg font-bold tracking-tight text-[var(--circuit)]">
          {project.title}
        </h4>
        {project.badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 bg-[var(--circuit)] text-black rounded">
            {project.badge}
          </span>
        )}
      </div>

      <p className="text-sm text-[var(--ink-dim)] leading-relaxed mb-4">
        {project.description}
      </p>

      <ul className="space-y-1.5 text-sm text-[var(--ink)]/85 border-l-2 border-[var(--signal)]/50 pl-3 mb-5">
        {project.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-md bg-[var(--signal)] text-white">
          <Code2 size={14} /> GitHub
        </span>
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 text-[11px] font-semibold rounded-full border border-[var(--line)] bg-black/40 text-[var(--ink-dim)]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="p-4 bg-black/80 border border-[var(--line)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--signal)]" />
          <span className="text-[10px] font-mono tracking-wide text-[var(--ink-dim)]">
            PREVIEW
          </span>
        </div>
        <WaveBars />
        <p className="text-right text-[10px] font-mono text-[var(--circuit)] mt-2">
          demo-link.dev
        </p>
      </div>
    </div>
  );
}

export default function MoreCreationsModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-center px-4 py-10 bg-black/75 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-fit bg-[var(--bg)] border border-[var(--line)] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FolderOpen className="text-[var(--signal)]" size={22} />
                <GlitchHeading
                  text="MORE CREATIONS"
                  className="text-3xl sm:text-4xl cyber-title uppercase tracking-widest"
                />
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--signal)] text-white hover:brightness-110 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <hr className="border-[var(--line)] mb-6" />

            <div className="space-y-12">
              {PLACEHOLDER_PROJECTS.map((project) => (
                <PlaceholderCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}