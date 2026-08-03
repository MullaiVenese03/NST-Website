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
      className={`inline-flex items-center gap-3 group flex-wrap no-underline shrink-0 ${className}`}
      style={{
        fontWeight: 700,
        fontSize: "16px",
        letterSpacing: "1px",
        color: "#015AAA",
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      <span>{label}</span>
      <svg
        width="20"
        height="12"
        viewBox="0 0 20 12"
        fill="none"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        <path
          d="M19 6L14 1M19 6L14 11M19 6H1"
          stroke="#015AAA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
