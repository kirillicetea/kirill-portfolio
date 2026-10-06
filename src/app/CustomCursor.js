"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Скрываем на мобильных
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Большой круг с glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 3000,
          damping: 60,
          mass: 0.1,
        }}
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: "50%",
          border: "2px solid rgba(59, 130, 246, 0.6)",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          opacity: isVisible ? 1 : 0,
        }}
      />
      
      {/* Точка в центре — маленькая и прозрачная */}
<motion.div
  className="fixed top-0 left-0 pointer-events-none z-[9999]"
  animate={{
    x: mousePosition.x - 1,
    y: mousePosition.y - 1,
  }}
  transition={{
    type: "spring",
    stiffness: 1000,
    damping: 50,
  }}
  style={{
    width: 2,
    height: 2,
    borderRadius: "50%",
    background: "rgba(59, 130, 246, 0.5)",
    boxShadow: "0 0 6px rgba(59, 130, 246, 0.4)",
    opacity: isVisible ? 0.6 : 0,
  }}
/>
    </>
  );
}
