export default function GlitchHeading({ text, className = "", inverse = false }) {
  return (
    <h2
      data-text={text}
      className={`glitch-heading ${
        inverse ? "glitch-heading--inverse" : ""
      } font-extrabold uppercase tracking-tight text-5xl sm:text-6xl ${className}`}
    >
      {text}
    </h2>
  );
}