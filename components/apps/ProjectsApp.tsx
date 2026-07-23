"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Braces,
  Database,
  ExternalLink,
  FileImage,
  FileText,
  Images,
  SearchCheck,
  Table2,
} from "lucide-react";
import type { ElementType } from "react";
import { useState } from "react";
import { FaJava } from "react-icons/fa6";
import {
  SiEclipseide,
  SiFramer,
  SiGit,
  SiNextdotjs,
  SiOpencv,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { projects as projectsEs } from "@/data/projects";
import { projects as projectsEn } from "@/data/projects-en";
import { usePreferencesStore } from "@/store/preferences-store";
import type { Project } from "@/types/portfolio";

const MIN_TIMELINE_SPAN = 14;

const TECHNOLOGY_ICONS: Record<string, ElementType> = {
  Python: SiPython,
  OpenCV: SiOpencv,
  "Procesamiento de imágenes": Images,
  WEBP: FileImage,
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  "Base de datos": Database,
  "Java 8": FaJava,
  Eclipse: SiEclipseide,
  TXT: FileText,
  CSV: Table2,
  Git: SiGit,
  "Tailwind CSS": SiTailwindcss,
  "SEO local": SearchCheck,
  "Framer Motion": SiFramer,
};

function getTimelineBar(project: Project) {
  const actualSpan = project.timeline.end - project.timeline.start;

  if (actualSpan >= MIN_TIMELINE_SPAN) {
    return { left: project.timeline.start, width: actualSpan };
  }

  const center = (project.timeline.start + project.timeline.end) / 2;
  const left = Math.max(0, Math.min(center - MIN_TIMELINE_SPAN / 2, 100 - MIN_TIMELINE_SPAN));

  return { left, width: MIN_TIMELINE_SPAN };
}

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);
  const language = usePreferencesStore((state) => state.language);
  const projects = language === "es" ? projectsEs : projectsEn;

  if (selected) {
    const primaryLink = selected.demo ?? selected.repository;
    const primaryLabel = selected.demo
      ? language === "es"
        ? "Visitar proyecto"
        : "Visit project"
      : language === "es"
        ? "Abrir repositorio"
        : "Open repository";
    return (
      <article className="app-scroll project-case-study">
        <section className="project-case-copy">
          <header className="project-case-intro">
            <button className="text-button" onClick={() => setSelected(null)}>
              <ArrowLeft size={15} /> {language === "es" ? "Todos los proyectos" : "All projects"}
            </button>
            <div className="project-case-title-row">
              <p className="section-kicker">{selected.eyebrow}</p>
              <span className="status-badge">{selected.status}</span>
            </div>
            <h2>{selected.title}</h2>
            <p className="project-case-meta">
              {selected.role} · {selected.period}
            </p>

            <div className="project-case-actions">
              {primaryLink ? (
                <a href={primaryLink} target="_blank" rel="noreferrer">
                  {primaryLabel} <ExternalLink size={13} />
                </a>
              ) : null}
              {selected.repository && selected.demo ? (
                <a href={selected.repository} target="_blank" rel="noreferrer">
                  {language === "es" ? "Repositorio" : "Repository"} <ExternalLink size={13} />
                </a>
              ) : null}
              {selected.links?.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <ExternalLink size={13} />
                </a>
              ))}
            </div>

            <div className="project-case-facts">
              <div>
                <h3>Tech stack</h3>
                <div className="project-case-tags">
                  {selected.technologies.map((technology) => {
                    const TechnologyIcon = TECHNOLOGY_ICONS[technology] ?? Braces;

                    return (
                      <span key={technology}>
                        <TechnologyIcon size={13} aria-hidden="true" />
                        {technology}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3>Tasks</h3>
                <div className="project-case-tags project-task-tags">
                  {selected.tasks.map((task) => (
                    <span key={task}>{task}</span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <div className="project-case-narrative">
            <section>
              <h3>{language === "es" ? "Resumen" : "Overview"}</h3>
              <p>{selected.longDescription}</p>
            </section>
            <section>
              <h3>Stack</h3>
              <p>
                {selected.outcome} {language === "es" ? "El stack combina" : "The stack combines"}{" "}
                {selected.technologies.join(", ")}{" "}
                {language === "es"
                  ? "para sostener el flujo principal del producto."
                  : "to support the product's main workflow."}
              </p>
            </section>
            <section>
              <h3>{language === "es" ? "Desafíos técnicos" : "Technical challenges"}</h3>
              <ul>
                {selected.challenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h3>{language === "es" ? "Decisiones clave" : "Key decisions"}</h3>
              <ul>
                {selected.learnings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </article>
    );
  }

  return (
    <article className="app-scroll works-editorial">
      <header className="works-editorial-header">
        <h2>{language === "es" ? "Proyectos" : "Works"}</h2>
        <p>
          {language === "es"
            ? "Explora proyectos seleccionados, sus periodos, decisiones técnicas y resultados. Cada tarjeta abre una ficha con el contexto completo del trabajo."
            : "Explore selected projects, their periods, technical decisions, and outcomes. Each card opens a file with full context of the work."}
        </p>
      </header>

      <section className="works-panel works-project-list" aria-labelledby="works-list-title">
        <h3 id="works-list-title">{language === "es" ? "Lista de Proyectos" : "Project List"}</h3>
        <div>
          {projects.map((project) => (
            <button key={project.slug} onClick={() => setSelected(project)}>
              <span className="works-project-card-top">
                <span className="works-project-heading">
                  <strong>{project.title}</strong>
                  <span>
                    {project.role} · {project.context}
                  </span>
                </span>
                <span className="works-project-status">{project.status}</span>
              </span>
              <span className="works-project-outcome">{project.outcome}</span>
              <span className="works-project-card-action">
                <span>{project.period}</span>
                <span>
                  {language === "es" ? "Ver proyecto" : "View project"}{" "}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="works-panel works-timeline-panel" aria-labelledby="works-timeline-title">
        <h3 id="works-timeline-title">{language === "es" ? "Línea de tiempo · 2026" : "Timeline · 2026"}</h3>
        <p className="works-timeline-note">
          {language === "es"
            ? "La posición muestra los meses activos; el periodo exacto aparece dentro de cada barra."
            : "Position shows active months; exact period appears inside each bar."}
        </p>
        <div className="works-timeline-scroll">
          <div className="works-timeline">
            <div className="works-timeline-years" aria-hidden="true">
              <span>{language === "es" ? "Proyectos" : "Projects"}</span>
              <span>{language === "es" ? "Ene" : "Jan"}</span>
              <span>{language === "es" ? "Feb" : "Feb"}</span>
              <span>{language === "es" ? "Mar" : "Mar"}</span>
              <span>{language === "es" ? "Abr" : "Apr"}</span>
              <span>{language === "es" ? "May" : "May"}</span>
              <span>{language === "es" ? "Jun" : "Jun"}</span>
              <span>{language === "es" ? "Jul" : "Jul"}</span>
            </div>
            <div className="works-timeline-chart">
              <div className="works-timeline-now">
                <span>{language === "es" ? "Hoy" : "Today"}</span>
              </div>
              {projects.map((project) => {
                const bar = getTimelineBar(project);

                return (
                  <button
                    className="works-timeline-row"
                    key={project.slug}
                    onClick={() => setSelected(project)}
                    aria-label={`Abrir ${project.title}, ${project.period}`}
                  >
                    <span className="works-timeline-name">{project.title}</span>
                    <span className="works-timeline-grid" aria-hidden="true">
                      <i
                        className={`works-timeline-bar works-bar-${project.accent}`}
                        style={{ left: `${bar.left}%`, width: `${bar.width}%` }}
                      >
                        <span>{project.period}</span>
                      </i>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
