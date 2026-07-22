import { Command, MousePointer2, Search, SquareTerminal } from "lucide-react";

export function HelpApp() {
  return (
    <article className="app-scroll help-app">
      <header className="app-section-header">
        <div><p className="section-kicker">HELP</p><h2>Cómo explorar Urano.</h2></div>
      </header>
      <section className="principles">
        <div><MousePointer2 size={19} /><h3>Abrir</h3><p>Selecciona cualquier icono del escritorio o del dock.</p></div>
        <div><Command size={19} /><h3>Explorar</h3><p>Usa Ctrl + K para abrir el Explorador rápidamente.</p></div>
        <div><Search size={19} /><h3>Buscar</h3><p>Encuentra aplicaciones y secciones desde Búsqueda.</p></div>
        <div><SquareTerminal size={19} /><h3>Terminal</h3><p>Consulta comandos disponibles dentro del portafolio.</p></div>
      </section>
    </article>
  );
}
