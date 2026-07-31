import { motion } from "framer-motion";
import { NotebookPen } from "lucide-react";
import GlitchHeading from "./GlitchHeading";

const PILLS = [
  "DISTRIBUTED SYSTEMS",
  "BACKEND ENGINEERING",
  "APPLIED AI",
  "FULL-STACK",
  "LOGISTICS TECH",
];

const TRAITS = ["Systems Thinker", "Backend-Focused", "Ships Fast"];

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-center gap-4 mb-4">
        <GlitchHeading text="ABOUT ME" />
        <span className="hidden sm:block flex-1 border-t-2 border-dashed border-[var(--line)]" />
      </div>

      <div className="flex items-center gap-2 mb-10 text-[11px] tracking-wide text-[var(--ink-dim)]">
        <span className="w-2 h-2 rounded-full bg-[var(--circuit)] blink-dot" />
        SYSTEM: ONLINE // SECTION_02.ABOUT
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
        {/* Bio box: cyan glow on top / right / bottom only, no left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative overflow-hidden p-8 bg-[var(--bg-panel)]/60
            border-t border-r border-b border-l-2
            border-[var(--line)] border-l-[var(--line)]
            transition-all duration-300
            hover:border-t-[var(--circuit)] hover:border-r-[var(--circuit)] hover:border-b-[var(--circuit)]
            hover:shadow-[0_-10px_24px_-8px_rgba(47,230,217,0.45),10px_0_24px_-8px_rgba(47,230,217,0.45),0_10px_24px_-8px_rgba(47,230,217,0.45)]"
        >
          {/* moving scan beam, clipped inside the box */}
          <span className="scan-beam" />

          {/* corner ticks only where the glow lives: top-right + bottom-right */}
          <span className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-[var(--circuit)] transition-colors" />
          <span className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-[var(--circuit)] transition-colors" />

          <p className="text-[15px] sm:text-base leading-relaxed text-[var(--ink)]/90 mb-5">
            I build and ship things at the intersection of{" "}
            <span className="text-[var(--circuit)]">
              distributed systems
            </span>{" "}
            and{" "}
            <span className="underline decoration-[var(--signal)]">
              applied AI
            </span>{" "}
            — services that stay up, and models that actually do something
            useful once they're deployed.
          </p>
          <p className="text-[15px] sm:text-base leading-relaxed text-[var(--ink)]/90 mb-5">
            I'm an ECE student who drifted into backend engineering. Turns
            out debugging a distributed system scratches the same itch as
            debugging a circuit — same instinct for finding where the
            signal breaks.
          </p>
          <p className="text-[15px] sm:text-base leading-relaxed text-[var(--ink)]/90 mb-8">
            If it involves designing systems that stay reliable under load,
            wiring up AI where it's actually useful, or shipping full-stack
            end to end, that's where I want to be.
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

        {/* Personal Bio note — terminal/data-readout styling instead of handwritten */}
        <motion.div
          initial={{ opacity: 0, y: 16, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative bg-[var(--solder)] text-black p-6 brutal-border brutal-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold uppercase tracking-widest">
              [ Personal_Bio.log ]
            </p>
            <NotebookPen size={18} />
          </div>
          <hr className="border-black/25 mb-4" />

          <p className="font-mono text-[13.5px] italic leading-relaxed mb-5 border-l-2 border-black/40 pl-3">
            "I build backend systems that heal themselves faster than I do —
            and I'd rather ship something real than perfect it forever."
          </p>

          <p className="text-[10px] tracking-widest uppercase text-black/60 mb-2">
            // Traits
          </p>
          <ul className="space-y-1.5 font-mono text-[13px] mb-5">
            {TRAITS.map((trait) => (
              <li key={trait} className="flex items-center gap-2">
                <span className="text-black/50">&gt;</span> {trait}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-[10px] font-mono tracking-wide text-black/60 border-t border-black/20 pt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-black/60 blink-dot" />
            ACCESS_LEVEL: PUBLIC
          </div>
        </motion.div>
      </div>
    </section>
  );
}