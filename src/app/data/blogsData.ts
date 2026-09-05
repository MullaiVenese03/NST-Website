import type { MediaSlug } from "../utils/media";
import type { TocItem } from "../components/BlogTableOfContents";
import { blogPostDataSovereigntyAI } from "./blogs/dataSovereigntyAI";
import { blogPostRansomwareDataProtection } from "./blogs/ransomwareDataProtection";
import { blogPostAiAgentsSecurity } from "./blogs/aiAgentsEnterpriseDataSecurity";
import { blogPostOne } from "./blogs/howToStartCareerCybersecurity";
import { blogPostShadowAiAgents } from "./blogs/shadowAiAgents";
import { blogPostAiAgentIdentity } from "./blogs/aiAgentIdentityDataAccess";

export type BlogCategory =
  | "All Articles"
  | "Cybersecurity"
  | "Cybersecurity"
  | "Cloud & Web"
  | "Engineering";

export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  profileUrl?: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogYouTubeInfo {
  title: string;
  url: string;
  embedUrl: string;
  thumbnailUrl?: string;
  description?: string;
  aspectRatio?: string;
}

export interface BlogCtaInfo {
  statement: string;
  description: string;
  primaryActionText: string;
  primaryActionUrl: string;
  secondaryActionText?: string;
  secondaryActionUrl?: string;
}

export type TextBlock = { type: "p"; text: string };
export type HeadingBlock = { type: "h3" | "h4"; id: string; title: string };
export type QuoteBlock = { type: "quote"; text: string; label?: string };
export type CalloutBlock = {
  type: "callout";
  variant?: "info" | "warning" | "danger" | "success";
  title?: string;
  text: string;
};
export type ListBlock = { type: "list"; style?: "unordered" | "ordered"; items: string[] };
export type DiagramBlock = { type: "diagram"; title?: string; content: string };
export type TableBlock = { type: "table"; headers: string[]; rows: string[][] };
export type FaqBlock = { type: "faq"; items: BlogFaqItem[] };
export type VideoBlock = { type: "video"; video: BlogYouTubeInfo };
export type CtaBlock = { type: "cta"; cta: BlogCtaInfo };
export type SourcesBlock = {
  type: "sources";
  title?: string;
  items: { id: number; text: string; url: string }[];
};
export type ImageBlock = {
  type: "image";
  src: string;
  webpSrc?: string;
  avifSrc?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
};

export type ArticleBlock =
  | TextBlock
  | HeadingBlock
  | QuoteBlock
  | CalloutBlock
  | ListBlock
  | DiagramBlock
  | TableBlock
  | FaqBlock
  | VideoBlock
  | CtaBlock
  | SourcesBlock
  | ImageBlock;

export interface ArticleSection {
  id: string;
  title: string;
  level: 2;
  blocks: ArticleBlock[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  metaDescription: string;
  excerpt: string;
  category: "Cybersecurity" | "Cybersecurity" | "Cloud & Web" | "Engineering";
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  date: string;
  publishedIsoDate: string;
  updatedDate?: string;
  updatedIsoDate?: string;
  readTime: string;
  mediaSlug?: MediaSlug;
  featuredImage?: {
    src: string;
    webpSrc?: string;
    alt: string;
    width: number;
    height: number;
  };
  author: BlogAuthor;
  youtubeVideo?: BlogYouTubeInfo;
  faqs?: BlogFaqItem[];
  cta?: BlogCtaInfo;
  sections?: ArticleSection[];
  toc?: TocItem[];
}

export const BLOG_POSTS: BlogPost[] = [
  blogPostDataSovereigntyAI,
  blogPostAiAgentIdentity,
  blogPostShadowAiAgents,
  blogPostRansomwareDataProtection,
  blogPostAiAgentsSecurity,
  blogPostOne,
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, count);
}

export function getPostToc(post: BlogPost): TocItem[] {
  if (post.toc && post.toc.length > 0) {
    return post.toc;
  }
  const items: TocItem[] = [];
  if (post.sections) {
    for (const section of post.sections) {
      items.push({ id: section.id, title: section.title, level: 2 });
      for (const block of section.blocks) {
        if (block.type === "h3") {
          items.push({ id: block.id, title: block.title, level: 3 });
        }
      }
    }
  }
  return items;
}
