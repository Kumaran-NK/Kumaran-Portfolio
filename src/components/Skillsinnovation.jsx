import {
  ChevronRight,
  Settings,
  CheckSquare,
} from "lucide-react";
import StackIcon from "tech-stack-icons";
import BootTerminal from "./BootTerminal";

/* ------------------------------------------------------------------ */
/* CUSTOM HIGH-CONTRAST / SPECIALIZED CHIP ICONS                      */
/* ------------------------------------------------------------------ */

const CIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path fill="#659AD2" d="M115.4 30.7L66.7 2.6c-1.7-1-3.7-1-5.4 0L12.6 30.7c-1.7 1-2.6 2.7-2.6 4.7v57.2c0 2 1 3.7 2.6 4.7l48.7 28.1c1.7 1 3.7 1 5.4 0l48.7-28.1c1.7-1 2.6-2.7 2.6-4.7V35.4c0-2-1-3.7-2.6-4.7z"/>
    <path fill="#00599C" d="M115.4 35.4v57.2c0 2-1 3.7-2.6 4.7l-48.7 28.1V2.6c1.7 1 3.7 1 5.4 0l45.9 28.1c0 .2 0 .5 0 .7z"/>
    <path fill="#FFFFFF" d="M64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c7.7 0 14.6 3.6 19.1 9.2l-8.4 6.8c-2.7-3.4-6.8-5.5-11.4-5.5-8.2 0-14.8 6.6-14.8 14.8s6.6 14.8 14.8 14.8c4.6 0 8.7-2.1 11.4-5.5l8.4 6.8c-4.5 5.6-11.4 9.2-19.1 9.2z"/>
  </svg>
);

const CppIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path fill="#659AD2" d="M115.4 30.7L66.7 2.6c-1.7-1-3.7-1-5.4 0L12.6 30.7c-1.7 1-2.6 2.7-2.6 4.7v57.2c0 2 1 3.7 2.6 4.7l48.7 28.1c1.7 1 3.7 1 5.4 0l48.7-28.1c1.7-1 2.6-2.7 2.6-4.7V35.4c0-2-1-3.7-2.6-4.7z"/>
    <path fill="#00599C" d="M115.4 35.4v57.2c0 2-1 3.7-2.6 4.7l-48.7 28.1V2.6c1.7 1 3.7 1 5.4 0l45.9 28.1c0 .2 0 .5 0 .7z"/>
    <path fill="#FFFFFF" d="M53.4 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c7.7 0 14.6 3.6 19.1 9.2l-8.4 6.8c-2.7-3.4-6.8-5.5-11.4-5.5-8.2 0-14.8 6.6-14.8 14.8s6.6 14.8 14.8 14.8c4.6 0 8.7-2.1 11.4-5.5l8.4 6.8c-4.5 5.6-11.4 9.2-19.1 9.2zm28.3-21.8h-4.4v-4.4h-4.3v4.4h-4.4v4.3h4.4v4.4h4.3V71h4.4v-4.3zm18.3 0h-4.4v-4.4h-4.3v4.4H87v4.3h4.4v4.4h4.3V71H100v-4.3z"/>
  </svg>
);

const LuaIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <circle cx="64" cy="64" r="54" fill="#0055D4"/>
    <circle cx="82" cy="46" r="14" fill="#FFFFFF"/>
    <circle cx="106" cy="22" r="12" fill="#00F5FF"/>
  </svg>
);

const MySQLIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path fill="#00A2C7" d="M112 92c-6.6-.2-11.7.5-16 2.3-1.2.5-3.2.5-3.4 2.1.7.7.7 1.8 1.3 2.7 1 1.7 2.7 3.9 4.3 5.1 1.7 1.3 3.5 2.5 5.5 3.3l1.8.8c.3.1.5.4.7.7 1 1.5 1.5 2.8 1.4 4.5-.1 1.8-.7 3.7-2 5.2-1.5 1.8-3.9 3.1-6.6 4-5.5 1.7-12.7 1.7-18.7.2-6.1-1.5-10.7-4.4-14.8-8.6-4.1-4.2-7.2-9.6-9.8-15.5-2.6-6-4.5-12.5-6.3-19.1-1.7-6.6-3.4-13.1-5.6-19.4-2.2-6.2-4.9-12-8.3-17.2-3.4-5.1-7.5-9.3-12.4-12.1-4.9-2.7-10.6-3.9-16.7-3.2 2.5-1.5 5.4-2.5 8.7-2.9 3.2-.4 6.7-.1 10.2 1 3.5 1.1 6.9 2.9 10 5.4 3.1 2.5 5.8 5.6 8 9.1 2.2 3.5 4 7.4 5.4 11.4 1.4 4 2.5 8.2 3.4 12.3 1.8 8.3 3 16.5 4.8 24.3 1.8 7.8 4.2 15 7.6 20.9 3.4 5.9 8 10.1 14.1 11.9 6.1 1.7 13.9.7 19.8-2.6 2.9-1.6 5.3-3.9 6.8-6.6 1.4-2.8 1.7-5.9 1.1-8.7-.3-1.4-.9-2.7-1.8-3.7z"/>
    <path fill="#F29111" d="M52 24c4 4 7 9 9 14-2-1-4-2-6-3-4-2-9-3-14-3 3-3 7-6 11-8z"/>
  </svg>
);

const FastApiIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <circle cx="64" cy="64" r="56" fill="#059669"/>
    <path fill="#FFFFFF" d="M68 20L34 72h24l-6 36 38-54H64l4-34z"/>
  </svg>
);

const RestApiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 12h.01M10 12h.01M14 12h4" />
  </svg>
);

const SpringAiIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path fill="#6DB33F" d="M64 8C40 28 20 54 20 80c0 28 20 40 44 40 28 0 44-16 44-44 0-32-20-56-44-68z"/>
    <path fill="#FFFFFF" d="M64 42c3 13 10 20 23 23-13 3-20 10-23 23-3-13-10-20-23-23 13-3 20-10 23-23z"/>
  </svg>
);

const HibernateIcon = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path fill="#59666C" d="M64 12L24 28v40c0 28 17 54 40 60 23-6 40-32 40-60V28L64 12z"/>
    <path fill="#BCAE79" d="M46 44v40h10V68h16v16h10V44H72v16H56V44H46z"/>
  </svg>
);

const OodIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="8.5" y="14" width="7" height="7" rx="1"/>
    <path d="M6.5 10v2a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"/>
    <path d="M12 14v-2"/>
  </svg>
);

const DsaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="5" r="2.5" fill="#00F5FF" fillOpacity="0.4"/>
    <circle cx="6" cy="19" r="2.5" fill="#00F5FF" fillOpacity="0.4"/>
    <circle cx="18" cy="19" r="2.5" fill="#00F5FF" fillOpacity="0.4"/>
    <path d="M12 7.5l-6 9m6-9l6 9"/>
  </svg>
);

const SysDesignIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FF006E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <rect x="3" y="4" width="18" height="4" rx="1"/>
    <rect x="3" y="10" width="18" height="4" rx="1"/>
    <rect x="3" y="16" width="18" height="4" rx="1"/>
    <circle cx="6" cy="6" r="1" fill="#FF006E"/>
    <circle cx="6" cy="12" r="1" fill="#FF006E"/>
    <circle cx="6" cy="18" r="1" fill="#FF006E"/>
  </svg>
);

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

