import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { name: string; path: string };

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  /** Visually compact variant for inner pages */
  className?: string;
};

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-1 text-slate-500 list-none m-0 p-0">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1 m-0">
              {i > 0 ? <ChevronRight className="w-4 h-4 shrink-0 opacity-60" aria-hidden /> : null}
              {isLast ? (
                <span className="text-slate-800 font-semibold" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="text-[#015AAA] no-underline font-medium hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
