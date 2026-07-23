"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { appDefinitions } from "@/data/navigation";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

const searchableApps: AppId[] = [
  "about",
  "contact",
  "experience",
  "logistics",
  "projects",
  "skills",
  "resume",
  "terminal",
];

export function SearchApp() {
  const [query, setQuery] = useState("");
  const openWindow = useWindowStore((state) => state.openWindow);
  const language = usePreferencesStore((state) => state.language);
  const results = searchableApps.filter((id) =>
    appDefinitions[id].title[language].toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <article className="app-scroll search-app">
      <header className="app-section-header">
        <div>
          <p className="section-kicker">BÚSQUEDA</p>
          <h2>Encuentra una sección.</h2>
        </div>
      </header>
      <label className="utility-search">
        <Search size={18} />
        <span className="sr-only">Buscar aplicaciones</span>
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar en el portafolio"
        />
      </label>
      <div className="utility-results">
        {results.map((id) => {
          const item = appDefinitions[id];
          const Icon = item.icon;
          return (
            <button key={id} onClick={() => openWindow(id)}>
              <Icon size={20} />
              <span>
                <strong>{item.title[language]}</strong>
                <small>{language === "es" ? "Abrir aplicación" : "Open app"}</small>
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
