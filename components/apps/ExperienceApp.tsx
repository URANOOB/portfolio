import { currentSoftwareFocus, softwareCareerTimeline } from "@/data/software-experience";
import { usePreferencesStore } from "@/store/preferences-store";

export function ExperienceApp() {
  const language = usePreferencesStore((state) => state.language) as "en" | "es";

  return (
    <article className="app-scroll experience-editorial">
      <header className="experience-editorial-header">
        <h2>{language === "es" ? "Experiencia" : "Experience"}</h2>
        <p>
          {language === "es"
            ? "Una línea de tiempo de mi experiencia en desarrollo y crecimiento técnico."
            : "A focused timeline of my software development experience and technical growth."}
        </p>
      </header>

      <section className="experience-editorial-panel experience-current-focus">
        <h3>{language === "es" ? "Enfoque Actual" : "Current Focus"}</h3>
        <ul>
          {currentSoftwareFocus[language].map((focus) => (
            <li key={focus}>{focus}</li>
          ))}
        </ul>
      </section>

      <section className="experience-editorial-panel experience-career">
        <h3>{language === "es" ? "Línea de Tiempo" : "Career Timeline"}</h3>
        <ol className="experience-career-list">
          {softwareCareerTimeline.map((item) => (
            <li className="experience-career-entry" key={`${item.company}-${item.role.en}`}>
              <div className="experience-entry-heading">
                <h4>{item.role[language]}</h4>
                <span>
                  {item.company} · {item.engagement[language]}
                </span>
                {item.current ? <mark>{language === "es" ? "Actual" : "Current"}</mark> : null}
              </div>
              <p className="experience-entry-period">{item.period[language]}</p>
              {item.location ? <p className="experience-entry-location">{item.location[language]}</p> : null}
              <p className="experience-entry-summary">{item.summary[language]}</p>
              <p className="experience-entry-stack">
                {(Array.isArray(item.stack) ? item.stack : item.stack[language]).join(" · ")}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
