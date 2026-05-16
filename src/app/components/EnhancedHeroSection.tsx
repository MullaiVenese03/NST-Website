import FixedHeroSection from "./FixedHeroSection";
import HeroBackground from "./HeroBackground";

export default function EnhancedHeroSection() {
  return (
    <section
      className="relative flex min-h-dvh w-full flex-col overflow-hidden"
      aria-label="Hero"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col items-center justify-evenly px-4 pb-10 pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:px-5 md:items-start md:justify-center md:px-10 md:pb-16 md:pt-24 lg:px-[50px]">
        <FixedHeroSection />
      </div>
    </section>
  );
}
