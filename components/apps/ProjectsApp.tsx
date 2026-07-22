"use client";

import { ArrowLeft, ArrowUpRight, CodeXml, ExternalLink, LockKeyhole, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/types/portfolio";

const MIN_TIMELINE_SPAN = 20;

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
    return (
      <article className="app-scroll project-detail">
        <button className="text-button" onClick={() => setSelected(null)}>
          <ArrowLeft size={16} /> Todos los proyectos
        </button>
        <ProjectVisual project={selected} />
        <div className="project-detail-head">
          <div>
            <p className="section-kicker">{selected.eyebrow}</p>
            <h2>{selected.title}</h2>
          </div>
          <span className="status-badge">{selected.status}</span>
        </div>
        <p className="project-long-description">{selected.longDescription}</p>
        <div className="project-detail-grid">
          <section>
            <h3>Retos técnicos</h3>
            <ul>
              {selected.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Aprendizajes</h3>
            <ul>
              {selected.learnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className="tag-row">
          {selected.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <div className="project-links">
          {selected.repository ? (
            <a href={selected.repository} target="_blank" rel="noreferrer">
              <CodeXml size={16} /> Repositorio
            </a>
          ) : (
            <button disabled>
              <CodeXml size={16} /> Repositorio
            </button>
          )}
          {selected.demo ? (
            <a href={selected.demo} target="_blank" rel="noreferrer">
              <ExternalLink size={16} /> Demo
            </a>
          ) : (
            <button disabled>
              <ExternalLink size={16} /> Demo
            </button>
          )}
          <Link href={`/projects/${selected.slug}`}>
            <Share2 size={16} /> Ficha compartible
          </Link>
        </div>
        {!selected.repository && !selected.demo ? (
          <p className="private-note">
            <LockKeyhole size={14} /> Repositorio y demo pendientes de publicación.
          </p>
        ) : !selected.demo ? (
          <p className="private-note">
            <LockKeyhole size={14} /> Este proyecto todavía no tiene una demo pública.
          </p>
        ) : null}
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
        <h3 id="works-timeline-title">Timeline (from 2018)</h3>
        <p className="works-timeline-note">
          La posición ubica el año; el periodo exacto aparece dentro de cada barra.
        </p>
        <div className="works-timeline-scroll">
          <div className="works-timeline">
            <div className="works-timeline-years" aria-hidden="true">
              <span>Projects</span>
              <span>2018</span>
              <span>2020</span>
              <span>2022</span>
              <span>2024</span>
              <span>2026</span>
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
