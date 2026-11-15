import { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Code2, ExternalLink, ChevronRight } from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import MoreCreationsModal from "./MoreCreationsModal";
import ProjectDetailDrawer from "./ProjectDetailDrawer";
import ProjectVisual from "./ProjectVisual";
import { featuredProjects, moreProjects, ACCENT_RGB, ACCENT_CSS } from "../data/projects";

import cyberpunkWolf from "../assets/gifs/cyberpunk_wolf.gif";
import cyberpunkWolfStatic from "../assets/gifs/cyberpunk_wolf-static.png";

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
          className="px-2.5 py-1 text-[10px] font-bold rounded-full border border-[var(--line)] bg-black/40 hover:border-[var(--ink-dim)] transition-colors min-h-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)]"
          style={{ color: ACCENT_CSS[accent] }}
        >
          +{remaining}
        </button>
      )}
    </div>
  );
}

function ButtonRow({ project }) {
  return (
    <div className="flex flex-wrap gap-2.5 mt-auto pt-3">
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-md bg-[var(--signal)] text-white hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(255,46,126,0.35)] transition-all min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)] focus-visible:outline-offset-2"
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
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-md border-2 border-[var(--signal)] text-[var(--signal)] hover:bg-[var(--signal)]/10 hover:-translate-y-0.5 transition-all min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)] focus-visible:outline-offset-2"
        >
          <ExternalLink size={14} />
          Live demo
        </a>
      )}
    </div>
  );
}

function ProofBadge({ text }) {
  return (
    <span className="inline-block text-[10px] font-mono text-[var(--ink-dim)] border border-[var(--line)] px-2.5 py-1 rounded bg-black/40">
      {text}
    </span>
  );
}

function StatusBadge({ text, accent }) {
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase font-mono"
      style={{
        backgroundColor: ACCENT_CSS[accent],
        color: "#0a0a0e",
      }}
    >
      {text}
    </span>
  );
}

