"use client";

import { Boxes, Braces, CloudCog, Images, ServerCog, Shapes, Terminal, Workflow, Zap } from "lucide-react";
import type { ElementType } from "react";
import {
  SiCloudflareworkers,
  SiCss,
  SiEslint,
  SiFramer,
  SiGit,
  SiLucide,
  SiNextdotjs,
  SiNodedotjs,
  SiPostcss,
  SiPrettier,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { usePreferencesStore, type Language } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

type LocalizedText = Record<Language, string>;

const text = (es: string, en: string): LocalizedText => ({ es, en });

const terminalCommands = [
  "help",
  "whoami",
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "contact",
  "github",
  "linkedin",
  "clear",
];

const primaryApps = [
  "about",
  "experience",
  "projects",
  "resume",
  "contact",
] as const satisfies readonly AppId[];

interface Technology {
  name: string;
  version?: string;
  description: LocalizedText;
  icon: ElementType;
}

interface TechnologyGroup {
  id: string;
  label: LocalizedText;
  summary: LocalizedText;
  tone: string;
  items: Technology[];
}

const technologyGroups: TechnologyGroup[] = [
  {
    id: "core",
    label: text("Núcleo de la aplicación", "Application core"),
    summary: text(
      "La base que organiza las rutas, componentes y contratos de datos.",
      "The foundation that organizes routes, components, and data contracts.",
    ),
    tone: "blue",
    items: [
      {
        name: "Next.js",
        version: "16.2",
        description: text(
          "App Router, páginas de proyectos, metadata, imágenes y la API de contacto.",
          "App Router, project pages, metadata, images, and the contact API.",
        ),
        icon: SiNextdotjs,
      },
      {
        name: "React",
        version: "19.2",
        description: text(
          "Construye las aplicaciones, ventanas y controles interactivos del escritorio.",
          "Builds the desktop applications, windows, and interactive controls.",
        ),
        icon: SiReact,
      },
      {
        name: "React DOM",
        version: "19.2",
        description: text(
          "Hidrata la interfaz en el navegador y conecta los componentes con el DOM.",
          "Hydrates the browser interface and connects components to the DOM.",
        ),
        icon: SiReact,
      },
      {
        name: "TypeScript",
        version: "5.9",
        description: text(
          "Tipa componentes, stores, datos y contratos para reducir errores al desarrollar.",
          "Types components, stores, data, and contracts to reduce development errors.",
        ),
        icon: SiTypescript,
      },
      {
        name: "React Server Components",
        version: "RSC",
        description: text(
          "Separa trabajo de servidor y cliente para entregar una carga inicial más eficiente.",
          "Separates server and client work for a more efficient initial load.",
        ),
        icon: ServerCog,
      },
    ],
  },
  {
    id: "interface",
    label: text("Interfaz y experiencia", "Interface and experience"),
    summary: text(
      "Estilos, movimiento, estado e iconografía que dan vida a R/COON.",
      "Styles, motion, state, and iconography that bring R/COON to life.",
    ),
    tone: "orange",
    items: [
      {
        name: "CSS",
        description: text(
          "Define temas, variables, ventanas, diseño responsive y la apariencia del escritorio.",
          "Defines themes, variables, windows, responsive layout, and the desktop appearance.",
        ),
        icon: SiCss,
      },
      {
        name: "Tailwind CSS",
        version: "4.2",
        description: text(
          "Aporta la base de utilidades y se integra al CSS global mediante PostCSS.",
          "Provides the utility foundation and integrates with global CSS through PostCSS.",
        ),
        icon: SiTailwindcss,
      },
      {
        name: "Framer Motion",
        version: "12.42",
        description: text(
          "Anima el arranque, el dock, los menús y las transiciones de las ventanas.",
          "Animates startup, the dock, menus, and window transitions.",
        ),
        icon: SiFramer,
      },
      {
        name: "Zustand",
        version: "5.0",
        description: text(
          "Guarda el estado de ventanas y preferencias visuales de forma ligera y persistente.",
          "Stores window state and visual preferences in a lightweight, persistent way.",
        ),
        icon: Boxes,
      },
      {
        name: "Lucide React",
        version: "1.25",
        description: text(
          "Proporciona los iconos funcionales para acciones, aplicaciones y navegación.",
          "Provides functional icons for actions, applications, and navigation.",
        ),
        icon: SiLucide,
      },
      {
        name: "React Icons",
        version: "5.7",
        description: text(
          "Reúne logotipos de tecnologías para proyectos y esta guía visual.",
          "Supplies technology logos for projects and this visual guide.",
        ),
        icon: Shapes,
      },
    ],
  },
  {
    id: "tooling",
    label: text("Desarrollo y compilación", "Development and builds"),
    summary: text(
      "El sistema que ejecuta, transforma y empaqueta el proyecto.",
      "The system that runs, transforms, and packages the project.",
    ),
    tone: "violet",
    items: [
      {
        name: "Vinext",
        version: "0.0.50",
        description: text(
          "Ejecuta la aplicación compatible con Next.js sobre Vite y Cloudflare Workers.",
          "Runs the Next.js-compatible application on Vite and Cloudflare Workers.",
        ),
        icon: Zap,
      },
      {
        name: "Vite",
        version: "8.0",
        description: text(
          "Ofrece el servidor de desarrollo, HMR y el empaquetado de producción.",
          "Provides the development server, HMR, and production packaging.",
        ),
        icon: SiVite,
      },
      {
        name: "Vite React + RSC",
        description: text(
          "Integra React y los entornos de Server Components dentro del pipeline de Vite.",
          "Integrates React and Server Component environments in the Vite pipeline.",
        ),
        icon: Braces,
      },
      {
        name: "Node.js",
        version: "22+",
        description: text(
          "Ejecuta scripts, compilaciones y las pruebas automatizadas del proyecto.",
          "Runs the project's scripts, builds, and automated tests.",
        ),
        icon: SiNodedotjs,
      },
      {
        name: "PostCSS",
        description: text(
          "Procesa Tailwind y transforma la hoja global durante la compilación.",
          "Processes Tailwind and transforms the global stylesheet during builds.",
        ),
        icon: SiPostcss,
      },
      {
        name: "Cross-env",
        version: "10.1",
        description: text(
          "Mantiene las variables de los scripts compatibles entre Windows y otros sistemas.",
          "Keeps script variables compatible between Windows and other systems.",
        ),
        icon: Terminal,
      },
    ],
  },
  {
    id: "delivery",
    label: text("Despliegue y calidad", "Delivery and quality"),
    summary: text(
      "Servicios y controles que permiten publicar el sitio con confianza.",
      "Services and checks that make it possible to publish the site with confidence.",
    ),
    tone: "green",
    items: [
      {
        name: "Cloudflare Workers",
        description: text(
          "Ejecuta la aplicación en el edge y sirve las respuestas del portafolio.",
          "Runs the application at the edge and serves portfolio responses.",
        ),
        icon: SiCloudflareworkers,
      },
      {
        name: "Cloudflare Images",
        description: text(
          "Optimiza imágenes bajo demanda y entrega formatos modernos como WebP.",
          "Optimizes images on demand and delivers modern formats such as WebP.",
        ),
        icon: Images,
      },
      {
        name: "Wrangler",
        version: "4.92",
        description: text(
          "Simula bindings localmente y prepara la configuración del Worker.",
          "Simulates bindings locally and prepares Worker configuration.",
        ),
        icon: CloudCog,
      },
      {
        name: "OpenAI Sites",
        description: text(
          "Conecta la compilación del sitio con su infraestructura de hosting en Cloudflare.",
          "Connects the site build to its Cloudflare hosting infrastructure.",
        ),
        icon: Workflow,
      },
      {
        name: "Vercel",
        description: text(
          "Mantiene una ruta alternativa de compilación y despliegue para Next.js.",
          "Keeps an alternative Next.js build and deployment path.",
        ),
        icon: SiVercel,
      },
      {
        name: "ESLint",
        version: "9.39",
        description: text(
          "Detecta problemas de código y aplica reglas compatibles con Next.js.",
          "Finds code issues and applies rules compatible with Next.js.",
        ),
        icon: SiEslint,
      },
      {
        name: "Prettier",
        version: "3.9",
        description: text(
          "Uniforma automáticamente el formato del código y los estilos.",
          "Keeps code and style formatting consistent automatically.",
        ),
        icon: SiPrettier,
      },
      {
        name: "Git",
        description: text(
          "Registra la evolución del proyecto y facilita revisar cada cambio.",
          "Records the project's evolution and makes each change easier to review.",
        ),
        icon: SiGit,
      },
    ],
  },
];

const helpCopy = {
  es: {
    eyebrow: "R/COON / DOCUMENTACIÓN",
    title: "Guía del portafolio",
    intro:
      "Este sitio funciona como un escritorio interactivo. Abre aplicaciones, mueve y organiza ventanas, explora mi trabajo y recorre el portafolio desde la búsqueda o la Terminal.",
    stackEyebrow: "STACK DEL PROYECTO",
    stackTitle: "Tecnologías que hacen funcionar R/COON",
    stackIntro:
      "Del componente que ves en pantalla al despliegue en el edge: estas son las piezas del proyecto y la función que cumple cada una.",
    stackNote:
      "Los paquetes de tipos y configuración se agrupan con TypeScript, Vite, ESLint y Prettier para evitar repetir herramientas que cumplen la misma función.",
    openTitle: "Cómo abrir aplicaciones",
    openItems: [
      "Selecciona un icono del dock para abrir su ventana o traerla al frente.",
      "Usa los accesos movibles del escritorio para entrar a Currículum y Logística.",
      "Arrastra una ventana desde su barra superior; también puedes minimizarla, ampliarla o cerrarla.",
    ],
    searchTitle: "Búsqueda rápida",
    search: "Presiona",
    searchEnd:
      "para abrir Búsqueda y localizar rápidamente secciones como Sobre mí, Experiencia, Logística, Works o Contacto.",
    terminalTitle: "Inicio rápido de Terminal",
    terminalIntro: "Abre Terminal desde el dock, escribe un comando y presiona",
    terminalEnd: "Estos son los comandos disponibles:",
    commandsLabel: "Comandos disponibles",
    examples: "También puedes abrir proyectos directamente:",
    tip: "Consejo: el punto debajo de un icono indica que la aplicación está abierta.",
  },
  en: {
    eyebrow: "R/COON / DOCUMENTATION",
    title: "Portfolio guide",
    intro:
      "This site works as an interactive desktop. Open applications, move and organize windows, explore my work, and navigate the portfolio through Search or Terminal.",
    stackEyebrow: "PROJECT STACK",
    stackTitle: "Technologies that power R/COON",
    stackIntro:
      "From the component on screen to edge deployment: these are the project pieces and the role each one plays.",
    stackNote:
      "Type packages and configuration are grouped with TypeScript, Vite, ESLint, and Prettier to avoid repeating tools with the same purpose.",
    openTitle: "How to open applications",
    openItems: [
      "Select an icon in the dock to open its window or bring it to the front.",
      "Use the movable desktop shortcuts to open Resume and Logistics.",
      "Drag a window from its title bar; you can also minimize, maximize, or close it.",
    ],
    searchTitle: "Quick search",
    search: "Press",
    searchEnd:
      "to open Search and quickly find sections such as About me, Experience, Logistics, Works, or Contact.",
    terminalTitle: "Terminal quick start",
    terminalIntro: "Open Terminal from the dock, type a command, and press",
    terminalEnd: "These commands are available:",
    commandsLabel: "Available commands",
    examples: "You can also open projects directly:",
    tip: "Tip: the dot beneath an icon shows that the application is open.",
  },
} satisfies Record<Language, Record<string, string | string[]>>;

export function HelpApp() {
  const language = usePreferencesStore((state) => state.language);
  const openWindow = useWindowStore((state) => state.openWindow);
  const copy = helpCopy[language];

  return (
    <article className="app-scroll help-guide">
      <header className="help-guide-header">
        <span>{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>

      <section className="help-guide-section help-primary-access" aria-labelledby="help-primary-access">
        <h3 id="help-primary-access">{language === "es" ? "Accesos principales" : "Main shortcuts"}</h3>
        <p>
          {language === "es"
            ? "Usa estos accesos para llegar directamente a la información profesional principal."
            : "Use these shortcuts to reach the main professional information directly."}
        </p>
        <div>
          {primaryApps.map((id) => (
            <button key={id} onClick={() => openWindow(id)}>
              {language === "es"
                ? {
                    about: "Sobre mí",
                    experience: "Experiencia",
                    projects: "Proyectos",
                    resume: "Currículum",
                    contact: "Contacto",
                  }[id]
                : {
                    about: "About me",
                    experience: "Experience",
                    projects: "Projects",
                    resume: "Resume",
                    contact: "Contact",
                  }[id]}
            </button>
          ))}
        </div>
      </section>

      <section className="help-stack-section" aria-labelledby="help-stack">
        <header className="help-stack-intro">
          <div>
            <span>{copy.stackEyebrow}</span>
            <h3 id="help-stack">{copy.stackTitle}</h3>
          </div>
          <p>{copy.stackIntro}</p>
        </header>

        <div className="help-tech-groups">
          {technologyGroups.map((group, groupIndex) => (
            <section
              key={group.id}
              className="help-tech-group"
              data-tone={group.tone}
              aria-labelledby={`help-tech-${group.id}`}
            >
              <header>
                <div>
                  <span aria-hidden="true">{String(groupIndex + 1).padStart(2, "0")}</span>
                  <h4 id={`help-tech-${group.id}`}>{group.label[language]}</h4>
                </div>
                <p>{group.summary[language]}</p>
              </header>
              <ul className="help-tech-grid">
                {group.items.map((technology) => {
                  const Icon = technology.icon;

                  return (
                    <li key={technology.name} className="help-tech-card">
                      <span className="help-tech-icon" aria-hidden="true">
                        <Icon size={20} />
                      </span>
                      <div>
                        <div className="help-tech-title">
                          <strong>{technology.name}</strong>
                          {technology.version ? <span>{technology.version}</span> : null}
                        </div>
                        <p>{technology.description[language]}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <p className="help-stack-note">{copy.stackNote}</p>
      </section>

      <section className="help-guide-section" aria-labelledby="help-open-apps">
        <h3 id="help-open-apps">{copy.openTitle}</h3>
        <ul>
          {copy.openItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="help-guide-section" aria-labelledby="help-search">
        <h3 id="help-search">{copy.searchTitle}</h3>
        <p>
          {copy.search} <kbd>Ctrl</kbd> + <kbd>K</kbd> {copy.searchEnd}
        </p>
      </section>

      <section className="help-guide-section" aria-labelledby="help-terminal">
        <h3 id="help-terminal">{copy.terminalTitle}</h3>
        <p>
          {copy.terminalIntro} <kbd>Enter</kbd>. {copy.terminalEnd}
        </p>
        <div className="help-command-list" aria-label={copy.commandsLabel}>
          {terminalCommands.map((command) => (
            <code key={command}>{command}</code>
          ))}
        </div>
        <div className="help-command-examples">
          <span>{copy.examples}</span>
          <code>open atlas-splitter</code>
          <code>open ingles-pa-la-paz</code>
        </div>
      </section>

      <footer className="help-guide-note">
        <span aria-hidden="true">●</span>
        <p>{copy.tip}</p>
      </footer>
    </article>
  );
}
