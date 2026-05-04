import FixedHeroSection from "./FixedHeroSection";
// @ts-ignore
import heroVideo from "../../assets/Hero-Background-Video.mp4";

export default function EnhancedHeroSection() {
  return (
    <div className="relative w-full overflow-hidden flex flex-col justify-center bg-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Content Container */}
      <div className="relative z-10 w-full min-h-screen max-w-[1440px] mx-auto px-[20px] pt-20 flex items-center">
        <div className="w-full">
          <FixedHeroSection />
        </div>
      </div>
    </div>
  );
}
