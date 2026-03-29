"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListIcon, XIcon } from "@phosphor-icons/react";

const navLinks = [
  { href: "#tech-stack", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Journey" },
  { href: "#contact", label: "Say Hello" },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const headerHeight = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({ top, behavior: "smooth" });
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full py-5 px-6 md:px-10 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <div className="font-bold tracking-widest text-sm uppercase">
        DEV.PEDRO
      </div>

      <nav className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollToSection(link.href)}
            className="hover:text-primary-cyber transition-colors cursor-pointer"
          >
            {link.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden text-white/60 hover:text-primary-cyber transition-colors z-50"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <XIcon size={24} weight="bold" /> : <ListIcon size={24} weight="bold" />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[69px] bg-[#0a0a0a]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    scrollToSection(link.href);
                  }}
                  className="text-2xl font-bold uppercase tracking-widest text-white/70 hover:text-primary-cyber transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:block w-20" />
    </header>
  );
}
