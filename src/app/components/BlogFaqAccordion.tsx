import { useState } from "react";
import { ChevronDown, HelpCircle, ChevronsUpDown } from "lucide-react";
import type { BlogFaqItem } from "../data/blogsData";

interface BlogFaqAccordionProps {
  items: BlogFaqItem[];
  className?: string;
}

export function BlogFaqAccordion({ items, className = "" }: BlogFaqAccordionProps) {
  // First item open by default
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]));

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (openIndexes.size === items.length) {
      setOpenIndexes(new Set());
    } else {
      setOpenIndexes(new Set(items.map((_, i) => i)));
    }
  };

  if (!items.length) return null;

  const allOpen = openIndexes.size === items.length;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <HelpCircle size={22} className="text-[#015AAA]" />
          <h2 className="nst-h2 text-slate-900 m-0">Frequently Asked Questions</h2>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#015AAA] hover:text-[#013566] bg-[#015AAA]/10 px-3 py-1.5 rounded-full border border-[#015AAA]/20 transition-colors cursor-pointer border-none"
        >
          <ChevronsUpDown size={14} />
          <span>{allOpen ? "Collapse All" : "Expand All"}</span>
        </button>
      </div>

      <div className="space-y-3">
        {items.map((faq, idx) => {
          const isOpen = openIndexes.has(idx);
          const contentId = `faq-content-${idx}`;
          const buttonId = `faq-button-${idx}`;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? "bg-white border-[#015AAA]/30 shadow-sm" : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleIndex(idx)}
                className="w-full text-left p-5 flex items-start justify-between gap-4 bg-transparent border-none cursor-pointer outline-none group"
              >
                <span className="font-bold text-slate-900 text-base sm:text-lg flex items-start gap-2.5 group-hover:text-[#015AAA] transition-colors leading-snug">
                  <span className="text-[#015AAA] font-bold text-sm bg-[#015AAA]/10 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                    Q{idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </span>
                <span className="p-1 rounded-lg bg-slate-100 group-hover:bg-[#015AAA]/10 text-slate-500 group-hover:text-[#015AAA] transition-all shrink-0 mt-0.5">
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              {isOpen ? (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 pt-1 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-slate-100"
                >
                  <p className="m-0 pl-9">{faq.answer}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
