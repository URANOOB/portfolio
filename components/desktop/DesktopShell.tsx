"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Command, MapPin } from "lucide-react";
import { useEffect } from "react";
import { BootScreen } from "@/components/desktop/BootScreen";
import { DesktopShortcut } from "@/components/desktop/DesktopShortcut";
import { Dock } from "@/components/desktop/Dock";
import { MenuBar } from "@/components/desktop/MenuBar";
import { WindowLayer } from "@/components/windows/WindowLayer";
import { desktopShortcuts } from "@/data/navigation";
import { profile } from "@/data/profile";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";

const copy = {
  es: {
    kicker: "PORTAFOLIO / BOGOTÁ",
    hello: "Hola, soy William.",
    view: "Explorar proyectos",
    contact: "Hablemos",
    welcome: "Bienvenido a mi espacio de trabajo.",
  },
  en: {
    kicker: "PORTFOLIO / BOGOTÁ",
    hello: "Hi, I’m William.",
    view: "Explore projects",
    contact: "Let’s talk",
    welcome: "Welcome to my workspace.",
  },
};

export function DesktopShell() {
  const theme = usePreferencesStore((state) => state.theme);
  const language = usePreferencesStore((state) => state.language);
  const openWindow = useWindowStore((state) => state.openWindow);
  const reduceMotion = useReducedMotion();
  const text = copy[language];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openWindow("finder");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openWindow]);

  return (
    <main className="desktop" data-theme={theme}>
      <a className="skip-link" href="#desktop-intro">
        Saltar al contenido
      </a>
      <div className="cosmos" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="planet-glow" />
        <div className="grain" />
      </div>

      <MenuBar />

      <section className="desktop-content" id="desktop-intro" aria-label="Presentación">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 1.02, duration: 0.5 }}
        >
          <p className="hero-kicker">{text.kicker}</p>
          <h1>{text.hello}</h1>
          <h2>{profile.headline}</h2>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-location">
            <MapPin size={15} /> {profile.location}
          </div>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => openWindow("projects")}>
              {text.view} <ArrowUpRight size={17} />
            </button>
            <button className="secondary-action" onClick={() => openWindow("contact")}>
              {text.contact}
            </button>
          </div>
          <p className="welcome-note">
            <span className="pulse-dot" /> {text.welcome}
          </p>
        </motion.div>

        <div className="desktop-shortcuts" aria-label="Accesos rápidos">
          {desktopShortcuts.map((id) => (
            <DesktopShortcut key={id} id={id} />
          ))}
        </div>

        <div className="command-hint" aria-hidden="true">
          <Command size={14} /> K &nbsp; Explorador
        </div>
      </section>

      <WindowLayer />
      <Dock />
      <BootScreen />
    </main>
  );
}
