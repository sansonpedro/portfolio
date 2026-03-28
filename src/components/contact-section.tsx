"use client";

import { motion } from "framer-motion";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import { social } from "@/data/social";

const contactLinks = [
  {
    label: "Email",
    value: "Get in touch",
    href: social.email,
    icon: EnvelopeSimpleIcon,
    external: false,
  },
  {
    label: "GitHub",
    value: "@sansonpedro",
    href: social.github,
    icon: GithubLogoIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Pedro Henrique Sanson",
    href: social.linkedin,
    icon: LinkedinLogoIcon,
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="w-full">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-xl font-bold tracking-[0.3em] uppercase italic text-white/90">
          Contact
        </h2>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="text-center mb-12">
        <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-bold block mb-4">
          Get_In_Touch
        </span>
        <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-6">
          Let&apos;s Build<br />Something Great
        </h3>
        <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
          Always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {contactLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group bg-[#141414] border border-white/5 p-6 hover:border-primary-cyber/30 transition-all relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-3">
              <link.icon
                weight="bold"
                className="w-5 h-5 text-white/40 group-hover:text-primary-cyber group-hover:drop-shadow-[0_0_8px_#7c3aed] transition-all"
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                {link.label}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                {link.value}
              </span>
              <ArrowUpRightIcon className="w-3 h-3 text-white/20 group-hover:text-primary-cyber transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-primary-cyber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
