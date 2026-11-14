import { useState, useEffect } from "react";
import { TerminalSquare, Menu, X } from "lucide-react";
import Terminal from "./Terminal"; 

// Import your resume here. 
import resumeFile from "../assets/docs/Kumaran N Resume.pdf";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Tech Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll-spy: track which section is currently in view
  useEffect(() => {
    const sectionIds = LINKS.map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // triggers when section is near top-third of viewport
        threshold: [0, 0.25, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a
            href="#home"
            className="text-[var(--circuit)] font-semibold tracking-tight"
            style={{ textShadow: "0 0 12px rgba(47,230,217,0.55)" }}
          >
            KUMARAN.SH
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--ink-dim)]">
            {LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={label}
                  href={href}
                  className={`transition-colors ${
                    isActive
                      ? ""
                      : "hover:text-[var(--ink)]"
                  }`}
                >
                  {isActive ? (
                    <span className="text-[var(--solder)] bg-[var(--solder)]/15 px-3 py-1.5 border-2 border-[var(--solder)]/60 font-semibold shadow-[0_0_10px_rgba(255,197,61,0.2)]">
                      {label}
                    </span>
                  ) : (
                    label
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Desktop Resume Link */}
            <a
              href={resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-2 bg-[var(--solder)] text-black brutal-border brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              RESUME.PDF
            </a>
            
            {/* Terminal button with tooltip */}
            <div className="relative group">
              <button 
                onClick={() => setIsTerminalOpen(true)}
                className="p-2 border border-[var(--line)] text-[var(--circuit)] hover:bg-[var(--circuit)]/10 hover:border-[var(--circuit)] transition-colors cursor-pointer"
                aria-label="Open Terminal"
                title="Open Terminal"
              >
                <TerminalSquare size={18} />
              </button>
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-mono bg-[var(--bg-panel)] border border-[var(--line)] text-[var(--ink-dim)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Terminal
              </span>
            </div>
          </div>

          <button
            className="md:hidden text-[var(--ink)]"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden flex flex-col gap-1 px-6 pb-4 text-sm text-[var(--ink-dim)]">
            {LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`py-2 border-b border-[var(--line)] ${
                    isActive ? "text-[var(--solder)] font-semibold" : ""
                  }`}
                >
                  {label}
                </a>
              );
            })}
            
            {/* Mobile Resume Link */}
            <a
              href={resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-center text-xs font-semibold px-4 py-2 bg-[var(--solder)] text-black brutal-border brutal-shadow-sm"
            >
              RESUME.PDF
            </a>
            
            <button 
              onClick={() => {
                setOpen(false);
                setIsTerminalOpen(true);
              }}
              className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 border border-[var(--circuit)] text-[var(--circuit)]"
            >
              <TerminalSquare size={16} /> OPEN TERMINAL
            </button>
          </div>
        )}
      </header>

      {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
    </>
  );
}
