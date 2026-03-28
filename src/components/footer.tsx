"use client";

import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  GlobeIcon,
} from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0a0a0a] py-16">
      <div className="container max-w-7xl mx-auto px-10 flex flex-col items-center text-center gap-10">
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
          © 2026 Pedro Henrique Sanson
        </div>

        <nav className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          <a
            href="#"
            className="flex items-center gap-2 hover:text-primary-cyber transition-colors"
          >
            <GithubLogoIcon size={14} /> GITHUB
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-primary-cyber transition-colors"
          >
            <LinkedinLogoIcon size={14} /> LINKEDIN
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-primary-cyber transition-colors"
          >
            <GlobeIcon size={14} /> SOURCE
          </a>
        </nav>

        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">
            Status: Optimal
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-primary-cyber shadow-[0_0_10px_#7c3aed] animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
