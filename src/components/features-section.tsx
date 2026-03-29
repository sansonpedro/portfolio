"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

interface Feature {
  title: string;
  description: string;
}

const featuresData: Feature[] = [
  {
    title: "High Performance",
    description:
      "Optimized to deliver the best experience and Core Web Vitals scores.",
  },
  {
    title: "Accessibility",
    description:
      "Components designed following WAI-ARIA guidelines rigorously.",
  },
  {
    title: "Dynamic Typography",
    description: "Using JetBrains Mono across the entire project ecosystem.",
  },
];

function FeatureCard({
  feature,
  progress,
  index,
  total,
}: {
  feature: Feature;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);
  const blur = useTransform(progress, [start, end], [12, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  const smoothY = useSpring(y, { stiffness: 100, damping: 25 });

  return (
    <motion.div
      style={{ opacity, y: smoothY, filter }}
      className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur-sm"
    >
      <span className="text-xs tracking-widest text-white/20 uppercase mb-2">
        0{index + 1}
      </span>
      <h3 className="font-bold text-lg">{feature.title}</h3>
      <p className="text-sm text-muted-foreground text-center leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  const titleOpacity = useTransform(progress, [0, 0.15], [1, 0.3]);
  const titleY = useTransform(progress, [0, 0.3], [0, -30]);
  const smoothTitleY = useSpring(titleY, { stiffness: 80, damping: 20 });

  return (
    <div
      ref={sectionRef}
      style={{ height: `${100 + featuresData.length * 60}vh` }}
    >
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary-cyber z-50 origin-left"
      />

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="container max-w-5xl w-full px-4">
          <motion.div
            style={{ opacity: titleOpacity, y: smoothTitleY }}
            className="flex flex-col items-center space-y-4 text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-[10px] tracking-[0.4em] text-white/30 uppercase"
            >
              core principles
            </motion.span>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
              Core Principles
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to build products with a consistent design
              system and scalable architecture.
            </p>
          </motion.div>

          {/* Grid de cards — cada um aparece conforme o scroll avança */}
          <div className="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
            {featuresData.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                progress={progress}
                index={i}
                total={featuresData.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
