import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moonImg from "../assets/moon.jpg";
import skylineImg from "../assets/city-skyline.png";

const INIT_TEXT = "CYBERNET INITIALIZATION";

// Rough positions over the skyline's taller clusters — doesn't need to be
// pixel-perfect, just plausible as "windows/signage lighting up".
const NEON_DOTS = [
  { top: "64%", left: "14%", color: "var(--circuit)" },
  { top: "58%", left: "18%", color: "var(--signal)" },
  { top: "55%", left: "27%", color: "var(--circuit)" },
  { top: "60%", left: "33%", color: "var(--solder)" },
  { top: "52%", left: "41%", color: "var(--signal)" },
  { top: "57%", left: "49%", color: "var(--circuit)" },
  { top: "50%", left: "56%", color: "var(--circuit)" },
  { top: "59%", left: "63%", color: "var(--signal)" },
  { top: "54%", left: "70%", color: "var(--solder)" },
  { top: "61%", left: "78%", color: "var(--circuit)" },
  { top: "56%", left: "85%", color: "var(--signal)" },
  { top: "63%", left: "91%", color: "var(--circuit)" },
];

const RAINDROPS = Array.from({ length: 36 }, (_, i) => ({
  left: (i / 36) * 100 + (i % 3),
  delay: (i % 12) * 0.18,
  duration: 0.7 + (i % 5) * 0.12,
}));

export default function IntroScene({ onDone }) {
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState("");

  // Stage timeline — see the beat each number corresponds to in the comments.
  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),   // moon fades in
      setTimeout(() => setStage(2), 1700),  // skyline rises
      setTimeout(() => setStage(3), 2500),  // neon flicker + rain start
      setTimeout(() => setStage(4), 3300),  // typed init text starts
      setTimeout(() => setStage(5), 5300),  // HUD scan brackets
      setTimeout(() => setStage(6), 6300),  // moon glitch burst
      setTimeout(() => setStage(7), 7100),  // morph into logo
      setTimeout(() => setStage(8), 7900),  // grid fades in
      setTimeout(() => onDone?.(), 8700),   // auto-continue into the site
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  useEffect(() => {
    if (stage < 4) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(INIT_TEXT.slice(0, i));
      if (i >= INIT_TEXT.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [stage]);

  return (
    <motion.div
      exit={{ clipPath: "circle(0% at 50% 50%)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-black overflow-hidden flex items-center justify-center"
    >
      {/* faint grid, fades in as the final beat before handoff */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 8 ? 1 : 0 }}
        transition={{ duration: 0.9 }}
      />

      {/* Moon */}
      <motion.div
        className="absolute w-[64vmin] h-[64vmin] rounded-full overflow-hidden"
        style={{ top: "10%" }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{
          opacity: stage >= 1 && stage < 7 ? 1 : stage >= 7 ? 0 : 0,
          scale: 1,
        }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        <img src={moonImg} alt="" className="w-full h-full object-cover" />
        {stage === 6 && (
          <>
            <span className="moon-glitch-cyan" />
            <span className="moon-glitch-magenta" />
          </>
        )}
      </motion.div>

      {/* Logo, circle-masked in the same spot the moon occupied */}
      <motion.div
        className="absolute w-[64vmin] h-[64vmin] rounded-full flex items-center justify-center"
        style={{ top: "10%", backgroundColor: "var(--bg)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 7 ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      >
        <span
          className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--circuit)]"
          style={{ textShadow: "0 0 16px rgba(47,230,217,0.6)" }}
        >
          KUMARAN.SH
        </span>
      </motion.div>

      {/* Skyline */}
      <motion.img
        src={skylineImg}
        alt=""
        className="absolute bottom-0 left-0 w-full object-cover object-bottom"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 30 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Neon flicker dots over the skyline */}
      {stage >= 3 &&
        NEON_DOTS.map((d, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ top: d.top, left: d.left, backgroundColor: d.color }}
            animate={{ opacity: [0, 1, 0.3, 1, 0] }}
            transition={{
              duration: 1.6 + (i % 3) * 0.4,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}

      {/* Subtle rain */}
      {stage >= 3 && (
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {RAINDROPS.map((r, i) => (
            <motion.span
              key={i}
              className="absolute w-px h-6 bg-white/50"
              style={{ left: `${r.left}%`, top: "-5%" }}
              animate={{ top: ["-5%", "105%"] }}
              transition={{
                duration: r.duration,
                repeat: Infinity,
                delay: r.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* HUD scan corner brackets */}
      {stage >= 5 &&
        [
          "top-6 left-6 border-t-2 border-l-2",
          "top-6 right-6 border-t-2 border-r-2",
          "bottom-6 left-6 border-b-2 border-l-2",
          "bottom-6 right-6 border-b-2 border-r-2",
        ].map((pos, i) => (
          <motion.span
            key={pos}
            className={`absolute w-6 h-6 border-[var(--circuit)] ${pos}`}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}

      {/* Typed init text */}
      {stage >= 4 && (
        <p className="absolute bottom-[16%] left-1/2 -translate-x-1/2 font-mono text-sm sm:text-base tracking-[0.3em] text-[var(--circuit)] whitespace-nowrap">
          {typed}
          {typed.length < INIT_TEXT.length && (
            <span className="animate-pulse">▍</span>
          )}
        </p>
      )}

      <button
        onClick={onDone}
        className="absolute bottom-8 right-8 z-10 text-xs font-mono tracking-widest text-white/60 hover:text-white transition-colors"
      >
        SKIP INTRO →
      </button>
    </motion.div>
  );
}