import FixedHeroSection from "./FixedHeroSection";
import heroVideo from "../../assets/Hero-Background-Video.mp4";

export default function EnhancedHeroSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center bg-white">
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
      <div className="relative z-10 w-full min-h-screen max-w-[1440px] m-[50px] px-[20px] flex items-center">
        <div className="w-full">
          <FixedHeroSection />
        </div>
      </div>
    </div>
  );
}
