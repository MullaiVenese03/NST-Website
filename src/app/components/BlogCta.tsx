import { Link } from "react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import type { BlogCtaInfo } from "../data/blogsData";

interface BlogCtaProps {
  cta: BlogCtaInfo;
  className?: string;
}

export function BlogCta({ cta, className = "" }: BlogCtaProps) {
  return (
    <aside
      aria-label="Call to action"
      className={`my-12 p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#015AAA]/10 via-[#015AAA]/5 to-slate-50 border border-[#015AAA]/20 shadow-sm relative overflow-hidden ${className}`}
    >
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 relative z-10">
        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <div className="mb-3.5 sm:mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#015AAA]/10 text-[#015AAA] font-bold text-xs border border-[#015AAA]/20 uppercase tracking-wider">
              <BookOpen size={13} />
              <span>NebulaSafeTech Education &amp; Services</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-accent text-slate-900 m-0 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-5">
            {cta.statement}
          </h2>

          {/* Description */}
          <p className="text-slate-600 m-0 text-sm sm:text-base font-normal leading-relaxed max-w-3xl">
            {cta.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full xl:w-auto pt-2 xl:pt-0">
          <Link
            to={cta.primaryActionUrl}
            className="px-6 py-3.5 rounded-xl bg-[#015AAA] text-white font-bold text-sm text-center no-underline hover:bg-[#013566] transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            {cta.primaryActionText}
            <ArrowRight size={16} />
          </Link>

          {cta.secondaryActionText && cta.secondaryActionUrl ? (
            <Link
              to={cta.secondaryActionUrl}
              className="px-6 py-3.5 rounded-xl bg-white text-slate-700 font-semibold text-sm text-center no-underline hover:bg-slate-100 border border-slate-200 transition-all flex items-center justify-center cursor-pointer shrink-0"
            >
              {cta.secondaryActionText}
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
