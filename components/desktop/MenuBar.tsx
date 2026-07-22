"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Moon, Signal, Sun, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UranoMark } from "@/components/ui/UranoMark";
import { appDefinitions } from "@/data/navigation";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

const menuApps: AppId[] = ["about", "experience", "projects", "skills", "resume", "contact"];

export function MenuBar() {
  const [now, setNow] = useState<Date | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeApp = useWindowStore((state) => state.activeApp);
  const openWindow = useWindowStore((state) => state.openWindow);
  const { theme, setTheme, language, setLanguage } = usePreferencesStore();

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setNow(new Date()), 0);
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  const activeTitle = activeApp ? appDefinitions[activeApp].title : "Escritorio";
  const locale = language === "es" ? "es-CO" : "en-US";

  return (
    <header className="menu-bar" aria-label="Barra superior">
      <div className="menu-left" ref={menuRef}>
        <button
          className="brand-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
        >
          <UranoMark size={21} />
          <span>Urano</span>
          <ChevronDown size={13} />
        </button>
        <span className="active-app-name">{activeTitle}</span>
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              className="system-menu glass-panel"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5 }}
              role="menu"
            >
              <p>Ir a</p>
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
                    {item.title}
                  </button>
                );
              })}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="menu-status">
        <span className="connection-status" title="Conexión disponible">
          <Signal size={15} /> <span>Online</span>
        </span>
        <div className="sound-control">
          <button
            aria-label="Mostrar control visual de volumen"
            onClick={() => setSoundOpen((value) => !value)}
          >
            <Volume2 size={16} />
          </button>
          {soundOpen ? (
            <div className="volume-popover glass-panel">
              <label htmlFor="visual-volume">Volumen visual</label>
              <input id="visual-volume" type="range" min="0" max="100" defaultValue="64" />
            </div>
          ) : null}
        </div>
        <button
          className="language-toggle"
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
          aria-label="Cambiar idioma"
        >
          {language.toUpperCase()}
        </button>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
        >
          {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
        </button>
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
