import { useState, useEffect, useRef } from "react";
import { List, ChevronDown } from "lucide-react";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface BlogTableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function BlogTableOfContents({ items, className = "" }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  // Refs for auto-scrolling the active TOC item into view inside the TOC list
  const desktopListRef = useRef<HTMLOListElement>(null);
  const mobileListRef = useRef<HTMLOListElement>(null);
  const activeItemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  useEffect(() => {
    if (!items.length) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      let currentId = items[0]?.id || "";

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            currentId = item.id;
          }
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  // Auto-scroll the active TOC item into view inside the TOC list container
  useEffect(() => {
    if (!activeId) return;
    const activeEl = activeItemRefs.current.get(activeId);
    if (!activeEl) return;

    // Desktop list
    if (desktopListRef.current) {
      const list = desktopListRef.current;
      const itemTop = activeEl.offsetTop;
      const itemBottom = itemTop + activeEl.offsetHeight;
      const listScrollTop = list.scrollTop;
      const listHeight = list.clientHeight;

      if (itemTop < listScrollTop) {
        list.scrollTo({ top: itemTop - 8, behavior: "smooth" });
      } else if (itemBottom > listScrollTop + listHeight) {
        list.scrollTo({ top: itemBottom - listHeight + 8, behavior: "smooth" });
      }
    }

    // Mobile list (only when open)
    if (mobileListRef.current) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeId]);

  if (!items.length) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -105;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsOpenMobile(false);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  // Helper to register/unregister active item refs
  const setItemRef = (id: string) => (node: HTMLLIElement | null) => {
    if (node) {
      activeItemRefs.current.set(id, node);
    } else {
      activeItemRefs.current.delete(id);
    }
  };

  return (
    <nav
      aria-label="Table of Contents"
      className={`rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 backdrop-blur-sm shadow-xs ${className}`}
    >
      {/* Mobile Collapsible Header (< lg) */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="w-full flex items-center justify-between gap-2 text-left font-bold text-slate-900 nst-ui border-none bg-transparent cursor-pointer p-0"
          aria-expanded={isOpenMobile}
        >
          <span className="flex items-center gap-2 text-[#015AAA]">
            <List size={18} />
            <span>Table of Contents</span>
          </span>
          <ChevronDown
            size={18}
            className={`text-slate-500 transition-transform duration-200 ${isOpenMobile ? "rotate-180" : ""}`}
          />
        </button>

        {isOpenMobile ? (
          <ol ref={mobileListRef} className="mt-4 pt-3 border-t border-slate-200/60 list-none m-0 p-0 flex flex-col gap-2 max-h-80 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li
                  key={item.id}
                  ref={setItemRef(item.id)}
                  className="m-0"
                  style={{ paddingLeft: item.level === 3 ? "1rem" : "0rem" }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className={`block py-1.5 px-2 rounded-lg text-sm no-underline transition-colors ${
                      isActive
                        ? "bg-[#015AAA]/10 text-[#015AAA] font-bold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ol>
        ) : null}
      </div>

      {/* Desktop View (>= lg) */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-2 mb-4 text-[#015AAA] font-bold text-xs tracking-wider uppercase">
          <List size={16} />
          <span>Table of Contents</span>
        </div>
        <ol ref={desktopListRef} className="list-none m-0 p-0 flex flex-col gap-1 max-h-[calc(100vh-140px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-1">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                ref={setItemRef(item.id)}
                className="m-0"
                style={{ paddingLeft: item.level === 3 ? "0.85rem" : "0rem" }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`block py-1.5 px-2.5 rounded-lg text-xs leading-relaxed no-underline transition-all ${
                    isActive
                      ? "bg-[#015AAA]/10 text-[#015AAA] font-bold border-l-2 border-[#015AAA]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

