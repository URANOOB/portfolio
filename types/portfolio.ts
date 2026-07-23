export type AppId =
  | "about"
  | "experience"
  | "logistics"
  | "help"
  | "search"
  | "settings"
  | "projects"
  | "skills"
  | "terminal"
  | "resume"
  | "contact";

export type ProjectStatus =
  | "En desarrollo"
  | "Activo"
  | "Concepto"
  | "Concepto privado"
  | "Completado"
  | "In development"
  | "Active"
  | "Concept"
  | "Private concept"
  | "Completed";

export type SkillLevel = "Principal" | "Trabajo habitual" | "En crecimiento" | "Core" | "Regular" | "Growing";

export interface Project {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  role: string;
  period: string;
  context: string;
  outcome: string;
  timeline: { start: number; end: number };
  technologies: string[];
  tasks: string[];
  status: ProjectStatus;
  repository: string | null;
  demo: string | null;
  links?: Array<{ label: string; href: string }>;
  challenges: string[];
  learnings: string[];
  accent: "orange" | "blue" | "violet";
}

export interface Experience {
  track: "software" | "logistics";
  company: string;
  role: string;
  period: string;
  summary: string;
  responsibilities: string[];
  tools: string[];
  achievements: string[];
}

export interface SkillGroup {
  title: string;
  description: string;
  skills: Array<{
    name: string;
    level: SkillLevel;
    projects: string[];
  }>;
}

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}
