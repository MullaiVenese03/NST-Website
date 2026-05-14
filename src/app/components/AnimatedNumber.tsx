import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: string;
  className?: string;
  style?: CSSProperties;
  durationMs?: number;
};

function parseNumberToken(value: string) {
  // Keep 24/7 static per design request.
  if (value.includes("24/7")) return null;

  const match = value.match(/^([^\d+-]*)([+-]?\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numberToken, suffix] = match;
  const hasComma = numberToken.includes(",");
  const decimalPart = numberToken.split(".")[1];
  const decimals = decimalPart ? decimalPart.length : 0;
  const unsigned = numberToken.replace(/[,+-]/g, "");
  const minIntegerDigits = decimals === 0 && unsigned.startsWith("0") ? unsigned.length : 1;
  const numeric = Number(numberToken.replace(/,/g, ""));
  if (Number.isNaN(numeric)) return null;

  return { prefix, suffix, numeric, hasComma, decimals, minIntegerDigits };
}

function formatNumber(
  value: number,
  decimals: number,
  useComma: boolean,
  minIntegerDigits: number
) {
  if (useComma) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      minimumIntegerDigits: minIntegerDigits,
    });
  }

  if (decimals > 0) return value.toFixed(decimals);
  return String(Math.round(value)).padStart(minIntegerDigits, "0");
}

export default function AnimatedNumber({
  value,
  className,
  style,
  durationMs = 1200,
}: AnimatedNumberProps) {
  const parsed = useMemo(() => parseNumberToken(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || !parsed) return;

    const start = performance.now();
    let frame = 0;

    const tick = (ts: number) => {
      const elapsed = ts - start;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, parsed, durationMs]);

  if (!parsed) {
    return (
      <span ref={ref} className={className} style={style}>
        {value}
      </span>
    );
  }

  const current = parsed.numeric * progress;
  const formatted = formatNumber(
    current,
    parsed.decimals,
    parsed.hasComma,
    parsed.minIntegerDigits
  );

  return (
    <span ref={ref} className={className} style={style}>
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  );
}
