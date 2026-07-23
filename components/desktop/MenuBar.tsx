"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe, Moon, Settings, Signal, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RcoonMark } from "@/components/ui/RcoonMark";
import { appDefinitions } from "@/data/navigation";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

const menuApps: AppId[] = ["about", "experience", "projects", "skills", "resume", "contact"];

const accentOptions = [
  { id: "orange" as const, color: "#ff8b5a", label: { es: "Naranja", en: "Orange" } },
  { id: "green" as const, color: "#43b36b", label: { es: "Verde", en: "Green" } },
  { id: "blue" as const, color: "#4d91e8", label: { es: "Azul", en: "Blue" } },
  { id: "purple" as const, color: "#8f65d8", label: { es: "Morado", en: "Purple" } },
];

export function MenuBar() {
  const [now, setNow] = useState<Date | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const activeApp = useWindowStore((state) => state.activeApp);
  const openWindow = useWindowStore((state) => state.openWindow);
  const { theme, setTheme, accent, setAccent, language, setLanguage } = usePreferencesStore();

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setNow(new Date()), 0);
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  // Close app-menu on outside click
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  // Close settings-popover on outside click
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!settingsRef.current?.contains(event.target as Node)) setSettingsOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  const activeTitle = activeApp
    ? appDefinitions[activeApp].title[language]
    : language === "es"
      ? "Escritorio"
      : "Desktop";
  const locale = language === "es" ? "es-CO" : "en-US";

  return (
    <header className="menu-bar" aria-label="Barra superior">
      <div className="menu-left" ref={menuRef}>
        <button className="brand-button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen}>
          <RcoonMark size={36} />
          <span>R/COON</span>
          <ChevronDown size={13} />
        </button>

        <span className="active-app-name">{activeTitle}</span>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="system-menu glass-panel"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5 }}
              role="menu"
            >
              <p>{language === "es" ? "Ir a" : "Go to"}</p>
              {menuApps.map((id) => {
                const item = appDefinitions[id];
                const Icon = item.icon;
                return (
                  <button
                    key={id}
                    role="menuitem"
                    onClick={() => {
                      openWindow(id);
                      setMenuOpen(false);
                    }}
                  >
                    <Icon size={17} />
                    {item.title[language]}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="menu-status">
        <span className="connection-status" title="Conexión disponible">
          <Signal size={15} /> <span>Online</span>
        </span>

        {/* Language quick-toggle */}
        <button
          className="language-toggle"
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
          aria-label="Cambiar idioma"
        >
          {language.toUpperCase()}
        </button>

        {/* Settings popover */}
        <div className="settings-control" ref={settingsRef}>
          <button
            className={`brand-button settings-btn${settingsOpen ? " is-active" : ""}`}
            onClick={() => setSettingsOpen((v) => !v)}
            aria-label="Ajustes rápidos"
            aria-expanded={settingsOpen}
          >
            <Settings size={15} />
          </button>

          <AnimatePresence>
            {settingsOpen && (
              <motion.div
                className="settings-popover glass-panel"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                role="dialog"
                aria-label={language === "es" ? "Ajustes rápidos" : "Quick settings"}
              >
                {/* Theme */}
                <p className="sp-label">{language === "es" ? "Tema" : "Theme"}</p>
                <div className="sp-segmented">
                  <button
                    className={theme === "light" ? "is-selected" : ""}
                    onClick={() => setTheme("light")}
                    aria-pressed={theme === "light"}
                  >
                    <Sun size={13} /> {language === "es" ? "Claro" : "Light"}
                  </button>
                  <button
                    className={theme === "dark" ? "is-selected" : ""}
                    onClick={() => setTheme("dark")}
                    aria-pressed={theme === "dark"}
                  >
                    <Moon size={13} /> {language === "es" ? "Oscuro" : "Dark"}
                  </button>
                </div>

                {/* Accent */}
                <p className="sp-label">{language === "es" ? "Color" : "Color"}</p>
                <div className="sp-colors">
                  {accentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      className={`sp-swatch${accent === opt.id ? " is-selected" : ""}`}
                      style={{ background: opt.color }}
                      onClick={() => setAccent(opt.id)}
                      aria-label={opt.label[language]}
                      aria-pressed={accent === opt.id}
                      title={opt.label[language]}
                    >
                      {accent === opt.id && <Check size={11} />}
                    </button>
                  ))}
                </div>

                {/* Language */}
                <p className="sp-label">{language === "es" ? "Idioma" : "Language"}</p>
                <div className="sp-segmented">
                  <button
                    className={language === "es" ? "is-selected" : ""}
                    onClick={() => setLanguage("es")}
                    aria-pressed={language === "es"}
                  >
                    <Globe size={13} /> ES
                  </button>
                  <button
                    className={language === "en" ? "is-selected" : ""}
                    onClick={() => setLanguage("en")}
                    aria-pressed={language === "en"}
                  >
                    <Globe size={13} /> EN
                  </button>
                </div>

                <div className="sp-divider" />
                <button
                  className="sp-full-settings"
                  onClick={() => {
                    openWindow("settings");
                    setSettingsOpen(false);
                  }}
                >
                  <Settings size={13} />
                  {language === "es" ? "Más ajustes…" : "More settings…"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <time dateTime={now?.toISOString()}>
          {now
            ? new Intl.DateTimeFormat(locale, {
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              }).format(now)
            : "—"}
        </time>
      </div>
    </header>
  );
}
