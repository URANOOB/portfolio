const terminalCommands = [
  "help",
  "whoami",
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "contact",
  "github",
  "linkedin",
  "clear",
];

export function HelpApp() {
  return (
    <article className="app-scroll help-guide">
      <header className="help-guide-header">
        <h2>Guía del portafolio</h2>
        <p>
          Este sitio funciona como un escritorio interactivo. Abre aplicaciones, mueve y organiza
          ventanas, explora mi trabajo y recorre el portafolio desde la búsqueda o la Terminal.
        </p>
      </header>

      <section className="help-guide-section" aria-labelledby="help-open-apps">
        <h3 id="help-open-apps">Cómo abrir aplicaciones</h3>
        <ul>
          <li>Selecciona un icono del dock para abrir su ventana o traerla al frente.</li>
          <li>Usa los accesos del escritorio para entrar a Explorador, Currículum y Logística.</li>
          <li>Arrastra una ventana desde su barra superior; también puedes minimizarla, ampliarla o cerrarla.</li>
        </ul>
      </section>

      <section className="help-guide-section" aria-labelledby="help-search">
        <h3 id="help-search">Explorador y búsqueda</h3>
        <p>
          Presiona <kbd>Ctrl</kbd> + <kbd>K</kbd> para abrir el Explorador. Desde Búsqueda puedes
          localizar rápidamente secciones como Sobre mí, Experiencia, Logística, Works o Contacto.
        </p>
      </section>

      <section className="help-guide-section" aria-labelledby="help-terminal">
        <h3 id="help-terminal">Inicio rápido de Terminal</h3>
        <p>
          Abre Terminal desde el dock, escribe un comando y presiona <kbd>Enter</kbd>. Estos son los
          comandos disponibles:
        </p>
        <div className="help-command-list" aria-label="Comandos disponibles">
          {terminalCommands.map((command) => (
            <code key={command}>{command}</code>
          ))}
        </div>
        <div className="help-command-examples">
          <span>También puedes abrir proyectos directamente:</span>
          <code>open atlas-splitter</code>
          <code>open ingles-pa-la-paz</code>
        </div>
      </section>

      <footer className="help-guide-note">
        <span aria-hidden="true">●</span>
        <p>Consejo: el punto debajo de un icono indica que la aplicación está abierta.</p>
      </footer>
    </article>
  );
}
