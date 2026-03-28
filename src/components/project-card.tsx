"use client";

import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export function ProjectCard({ title, description, tags, image }: ProjectProps) {
  return (
    <div className="bg-card-black group overflow-hidden border border-white/5">
      <div className="relative h-48 w-full grayscale group-hover:grayscale-0 transition-all duration-500">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4">
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
        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:text-primary-cyber transition-colors">
          View Code <ArrowUpRightIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
