"use client";

import { Copy, Download, ExternalLink, Printer } from "lucide-react";
import { useState } from "react";
import { experience } from "@/data/experience";
import { profile, socialLinks } from "@/data/profile";

type Variant = "desarrollo" | "logistica";

export function ResumeApp() {
  const [variant, setVariant] = useState<Variant>("desarrollo");
  const [copied, setCopied] = useState(false);
  const filename =
    variant === "desarrollo" ? "william-galeano-desarrollo.pdf" : "william-galeano-logistica.pdf";

  const copyEmail = async () => {
    if (!socialLinks.email) return;
    await navigator.clipboard.writeText(socialLinks.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="resume-app">
      <aside className="resume-toolbar">
        <p>Versión</p>
        <button
          className={variant === "desarrollo" ? "selected" : ""}
          onClick={() => setVariant("desarrollo")}
        >
          Desarrollo
        </button>
        <button className={variant === "logistica" ? "selected" : ""} onClick={() => setVariant("logistica")}>
          Logística
        </button>
        <div className="resume-actions">
          <a href={`/cv/${filename}`} download>
            <Download size={16} /> Descargar PDF
          </a>
          <button onClick={() => window.print()}>
            <Printer size={16} /> Imprimir
          </button>
          <button onClick={copyEmail} disabled={!socialLinks.email}>
            <Copy size={16} /> {copied ? "Copiado" : "Copiar correo"}
          </button>
          <a
            className={!socialLinks.linkedin ? "disabled" : ""}
            href={socialLinks.linkedin ?? undefined}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} /> LinkedIn
          </a>
        </div>
      </aside>
      <article className="resume-document" id="printable-resume">
        <header>
          <div>
            <p>WILLIAM</p>
            <h2>GALEANO</h2>
          </div>
          <span>{variant === "desarrollo" ? "SOFTWARE DEVELOPER" : "SENIOR LOGISTICS COORDINATOR"}</span>
        </header>
        <div className="resume-contact-line">
          <span>{profile.location}</span>
          <span>{profile.languages.join(" · ")}</span>
        </div>
        <section>
          <h3>PERFIL</h3>
          <p>
            {variant === "desarrollo"
              ? "Desarrollador orientado a productos web, automatización y soluciones con contexto de negocio."
              : "Coordinador de logística con experiencia en servicio internacional, seguimiento operativo y comunicación bilingüe."}{" "}
            {profile.intro}
          </p>
        </section>
        <section>
          <h3>EXPERIENCIA SELECCIONADA</h3>
          {experience.slice(0, variant === "desarrollo" ? 4 : 6).map((item) => (
            <div className="resume-line" key={item.company}>
              <div>
                <strong>{item.company}</strong>
                <span>{item.period}</span>
              </div>
              <p>
                {item.role} — {item.summary}
              </p>
            </div>
          ))}
        </section>
        <section>
          <h3>TECNOLOGÍAS Y HERRAMIENTAS</h3>
          <p>
            {variant === "desarrollo"
              ? "React · Next.js · TypeScript · JavaScript · Node.js · SQL · Python · OpenCV · Git"
              : "TMS · CRM · Hojas de cálculo · Servicio al cliente · Inglés B2+ · Seguimiento operativo"}
          </p>
        </section>
        <footer>Versión preliminar — fechas, enlaces y métricas pendientes de validación documental.</footer>
      </article>
    </div>
  );
}
