import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Link2 } from "lucide-react";
import StickyNote from "./StickyNote";
import BootTerminal from "./BootTerminal";
import EducationModal from "./EducationModal";
import kumaPhoto from "../assets/kuma.png";
import meowMan from "../assets/image.png";

import CurrentModal from "./CurrentModal";

export default function Hero() {
  const [modal, setModal] = useState(null); // "education" | "current" | null

  return (
    <section
      id="home"
      className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-16 items-center"
    >
      {/* Left column */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-2 mb-8 text-xs tracking-wide text-[var(--ink-dim)] border border-[var(--line)] rounded-full bg-[var(--bg-panel)]"
        >
          DEBUGGING LIFE ONE STACK TRACE AT A TIME.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-hand text-7xl sm:text-8xl leading-[0.95] mb-8"
        >
          KUMARAN N
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="border-l-4 border-[var(--solder)] pl-4 text-[15px] leading-relaxed text-[var(--ink-dim)] max-w-md mb-8"
        >
          {/* An electronics &amp; communication student who got obsessed with
          systems that don't fall over. I build at the intersection of{" "}
          <span className="bg-[var(--solder)]/20 text-[var(--ink)] px-1">
            distributed systems
          </span>
          , applied AI, and{" "}
          <span className="text-[var(--ink)] underline decoration-[var(--circuit)]">
            logistics tech
          </span>
          . */}

          An Electronics & Communication student who got obsessed with systems that don't fall over.

I build backend systems, AI-powered applications, and distributed software that solve real-world problems.

Currently exploring system design, cloud-native architecture, and the art of making software survive production.
        </motion.p>

        {/* Social Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex gap-4 mb-12"
        >
          <a
            href="https://github.com/Kumaran-NK"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[var(--circuit)] border-2 border-[var(--circuit)] bg-[var(--bg-panel)] brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <Code2 size={16} />
            GITHUB
          </a>

          <a
            href="https://www.linkedin.com/in/kumaran-n-184b87339"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[var(--signal)] border-2 border-[var(--signal)] bg-[var(--bg-panel)] brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <Link2 size={16} />
            LINKEDIN
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <BootTerminal />
        </motion.div>
      </div>

      {/* Right column */}
      <div className="flex justify-center items-center pt-24 lg:pt-0 mt-10 lg:mt-0 relative h-full"> {/* ADD relative for note positioning */}
        {/* Central wrapper for frame stability */}
        <div className="relative w-56 sm:w-64 lg:w-72 xl:w-80 shrink-0">

          {/*
            Cyan Sticky Note
            Pushed even HIGHER by increasing bottom to 32 and sm:bottom to 40
          */}
          <div className="absolute right-[calc(100%+1rem)] sm:right-[calc(100%+2rem)] bottom-32 sm:bottom-60 z-30">
            <StickyNote
              color="cyan"
              rotate={-6}
              title="Current"
              width="w-40 sm:w-44"
              delay={0.5}
              onClick={() => setModal("current")}
            >
              3rd year, ECE &apos;28 — actively looking for internships in Software Engineering
            </StickyNote>
          </div>

          {/*
            Amber Sticky Note
            Pushed even LOWER by increasing top to 32 and sm:top to 40
          */}
          <div className="absolute left-[calc(100%+1rem)] sm:left-[calc(100%+2rem)] top-32 sm:top-65 z-30">
            <StickyNote
              color="amber"
              rotate={4}
              title="Education"
              width="w-36 sm:w-40"
              delay={0.65}
              onClick={() => setModal("education")}
            >
              B.Tech ECE &apos;28 · Saveetha Engineering College, Chennai
            </StickyNote>
          </div>

          {/* Photo Frame Container - The whole stack is slanted neatly together */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }} // COMBINED ROTATION
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 w-full"
          >
            {/* Solid Pink Backing - Sharp and crisp like the reference */}
            <div
              className="absolute inset-0 bg-[var(--signal)] rounded-xl" // Add rounded-xl for curved edges
              style={{
                transform: "translate(12px, 12px)",
                zIndex: -1,
              }}
            />

            {/* Polaroid Frame - Dark outer shadow shade added in className */}
            <div className="relative bg-[#262626] p-3 sm:p-4 flex flex-col border border-[#111] rounded-sm shadow-[0_20px_40px_-5px_rgba(0,0,0,0.7)]">
              {/* Image strict container to completely shield the photo */}
              <div className="w-full relative overflow-hidden bg-black aspect-[4/5] border border-black/40">
                <img
                  src={meowMan}
                  alt="Kumaran"
                  className="w-full h-full object-cover block"
                />
              </div>
              
              {/* Text container separated cleanly from image area */}
              <div className="pt-4 sm:pt-5 pb-1 sm:pb-2 flex justify-center items-center">
                <p className="font-hand text-xl sm:text-2xl text-white/95 leading-none m-0 tracking-wide">
                  Blah Blah Blah
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