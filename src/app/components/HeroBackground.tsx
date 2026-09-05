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

  // Defer loading video source until after initial paint & idle to prioritize critical LCP & fonts
  useEffect(() => {
    if (reducedMotion) return;

    // Check for Save-Data header or small mobile viewport
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;

    // Only load full video on desktop / tablet where it adds visual value without killing mobile data
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const loadVideo = () => {
      setVideoSrc(HERO_VIDEO_URL);
      cleanup();
    };

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", loadVideo);
      window.removeEventListener("mousemove", loadVideo);
      window.removeEventListener("touchstart", loadVideo);
    };

    window.addEventListener("scroll", loadVideo, { once: true, passive: true });
    window.addEventListener("mousemove", loadVideo, { once: true, passive: true });
    window.addEventListener("touchstart", loadVideo, { once: true, passive: true });

    // Fallback: load if user is idle on desktop for 5s
    timer = setTimeout(loadVideo, 5000);

    return cleanup;
  }, [reducedMotion]);

  useEffect(() => {
    if (!videoSrc) return;

    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setVideoReady(true);
    const play = () => {
      video.play().catch(() => {});
    };

    video.addEventListener("canplay", onReady, { once: true });
    video.addEventListener("loadeddata", play, { once: true });

    if (video.readyState >= 3) {
      onReady();
      play();
    }

    return () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", play);
    };
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 z-0 m-0 p-0 overflow-hidden bg-white" aria-hidden>
      <div className={`${mediaFrameClass} overflow-hidden`}>
        {!reducedMotion && videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src={videoSrc}
            className={`${mediaClass} transition-opacity duration-500 ease-out ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </div>
  );
}
