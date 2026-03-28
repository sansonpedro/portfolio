import type { ElementType } from "react";
import type { IconProps } from "@phosphor-icons/react";

export interface Skill {
  icon: string; // icon component name — resolved in the component
  name: string;
  type?: string;
}

export interface SkillCategory {
  number: string;
  label: string;
  layout?: "grid"; // optional: "grid" for 2-col layout (tools section)
  items: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    number: "01",
    label: "Languages",
    items: [
      { icon: "FileTs", name: "TypeScript", type: "Strict Typing" },
      { icon: "FileJs", name: "JavaScript", type: "ES6+" },
      { icon: "Code", name: "Python", type: "Scripting" },
    ],
  },
  {
    number: "02",
    label: "Frameworks",
    items: [
      { icon: "Atom", name: "React.js", type: "Frontend" },
      { icon: "Globe", name: "Next.js", type: "Full-Stack" },
      { icon: "Lightning", name: "Tailwind CSS", type: "Styling" },
    ],
  },
  {
    number: "03",
    label: "Databases",
    items: [
      { icon: "Database", name: "MySQL", type: "Relational" },
      { icon: "Database", name: "PostgreSQL", type: "Relational" },
      { icon: "Lightning", name: "Redis", type: "In-memory" },
    ],
  },
  {
    number: "04",
    label: "Tools",
    layout: "grid",
    items: [
      { icon: "TerminalWindow", name: "Dbeaver" },
      { icon: "CameraPlus", name: "Postman" },
      { icon: "Browsers", name: "ApiDog" },
      { icon: "GitBranch", name: "Git" },
      { icon: "Lightning", name: "Vercel" },
      { icon: "Cards", name: "Debugger" },
    ],
  },
];
