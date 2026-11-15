import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Link2, ArrowDown } from "lucide-react";
import StickyNote from "./StickyNote";
import BootTerminal from "./BootTerminal";
import EducationModal from "./Educationmodal";
import kumaranPhoto from "../assets/photos/Kumaran.png";

import CurrentModal from "./CurrentModal";

export default function Hero() {
  const [modal, setModal] = useState(null); // "education" | "current" | null

  return (
    <section
      id="home"
      className="max-w-7xl mx-auto px-6 py-12 lg:py-16 min-h-[calc(100vh-4.5rem)] grid lg:grid-cols-2 gap-12 items-center"
    >
      {/* Left column */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-2 mb-6 text-xs tracking-wide text-[var(--ink-dim)] border border-[var(--line)] rounded-full bg-[var(--bg-panel)]"
        >
          DEBUGGING LIFE ONE STACK TRACE AT A TIME.
        </motion.div>

        {/* Name with solder accent underline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-hand text-6xl sm:text-7xl lg:text-8xl leading-[0.95] mb-2 tracking-tight"
        >
          <span className="inline-block border-b-4 border-[var(--solder)] pb-1">
            KUMARAN N
          </span>
        </motion.h1>

        {/* Subtitle role tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="text-xs font-semibold tracking-[0.2em] text-[var(--circuit)] mb-6"
        >
          BACKEND ENGINEER · SYSTEMS BUILDER
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="border-l-4 border-[var(--solder)] pl-4 text-[15px] leading-relaxed text-[var(--ink-dim)] max-w-md mb-6"
        >
          An Electronics & Communication student who got obsessed with systems
          that don't fall over. I build backend systems, AI-powered
          applications, and distributed software that solve real-world problems.
        </motion.p>

        {/* Buttons row: CTA + Social + Mini terminal inline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            className="flex items-center gap-2 px-5 py-3 text-sm font-bold bg-[var(--solder)] text-black border-2 border-black brutal-shadow-sm hover:bg-[var(--circuit)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <ArrowDown size={16} />
            VIEW PROJECTS
          </a>

          <a
            href="https://github.com/Kumaran-NK"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[var(--circuit)] border-2 border-[var(--circuit)] bg-[var(--bg-panel)] hover:bg-[var(--circuit)]/15 hover:shadow-[0_0_16px_rgba(47,230,217,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <Code2 size={16} />
            GITHUB
          </a>

          <a
            href="https://www.linkedin.com/in/kumaran-n-184b87339"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-[var(--signal)] border-2 border-[var(--signal)] bg-[var(--bg-panel)] hover:bg-[var(--signal)]/15 hover:shadow-[0_0_16px_rgba(255,46,126,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <Link2 size={16} />
            LINKEDIN
          </a>
        </motion.div>

        {/* Compact inline terminal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <BootTerminal />
        </motion.div>
      </div>

      {/* Right column */}
      <div className="flex justify-center items-center pt-16 lg:pt-0 mt-6 lg:mt-0 relative h-full">
        {/* Central wrapper for frame stability */}
        <div className="relative w-52 sm:w-60 lg:w-68 xl:w-72 shrink-0">

          {/*
            Cyan Sticky Note
          */}
          <div className="absolute right-[calc(100%+0.75rem)] sm:right-[calc(100%+1.5rem)] bottom-28 sm:bottom-52 z-30">
            <StickyNote
              color="cyan"
              rotate={-6}
              title="Current"
              width="w-38 sm:w-42"
              delay={0.5}
              onClick={() => setModal("current")}
            >
              3rd year, ECE &apos;28 — actively looking for internships in Software Engineering
            </StickyNote>
          </div>

          {/*
            Amber Sticky Note
          */}
          <div className="absolute left-[calc(100%+1.5rem)] sm:left-[calc(100%+2.75rem)] top-28 sm:top-56 z-30">
            <StickyNote
              color="amber"
              rotate={4}
              title="Education"
              width="w-34 sm:w-38"
              delay={0.65}
              onClick={() => setModal("education")}
            >
              B.Tech ECE &apos;28 · Saveetha Engineering College, Chennai
            </StickyNote>
          </div>

          {/* Photo Frame Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 w-full"
          >
            {/* Solid Pink Backing */}
            <div
              className="absolute inset-0 bg-[var(--signal)] rounded-xl"
              style={{
                transform: "translate(12px, 12px)",
                zIndex: -1,
              }}
            />

            {/* Polaroid Frame */}
            <div className="relative bg-[#262626] p-3 sm:p-4 flex flex-col border border-[#111] rounded-sm shadow-[0_20px_40px_-5px_rgba(0,0,0,0.7)]">
              {/* Image container */}
              <div className="w-full relative overflow-hidden bg-black aspect-[4/5] border border-black/40">
                <img
                  src={kumaranPhoto}
                  alt="Kumaran"
                  className="w-full h-full object-cover block"
                />
              </div>
              
              {/* Polaroid caption */}
              <div className="pt-4 sm:pt-5 pb-1 sm:pb-2 flex justify-center items-center">
                <p className="font-hand text-xl sm:text-2xl text-white/95 leading-none m-0 tracking-wide">
                  kumaran // dev
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Education Modal */}
      <EducationModal
        open={modal === "education"}
        onClose={() => setModal(null)}
      />

      {/* Current Modal */}
      <CurrentModal
        open={modal === "current"}
        onClose={() => setModal(null)}
      />
    </section>
  );
}
