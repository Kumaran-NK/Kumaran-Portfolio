import { motion } from "framer-motion";
import { NotebookPen } from "lucide-react";
import GlitchHeading from "./GlitchHeading";

const PILLS = [
  "DISTRIBUTED SYSTEMS",
  "BACKEND ENGINEERING",
  "APPLIED AI",
  "FULL-STACK",
];

const TRAITS = ["Systems Over Syntax", "Architecture Over Hype", "Shipping Over Talking"];

// Pixelated Cyberpunk Owl & Branch Component
const PixelCyberOwl = () => (
  // ADDED: pointer-events-none so the mouse doesn't get stuck on the owl and break the hover state
  <div className="absolute -top-[62px] right-4 md:right-10 z-50 pointer-events-none animate-pulse drop-shadow-[0_0_8px_rgba(47,230,217,0.35)]">
    <svg
      width="96"
      height="64"
      viewBox="0 0 24 16"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
    >
      {/* Branch */}
      <rect x="0" y="14" width="24" height="2" fill="var(--line)" />
      <rect x="18" y="12" width="3" height="2" fill="var(--line)" />
      <rect x="2" y="15" width="4" height="1" fill="var(--circuit)" opacity="0.4" />
      <rect x="20" y="15" width="2" height="1" fill="var(--signal)" opacity="0.5" />

      {/* Owl Body (Circuit Cyan) */}
      <rect x="8" y="6" width="8" height="8" fill="var(--circuit)" />
      {/* Ears */}
      <rect x="8" y="4" width="2" height="2" fill="var(--circuit)" />
      <rect x="14" y="4" width="2" height="2" fill="var(--circuit)" />
      {/* Inner Body (Dark) */}
      <rect x="9" y="10" width="6" height="4" fill="var(--bg-panel)" />
      {/* Eyes (Black with Signal Pink pupil) */}
      <rect x="9" y="7" width="2" height="2" fill="var(--bg)" />
      <rect x="9" y="7" width="1" height="1" fill="var(--signal)" />
      <rect x="13" y="7" width="2" height="2" fill="var(--bg)" />
      <rect x="13" y="7" width="1" height="1" fill="var(--signal)" />
      {/* Beak (Solder Yellow) */}
      <rect x="11" y="9" width="2" height="1" fill="var(--solder)" />
      {/* Tech details/Wings */}
      <rect x="7" y="8" width="1" height="4" fill="var(--circuit)" />
      <rect x="16" y="8" width="1" height="4" fill="var(--circuit)" />
      <rect x="8" y="11" width="1" height="1" fill="var(--signal)" />
      <rect x="15" y="11" width="1" height="1" fill="var(--signal)" />
      {/* Feet */}
      <rect x="9" y="14" width="2" height="1" fill="var(--solder)" />
      <rect x="13" y="14" width="2" height="1" fill="var(--solder)" />
    </svg>
  </div>
);

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-center gap-4 mb-4">
        <div className="ml-6" style={{ fontFamily: 'Impact, sans-serif' }}>
          <GlitchHeading text="ABOUT ME" />
        </div>
        <span className="hidden sm:block flex-1 border-t-2 border-dashed border-[var(--line)]" />
      </div>

      <br></br>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center mt-8">
        
        {/* Wrapper to hold the Owl and the Bio Box together */}
        <div className="relative">
          <PixelCyberOwl />
          
          {/* Bio box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden p-8 bg-[var(--bg-panel)]/60
              border-2 border-[var(--line)]
              transition-all duration-300
              hover:border-[var(--circuit)] 
              hover:shadow-[0_0_30px_-5px_rgba(47,230,217,0.45)]"
          >
            {/* corner ticks only where the glow lives: top-right + bottom-right */}
            <span className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-[var(--circuit)] transition-colors" />
            <span className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-[var(--circuit)] transition-colors" />
            {/* Added left corner ticks to match the all-around glow */}
            <span className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-[var(--circuit)] transition-colors" />
            <span className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-transparent group-hover:border-[var(--circuit)] transition-colors" />

            <p className="text-[15px] sm:text-base leading-relaxed text-[var(--ink)]/90 mb-5">
              I build backend systems, distributed applications, and AI-powered software where architecture matters as much as implementation. My work revolves around designing scalable APIs, integrating intelligent systems, and building software that's meant to survive production—not just a demo.
            </p>
            <p className="text-[15px] sm:text-base leading-relaxed text-[var(--ink)]/90 mb-5">
             I'm an Electronics & Communication student who discovered that I enjoyed designing software systems more than writing isolated programs. That curiosity naturally pulled me toward backend engineering, distributed systems, and applied AI.
            </p>
            <p className="text-[15px] sm:text-base leading-relaxed text-[var(--ink)]/90 mb-8">
              If it involves designing reliable services, building intelligent applications, or solving complex engineering problems through good system design, that's exactly where I want to be.
            </p>

            <div className="flex flex-wrap gap-3">
              {PILLS.map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-1.5 text-xs font-semibold rounded-full border border-[var(--circuit)]/50 bg-black/30 text-[var(--circuit)]"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Personal Bio note */}
        <motion.div
          initial={{ opacity: 0, y: 16, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative bg-[#FFEA00] text-black p-6 brutal-border brutal-shadow flex flex-col"
        >
          <div className="flex items-center justify-between mb-3 text-black">
            <p className="text-sm font-bold uppercase tracking-widest">
              [ Personal_Bio.log ]
            </p>
            <NotebookPen size={18} />
          </div>
          <hr className="border-black mb-4" />

          <p className="font-mono text-[13.5px] italic leading-relaxed mb-5 border-l-2 border-black pl-3 text-black font-medium">
            "I've become fascinated by the invisible parts of software - the architecture, the trade-offs, and the systems that quietly keep everything running. I'm happiest when turning complex ideas into software that's simple to use and hard to break."
          </p>

          <div className="mt-2">
            <p className="text-[10px] tracking-widest uppercase text-black font-bold mb-2">
              // Traits
            </p>
            <ul className="space-y-1.5 font-mono text-[13px] mb-5 text-black font-semibold">
              {TRAITS.map((trait) => (
                <li key={trait} className="flex items-center gap-2">
                  <span className="text-black font-bold">&gt;</span> {trait}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-[10px] font-mono tracking-wide text-black border-t border-black pt-3 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-black blink-dot" />
              SYSTEM.READY
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}