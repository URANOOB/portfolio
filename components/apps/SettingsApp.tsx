"use client";

import { Check, Globe, Moon, Sun } from "lucide-react";
import { usePreferencesStore } from "@/store/preferences-store";

const accentOptions = [
  { id: "orange", label: { es: "Naranja", en: "Orange" }, color: "#ff8b5a" },
  { id: "green", label: { es: "Verde", en: "Green" }, color: "#43b36b" },
  { id: "blue", label: { es: "Azul", en: "Blue" }, color: "#4d91e8" },
  { id: "purple", label: { es: "Morado", en: "Purple" }, color: "#8f65d8" },
] as const;

const textSizeOptions = [
  { id: "small", label: { es: "Pequeña", en: "Small" }, sample: "A−" },
  { id: "medium", label: { es: "Normal", en: "Normal" }, sample: "A" },
  { id: "large", label: { es: "Grande", en: "Large" }, sample: "A+" },
] as const;

export function SettingsApp() {
  const {
    theme,
    accent,
    textSize,
    wallpaper,
    language,
    setTheme,
    setAccent,
    setTextSize,
    setWallpaper,
    setLanguage,
  } = usePreferencesStore();

  return (
    <article className="app-scroll settings-editorial">
      <header className="settings-editorial-header">
        <h2>{language === "es" ? "Ajustes" : "Settings"}</h2>
        <p>
          {language === "es"
            ? "Personaliza la apariencia de R/COON. Tus preferencias se guardan en este dispositivo."
            : "Customize the appearance of R/COON. Your preferences are saved on this device."}
        </p>
      </header>

      <section className="settings-panel" aria-labelledby="settings-appearance">
        <h3 id="settings-appearance">{language === "es" ? "Apariencia" : "Appearance"}</h3>
        <div className="settings-panel-body">
          <fieldset className="settings-control-group">
            <legend>{language === "es" ? "Modo del tema" : "Theme mode"}</legend>
            <div className="settings-segmented">
              <button
                type="button"
                className={theme === "light" ? "is-selected" : ""}
                onClick={() => setTheme("light")}
                aria-pressed={theme === "light"}
              >
                <Sun size={15} /> {language === "es" ? "Claro" : "Light"}
              </button>
              <button
                type="button"
                className={theme === "dark" ? "is-selected" : ""}
                onClick={() => setTheme("dark")}
                aria-pressed={theme === "dark"}
              >
                <Moon size={15} /> {language === "es" ? "Oscuro" : "Dark"}
              </button>
            </div>
          </fieldset>

          <fieldset className="settings-control-group">
            <legend>{language === "es" ? "Color del tema" : "Theme color"}</legend>
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
                  {option.label[language]}
                  {accent === option.id ? <Check size={13} aria-hidden="true" /> : null}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="settings-control-group">
            <legend>{language === "es" ? "Tamaño del texto" : "Text size"}</legend>
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
                  <span>{option.label[language]}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="settings-panel" aria-labelledby="settings-language">
        <h3 id="settings-language">{language === "es" ? "Idioma" : "Language"}</h3>
        <div className="settings-panel-body">
          <fieldset className="settings-control-group">
            <legend>{language === "es" ? "Idioma de la interfaz" : "Interface language"}</legend>
            <div className="settings-segmented">
              <button
                type="button"
                className={language === "es" ? "is-selected" : ""}
                onClick={() => setLanguage("es")}
                aria-pressed={language === "es"}
              >
                <Globe size={15} /> Español
              </button>
              <button
                type="button"
                className={language === "en" ? "is-selected" : ""}
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
              >
                <Globe size={15} /> English
              </button>
            </div>
          </fieldset>
        </div>
      </section>

      <section className="settings-panel settings-wallpaper-panel" aria-labelledby="settings-wallpaper">
        <h3 id="settings-wallpaper">{language === "es" ? "Fondos de pantalla" : "Wallpapers"}</h3>
        <div className="settings-panel-body">
          <p className="settings-panel-description">
            {language === "es"
              ? "Elige el fondo del escritorio. Añadiremos aquí las próximas imágenes que me compartas."
              : "Choose the desktop wallpaper. We will add the next images you share with me here."}
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
                <span>
                  <strong>{language === "es" ? "Paisaje animado" : "Animated landscape"}</strong>
                  <small>{language === "es" ? "Fondo actual" : "Current wallpaper"}</small>
                </span>
                {wallpaper === "landscape" ? <Check size={15} aria-hidden="true" /> : null}
              </span>
            </button>
            <button
              type="button"
              className={wallpaper === "summerSea" ? "wallpaper-option is-selected" : "wallpaper-option"}
              onClick={() => setWallpaper("summerSea")}
              aria-pressed={wallpaper === "summerSea"}
            >
              <span className="wallpaper-preview wallpaper-preview-summer" />
              <span className="wallpaper-option-label">
                <span>
                  <strong>Summer sea</strong>
                  <small>{language === "es" ? "GIF animado" : "Animated GIF"}</small>
                </span>
                {wallpaper === "summerSea" ? <Check size={15} aria-hidden="true" /> : null}
              </span>
            </button>
            <button
              type="button"
              className={wallpaper === "animeSea" ? "wallpaper-option is-selected" : "wallpaper-option"}
              onClick={() => setWallpaper("animeSea")}
              aria-pressed={wallpaper === "animeSea"}
            >
              <span className="wallpaper-preview wallpaper-preview-anime-sea" />
              <span className="wallpaper-option-label">
                <span>
                  <strong>Anime sea</strong>
                  <small>{language === "es" ? "Video en bucle" : "Looping video"}</small>
                </span>
                {wallpaper === "animeSea" ? <Check size={15} aria-hidden="true" /> : null}
              </span>
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}
