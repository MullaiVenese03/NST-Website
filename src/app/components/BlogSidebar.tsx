import { Link } from "react-router";
import { ArrowRight, ExternalLink, Sparkles, BookOpen, Clock } from "lucide-react";
import { BlogTableOfContents, type TocItem } from "./BlogTableOfContents";
import type { BlogPost } from "../data/blogsData";

interface BlogSidebarProps {
  post: BlogPost;
  tocItems: TocItem[];
  relatedPosts: BlogPost[];
  className?: string;
}

export function BlogSidebar({
  post,
  tocItems,
  relatedPosts,
  className = "",
}: BlogSidebarProps) {
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* 1. Quick Navigation / Table of Contents (Self-contained, non-trapping) */}
      {tocItems && tocItems.length > 0 && (
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
          <BlogTableOfContents
            items={tocItems}
            mode="desktop-only"
            className="border-none bg-transparent p-0"
          />
        </div>
      )}

      {/* 2. Contextual Sidebar CTA Widget */}
      {post.cta && (
        <aside
          aria-label="Highlighted service"
          className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#015AAA]/10 via-[#015AAA]/5 to-slate-50 border border-[#015AAA]/20 shadow-xs relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#015AAA]/10 text-[#015AAA] text-[10px] font-bold tracking-wider uppercase mb-2">
            <Sparkles size={11} />
            <span>NebulaSafeTech</span>
          </div>

          <h4 className="font-heading text-slate-900 text-sm font-bold leading-snug mb-1.5 m-0">
            {post.cta.statement}
          </h4>

          <p className="text-xs text-slate-600 font-body leading-relaxed mb-3 line-clamp-2 m-0">
            {post.cta.description}
          </p>

          <Link
            to={post.cta.primaryActionUrl}
            className="w-full py-2 px-3 rounded-lg bg-[#015AAA] hover:bg-[#013566] text-white text-xs font-semibold text-center inline-flex items-center justify-center gap-1.5 shadow-xs transition-all no-underline cursor-pointer"
          >
            <span>{post.cta.primaryActionText}</span>
            <ArrowRight size={13} />
          </Link>
        </aside>
      )}

      {/* 3. Recommended Articles (Compact preview with mini thumbnail) */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen size={12} className="text-[#015AAA]" />
              <span>Recommended</span>
            </span>
            <Link
              to="/blogs"
              className="text-[10px] font-bold text-[#015AAA] hover:underline no-underline"
            >
              All blogs →
            </Link>
          </div>

          <div className="flex flex-col divide-y divide-slate-100">
            {relatedPosts.slice(0, 3).map((rPost) => (
              <Link
                key={rPost.id}
                to={`/blog/${rPost.slug}`}
                className="py-3 first:pt-0 last:pb-0 group flex items-center gap-3 text-left no-underline"
              >
                {/* Mini Thumbnail - Preserves full uncropped image */}
                <div className="relative w-18 aspect-[16/9] shrink-0 rounded-lg overflow-hidden bg-slate-950 border border-slate-200/60 shadow-xs flex items-center justify-center">
                  {rPost.featuredImage ? (
                    <picture className="w-full h-full flex items-center justify-center">
                      {rPost.featuredImage.webpSrc && (
                        <source type="image/webp" srcSet={rPost.featuredImage.webpSrc} />
                      )}
                      <img
                        src={rPost.featuredImage.src}
                        alt={rPost.featuredImage.alt}
                        width={rPost.featuredImage.width}
                        height={rPost.featuredImage.height}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain object-center block"
                      />
                    </picture>
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-400 text-[10px]">
                      NST
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-bold text-[#015AAA] uppercase tracking-wider mb-0.5">
                    {rPost.category}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#015AAA] transition-colors leading-snug line-clamp-2 m-0 mb-1">
                    {rPost.title}
                  </h5>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Clock size={10} className="text-slate-400" />
                    <span>{rPost.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
