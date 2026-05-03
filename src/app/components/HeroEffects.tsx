import { motion } from "motion/react";

export function RadialGlow() {
  return (
    <>
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(1, 90, 170, 0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </>
  );
}

export function ShimmerEffect() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: "linear-gradient(120deg, transparent 0%, transparent 45%, rgba(255, 255, 255, 0.05) 50%, transparent 55%, transparent 100%)",
          backgroundSize: "200% 200%",
        }}
      />
    </motion.div>
  );
}

export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(1, 90, 170, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(1, 90, 170, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export function FloatingOrbs() {
  const orbs = [
    { size: 150, x: "20%", y: "30%", duration: 15, delay: 0 },
    { size: 200, x: "80%", y: "20%", duration: 18, delay: 3 },
    { size: 120, x: "10%", y: "70%", duration: 12, delay: 6 },
    { size: 180, x: "90%", y: "60%", duration: 20, delay: 2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(1, 90, 170, 0.08) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
