import { motion } from "motion/react";

// Partner logos from local assets (hash filenames match figma exports already in src/assets)
import imgThirukkuralTransportLogo from "../../assets/logo-thirukkural-transport.png";
import imgStJosephCollegeLogo from "../../assets/logo-st-joseph-college.png";
import imgSolamalaiCollegeLogo from "../../assets/logo-solamalai-college.png";
import imgDhanalakshmiSrinivasanCollegeLogo from "../../assets/logo-dhanalakshmi-srinivasan.png";
import imgAkshayaCollegeLogo from "../../assets/logo-akshaya-college.png";
import imgNsrLogo from "../../assets/logo-nsr.png";
import imgSgnlLogo from "../../assets/logo-sgnl.png";
import imgTwomileHeavyIndustriesLogo from "../../assets/logo-twomile-heavy-industries.png";
import imgRapidoLogo from "../../assets/logo-rapido.png";
import imgP2TaskLogo from "../../assets/logo-p2task.png";

const logos = [
  { src: imgThirukkuralTransportLogo, alt: "Thirukkural Transport" },
  { src: imgStJosephCollegeLogo, alt: "St. Joseph College" },
  { src: imgSolamalaiCollegeLogo, alt: "Solamalai College" },
  { src: imgDhanalakshmiSrinivasanCollegeLogo, alt: "Dhanalakshmi Srinivasan College" },
  { src: imgAkshayaCollegeLogo, alt: "Akshaya College" },
  { src: imgNsrLogo, alt: "NSR" },
  { src: imgSgnlLogo, alt: "SGNL" },
  { src: imgTwomileHeavyIndustriesLogo, alt: "Twomile Heavy Industries" },
  { src: imgRapidoLogo, alt: "Rapido" },
  { src: imgP2TaskLogo, alt: "P2Task" },
];

// Duplicate for seamless infinite loop
const allLogos = [...logos, ...logos];

export default function TrustedClientsSection() {
  return (
    <section className="w-full py-8 bg-white border-y border-gray-100 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
        {/* Left Heading */}
        <div className="flex-shrink-0 lg:w-[380px] text-center lg:text-left border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-6">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#015aaa] font-bold text-[11px] tracking-[0.15em] uppercase mb-1"
          >
            Our Partners
          </motion.p>


          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-black text-gray-900 leading-[1.1]"
            style={{ fontFamily: 'var(--font-family)' }}>
            Trusted by
            <br />
            <span style={{ color: '#015AAA' }}>Industry & Academia</span>
          </motion.p>
        </div>

        {/* Scrolling logos area */}
        <div className="flex-1 overflow-hidden h-[150px] relative w-full" >
          {/* Narrow fade overlays */}
          <div className="absolute left-0 top-0 h-full w-8 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 h-full w-8 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

          <motion.div
            className="flex h-[150px] items-center justify-center"
            style={{ gap: "40px" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {allLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                style={{ width: 80, height: 64 }}
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

