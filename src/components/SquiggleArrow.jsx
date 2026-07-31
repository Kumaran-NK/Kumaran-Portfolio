export default function SquiggleArrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 6C10 2 14 14 22 12C30 10 26 24 34 22C40 20.5 38 28 46 30"
        stroke="var(--circuit)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M40 24L47 31L48 22"
        stroke="var(--circuit)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}