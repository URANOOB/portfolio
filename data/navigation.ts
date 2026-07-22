import {
  BriefcaseBusiness,
  Code2,
  Contact,
  FileText,
  FolderOpen,
  LayoutGrid,
  SquareTerminal,
  UserRound,
} from "lucide-react";
import type { AppId } from "@/types/portfolio";

export const appDefinitions = {
  finder: { title: "Explorador", icon: FolderOpen, color: "#75a8ff" },
  about: { title: "Sobre mí", icon: UserRound, color: "#ffb56b" },
  experience: { title: "Experiencia", icon: BriefcaseBusiness, color: "#9b8cff" },
  projects: { title: "Proyectos", icon: LayoutGrid, color: "#ff7e55" },
  skills: { title: "Tecnologías", icon: Code2, color: "#5ad0bf" },
  terminal: { title: "Terminal", icon: SquareTerminal, color: "#a9b3c7" },
  resume: { title: "Currículum", icon: FileText, color: "#ffd166" },
  contact: { title: "Contacto", icon: Contact, color: "#69d2ff" },
} satisfies Record<AppId, { title: string; icon: typeof FolderOpen; color: string }>;

export const dockApps: AppId[] = [
  "about",
  "contact",
  "experience",
  "skills",
  "terminal",
  "projects",
];

export const desktopShortcuts: AppId[] = ["finder", "resume"];
