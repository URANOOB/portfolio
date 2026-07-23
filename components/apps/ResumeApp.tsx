"use client";

import { Download, ExternalLink, FileCode2, FileText, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { usePreferencesStore } from "@/store/preferences-store";

type ResumeId = "software" | "logistica";

const resumes = {
  software: {
    id: "software",
    shortTitle: { es: "Software", en: "Software" },
    title: { es: "Ingeniería de software", en: "Software Engineering" },
    subtitle: { es: "Desarrollo full-stack · Python · Java", en: "Full-stack development · Python · Java" },
    description: {
      es: "Proyectos, experiencia técnica, formación y herramientas de desarrollo.",
      en: "Projects, technical experience, education and dev tools.",
    },
    file: "/cv/william-galeano-desarrollo.pdf",
    downloadName: "William-Galeano-CV-Software.pdf",
    preview: "/cv/william-galeano-desarrollo-preview.png",
    icon: FileCode2,
  },
  logistica: {
    id: "logistica",
    shortTitle: { es: "Logística", en: "Logistics" },
    title: { es: "Logística y operaciones", en: "Logistics and operations" },
    subtitle: {
      es: "Coordinación · Transporte · Trazabilidad",
      en: "Coordination · Transport · Traceability",
    },
    description: {
      es: "Experiencia en operaciones de transporte, servicio y gestión bilingüe.",
      en: "Experience in transport operations, service, and bilingual management.",
    },
    file: "/cv/william-galeano-logistica.pdf",
    downloadName: "William-Galeano-CV-Logistica.pdf",
    preview: "/cv/william-galeano-logistica-preview.png",
    icon: Truck,
  },
} as const;

export function ResumeApp() {
  const language = usePreferencesStore((state) => state.language);
  const [selectedId, setSelectedId] = useState<ResumeId>("software");
  const selected = resumes[selectedId];

  return (
    <div className="resume-app">
      <aside className="resume-library" aria-label="Hojas de vida disponibles">
        <header className="resume-library-head">
          <span>{language === "es" ? "CURRÍCULUM" : "RESUME"}</span>
          <h2>{language === "es" ? "Dos perfiles, una trayectoria." : "Two profiles, one trajectory."}</h2>
          <p>
            {language === "es"
              ? "Selecciona una hoja de vida para verla completa."
              : "Select a resume to view it in full."}
          </p>
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
                    <Icon size={15} /> {resume.shortTitle[language]}
                  </span>
                  <small>{resume.description[language]}</small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="resume-library-note">
          <FileText size={15} />
          <p>
            {language === "es"
              ? "Ambos documentos están optimizados para selección de talento y conservan su formato original."
              : "Both documents are optimized for talent selection and keep their original format."}
          </p>
        </div>
      </aside>

      <section className="resume-viewer" aria-label={`Visor de ${selected.title[language]}`}>
        <header className="resume-viewer-toolbar">
          <div>
            <span>{selected.shortTitle[language]}</span>
            <strong>{selected.title[language]}</strong>
            <small>
              {selected.subtitle[language]} · PDF · {language === "es" ? "2 páginas" : "2 pages"}
            </small>
          </div>
          <nav aria-label="Acciones del documento">
            <a href={selected.file} target="_blank" rel="noreferrer">
              <ExternalLink size={15} /> <span>{language === "es" ? "Abrir" : "Open"}</span>
            </a>
            <a href={selected.file} download={selected.downloadName} className="resume-download">
              <Download size={15} /> <span>{language === "es" ? "Descargar" : "Download"}</span>
            </a>
          </nav>
        </header>

        <div className="resume-pdf-shell">
          <iframe
            key={selected.id}
            title={`Hoja de vida de William Galeano para ${selected.title[language]}`}
            src={`${selected.file}#page=1&view=FitH&toolbar=0&navpanes=0`}
          />
          <div className="resume-pdf-fallback">
            <Image
              src={selected.preview}
              alt={`Primera página de la hoja de vida de ${selected.title[language]}`}
              width={935}
              height={1210}
            />
            <p>
              {language === "es"
                ? "Si el visor no carga en tu navegador, abre el documento en una pestaña nueva."
                : "If the viewer does not load in your browser, open the document in a new tab."}
            </p>
            <a href={selected.file} target="_blank" rel="noreferrer">
              {language === "es" ? "Abrir PDF" : "Open PDF"} <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
