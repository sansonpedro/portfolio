"use client";

import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <Reveal>
      <section id="projects">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-bold">
              Work_Output
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tighter mt-4 leading-none">
              Featured Projects
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>
    </Reveal>
  );
}