const SKILL_CATEGORIES = [
  {
    label: "Languages",
    items: [
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "js" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Java", icon: "java" },
      { name: "C", custom: <CIcon /> },
      { name: "C++", custom: <CppIcon /> },
      { name: "Dart", icon: "dart" },
      { name: "Lua", custom: <LuaIcon /> },
    ],
  },
  {
    label: "CS Fundamentals",
    items: [
      { name: "Object-Oriented Design", custom: <OodIcon /> },
      { name: "Data Structures and Algorithms", custom: <DsaIcon /> },
      { name: "System Design", custom: <SysDesignIcon /> },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React.js", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS", icon: "css3" },
      { name: "Streamlit", icon: "streamlit" },
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      { name: "Spring Boot", icon: "spring" },
      { name: "FastAPI", custom: <FastApiIcon /> },
      { name: "REST API", custom: <RestApiIcon /> },
      { name: "OpenAPI", icon: "openapi" },
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
      { name: "Spring AI", custom: <SpringAiIcon /> },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MySQL", custom: <MySQLIcon /> },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase", icon: "firebase" },
      { name: "Hibernate", custom: <HibernateIcon /> },
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

const FOCUS_LINES = [
  { text: "~/kumaran $ ./show_current_focus.sh", color: "text-[var(--ink-dim)]" },
  { text: "Loading active focus areas...", color: "text-[var(--solder)]" },
  { text: "> BACKEND SYSTEMS & DISTRIBUTED ARCHITECTURE [Active]", color: "text-[var(--circuit)]" },
  { text: "> APPLIED AI / LLM INTEGRATION [Active]", color: "text-[var(--circuit)]" },
  { text: "> FRAUD DETECTION + RL SIMULATION [Shipping]", color: "text-[var(--signal)]" },
  { text: "> OPEN SOURCE — GSoC [Contributing]", color: "text-[var(--signal)]" },
];

/* ------------------------------------------------------------------ */

export default function SkillsInnovation() {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 pt-2 sm:pt-4 pb-28 scroll-mt-20">
      {/* Section Heading Badge */}
      <div
        className="inline-block border-4 border-black px-4 py-2 mb-8 rounded-sm transform -rotate-1 shadow-[4px_4px_0px_0px_#000000]"
        style={{ backgroundColor: "var(--spider-magenta)" }}
      >
        <h2 className="font-headline-md text-headline-md text-white flex items-center gap-2.5 font-extrabold uppercase tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          <span className="material-symbols-outlined font-bold text-white text-2xl">experiment</span>
          <span className="text-white font-extrabold tracking-tight">
            SKILLS &amp; INNOVATION
          </span>
        </h2>
      </div>

      {/* Project Highlights Card */}
      <div className="mb-10">
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

      {/* Tech Stack — Full Width */}
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
              <div className="md:w-[150px] shrink-0 mt-1.5">
                <span className="text-xs font-bold text-[var(--signal)] uppercase tracking-wider">
                  {category.label}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-2.5 py-1.5 bg-black/40 border border-[var(--line)] rounded-sm hover:border-[var(--signal)] transition-colors"
                  >
                    <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                      {skill.custom ? (
                        skill.custom
                      ) : (
                        <StackIcon name={skill.icon} className="w-full h-full" />
                      )}
                    </div>
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

      {/* Bottom Section: Centered-Focused Note & Terminal */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 max-w-4xl mx-auto pt-4">
        {/* Area of Expertise Sticky Note */}
        <div
          className="relative rotate-1 p-5 pt-7 pb-5 w-full sm:w-[290px] shadow-xl shrink-0"
          style={{ backgroundColor: "var(--solder)" }}
        >
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/50 border border-black/10 shadow-sm -rotate-1" />
          <h4 className="text-sm font-extrabold tracking-tight text-black mb-3 uppercase">AREA OF EXPERTISE</h4>
          <ul className="space-y-2">
            {AREAS_OF_EXPERTISE.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[12.5px] font-bold text-black leading-snug">
                <CheckSquare size={14} className="text-black shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Focus-areas terminal */}
        <div className="w-full flex-1 max-w-xl">
          <BootTerminal
            label="kumaran@dev-env:~"
            lines={FOCUS_LINES}
            edge="var(--circuit)"
            className="w-full"
            bodyClassName="p-5 sm:p-6 text-[13px] sm:text-[13.5px] space-y-2.5 sm:space-y-3 min-h-[190px]"
          />
        </div>
      </div>
    </section>
  );
}
