export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "DashView",
    description:
      "Infrastructure monitoring tool with metrics, charts and dashboards.",
    tags: ["React", "MySQL", "Recharts", "Tailwind"],
    image: "/projects/dashview.webp",
    github: "#",
    live: "#",
  },
  {
    title: "CodeNow",
    description:
      "Logic problems platform with a Ai Tutor for help you to learn and practice algorithms and data structures.",
    tags: ["Next.js", "Shadcn/UI", "Tailwind"],
    image: "/projects/codenow.webp",
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio",
    description:
      "Portfolio website for a full-stack developer with a focus on modern design and user experience.",
    tags: ["Next.js", "Shadcn/UI", "Tailwind"],
    image: "/projects/prism.webp",
    github: "#",
    live: "#",
  },
];
