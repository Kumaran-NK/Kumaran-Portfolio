import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate } from "animejs";

/**
 * SignOff — the big stacked headline under the contact form.
 * Each line has its own visual treatment (outlined text / solid chip /
 * outlined text), and anime.js runs a staggered glitch pass across all
 * three every few seconds so the whole block feels alive, not static.
 */
export default function SignOff() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];

    const glitchOne = (el) => {
      animate(el, {
        translateX: [0, -4, 3, -2, 0],
        skewX: [0, -2, 1, 0],
        duration: 220,
        ease: "linear",
      });
    };

    const id = setInterval(() => {
      lines.forEach((el, i) => setTimeout(() => glitchOne(el), i * 130));
    }, 4200);

    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-28 flex flex-col items-start gap-3"
    >
      <h3
        ref={line1Ref}
        className="cyber-title text-4xl sm:text-6xl font-extrabold uppercase tracking-tight"
        style={{
          color: "var(--circuit)",
          textShadow: "3px 0 var(--signal), -3px 0 var(--solder)",
        }}
      >
        SYSTEMS AT SCALE,
      </h3>

      <h3
        ref={line2Ref}
        className="cyber-title text-4xl sm:text-6xl font-extrabold uppercase tracking-tight px-4 py-1 bg-black text-white"
        style={{ boxShadow: "6px 6px 0px 0px var(--signal)" }}
      >
        AI AT THE EDGE,
      </h3>

      <h3
        ref={line3Ref}
        className="cyber-title text-4xl sm:text-6xl font-extrabold uppercase tracking-tight"
        style={{
          color: "var(--solder)",
          textShadow: "3px 0 var(--circuit), -3px 0 var(--signal)",
        }}
      >
        LET'S SHIP SOMETHING.
      </h3>
    </motion.div>
  );
}