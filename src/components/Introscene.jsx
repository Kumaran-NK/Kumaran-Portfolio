import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import intro from "../assets/intro.jpeg";

export default function IntroScene({ onDone = () => {} }) {
  const [line, setLine] = useState("");
  const [phase, setPhase] = useState("boot");
  const [progress, setProgress] = useState(0);

  const fullText = "> initializing_city.exe";

  useEffect(() => {
    // 1. Typing effect for the main line
    let i = 0;
    const typing = setInterval(() => {
      i++;
      setLine(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(typing);
    }, 40);

    // 2. Cyberpunk Progress Bar Calculator (0 to 100 over ~2.8s)
    const startTime = Date.now();
    const duration = 2800; 
    const progInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(p);
      if (p >= 100) clearInterval(progInterval);
    }, 30);

    // 3. Phase Timers
    const toGlitch = setTimeout(() => setPhase("glitching"), 3000);
    const toWelcome = setTimeout(() => setPhase("welcome"), 4200);
    const finish = setTimeout(() => onDone(), 6000);

    return () => {
      clearInterval(typing);
      clearInterval(progInterval);
      clearTimeout(toGlitch);
      clearTimeout(toWelcome);
      clearTimeout(finish);
    };
  }, []);

  // Generate the visual progress bar blocks
  const totalBlocks = 20;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const barString = "█".repeat(filledBlocks) + "░".repeat(totalBlocks - filledBlocks);

  // Dynamic status text based on progress
  let statusText = "SYS_CHK";
  if (progress > 25) statusText = "MEM_ALLOC";
  if (progress > 55) statusText = "DECRYPT_CORE";
  if (progress > 85) statusText = "OVERRIDE_ENGAGED";

  return (
    <motion.div
      className="intro-root"
      onClick={onDone}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="intro-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch">
            <animate attributeName="seed" values="1;30;8;60;2" dur="0.6s" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 0.6  0 0 0 0 1  0 0 0 0.9 0" />
        </filter>
      </svg>

      {(phase === "boot" || phase === "glitching") && (
        <>
          <img src={intro} alt="City skyline under a full moon" className="intro-img" />

          {phase === "glitching" && (
            <>
              <img src={intro} aria-hidden="true" className="tear tear-1" />
              <img src={intro} aria-hidden="true" className="tear tear-2" />
              <img src={intro} aria-hidden="true" className="tear tear-3" />
              <img src={intro} aria-hidden="true" className="rgb-split rgb-red" />
              <img src={intro} aria-hidden="true" className="rgb-split rgb-blue" />
              <div className="noise-overlay" />
              <div className="strobe" />
            </>
          )}

          <div className="intro-vignette" />
          <div className="intro-scanlines" />

          {phase === "boot" && (
            <div className="intro-hud">
              <span className="intro-line">{line}</span>
              
              {/* Only show progress bar after typing has started a bit */}
              {line.length > 5 && (
                <div className="progress-container">
                  <span className="progress-bar">[{barString}]</span>
                  <span className="progress-text">
                    {progress.toString().padStart(3, "0")}% // {statusText}
                  </span>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {phase === "welcome" && (
        <div className="welcome-screen">
          <span className="welcome-text">welcome</span>
        </div>
      )}

      {phase !== "welcome" && <span className="intro-skip">click to skip</span>}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

        .intro-root {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          overflow: hidden;
          background: #000;
          cursor: pointer;
        }

        .intro-img, .tear, .rgb-split {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .intro-img {
          animation: intro-fade-in 1.5s ease-out forwards;
          filter: saturate(1.1) contrast(1.05);
        }

        .tear { mix-blend-mode: normal; }
        .tear-1 { clip-path: inset(12% 0 78% 0); animation: tear-jump-1 0.5s steps(1) infinite; }
        .tear-2 { clip-path: inset(48% 0 30% 0); animation: tear-jump-2 0.4s steps(1) infinite; }
        .tear-3 { clip-path: inset(72% 0 8% 0); animation: tear-jump-3 0.35s steps(1) infinite; }

        .rgb-split { mix-blend-mode: screen; opacity: 0.75; }
        .rgb-red { filter: sepia(1) saturate(8) hue-rotate(-50deg); animation: rgb-shift-red 0.3s steps(1) infinite; }
        .rgb-blue { filter: sepia(1) saturate(8) hue-rotate(150deg); animation: rgb-shift-blue 0.3s steps(1) infinite; }

        .noise-overlay {
          position: absolute;
          inset: 0;
          background: #808080;
          filter: url(#intro-noise);
          mix-blend-mode: overlay;
          opacity: 0.5;
          pointer-events: none;
        }

        .strobe {
          position: absolute;
          inset: 0;
          background: #fff;
          pointer-events: none;
          animation: strobe-flash 0.5s steps(1) infinite;
        }

        .intro-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%);
          pointer-events: none;
        }

        .intro-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,0.18) 0px,
            rgba(0,0,0,0.18) 1px,
            transparent 1px,
            transparent 3px
          );
          opacity: 0.5;
        }

        /* --- HUD TYPOGRAPHY & LAYOUT --- */
        .intro-hud {
          position: absolute;
          bottom: 48px;
          left: 48px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-family: 'Courier New', monospace;
          color: #d9c8ff;
          text-shadow: 0 0 8px rgba(190, 120, 255, 0.8);
        }

        .intro-line {
          font-size: 18px;
          letter-spacing: 0.5px;
        }
        
        /* The typing cursor */
        .intro-line::after {
          content: "_";
          animation: intro-cursor 0.8s step-end infinite;
        }
        
        .progress-container {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }
        
        .progress-bar {
          color: #00f0ff; /* Bright Cyan */
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.8);
          letter-spacing: 1px;
        }
        
        .progress-text {
          color: rgba(217, 200, 255, 0.8);
        }

        .intro-skip {
          position: absolute;
          top: 24px;
          right: 32px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: rgba(217, 200, 255, 0.5);
          z-index: 2;
        }

        .welcome-screen {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }

        .welcome-text {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 56px;
          letter-spacing: 4px;
          color: #e8d9ff;
          text-transform: uppercase;
          text-shadow:
            0 0 12px rgba(190, 120, 255, 0.9),
            -2px 0 rgba(255, 0, 150, 0.6),
            2px 0 rgba(0, 220, 255, 0.6);
          animation: welcome-fade 1.8s ease forwards;
        }

        /* --- KEYFRAMES --- */
        @keyframes intro-fade-in {
          0%   { opacity: 0; filter: saturate(1.1) contrast(1.05) blur(6px); }
          100% { opacity: 1; filter: saturate(1.1) contrast(1.05) blur(0px); }
        }
        @keyframes tear-jump-1 {
          0%   { transform: translateX(0); }
          25%  { transform: translateX(-3%); }
          50%  { transform: translateX(4%); }
          75%  { transform: translateX(-2%); }
          100% { transform: translateX(0); }
        }
        @keyframes tear-jump-2 {
          0%   { transform: translateX(0); }
          30%  { transform: translateX(5%); }
          60%  { transform: translateX(-4%); }
          100% { transform: translateX(0); }
        }
        @keyframes tear-jump-3 {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-6%); }
          55%  { transform: translateX(3%); }
          85%  { transform: translateX(-2%); }
          100% { transform: translateX(0); }
        }
        @keyframes rgb-shift-red {
          0%   { transform: translate(0, 0); opacity: 0; }
          20%  { transform: translate(-8px, 2px); opacity: 0.8; }
          40%  { transform: translate(5px, -1px); opacity: 0.5; }
          60%  { transform: translate(-3px, 0); opacity: 0.8; }
          100% { transform: translate(0, 0); opacity: 0; }
        }
        @keyframes rgb-shift-blue {
          0%   { transform: translate(0, 0); opacity: 0; }
          20%  { transform: translate(8px, -2px); opacity: 0.8; }
          40%  { transform: translate(-5px, 1px); opacity: 0.5; }
          60%  { transform: translate(3px, 0); opacity: 0.8; }
          100% { transform: translate(0, 0); opacity: 0; }
        }
        @keyframes strobe-flash {
          0%, 88%, 100% { opacity: 0; }
          90% { opacity: 0.15; }
          94% { opacity: 0; }
          96% { opacity: 0.25; }
        }
        @keyframes intro-cursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes welcome-fade {
          0%   { opacity: 0; letter-spacing: 12px; }
          25%  { opacity: 1; letter-spacing: 4px; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}