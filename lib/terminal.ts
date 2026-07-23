import { profile, socialLinks } from "../data/profile.ts";
import type { AppId } from "../types/portfolio.ts";

export interface TerminalResult {
  lines: string[];
  action?: { type: "open"; appId: AppId } | { type: "clear" } | { type: "url"; href: string };
}

const appAliases: Record<string, AppId> = {
  "atlas-splitter": "projects",
  "ingles-pa-la-paz": "projects",
  about: "about",
  experience: "experience",
  projects: "projects",
  education: "resume",
  resume: "resume",
  contact: "contact",
  skills: "skills",
  terminal: "terminal",
  settings: "settings",
  help: "help",
  logistics: "logistics",
};

const BANNER = [
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣠⣤⡤⠤⠴⠶⠦⣤⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⠀⠀⢀⣠⠶⢞⣻⣷⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⠾⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠲⠶⢤⣤⣤⣤⣀⣀⣀⣠⣴⡾⠿⠛⠛⠋⠉⣉⣉⣉⣉⡿⠋⣡⣾⣿⣿⡿⠀⠀⠀",
  "⠀⠀⠀⠀⠀⢀⣠⣴⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠚⠉⠉⠉⠉⠉⠛⠛⠀⠀⠀⠀⠶⣿⣿⣿⣿⡟⢁⣾⣿⡿⢋⣿⣿⡆⠀⠀",
  "⠀⠀⠀⢠⣴⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠈⠙⠃⠘⠛⠋⠀⣼⣿⡿⠁⠀⠀",
  "⠀⠀⢠⣾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⡇⠀⠀⠀",
  "⠀⠀⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠈⢷⠀⠀⠀",
  "⠀⣼⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⣼⣿⣿⣷⣦⣤⡄⢸⠀⠀⠀",
  "⢰⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣇⠀⠀⠀⣿⣿⣿⣿⣿⣿⣷⡾⠀⠀⠀",
  "⢠⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣷⣄⠀⠈⠙⠿⣿⣿⠉⢠⡇⠀⠀⠀",
  "⣸⡇⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠛⠛⠿⣷⡄⠀⠀⠈⠁⠀⠀⣇⠀⠀⠀",
  "⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⡅⠀⠀⠀⠈⠻⣄⠀⠀⠀⠀⠀⠸⡄⠀⠀",
  "⢻⡇⠀⠀⠀⠀⠀⠀⠀⠀⢸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣄⠀⠀⠀⠀⠹⣧⡀⠀⢀⣤⣤⣷⠀⠀",
  "⠸⣧⠀⣰⣶⣶⣶⣦⣦⣤⣬⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣦⣀⠀⠀⣠⣿⣿⣶⣾⣿⣯⣁⠀⠀",
  "⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠉⠉⠉⠉⠉⠉⠉⠛⠛⠛⠿⢿⣿⣿⣿⠿⠿⣦",
  "⠀⠀⢻⣿⠟⣩⣴⣶⣿⣿⣷⣾⣿⡈⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠈⠳⢤⠀⠀⠀⠀⠀⠀⠀⠀⢸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠈⣇⣾⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠈⢳⡄⠀⠀⠀⠀⠀⣠⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠸⣿⣿⡿⠛⠉⣠⣤⣤⣬⣽⣇⠀⠹⣆⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⢹⣦⣄⠀⠀⡼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⢿⡟⠀⣴⣿⣿⣿⣿⣿⣿⣿⣧⡀⠘⢦⠀⠀⠀⠀⠀⠀⢀⣾⠃⠀⠀⠀⠀⠀⠀⢿⣿⣆⢸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠘⣆⢸⣿⣿⣿⣿⠟⠋⠉⠉⠉⠻⣄⠈⢷⣄⠀⠀⠀⢠⡾⠁⠀⠀⣀⣀⣀⠀⠀⠘⣿⣿⣿⣧⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠈⠻⣿⣿⡟⠁⠀⢀⣠⣤⣶⣶⣿⣆⠀⢻⣶⣶⣶⣿⣶⣶⣿⣿⣿⣿⣿⣿⣄⠀⠈⠛⠿⠿⠿⠷⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠈⠻⣄⠀⢠⣿⣿⣿⣿⡿⠿⠿⣦⠈⠛⠿⠿⠿⠿⠿⠿⣿⣿⣿⣍⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⢿⣿⣿⡿⠃⠀⠀⣀⣬⣇⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⠁⠀⢠⣾⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⠤⢿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "",
  "william@rcoon — Software Developer",
  'Bogotá, Colombia · Escribe "help" para comenzar',
];

