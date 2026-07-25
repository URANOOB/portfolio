"use client";

import { ArrowUpRight, FileText, LayoutGrid, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { socialLinks } from "@/data/profile";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";

export function AboutApp() {
  const openWindow = useWindowStore((state) => state.openWindow);
  const language = usePreferencesStore((state) => state.language);
  const contactLinks = [
    socialLinks.github
      ? { label: "GitHub", value: "@URANOOB", href: socialLinks.github, Icon: FaGithub }
      : null,
    socialLinks.linkedin
      ? { label: "LinkedIn", value: "LinkedIn", href: socialLinks.linkedin, Icon: FaLinkedin }
      : null,
    socialLinks.email
      ? {
          label: language === "es" ? "Correo" : "Email",
          value: socialLinks.email.replace("mailto:", ""),
          href: socialLinks.email,
          Icon: Mail,
        }
      : null,
    socialLinks.phone
      ? {
          label: language === "es" ? "Teléfono" : "Phone",
          value: socialLinks.phone,
          href: `tel:${socialLinks.phone}`,
          Icon: Phone,
        }
      : null,
  ];

  return (
    <article className="app-scroll about-editorial">
      <header className="about-editorial-title">
        <h2>
          <span>William</span>
          <i aria-hidden="true" />
          <span>Galeano</span>
        </h2>
        <p className="about-editorial-role">
          {language === "es" ? "Desarrollador de Software Full Stack" : "Full Stack Software Developer"}
        </p>
      </header>

      <section className="about-editorial-copy">
        <p>
          {language === "es" ? (
            <>
              Colombiano, <strong>“Rolo”</strong> —de la capital— y latinoamericano. Soy un desarrollador de
              software full stack y estudiante de Ingeniería de Software. Disfruto traducir ideas complejas en
              interfaces claras, confiables y rápidas.
            </>
          ) : (
            <>
              Colombian, <strong>“Rolo”</strong>—meaning from the capital—and Latin American. I am a full
              stack software developer and Software Engineering student. I enjoy translating complex ideas
              into interfaces that feel clear, reliable, and fast.
            </>
          )}
        </p>
        <p>
          {language === "es"
            ? "Mi experiencia previa coordinando operaciones logísticas para compañías de Estados Unidos fortaleció mi capacidad para analizar procesos, resolver incidentes y construir soluciones orientadas a necesidades reales."
            : "My previous experience coordinating logistics operations for U.S.-based companies strengthened my ability to analyze processes, resolve incidents, and build solutions around real operational needs."}
        </p>
        <p>
          {language === "es"
            ? "Fuera del código, disfruto jugar videojuegos y explorar nuevas tecnologías."
            : "Outside of code, I enjoy playing videogames and exploring new technologies."}
        </p>
      </section>

      <div
        className="about-primary-actions"
        aria-label={language === "es" ? "Acciones principales" : "Primary actions"}
      >
        <button className="about-primary-action" onClick={() => openWindow("projects")}>
          <LayoutGrid size={17} aria-hidden="true" />
          {language === "es" ? "Ver proyectos" : "View projects"}
        </button>
        <button className="about-secondary-action" onClick={() => openWindow("resume")}>
          <FileText size={17} aria-hidden="true" />
          {language === "es" ? "Abrir currículum" : "Open resume"}
        </button>
      </div>

      <section
        className="about-social-links"
        aria-label={language === "es" ? "Redes y contacto" : "Social links and contact"}
      >
        {contactLinks.map((link) => {
          if (!link) return null;
          const { label, value, href, Icon } = link;
          return (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon className="social-brand-icon" size={18} aria-hidden="true" />
              <strong>{label}</strong>
              <span>{value}</span>
              <ArrowUpRight className="social-external-icon" size={15} aria-hidden="true" />
            </a>
          );
        })}
      </section>

      <section className="about-focus">
        <h3>{language === "es" ? "Enfoque Actual" : "Current Focus"}</h3>
        <ul>
          <li>
            {language === "es" ? "Haciendo crecer " : "Growing "}
            <button onClick={() => openWindow("projects")}>Inglés Pa&apos; La Paz</button>
            {language === "es"
              ? " mientras valido ideas y ayudo a construir educación gratuita."
              : " while validating ideas and helping to build free education."}
          </li>
          <li>
            {language === "es"
              ? "Desarrollando soluciones tech a medio tiempo en Ingenio Empresarial."
              : "Building part-time Ingenio Empresarial tech solutions."}
          </li>
          <li>
            {language === "es"
              ? "Continuando mis estudios de ingeniería de software en el Politécnico Grancolombiano."
              : "Continuing my software engineering studies at Politécnico Grancolombiano."}
          </li>
        </ul>
      </section>

      <div className="about-editorial-footer">
        <section className="about-timeline-cta">
          <p>{language === "es" ? "Línea de Tiempo Completa" : "Full Timeline"}</p>
          <h3>
            {language === "es"
              ? "Ve mi experiencia completa en una ventana dedicada con todo el contexto."
              : "View my complete experience timeline in a dedicated window with full role context."}
          </h3>
          <button onClick={() => openWindow("experience")}>
            {language === "es" ? "Abrir Experiencia" : "Open Experience"} <ArrowUpRight size={16} />
          </button>
        </section>
        <figure className="about-raccoon">
          <Image
            src="/about-raccoon.gif"
            alt={language === "es" ? "Mapache animado en pixel art" : "Animated pixel-art raccoon"}
            width={970}
            height={610}
            unoptimized
            draggable={false}
          />
        </figure>
      </div>
    </article>
  );
}
