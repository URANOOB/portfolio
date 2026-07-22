import {
  BriefcaseBusiness,
  CircleHelp,
  Code2,
  Contact,
  FileText,
  FolderOpen,
  LayoutGrid,
  Search,
  Settings,
  SquareTerminal,
  Truck,
  UserRound,
} from "lucide-react";
import type { AppId } from "@/types/portfolio";

export const appDefinitions = {
  finder: { title: "Explorador", icon: FolderOpen, color: "#75a8ff" },
  about: { title: "Sobre mí", icon: UserRound, color: "#ffb56b" },
  experience: { title: "Experiencia", icon: BriefcaseBusiness, color: "#9b8cff" },
  logistics: { title: "Logística", icon: Truck, color: "#58b89b" },
  help: { title: "Help", icon: CircleHelp, color: "#72a7d8" },
  search: { title: "Búsqueda", icon: Search, color: "#8c97aa" },
  settings: { title: "Settings", icon: Settings, color: "#9ba4b4" },
  projects: { title: "Works", icon: LayoutGrid, color: "#ff7e55" },
  skills: { title: "Tecnologías", icon: Code2, color: "#5ad0bf" },
  terminal: { title: "Terminal", icon: SquareTerminal, color: "#a9b3c7" },
  resume: { title: "Currículum", icon: FileText, color: "#ffd166" },
  contact: { title: "Contacto", icon: Contact, color: "#69d2ff" },
} satisfies Record<AppId, { title: string; icon: typeof FolderOpen; color: string }>;

export const dockApps: AppId[] = [
  "about",
  "contact",
  "experience",
  "help",
  "search",
  "settings",
  "terminal",
  "projects",
];

export const desktopShortcuts: AppId[] = ["finder", "resume", "logistics"];
