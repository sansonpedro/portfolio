"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ListIcon, XIcon } from "@phosphor-icons/react";

const navLinks = [
  { href: "#tech-stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full py-5 px-6 md:px-10 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <div className="font-bold tracking-widest text-sm uppercase">
        DEV.PEDRO
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-primary-cyber transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden text-white/60 hover:text-primary-cyber transition-colors z-50"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <XIcon size={24} weight="bold" /> : <ListIcon size={24} weight="bold" />}
      </button>

      {/* Mobile menu overlay */}
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
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-bold uppercase tracking-widest text-white/70 hover:text-primary-cyber transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:block w-20" />
    </header>
  );
}
