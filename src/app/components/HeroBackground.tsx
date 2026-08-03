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

  useEffect(() => {
    if (reducedMotion) return;

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
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 z-0 m-0 p-0 overflow-hidden bg-white" aria-hidden>
      <div className={`${mediaFrameClass} overflow-hidden`}>
        {!reducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src={HERO_VIDEO_URL}
            className={`${mediaClass} transition-opacity duration-500 ease-out ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </div>
  );
}
