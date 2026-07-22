import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, LockKeyhole } from "lucide-react";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="share-page">
      <div className="share-cosmos" aria-hidden="true" />
      <article className="share-card">
        <Link href="/">
          <ArrowLeft size={16} /> Volver a Urano OS
        </Link>
        <div className={`share-visual visual-${project.accent}`}>
          <span />
          <p>{project.title}</p>
        </div>
        <header>
          <div>
            <p className="section-kicker">{project.eyebrow}</p>
            <h1>{project.title}</h1>
          </div>
          <span className="status-badge">{project.status}</span>
        </header>
        <p className="share-description">{project.longDescription}</p>
        <div className="project-detail-grid">
          <section>
            <h2>Retos técnicos</h2>
            <ul>
              {project.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Aprendizajes</h2>
            <ul>
              {project.learnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className="tag-row">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <footer>
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noreferrer">
              <ExternalLink size={16} /> Abrir demo
            </a>
          ) : (
            <span>
              <LockKeyhole size={15} /> Demo y repositorio pendientes de verificación
            </span>
          )}
        </footer>
      </article>
    </main>
  );
}
