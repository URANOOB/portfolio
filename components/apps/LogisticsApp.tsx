"use client";

import { ChevronDown, Truck } from "lucide-react";
import { useState } from "react";
import { logisticsExperience as logisticsExperienceEs } from "@/data/experience";
import { logisticsExperience as logisticsExperienceEn } from "@/data/experience-en";
import { usePreferencesStore } from "@/store/preferences-store";

export function LogisticsApp() {
  const [expanded, setExpanded] = useState(0);
  const language = usePreferencesStore((state) => state.language);
  const logisticsExperience = language === "es" ? logisticsExperienceEs : logisticsExperienceEn;

  return (
    <article className="app-scroll experience-app">
      <header className="app-section-header">
        <div>
          <p className="section-kicker">
            {language === "es" ? "LOGÍSTICA INTERNACIONAL" : "INTERNATIONAL LOGISTICS"}
          </p>
          <h2>
            {language === "es"
              ? "Background operativo y coordinación."
              : "Operational background & coordination."}
          </h2>
          <p>
            {language === "es"
              ? "Experiencia en transporte, trazabilidad, servicio bilingüe, gestión de novedades y comunicación entre clientes, aliados y equipos internos."
              : "Experience in transport, traceability, bilingual service, issue management, and communication between clients, partners, and internal teams."}
          </p>
        </div>
        <span>
          {logisticsExperience.length}{" "}
          {language === "es" ? "entornos profesionales" : "professional environments"}
        </span>
      </header>
      <div className="timeline">
        {logisticsExperience.map((item, index) => (
          <section className={`timeline-item ${expanded === index ? "expanded" : ""}`} key={item.company}>
            <div className="timeline-rail">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <button
              className="timeline-summary"
              onClick={() => setExpanded(expanded === index ? -1 : index)}
              aria-expanded={expanded === index}
            >
              <div className="company-mark">
                <Truck size={18} />
              </div>
              <div>
                {item.period ? <p>{item.period}</p> : null}
                <h3>{item.company}</h3>
                <span>{item.role}</span>
              </div>
              <ChevronDown size={18} />
            </button>
            {expanded === index ? (
              <div className="timeline-details">
                <p>{item.summary}</p>
                <ul>
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
                <div className="tag-row">
                  {item.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
