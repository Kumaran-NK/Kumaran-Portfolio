import { useState, useEffect, useCallback, useRef } from "react";

const STATES = [
  {
    id: "HEALTHY",
    label: "HEALTHY",
    color: "#2fe6d9",
    x: 50,
    y: 18,
  },
  {
    id: "WARNING",
    label: "WARNING",
    color: "#ffc53d",
    x: 82,
    y: 50,
  },
  {
    id: "DEGRADED",
    label: "DEGRADED",
    color: "#ff2e7e",
    x: 50,
    y: 82,
  },
  {
    id: "RECOVERY",
    label: "RECOVERY",
    color: "#9b9aa3",
    x: 18,
    y: 50,
  },
];

const TRANSITIONS = [
  {
    from: 0,
    to: 1,
    name: "HEALTHY → WARNING",
    caption: "P99 > 50ms or error rate > 1%",
  },
  {
    from: 1,
    to: 2,
    name: "WARNING → DEGRADED",
    caption: "circuit breaker OPEN",
  },
  {
    from: 2,
    to: 3,
    name: "DEGRADED → RECOVERY",
    caption: "Redis reachable + stable 30s",
  },
  {
    from: 3,
    to: 0,
    name: "RECOVERY → HEALTHY",
    caption: "Redis reachable + P99 < 20ms for 30s",
  },
];

/**
 * Animated FSM diagram with 4 health-machine states.
 * Cycles HEALTHY > WARNING > DEGRADED > RECOVERY with a one-line trigger caption.
 * Pauses on hover or when off-screen, static under prefers-reduced-motion.
 */
export default function FSMDiagram() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pause animation when off-screen to save CPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || !inView) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STATES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [paused, reducedMotion, inView]);

  const handleMouseEnter = useCallback(() => setPaused(true), []);
  const handleMouseLeave = useCallback(() => setPaused(false), []);

  const activeTransition = TRANSITIONS[activeIdx];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[280px] mx-auto select-none font-mono py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Finite State Machine: 4-state health machine cycling HEALTHY, WARNING, DEGRADED, RECOVERY"
    >
      {/* SVG Canvas for arrows */}
      <div className="relative aspect-square w-full">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            {STATES.map((s) => (
              <marker
                key={s.id}
                id={`arrow-${s.id}`}
                viewBox="0 0 6 6"
                refX="5"
                refY="3"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 6 3 L 0 6 z" fill={s.color} />
              </marker>
            ))}
          </defs>

          {/* Transition lines */}
          {TRANSITIONS.map((t, i) => {
            const from = STATES[t.from];
            const to = STATES[t.to];
            const isActive = i === activeIdx && !reducedMotion;
            const targetColor = STATES[t.to].color;

            // Offset line slightly from node centers
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const uX = dx / len;
            const uY = dy / len;
            const x1 = from.x + uX * 12;
            const y1 = from.y + uY * 12;
            const x2 = to.x - uX * 12;
            const y2 = to.y - uY * 12;

            return (
              <line
                key={`${t.from}-${t.to}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isActive ? targetColor : "#2a2a33"}
                strokeWidth={isActive ? 1.5 : 0.8}
                strokeDasharray={isActive ? "none" : "2 2"}
                markerEnd={isActive ? `url(#arrow-${STATES[t.to].id})` : undefined}
                style={{
                  transition: "stroke 0.4s ease, stroke-width 0.4s ease",
                }}
              />
            );
          })}
        </svg>

        {/* State Node Badges */}
        {STATES.map((s, i) => {
          const isActive = i === activeIdx;
          return (
            <div
              key={s.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
              }}
            >
              <span
                className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold rounded border tracking-wider transition-all duration-300 inline-block shadow-sm"
                style={{
                  color: isActive ? "#0a0a0e" : s.color,
                  backgroundColor: isActive ? s.color : "rgba(10, 10, 14, 0.85)",
                  borderColor: s.color,
                  boxShadow: isActive
                    ? `0 0 12px ${s.color}90`
                    : "0 0 0 transparent",
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Transition Trigger Caption */}
      <div className="mt-2 text-center min-h-[36px] flex flex-col justify-center px-1">
        {reducedMotion ? (
          <span className="text-[10px] text-[var(--ink-dim)]">
            4-state health machine (HEALTHY → WARNING → DEGRADED → RECOVERY)
          </span>
        ) : (
          <div className="space-y-0.5">
            <div className="text-[9px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5">
              <span style={{ color: STATES[activeTransition.to].color }}>
                {activeTransition.name}
              </span>
              {paused && (
                <span className="text-[9px] px-1 py-0.2 bg-white/10 text-[var(--ink-dim)] rounded">
                  PAUSED
                </span>
              )}
            </div>
            <p className="text-[10px] text-[var(--ink-dim)] truncate">
              {activeTransition.caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
