import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate } from "animejs";
import { ChevronRight, Image as ImageIcon, FileCheck2, X, ZoomIn, Building2 } from "lucide-react";
import GlitchHeading from "./GlitchHeading";
import DataCore from "./DataCore";

// swap these for your real files — see the note at the bottom of this file
import campusPhoto from "../assets/iiit-campus.jpg";
import certificatePhoto from "../assets/iiit-certificate.jpg";

/* ------------------------------------------------------------------ */
/* DATA — numbers pulled straight from your internship certificate    */
/* ------------------------------------------------------------------ */

const EXPERIENCES = [
  {
    id: "iiit",
    role: "MACHINE LEARNING INTERN",
    roleShort: "ML Intern",
    org: "Indian Institute of Information Technology, Tiruchirappalli",
    date: "JUN — AUG 2025",
    badge: null,
    tags: ["MACHINE LEARNING", "AGRI-TECH", "DATA MODELING"],
    edge: "circuit",
    bullets: [
      "Built machine learning models for crop yield prediction, market price forecasting, and fertilizer recommendation using real agricultural data.",
      "Contributed to an AI farming platform as part of a team — crop recommendation, disease prediction, and price forecasting modules.",
      "Built Streamlit demos so the models could be tested and validated easily by non-technical stakeholders.",
    ],
    stack: ["Python", "Scikit-learn", "Pandas", "Streamlit", "NumPy"],
    stats: [
      { label: "Attendance", value: 95, suffix: "%" },
      { label: "ML Models Shipped", value: 3, suffix: "" },
      { label: "Evaluation", text: "EXCELLENT" },
    ],
    records: [
      { src: campusPhoto, caption: "IIIT Tiruchirappalli — CSE Dept", icon: ImageIcon, fit: "cover" },
      { src: certificatePhoto, caption: "Internship Completion Certificate", icon: FileCheck2, fit: "contain" },
    ],
  },
  {
    id: "voice-ai",
    role: "VOICE-FIRST AI AGRICULTURAL PLATFORM",
    roleShort: "Voice-First AI Platform",
    org: "Personal project — continuation of the internship work",
    date: "2025 — SHIPPED",
    badge: "PERSONAL PROJECT",
    tags: ["FULL-STACK", "RAG", "VOICE AI"],
    edge: "signal",
    bullets: [
      "Independently extended the internship platform into a full voice-first product spanning 10 modules — crop recommendation, fertilizer recommendation, disease prediction, yield forecasting, price forecasting, evapotranspiration calculator, frost alerts, weather alerts, an AI chatbot, and multilingual voice interaction.",
      "Integrated the Gemini API and built an Ollama-based chatbot using RAG, pulling live data from AGMARKNET and the OpenWeather API.",
      "Built a Flask backend with a Streamlit frontend for accessible, voice-first interaction across languages.",
    ],
    stack: ["Python", "Flask", "LangChain", "React Native", "PostgreSQL", "Ollama", "Gemini API"],
    stats: [
      { label: "Modules Delivered", value: 10, suffix: "" },
      { label: "External APIs Wired", value: 2, suffix: "" },
      { label: "RAG Chatbots Built", value: 1, suffix: "" },
    ],
    records: [],
  },
];

const STAT_COLORS = ["var(--circuit)", "var(--signal)", "var(--solder)"];
const EDGE_VAR = { circuit: "var(--circuit)", signal: "var(--signal)" };

/* Fixed star positions (not randomized per render) so the field doesn't
   jump around on re-render or mismatch on hydration. Kept sparse — this is
   meant to sit quietly behind the circuit-board grid, not replace it. */
const STAR_FIELD = [
  { top: "6%", left: "9%", size: 2, delay: 0.0, duration: 2.8 },
  { top: "14%", left: "88%", size: 1.5, delay: 0.6, duration: 3.4 },
  { top: "22%", left: "38%", size: 1.5, delay: 1.1, duration: 2.6 },
  { top: "9%", left: "63%", size: 2, delay: 0.3, duration: 3.0 },
  { top: "34%", left: "6%", size: 1.5, delay: 1.6, duration: 2.9 },
  { top: "40%", left: "94%", size: 2, delay: 0.9, duration: 3.2 },
  { top: "55%", left: "28%", size: 1.5, delay: 0.2, duration: 2.7 },
  { top: "62%", left: "80%", size: 1.5, delay: 1.4, duration: 3.1 },
  { top: "70%", left: "12%", size: 2, delay: 0.7, duration: 2.9 },
  { top: "80%", left: "55%", size: 1.5, delay: 1.9, duration: 3.3 },
  { top: "88%", left: "20%", size: 1.5, delay: 0.4, duration: 2.8 },
  { top: "92%", left: "70%", size: 2, delay: 1.2, duration: 3.0 },
];

