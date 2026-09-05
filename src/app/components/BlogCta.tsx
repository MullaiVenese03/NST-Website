import { Link } from "react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { BlogCtaInfo } from "../data/blogsData";

interface BlogCtaProps {
  cta: BlogCtaInfo;
  className?: string;
}

export function BlogCta({ cta, className = "" }: BlogCtaProps) {
  return (
    <aside
      aria-label="Call to action"
      className={`p-5 sm:p-6 md:p-7 rounded-2xl bg-gradient-to-br from-[#015AAA]/10 via-[#015AAA]/5 to-slate-50 border border-[#015AAA]/20 shadow-xs ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
        {/* Left Column: Heading & Description */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#015AAA]/10 text-[#015AAA] font-bold text-[11px] tracking-wider uppercase mb-2">
            <ShieldCheck size={12} />
            <span>NebulaSafeTech</span>
          </div>

          <h3 className="font-heading text-slate-900 text-lg sm:text-xl font-bold leading-snug mb-1.5">
            {cta.statement}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed max-w-2xl m-0">
            {cta.description}
          </p>
        </div>

        {/* Right Column: Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-1 md:pt-0">
          <Link
            to={cta.primaryActionUrl}
            className="px-4 py-2.5 rounded-xl bg-[#015AAA] hover:bg-[#013566] text-white font-semibold text-xs sm:text-sm text-center inline-flex items-center justify-center gap-1.5 shadow-xs hover:shadow transition-all no-underline cursor-pointer"
          >
            <span>{cta.primaryActionText}</span>
            <ArrowRight size={14} />
          </Link>

          {cta.secondaryActionText && cta.secondaryActionUrl && (
            <Link
              to={cta.secondaryActionUrl}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm text-center border border-slate-200 transition-all no-underline inline-flex items-center justify-center"
            >
              {cta.secondaryActionText}
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
