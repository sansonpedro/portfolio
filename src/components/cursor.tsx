"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const dotSpring = { stiffness: 600, damping: 30 };
  const dotX = useSpring(0, dotSpring);
  const dotY = useSpring(0, dotSpring);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const addHover = () => {
      document
        .querySelectorAll("a, button, [data-cursor-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => setHovered(true));
          el.addEventListener("mouseleave", () => setHovered(false));
        });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    addHover();

    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      observer.disconnect();
    };
  }, [x, y, dotX, dotY]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          borderRadius: "9999px",
          border: "1px solid",
          pointerEvents: "none",
        }}
        animate={{
          width: hovered ? 48 : clicked ? 20 : 32,
          height: hovered ? 48 : clicked ? 20 : 32,
          borderColor: hovered
            ? "rgba(255,255,255,0.8)"
            : "rgba(255,255,255,0.4)",
          backgroundColor: "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          borderRadius: "9999px",
          pointerEvents: "none",
        }}
        animate={{
          width: clicked ? 3 : 5,
          height: clicked ? 3 : 5,
          backgroundColor: "rgba(255,255,255,1)",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
