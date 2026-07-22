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
    <article className="app-scroll projects-app">
      <header className="app-section-header">
        <div>
          <p className="section-kicker">TRABAJO SELECCIONADO</p>
          <h2>Productos con una razón de ser.</h2>
        </div>
        <p>Explora el reto, el proceso y lo aprendido.</p>
      </header>
      <div className="projects-grid">
        {projects.map((project) => (
          <button className="project-card" key={project.slug} onClick={() => setSelected(project)}>
            <ProjectVisual project={project} />
            <div className="project-card-copy">
              <span>{project.eyebrow}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div>
                <span className="status-dot" /> {project.status}
                <ArrowUpRight size={17} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </article>
  );
}
