import { profile, socialLinks } from "../data/profile.ts";
import type { AppId } from "../types/portfolio.ts";

export interface TerminalResult {
  lines: string[];
  action?: { type: "open"; appId: AppId } | { type: "clear" };
}

const appAliases: Record<string, AppId> = {
  "atlas-splitter": "projects",
  "ingles-pa-la-paz": "projects",
  about: "about",
  experience: "experience",
  projects: "projects",
  education: "resume",
  contact: "contact",
  skills: "skills",
};

export function runPortfolioCommand(rawCommand: string): TerminalResult {
  const command = rawCommand.trim().toLowerCase().replace(/\s+/g, " ");

  if (!command) return { lines: [] };
  if (command === "clear") return { lines: [], action: { type: "clear" } };
  if (command === "help") {
    return {
      lines: [
        "Comandos: about, skills, experience, projects, education, contact",
        "También: whoami, github, linkedin, clear",
        "Abrir: open atlas-splitter | open ingles-pa-la-paz",
      ],
    };
  }
  if (command === "whoami") {
    return { lines: [`${profile.name} — ${profile.headline}`, profile.location] };
  }
  if (command === "github" || command === "linkedin") {
    const href = socialLinks[command];
    return {
      lines: [href ? `Abriendo ${href}` : `El enlace de ${command} aún no está configurado.`],
    };
  }
  if (command === "about") {
    return { lines: [profile.intro], action: { type: "open", appId: "about" } };
  }
  if (command === "education") {
    return {
      lines: [profile.educationNote],
      action: { type: "open", appId: "resume" },
    };
  }
  if (["skills", "experience", "projects", "contact"].includes(command)) {
    return {
      lines: [`Abriendo ${command}…`],
      action: { type: "open", appId: appAliases[command] },
    };
  }
  if (command.startsWith("open ")) {
    const target = command.slice(5);
    const appId = appAliases[target];
    if (appId) {
      return {
        lines: [`Abriendo ${target}…`],
        action: { type: "open", appId },
      };
    }
  }

  return {
    lines: [`Comando no reconocido: ${rawCommand}`, "Escribe “help” para ver opciones seguras."],
  };
}
