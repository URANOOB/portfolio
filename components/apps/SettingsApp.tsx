"use client";

import { Languages, Moon, Sun } from "lucide-react";
import { usePreferencesStore } from "@/store/preferences-store";

export function SettingsApp() {
  const { theme, setTheme, language, setLanguage } = usePreferencesStore();

  return (
    <article className="app-scroll settings-app">
      <header className="app-section-header"><div><p className="section-kicker">SETTINGS</p><h2>Preferencias del escritorio.</h2></div></header>
      <div className="settings-options">
        <section><h3>Apariencia</h3><div><button className={theme === "dark" ? "selected" : ""} onClick={() => setTheme("dark")}><Moon size={18} /> Oscuro</button><button className={theme === "light" ? "selected" : ""} onClick={() => setTheme("light")}><Sun size={18} /> Claro</button></div></section>
        <section><h3>Idioma</h3><div><button className={language === "es" ? "selected" : ""} onClick={() => setLanguage("es")}><Languages size={18} /> Español</button><button className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")}><Languages size={18} /> English</button></div></section>
      </div>
    </article>
  );
}
