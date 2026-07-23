import {
  BriefcaseBusiness,
  CircleHelp,
  Code2,
  Contact,
  FileText,
  LayoutGrid,
  Search,
  Settings,
  SquareTerminal,
  Truck,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AppId } from "@/types/portfolio";

export const appDefinitions = {
  about: { title: { es: "Sobre mí", en: "About me" }, icon: UserRound, color: "#ffb56b" },
  experience: { title: { es: "Experiencia", en: "Experience" }, icon: BriefcaseBusiness, color: "#9b8cff" },
  logistics: { title: { es: "Logística", en: "Logistics" }, icon: Truck, color: "#58b89b" },
  help: { title: { es: "Ayuda", en: "Help" }, icon: CircleHelp, color: "#72a7d8" },
  search: { title: { es: "Búsqueda", en: "Search" }, icon: Search, color: "#8c97aa" },
  settings: { title: { es: "Ajustes", en: "Settings" }, icon: Settings, color: "#9ba4b4" },
  projects: { title: { es: "Proyectos", en: "Projects" }, icon: LayoutGrid, color: "#ff7e55" },
  skills: { title: { es: "Tecnologías", en: "Tech Stack" }, icon: Code2, color: "#5ad0bf" },
  terminal: { title: { es: "Terminal", en: "Terminal" }, icon: SquareTerminal, color: "#a9b3c7" },
  resume: { title: { es: "Currículum", en: "Resume" }, icon: FileText, color: "#ffd166" },
  contact: { title: { es: "Contacto", en: "Contact" }, icon: Contact, color: "#69d2ff" },
} satisfies Record<AppId, { title: { es: string; en: string }; icon: LucideIcon; color: string }>;

export const dockApps: AppId[] = ["about", "contact", "experience", "help", "search", "terminal", "projects"];

export const desktopShortcuts = ["resume", "logistics"] as const satisfies readonly AppId[];
