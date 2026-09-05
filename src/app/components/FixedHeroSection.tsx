const GPU_LAYER = {
  willChange: "transform, opacity",
  transform: "translateZ(0)",
} as const;

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

export default function FixedHeroSection() {
  return (
    <div
      className="flex w-full max-w-[min(100%,44rem)] flex-col items-center gap-8 text-center md:max-w-3xl md:items-start md:gap-6 md:text-left"
      style={GPU_LAYER}
    >
      <h1
        className="nst-h1-hero max-w-full text-gray-900"
      >
        <span className="flex flex-col gap-1">
          <span>
            <span className="text-[#015aaa]">One</span> Entry.
          </span>
          <span>
            <span className="text-[#015aaa]">One</span> Device.
          </span>
          <span>
            <span className="text-[#015aaa]">One</span> Purpose.
          </span>
        </span>
      </h1>

      <p className="nst-body-sm max-w-xl text-gray-600">
        Cybersecurity and IT solutions built to protect what matters most - your data, your systems,
        your future.
      </p>

      <div className="nst-small flex flex-wrap items-center justify-center gap-2 text-gray-500 md:justify-start">
        <ShieldIcon className="h-5 w-5 shrink-0 text-[#015aaa]" />
        <span>Trusted by enterprises Worldwide</span>
      </div>
    </div>
  );
}
