import React from "react";
import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import { BlogYouTubeEmbed } from "./BlogYouTubeEmbed";
import { BlogFaqAccordion } from "./BlogFaqAccordion";
import { BlogCta } from "./BlogCta";
import { BlogRoadmapTimeline } from "./BlogRoadmapTimeline";
import type { BlogPost, ArticleBlock, ArticleSection } from "../data/blogsData";

interface BlogArticleContentProps {
  post: BlogPost;
}

export function parseInlineMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  // Matches [text](url), **bold**, `code`, *italic*
  const pattern = /(\[(?:.*?)]\((?:.*?)\)|\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (!part) return null;

    // 1. Link: [label](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      const isExternal = url.startsWith("http://") || url.startsWith("https://");
      if (isExternal) {
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#015AAA] font-semibold underline hover:text-[#013566] inline-flex items-center gap-1 transition-colors"
          >
            <span>{label}</span>
            <ExternalLink size={13} className="shrink-0 inline text-[#015AAA]" />
          </a>
        );
      }
      return (
        <Link
          key={index}
          to={url}
          className="text-[#015AAA] font-semibold underline hover:text-[#013566] transition-colors"
        >
          {label}
        </Link>
      );
    }

    // 2. Bold: **text**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-slate-900">
          {parseInlineMarkdown(part.slice(2, -2))}
        </strong>
      );
    }

    // 3. Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-slate-100 text-[#015AAA] font-mono text-xs sm:text-sm border border-slate-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // 4. Italic: *text*
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="italic text-slate-800">
          {parseInlineMarkdown(part.slice(1, -1))}
        </em>
      );
    }

    return part;
  });
}

function RenderBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mb-5 text-slate-700 leading-[1.8] text-[17px]">
          {parseInlineMarkdown(block.text)}
        </p>
      );

    case "h3":
      return (
        <h3
          id={block.id}
          className="scroll-mt-28 nst-h3 text-slate-900 mt-10 mb-4 text-xl font-bold border-b border-slate-100 pb-1"
        >
          {parseInlineMarkdown(block.title)}
        </h3>
      );

    case "h4":
      return (
        <h4
          id={block.id}
          className="scroll-mt-28 nst-h4 text-slate-900 mt-8 mb-3 text-lg font-bold"
        >
          {parseInlineMarkdown(block.title)}
        </h4>
      );

    case "quote":
      return (
        <blockquote className="my-6 p-5 px-6 rounded-2xl bg-slate-50 border-l-4 border-[#015AAA] text-slate-800 text-base sm:text-lg font-medium shadow-xs">
          {block.label ? (
            <span className="block font-bold text-slate-900 mb-1">{block.label}</span>
          ) : null}
          <p className="m-0 leading-relaxed">{parseInlineMarkdown(block.text)}</p>
        </blockquote>
      );

    case "callout": {
      const isWarning = block.variant === "warning";
      const isDanger = block.variant === "danger";
      const isSuccess = block.variant === "success";

      let bgClass = "bg-[#015AAA]/5 border-[#015AAA] text-slate-900";
      if (isWarning) bgClass = "bg-amber-50 border-amber-500 text-amber-950";
      if (isDanger) bgClass = "bg-red-50 border-red-500 text-red-950";
      if (isSuccess) bgClass = "bg-emerald-50 border-emerald-500 text-emerald-950";

      return (
        <div className={`my-6 p-5 rounded-2xl border-l-4 shadow-xs text-base ${bgClass}`}>
          {block.title ? (
            <h4 className="font-bold mb-1 text-inherit text-lg">{block.title}</h4>
          ) : null}
          <p className="m-0 leading-relaxed">{parseInlineMarkdown(block.text)}</p>
        </div>
      );
    }

    case "list":
      if (block.style === "ordered") {
        return (
          <ol className="list-decimal pl-6 space-y-2 mb-6 text-slate-700 leading-relaxed text-[17px]">
            {block.items.map((item, idx) => (
              <li key={idx}>{parseInlineMarkdown(item)}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700 leading-relaxed text-[17px]">
          {block.items.map((item, idx) => (
            <li key={idx}>{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      );

    case "diagram":
      return (
        <div className="my-6 rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-sm text-slate-100">
          {block.title ? (
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800">
              {block.title}
            </div>
          ) : null}
          <pre className="font-mono text-xs sm:text-sm text-[#38bdf8] overflow-x-auto whitespace-pre leading-relaxed m-0">
            {block.content}
          </pre>
        </div>
      );

    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full text-left text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-slate-100/90 text-slate-900 font-bold border-b border-slate-200">
                {block.headers.map((h, idx) => (
                  <th key={idx} className="p-4 font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-4 leading-relaxed">
                      {parseInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "faq":
      return (
        <div className="my-8">
          <BlogFaqAccordion items={block.items} />
        </div>
      );

    case "video":
      return (
        <div className="my-8">
          <BlogYouTubeEmbed video={block.video} />
        </div>
      );

    case "cta":
      return (
        <div className="my-10">
          <BlogCta cta={block.cta} />
        </div>
      );

    case "sources":
      return (
        <div className="my-10 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80">
          <h3 className="nst-h3 text-slate-900 m-0 mb-4 text-xl font-bold">
            {block.title || "Sources & Further Reading"}
          </h3>
          <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-700 m-0">
            {block.items.map((item) => (
              <li key={item.id} className="leading-relaxed">
                <span className="text-slate-800 font-medium">{parseInlineMarkdown(item.text)} </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#015AAA] font-semibold underline hover:text-[#013566] inline-flex items-center gap-1 break-all"
                >
                  <span>{item.url}</span>
                  <ExternalLink size={12} className="shrink-0" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      );

    case "image":
      return (
        <figure className="my-8 sm:my-10 w-full flex flex-col items-center">
          <div className="w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-50">
            <picture className="w-full block">
              {block.avifSrc ? <source type="image/avif" srcSet={block.avifSrc} /> : null}
              {block.webpSrc ? <source type="image/webp" srcSet={block.webpSrc} /> : null}
              <img
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                loading={block.loading || "lazy"}
                decoding={block.loading === "eager" ? "sync" : "async"}
                className="w-full h-auto block object-contain"
              />
            </picture>
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-center text-xs sm:text-sm text-slate-500 font-medium px-2">
              {parseInlineMarkdown(block.caption)}
            </figcaption>
          ) : null}
        </figure>
      );

    default:
      return null;
  }
}

function RenderSection({ section }: { section: ArticleSection }) {
  return (
    <section id={section.id} className="scroll-mt-28 mb-12">
      <h2 className="nst-h2 text-slate-900 mb-6 pb-2 border-b border-slate-100 text-2xl sm:text-3xl">
        {section.title}
      </h2>
      {section.blocks.map((block, idx) => (
        <RenderBlock key={idx} block={block} />
      ))}
    </section>
  );
}

export function BlogArticleContent({ post }: BlogArticleContentProps) {
  if (post.sections && post.sections.length > 0) {
    return (
      <div className="w-full text-slate-800 font-body max-w-[760px] mx-auto text-[17px] leading-[1.8]">
        {post.sections.map((section) => (
          <RenderSection key={section.id} section={section} />
        ))}
      </div>
    );
  }

  // Fallback for legacy post if any
  return (
    <div className="w-full text-slate-800 font-body max-w-[760px] mx-auto text-[17px] leading-[1.8]">
      {post.youtubeVideo ? (
        <section id="watch-video" className="scroll-mt-28 mb-12">
          <BlogYouTubeEmbed video={post.youtubeVideo} />
        </section>
      ) : null}

      <section id="practical-roadmap" className="scroll-mt-28 mb-12">
        <BlogRoadmapTimeline />
      </section>

      {post.faqs && post.faqs.length > 0 ? (
        <section id="frequently-asked-questions" className="scroll-mt-28 mb-12">
          <BlogFaqAccordion items={post.faqs} />
        </section>
      ) : null}
    </div>
  );
}
