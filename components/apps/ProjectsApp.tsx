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
  LockKeyhole,
  SearchCheck,
  Table2,
} from "lucide-react";
import Image from "next/image";
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
import { projects } from "@/data/projects";
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

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.accent}`} aria-hidden="true">
      <span className="visual-orbit" />
      <span className="visual-panel panel-one" />
      <span className="visual-panel panel-two" />
      <p>
        {project.title.split(" ").map((word) => (
          <span key={word}>{word}</span>
        ))}
      </p>
    </div>
  );
}

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);

  if (selected) {
    const primaryLink = selected.demo ?? selected.repository;
    const primaryLabel = selected.demo ? "Visitar proyecto" : "Abrir repositorio";
    const visualSlides = Array.from({ length: 3 }, (_, index) => selected.visuals[index] ?? null);

    return (
      <article className="app-scroll project-case-study">
        <div className="project-case-layout">
          <section className="project-case-copy">
            <header className="project-case-intro">
              <button className="text-button" onClick={() => setSelected(null)}>
                <ArrowLeft size={15} /> Todos los proyectos
              </button>
              <div className="project-case-title-row">
                <p className="section-kicker">{selected.eyebrow}</p>
                <span className="status-badge">{selected.status}</span>
              </div>
              <h2>{selected.title}</h2>
              <p className="project-case-meta">{selected.role} · {selected.period}</p>

              <div className="project-case-actions">
                {primaryLink ? (
                  <a href={primaryLink} target="_blank" rel="noreferrer">
                    {primaryLabel} <ExternalLink size={13} />
                  </a>
                ) : (
                  <span><LockKeyhole size={13} /> Enlace pendiente</span>
                )}
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
                    {selected.tasks.map((task) => <span key={task}>{task}</span>)}
                  </div>
                </div>
              </div>
            </header>

            <div className="project-case-narrative">
              <section>
                <h3>Overview</h3>
                <p>{selected.longDescription}</p>
              </section>
              <section>
                <h3>Stack</h3>
                <p>{selected.outcome} El stack combina {selected.technologies.join(", ")} para sostener el flujo principal del producto.</p>
              </section>
              <section>
                <h3>Technical challenges</h3>
                <ul>
                  {selected.challenges.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
              <section>
                <h3>Key decisions</h3>
                <ul>
                  {selected.learnings.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </div>
          </section>

          <aside className="project-case-visuals">
            <header><strong>Visuals</strong><span>3 slides</span></header>
            <div className="project-case-gallery">
              {visualSlides.map((visual, index) => (
                <figure key={visual?.src ?? `placeholder-${index}`}>
                  <div className="project-case-frame">
                    {visual ? (
                      <Image src={visual.src} alt={visual.alt} fill sizes="(max-width: 800px) 100vw, 58vw" />
                    ) : (
                      <div className="project-case-placeholder">
                        <ProjectVisual project={selected} />
                        <span>Screenshot slot {String(index + 1).padStart(2, "0")}</span>
                        <strong>Captura pendiente</strong>
                        <p>{selected.challenges[index] ?? selected.description}</p>
                      </div>
                    )}
                  </div>
                  <figcaption>{visual?.caption ?? `Slide ${index + 1} · Visual pendiente`}</figcaption>
                </figure>
              ))}
            </div>
          </aside>
        </div>
      </article>
    );
  }

  return (
    <article className="app-scroll works-editorial">
      <header className="works-editorial-header">
        <h2>Works</h2>
        <p>
          Explora proyectos seleccionados, sus periodos, decisiones técnicas y resultados. Cada tarjeta
          abre una ficha con el contexto completo del trabajo.
        </p>
      </header>

      <section className="works-panel works-project-list" aria-labelledby="works-list-title">
        <h3 id="works-list-title">Project List</h3>
        <div>
          {projects.map((project) => (
            <button key={project.slug} onClick={() => setSelected(project)}>
              <span className="works-project-card-top">
                <span className="works-project-heading">
                  <strong>{project.title}</strong>
                  <span>{project.role} · {project.context}</span>
                </span>
                <span className="works-project-status">{project.status}</span>
              </span>
              <span className="works-project-outcome">{project.outcome}</span>
              <span className="works-project-card-action">
                <span>{project.period}</span>
                <span>Ver proyecto <ArrowUpRight size={14} aria-hidden="true" /></span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="works-panel works-timeline-panel" aria-labelledby="works-timeline-title">
        <h3 id="works-timeline-title">Timeline · 2026</h3>
        <p className="works-timeline-note">
          La posición muestra los meses activos; el periodo exacto aparece dentro de cada barra.
        </p>
        <div className="works-timeline-scroll">
          <div className="works-timeline">
            <div className="works-timeline-years" aria-hidden="true">
              <span>Projects</span>
              <span>Ene</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
            <div className="works-timeline-chart">
              <div className="works-timeline-now"><span>Hoy</span></div>
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
