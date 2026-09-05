import { memo } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { ResponsivePicture } from "./ResponsivePicture";
import type { BlogPost } from "../data/blogsData";
import { VIEWPORT_ONCE } from "../utils/motionPresets";

export interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard = memo(function BlogCard({ post, index }: BlogCardProps) {
  const targetUrl = `/blog/${post.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.35, delay: (index % 3) * 0.06, ease: "easeOut" }}
      className="h-full flex flex-col"
    >
      <Link
        to={targetUrl}
        className="group relative rounded-2xl bg-white border border-slate-200/80 hover:border-[#015AAA]/40 shadow-xs hover:shadow-xl hover:shadow-[#015AAA]/8 transition-all duration-300 flex flex-col h-full overflow-hidden text-left no-underline hover:-translate-y-1"
      >
        {/* Thumbnail Banner - Preserves 100% uncropped 16:9 thumbnail */}
        <div className="relative overflow-hidden bg-slate-950 aspect-[16/9] w-full shrink-0 flex items-center justify-center">
          {post.mediaSlug ? (
            <ResponsivePicture
              slug={post.mediaSlug}
              alt={post.featuredImage?.alt || post.title}
              pictureClassName="w-full h-full flex items-center justify-center"
              className="w-full h-full object-contain object-center block"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : post.featuredImage ? (
            <picture className="w-full h-full flex items-center justify-center">
              {post.featuredImage.webpSrc && (
                <source type="image/webp" srcSet={post.featuredImage.webpSrc} />
              )}
              <img
                src={post.featuredImage.src}
                alt={post.featuredImage.alt}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain object-center block"
              />
            </picture>
          ) : (
            <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-400 text-xs">
              No image
            </div>
          )}

          {/* Subtle dark vignette on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Category Pill Overlay */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center text-[11px] font-bold text-[#015AAA] bg-white/95 backdrop-blur-md px-3 py-0.5 rounded-full shadow-xs border border-white/60">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0">
          {/* Metadata Row: Date & Reading Time */}
          <div className="flex items-center gap-3 text-slate-400 text-[11px] sm:text-xs font-medium mb-2.5">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} className="text-[#015AAA]" />
              {post.date}
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} className="text-[#015AAA]" />
              {post.readTime}
            </span>
          </div>

          {/* Title - Strong Visual Hierarchy */}
          <h3 className="font-heading text-[15px] sm:text-[16px] font-bold text-slate-900 leading-snug group-hover:text-[#015AAA] transition-colors duration-200 mb-2 line-clamp-2 m-0">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-slate-500 font-body leading-relaxed mb-4 flex-1 line-clamp-2 m-0">
            {post.excerpt}
          </p>

          {/* Footer: Author & Read Article Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
            {post.author ? (
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={22}
                  height={22}
                  className="w-5.5 h-5.5 rounded-full object-cover border border-slate-200 shrink-0"
                  loading="lazy"
                />
                <span className="text-[11px] sm:text-xs font-medium text-slate-600 truncate">
                  {post.author.name}
                </span>
              </div>
            ) : (
              <span />
            )}

            <span className="text-xs font-bold text-[#015AAA] inline-flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition-transform duration-200">
              Read article
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
});
