import { motion } from "motion/react";

import imgThirukkuralTransportLogo from "figma:asset/cae0543e4d40907e740964425ebb330b97abe22f.png";
import imgStJosephCollegeLogo from "figma:asset/e355fe2f1a3f31bcdfe0cd0d99f6f28dda47e72a.png";
import imgSolamalaiCollegeLogo from "figma:asset/d5f607418c370acbaa1f40116cb7f71ec15f7cb5.png";
import imgDhanalakshmiSrinivasanCollegeLogo from "figma:asset/05c41322d27468edf456953a87abfdd7ea362d4c.png";
import imgAkshayaCollegeLogo from "figma:asset/b4f771cbee9a12e39c116157c446004997e7dcfd.png";
import imgNsrLogo from "figma:asset/8d795a174b249a3418f58c1303298a2b79e129da.png";
import imgSgnlLogo from "figma:asset/c352b1695ed894ec9f13b794b78bfd0a7a5ce52f.png";
import imgTwomileHeavyIndustriesLogo from "figma:asset/5ef75f1a4d3f2b1d66fafc1493ce45d1bbc807cb.png";
import imgRapidoLogo from "figma:asset/f8b4c2e6aa66f714e256226143405c3478a1db0e.png";
import imgP2TaskLogo from "figma:asset/1a60c549e67b214eaed0516c16e0c4ed107c690a.png";

const logos = [
  { src: imgThirukkuralTransportLogo, alt: "Thirukkural Transport", width: 87, height: 87 },
  { src: imgStJosephCollegeLogo, alt: "St. Joseph College", width: 78, height: 78 },
  { src: imgSolamalaiCollegeLogo, alt: "Solamalai College", width: 87, height: 73 },
  { src: imgDhanalakshmiSrinivasanCollegeLogo, alt: "Dhanalakshmi Srinivasan College", width: 87, height: 87 },
  { src: imgAkshayaCollegeLogo, alt: "Akshaya College", width: 73, height: 90 },
  { src: imgNsrLogo, alt: "NSR", width: 78, height: 78 },
  { src: imgSgnlLogo, alt: "SGNL", width: 87, height: 87 },
  { src: imgTwomileHeavyIndustriesLogo, alt: "Twomile Heavy Industries", width: 90, height: 90 },
  { src: imgRapidoLogo, alt: "Rapido", width: 78, height: 42 },
  { src: imgP2TaskLogo, alt: "P2Task", width: 104, height: 29 },
];

// Duplicate for seamless loop
const allLogos = [...logos, ...logos];

export default function TrustedClientsSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "rgba(198,198,198,0.1)",
        borderTop: "1px solid #c6c6c6",
        borderBottom: "1px solid #c6c6c6",
        boxShadow: "inset 0px 2px 4px 0px rgba(0,0,0,0.25)",
      }}
    >
      <div className="flex items-center" style={{ minHeight: "110px" }}>
        {/* Left heading */}
        <div
          className="flex-shrink-0 flex flex-col justify-center"
          style={{
            width: "303px",
            paddingLeft: "64px",
            paddingRight: "24px",
            borderRight: "2px solid #c6c6c6",
            minHeight: "55px",
          }}
        >
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: "28px",
              lineHeight: 1.25,
              letterSpacing: "0.56px",
              color: "#6d6d6d",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Trusted by
          </p>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: "22px",
              lineHeight: 1.25,
              letterSpacing: "0.44px",
              color: "#6d6d6d",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Industry &amp; Academia
          </p>
        </div>

        {/* Scrolling logos area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 h-full z-10 pointer-events-none"
            style={{
              width: "60px",
              background: "linear-gradient(to right, rgba(245,245,245,0.9), transparent)",
            }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 h-full z-10 pointer-events-none"
            style={{
              width: "60px",
              background: "linear-gradient(to left, rgba(245,245,245,0.9), transparent)",
            }}
          />

          <motion.div
            className="flex items-center"
            style={{ gap: "70px", paddingLeft: "40px", paddingRight: "40px" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 22,
                ease: "linear",
              },
            }}
          >
            {allLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: logo.width, height: 90 }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    width: logo.width,
                    height: logo.height,
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
