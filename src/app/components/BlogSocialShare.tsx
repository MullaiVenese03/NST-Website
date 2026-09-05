import { useState, useCallback } from "react";
import { Linkedin, Copy, Check, Share2 } from "lucide-react";

interface BlogSocialShareProps {
  url: string;
  title: string;
  description?: string;
  layout?: "vertical" | "horizontal";
  className?: string;
}

// Crisp X (formerly Twitter) SVG icon
function XIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function BlogSocialShare({
  url,
  title,
  description = "",
  layout = "vertical",
  className = "",
}: BlogSocialShareProps) {
  const [copied, setCopied] = useState(false);

  // Ensure full canonical URL for sharing
  const shareUrl = typeof window !== "undefined" && url.startsWith("/")
    ? `${window.location.origin}${url}`
    : url;

  const handleCopyLink = useCallback(async () => {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }, [shareUrl]);

  const handleNativeShare = useCallback(async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch {
        // User dismissed share dialog
      }
    } else {
      handleCopyLink();
    }
  }, [title, description, shareUrl, handleCopyLink]);

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;

  if (layout === "horizontal") {
    return (
      <aside
        aria-label="Share this article"
        className={`flex flex-wrap items-center gap-2.5 py-3 ${className}`}
      >
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
          Share:
        </span>

        {/* LinkedIn Button */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#0077B5]/10 text-slate-700 hover:text-[#0077B5] border border-slate-200 hover:border-[#0077B5]/30 text-xs font-semibold transition-all no-underline"
        >
          <Linkedin size={14} className="text-inherit" />
          <span>LinkedIn</span>
        </a>

        {/* X / Twitter Button */}
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-900/10 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-900/30 text-xs font-semibold transition-all no-underline"
        >
          <XIcon size={12} className="text-inherit" />
          <span>Post</span>
        </a>

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={copied ? "Link copied" : "Copy article link"}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
            copied
              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
              : "bg-slate-100 hover:bg-[#015AAA]/10 text-slate-700 hover:text-[#015AAA] border-slate-200 hover:border-[#015AAA]/30"
          }`}
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy link</span>
            </>
          )}
        </button>

        {/* Mobile Native Share (if supported) */}
        {typeof window !== "undefined" && "share" in navigator && (
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="More sharing options"
            className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#015AAA]/10 text-[#015AAA] border border-[#015AAA]/20 text-xs font-semibold transition-all cursor-pointer"
          >
            <Share2 size={13} />
            <span>More</span>
          </button>
        )}
      </aside>
    );
  }

  // Vertical Desktop Floating Dock
  return (
    <aside
      aria-label="Share this article"
      className={`flex flex-col items-center gap-2 p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-sm ${className}`}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-1">
        Share
      </span>

      {/* LinkedIn */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-[#0077B5] hover:bg-[#0077B5]/10 border border-transparent hover:border-[#0077B5]/20 transition-all no-underline"
      >
        <Linkedin size={18} />
      </a>

      {/* X / Twitter */}
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        title="Share on X"
        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-slate-900/10 border border-transparent hover:border-slate-900/20 transition-all no-underline"
      >
        <XIcon size={16} />
      </a>

      {/* Copy Link */}
      <div className="relative group">
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={copied ? "Link copied" : "Copy link to clipboard"}
          title={copied ? "Copied!" : "Copy link"}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
            copied
              ? "bg-emerald-50 text-emerald-600 border-emerald-300"
              : "text-slate-600 hover:text-[#015AAA] hover:bg-[#015AAA]/10 border-transparent hover:border-[#015AAA]/20"
          }`}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>

        {/* Feedback tooltip */}
        <div
          role="status"
          className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-medium whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 ${
            copied ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
          }`}
        >
          {copied ? "Link copied!" : "Copy link"}
        </div>
      </div>
    </aside>
  );
}
