"use client";

import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import type { Project } from "@/data/projects";

export function ProjectCard({ title, description, tags, image, github, live }: Project) {
  return (
    <div className="bg-card-black group overflow-hidden border border-white/5 hover:border-primary-cyber/20 transition-all">
      <div className="relative h-48 w-full grayscale group-hover:grayscale-0 transition-all duration-500 bg-card-black">
        <Image
          src={image}
          alt={`Screenshot of ${title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          placeholder="empty"
        />
        {/* Fallback gradient when image is missing */}
        <div className="absolute inset-0 bg-linear-to-br from-primary-cyber/20 via-card-black to-card-black z-0" />
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 uppercase font-bold text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-white/50 text-xs mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:text-primary-cyber transition-colors"
            >
              View Code <ArrowUpRightIcon className="w-3 h-3" />
            </a>
          )}
          {live && live !== "#" && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-primary-cyber transition-colors"
            >
              Live Demo <ArrowUpRightIcon className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
