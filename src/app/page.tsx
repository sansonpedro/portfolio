"use client";

import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { DatabaseItem } from "@/components/database-item";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ProjectCard } from "@/components/project-card";
import {
  Database as DatabaseIcon,
  GitBranch as GitBranchIcon,
  Terminal as TerminalIcon,
  Cpu as CpuIcon,
  Browser as BrowserIcon,
  Cards as CardsIcon,
  Code as CodeIcon,
  FileTs as TsIcon,
  FileJs as JsIcon,
  Lightning as LightningIcon,
  Globe as GlobeIcon,
  Atom as ReactIcon,
  TerminalWindowIcon,
  CameraPlusIcon,
  BrowsersIcon,
} from "@phosphor-icons/react";

export default function Home() {
  return (
    <>
      {/* O Hero ocupa h-screen (100vh), garantindo que nada abaixo dele apareça no load */}
      <Hero />

      <main className="container max-w-7xl mx-auto px-10">
        {/* Adicionei pt-[20vh] para empurrar o título do Tech_Stack bem para baixo do limite da tela inicial */}
        <div className="flex flex-col gap-[40vh] pt-[20vh] pb-40">
          
          {/* SEÇÃO 2x2: CONHECIMENTOS TÉCNICOS */}
          <Reveal>
            <section id="tech-stack">
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-xl font-bold tracking-widest uppercase italic text-white/90">
                  Tech_Stack
                </h2>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {/* 1. LINGUAGENS */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-primary-cyber mb-6">01 | Linguagens</h3>
                  <div className="space-y-2">
                    <DatabaseItem icon={TsIcon} name="TypeScript" type="Strict Typing" />
                    <DatabaseItem icon={JsIcon} name="JavaScript" type="ES6+" />
                    <DatabaseItem icon={CodeIcon} name="Python" type="Scripting" />
                  </div>
                </div>

                {/* 2. FRAMEWORKS */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-primary-cyber mb-6">02 | Frameworks</h3>
                  <div className="space-y-2">
                    <DatabaseItem icon={ReactIcon} name="React.js" type="Frontend" />
                    <DatabaseItem icon={GlobeIcon} name="Next.js" type="Full-Stack" />
                    <DatabaseItem icon={LightningIcon} name="Tailwind CSS" type="Styling" />
                  </div>
                </div>

                {/* 3. DATABASES */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-primary-cyber mb-6">03 | Databases</h3>
                  <div className="space-y-2">
                    <DatabaseItem icon={DatabaseIcon} name="MySQL" type="Relational" />
                    <DatabaseItem icon={DatabaseIcon} name="PostgreSQL" type="Relational" />
                    <DatabaseItem icon={LightningIcon} name="Redis" type="In-memory" />
                  </div>
                </div>

                {/* 4. TOOLS */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-primary-cyber mb-6">04 | Tools</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <DatabaseItem icon={TerminalWindowIcon} name="Dbeaver" />
                    <DatabaseItem icon={CameraPlusIcon} name="Postman" />
                    <DatabaseItem icon={BrowsersIcon} name="ApiDog" />
                    <DatabaseItem icon={GitBranchIcon} name="Git" />
                    <DatabaseItem icon={LightningIcon} name="Vercel" />
                    <DatabaseItem icon={CardsIcon} name="Debugger" />
                  </div>
                </div>
              </div>
            </section>
          </Reveal>

          {/* SEÇÃO DE PROJETOS */}
          <Reveal>
            <section id="projects">
              <div className="flex justify-between items-end mb-16">
                <div>
                  <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-bold">Work_Output</span>
                  <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mt-4 leading-none">Featured Projects</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProjectCard title="DashView" description="Infra monitoring tool." tags={["Next.js", "PostgreSQL"]} image="/p1.jpg" />
                <ProjectCard title="CodeNow" description="Event-driven architecture." tags={["React", "Node.js"]} image="/p2.jpg" />
                <ProjectCard title="Prism" description="3D cloud visualizer." tags={["Three.js"]} image="/p3.jpg" />
              </div>
            </section>
          </Reveal>

          {/* SEÇÃO DE EXPERIÊNCIA */}
          <Reveal>
            <ExperienceTimeline />
          </Reveal>

        </div>
      </main>
    </>
  );
}