export type AppId =
  | "finder"
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

export type ProjectStatus = "En desarrollo" | "Activo" | "Concepto" | "Concepto privado" | "Completado";

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
  status: ProjectStatus;
  repository: string | null;
  demo: string | null;
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
    level: "Principal" | "Trabajo habitual" | "En crecimiento";
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
