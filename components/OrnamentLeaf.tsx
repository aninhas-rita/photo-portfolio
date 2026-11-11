export default function OrnamentLeaf({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      className={className}
      aria-hidden
    >
      <path d="M10 210C60 190 70 140 60 100C52 68 20 50 5 40" />
      <path d="M25 165C45 160 65 145 70 120" />
      <path d="M40 130C58 128 72 115 78 98" />
      <path d="M15 100C35 98 50 85 55 68" />
      <path d="M8 60C24 58 36 48 40 34" />
    </svg>
  );
}
