import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, {
    stiffness: 500,
    damping: 35,
    mass: 0.4,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 500,
    damping: 35,
    mass: 0.4,
  });

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(
        window.matchMedia("(pointer: fine)").matches
      );
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const handleMouseOver = (event) => {
      const target = event.target;

      if (
        target.closest(
          "button, a, input, textarea, select, [data-cursor]"
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseover",
        handleMouseOver
      );
    };
  }, [isDesktop, mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Outer glass cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full border border-[#43305F]/50 bg-white/10 backdrop-blur-sm"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.7 : 1,
          borderColor: isHovering
            ? "rgba(199,107,66,0.8)"
            : "rgba(67,48,95,0.5)",
        }}
        transition={{
          duration: 0.2,
        }}
      />

      {/* Inner cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-2.5 w-2.5 rounded-full bg-[#C76B42] shadow-[0_0_18px_rgba(199,107,66,0.7)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{
          duration: 0.15,
        }}
      />
    </>
  );
}