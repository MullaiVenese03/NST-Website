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
  mode?: "all" | "desktop-only" | "mobile-only";
}

export function BlogTableOfContents({
  items,
  className = "",
  mode = "all",
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  const desktopListRef = useRef<HTMLOListElement>(null);
  const activeItemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  // Robust IntersectionObserver-based Scrollspy
  useEffect(() => {
    if (!items.length || typeof window === "undefined") return;

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!headingElements.length) return;

    // Use IntersectionObserver with a top offset matching the sticky navbar
    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible headings
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Choose the one highest in the viewport
          const topEntry = visibleEntries.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "-90px 0px -65% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    // Fallback: Check initial position on mount/scroll
    const handleScrollFallback = () => {
      const scrollPos = window.scrollY + 120;
      let currentId = items[0]?.id || "";

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementDocTop = rect.top + window.scrollY;
          if (scrollPos >= elementDocTop - 40) {
            currentId = item.id;
          }
        }
      }
      if (currentId) setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScrollFallback, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, [items]);

  // Gently auto-scroll ONLY the desktop TOC list container (NEVER touches window/page scroll)
  useEffect(() => {
    if (!activeId) return;
    const activeEl = activeItemRefs.current.get(activeId);
    if (!activeEl || !desktopListRef.current) return;

    const list = desktopListRef.current;
    const itemTop = activeEl.offsetTop;
    const itemBottom = itemTop + activeEl.offsetHeight;
    const listScrollTop = list.scrollTop;
    const listHeight = list.clientHeight;

    if (itemTop < listScrollTop) {
      list.scrollTo({ top: itemTop - 6, behavior: "smooth" });
    } else if (itemBottom > listScrollTop + listHeight) {
      list.scrollTo({ top: itemBottom - listHeight + 6, behavior: "smooth" });
    }
  }, [activeId]);

  if (!items.length) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const navOffset = -110;
      const targetY = el.getBoundingClientRect().top + window.pageYOffset + navOffset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      setActiveId(id);
      setIsOpenMobile(false);
      window.history.replaceState(null, "", `#${id}`);
    }
  };

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
      className={`rounded-2xl border border-slate-200/80 bg-slate-50/70 backdrop-blur-sm shadow-xs ${className}`}
    >
      {/* Mobile Collapsible Header */}
      {mode !== "desktop-only" && (
        <div className={mode === "all" ? "lg:hidden" : ""}>
          <button
            type="button"
            onClick={() => setIsOpenMobile((prev) => !prev)}
            className="w-full flex items-center justify-between gap-2 text-left font-bold text-slate-900 nst-ui border-none bg-transparent cursor-pointer p-4"
            aria-expanded={isOpenMobile}
          >
            <span className="flex items-center gap-2 text-[#015AAA] text-sm">
              <List size={16} />
              <span>Table of Contents</span>
            </span>
            <ChevronDown
              size={16}
              className={`text-slate-500 transition-transform duration-200 ${
                isOpenMobile ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpenMobile && (
            <ol className="px-4 pb-4 pt-1 border-t border-slate-200/60 list-none m-0 flex flex-col gap-1.5 max-h-80 overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li
                    key={item.id}
                    className="m-0"
                    style={{ paddingLeft: item.level === 3 ? "0.85rem" : "0rem" }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      className={`block py-1 px-2 rounded-lg text-xs leading-relaxed no-underline transition-colors ${
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
          )}
        </div>
      )}

      {/* Desktop View */}
      {mode !== "mobile-only" && (
        <div className={mode === "all" ? "hidden lg:block p-4" : "p-4"}>
          <div className="flex items-center gap-2 mb-3 text-[#015AAA] font-bold text-xs tracking-wider uppercase">
            <List size={14} />
            <span>Table of Contents</span>
          </div>
          <ol
            ref={desktopListRef}
            className="list-none m-0 p-0 flex flex-col gap-0.5 max-h-[calc(100vh-240px)] overflow-y-auto overscroll-contain pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li
                  key={item.id}
                  ref={setItemRef(item.id)}
                  className="m-0"
                  style={{ paddingLeft: item.level === 3 ? "0.75rem" : "0rem" }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className={`block py-1.5 px-2 rounded-lg text-xs leading-relaxed no-underline transition-all ${
                      isActive
                        ? "bg-[#015AAA]/10 text-[#015AAA] font-bold border-l-2 border-[#015AAA]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </nav>
  );
}
