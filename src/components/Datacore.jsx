import { useEffect, useRef } from "react";
import { animate } from "animejs";

const TICK_COUNT = 24;
const CENTER = 100;

function polarToCartesian(r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(a), y: CENTER + r * Math.sin(a) };
}

function wedgePath(r, startAngle, endAngle) {
  const start = polarToCartesian(r, endAngle);
  const end = polarToCartesian(r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

/**
 * DataCore v2 — a heavier cyberpunk reactor node, built from raw SVG,
 * driven entirely by anime.js:
 *
 *  - Tick-mark dial ring (mechanical HUD reticle) instead of a plain dashed circle
 *  - Rotating radar-sweep wedge
 *  - Looping sonar "ping" expanding out from the core
 *  - Two rings counter-rotating at different speeds
 *  - Breathing neon glow on the core
 *  - Random glitch burst every 4-6s (positional stutter + color flash)
 */
export default function DataCore({ size = 140 }) {
  const wrapRef = useRef(null);
  const coreRef = useRef(null);
  const glowRef = useRef(null);
  const dialRef = useRef(null); // tick-mark ring — cyan
  const outerRef = useRef(null); // outer dashed ring — yellow
  const sweepRef = useRef(null); // radar wedge — cyan
  const pingRef = useRef(null); // sonar ping — magenta

  useEffect(() => {
    let spinDial, spinOuter, spinSweep, breathe, ping, glitchTimer;
    let cancelled = false;

    // ---- 1. Core snaps into view ----
    animate(coreRef.current, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 550,
      ease: "outElastic(1, .55)",
    });

    // ---- 2. Rings + dial expand outward, staggered, spring-like ----
    animate([dialRef.current, outerRef.current], {
      scale: [0.25, 1],
      opacity: [0, 1],
      duration: 750,
      delay: (_, i) => 180 + i * 150,
      ease: "outBack",
      onComplete: (a) => {
        // fire once, after the last ring in the group finishes
        if (!cancelled && a.targets[a.targets.length - 1] === outerRef.current) {
          startContinuousMotion();
        }
      },
    });

    function startContinuousMotion() {
      // ---- 3a. Counter-rotating rings, different speeds ----
      spinDial = animate(dialRef.current, {
        rotate: "360deg",
        duration: 18000,
        ease: "linear",
        loop: true,
      });
      spinOuter = animate(outerRef.current, {
        rotate: "-360deg",
        duration: 26000,
        ease: "linear",
        loop: true,
      });

      // ---- 3b. Radar sweep spins fast ----
      spinSweep = animate(sweepRef.current, {
        rotate: "360deg",
        duration: 3200,
        ease: "linear",
        loop: true,
      });

      // ---- 3c. Neon breathing pulse on the core glow ----
      breathe = animate(glowRef.current, {
        scale: [1, 1.3],
        opacity: [0.35, 0.85],
        duration: 1500,
        ease: "inOutSine",
        loop: true,
        alternate: true,
      });

      // ---- 3d. Sonar ping expanding from the core, looping ----
      ping = animate(pingRef.current, {
        scale: [0.3, 1.9],
        opacity: [0.8, 0],
        duration: 2200,
        ease: "outSine",
        loop: true,
      });

      // ---- 4. Random glitch burst every 4-6s ----
      const runGlitch = () => {
        animate(wrapRef.current, { translateX: -5, translateY: 2, duration: 35, ease: "linear" }).then(() =>
          animate(wrapRef.current, { translateX: 4, translateY: -3, duration: 35, ease: "linear" }).then(() =>
            animate(wrapRef.current, { translateX: -2, translateY: 1, duration: 35, ease: "linear" }).then(() =>
              animate(wrapRef.current, { translateX: 0, translateY: 0, duration: 35, ease: "linear" })
            )
          )
        );

        animate(coreRef.current, {
          filter: ["drop-shadow(0 0 8px var(--circuit))", "drop-shadow(0 0 18px var(--signal))"],
          duration: 50,
          ease: "linear",
        }).then(() =>
          animate(coreRef.current, {
            filter: ["drop-shadow(0 0 18px var(--signal))", "drop-shadow(0 0 8px var(--circuit))"],
            duration: 170,
            ease: "linear",
          })
        );

        glitchTimer = setTimeout(runGlitch, 4000 + Math.random() * 2000);
      };
      glitchTimer = setTimeout(runGlitch, 4000 + Math.random() * 2000);
    }

    return () => {
      cancelled = true;
      spinDial?.pause();
      spinOuter?.pause();
      spinSweep?.pause();
      breathe?.pause();
      ping?.pause();
      clearTimeout(glitchTimer);
    };
  }, []);

  const ringStyle = { transformBox: "fill-box", transformOrigin: "center" };

  return (
    <div ref={wrapRef} style={{ width: size, height: size }} className="relative shrink-0">
      <svg viewBox="0 0 200 200" width={size} height={size} className="overflow-visible">
        {/* outer ring — yellow dashed orbit */}
        <circle
          ref={outerRef}
          cx={CENTER} cy={CENTER} r="94"
          fill="none" stroke="var(--solder)" strokeWidth="2"
          strokeDasharray="5 12"
          style={ringStyle}
        />

        {/* tick-mark dial — cyan, mechanical HUD reticle */}
        <g ref={dialRef} style={ringStyle}>
          <circle cx={CENTER} cy={CENTER} r="72" fill="none" stroke="var(--circuit)" strokeWidth="1.5" opacity="0.4" />
          {Array.from({ length: TICK_COUNT }).map((_, i) => {
            const angle = (i / TICK_COUNT) * 360;
            const big = i % 6 === 0;
            const outer = polarToCartesian(72, angle);
            const inner = polarToCartesian(big ? 60 : 66, angle);
            return (
              <line
                key={i}
                x1={outer.x} y1={outer.y}
                x2={inner.x} y2={inner.y}
                stroke="var(--circuit)"
                strokeWidth={big ? 2.5 : 1.2}
                opacity={big ? 0.95 : 0.55}
              />
            );
          })}
        </g>

        {/* radar sweep wedge — spins fast, clipped to the dial radius */}
        <path
          ref={sweepRef}
          d={wedgePath(72, 0, 42)}
          fill="var(--circuit)"
          opacity="0.14"
          style={ringStyle}
        />

        {/* sonar ping — expands and fades on loop */}
        <circle
          ref={pingRef}
          cx={CENTER} cy={CENTER} r="34"
          fill="none" stroke="var(--signal)" strokeWidth="1.5"
          style={ringStyle}
        />

        {/* soft glow behind the core */}
        <circle ref={glowRef} cx={CENTER} cy={CENTER} r="28" fill="var(--circuit)" opacity="0.4" style={{ filter: "blur(8px)" }} />

        {/* central hexagon core */}
        <polygon
          ref={coreRef}
          points="100,64 129,82 129,118 100,136 71,118 71,82"
          fill="#0d0d0d"
          stroke="var(--circuit)"
          strokeWidth="3"
          style={{ ...ringStyle, filter: "drop-shadow(0 0 8px var(--circuit))" }}
        />
        <polygon
          points="100,78 116,88 116,112 100,122 84,112 84,88"
          fill="none"
          stroke="var(--circuit)"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle cx={CENTER} cy={CENTER} r="6" fill="var(--circuit)" />
      </svg>
    </div>
  );
}