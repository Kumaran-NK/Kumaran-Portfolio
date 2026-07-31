import { useEffect, useRef } from "react";
import {
  ChevronRight,
  FlaskConical,
  Settings,
  CheckSquare,
} from "lucide-react";
import { animate } from "animejs";
import StackIcon from "tech-stack-icons";
import BootTerminal from "./BootTerminal";

/* ------------------------------------------------------------------ */
/* DATA                                                               */
/* ------------------------------------------------------------------ */

const PROJECT_HIGHLIGHTS = [
  "Built and shipped AI-powered web apps end-to-end — idea to a working, deployed product — inside hackathon-length timeframes.",
  "Designed backend services and REST/OpenAPI-documented APIs with Spring Boot and FastAPI that held up under real deadline pressure.",
  "Wired LLM-backed features — LangChain, Ollama, OpenAI, Gemini — into production-shaped apps rather than one-off notebook demos.",
  "Built responsive, interactive front-ends with React and Tailwind, backed by proper state management instead of duct tape.",
  "Worked across the full stack — schema, API, and UI — coordinating with teammates to turn a rough spec into something that actually ships.",
];

/* Grouped tech stack matching your requested structure */
const SKILL_CATEGORIES = [
  {
    label: "Languages",
    items: [
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "js" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Java", icon: "java" },
      { name: "C" },
      { name: "C++" },
      { name: "Dart", icon: "dart" },
      { name: "Lua", icon: "lua" },
    ],
  },
  {
    label: "CS Fundamentals",
    items: [
      { name: "Object-Oriented Design" },
      { name: "Data Structures and Algorithms" },
      { name: "System Design" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React.js", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS", icon: "css3" },
      { name: "Streamlit" },
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      { name: "Spring Boot", icon: "spring" },
      { name: "FastAPI" },
      { name: "REST API" },
      { name: "OpenAPI" },
    ],
  },
  {
    label: "AI / ML",
    items: [
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "Scikit-learn", icon: "scikitlearn" },
      { name: "LangChain", icon: "langchain" },
      { name: "Ollama", icon: "ollama" },
      { name: "Gemini", icon: "gemini" },
      { name: "OpenAI", icon: "openai" },
      { name: "Spring AI" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase", icon: "firebase" },
      { name: "Hibernate" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    label: "DevOps & Tools",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "Linux", icon: "linux" },
      { name: "Hugging Face Spaces", icon: "huggingface" },
    ],
  },
];

const AREAS_OF_EXPERTISE = [
  "Full-Stack Web Development",
  "REST API & Backend Design",
  "AI / LLM Application Development",
  "Database Design & Management",
  "Cloud-Ready DevOps Workflows",
  "Data Structures & System Design",
];

/* Terminal lines for the focus-areas readout below the tech stack */
const FOCUS_LINES = [
  { text: "~/kumaran $ ./show_current_focus.sh", color: "text-[var(--ink-dim)]" },
  { text: "Loading active focus areas...", color: "text-[var(--solder)]" },
  { text: "> BACKEND SYSTEMS & DISTRIBUTED ARCHITECTURE [Active]", color: "text-[var(--circuit)]" },
  { text: "> APPLIED AI / LLM INTEGRATION [Active]", color: "text-[var(--circuit)]" },
  { text: "> LOGISTICS + CIVIC TECH PROJECTS [Shipping]", color: "text-[var(--signal)]" },
  { text: "> OPEN SOURCE — GSoC [Contributing]", color: "text-[var(--signal)]" },
];

/* ------------------------------------------------------------------ */

export default function SkillsInnovation() {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const a = animate(node, {
      boxShadow: ["0 0 0px 0px var(--signal)", "0 0 14px 4px var(--signal)"],
      duration: 1000,
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });
    return () => a.pause();
  }, []);

  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-24">
      {/* Section Ribbon */}
      <div
        className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 -rotate-1 border-2 border-black"
        style={{ backgroundColor: "var(--signal)", boxShadow: "4px 4px 0 rgba(0,0,0,0.4)" }}
      >
        <FlaskConical size={18} className="text-black shrink-0" />
        <span className="text-sm sm:text-base font-extrabold tracking-wide text-black uppercase">
          Skills &amp; Innovation
        </span>
      </div>

      {/* Project Highlights */}
      <div className="relative pl-8 mb-10">
        <span className="absolute left-[3px] top-2 bottom-2 w-[2px] bg-[var(--line)]" />
        <span
          ref={nodeRef}
          className="absolute left-0 top-2 w-[9px] h-[9px] rounded-full border-2"
          style={{ backgroundColor: "var(--signal)", borderColor: "var(--signal)" }}
        />

        <div
          className="relative overflow-hidden brutal-border bg-[var(--bg-panel)] p-7 sm:p-8"
          style={{ boxShadow: "8px 8px 0px 0px var(--signal)" }}
        >
          <div className="grid sm:grid-cols-[1fr_auto] gap-x-4 gap-y-3 items-start mb-6">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight cyber-title text-[var(--ink)]">
              PROJECT HIGHLIGHTS
            </h3>
            <span className="text-[11px] font-bold px-3 py-1.5 bg-[var(--solder)] text-black whitespace-nowrap self-start">
              2023 — PRESENT
            </span>
          </div>

          <ul className="space-y-4">
            {PROJECT_HIGHLIGHTS.map((b) => (
              <li key={b} className="flex gap-2 text-sm leading-relaxed text-[var(--ink)]/90">
                <ChevronRight size={15} className="mt-0.5 shrink-0 text-[var(--signal)]" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech Stack — now full width, its own row */}
      <div
        className="relative brutal-border bg-[var(--bg-panel)] p-6 sm:p-7 mb-10"
        style={{ boxShadow: "6px 6px 0px 0px var(--line)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold tracking-tight cyber-title text-[var(--ink)]">TECHNICAL SKILLS</h3>
          <Settings size={18} className="text-[var(--ink-dim)]" />
        </div>
        <div className="border-t-2 border-dashed border-[var(--line)] mb-6" />

        <div className="flex flex-col gap-5">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.label} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
              {/* Category Title */}
              <div className="md:w-[150px] shrink-0 mt-1.5">
                <span className="text-xs font-bold text-[var(--signal)] uppercase tracking-wider">
                  {category.label}
                </span>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-black/40 border border-[var(--line)] rounded-sm hover:border-[var(--signal)] transition-colors"
                  >
                    {skill.icon && (
                      <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        <StackIcon name={skill.icon} variant="dark" className="w-full h-full" />
                      </div>
                    )}
                    <span className="text-[11px] font-bold tracking-wide text-[var(--ink)]">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Below the tech stack: sticky note + focus-areas terminal side by
          side, so the space that used to sit empty under a short note now
          holds real content instead. */}
      <div className="grid lg:grid-cols-[340px_1fr] gap-10 items-start">
        {/* Area of Expertise Sticky Note */}
        <div
          className="relative rotate-2 p-6 pt-9 w-full shadow-xl"
          style={{ backgroundColor: "var(--solder)" }}
        >
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/50 -rotate-2" />
          <h4 className="text-lg font-extrabold tracking-tight text-black mb-5">AREA OF EXPERTISE</h4>
          <ul className="space-y-3">
            {AREAS_OF_EXPERTISE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-black leading-snug">
                <CheckSquare size={16} className="text-black shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Focus-areas terminal */}
        <BootTerminal
          label="kumaran@dev-env:~"
          lines={FOCUS_LINES}
          edge="var(--circuit)"
          className="max-w-none"
        />
      </div>
    </section>
  );
}