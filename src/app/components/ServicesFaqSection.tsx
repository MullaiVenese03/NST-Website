import { useId } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "../../seo/schemas/faqSchema";

type ServicesFaqSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  items: readonly FaqItem[] | FaqItem[];
};

export function ServicesFaqSection({
  id = "faq",
  title = "Frequently asked questions",
  subtitle = "Straight answers about how we work with teams and institutions.",
  items,
}: ServicesFaqSectionProps) {
  const headingId = useId();

  return (
    <section
      id={id}
      className="relative w-full bg-white overflow-hidden py-16 md:py-20 px-8 md:px-14 lg:px-20 border-t border-slate-100"
      aria-labelledby={headingId}
    >
      <motion.div
        className="max-w-[1000px] mx-auto"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <p className="nst-eyebrow font-bold text-[#015AAA] m-0 mb-2">FAQ</p>
        <h2
          id={headingId}
          className="nst-h2 text-slate-900 m-0 mb-2"
        >
          {title}
        </h2>
        <p className="nst-body text-slate-600 m-0 mb-8 max-w-2xl">{subtitle}</p>

        <motion.div
          className="flex flex-col gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {items.map((item) => (
            <motion.div
              key={item.question}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
            >
              <details className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 open:shadow-sm open:border-[#015AAA]/25 transition-shadow duration-200">
                <summary className="nst-h4 cursor-pointer list-none text-slate-900 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden min-h-[44px]">
                  <span className="leading-snug">{item.question}</span>
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#015AAA]/10 text-[#015AAA] shrink-0 group-open:bg-[#015AAA] group-open:text-white transition-colors duration-200">
                    <ChevronDown
                      className="w-5 h-5 group-open:rotate-180 transition-transform duration-200"
                      aria-hidden
                    />
                  </span>
                </summary>
                <p className="nst-body-sm mt-3 text-slate-600 m-0 pb-1 border-t border-slate-100 pt-3">
                  {item.answer}
                </p>
              </details>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
