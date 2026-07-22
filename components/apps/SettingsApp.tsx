"use client";

import { Check, ImageIcon, ImagePlus, Moon, Sun } from "lucide-react";
import { usePreferencesStore } from "@/store/preferences-store";

const accentOptions = [
  { id: "orange", label: "Naranja", color: "#ff8b5a" },
  { id: "green", label: "Verde", color: "#43b36b" },
  { id: "blue", label: "Azul", color: "#4d91e8" },
  { id: "purple", label: "Morado", color: "#8f65d8" },
] as const;

const textSizeOptions = [
  { id: "small", label: "Pequeña", sample: "A−" },
  { id: "medium", label: "Normal", sample: "A" },
  { id: "large", label: "Grande", sample: "A+" },
] as const;

export function SettingsApp() {
  const { theme, accent, textSize, wallpaper, setTheme, setAccent, setTextSize, setWallpaper } =
    usePreferencesStore();

  return (
    <article className="app-scroll settings-editorial">
      <header className="settings-editorial-header">
        <h2>Settings</h2>
        <p>Personaliza la apariencia de Urano. Tus preferencias se guardan en este dispositivo.</p>
      </header>

      <section className="settings-panel" aria-labelledby="settings-appearance">
        <h3 id="settings-appearance">Apariencia</h3>
        <div className="settings-panel-body">
          <fieldset className="settings-control-group">
            <legend>Modo del tema</legend>
            <div className="settings-segmented">
              <button
                type="button"
                className={theme === "light" ? "is-selected" : ""}
                onClick={() => setTheme("light")}
                aria-pressed={theme === "light"}
              >
                <Sun size={15} /> Claro
              </button>
              <button
                type="button"
                className={theme === "dark" ? "is-selected" : ""}
                onClick={() => setTheme("dark")}
                aria-pressed={theme === "dark"}
              >
                <Moon size={15} /> Oscuro
              </button>
            </div>
          </fieldset>

          <fieldset className="settings-control-group">
            <legend>Color del tema</legend>
            <div className="settings-color-options">
              {accentOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={accent === option.id ? "is-selected" : ""}
                  onClick={() => setAccent(option.id)}
                  aria-pressed={accent === option.id}
                >
                  <span className="settings-color-swatch" style={{ background: option.color }} />
                  {option.label}
                  {accent === option.id ? <Check size={13} aria-hidden="true" /> : null}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="settings-control-group">
            <legend>Tamaño del texto</legend>
            <div className="settings-text-options">
              {textSizeOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={textSize === option.id ? "is-selected" : ""}
                  onClick={() => setTextSize(option.id)}
                  aria-pressed={textSize === option.id}
                >
                  <strong>{option.sample}</strong>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="settings-panel settings-wallpaper-panel" aria-labelledby="settings-wallpaper">
        <h3 id="settings-wallpaper">Fondos de pantalla</h3>
        <div className="settings-panel-body">
          <p className="settings-panel-description">
            Elige el fondo del escritorio. Añadiremos aquí las próximas imágenes que me compartas.
          </p>
          <div className="settings-wallpaper-grid">
            <button
              type="button"
              className={wallpaper === "landscape" ? "wallpaper-option is-selected" : "wallpaper-option"}
              onClick={() => setWallpaper("landscape")}
              aria-pressed={wallpaper === "landscape"}
            >
              <span className="wallpaper-preview wallpaper-preview-landscape" />
              <span className="wallpaper-option-label">
                <span><strong>Paisaje animado</strong><small>Fondo actual</small></span>
                {wallpaper === "landscape" ? <Check size={15} aria-hidden="true" /> : null}
              </span>
            </button>
            <div className="wallpaper-option wallpaper-option-coming" aria-label="Espacio para próximos fondos">
              <span className="wallpaper-preview"><ImageIcon size={25} /></span>
              <span className="wallpaper-option-label">
                <span><strong>Próximamente</strong><small>Nuevos fondos</small></span>
                <ImagePlus size={15} aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
