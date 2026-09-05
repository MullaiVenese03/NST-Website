import type { CSSProperties } from "react";
import {
  buildSrcSet,
  getMedia,
  getMediaDimensions,
  sizesForProfile,
  type MediaProfile,
  type MediaSlug,
} from "../utils/media";

export type ResponsivePictureProps = {
  slug: MediaSlug;
  alt: string;
  className?: string;
  pictureClassName?: string;
  style?: CSSProperties;
  sizes?: string;

  priority?: boolean;
  profile?: MediaProfile;
};

export function ResponsivePicture({
  slug,
  alt,
  className,
  pictureClassName,
  style,
  sizes: sizesOverride,
  priority = false,
  profile,
}: ResponsivePictureProps) {
  const entry = getMedia(slug);
  const resolvedProfile = profile ?? (entry.profile as MediaProfile);
  const sizes = sizesForProfile(resolvedProfile, sizesOverride);

  const webpSrcSet = buildSrcSet(entry.sources.webp);
  const avifSources = entry.sources.avif;
  const avifSrcSet =
    avifSources && Object.keys(avifSources).length > 0 ? buildSrcSet(avifSources) : null;
  const defaultAvif = "defaultAvif" in entry ? entry.defaultAvif : undefined;

  const dimensions = getMediaDimensions(entry);

  return (
    <picture className={pictureClassName}>
      {avifSrcSet && defaultAvif ? (
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      ) : null}
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={entry.defaultSrc}
        alt={alt}
        width={dimensions?.width}
        height={dimensions?.height}
        className={className}
        style={style}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchpriority: "high" } : {})}
      />
    </picture>
  );
}
