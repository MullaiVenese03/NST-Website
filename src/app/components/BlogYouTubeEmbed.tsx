import { useState } from "react";
import { Play, Youtube } from "lucide-react";
import type { BlogYouTubeInfo } from "../data/blogsData";

interface BlogYouTubeEmbedProps {
  video: BlogYouTubeInfo;
  className?: string;
}

export function BlogYouTubeEmbed({ video, className = "" }: BlogYouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const embedUrl = video.embedUrl || "https://www.youtube-nocookie.com/embed/FUEoWzIZliE?si=CeXY6AWJx3RDPSYF";
  const posterUrl = video.thumbnailUrl || "https://i.ytimg.com/vi/FUEoWzIZliE/maxresdefault.jpg";

  return (
    <div className={`my-8 w-full ${className}`}>
      {/* Video Section Header & Title Outside Thumbnail */}
      <div className="mb-4 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#015AAA] bg-[#015AAA]/10 px-3 py-1 rounded-full border border-[#015AAA]/20 mb-2.5">
          <Youtube size={14} className="text-red-600" />
          <span>Prefer watching?</span>
        </div>

        <h2 className="nst-h2 text-slate-900 text-xl sm:text-2xl font-bold leading-tight m-0 mb-2">
          Watch the Original Video
        </h2>

        <p className="text-slate-800 text-sm sm:text-base font-bold leading-relaxed m-0">
          {video.title}
        </p>
      </div>

      {/* 16:9 Clean Video Card with Centered Play Button ONLY */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-slate-200/80">
        {!isLoaded ? (
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            aria-label={`Play video: ${video.title}`}
            className="w-full h-full relative group cursor-pointer border-none p-0 bg-transparent block text-left outline-none"
          >
            <img
              src={posterUrl}
              alt={video.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-300 group-hover:scale-102"
            />
            {/* Centered Play Button ONLY - No Overlapping Title Text */}
            <div className="absolute inset-0 bg-slate-900/25 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
              <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#015AAA] text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#013566] transition-all duration-200">
                <Play size={28} className="ml-1 fill-white text-white" />
              </span>
            </div>
          </button>
        ) : (
          <iframe
            src={`${embedUrl}${embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
            title={video.title}
            className="w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>

      {/* Supporting Description Below Video Card - Left-aligned, non-italicized */}
      {video.description ? (
        <p className="mt-3 text-sm text-slate-600 font-normal leading-relaxed text-left max-w-2xl m-0">
          This video shares Rajiv Sharma&apos;s original cybersecurity learning journey and the experiences behind this guide.
        </p>
      ) : null}
    </div>
  );
}
