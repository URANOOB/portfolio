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

interface Technology {
  name: string;
  version?: string;
  description: string;
  icon: ElementType;
}

interface TechnologyGroup {
  id: string;
  label: string;
  summary: string;
  tone: string;
  items: Technology[];
}

const technologyGroups: TechnologyGroup[] = [
  {
    id: "core",
    label: "Núcleo de la aplicación",
    summary: "La base que organiza las rutas, componentes y contratos de datos.",
    tone: "blue",
    items: [
      {
        name: "Next.js",
        version: "16.2",
        description: "App Router, páginas de proyectos, metadata, imágenes y la API de contacto.",
        icon: SiNextdotjs,
      },
      {
        name: "React",
        version: "19.2",
        description: "Construye las aplicaciones, ventanas y controles interactivos del escritorio.",
        icon: SiReact,
      },
      {
        name: "React DOM",
        version: "19.2",
        description: "Hidrata la interfaz en el navegador y conecta los componentes con el DOM.",
        icon: SiReact,
      },
      {
        name: "TypeScript",
        version: "5.9",
        description: "Tipa componentes, stores, datos y contratos para reducir errores al desarrollar.",
        icon: SiTypescript,
      },
      {
        name: "React Server Components",
        version: "RSC",
        description: "Separa trabajo de servidor y cliente para entregar una carga inicial más eficiente.",
        icon: ServerCog,
      },
    ],
  },
  {
    id: "interface",
    label: "Interfaz y experiencia",
    summary: "Estilos, movimiento, estado e iconografía que dan vida a R/COON.",
    tone: "orange",
    items: [
      {
        name: "CSS",
        description: "Define temas, variables, ventanas, diseño responsive y la apariencia del escritorio.",
        icon: SiCss,
      },
      {
        name: "Tailwind CSS",
        version: "4.2",
        description: "Aporta la base de utilidades y se integra al CSS global mediante PostCSS.",
        icon: SiTailwindcss,
      },
      {
        name: "Framer Motion",
        version: "12.42",
        description: "Anima el arranque, el dock, los menús y las transiciones de las ventanas.",
        icon: SiFramer,
      },
      {
        name: "Zustand",
        version: "5.0",
        description: "Guarda el estado de ventanas y preferencias visuales de forma ligera y persistente.",
        icon: Boxes,
      },
      {
        name: "Lucide React",
        version: "1.25",
        description: "Proporciona los iconos funcionales para acciones, aplicaciones y navegación.",
        icon: SiLucide,
      },
      {
        name: "React Icons",
        version: "5.7",
        description: "Reúne logotipos de tecnologías para proyectos y esta guía visual.",
        icon: Shapes,
      },
    ],
  },
  {
    id: "tooling",
    label: "Desarrollo y compilación",
    summary: "El sistema que ejecuta, transforma y empaqueta el proyecto.",
    tone: "violet",
    items: [
      {
        name: "Vinext",
        version: "0.0.50",
        description: "Ejecuta la aplicación compatible con Next.js sobre Vite y Cloudflare Workers.",
        icon: Zap,
      },
      {
        name: "Vite",
        version: "8.0",
        description: "Ofrece el servidor de desarrollo, HMR y el empaquetado de producción.",
        icon: SiVite,
      },
      {
        name: "Vite React + RSC",
        description: "Integra React y los entornos de Server Components dentro del pipeline de Vite.",
        icon: Braces,
      },
      {
        name: "Node.js",
        version: "22+",
        description: "Ejecuta scripts, compilaciones y las pruebas automatizadas del proyecto.",
        icon: SiNodedotjs,
      },
      {
        name: "PostCSS",
        description: "Procesa Tailwind y transforma la hoja global durante la compilación.",
        icon: SiPostcss,
      },
      {
        name: "Cross-env",
        version: "10.1",
        description: "Mantiene las variables de los scripts compatibles entre Windows y otros sistemas.",
        icon: Terminal,
      },
    ],
  },
  {
    id: "delivery",
    label: "Despliegue y calidad",
    summary: "Servicios y controles que permiten publicar el sitio con confianza.",
    tone: "green",
    items: [
      {
        name: "Cloudflare Workers",
        description: "Ejecuta la aplicación en el edge y sirve las respuestas del portafolio.",
        icon: SiCloudflareworkers,
      },
      {
        name: "Cloudflare Images",
        description: "Optimiza imágenes bajo demanda y entrega formatos modernos como WebP.",
        icon: Images,
      },
      {
        name: "Wrangler",
        version: "4.92",
        description: "Simula bindings localmente y prepara la configuración del Worker.",
        icon: CloudCog,
      },
      {
        name: "OpenAI Sites",
        description: "Conecta la compilación del sitio con su infraestructura de hosting en Cloudflare.",
        icon: Workflow,
      },
      {
        name: "Vercel",
        description: "Mantiene una ruta alternativa de compilación y despliegue para Next.js.",
        icon: SiVercel,
      },
      {
        name: "ESLint",
        version: "9.39",
        description: "Detecta problemas de código y aplica reglas compatibles con Next.js.",
        icon: SiEslint,
      },
      {
        name: "Prettier",
        version: "3.9",
        description: "Uniforma automáticamente el formato del código y los estilos.",
        icon: SiPrettier,
      },
      {
        name: "Git",
        description: "Registra la evolución del proyecto y facilita revisar cada cambio.",
        icon: SiGit,
      },
    ],
  },
];