/* ------------------------------------------------------------------ */

function RecordLightbox({ record, onClose }) {
  return (
    <AnimatePresence>
      {record && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-10 bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[85vh] bg-black brutal-border"
            style={{ boxShadow: "8px 8px 0 var(--circuit)" }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 p-1.5 border-2 border-black bg-white hover:bg-[var(--signal)] hover:text-black transition-colors"
            >
              <X size={16} />
            </button>
            <img
              src={record.src}
              alt={record.caption}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="flex items-center gap-2 px-4 py-3 border-t-2 border-black bg-[var(--bg-panel)]">
              <record.icon size={14} className="text-[var(--circuit)] shrink-0" />
              <p className="text-xs text-[var(--ink-dim)]">{record.caption}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Experience() {
  const [active, setActive] = useState(0);
  const [showRecords, setShowRecords] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const exp = EXPERIENCES[active];

  const headingWrapRef = useRef(null);
  const lineRef = useRef(null);
  const nodeRefs = useRef([]);
  const packetRef = useRef(null);
  const cardRef = useRef(null);
  const statRefs = useRef([]);
  const shootingStarRefs = useRef([]);

  /* Timeline rail draws itself once, the first time it's on screen */
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, { scaleX: [0, 1], duration: 900, ease: "outQuad" });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Active tab glows continuously — a steady HUD pulse instead of the old
     dot scaling up, since scaling a whole tile reads as jittery, not techy */
  useEffect(() => {
    const tab = nodeRefs.current[active];
    if (!tab) return;
    const a = animate(tab, {
      boxShadow: [
        `0 0 0px 0px ${EDGE_VAR[exp.edge]}`,
        `0 0 18px 1px ${EDGE_VAR[exp.edge]}`,
      ],
      duration: 1100,
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });
    return () => a.pause();
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  /* A signal packet travels the circuit trace beneath the tabs on a loop —
     reads as "data flowing between entries" rather than a static line */
  useEffect(() => {
    const packet = packetRef.current;
    if (!packet) return;
    const a = animate(packet, {
      left: ["0%", "100%"],
      opacity: [0, 1, 1, 0],
      duration: 2600,
      ease: "inOutSine",
      loop: true,
    });
    return () => a.pause();
  }, []);

  /* Occasional shooting-star streaks — the "space" half of the theme.
     Kept rare (long gap between loops) and quick, so it's a detail you
     notice once, not something competing with the actual content. */
  useEffect(() => {
    const timers = [];
    shootingStarRefs.current.forEach((el, i) => {
      if (!el) return;
      const run = () => {
        animate(el, {
          translateX: [0, 220],
          translateY: [0, 90],
          opacity: [0, 1, 0],
          duration: 900,
          ease: "outSine",
        });
      };
      timers.push(setTimeout(run, 1500 + i * 2500));
      timers.push(setInterval(run, 7000 + i * 3500));
    });
    return () => timers.forEach((t) => {
      clearTimeout(t);
      clearInterval(t);
    });
  }, []);

  /* Card flickers in on switch, records panel collapses */
  useEffect(() => {
    setShowRecords(false);
    const card = cardRef.current;
    if (!card) return;
    animate(card, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 450,
      ease: "outExpo",
    });
  }, [active]);

  /* Stat numbers count up whenever the active card changes */
  useEffect(() => {
    exp.stats.forEach((stat, i) => {
      const el = statRefs.current[i];
      if (!el || stat.text) return; // text stats (e.g. "EXCELLENT") don't count up
      const proxy = { val: 0 };
      animate(proxy, {
        val: stat.value,
        duration: 1100,
        ease: "outExpo",
        onUpdate: () => {
          el.textContent = `${Math.round(proxy.val)}${stat.suffix}`;
        },
      });
    });
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Periodic glitch burst on the section heading */
  useEffect(() => {
    const wrap = headingWrapRef.current;
    if (!wrap) return;
    const id = setInterval(() => {
      animate(wrap, {
        translateX: [0, -4, 3, -2, 0],
        skewX: [0, -3, 2, 0],
        duration: 220,
        ease: "linear",
      });
    }, 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="experience" className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
      {/* Space layer — sits behind everything, kept faint so it reads as
          atmosphere behind the circuit-board grid rather than a second,
          competing theme. Nothing here should ever outshine the content. */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -right-16 w-[380px] h-[380px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--circuit) 0%, transparent 70%)", opacity: 0.1 }}
        />
        <div
          className="absolute top-1/2 -left-28 w-[340px] h-[340px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--signal) 0%, transparent 70%)", opacity: 0.08 }}
        />

        {STAR_FIELD.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
            animate={{ opacity: [0.15, 0.85, 0.15] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}

        <span
          ref={(el) => (shootingStarRefs.current[0] = el)}
          className="absolute top-[14%] left-[6%] w-10 h-px opacity-0"
          style={{ background: "linear-gradient(to right, transparent, var(--circuit))" }}
        />
        <span
          ref={(el) => (shootingStarRefs.current[1] = el)}
          className="absolute top-[62%] right-[10%] w-10 h-px opacity-0"
          style={{ background: "linear-gradient(to left, transparent, var(--signal))" }}
        />
      </div>

      {/* Heading row — DataCore sits right beside the title now, so it reads
          as part of the "EXPERIENCE" heading instead of floating off-page */}
      <div className="flex items-center gap-3 mb-2">
        <div ref={headingWrapRef}>
          <GlitchHeading text="EXPERIENCE" />
        </div>
        <DataCore size={40} />
        <span className="hidden sm:block flex-1 border-t-2 border-dashed border-[var(--line)]" />
      </div>

      <div className="flex items-center gap-2 mb-12 text-[11px] tracking-wide text-[var(--ink-dim)]">
        <span className="w-2 h-2 rounded-full bg-[var(--circuit)] blink-dot" />
        SYSTEM: ONLINE // SECTION_04.EXPERIENCE
      </div>

      {/* Entry selector — HUD process tiles instead of a dot-and-line
          timeline. Each tile reads like a system log entry (index tag,
          status LED, role, date); a dashed circuit trace with a traveling
          signal packet ties them together underneath. */}
      <div className="relative mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-10">
          {EXPERIENCES.map((item, i) => {
            const isActive = active === i;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                ref={(el) => (nodeRefs.current[i] = el)}
                className="relative text-left px-5 py-4 border-2 transition-colors duration-200 group"
                style={{
                  borderColor: isActive ? EDGE_VAR[item.edge] : "var(--line)",
                  backgroundColor: isActive ? "var(--bg-panel)" : "transparent",
                }}
              >
                {/* corner brackets — HUD framing device */}
                {["-top-px -left-px border-t-2 border-l-2", "-top-px -right-px border-t-2 border-r-2", "-bottom-px -left-px border-b-2 border-l-2", "-bottom-px -right-px border-b-2 border-r-2"].map((pos) => (
                  <span
                    key={pos}
                    className={`absolute w-3 h-3 pointer-events-none ${pos}`}
                    style={{ borderColor: isActive ? EDGE_VAR[item.edge] : "var(--line)" }}
                  />
                ))}

                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors"
                    style={{
                      backgroundColor: isActive ? EDGE_VAR[item.edge] : "var(--ink-dim)",
                      boxShadow: isActive ? `0 0 8px 2px ${EDGE_VAR[item.edge]}` : "none",
                    }}
                  />
                  <span
                    className="text-[10px] font-bold tracking-[0.2em]"
                    style={{ color: isActive ? EDGE_VAR[item.edge] : "var(--ink-dim)" }}
                  >
                    {`LOG_0${i + 1}`}
                  </span>
                </div>

                <p
                  className={`text-sm sm:text-base font-bold mb-1 transition-colors ${
                    isActive ? "text-[var(--ink)]" : "text-[var(--ink-dim)] group-hover:text-[var(--ink)]"
                  }`}
                >
                  {item.roleShort}
                </p>
                <p className="text-[11px] tracking-wide text-[var(--ink-dim)]">{item.date}</p>
              </button>
            );
          })}
        </div>

        {/* decorative circuit trace with a traveling data packet */}
        <div className="hidden sm:block absolute left-0 right-0 -bottom-6 h-px overflow-hidden">
          <span
            ref={lineRef}
            className="absolute inset-0 origin-left"
            style={{
              backgroundImage: "repeating-linear-gradient(to right, var(--line) 0 6px, transparent 6px 14px)",
            }}
          />
          <span
            ref={packetRef}
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{ left: 0, backgroundColor: "var(--circuit)", boxShadow: "0 0 8px 2px var(--circuit)" }}
          />
        </div>
      </div>


        {/* Right: active card + stats */}
        <div className="space-y-8">
          <div
            ref={cardRef}
            className="relative overflow-hidden brutal-border bg-[var(--bg-panel)] p-7 sm:p-8"
            style={{ boxShadow: `8px 8px 0px 0px ${EDGE_VAR[exp.edge]}` }}
          >
            {/* Header: title/org on the left column, date+badge pinned to a
                fixed-width right column so nothing reflows against the title */}
            <div className="grid sm:grid-cols-[1fr_auto] gap-x-4 gap-y-3 items-start mb-3">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight cyber-title text-[var(--ink)] leading-snug">
                {exp.role}
              </h3>
              <div className="flex sm:flex-col items-start sm:items-end gap-1.5 sm:w-[168px] shrink-0">
                <span className="text-[11px] font-bold px-3 py-1.5 bg-[var(--solder)] text-black whitespace-nowrap">
                  {exp.date}
                </span>
                {exp.badge && (
                  <span
                    className="text-[9px] font-bold px-2.5 py-1 border tracking-wide whitespace-nowrap"
                    style={{ borderColor: EDGE_VAR[exp.edge], color: EDGE_VAR[exp.edge] }}
                  >
                    {exp.badge}
                  </span>
                )}
              </div>
            </div>

            <p className="flex items-center gap-1.5 text-sm text-[var(--ink-dim)] mb-3">
              <Building2 size={13} className="shrink-0 text-[var(--ink-dim)]" />
              {exp.org}
            </p>

            <p
              className="text-[11px] font-bold tracking-widest mb-6"
              style={{ color: EDGE_VAR[exp.edge] }}
            >
              {exp.tags.join(" · ")}
            </p>

            <ul className="space-y-3 mb-6">
              {exp.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm leading-relaxed text-[var(--ink)]/90">
                  <ChevronRight size={15} className="mt-0.5 shrink-0" style={{ color: EDGE_VAR[exp.edge] }} />
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-2">
              {exp.stack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-[11px] font-semibold rounded-full border border-[var(--line)] bg-black/40 text-[var(--ink-dim)] transition-colors hover:border-[var(--circuit)] hover:text-[var(--ink)]"
                >
                  {t}
                </span>
              ))}
            </div>

            {exp.records.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => setShowRecords((s) => !s)}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide px-3 py-2 border transition-colors"
                  style={{
                    color: EDGE_VAR[exp.edge],
                    borderColor: EDGE_VAR[exp.edge],
                    backgroundColor: showRecords ? "rgba(255,255,255,0.03)" : "transparent",
                  }}
                >
                  {showRecords ? "HIDE RECORDS" : "SHOW CAMPUS + CERTIFICATE"}
                  <ChevronRight
                    size={14}
                    className="transition-transform"
                    style={{ transform: showRecords ? "rotate(90deg)" : "rotate(0deg)" }}
                  />
                </button>

                <AnimatePresence>
                  {showRecords && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid sm:grid-cols-2 gap-4 mt-5">
                        {exp.records.map((rec) => (
                          <button
                            key={rec.caption}
                            type="button"
                            onClick={() => setLightbox(rec)}
                            className="group relative border-2 border-black bg-black text-left"
                            style={{ boxShadow: "5px 5px 0 var(--circuit)" }}
                          >
                            <div className="w-full aspect-[4/3] overflow-hidden bg-black/60 flex items-center justify-center border-b-2 border-black">
                              <img
                                src={rec.src}
                                alt={rec.caption}
                                className={`w-full h-full ${rec.fit === "contain" ? "object-contain" : "object-cover"}`}
                              />
                            </div>
                            <span className="absolute top-2 right-2 p-1.5 bg-black/70 border border-[var(--line)] opacity-0 group-hover:opacity-100 transition-opacity">
                              <ZoomIn size={13} className="text-[var(--circuit)]" />
                            </span>
                            <div className="flex items-center gap-2 px-3 py-2">
                              <rec.icon size={13} className="text-[var(--circuit)] shrink-0" />
                              <p className="text-[11px] text-[var(--ink-dim)] leading-snug">{rec.caption}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Stat cards — equal height, icon-less but color-coded, with a
              hover lift so they read as live UI rather than static text */}
          <div className="grid grid-cols-3 gap-4 items-stretch">
            {exp.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col justify-center p-4 sm:p-5 brutal-border bg-[var(--bg-panel-2)] min-h-[104px]"
                style={{ borderColor: "var(--line)" }}
              >
                {stat.text ? (
                  <p className="text-xl sm:text-2xl font-extrabold mb-1" style={{ color: STAT_COLORS[i] }}>
                    {stat.text}
                  </p>
                ) : (
                  <p
                    ref={(el) => (statRefs.current[i] = el)}
                    className="text-3xl sm:text-4xl font-extrabold mb-1"
                    style={{ color: STAT_COLORS[i] }}
                  >
                    0
                  </p>
                )}
                <p className="text-[11px] text-[var(--ink-dim)] leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

      <RecordLightbox record={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}

/*
  ASSET NOTE:
  Drop iiit-campus.jpg and iiit-certificate.jpg into  src/assets/experience/
  in your project (create the folder), keeping those exact filenames — the
  imports at the top of this file already point there. Renamed them? Just
  update the two import lines.
*/