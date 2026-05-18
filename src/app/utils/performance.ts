import { useEffect, useState } from "react";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

function prefersLightExperience(): boolean {
  if (typeof window === "undefined") return false;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const saveData = Boolean(connection?.saveData);
  const slowNetwork = connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const lowMemory = Boolean(deviceMemory && deviceMemory < 4);
  return narrow || reducedMotion || saveData || slowNetwork || lowMemory;
}


export function useLightExperience(): boolean {
  const [light, setLight] = useState(prefersLightExperience);

  useEffect(() => {
    const update = () => setLight(prefersLightExperience());
    const mq = window.matchMedia("(max-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);
    motion.addEventListener("change", update);
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    connection?.addEventListener?.("change", update);
    return () => {
      mq.removeEventListener("change", update);
      motion.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  return light;
}


export function useMotionEnabled(): boolean {
  return !useLightExperience();
}
