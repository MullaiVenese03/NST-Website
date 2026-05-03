import { motion } from "motion/react";

export default function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      style={{ pointerEvents: isLoading ? "auto" : "none" }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <svg className="w-16 h-16" viewBox="0 0 56 58.0457" fill="none">
            <motion.path
              d="M0 29.0229L14 58.0457L28 0L0 29.0229Z"
              fill="#015AAA"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M28 0L42 29.0229L56 58.0457L28 0Z"
              fill="#015AAA"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-2"
        >
          <h2 className="text-2xl font-bold text-[#015aaa]">NebulaSafeTech</h2>
          <div className="flex gap-1">
            <motion.div
              className="w-2 h-2 bg-[#015aaa] rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-[#015aaa] rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-[#015aaa] rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
