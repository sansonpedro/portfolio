export interface Experience {
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string;
  isCurrent: boolean;
}

export const experiences: Experience[] = [
  {
    startDate: "Feb 2025",
    endDate: "Present",
    title: "Systems Developer",
    company: "SENAI @ Grupo Malwee",
    description:
      "Development and maintenance of internal systems, focused on scalable architectures and digital process optimization.",
    isCurrent: true,
  },
];
