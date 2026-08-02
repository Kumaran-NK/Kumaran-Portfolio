import { useState } from "react";
import { TerminalSquare, Menu, X } from "lucide-react";
import Terminal from "./Terminal"; 

// Import your resume here. 
// Note: You may need to adjust the path (e.g., "./assets/..." or "../../assets/...") 
// depending on exactly where Navbar.jsx is located relative to the assets folder.
import resumeFile from "../assets/Kumaran N Resume.pdf";

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
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-[var(--ink)] transition-colors"
              >
                {label === "Home" ? (
                  <span className="text-[var(--solder)] bg-[var(--solder)]/10 px-3 py-1.5 border border-[var(--solder)]/40">
                    {label}
                  </span>
                ) : (
                  label
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Desktop Resume Link Updated */}
            <a
              href={resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-2 bg-[var(--solder)] text-black brutal-border brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              RESUME.PDF
            </a>
            
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="p-2 border border-[var(--line)] text-[var(--circuit)] hover:bg-[var(--circuit)]/10 transition-colors cursor-pointer"
              aria-label="Open Terminal"
            >
              <TerminalSquare size={18} />
            </button>
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
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2 border-b border-[var(--line)]"
              >
                {label}
              </a>
            ))}
            
            {/* Mobile Resume Link Updated */}
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