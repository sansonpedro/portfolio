"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export function Cursor() {
  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const dotSpring = { stiffness: 600, damping: 30 };
  const dotX = useSpring(0, dotSpring);
  const dotY = useSpring(0, dotSpring);

  const hoverScale = useSpring(1, { stiffness: 300, damping: 20 });
  const clickScale = useSpring(1, { stiffness: 400, damping: 25 });
  const borderOpacity = useSpring(0.4, { stiffness: 200, damping: 20 });
  const visible = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      visible.set(1);
    };

    const down = () => clickScale.set(0.65);
    const up = () => clickScale.set(1);
    const leave = () => visible.set(0);
    const enter = () => visible.set(1);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        hoverScale.set(1.5);
        borderOpacity.set(0.8);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        hoverScale.set(1);
        borderOpacity.set(0.4);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [x, y, dotX, dotY, visible, hoverScale, clickScale, borderOpacity]);

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible,
          scale: hoverScale,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          width: 32,
          height: 32,
          borderRadius: "9999px",
          border: "1px solid",
          borderColor: "rgba(255,255,255,0.4)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible,
          scale: clickScale,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          width: 5,
          height: 5,
          borderRadius: "9999px",
          backgroundColor: "rgba(255,255,255,1)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
