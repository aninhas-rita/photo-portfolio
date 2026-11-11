export function IconEye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <path d="M4 24C4 24 12 10 24 10C36 10 44 24 44 24C44 24 36 38 24 38C12 38 4 24 4 24Z" />
      <circle cx="24" cy="24" r="6" />
    </svg>
  );
}

export function IconHeart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <path d="M24 40C24 40 6 29 6 16.5C6 10.7 10.5 6 16 6C19.6 6 22.6 8 24 11C25.4 8 28.4 6 32 6C37.5 6 42 10.7 42 16.5C42 29 24 40 24 40Z" />
    </svg>
  );
}

export function IconFrame(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
      <rect x="7" y="7" width="34" height="34" rx="1" />
      <path d="M7 30L17 20L25 27L34 17L41 24" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
