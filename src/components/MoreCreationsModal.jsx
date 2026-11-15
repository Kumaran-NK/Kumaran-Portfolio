import { useEffect, useRef, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, FolderOpen, Code2, ChevronRight } from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import ProjectVisual from "./ProjectVisual";
import { moreProjects, ACCENT_RGB, ACCENT_CSS } from "../data/projects";

const MAX_VISIBLE_TAGS = 6;

function TechTags({ tags, accent = "teal" }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
  const remaining = tags.length - MAX_VISIBLE_TAGS;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((t) => (
        <span
          key={t}
          className="px-2.5 py-1 text-[10px] font-semibold rounded-full border border-[var(--line)] bg-black/40 text-[var(--ink-dim)]"
        >
          {t}
        </span>
      ))}
      {!expanded && remaining > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(true);
          }}
          className="px-2.5 py-1 text-[10px] font-bold rounded-full border border-[var(--line)] bg-black/40 hover:border-[var(--ink-dim)] transition-colors"
          style={{ color: ACCENT_CSS[accent] }}
        >
          +{remaining}
        </button>
      )}
    </div>
  );
}

function ModalCard({ project, onOpenDetail }) {
  const accent = project.accent || "teal";
  const accentCss = ACCENT_CSS[accent];

  // Detect portrait images (phone screenshots etc.) for a side-by-side layout
  const isPortrait =
    project.visual?.type === "image" &&
    project.visual?.width &&
    project.visual?.height &&
    project.visual.height > project.visual.width;

  if (isPortrait) {
    return (
      <div
        className="cyber-card-glow bg-[var(--bg-panel)] p-6 rounded-2xl border-2 cursor-pointer"
        style={{ "--glow-color": ACCENT_RGB[accent] }}
        onClick={() => onOpenDetail(project)}
        role="article"
      >
        {/* Terminal dots + filename */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--signal)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--solder)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--circuit)]" />
          <span className="ml-1 text-[10px] font-mono text-[var(--ink-dim)]">
            {project.filename || `${project.slug}.sh`}
          </span>
        </div>

        {/* Two-column: phone mockup | content */}
        <div className="flex gap-6 items-start">
          {/* Phone mockup column */}
          <div className="shrink-0 w-[140px] sm:w-[160px]">
            <div className="rounded-2xl border-2 border-[var(--line)] bg-black overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.6)]">
              {/* Mini terminal bar */}
              <div className="flex items-center gap-1 px-2 py-1 bg-[var(--bg-panel-2)] border-b border-[var(--line)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--solder)]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--circuit)]" />
              </div>
              <img
                src={project.visual.src}
                alt={project.visual.alt}
                className="w-full h-auto object-contain block"
                loading="lazy"
                style={{ imageRendering: "crisp-edges" }}
              />
            </div>
          </div>

          {/* Content column */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Badge + Title */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded"
                style={{ backgroundColor: accentCss, color: "#0a0a0e" }}
              >
                {project.badge}
              </span>
            </div>
            <h4 className="cyber-title text-lg font-bold tracking-tight mb-1" style={{ color: accentCss }}>
              {project.title}
            </h4>
            <p className="text-[11px] text-[var(--ink-dim)] italic mb-3">
              {project.tagline}
            </p>

            <p className="text-sm text-[var(--ink-dim)] leading-relaxed mb-4 line-clamp-4">
              {project.overview}
            </p>

            {/* Bullets */}
            <ul
              className="space-y-1.5 text-sm text-[var(--ink)]/85 border-l-2 pl-3 mb-4"
              style={{ borderColor: `${accentCss}50` }}
            >
              {project.bullets.slice(0, 3).map((b, i) => (
                <li key={i}>— {b}</li>
              ))}
            </ul>

            {/* Proof line */}
            <div className="mb-4">
              <span className="inline-block text-[10px] font-mono text-[var(--ink-dim)] border border-[var(--line)] px-2 py-0.5 rounded bg-black/30">
                {project.proofLine}
              </span>
            </div>

            {/* Tags + Buttons */}
            <div className="mt-auto space-y-3">
              <TechTags tags={project.tags} accent={accent} />
              <div className="flex flex-wrap items-center gap-2.5">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-md bg-[var(--signal)] text-white hover:brightness-110 hover:-translate-y-0.5 transition-all min-h-[44px]"
                  >
                    <Code2 size={14} />
                    GitHub
                  </a>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetail(project);
                  }}
                  className="text-[11px] font-bold hover:underline flex items-center gap-1 min-h-[44px]"
                  style={{ color: accentCss }}
                >
                  View details <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="cyber-card-glow bg-[var(--bg-panel)] p-6 rounded-2xl border-2 cursor-pointer flex flex-col h-full"
      style={{ "--glow-color": ACCENT_RGB[accent] }}
      onClick={() => onOpenDetail(project)}
      role="article"
    >
      {/* Terminal dots + filename */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--signal)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--solder)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--circuit)]" />
        <span className="ml-1 text-[10px] font-mono text-[var(--ink-dim)]">
          {project.filename || `${project.slug}.sh`}
        </span>
      </div>

      {/* Badge + Title */}
      <div className="flex items-center gap-2 mb-1">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded"
          style={{ backgroundColor: accentCss, color: "#0a0a0e" }}
        >
          {project.badge}
        </span>
      </div>
      <h4 className="cyber-title text-lg font-bold tracking-tight mb-1" style={{ color: accentCss }}>
        {project.title}
      </h4>
      <p className="text-[11px] text-[var(--ink-dim)] italic mb-3">
        {project.tagline}
      </p>

      <p className="text-sm text-[var(--ink-dim)] leading-relaxed mb-4 line-clamp-3">
        {project.overview}
      </p>

      {/* Visual Preview (if present) */}
      {project.visual && (
        <div className="mb-4">
          <ProjectVisual visual={project.visual} />
        </div>
      )}

      {/* Top 3 bullets */}
      <ul className="space-y-1.5 text-sm text-[var(--ink)]/85 border-l-2 pl-3 mb-4"
        style={{ borderColor: `${accentCss}50` }}
      >
        {project.bullets.slice(0, 3).map((b, i) => (
          <li key={i}>— {b}</li>
        ))}
      </ul>

      {/* Proof line */}
      <div className="mb-4">
        <span className="inline-block text-[10px] font-mono text-[var(--ink-dim)] border border-[var(--line)] px-2 py-0.5 rounded bg-black/30">
          {project.proofLine}
        </span>
      </div>

      {/* Note */}
      {project.note && (
        <div className="mb-4 px-3 py-2 bg-[var(--solder)]/10 border border-[var(--solder)]/30 text-[10px] text-[var(--solder)] rounded">
          ⚠ {project.note}
        </div>
      )}

      {/* Tags + Buttons */}
      <div className="mt-auto space-y-3">
        <TechTags tags={project.tags} accent={accent} />

        <div className="flex flex-wrap items-center gap-2.5">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-md bg-[var(--signal)] text-white hover:brightness-110 hover:-translate-y-0.5 transition-all min-h-[44px]"
            >
              <Code2 size={14} />
              GitHub
            </a>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(project);
            }}
            className="text-[11px] font-bold hover:underline flex items-center gap-1 min-h-[44px]"
            style={{ color: accentCss }}
          >
            View details <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MoreCreationsModal({ open, onClose, onOpenDetail }) {
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  // Capture trigger
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

  // Esc to close + focus trap
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

  // Focus modal on open
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  // Restore focus
  useEffect(() => {
    if (!open && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-center px-4 py-10 bg-black/75 backdrop-blur-sm overflow-y-auto no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onClick={onClose}
          aria-hidden="true"
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="More Creations"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-fit bg-[var(--bg)] border border-[var(--line)] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <FolderOpen className="text-[var(--signal)]" size={18} />
                <GlitchHeading
                  text="MORE CREATIONS"
                  size="text-2xl sm:text-3xl"
                  className="cyber-title uppercase tracking-wider"
                />
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--signal)] text-white hover:brightness-110 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <hr className="border-[var(--line)] mb-6" />

            {/* 2-column grid; last card spans full width when odd count */}
            <div className="grid md:grid-cols-2 gap-8">
              {moreProjects.map((project, i) => {
                const isLast = i === moreProjects.length - 1;
                const isOddLast = isLast && moreProjects.length % 2 === 1;
                return (
                  <div
                    key={project.slug}
                    className={isOddLast ? "md:col-span-2" : ""}
                  >
                    <ModalCard project={project} onOpenDetail={onOpenDetail} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
