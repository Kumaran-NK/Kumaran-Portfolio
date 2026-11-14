import { motion } from "framer-motion";
import GlitchHeading from "./GlitchHeading";
import cyberpunkOwl from "../assets/svgs/cyberpunk_owl.svg";

const PILLS = [
  "DISTRIBUTED SYSTEMS",
  "BACKEND ENGINEERING",
  "APPLIED AI",
  "FULL-STACK",
];

const TRAITS = [
  "Research-Oriented",
  "Builder Mindset",
  "Performance-Focused",
];

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 pt-24 pb-32 scroll-mt-20">
      {/* Heading with Cyber Owl perched on top of "ABOUT ME" */}
      <div className="mb-10">
        <div className="relative inline-block ml-6" style={{ fontFamily: "Impact, sans-serif" }}>
          <motion.div
            whileHover={{ scale: 1.15, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="absolute -top-[50px] sm:-top-[56px] left-1/2 -translate-x-1/2 z-20 cursor-pointer drop-shadow-[0_0_15px_rgba(47,230,217,0.5)]"
            title="Cyber Owl"
          >
            <img
              src={cyberpunkOwl}
              alt="Cyberpunk Owl"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain select-none pointer-events-none"
            />
          </motion.div>
          <GlitchHeading text="ABOUT ME" />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
        {/* Left Card: Main Bio Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 bg-[#121217] rounded-2xl border border-[#2a2a33] text-[var(--ink)] shadow-xl"
        >
            <p className="text-[15px] sm:text-base leading-[1.8] text-[var(--ink)]/90 mb-5">
              I started in electronics &mdash; debugging circuits, reading datasheets, soldering boards. Somewhere along the way I realized the systems I enjoyed designing most weren&apos;t hardware; they were software architectures that had to stay alive under real traffic, recover from failure on their own, and{" "}
              <span className="whitespace-nowrap underline decoration-[var(--signal)] decoration-2 underline-offset-4 font-semibold text-white">
                survive production
              </span>{" "}
              without a 3 AM page.
            </p>

            <p className="text-[15px] sm:text-base leading-[1.8] text-[var(--ink)]/90 mb-8">
              That shift pulled me from breadboards into Spring Boot microservices, Redis-backed rate limiters, and AI pipelines built with LangChain. I&apos;ve shipped a logistics document-AI system that handles thousands of concurrent uploads, a self-healing rate limiter tested with chaos engineering on Kubernetes, and a reinforcement-learning simulation deployed to Hugging Face.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {PILLS.map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-1.5 text-xs font-mono font-semibold rounded-full border border-[var(--circuit)] bg-black text-white tracking-wider"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

        {/* Right Card: Portrait Personal Bio Sticky Note */}
        <div className="flex justify-center lg:justify-start w-full lg:pl-3">
          <motion.div
            initial={{ opacity: 0, y: 16, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="relative w-full max-w-sm sticky-note p-6 z-20 border-4 border-black shadow-[6px_6px_0px_0px_#000000] hover:rotate-0 transition-transform duration-200"
            style={{ backgroundColor: "var(--spider-yellow, #ffe600)" }}
          >
            {/* Scotch tape strip at top */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-14 h-5 bg-white/50 border border-black/10 shadow-sm rotate-[-2deg]" />

            <h3 className="font-handwritten text-headline-md text-black border-b-2 border-black/25 pb-2 mb-4 flex items-center justify-between font-bold">
              <span>Personal Bio</span>
              <span className="material-symbols-outlined text-black font-bold select-none text-[24px]">
                edit_note
              </span>
            </h3>

            <p className="font-code-sm text-code-sm text-black italic mb-4 leading-relaxed font-bold">
              &quot;I&apos;ve made a vow to myself to simplify complex hardware-software interactions and turn theoretical AI models into efficient, real-world edge solutions. I do enjoy quantum mechanics.&quot;
            </p>

            <div className="mt-6">
              <h4 className="font-label-caps text-label-caps text-black uppercase mb-2 font-bold">
                Traits
              </h4>
              <ul className="font-code-sm text-[13px] text-black space-y-1 list-none font-bold">
                {TRAITS.map((trait) => (
                  <li key={trait} className="flex items-center gap-1">
                    <span className="text-spider-magenta font-extrabold">&gt;</span> {trait}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
