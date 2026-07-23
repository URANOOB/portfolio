import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CodeXml, ExternalLink } from "lucide-react";
import { ProjectLanguageSync } from "@/components/projects/ProjectLanguageSync";
import { getProject as getSpanishProject, projects as spanishProjects } from "@/data/projects";
import { projects as englishProjects } from "@/data/projects-en";

type ProjectLanguage = "es" | "en";
type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

function getLanguage(value?: string): ProjectLanguage {
  return value === "en" ? "en" : "es";
}

function getProject(slug: string, language: ProjectLanguage) {
  return language === "es"
    ? getSpanishProject(slug)
    : englishProjects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return spanishProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, { lang }] = await Promise.all([params, searchParams]);
  const language = getLanguage(lang);
  const project = getProject(slug, language);
  if (!project) return {};
  const canonical = `/projects/${project.slug}${language === "en" ? "?lang=en" : ""}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} | William Galeano`,
      description: project.description,
      type: "article",
      url: canonical,
      siteName: "R/COON OS",
    },
  };
}

export default async function ProjectPage({ params, searchParams }: PageProps) {
  const [{ slug }, { lang }] = await Promise.all([params, searchParams]);
  const language = getLanguage(lang);
  const project = getProject(slug, language);
  if (!project) notFound();

  const copy =
    language === "es"
      ? {
          back: "Volver a R/COON OS",
          status: "Estado",
          stack: "Stack tecnológico",
          challenges: "Retos técnicos",
          learnings: "Aprendizajes",
          repository: "Abrir repositorio",
          demo: "Abrir demo",
          additional: "Enlace adicional",
        }
      : {
          back: "Back to R/COON OS",
          status: "Status",
          stack: "Technology stack",
          challenges: "Technical challenges",
          learnings: "Learnings",
          repository: "Open repository",
          demo: "Open demo",
          additional: "Additional link",
        };
  const backHref = language === "en" ? "/?lang=en" : "/";

  return (
    <main className="share-page">
      <ProjectLanguageSync language={language} />
      <div className="share-cosmos" aria-hidden="true" />
      <article className="share-card">
        <Link href={backHref}>
          <ArrowLeft size={16} /> {copy.back}
        </Link>
        <div className={`share-visual visual-${project.accent}`} aria-hidden="true">
          <span />
          <p>{project.title}</p>
        </div>
        <header>
          <div>
            <p className="section-kicker">{project.eyebrow}</p>
            <h1>{project.title}</h1>
          </div>
          <span className="status-badge" aria-label={`${copy.status}: ${project.status}`}>
            {project.status}
          </span>
        </header>
        <p className="share-description">{project.longDescription}</p>
        <section className="project-detail-grid" aria-label={copy.stack}>
          <div>
            <h2>{copy.stack}</h2>
            <div className="tag-row">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
          <div>
            <h2>{copy.challenges}</h2>
            <ul>
              {project.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{copy.learnings}</h2>
            <ul>
              {project.learnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
        <footer>
          {project.repository ? (
            <a
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              aria-label={`${copy.repository}: ${project.title}`}
            >
              <CodeXml size={16} /> {copy.repository}
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${copy.demo}: ${project.title}`}
            >
              <ExternalLink size={16} /> {copy.demo}
            </a>
          ) : null}
          {project.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${copy.additional}: ${link.label}`}
            >
              <ExternalLink size={16} /> {link.label}
            </a>
          ))}
        </footer>
      </article>
    </main>
  );
}
