"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRightIcon, ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { projects, type Project } from "@/data/projects";

function CarouselCard({
  project,
  isActive,
  onActivate,
}: {
  project: Project;
  isActive: boolean;
  onActivate: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(124,58,237,0.15), transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative shrink-0 select-none"
      style={{
        width: "min(420px, 80vw)",
        perspective: 1000,
      }}
      onMouseEnter={() => {
        setHovered(true);
        onActivate();
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{
          rotateX: hovered ? rotateX : 0,
          rotateY: hovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative overflow-hidden border border-white/5 bg-card-black group"
      >
        <div className="relative h-[280px] w-full overflow-hidden bg-[#0a0a0a]">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: hovered ? 1.08 : 1,
              filter: hovered ? "grayscale(0)" : "grayscale(1)",
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 420px"
              draggable={false}
            />
          </motion.div>

          <div className="absolute inset-0 bg-linear-to-br from-primary-cyber/20 via-[#0a0a0a] to-[#141414] z-0" />

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 flex flex-col justify-end bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent p-6"
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05, duration: 0.3 }}
                  className="flex gap-2 mb-3 flex-wrap"
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] bg-white/10 backdrop-blur-sm border border-white/10 px-2.5 py-1 uppercase font-bold text-white/70 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-2xl font-bold text-white tracking-tight mb-1"
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="text-white/50 text-xs leading-relaxed mb-4 max-w-[90%]"
                >
                  {project.description}
                </motion.p>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex gap-4"
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-primary-cyber transition-colors"
                    >
                      View Code <ArrowUpRightIcon className="w-3 h-3" />
                    </a>
                  )}
                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-primary-cyber transition-colors"
                    >
                      Live Demo <ArrowUpRightIcon className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {hovered && (
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: glareBackground,
                pointerEvents: "none",
                zIndex: 20,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        <div className="p-5 flex justify-between items-center border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-primary-cyber uppercase tracking-widest">
              {project.title}
            </span>
            <span className="text-[9px] text-white/20">—</span>
            <span className="text-[9px] text-white/30 uppercase tracking-wider font-medium">
              {project.tags[0]}
            </span>
          </div>
          <motion.div
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRightIcon className="w-3.5 h-3.5 text-white/20 group-hover:text-primary-cyber transition-colors" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scrollTo = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const cardWidth = Math.min(420, window.innerWidth * 0.8) + 32;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="w-full">
      <div className="flex justify-between items-end mb-12 px-6 md:px-0">
        <div>
          <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-bold">
            Case Studies
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter mt-4 leading-none">
            Projects
          </h2>
        </div>

        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scrollTo("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary-cyber hover:border-primary-cyber/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Previous project"
          >
            <ArrowLeftIcon weight="bold" className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary-cyber hover:border-primary-cyber/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Next project"
          >
            <ArrowRightIcon weight="bold" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative -mx-6 md:-mx-10">
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-linear-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-linear-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          onScroll={updateScrollState}
          className="flex gap-8 overflow-x-auto px-6 md:px-10 py-4 scroll-smooth no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
          }}
        >
          {projects.map((project: Project, i: number) => (
            <div key={project.title} style={{ scrollSnapAlign: "center" }}>
              <CarouselCard
                project={project}
                isActive={activeIndex === i}
                onActivate={() => setActiveIndex(i)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_: Project, i: number) => (
          <motion.div
            key={i}
            animate={{
              width: activeIndex === i ? 24 : 6,
              backgroundColor:
                activeIndex === i
                  ? "rgba(124,58,237,1)"
                  : "rgba(255,255,255,0.15)",
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>
    </section>
  );
}
