"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FULL_NAME = "PEDRO SANSON";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function scramble(target: string, progress: number): string {
  return target
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (i < Math.floor(progress * target.length)) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

function Particle({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ y: -120, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{
        y: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.3, delay },
        filter: { duration: 0.4, delay },
      }}
      className="inline-block"
      style={{ marginRight: char === " " ? "0.4em" : "0.02em" }}
    >
      {char}
    </motion.span>
  );
}

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<"scramble" | "fall" | "exit">("scramble");
  const [scrambled, setScrambled] = useState(FULL_NAME);
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (phase !== "scramble") return;

    let frame = 0;
    const total = 60;

    const interval = setInterval(() => {
      frame++;
      const p = frame / total;
      setProgress(p);
      setCounter(Math.min(100, Math.floor(p * 100)));
      setScrambled(scramble(FULL_NAME, p));

      if (frame >= total) {
        clearInterval(interval);
        setScrambled(FULL_NAME);
        setCounter(100);
        setTimeout(() => setPhase("fall"), 400);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "fall") return;
    const t = setTimeout(() => setPhase("exit"), 1800);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "exit" && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative">
            {phase === "scramble" && (
              <motion.span
                key="scramble"
                className="text-5xl md:text-8xl font-bold tracking-tighter uppercase text-white/90 font-mono"
                style={{ letterSpacing: "-0.02em" }}
              >
                {scrambled}
              </motion.span>
            )}

            {phase === "fall" && (
              <motion.div
                key="fall"
                className="text-5xl md:text-8xl font-bold tracking-tighter uppercase text-white flex"
                style={{ letterSpacing: "-0.02em" }}
              >
                {FULL_NAME.split("").map((char, i) => (
                  <Particle key={i} char={char} delay={i * 0.045} />
                ))}
              </motion.div>
            )}
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-64">
            <div className="w-full h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-primary-cyber"
                style={{ scaleX: progress, transformOrigin: "left" }}
              />
            </div>
            <span className="text-[10px] tracking-[0.4em] text-white/30 font-mono tabular-nums">
              {String(counter).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
