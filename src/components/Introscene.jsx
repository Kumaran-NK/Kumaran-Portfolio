import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function IntroScene({ onDone = () => {} }) {
  const [decodedWelcome, setDecodedWelcome] = useState("");
  const [subText, setSubText] = useState("");
  const [phase, setPhase] = useState("decode"); // "decode" | "surge" | "zoom"

  const targetText = "WELCOME TO MY PORTFOLIO";
  const subTarget = "> ACCESS GRANTED // INITIALIZING CORE...";
  const glyphs = "01#$@%&*<>[]/\\=XYZ!?:;";

  // 1. Matrix Text Decoding & Subtext Typing Effect
  useEffect(() => {
    let frame = 0;
    const maxFrames = 30; // ~1.5s decode duration

    const decodeInterval = setInterval(() => {
      frame++;
      const progress = frame / maxFrames;
      const solvedLength = Math.floor(progress * targetText.length);

      let currentStr = "";
      for (let i = 0; i < targetText.length; i++) {
        if (targetText[i] === " ") {
          currentStr += " ";
        } else if (i < solvedLength) {
          currentStr += targetText[i];
        } else {
          currentStr += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }

      setDecodedWelcome(currentStr);

      if (frame >= maxFrames) {
        clearInterval(decodeInterval);
        setDecodedWelcome(targetText);
      }
    }, 45);

    // Typing subtext line
    let subIdx = 0;
    const typingInterval = setInterval(() => {
      subIdx++;
      setSubText(subTarget.slice(0, subIdx));
      if (subIdx >= subTarget.length) {
        clearInterval(typingInterval);
      }
    }, 35);

    // Phase Timeline: Decode (~1.4s) -> hold so it's readable -> Surge -> Zoom -> Done
    const toSurgeTimer = setTimeout(() => setPhase("surge"), 4200);
    const toZoomTimer = setTimeout(() => setPhase("zoom"), 5000);
    const finishTimer = setTimeout(() => onDone(), 6700);

    return () => {
      clearInterval(decodeInterval);
      clearInterval(typingInterval);
      clearTimeout(toSurgeTimer);
      clearTimeout(toZoomTimer);
      clearTimeout(finishTimer);
    };
  }, [onDone]);

  // Skip functionality
  const handleSkip = () => {
    setPhase("zoom");
    setTimeout(() => {
      onDone();
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === " ") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div
      className={`hacker-intro-root ${phase === "zoom" ? "phase-zoom" : ""}`}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: phase === "zoom" ? 0 : 1,
        scale: phase === "zoom" ? 1.35 : 1,
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: phase === "zoom" ? 1.6 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={handleSkip}
    >
      {/* Cyber Grid Background */}
      <div className="cyber-grid-bg" />

      {/* Vignette & CRT Scanlines */}
      <div className="hacker-vignette" />
      <div className="hacker-scanlines" />

      {/* Cheap opacity-only flash to sell the "surge into light" moment,
          instead of animating filter:blur() across a scaled layer */}
      {phase === "zoom" && <div className="zoom-flash" />}

      {/* Lightweight Cyberpunk Surge Overlay (replaces the old feTurbulence glitch) */}
      {phase === "surge" && (
        <>
          <div className="surge-beam beam-cyan" />
          <div className="surge-beam beam-magenta" />
          <div className="surge-flicker" />
        </>
      )}

      {/* Main Hackerized Terminal Content */}
      <div className={`hacker-terminal-card ${phase === "surge" ? "surging-card" : ""}`}>
        <div className="terminal-header">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="terminal-title">SYS_INIT // PROTOCOL_V2</span>
        </div>

        <div className="terminal-body">
          <span className="welcome-tag">[ SECURITY_CLEARANCE :: GRANTED ]</span>

          <h1 className={`welcome-heading ${phase === "surge" ? "surge-text" : ""}`} data-text={decodedWelcome}>
            {decodedWelcome}
          </h1>

          <div className="subtext-container">
            <span className="subtext">{subText}</span>
            <span className="cursor">_</span>
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <button className="hacker-skip-btn" onClick={handleSkip} aria-label="Skip Intro">
        <span>SKIP [ESC]</span>
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap');

        .hacker-intro-root {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 99999;
          overflow: hidden;
          background: #030408;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          cursor: pointer;
          transform-origin: center center;
        }

        /* --- BACKGROUND & OVERLAYS --- */
        .cyber-grid-bg {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: 
            linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          transform: perspective(500px) rotateX(60deg);
          animation: grid-scroll 20s linear infinite;
          will-change: transform;
        }

        .hacker-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 30%, rgba(3, 4, 8, 0.9) 100%);
          pointer-events: none;
        }

        .hacker-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.25) 0px,
            rgba(0, 0, 0, 0.25) 1px,
            transparent 1px,
            transparent 3px
          );
          opacity: 0.7;
        }

        /* While zooming out, freeze the background animation and drop the
           backdrop blur — recalculating either while the layer is being
           scaled up is the expensive part, not the scale itself */
        .phase-zoom .cyber-grid-bg {
          animation-play-state: paused;
        }
        .phase-zoom .hacker-terminal-card {
          backdrop-filter: none;
        }

        .zoom-flash {
          position: absolute;
          inset: 0;
          z-index: 30;
          pointer-events: none;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(0, 240, 255, 0.45) 35%,
            transparent 70%
          );
          opacity: 0;
          animation: zoom-flash-pop 1.6s ease-out forwards;
        }

        @keyframes zoom-flash-pop {
          0% { opacity: 0; }
          45% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* --- TERMINAL CARD --- */
        .hacker-terminal-card {
          position: relative;
          z-index: 10;
          width: 90%;
          max-width: 800px;
          background: rgba(10, 14, 26, 0.85);
          border: 1px solid rgba(0, 240, 255, 0.35);
          border-radius: 8px;
          box-shadow: 
            0 0 40px rgba(0, 240, 255, 0.2),
            inset 0 0 20px rgba(0, 240, 255, 0.08);
          backdrop-filter: blur(12px);
          overflow: hidden;
          padding: 0;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .terminal-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          background: rgba(5, 7, 15, 0.9);
          border-bottom: 1px solid rgba(0, 240, 255, 0.2);
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot.red { background: #ff5f56; box-shadow: 0 0 6px rgba(255, 95, 86, 0.8); }
        .dot.yellow { background: #ffbd2e; box-shadow: 0 0 6px rgba(255, 189, 46, 0.8); }
        .dot.green { background: #27c93f; box-shadow: 0 0 6px rgba(39, 201, 63, 0.8); }

        .terminal-title {
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          color: rgba(0, 240, 255, 0.7);
          margin-left: 10px;
          letter-spacing: 1.5px;
        }

        .terminal-body {
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
        }

        .welcome-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          color: #00f0ff;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(0, 240, 255, 0.8);
        }

        .welcome-heading {
          position: relative;
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 42px;
          letter-spacing: 4px;
          color: #ffffff;
          text-shadow: 
            0 0 15px rgba(0, 240, 255, 0.9),
            0 0 30px rgba(176, 38, 255, 0.6);
          margin: 10px 0;
          line-height: 1.2;
        }

        @media (max-width: 640px) {
          .welcome-heading {
            font-size: 26px;
            letter-spacing: 2px;
          }
        }

        .subtext-container {
          font-family: 'Share Tech Mono', monospace;
          font-size: 15px;
          color: rgba(226, 216, 255, 0.85);
          letter-spacing: 1px;
        }

        .cursor {
          color: #00f0ff;
          animation: blink 0.7s step-end infinite;
          margin-left: 2px;
        }

        /* --- CYBERPUNK SURGE (lightweight replacement for the old glitch) --- */

        /* A single neon chromatic-split pass on the heading, transform/opacity only */
        .surge-text {
          animation: surge-flicker-text 1s ease-in-out infinite;
        }

        .surge-text::before,
        .surge-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .surge-text::before {
          color: #00f0ff;
          text-shadow: -1px 0 6px rgba(0, 240, 255, 0.9);
          animation: surge-split-cyan 1s ease-in-out infinite;
        }

        .surge-text::after {
          color: #ff2ecb;
          text-shadow: 1px 0 6px rgba(255, 46, 203, 0.9);
          animation: surge-split-magenta 1s ease-in-out infinite;
        }

        /* Card gets a neon rim-pulse instead of a shake */
        .surging-card {
          border-color: rgba(255, 46, 203, 0.6);
          box-shadow:
            0 0 45px rgba(0, 240, 255, 0.25),
            0 0 25px rgba(255, 46, 203, 0.25),
            inset 0 0 20px rgba(0, 240, 255, 0.1);
          animation: card-pulse 1s ease-in-out infinite;
        }

        /* Two soft neon beams that sweep across, transform-only (GPU friendly) */
        .surge-beam {
          position: absolute;
          left: -20%;
          width: 140%;
          height: 3px;
          pointer-events: none;
          z-index: 12;
          filter: blur(1px);
        }
        .beam-cyan {
          top: 30%;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.85), transparent);
          animation: beam-sweep-down 1.1s ease-in-out infinite;
        }
        .beam-magenta {
          top: 65%;
          background: linear-gradient(90deg, transparent, rgba(255, 46, 203, 0.75), transparent);
          animation: beam-sweep-up 1.3s ease-in-out infinite;
        }

        /* Occasional brightness flicker across the whole scene, opacity-only */
        .surge-flicker {
          position: absolute;
          inset: 0;
          background: rgba(0, 240, 255, 0.05);
          pointer-events: none;
          z-index: 11;
          animation: scene-flicker 1s steps(4) infinite;
        }

        /* --- SKIP BUTTON --- */
        .hacker-skip-btn {
          position: absolute;
          top: 28px;
          right: 36px;
          z-index: 20;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.8);
          background: rgba(10, 14, 26, 0.7);
          border: 1px solid rgba(0, 240, 255, 0.4);
          padding: 8px 16px;
          border-radius: 30px;
          cursor: pointer;
          backdrop-filter: blur(6px);
          transition: all 0.2s ease;
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
        }

        .hacker-skip-btn:hover {
          color: #fff;
          background: rgba(0, 240, 255, 0.25);
          border-color: #00f0ff;
          box-shadow: 0 0 25px rgba(0, 240, 255, 0.5);
          transform: scale(1.04);
        }

        /* --- KEYFRAMES --- */
        @keyframes grid-scroll {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes surge-flicker-text {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          94% { opacity: 0.7; }
          96% { opacity: 1; }
        }

        @keyframes surge-split-cyan {
          0%, 100% { opacity: 0; transform: translateX(0); }
          94% { opacity: 0; transform: translateX(0); }
          96% { opacity: 0.8; transform: translateX(-3px); }
          98% { opacity: 0; transform: translateX(0); }
        }

        @keyframes surge-split-magenta {
          0%, 100% { opacity: 0; transform: translateX(0); }
          94% { opacity: 0; transform: translateX(0); }
          96% { opacity: 0.8; transform: translateX(3px); }
          98% { opacity: 0; transform: translateX(0); }
        }

        @keyframes card-pulse {
          0%, 100% { box-shadow: 0 0 45px rgba(0, 240, 255, 0.25), 0 0 25px rgba(255, 46, 203, 0.25), inset 0 0 20px rgba(0, 240, 255, 0.1); }
          50% { box-shadow: 0 0 60px rgba(0, 240, 255, 0.4), 0 0 40px rgba(255, 46, 203, 0.4), inset 0 0 25px rgba(0, 240, 255, 0.15); }
        }

        @keyframes beam-sweep-down {
          0% { transform: translateY(-140px); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { transform: translateY(140px); opacity: 0; }
        }

        @keyframes beam-sweep-up {
          0% { transform: translateY(120px); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-120px); opacity: 0; }
        }

        @keyframes scene-flicker {
          0%, 100% { opacity: 0; }
          95% { opacity: 0; }
          96% { opacity: 1; }
          97% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}