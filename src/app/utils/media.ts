import manifest from "../data/mediaManifest.json";

export type MediaSlug = keyof typeof manifest;

export type MediaProfile = "hero" | "icon" | "logo" | "testimonial" | "content" | "step";

export type MediaEntry = (typeof manifest)[MediaSlug];

type MediaWithDimensions = {
  width?: number;
  height?: number;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
};

export function getMedia(slug: MediaSlug): MediaEntry {
  return manifest[slug];
}

export function getMediaDimensions(entry: MediaEntry): { width: number; height: number } | undefined {
  const e = entry as MediaEntry & MediaWithDimensions;
  const width = e.width ?? e.intrinsicWidth;
  const height = e.height ?? e.intrinsicHeight;
  if (width == null || height == null) return undefined;
  return { width, height };
}

export function buildSrcSet(sources: Record<string, string>): string {
  return Object.entries(sources)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([w, url]) => `${url} ${w}w`)
    .join(", ");
}

const DEFAULT_SIZES: Record<MediaProfile, string> = {
  hero: "(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 1280px",
  icon: "(max-width: 640px) 140px, 240px",
  logo: "128px",
  testimonial: "(max-width: 640px) 92vw, 420px",
  content: "(max-width: 768px) 100vw, 800px",
  step: "(max-width: 640px) 120px, 200px",
};

export function sizesForProfile(profile: MediaProfile, override?: string): string {
  return override ?? DEFAULT_SIZES[profile];
}

export const BRAND_MARK_URL =
  "/media/NST_-_Favicon_[Dark_Transparent]/NST_-_Favicon_[Dark_Transparent]-480.webp";

export const HERO_POSTER_MOBILE = "/media/hero-poster/hero-poster-640.webp";
export const HERO_VIDEO_URL = "/media/hero-bg-video.mp4";
/** Hero logo / wolf assemble animation (same asset as hero video). */
export const LOGO_ASSEMBLE_ANIMATION_URL = HERO_VIDEO_URL;
