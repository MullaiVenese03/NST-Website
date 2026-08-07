import { memo } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ResponsivePicture } from "./ResponsivePicture";
import type { MediaSlug } from "../utils/media";
import { VIEWPORT_ONCE } from "../utils/motionPresets";
import { useLightExperience } from "../utils/performance";

export interface ServiceCardProps {
  to: string;
  mediaSlug: MediaSlug;
  title: string;
  description: string;
  index: number;
}

export const ServiceCard = memo(function ServiceCard({
  to,
  mediaSlug,
  title,
  description,
  index,
}: ServiceCardProps) {
  const light = useLightExperience();

  return (
    <motion.div
      initial={{ opacity: 0, y: light ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.35, delay: light ? 0 : (index % 4) * 0.05, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        to={to}
        className="group relative rounded-2xl bg-white border border-slate-100 hover:border-slate-200/90 shadow-sm hover:shadow transition-all duration-200 flex flex-col h-full overflow-hidden no-underline text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015AAA]/70 select-none"
      >
        <div className="pt-6 px-6 pb-2 flex items-center justify-center shrink-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto shrink-0">
            <div
              className={`absolute inset-0 rounded-full transition-transform duration-200 ease-out ${
                light ? "bg-blue-50/60 scale-90" : "bg-blue-50/50 scale-85 group-hover:scale-100"
              }`}
              aria-hidden
            />
            <ResponsivePicture
              slug={mediaSlug}
              alt={title}
              className="relative z-10 w-full h-full max-h-10 sm:max-h-12 object-contain object-center transition-transform duration-200 ease-out group-hover:scale-105"
              profile="icon"
            />
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 flex flex-col flex-1 min-w-0">
          <h3 className="nst-h4 text-slate-900 mb-2 group-hover:text-[#015AAA] transition-colors duration-200 break-words">
            {title}
          </h3>
          <p className="nst-small text-slate-500 flex-1 break-words">
            {description}
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#015AAA] to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left pointer-events-none"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
});
