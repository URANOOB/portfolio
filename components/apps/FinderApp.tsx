"use client";

import { ChevronRight, FileText, Folder, Search } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

const folders = [
  { id: "profile", label: "Perfil", action: "about" as AppId },
  { id: "experience", label: "Experiencia", action: "experience" as AppId },
  { id: "projects", label: "Proyectos", action: "projects" as AppId },
  { id: "education", label: "Educación" },
  { id: "certifications", label: "Certificaciones" },
  { id: "skills", label: "Tecnologías", action: "skills" as AppId },
  { id: "ingles", label: "Inglés Pa’ la Paz", action: "projects" as AppId },
  { id: "atlas", label: "Atlas Splitter", action: "projects" as AppId },
];

const notes: Record<string, string> = {
  profile: `# ${profile.name}\n\n${profile.intro}\n\n**Ubicación:** ${profile.location}\n\n**Idiomas:** ${profile.languages.join(" · ")}`,
  experience:
    "# Experiencia\n\nTrayectoria en logística internacional, servicio bilingüe y desarrollo de soluciones digitales.",
  projects: `# Proyectos\n\n${projects.map((project) => `- **${project.title}:** ${project.description}`).join("\n")}`,
  education: `# Educación\n\n${profile.educationNote}`,
  certifications: `# Certificaciones\n\n${profile.certificationsNote}`,
  skills:
    "# Tecnologías\n\nReact, Next.js, TypeScript, JavaScript, Node.js, SQL, Java, Python y herramientas de automatización.",
  ingles: `# Inglés Pa’ la Paz\n\n${projects[1].longDescription}`,
  atlas: `# Atlas Splitter\n\n${projects[0].longDescription}`,
};

export function FinderApp() {
  const [selected, setSelected] = useState("profile");
  const [query, setQuery] = useState("");
  const openWindow = useWindowStore((state) => state.openWindow);
  const visibleFolders = folders.filter((folder) => folder.label.toLowerCase().includes(query.toLowerCase()));
  const current = folders.find((folder) => folder.id === selected) ?? folders[0];

  return (
    <div className="finder-app">
      <aside className="finder-sidebar">
        <p>Favoritos</p>
        {folders.slice(0, 6).map((folder) => (
          <button
            key={folder.id}
            className={selected === folder.id ? "selected" : ""}
            onClick={() => setSelected(folder.id)}
          >
            <Folder size={16} /> {folder.label}
          </button>
        ))}
      </aside>
      <section className="finder-main">
        <div className="finder-toolbar">
          <div>
            <FileText size={16} />
            <span>William / {current.label}</span>
          </div>
          <label>
            <Search size={15} />
            <span className="sr-only">Buscar carpeta</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar" />
          </label>
        </div>
        <div className="folder-grid" aria-label="Carpetas del portafolio">
          {visibleFolders.map((folder) => (
            <button
              key={folder.id}
              className={selected === folder.id ? "selected" : ""}
              onClick={() => setSelected(folder.id)}
              onDoubleClick={() => folder.action && openWindow(folder.action)}
            >
              <span className="folder-shape">
                <Folder size={29} />
              </span>
              <span>{folder.label}</span>
            </button>
          ))}
        </div>
        <article className="finder-preview markdown-content">
          <ReactMarkdown>{notes[selected]}</ReactMarkdown>
          {current.action ? (
            <button onClick={() => openWindow(current.action!)}>
              Abrir aplicación <ChevronRight size={15} />
            </button>
          ) : null}
        </article>
      </section>
    </div>
  );
}
