import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_LINES = [
  { text: "~/kumaran $ ./init_profile.sh", color: "text-[var(--ink-dim)]" },
  { text: "> COMPILING ECE_CORE...", color: "text-[var(--signal)]" },
  { text: "> MOUNTING DISTRIBUTED_SYSTEMS...", color: "text-[var(--solder)]" },
  { text: "> LINKING APPLIED_AI...", color: "text-[var(--solder)]" },
  { text: "> STATUS: READY_TO_SHIP", color: "text-[var(--circuit)]" },
];

function TypedLine({ text, color, onDone, active }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!active) return;
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, 18);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <p className={`whitespace-pre ${color}`}>
      {shown}
      {active && shown.length < text.length && (
        <span className="animate-pulse">▍</span>
      )}
    </p>
  );
}

export default function BootTerminal({
  label = "kumaran@dev-env:~",
  lines = DEFAULT_LINES,
  edge = "var(--circuit)",
  className = "",
}) {
  const [step, setStep] = useState(0);

  return (
    <motion.div
      whileHover={{
        x: [0, -4, 4, -4, 4, -2, 2, 0],
        transition: { duration: 0.4 },
      }}
      className={`w-full max-w-xl brutal-border bg-[var(--bg-panel)] ${className}`}
      style={{ boxShadow: `6px 6px 0px 0px ${edge}` }}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-black bg-[var(--bg-panel-2)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--signal)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--solder)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--circuit)]" />
        <span className="ml-2 text-[11px] text-[var(--ink-dim)]">{label}</span>
      </div>
      <div className="px-4 py-3 min-h-[120px] text-xs space-y-1">
        {lines.map((line, idx) => (
          <TypedLine
            key={line.text}
            text={line.text}
            color={line.color}
            active={step >= idx}
            onDone={() => setStep((s) => Math.max(s, idx + 1))}
          />
        ))}
        {step >= lines.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[var(--ink)] pt-0.5"
          >
            _
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
