"use client";

import {
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useScroll,
  useVelocity,
  animate,
} from "framer-motion";

export function MagneticButton({
  children,
  strength = 0.3,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  const onMouseMove = (e: ReactMouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({
  children,
  className,
  intensity = 12,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
  const glare = useSpring(0, { stiffness: 200, damping: 20 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const onMouseMove = (e: ReactMouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((py - 0.5) * -intensity);
    rotateY.set((px - 0.5) * intensity);
    glare.set(0.12);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glare.set(0);
  };

  const background = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15), transparent 60%)`,
  );

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background,
          opacity: glare,
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />
    </motion.div>
  );
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function RippleContainer({ children }: { children: ReactNode }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (e: ReactMouseEvent<HTMLDivElement>) => {
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 900);
  };

  return (
    <div style={{ position: "relative" }} onMouseDown={addRipple}>
      {children}
      {ripples.map((rp) => (
        <motion.div
          key={rp.id}
          initial={{ width: 0, height: 0, opacity: 0.3 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          style={{
            position: "fixed",
            left: rp.x,
            top: rp.y,
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: "9999px",
            border: "1px solid rgba(139,92,246,0.4)",
            pointerEvents: "none",
            zIndex: 9990,
          }}
        />
      ))}
    </div>
  );
}

export function GlitchText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    };
    const schedule = () => {
      const t = setTimeout(
        () => {
          trigger();
          schedule();
        },
        3000 + Math.random() * 5000,
      );
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-block" }}
    >
      {text}
      {glitching && (
        <>
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              color: "rgba(139,92,246,0.8)",
              clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
              transform: `translate(${Math.random() * 6 - 3}px, 0)`,
              pointerEvents: "none",
            }}
          >
            {text}
          </span>
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              color: "rgba(239,68,68,0.6)",
              clipPath: "polygon(0 60%, 100% 60%, 100% 75%, 0 75%)",
              transform: `translate(${Math.random() * -6 + 3}px, 0)`,
              pointerEvents: "none",
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const controls = animate(0, value, {
            duration,
            ease: "easeOut",
            onUpdate: (v) => setDisplay(Math.floor(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, started]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Typewriter({
  text,
  speed = 40,
  delay = 0,
  className,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(start);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ display: "inline-block", marginLeft: "2px" }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

export function ButtonFill({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <motion.span
        initial={false}
        animate={{
          scaleX: hovered ? 1 : 0,
          scaleY: hovered ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(139,92,246,1)",
          transformOrigin: "center",
          borderRadius: "inherit",
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </button>
  );
}

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}
    >
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: "-50%",
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(167,139,250,0.1) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(79,70,229,0.12) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const gap = 28;
    let animFrame: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", () => {
      mouse.current = { x: -9999, y: -9999 };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / gap);
      const rows = Math.ceil(canvas.height / gap);

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const ox = c * gap;
          const oy = r * gap;
          const dx = ox - mouse.current.x;
          const dy = oy - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 80;
          const push = Math.max(0, 1 - dist / radius) * 12;
          const nx = ox + (dx / (dist || 1)) * push;
          const ny = oy + (dy / (dist || 1)) * push;
          const alpha = 0.12 + Math.max(0, 1 - dist / radius) * 0.25;

          ctx.beginPath();
          ctx.arc(nx, ny, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167,139,250,${alpha})`;
          ctx.fill();
        }
      }

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}

export function ColorShift() {
  useEffect(() => {
    const update = () => {
      const h = new Date().getHours();
      let color: string;
      if (h >= 6 && h < 12) color = "rgba(59,130,246,1)";
      else if (h >= 12 && h < 17) color = "rgba(245,158,11,1)";
      else if (h >= 17 && h < 20) color = "rgba(249,115,22,1)";
      else color = "rgba(139,92,246,1)";

      document.documentElement.style.setProperty("--color-accent-shift", color);
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return null;
}

export function ChromaticAberration({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const velX = useMotionValue(0);
  const aberration = useSpring(velX, { stiffness: 300, damping: 30 });
  const lastX = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const delta = Math.abs(e.clientX - lastX.current);
      lastX.current = e.clientX;
      velX.set(Math.min(delta * 0.15, 6));
      setTimeout(() => velX.set(0), 80);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [velX]);

  const offsetR = useTransform(aberration, (v) => `-${v}px`);
  const offsetB = useTransform(aberration, (v) => `${v}px`);

  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-block" }}
    >
      <motion.span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          color: "rgba(239,68,68,0.5)",
          x: offsetR,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          color: "rgba(59,130,246,0.5)",
          x: offsetB,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      >
        {children}
      </motion.span>
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
}

export function ScrollDistort({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skewY = useSpring(
    useTransform(velocity, [-2000, 0, 2000], [-6, 0, 6]),
    { stiffness: 300, damping: 30 },
  );

  return (
    <motion.div style={{ skewY }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerHoverList({
  items,
  className,
  itemClassName,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ul className={className}>
      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;
        const isAdjacent =
          hoveredIndex !== null && Math.abs(hoveredIndex - i) === 1;

        return (
          <motion.li
            key={item}
            animate={{
              x: isHovered ? 8 : isAdjacent ? -4 : 0,
              opacity: hoveredIndex !== null && !isHovered ? 0.4 : 1,
            }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={itemClassName}
            style={{ listStyle: "none" }}
          >
            {item}
          </motion.li>
        );
      })}
    </ul>
  );
}

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

export function LiquidTrail() {
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    let lastTime = 0;
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 30) return;
      lastTime = now;
      const id = counter.current++;
      setTrail((t) => [...t.slice(-12), { id, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {trail.map((dot, i) => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: dot.x,
            top: dot.y,
            translateX: "-50%",
            translateY: "-50%",
            width: 6 + i * 0.5,
            height: 6 + i * 0.5,
            borderRadius: "9999px",
            backgroundColor: `rgba(139,92,246,${0.1 + i * 0.04})`,
            pointerEvents: "none",
            zIndex: 99990,
          }}
        />
      ))}
    </>
  );
}
