"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  CaretDoubleDownIcon,
} from "@phosphor-icons/react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { social } from "@/data/social";

// ─── Text reveal by word ──────────────────────────────────────────────────────
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            delay: 0.4 + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // All hooks called at the top level (fixed Rules of Hooks violation)
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [0.06, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[calc(100vh-80px)] flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background grid — scroll-driven */}
      <motion.div
        style={{ opacity: gridOpacity }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* Main content with parallax */}
      <motion.div style={{ y, opacity, scale }} className="relative z-10 px-4">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-8 block"
        >
          system.initialization()
        </motion.span>

        {/* Name */}
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold tracking-tighter mb-8 uppercase leading-none">
          <WordReveal text="Pedro" />
          <br />
          <WordReveal text="Sanson" />
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          className="max-w-xl mx-auto text-white/60 text-sm leading-relaxed mb-10"
        >
          Architecting scalable full-stack environments with precision.
          Specialized in React, Next.js, TypeScript, and Tailwind.
        </motion.p>

        {/* Buttons with stagger */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 1.2 } },
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
              },
            }}
          >
            <a href={social.github} target="_blank" rel="noopener noreferrer">
              <Button
                className="bg-primary-cyber hover:bg-[#6d28d9] rounded-none px-8 py-6 gap-3 uppercase tracking-widest font-bold text-xs transition-all w-full sm:w-auto"
              >
                Github <GithubLogoIcon weight="bold" className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
              },
            }}
          >
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-white/20 rounded-none px-8 py-6 uppercase tracking-widest font-bold text-xs hover:bg-white/5 transition-all w-full sm:w-auto"
              >
                Linkedin <LinkedinLogoIcon weight="bold" className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer z-10"
      >
        <CaretDoubleDownIcon
          weight="bold"
          className="w-6 h-6 text-white/20 group-hover:text-primary-cyber animate-bounce transition-colors"
        />
      </motion.button>
    </section>
  );
}