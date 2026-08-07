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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="h-full flex flex-col"
    >
      <Link
        to={targetUrl}
        className="group relative rounded-2xl bg-white border border-slate-100 hover:border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden text-left no-underline"
      >
        <div className="relative overflow-hidden bg-slate-100 aspect-[16/9] w-full shrink-0">
          {post.mediaSlug ? (
            <ResponsivePicture
              slug={post.mediaSlug}
              alt={post.featuredImage?.alt || post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : post.featuredImage ? (
            <picture>
              {post.featuredImage.webpSrc ? (
                <source type="image/webp" srcSet={post.featuredImage.webpSrc} />
              ) : null}
              <img
                src={post.featuredImage.src}
                alt={post.featuredImage.alt}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </picture>
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
              No image
            </div>
          )}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block nst-meta font-bold text-[#015AAA] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-4 text-slate-400 nst-meta font-medium mb-3">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-[#015AAA]" />
              {post.date}
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-[#015AAA]" />
              {post.readTime}
            </span>
          </div>

          <h3 className="nst-h4 text-slate-900 mb-2.5 group-hover:text-[#015AAA] transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          <p className="nst-small text-slate-500 mb-6 flex-1 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
            <span className="nst-small font-bold text-[#015AAA] inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
              Read article
              <ArrowRight size={15} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
});
