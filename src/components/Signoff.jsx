import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate } from "animejs";

export default function SignOff() {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
    let glitchInterval = null;

    const glitchOne = (el) => {
      animate(el, {
        keyframes: [
          { translateX: -18, skewX: -30, filter: "drop-shadow(-4px 0 0 #ff006e) drop-shadow(4px 0 0 #00f5ff)" },
          { translateX: 14, skewX: 18, filter: "drop-shadow(5px 0 0 #ff006e) drop-shadow(-3px 0 0 #00f5ff)" },
          { translateX: 0, skewX: 0, opacity: 0.2, filter: "none" },
          { translateX: -6, skewX: -8, opacity: 1, filter: "drop-shadow(-3px 0 0 #ff006e) drop-shadow(3px 0 0 #00f5ff)" },
          { translateX: 0, skewX: 0, filter: "none" },
        ],
        duration: 220,
        ease: "steps(1)",
      });
    };

    const triggerGlitch = () => {
      lines.forEach((el, i) => setTimeout(() => glitchOne(el), i * 70));
    };

    const startGlitching = () => {
      if (glitchInterval) return;
      triggerGlitch();
      glitchInterval = setInterval(triggerGlitch, 700);
    };

    const stopGlitching = () => {
      clearInterval(glitchInterval);
      glitchInterval = null;
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) startGlitching();
      else stopGlitching();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      stopGlitching();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-28 flex flex-col items-center justify-center gap-3 text-center"
      style={{ fontFamily: '"Space Grotesk", "Impact", "Arial Black", sans-serif' }}
    >
      {/* Line 1: PUSHING AI — glitch-styled, cyan with magenta+black shadows */}
      <h3
        ref={line1Ref}
        data-text="PUSHING AI"
        className="signoff-glitch text-3xl sm:text-4xl md:text-[46px] uppercase tracking-tight font-extrabold origin-center leading-none"
        style={{
          color: "#00f5ff",
          textShadow: "-2px -2px 0px #00f5ff, 2px 2px 0px #ff006e, 3px 3px 0px rgba(0,0,0,0.8)",
          willChange: "transform, filter, opacity",
        }}
      >
        PUSHING AI
      </h3>

      {/* Line 2: TO THE EDGE, — black pill with magenta box-shadow */}
      <h3
        ref={line2Ref}
        className="text-xl sm:text-2xl md:text-[30px] uppercase tracking-tight font-extrabold px-4 py-1 my-1 bg-black text-white origin-center border-4 border-black rotate-1 inline-block"
        style={{
          boxShadow: "4px 4px 0px 0px #ff006e",
          willChange: "transform, filter, opacity",
        }}
      >
        TO THE EDGE,
      </h3>

      {/* Line 3: CALL ME AN EDGERUNNER. — yellow with blue shadow */}
      <h3
        ref={line3Ref}
        data-text="CALL ME AN EDGERUNNER."
        className="signoff-glitch text-3xl sm:text-4xl md:text-[44px] uppercase tracking-tight font-extrabold origin-center leading-none"
        style={{
          color: "#ffe600",
          textShadow: "-2px -2px 0px #ffe600, 2px 2px 0px #0000ff, 3px 3px 0px rgba(0,0,0,0.8)",
          willChange: "transform, filter, opacity",
        }}
      >
        CALL ME AN EDGERUNNER.
      </h3>

      <style>{`
        .signoff-glitch {
          position: relative;
          animation: signoff-glow 2.4s ease-in-out infinite;
        }
        @keyframes signoff-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.35); }
        }
        /* scan sweep masked to the letter shapes only */
        .signoff-glitch::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          color: transparent;
          background-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255,255,255,0.9) 48%,
            rgba(255,255,255,0.9) 52%,
            transparent 100%
          );
          background-size: 100% 300%;
          background-position: 0 -100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: signoff-scan 3s linear infinite;
          pointer-events: none;
        }
        @keyframes signoff-scan {
          0% { background-position: 0 -100%; }
          100% { background-position: 0 250%; }
        }
      `}</style>
    </motion.div>
  );
}
