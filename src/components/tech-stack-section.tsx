"use client";

import { Reveal } from "@/components/reveal";
import { DatabaseItem } from "@/components/database-item";
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
import type { ElementType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import { skillCategories } from "@/data/skills";

// Map icon names to actual components
const iconMap: Record<string, ElementType<IconProps>> = {
  FileTs: TsIcon,
  FileJs: JsIcon,
  Code: CodeIcon,
  Atom: ReactIcon,
  Globe: GlobeIcon,
  Lightning: LightningIcon,
  Database: DatabaseIcon,
  TerminalWindow: TerminalWindowIcon,
  CameraPlus: CameraPlusIcon,
  Browsers: BrowsersIcon,
  GitBranch: GitBranchIcon,
  Cards: CardsIcon,
  Terminal: TerminalIcon,
  Cpu: CpuIcon,
  Browser: BrowserIcon,
};

export function TechStackSection() {
  return (
    <Reveal>
      <section id="tech-stack">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-xl font-bold tracking-widest uppercase italic text-white/90">
            Tech_Stack
          </h2>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {skillCategories.map((category) => (
            <div key={category.number}>
              <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-primary-cyber mb-6">
                {category.number} | {category.label}
              </h3>
              <div
                className={
                  category.layout === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 gap-2"
                    : "space-y-2"
                }
              >
                {category.items.map((item) => {
                  const Icon = iconMap[item.icon];
                  return Icon ? (
                    <DatabaseItem
                      key={item.name}
                      icon={Icon}
                      name={item.name}
                      type={item.type}
                    />
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
