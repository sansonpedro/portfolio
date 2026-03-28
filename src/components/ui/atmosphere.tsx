"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function NoiseGrain({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          pointerEvents: "none",
          opacity,
          mixBlendMode: "overlay",
          filter: "url(#noise)",
          willChange: "auto",
        }}
      />
    </>
  );
}

export function Scanlines({ opacity = 0.025 }: { opacity?: number }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9997,
        pointerEvents: "none",
        opacity,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 3px)",
        backgroundSize: "100% 3px",
        willChange: "auto",
      }}
    />
  );
}

export function Vignette() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9996,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)",
        willChange: "auto",
      }}
    />
  );
}

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
        zIndex: 99998,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
export function GlobalStyles() {
  return (
    <style>{`
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb {
        background: rgba(139,92,246,0.5);
        border-radius: 9999px;
      }
      ::-webkit-scrollbar-thumb:hover { background: rgba(139,92,246,0.9); }

      ::selection { background: rgba(139,92,246,0.4); color: #fff; }
      ::-moz-selection { background: rgba(139,92,246,0.4); color: #fff; }

      :focus-visible {
        outline: 1.5px solid rgba(139,92,246,0.8);
        outline-offset: 3px;
        border-radius: 3px;
      }
    `}</style>
  );
}
export function ConsoleMessage() {
  useEffect(() => {
    console.log(
      "%c👾 Pedro Sanson",
      "color: #a78bfa; font-size: 28px; font-weight: bold; font-family: monospace;",
    );
    console.log(
      "%cOi, curioso(a). Gosta do que viu?\n%chttps://www.linkedin.com/in/pedro-henrique-sanson-124568354/",
      "color: #ffffff; font-size: 13px; font-family: monospace;",
      "color: #7c3aed; font-size: 13px; font-family: monospace; text-decoration: underline;",
    );
    console.log(
      "%cBuilt with Next.js · Framer Motion · Tailwind · TypeScript",
      "color: rgba(255,255,255,0.3); font-size: 11px; font-family: monospace;",
    );
  }, []);

  return null;
}
