export default function GlitchHeading({ text, className = "", inverse = false, size = "text-5xl sm:text-6xl" }) {
  return (
    <h2
      className={`glitch-wrapper ${
        inverse ? "glitch-heading--inverse" : ""
      } font-extrabold uppercase tracking-tight ${size} ${className}`}
    >
      {text}
      <span className="glitch-text-clone glitch-magenta" aria-hidden="true">
        {text}
      </span>
      <span className="glitch-text-clone glitch-cyan" aria-hidden="true">
        {text}
      </span>
    </h2>
  );
}
