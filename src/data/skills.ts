import type { ElementType } from "react";
import type { IconProps } from "@phosphor-icons/react";

export interface Skill {
  icon: string;
  name: string;
  type?: string;
}

export interface SkillCategory {
  number: string;
  label: string;
  layout?: "grid";
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
      { icon: "Neo4j", name: "Neo4j", type: "Graph" },
    ],
  },
  {
    number: "04",
    label: "Tools & Infra",
    layout: "grid",
    items: [
      { icon: "DBeaver", name: "DBeaver" },
      { icon: "Postman", name: "Postman" },
      { icon: "Apidog", name: "ApiDog" },
      { icon: "Git", name: "Git" },
      { icon: "Vercel", name: "Vercel" },
      { icon: "Linux", name: "Linux" },
      { icon: "Npm", name: "npm" },
      { icon: "Pnpm", name: "pnpm" },
    ],
  },
];
