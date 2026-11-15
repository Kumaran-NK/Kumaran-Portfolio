import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Code2 } from "lucide-react";
import { ACCENT_CSS } from "../data/projects";
import ProjectVisual from "./ProjectVisual";

/**
 * Centered detail modal for project deep-dive.
 * Styled with terminal-window chrome, focus trap, Esc close, body scroll lock.
 * Rendered via React Portal into document.body for clean stacking.
 * Sections in order: Overview > The problem > What I built > Architecture >
 * Key decisions > Proof > Tech stack > Links.
 */
export default function ProjectDetailDrawer({ project, open, onClose }) {
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  // Capture the element that opened the modal
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc to close & focus trap
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  // Focus the modal on open
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  // Restore focus on close
  useEffect(() => {
    if (!open && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [open]);

  if (!project) return null;

  const accent = ACCENT_CSS[project.accent] || "var(--circuit)";

  const content = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md cursor-pointer select-none"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — project details`}
        >
          {/* Centered Modal Card */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl lg:max-w-4xl max-h-[88vh] flex flex-col rounded-xl overflow-hidden bg-[var(--bg)] border-2 cursor-default select-text shadow-2xl"
            style={{
              borderColor: accent,
              boxShadow: `0 0 45px -10px ${accent}50, 0 20px 40px rgba(0,0,0,0.9)`,
            }}
          >
            {/* Terminal chrome header */}
            <div className="sticky top-0 z-10 flex items-center gap-2 px-5 py-3 border-b-2 border-black bg-[var(--bg-panel-2)] shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--signal)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--solder)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--circuit)]" />
              <span className="ml-2 text-[11px] font-mono text-[var(--ink-dim)] flex-1 truncate">
                {project.filename || `${project.slug}.sh`}
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--signal)] text-white hover:brightness-110 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)] cursor-pointer shadow"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Content body */}
            <div
              className="p-6 sm:p-8 space-y-7 font-mono text-sm overflow-y-auto no-scrollbar min-h-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Badge + Title + Tagline */}
              <div>
                <span
                  className="inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-2 tracking-wide font-mono uppercase"
                  style={{ backgroundColor: accent, color: "#0a0a0e" }}
                >
                  {project.badge}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight cyber-title mt-1">
                  {project.title}
                </h2>
                <p className="text-xs text-[var(--ink-dim)] mt-1.5 italic">
                  {project.tagline}
                </p>
              </div>

              {/* Visual (component, video, or image if exists) */}
              {project.visual && (
                <div className="mb-4">
                  <ProjectVisual visual={project.visual} />
                </div>
              )}

              {/* 1. Overview */}
              <Section title="Overview">
                <p className="text-[var(--ink)]/90 leading-relaxed text-xs sm:text-sm">
                  {project.overview}
                </p>
              </Section>

              {/* 2. The problem */}
              {project.problem && (
                <Section title="The problem">
                  <p className="text-[var(--ink)]/90 leading-relaxed text-xs sm:text-sm">
                    {project.problem}
                  </p>
                </Section>
              )}

              {/* 3. What I built */}
              <Section title="What I built">
                <ul className="space-y-2 text-[var(--ink)]/90 text-xs sm:text-sm">
                  {project.built.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[var(--circuit)] shrink-0 mt-0.5 font-bold">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* 4. Architecture */}
              {project.architecture && (
                <Section title="Architecture">
                  <p className="px-3 py-2.5 bg-black/50 border border-[var(--line)] text-[var(--ink-dim)] text-xs rounded leading-relaxed">
                    {project.architecture}
                  </p>
                </Section>
              )}

              {/* 5. Key decisions */}
              {project.decisions && project.decisions.length > 0 && (
                <Section title="Key decisions">
                  <div className="space-y-3">
                    {project.decisions.map((d, i) => (
                      <div
                        key={i}
                        className="pl-3.5 border-l-2 text-xs"
                        style={{ borderColor: accent }}
                      >
                        <p className="font-bold text-[var(--ink)] mb-0.5">
                          {d.title}
                        </p>
                        <p className="text-[var(--ink-dim)] leading-relaxed">
                          {d.why}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* 6. Proof */}
              {project.proof && project.proof.length > 0 && (
                <Section title="Proof">
                  <ul className="space-y-1.5 text-xs text-[var(--ink-dim)]">
                    {project.proof.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[var(--circuit)] shrink-0 font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Note (if any) */}
              {project.note && (
                <div className="px-3.5 py-2.5 bg-[var(--solder)]/10 border border-[var(--solder)]/30 text-xs text-[var(--solder)] rounded">
                  ⚠ {project.note}
                </div>
              )}

              {/* 7. Tech stack */}
              <Section title="Tech stack">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] font-semibold rounded-full border border-[var(--line)] bg-black/40 text-[var(--ink-dim)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Section>

              {/* 8. Links */}
              <div className="flex flex-wrap gap-3 pt-3 border-t border-[var(--line)]/50">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-md bg-[var(--signal)] text-white hover:brightness-110 hover:-translate-y-0.5 transition-all min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)]"
                  >
                    <Code2 size={14} />
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-md border-2 border-[var(--signal)] text-[var(--signal)] hover:bg-[var(--signal)]/10 hover:-translate-y-0.5 transition-all min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)]"
                  >
                    <ExternalLink size={14} />
                    Live demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-[10px] font-bold tracking-widest text-[var(--circuit)] uppercase mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}
