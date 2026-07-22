"use client";

import { skillGroups, skillsExperienceNote } from "@/data/skills";

export function SkillsApp() {
  return (
    <article className="app-scroll skills-app">
      <header className="app-section-header">
        <div>
          <p className="section-kicker">STACK</p>
          <h2>Herramientas para resolver, no para decorar.</h2>
        </div>
      </header>
      <div className="skill-groups">
        {skillGroups.map((group, index) => (
          <section key={group.title}>
            <div className="skill-group-head">
              <span>0{index + 1}</span>
              <div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
            </div>
            <div className="skill-list">
              {group.skills.map((skill) => (
                <div key={skill.name}>
                  <div>
                    <strong>{skill.name}</strong>
                    <span>{skill.level}</span>
                  </div>
                  <p>{skill.projects.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="data-note">{skillsExperienceNote}</p>
    </article>
  );
}
