"use client";

import { Bot, Braces, Database, Webhook } from "lucide-react";
import { FaJava } from "react-icons/fa6";
import type { ElementType } from "react";
import {
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { skillGroups as skillGroupsEs } from "@/data/skills";
import { skillGroups as skillGroupsEn } from "@/data/skills-en";
import { usePreferencesStore } from "@/store/preferences-store";

const skillIcons: Record<string, ElementType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "HTML / CSS": SiHtml5,
  "Node.js": SiNodedotjs,
  "API REST": Webhook,
  "REST API": Webhook,
  SQL: Database,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  "Python / OpenCV": SiOpencv,
  Java: FaJava,
  "Git / GitHub": SiGit,
  Vercel: SiVercel,
  Docker: SiDocker,
  "IA y automatización": Bot,
  "AI and Automation": Bot,
};

export function SkillsApp() {
  const language = usePreferencesStore((state) => state.language);
  const skillGroups = language === "es" ? skillGroupsEs : skillGroupsEn;
  return (
    <article className="app-scroll skills-app">
      <header className="app-section-header">
        <div>
          <p className="section-kicker">STACK</p>
          <h2>
            {language === "es"
              ? "Herramientas para resolver, no para decorar."
              : "Tools to solve, not just decorate."}
          </h2>
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
              {group.skills.map((skill) => {
                const Icon = skillIcons[skill.name] ?? Braces;

                return (
                  <div key={skill.name}>
                    <div>
                      <div className="skill-card-heading">
                        <span className="skill-card-icon" aria-hidden="true">
                          <Icon size={15} />
                        </span>
                        <strong>{skill.name}</strong>
                      </div>
                      <span>{skill.level}</span>
                    </div>
                    <p>{skill.projects.join(" · ")}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