export function runPortfolioCommand(rawCommand: string, lang: "es" | "en" = "es"): TerminalResult {
  const command = rawCommand.trim().toLowerCase().replace(/\s+/g, " ");
  const es = lang === "es";

  if (!command) return { lines: [] };

  // ── clear / cls ──────────────────────────────────────────────────
  if (command === "clear" || command === "cls") {
    return { lines: [], action: { type: "clear" } };
  }

  // ── banner / neofetch ────────────────────────────────────────────
  if (command === "banner" || command === "neofetch") {
    return { lines: BANNER };
  }

  // ── help ─────────────────────────────────────────────────────────
  if (command === "help" || command === "?") {
    return {
      lines: [
        es ? "── Navegación ──────────────────────" : "── Navigation ──────────────────────",
        "  about        " + (es ? "→ Sobre mí" : "→ About me"),
        "  experience   " + (es ? "→ Experiencia laboral" : "→ Work experience"),
        "  projects     " + (es ? "→ Proyectos" : "→ Projects"),
        "  skills       " + (es ? "→ Stack tecnológico" : "→ Tech stack"),
        "  resume       " + (es ? "→ Currículum" : "→ Resume"),
        "  contact      " + (es ? "→ Contacto" : "→ Contact"),
        "  logistics    " + (es ? "→ Perfil operativo" : "→ Logistics profile"),
        "",
        es ? "── Info ─────────────────────────────" : "── Info ─────────────────────────────",
        "  whoami       " + (es ? "→ Identificación rápida" : "→ Quick identity"),
        "  pwd          " + (es ? "→ Directorio actual" : "→ Current directory"),
        "  date         " + (es ? "→ Fecha y hora" : "→ Date and time"),
        "  lang         " + (es ? "→ Idiomas que hablo" : "→ Languages I speak"),
        "  stack        " + (es ? "→ Tecnologías principales" : "→ Main technologies"),
        "  availability " + (es ? "→ Estado laboral" : "→ Availability status"),
        "  location     " + (es ? "→ Ubicación" : "→ Location"),
        "",
        es ? "── Redes ────────────────────────────" : "── Social ────────────────────────────",
        "  github       → github.com/...",
        "  linkedin     → linkedin.com/...",
        "  email        " + (es ? "→ Correo de contacto" : "→ Contact email"),
        "",
        es ? "── Sistema ──────────────────────────" : "── System ────────────────────────────",
        "  banner       " + (es ? "→ Mostrar banner ASCII" : "→ Show ASCII banner"),
        "  history      " + (es ? "→ Últimos comandos" : "→ Last commands"),
        "  echo <texto> " + (es ? "→ Repite el texto" : "→ Echo text"),
        "  open <app>   " + (es ? "→ Abrir ventana" : "→ Open window"),
        "  clear        " + (es ? "→ Limpiar pantalla" : "→ Clear screen"),
      ],
    };
  }

  // ── whoami ───────────────────────────────────────────────────────
  if (command === "whoami") {
    return {
      lines: [
        `${profile.name}`,
        `${profile.headline} · ${profile.location}`,
        es
          ? profile.intro
          : "I build clear, fast, maintainable web products that turn real needs into useful digital experiences.",
      ],
    };
  }

  // ── pwd ──────────────────────────────────────────────────────────
  if (command === "pwd") {
    return { lines: ["/home/william/portfolio"] };
  }

  // ── date ─────────────────────────────────────────────────────────
  if (command === "date") {
    const now = new Date();
    const locale = es ? "es-CO" : "en-US";
    return {
      lines: [
        now.toLocaleDateString(locale, { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
        now.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      ],
    };
  }

  // ── location ─────────────────────────────────────────────────────
  if (command === "location" || command === "loc") {
    return { lines: [`📍 ${profile.location}`] };
  }

  // ── availability ─────────────────────────────────────────────────
  if (command === "availability" || command === "status") {
    return {
      lines: [
        es ? "✅ " + profile.availability : "✅ Open to software development opportunities",
        es ? "   Remoto · híbrido · Bogotá" : "   Remote · hybrid · Bogotá",
      ],
    };
  }

  // ── lang ─────────────────────────────────────────────────────────
  if (command === "lang" || command === "languages") {
    return {
      lines: [
        es ? "Idiomas:" : "Languages:",
        "  🇨🇴 Español — " + (es ? "nativo" : "native"),
        "  🇺🇸 English — B2+",
      ],
    };
  }

  // ── stack ────────────────────────────────────────────────────────
  if (command === "stack") {
    return {
      lines: [
        es ? "Stack principal:" : "Main stack:",
        "  Frontend  →  Next.js · React · TypeScript · CSS",
        "  Backend   →  Node.js · Express · Python",
        "  DB        →  PostgreSQL · MongoDB · Firebase",
        "  DevOps    →  Git · Docker · Vercel",
      ],
    };
  }

  // ── github / linkedin / email ─────────────────────────────────────
  if (command === "github") {
    const href = socialLinks.github;
    return href
      ? { lines: [`→ ${href}`], action: { type: "url", href } }
      : { lines: [es ? "Enlace de GitHub aún no configurado." : "GitHub link not configured yet."] };
  }
  if (command === "linkedin") {
    const href = socialLinks.linkedin;
    return href
      ? { lines: [`→ ${href}`], action: { type: "url", href } }
      : { lines: [es ? "Enlace de LinkedIn aún no configurado." : "LinkedIn link not configured yet."] };
  }
  if (command === "email") {
    const href = socialLinks.email;
    return href
      ? { lines: [`→ ${href.replace("mailto:", "")}`], action: { type: "url", href } }
      : { lines: [es ? "Email aún no configurado." : "Email not configured yet."] };
  }

  // ── echo ─────────────────────────────────────────────────────────
  if (command.startsWith("echo ")) {
    return { lines: [rawCommand.trim().slice(5)] };
  }

  // ── history ──────────────────────────────────────────────────────
  if (command === "history") {
    return {
      lines: [
        es ? "(El historial se muestra con ↑ ↓ en el input)" : "(History is navigable with ↑ ↓ in the input)",
      ],
    };
  }

  // ── ls / dir ─────────────────────────────────────────────────────
  if (command === "ls" || command === "dir" || command === "ls -la") {
    return {
      lines: [
        "drwxr-xr-x  about/",
        "drwxr-xr-x  experience/",
        "drwxr-xr-x  projects/",
        "drwxr-xr-x  skills/",
        "drwxr-xr-x  resume/",
        "drwxr-xr-x  contact/",
        "drwxr-xr-x  logistics/",
        "-rw-r--r--  README.md",
      ],
    };
  }

  // ── cat ──────────────────────────────────────────────────────────
  if (command === "cat readme.md" || command === "readme") {
    return {
      lines: [
        "# R/COON Portfolio",
        "",
        es ? profile.intro : "I build clear, fast, maintainable web products.",
        "",
        es ? "Escribe 'help' para navegar." : "Type 'help' to navigate.",
      ],
    };
  }

  // ── uname ────────────────────────────────────────────────────────
  if (command === "uname" || command === "uname -a") {
    return { lines: ["R/COON OS 1.0.0 · Next.js · TypeScript · william@rcoon"] };
  }

  // ── uptime ───────────────────────────────────────────────────────
  if (command === "uptime") {
    return {
      lines: [
        es
          ? "Sistema activo desde que abriste el portafolio 🐾"
          : "System up since you opened the portfolio 🐾",
      ],
    };
  }

  // ── open <app> ───────────────────────────────────────────────────
  if (command.startsWith("open ")) {
    const target = command.slice(5).trim();
    const appId = appAliases[target];
    if (appId) {
      return {
        lines: [(es ? "Abriendo " : "Opening ") + target + "…"],
        action: { type: "open", appId },
      };
    }
    return {
      lines: [
        (es ? "No se encontró la app: " : "App not found: ") + target,
        (es ? "Apps disponibles: " : "Available apps: ") + Object.keys(appAliases).join(", "),
      ],
    };
  }

  // ── navegación directa por nombre ────────────────────────────────
  if (appAliases[command]) {
    return {
      lines: [(es ? "Abriendo " : "Opening ") + command + "…"],
      action: { type: "open", appId: appAliases[command] },
    };
  }

  // ── not found ────────────────────────────────────────────────────
  return {
    lines: [
      (es ? "Comando no reconocido: " : "Command not found: ") + `'${rawCommand.trim()}'`,
      es ? "Escribe 'help' para ver todos los comandos." : "Type 'help' to see all commands.",
    ],
  };
}

/** Todos los comandos disponibles, para autocompletar */
export const ALL_COMMANDS = [
  "help",
  "clear",
  "cls",
  "banner",
  "neofetch",
  "whoami",
  "pwd",
  "date",
  "location",
  "loc",
  "availability",
  "status",
  "lang",
  "languages",
  "stack",
  "github",
  "linkedin",
  "email",
  "ls",
  "ls -la",
  "dir",
  "cat readme.md",
  "readme",
  "uname",
  "uname -a",
  "uptime",
  "history",
  "about",
  "experience",
  "projects",
  "skills",
  "resume",
  "contact",
  "logistics",
  "settings",
  "help",
  "open about",
  "open experience",
  "open projects",
  "open skills",
  "open resume",
  "open contact",
  "open logistics",
  "open settings",
];
