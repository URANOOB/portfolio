"use client";

import { Download, ExternalLink, FileCode2, FileText, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ResumeId = "software" | "logistica";

const resumes = {
  software: {
    id: "software",
    shortTitle: "Software",
    title: "Ingeniería de software",
    subtitle: "Desarrollo full-stack · Python · Java",
    description: "Proyectos, experiencia técnica, formación y herramientas de desarrollo.",
    file: "/cv/william-galeano-desarrollo.pdf",
    downloadName: "William-Galeano-CV-Software.pdf",
    preview: "/cv/william-galeano-desarrollo-preview.png",
    icon: FileCode2,
  },
  logistica: {
    id: "logistica",
    shortTitle: "Logística",
    title: "Logística y operaciones",
    subtitle: "Coordinación · Transporte · Trazabilidad",
    description: "Experiencia en operaciones de transporte, servicio y gestión bilingüe.",
    file: "/cv/william-galeano-logistica.pdf",
    downloadName: "William-Galeano-CV-Logistica.pdf",
    preview: "/cv/william-galeano-logistica-preview.png",
    icon: Truck,
  },
} as const;

export function ResumeApp() {
  const [selectedId, setSelectedId] = useState<ResumeId>("software");
  const selected = resumes[selectedId];

  return (
    <div className="resume-app">
      <aside className="resume-library" aria-label="Hojas de vida disponibles">
        <header className="resume-library-head">
          <span>CURRÍCULUM</span>
          <h2>Dos perfiles, una trayectoria.</h2>
          <p>Selecciona una hoja de vida para verla completa.</p>
        </header>

        <div className="resume-options" role="tablist" aria-label="Seleccionar hoja de vida">
          {Object.values(resumes).map((resume) => {
            const Icon = resume.icon;
            const isSelected = resume.id === selectedId;

            return (
              <button
                key={resume.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`resume-option${isSelected ? " is-selected" : ""}`}
                onClick={() => setSelectedId(resume.id)}
              >
                <span className="resume-option-preview" aria-hidden="true">
                  <Image src={resume.preview} alt="" width={935} height={1210} />
                </span>
                <span className="resume-option-copy">
                  <span className="resume-option-title">
                    <Icon size={15} /> {resume.shortTitle}
                  </span>
                  <small>{resume.description}</small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="resume-library-note">
          <FileText size={15} />
          <p>
            Ambos documentos están optimizados para selección de talento y conservan su formato
            original.
          </p>
        </div>
      </aside>

      <section className="resume-viewer" aria-label={`Visor de ${selected.title}`}>
        <header className="resume-viewer-toolbar">
          <div>
            <span>{selected.shortTitle}</span>
            <strong>{selected.title}</strong>
            <small>{selected.subtitle} · PDF · 2 páginas</small>
          </div>
          <nav aria-label="Acciones del documento">
            <a href={selected.file} target="_blank" rel="noreferrer">
              <ExternalLink size={15} /> <span>Abrir</span>
            </a>
            <a href={selected.file} download={selected.downloadName} className="resume-download">
              <Download size={15} /> <span>Descargar</span>
            </a>
          </nav>
        </header>

        <div className="resume-pdf-shell">
          <iframe
            key={selected.id}
            title={`Hoja de vida de William Galeano para ${selected.title}`}
            src={`${selected.file}#page=1&view=FitH&toolbar=1&navpanes=0`}
          />
          <div className="resume-pdf-fallback">
            <Image
              src={selected.preview}
              alt={`Primera página de la hoja de vida de ${selected.title}`}
              width={935}
              height={1210}
            />
            <p>Si el visor no carga en tu navegador, abre el documento en una pestaña nueva.</p>
            <a href={selected.file} target="_blank" rel="noreferrer">
              Abrir PDF <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