function CardFrame({ children, accent = "teal", className = "", onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={`relative overflow-visible bg-[var(--bg-panel)]/60 border-2 rounded-2xl cyber-card-glow cursor-pointer ${className}`}
      style={{ "--glow-color": ACCENT_RGB[accent] }}
      role="article"
    >
      <div className="text-[var(--ink)] h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

const CyberWolf = () => (
  <motion.div
    className="cursor-pointer drop-shadow-[0_0_12px_rgba(2,243,246,0.35)] shrink-0 select-none self-baseline"
    whileHover={{ scale: 1.15, y: -4 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    title="Cyberpunk Wolf"
  >
    <picture>
      <source
        srcSet={cyberpunkWolfStatic}
        media="(prefers-reduced-motion: reduce)"
      />
      <img
        src={cyberpunkWolf}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={443}
        height={394}
        className="h-[52px] sm:h-[64px] lg:h-[74px] w-auto object-contain pointer-events-none block translate-y-[7px] sm:translate-y-[9px]"
        style={{ imageRendering: "pixelated" }}
      />
    </picture>
  </motion.div>
);

export default function Projects() {
  const [showMore, setShowMore] = useState(false);
  const [detailProject, setDetailProject] = useState(null);

  const card1 = featuredProjects[0]; // Rate Limiter
  const card2 = featuredProjects[1]; // VPP
  const card3 = featuredProjects[2]; // Mule Matrix

  const openDetail = (p) => setDetailProject(p);
  const closeDetail = () => setDetailProject(null);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 pt-2 sm:pt-4 pb-28 scroll-mt-20">
      <div className="flex flex-wrap items-baseline gap-3 sm:gap-5 mb-4">
        <div
          className="ml-6"
          style={{
            fontFamily: "Impact, sans-serif",
            "--neon-cyan": "var(--signal)",
            "--neon-magenta": "var(--circuit)",
          }}
        >
          <GlitchHeading text="FEATURED PROJECTS" />
        </div>
        <CyberWolf />
      </div>
      <br />

      {/* Row 1: Cards 1 & 2 side by side as equal-height halves */}
      <div className="grid lg:grid-cols-2 gap-10 mb-10 pt-8 lg:pt-0">
        {/* Card 1: Adaptive Self-Healing Rate Limiter */}
        <CardFrame accent={card1.accent} className="p-7 h-full" onClick={() => openDetail(card1)}>
          <div>
            <div className="flex items-start justify-between mb-2">
              <StatusBadge text={card1.badge} accent={card1.accent} />
            </div>
            <h3 className="text-xl font-bold tracking-tight cyber-title mb-1">
              {card1.title}
            </h3>
            <p className="text-xs text-[var(--ink-dim)] italic mb-3">
              {card1.tagline}
            </p>
            <p className="text-sm text-[var(--ink-dim)] leading-relaxed mb-4 line-clamp-3">
              {card1.overview}
            </p>

            {/* FSM Diagram Component Visual */}
            <div className="mb-5">
              <ProjectVisual visual={card1.visual} />
            </div>

            {/* Top 3 bullets */}
            <ul className="space-y-2 text-sm text-[var(--ink)]/90 mb-5">
              {card1.bullets.slice(0, 3).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[var(--circuit)] shrink-0 mt-0.5">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mb-4">
              <ProofBadge text={card1.proofLine} />
            </div>
          </div>

          <div>
            <TechTags tags={card1.tags} accent={card1.accent} />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--line)]/40">
              <ButtonRow project={card1} />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openDetail(card1);
                }}
                className="text-[11px] font-bold text-[var(--circuit)] hover:underline flex items-center gap-1 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)]"
              >
                View details <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </CardFrame>

        {/* Card 2: VPP Simulation (with video visual) */}
        <CardFrame accent={card2.accent} className="p-7 h-full" onClick={() => openDetail(card2)}>
          <div>
            <div className="flex items-start justify-between mb-2">
              <StatusBadge text={card2.badge} accent={card2.accent} />
            </div>
            <h3 className="text-xl font-bold tracking-tight cyber-title mb-1">
              {card2.title}
            </h3>
            <p className="text-xs text-[var(--ink-dim)] italic mb-3">
              {card2.tagline}
            </p>
            <p className="text-sm text-[var(--ink-dim)] leading-relaxed mb-4 line-clamp-3">
              {card2.overview}
            </p>

            {/* Video Visual */}
            <div className="mb-5">
              <ProjectVisual visual={card2.visual} />
            </div>

            {/* Top 3 bullets */}
            <ul className="space-y-2 text-sm text-[var(--ink)]/90 mb-5">
              {card2.bullets.slice(0, 3).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[var(--signal)] shrink-0 mt-0.5">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mb-4">
              <ProofBadge text={card2.proofLine} />
            </div>
          </div>

          <div>
            <TechTags tags={card2.tags} accent={card2.accent} />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--line)]/40">
              <ButtonRow project={card2} />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openDetail(card2);
                }}
                className="text-[11px] font-bold text-[var(--signal)] hover:underline flex items-center gap-1 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)]"
              >
                View details <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </CardFrame>
      </div>

      {/* Card 3: Mule Matrix — full width below (copy left, visual right on desktop) */}
      <CardFrame accent={card3.accent} className="p-8 mb-10" onClick={() => openDetail(card3)}>
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 items-center">
          {/* Copy (Left) */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <StatusBadge text={card3.badge} accent={card3.accent} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight cyber-title mb-1">
                {card3.title}
              </h3>
              <p className="text-xs text-[var(--ink-dim)] italic mb-3">
                {card3.tagline}
              </p>
              <p className="text-sm text-[var(--ink-dim)] leading-relaxed mb-4 line-clamp-3">
                {card3.overview}
              </p>

              <ul className="space-y-2 text-sm text-[var(--ink)]/90 mb-5">
                {card3.bullets.slice(0, 3).map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--solder)] shrink-0 mt-0.5">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {card3.note && (
                <div className="mb-4 px-3 py-2 bg-[var(--solder)]/10 border border-[var(--solder)]/30 text-xs text-[var(--solder)] rounded">
                  ⚠ {card3.note}
                </div>
              )}

              <div className="mb-4">
                <ProofBadge text={card3.proofLine} />
              </div>
            </div>

            <div>
              <TechTags tags={card3.tags} accent={card3.accent} />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--line)]/40">
                <ButtonRow project={card3} />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDetail(card3);
                  }}
                  className="text-[11px] font-bold text-[var(--solder)] hover:underline flex items-center gap-1 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)]"
                >
                  View details <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Visual (Right) */}
          <div className="w-full">
            <ProjectVisual visual={card3.visual} />
          </div>
        </div>
      </CardFrame>

      {/* Explore more button */}
      <div className="flex justify-center mt-12">
        <button
          type="button"
          onClick={() => setShowMore(true)}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold bg-[var(--solder)] text-black brutal-border hover:bg-[var(--circuit)] transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--solder)] focus-visible:outline-offset-2"
        >
          <FolderOpen size={18} />
          EXPLORE MORE CREATIONS ({moreProjects.length})
        </button>
      </div>

      {/* Modal and Drawer */}
      <MoreCreationsModal
        open={showMore}
        onClose={() => setShowMore(false)}
        onOpenDetail={openDetail}
      />
      <ProjectDetailDrawer
        project={detailProject}
        open={!!detailProject}
        onClose={closeDetail}
      />
    </section>
  );
}
