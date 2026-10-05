"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9998] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
        boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
      }}
    />
  );
}
