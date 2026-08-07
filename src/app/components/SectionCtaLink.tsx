import { Link } from "react-router";

interface SectionCtaLinkProps {
  to: string;
  label: string;
  className?: string;
}

export function SectionCtaLink({ to, label, className = "" }: SectionCtaLinkProps) {
  return (
    <Link
      to={to}
      className={`nst-ui font-bold inline-flex items-center gap-2 group flex-wrap no-underline shrink-0 text-[#015AAA] hover:text-[#014080] transition-colors ${className}`}
    >
      <span>{label}</span>
      <svg
        width="16"
        height="10"
        viewBox="0 0 20 12"
        fill="none"
        className="transition-transform duration-200 group-hover:translate-x-1 shrink-0"
        aria-hidden
      >
        <path
          d="M19 6L14 1M19 6L14 11M19 6H1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
