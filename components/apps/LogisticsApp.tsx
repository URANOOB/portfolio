"use client";

import { ChevronDown, Truck } from "lucide-react";
import { useState } from "react";
import { logisticsExperience } from "@/data/experience";

export function LogisticsApp() {
  const [expanded, setExpanded] = useState(0);

  return (
    <article className="app-scroll experience-app">
      <header className="app-section-header">
        <div>
          <p className="section-kicker">LOGÍSTICA INTERNACIONAL</p>
          <h2>Background operativo y coordinación.</h2>
          <p>
            Experiencia en transporte, trazabilidad, servicio bilingüe, gestión de novedades y
            comunicación entre clientes, aliados y equipos internos.
          </p>
        </div>
        <span>{logisticsExperience.length} entornos profesionales</span>
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
                <p>{item.period}</p>
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
      <p className="data-note">
        Los cargos y periodos se muestran de forma prudente hasta validar el CV fuente. No se publican
        métricas inventadas.
      </p>
    </article>
  );
}
