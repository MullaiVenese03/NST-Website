import { useEffect, useRef, useState } from "react";
import { HERO_VIDEO_URL } from "../utils/media";

const mediaClass = "absolute inset-0 h-full w-full object-cover object-center";

const mediaFrameClass = "absolute inset-0 h-full w-full";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function HeroBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Defer video stream initialization so it does not contend with critical path CSS, fonts, and LCP
  useEffect(() => {
    if (reducedMotion) return;

    // Check for Save-Data header
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;

    const startVideo = () => {
      setVideoSrc(HERO_VIDEO_URL);
    };

    if ("requestIdleCallback" in window) {
      const handle = (
        window as Window & {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback(startVideo, { timeout: 2000 });
      return () => {
        if ("cancelIdleCallback" in window) {
          (
            window as Window & { cancelIdleCallback: (id: number) => void }
          ).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(startVideo, 350);
      return () => clearTimeout(timer);
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!videoSrc) return;

    const video = videoRef.current;
    if (!video) return;

    // Mobile WebKit (iOS Safari) requires explicit DOM properties for inline autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const onReady = () => setVideoReady(true);
    const play = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(onReady).catch(() => {
          // Autoplay policy prevented playback. Lightweight poster remains visible.
        });
      }
    };

    video.addEventListener("playing", onReady, { once: true });
    video.addEventListener("canplay", play, { once: true });

    if (video.readyState >= 3) {
      onReady();
      play();
    }

    return () => {
      video.removeEventListener("playing", onReady);
      video.removeEventListener("canplay", play);
    };
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 z-0 m-0 p-0 overflow-hidden bg-white" aria-hidden>
      <div className={`${mediaFrameClass} overflow-hidden bg-white`}>
        {/* Lightweight, responsive poster image appears immediately without blocking */}
        <picture
          className={`${mediaClass} transition-opacity duration-700 ease-out ${
            videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <source
            media="(max-width: 640px)"
            srcSet="/media/hero-poster/hero-poster-640.webp"
            type="image/webp"
          />
          <img
            src="/media/hero-poster/hero-poster-1280.webp"
            alt=""
            className="h-full w-full object-cover object-center"
            decoding="async"
          />
        </picture>

        {!reducedMotion && videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src={videoSrc}
            poster="/media/hero-poster/hero-poster-1280.webp"
            className={`${mediaClass} transition-opacity duration-700 ease-out ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </div>
  );
}
