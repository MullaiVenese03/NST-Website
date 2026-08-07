import type { MediaSlug } from "../utils/media";
import { blogPostOne } from "./blogs/howToStartCareerCybersecurity";

export type BlogCategory = "All Articles" | "Cybersecurity" | "Cloud & Web" | "Engineering";

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

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  metaDescription: string;
  excerpt: string;
  category: "Cybersecurity" | "Cloud & Web" | "Engineering";
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
  content?: string[];
}

export const BLOG_POSTS: BlogPost[] = [blogPostOne];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, count);
}
