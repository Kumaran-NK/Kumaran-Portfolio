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
          { translateX: -18, skewX: -30, filter: "drop-shadow(-4px 0 0 #ff0055) drop-shadow(4px 0 0 #00ffff)" },
          { translateX: 14, skewX: 18, filter: "drop-shadow(5px 0 0 #ff0055) drop-shadow(-3px 0 0 #00ffff)" },
          { translateX: 0, skewX: 0, opacity: 0.2, filter: "none" },
          { translateX: -6, skewX: -8, opacity: 1, filter: "drop-shadow(-3px 0 0 #ff0055) drop-shadow(3px 0 0 #00ffff)" },
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
      if (glitchInterval) return; // already running
      triggerGlitch(); // fire immediately on entry
      glitchInterval = setInterval(triggerGlitch, 700); // repeat while near
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

      const isNear = distance < 120;
      if (isNear) startGlitching();
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
      style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}
    >
      <h3
        ref={line1Ref}
        className="scan-text text-4xl sm:text-6xl uppercase tracking-wider origin-center"
        style={{ color: "#00ffff", textShadow: "4px 4px 0px #ff00ff", willChange: "transform, filter, opacity" }}
      >
        BUILDING ON THE
      </h3>

      <h3
        ref={line2Ref}
        className="text-4xl sm:text-6xl uppercase tracking-wider px-4 py-1 bg-black text-white origin-center"
        style={{ boxShadow: "6px 6px 0px 0px #ff00ff", willChange: "transform, filter, opacity" }}
      >
        BLEEDING EDGE,
      </h3>

      <h3
        ref={line3Ref}
        className="scan-text text-4xl sm:text-6xl uppercase tracking-wider origin-center"
        style={{ color: "#ffff00", textShadow: "4px 4px 0px #0000ff", willChange: "transform, filter, opacity" }}
      >
        OF WEB TECH.
      </h3>

      <style>{`
        .scan-text {
          position: relative;
          animation: signoff-glow 2.4s ease-in-out infinite;
        }
        @keyframes signoff-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.35); }
        }
        /* scan sweep masked to the letter shapes only, via a text-clipped overlay */
        .scan-text::before {
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