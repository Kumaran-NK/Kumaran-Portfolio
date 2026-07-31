import { motion } from "framer-motion";
import {
  Activity,
  FileScan,
  BatteryCharging,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import SquiggleArrow from "./SquiggleArrow";
import MoreCreationsModal from "./MoreCreationsModal";
import { useState } from "react";

// How many additional projects exist beyond the three featured below.
// Update this once the rest of the project list is wired up.
const MORE_PROJECTS_COUNT = 5;

function TechPill({ children, dark = true }) {
  return (
    <span
      className={`px-3 py-1 text-[11px] font-semibold rounded-full border ${
        dark
          ? "border-[var(--line)] bg-black/40 text-[var(--ink-dim)]"
          : "border-black/30 bg-black/10 text-black"
      }`}
    >
      {children}
    </span>
  );
}

// edge: "cyan" | "signal" | "black" — same offset-shadow signature used by
// the hero terminal and photo frame, kept static (no hover blur/scanlines).
function CardFrame({ children, className = "", edge = "black" }) {
  const shadowColor =
    edge === "cyan"
      ? "var(--circuit)"
      : edge === "signal"
      ? "var(--signal)"
      : "#000";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`brutal-border cyber-glow-hover ${className}`}
      style={{ boxShadow: `8px 8px 0px 0px ${shadowColor}`, "--cf-edge": shadowColor }}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-center gap-3 mb-4">
        <GlitchHeading text="FEATURED PROJECTS" inverse />
        <SquiggleArrow className="w-14 h-9 hidden sm:block" />
      </div>

      <div className="flex items-center gap-2 mb-12 text-[11px] tracking-wide text-[var(--ink-dim)]">
        <span className="w-2 h-2 rounded-full bg-[var(--circuit)] blink-dot" />
        SYSTEM: ONLINE // SECTION_03.PROJECTS
      </div>

      <div className="grid lg:grid-cols-2 gap-10 mb-10">
        {/* Card 1: dark — Adaptive Self-Healing Rate Limiter */}
        <CardFrame edge="cyan" className="bg-[var(--bg-panel)] p-7">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold tracking-tight cyber-title">
              ADAPTIVE SELF-HEALING RATE LIMITER
            </h3>
            <Activity className="text-[var(--circuit)] shrink-0 ml-3" size={20} />
          </div>
          <p className="text-sm text-[var(--ink-dim)] leading-relaxed mb-5">
            A distributed rate limiter that detects its own degradation and
            recovers without a human paging in — built around a finite-state
            machine instead of a static threshold.
          </p>

          <div className="mb-5 p-4 bg-black/30 border border-[var(--line)] font-mono text-xs text-[var(--ink-dim)]">
            <p className="text-[var(--circuit)] mb-1">
              STATE: HEALTHY → WARNING → DEGRADED → RECOVERY
            </p>
            <p>redis.slidingWindow() // Lua script, sub-ms lookup</p>
            <p>caffeine.tokenBucket() // local fallback on Redis miss</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <TechPill>Spring Boot</TechPill>
            <TechPill>Redis</TechPill>
            <TechPill>Caffeine</TechPill>
            <TechPill>Resilience4j</TechPill>
            <TechPill>Kubernetes</TechPill>
          </div>

          <div className="border-t border-dashed border-[var(--line)] pt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2 text-[var(--ink)]/90">
              <CheckCircle2 size={15} className="text-[var(--circuit)] shrink-0" />
              Self-heals across 4 FSM states, no manual intervention
            </p>
            <p className="flex items-center gap-2 text-[var(--ink)]/90">
              <CheckCircle2 size={15} className="text-[var(--circuit)] shrink-0" />
              Chaos-tested with LitmusChaos on Kubernetes
            </p>
          </div>
        </CardFrame>

        {/* Card 2: yellow highlight — Meridian */}
        <CardFrame edge="black" className="bg-[var(--solder)] text-black p-7">
          <div className="flex items-center gap-2 mb-3">
            <FileScan size={20} />
            <h3 className="text-xl font-bold tracking-tight cyber-title">MERIDIAN</h3>
          </div>
          <p className="text-sm leading-relaxed mb-5">
            Logistics document AI: reads Bills of Lading, invoices, and
            packing lists, extracts the data, then validates it against a
            carrier database automatically.
          </p>

          {/* mock split-screen preview */}
          <div className="mb-5 p-3 bg-black/85 border-2 border-black">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--signal)] blink-dot" />
              <span className="text-[10px] font-bold tracking-wide text-white bg-[var(--signal)] px-1.5 py-0.5">
                LIVE
              </span>
              <span className="text-[10px] font-mono text-[var(--ink-dim)]">
                doc_review.dashboard
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-20 border border-[var(--line)] flex items-center justify-center text-[9px] font-mono text-[var(--ink-dim)]">
                original document
              </div>
              <div className="h-20 border border-[var(--circuit)]/50 flex items-center justify-center text-[9px] font-mono text-[var(--circuit)]">
                extracted data · 96%
              </div>
            </div>
          </div>

          <ul className="text-sm space-y-2 mb-5">
            <li>
              — Handles thousands of concurrent uploads via Java 21 virtual
              threads with near-zero overhead
            </li>
            <li>
              — One-click export to Excel, CSV, or JSON with real-time
              confidence scoring
            </li>
          </ul>

          <div className="flex flex-wrap gap-2 mb-4">
            <TechPill dark={false}>Java 21</TechPill>
            <TechPill dark={false}>Spring AI</TechPill>
            <TechPill dark={false}>PostgreSQL</TechPill>
            <TechPill dark={false}>React</TechPill>
          </div>

          <p className="text-xs font-mono text-black/70 border-t border-black/20 pt-3">
            &gt; Validating against carrier database...
          </p>
        </CardFrame>
      </div>

      {/* Full-width feature card: Virtual Power Plant RL Environment */}
      <CardFrame
        edge="cyan"
        className="bg-[var(--bg-panel-2)] p-8 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start mb-12"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <BatteryCharging className="text-[var(--signal)]" size={22} />
            <h3 className="text-xl font-bold tracking-tight cyber-title">
              VIRTUAL POWER PLANT — RL ENVIRONMENT
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[var(--circuit)] text-black rounded">
              NEW
            </span>
          </div>
          <p className="text-sm text-[var(--ink-dim)] leading-relaxed mb-5">
            A production-grade simulation where an AI agent manages 100 home
            batteries, solar panels, and EV chargers over 48-step episodes —
            built to pass official hackathon validation checks.
          </p>

          <p className="text-xs font-bold tracking-wide text-[var(--signal)] mb-3">
            SIMULATION DESIGN:
          </p>
          <ol className="space-y-3 text-sm text-[var(--ink)]/90 border-l-2 border-[var(--signal)]/40 pl-4">
            <li>
              <span className="font-semibold">1. Weighted Scoring:</span>{" "}
              5 goals — profit, safety, environmental impact, equipment
              wear, grid stability — across 5 difficulty levels up to{" "}
              <code className="bg-black/40 px-1 rounded text-xs">
                emergency-grid-shutdown
              </code>{" "}
              scenarios.
            </li>
            <li>
              <span className="font-semibold">2. Realistic Physics:</span>{" "}
              battery wear over time, peer-to-peer energy trading,
              demand-response auctions, and blackout penalties.
            </li>
            <li>
              <span className="font-semibold">3. Typed API Server:</span>{" "}
              exposed via the standard{" "}
              <code className="bg-black/40 px-1 rounded text-xs">
                reset/step/state
              </code>{" "}
              pattern, containerized and deployed to Hugging Face Spaces.
            </li>
            <li>
              <span className="font-semibold">4. Dual Agents:</span> both
              rule-based and AI-powered agents implemented and benchmarked
              against each other.
            </li>
          </ol>

          <div className="flex flex-wrap gap-2 mt-6">
            <TechPill>Python</TechPill>
            <TechPill>FastAPI</TechPill>
            <TechPill>Pydantic</TechPill>
            <TechPill>Docker</TechPill>
            <TechPill>Hugging Face Spaces</TechPill>
          </div>
        </div>

        {/* mock simulation viewport */}
        <div className="relative border border-[var(--line)] bg-black/40 aspect-square flex flex-col justify-between p-4 font-mono text-[10px]">
          <span className="inline-flex items-center gap-1.5 self-start px-2 py-1 bg-black/60 border border-[var(--line)] text-[var(--circuit)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--circuit)] blink-dot" />
            GRID_SIM
          </span>
          <div className="flex-1 flex items-center justify-center text-[var(--ink-dim)] text-center px-4">
            battery / solar / EV
            <br />
            node graph preview
          </div>
          <div className="flex items-center justify-between text-[var(--ink-dim)]">
            <span>episode 24/48</span>
            <span className="text-[var(--signal)]">AGENT_VIEW</span>
          </div>
        </div>
      </CardFrame>

      {/* Explore more */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setShowMore(true)}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold bg-[var(--solder)] text-black brutal-border brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          <FolderOpen size={18} />
          EXPLORE MORE CREATIONS ({MORE_PROJECTS_COUNT})
        </button>
      </div>

      <MoreCreationsModal open={showMore} onClose={() => setShowMore(false)} />
    </section>
  );
}