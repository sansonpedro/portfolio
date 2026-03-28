"use client";

import { motion } from "framer-motion";

// ─── Shared viewport config ───────────────────────────────────────────────────
const VIEWPORT = { once: true, margin: "-150px" };

// ─── 1. Default — Fade + slide up (your original) ────────────────────────────
export function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function RevealStagger({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={staggerItem}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={staggerItem}>{children}</motion.div>}
    </motion.div>
  );
}

interface RevealSlideProps {
  children: React.ReactNode;
  direction?: "left" | "right";
}

export function RevealSlide({ children, direction = "left" }: RevealSlideProps) {
  const x = direction === "left" ? -80 : 80;

  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealScale({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function RevealBlur({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}