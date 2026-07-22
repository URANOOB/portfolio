"use client";

import { ArrowLeft, ArrowUpRight, CodeXml, ExternalLink, LockKeyhole, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/types/portfolio";

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
          <button disabled={!selected.repository}>
            <CodeXml size={16} /> Repositorio
          </button>
          <button disabled={!selected.demo}>
            <ExternalLink size={16} /> Demo
          </button>
          <Link href={`/projects/${selected.slug}`}>
            <Share2 size={16} /> Ficha compartible
          </Link>
        </div>
        {!selected.repository || !selected.demo ? (
          <p className="private-note">
            <LockKeyhole size={14} /> Los enlaces se activarán cuando sean proporcionados y verificados.
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
          Explora proyectos seleccionados, sus periodos, decisiones técnicas y resultados. Selecciona
          cualquier trabajo para ver el contexto completo.
        </p>
      </header>

      <section className="works-panel works-project-list" aria-labelledby="works-list-title">
        <h3 id="works-list-title">Project List</h3>
        <div>
          {projects.map((project) => (
            <button key={project.slug} onClick={() => setSelected(project)}>
              <span className="works-project-heading">
                <strong>{project.title}</strong>
                <span>{project.role} · {project.period} · {project.context}</span>
              </span>
              <span className="works-project-outcome">{project.outcome}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section className="works-panel works-timeline-panel" aria-labelledby="works-timeline-title">
        <h3 id="works-timeline-title">Timeline (from 2024)</h3>
        <div className="works-timeline-scroll">
          <div className="works-timeline">
            <div className="works-timeline-years" aria-hidden="true">
              <span>Projects</span>
              <span>2024</span>
              <span>2025</span>
              <span>2026</span>
            </div>
            <div className="works-timeline-chart">
              <div className="works-timeline-now"><span>Hoy</span></div>
              {projects.map((project) => (
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
                      style={{
                        left: `${project.timeline.start}%`,
                        width: `${project.timeline.end - project.timeline.start}%`,
                      }}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
