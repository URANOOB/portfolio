import { currentSoftwareFocus, softwareCareerTimeline } from "@/data/software-experience";

export function ExperienceApp() {
  return (
    <article className="app-scroll experience-editorial">
      <header className="experience-editorial-header">
        <h2>Experience</h2>
        <p>A focused timeline of my software development experience and technical growth.</p>
      </header>

      <section className="experience-editorial-panel experience-current-focus">
        <h3>Current Focus</h3>
        <ul>
          {currentSoftwareFocus.map((focus) => (
            <li key={focus}>{focus}</li>
          ))}
        </ul>
      </section>

      <section className="experience-editorial-panel experience-career">
        <h3>Career Timeline</h3>
        <ol className="experience-career-list">
          {softwareCareerTimeline.map((item) => (
            <li className="experience-career-entry" key={`${item.company}-${item.role}`}>
              <div className="experience-entry-heading">
                <h4>{item.role}</h4>
                <span>{item.company} · {item.engagement}</span>
                {item.current ? <mark>Current</mark> : null}
              </div>
              <p className="experience-entry-period">{item.period}</p>
              {item.location ? <p className="experience-entry-location">{item.location}</p> : null}
              <p className="experience-entry-summary">{item.summary}</p>
              <p className="experience-entry-stack">{item.stack.join(" · ")}</p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
