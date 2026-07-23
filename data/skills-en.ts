import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Fast, clear, and adaptable interfaces.",
    skills: [
      { name: "React", level: "Core", projects: ["Inglés Pa’ la Paz", "R/COON Porfolio"] },
      { name: "Next.js", level: "Core", projects: ["Inglés Pa’ la Paz", "R/COON Porfolio"] },
      { name: "TypeScript", level: "Core", projects: ["Inglés Pa’ la Paz", "R/COON Porfolio"] },
      { name: "JavaScript", level: "Regular", projects: ["Web Applications"] },
      { name: "Tailwind CSS", level: "Regular", projects: ["R/COON Porfolio"] },
      { name: "HTML / CSS", level: "Regular", projects: ["Web Interfaces"] },
    ],
  },
  {
    title: "Backend and Data",
    description: "Services and information connected to the product.",
    skills: [
      { name: "Node.js", level: "Regular", projects: ["Web Applications"] },
      { name: "REST API", level: "Regular", projects: ["Integrations"] },
      { name: "SQL", level: "Regular", projects: ["Data Applications"] },
      { name: "PostgreSQL", level: "Growing", projects: ["Data Applications"] },
      { name: "Supabase", level: "Growing", projects: ["Inglés Pa’ la Paz"] },
    ],
  },
  {
    title: "Tools and Exploration",
    description: "Technologies that expand the reach of each solution.",
    skills: [
      { name: "Python / OpenCV", level: "Regular", projects: ["Atlas Splitter"] },
      { name: "Java", level: "Growing", projects: ["Technical Training"] },
      { name: "Git / GitHub", level: "Regular", projects: ["Version Control"] },
      { name: "Vercel", level: "Regular", projects: ["Web Deployments"] },
      { name: "Docker", level: "Growing", projects: ["Reproducible Environments"] },
      { name: "AI and Automation", level: "Growing", projects: ["AI Legal Assistant"] },
    ],
  },
];

export const skillsExperienceNote =
  "Exact years of experience will be published when verified; levels reflect relative usage within the portfolio.";
