"use client";

import { BriefcaseBusiness, ChevronDown } from "lucide-react";
import { useState } from "react";
import { softwareExperience } from "@/data/experience";

export function ExperienceApp() {
  const [expanded, setExpanded] = useState(0);

  return (
    <article className="app-scroll experience-app">
      <header className="app-section-header">
        <div>
          <p className="section-kicker">SOFTWARE</p>
          <h2>Experiencia construyendo productos digitales.</h2>
          <p>Trabajo aplicado en frontend, arquitectura de contenido y mejora continua.</p>
        </div>
      </header>
      <div className="timeline">
        {softwareExperience.map((item, index) => (
          <section className={`timeline-item ${expanded === index ? "expanded" : ""}`} key={item.company}>
            <div className="timeline-rail"><span>{String(index + 1).padStart(2, "0")}</span></div>
            <button
              className="timeline-summary"
              onClick={() => setExpanded(expanded === index ? -1 : index)}
              aria-expanded={expanded === index}
            >
              <div className="company-mark"><BriefcaseBusiness size={18} /></div>
              <div><p>{item.period}</p><h3>{item.company}</h3><span>{item.role}</span></div>
              <ChevronDown size={18} />
            </button>
            {expanded === index ? (
              <div className="timeline-details">
                <p>{item.summary}</p>
                <ul>{item.responsibilities.map((value) => <li key={value}>{value}</li>)}</ul>
                <div className="tag-row">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
