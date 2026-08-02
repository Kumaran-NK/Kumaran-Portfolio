import { motion } from "framer-motion";
import {
  Activity,
  FileScan,
  BatteryCharging,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";
import GlitchHeading from "./GlitchHeading";
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

// CardFrame with a smooth, non-flickering CSS color-cycling glow on all 4 sides
function CardFrame({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-visible bg-[var(--bg-panel)]/60 border-2 rounded-2xl cyber-card-glow ${className}`}
    >
      {/* Wrapper to hold contents */}
      <div className="text-[var(--ink)] h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

// 8-Bit Cyber Panda sitting on a Half-Park-Tyre Swing over Card 2
const PixelCyberPandaTyreSwing = () => (
  <motion.div 
    className="absolute -top-[68px] right-6 md:right-12 z-50 pointer-events-none drop-shadow-[0_0_10px_rgba(0,255,159,0.35)]"
    animate={{ rotate: [-2, 2, -2] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    style={{ transformOrigin: "top center" }}
  >
    <svg
      width="96"
      height="80"
      viewBox="0 0 48 40"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
    >
      {/* Swing Ropes hanging from top */}
      <rect x="14" y="0" width="1" height="20" fill="var(--line)" />
      <rect x="33" y="0" width="1" height="20" fill="var(--line)" />

      {/* Half-Park-Tyre (Suspended structure) */}
      <rect x="10" y="20" width="28" height="10" fill="#1a1a1a" />
      <rect x="13" y="22" width="22" height="6" fill="var(--bg)" />
      <rect x="12" y="20" width="2" height="10" fill="#333" />
      <rect x="34" y="20" width="2" height="10" fill="#333" />
      <rect x="22" y="20" width="4" height="2" fill="var(--circuit)" opacity="0.6" />

      {/* Panda sitting comfortably inside the tyre swing */}
      <rect x="16" y="7" width="4" height="4" fill="#050505" />
      <rect x="28" y="7" width="4" height="4" fill="#050505" />
      
      <rect x="16" y="10" width="16" height="10" fill="var(--ink)" />
      
      <rect x="17" y="12" width="4" height="4" fill="#050505" />
      <rect x="27" y="12" width="4" height="4" fill="#050505" />
      
      <rect x="19" y="13" width="1" height="1" fill="var(--signal)" className="animate-pulse" />
      <rect x="28" y="13" width="1" height="1" fill="var(--signal)" className="animate-pulse" />
      
      <rect x="23" y="15" width="2" height="1" fill="#050505" />
      
      <rect x="15" y="19" width="18" height="6" fill="#050505" />
      <rect x="19" y="20" width="10" height="4" fill="var(--ink)" />
      
      <rect x="25" y="14" width="2" height="10" fill="#00ff9f" />
      <rect x="27" y="16" width="3" height="1" fill="#00ff9f" />
      <rect x="27" y="18" width="2" height="1" fill="#00ff9f" />
    </svg>
  </motion.div>
);

export default function Projects() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="ml-6" 
          style={{ 
            fontFamily: 'Impact, sans-serif',
            '--neon-cyan': 'var(--signal)',       
            '--neon-magenta': 'var(--circuit)'    
          }}
        >
          <GlitchHeading text="FEATURED PROJECTS" />
        </div>
        <span className="hidden sm:block flex-1 border-t-2 border-dashed border-[var(--line)]" />
      </div>
      <br></br>

      <div className="grid lg:grid-cols-2 gap-10 mb-10 pt-8 lg:pt-0">
        
        {/* Card 1: Adaptive Self-Healing Rate Limiter */}
        <CardFrame className="p-7 h-full">
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

          <div className="border-t border-dashed border-[var(--line)] pt-4 space-y-2 text-sm mt-auto">
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

        {/* Card 2: Meridian (With Cyber Panda on Tyre Swing) */}
        <div className="relative h-full pt-6">
          <PixelCyberPandaTyreSwing />
          <CardFrame className="p-7 h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold tracking-tight cyber-title">MERIDIAN</h3>
              <FileScan className="text-[var(--circuit)] shrink-0 ml-3" size={20} />
            </div>
            <p className="text-sm text-[var(--ink-dim)] leading-relaxed mb-5">
              Logistics document AI: reads Bills of Lading, invoices, and
              packing lists, extracts the data, then validates it against a
              carrier database automatically.
            </p>

            <div className="mb-5 p-3 bg-black/30 border border-[var(--line)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--signal)] blink-dot" />
                <span className="text-[10px] font-bold tracking-wide text-black bg-[var(--signal)] px-1.5 py-0.5">
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

            <ul className="text-sm text-[var(--ink)]/90 space-y-2 mb-5">
              <li>
                — Handles thousands of concurrent uploads via Java 21 virtual
                threads with near-zero overhead
              </li>
              <li>
                — One-click export to Excel, CSV, or JSON with real-time
                confidence scoring
              </li>
            </ul>

            <div className="flex flex-wrap gap-2 mb-4 mt-auto">
              <TechPill>Java 21</TechPill>
              <TechPill>Spring AI</TechPill>
              <TechPill>PostgreSQL</TechPill>
              <TechPill>React</TechPill>
            </div>

            <p className="text-xs font-mono text-[var(--ink-dim)] border-t border-[var(--line)] pt-3 mt-4">
              &gt; Validating against carrier database...
            </p>
          </CardFrame>
        </div>
      </div>

      {/* Full-width feature card: Virtual Power Plant RL Environment */}
      <CardFrame className="p-8">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <BatteryCharging className="text-[var(--circuit)]" size={22} />
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

            <p className="text-xs font-bold tracking-wide text-[var(--circuit)] mb-3">
              SIMULATION DESIGN:
            </p>
            <ol className="space-y-3 text-sm text-[var(--ink)]/90 border-l-2 border-[var(--circuit)]/40 pl-4">
              <li>
                <span className="font-semibold">1. Weighted Scoring:</span>{" "}
                5 goals — profit, safety, environmental impact, equipment
                wear, grid stability — across 5 difficulty levels up to{" "}
                <code className="bg-black/40 border border-[var(--line)] px-1 rounded text-xs">
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
                <code className="bg-black/40 border border-[var(--line)] px-1 rounded text-xs">
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
              <span className="text-[var(--circuit)]">AGENT_VIEW</span>
            </div>
          </div>
        </div>
      </CardFrame>

      {/* Explore more */}
      <div className="flex justify-center mt-12">
        <button
          type="button"
          onClick={() => setShowMore(true)}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold bg-[var(--solder)] text-black brutal-border hover:bg-[var(--circuit)] transition-colors"
        >
          <FolderOpen size={18} />
          EXPLORE MORE CREATIONS ({MORE_PROJECTS_COUNT})
        </button>
      </div>

      <MoreCreationsModal open={showMore} onClose={() => setShowMore(false)} />
    </section>
  );
}