export function HelpApp() {
  return (
    <article className="app-scroll help-guide">
      <header className="help-guide-header">
        <span>R/COON / DOCUMENTACIÓN</span>
        <h2>Guía del portafolio</h2>
        <p>
          Este sitio funciona como un escritorio interactivo. Abre aplicaciones, mueve y organiza ventanas,
          explora mi trabajo y recorre el portafolio desde la búsqueda o la Terminal.
        </p>
      </header>

      <section className="help-stack-section" aria-labelledby="help-stack">
        <header className="help-stack-intro">
          <div>
            <span>STACK DEL PROYECTO</span>
            <h3 id="help-stack">Tecnologías que hacen funcionar R/COON</h3>
          </div>
          <p>
            Del componente que ves en pantalla al despliegue en el edge: estas son las piezas del proyecto y
            la función que cumple cada una.
          </p>
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
                  <h4 id={`help-tech-${group.id}`}>{group.label}</h4>
                </div>
                <p>{group.summary}</p>
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
                        <p>{technology.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <p className="help-stack-note">
          Los paquetes de tipos y configuración se agrupan con TypeScript, Vite, ESLint y Prettier para evitar
          repetir herramientas que cumplen la misma función.
        </p>
      </section>

      <section className="help-guide-section" aria-labelledby="help-open-apps">
        <h3 id="help-open-apps">Cómo abrir aplicaciones</h3>
        <ul>
          <li>Selecciona un icono del dock para abrir su ventana o traerla al frente.</li>
          <li>Usa los accesos movibles del escritorio para entrar a Currículum y Logística.</li>
          <li>
            Arrastra una ventana desde su barra superior; también puedes minimizarla, ampliarla o cerrarla.
          </li>
        </ul>
      </section>

      <section className="help-guide-section" aria-labelledby="help-search">
        <h3 id="help-search">Búsqueda rápida</h3>
        <p>
          Presiona <kbd>Ctrl</kbd> + <kbd>K</kbd> para abrir Búsqueda y localizar rápidamente secciones como
          Sobre mí, Experiencia, Logística, Works o Contacto.
        </p>
      </section>

      <section className="help-guide-section" aria-labelledby="help-terminal">
        <h3 id="help-terminal">Inicio rápido de Terminal</h3>
        <p>
          Abre Terminal desde el dock, escribe un comando y presiona <kbd>Enter</kbd>. Estos son los comandos
          disponibles:
        </p>
        <div className="help-command-list" aria-label="Comandos disponibles">
          {terminalCommands.map((command) => (
            <code key={command}>{command}</code>
          ))}
        </div>
        <div className="help-command-examples">
          <span>También puedes abrir proyectos directamente:</span>
          <code>open atlas-splitter</code>
          <code>open ingles-pa-la-paz</code>
        </div>
      </section>

      <footer className="help-guide-note">
        <span aria-hidden="true">●</span>
        <p>Consejo: el punto debajo de un icono indica que la aplicación está abierta.</p>
      </footer>
    </article>
  );
}
